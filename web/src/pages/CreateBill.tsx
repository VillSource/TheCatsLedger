import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postBillsMutationOptions } from '@/api/generated/hooks/usePostBills'
import { getBillsQueryKey } from '@/api/generated/hooks/useGetBills'
import { useLiff } from '@/lib/liff'
import { useNavigate } from '@tanstack/react-router'
import { Card, Input, Label } from '@/components/ui/inputs'
import { Button } from '@/components/ui/button'
import { Share2, Sparkles, AlertCircle } from 'lucide-react'
import { createBillFlexMessage } from '@/lib/lineFlex'

const EMOJI_OPTIONS = ['🍜', '☕', '🍻', '🎬', '🛒', '🚕', '✈️', '🎮', '🍕', '🐱']

export const CreateBillPage: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { profile, shareTargetPicker } = useLiff()

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [emoji, setEmoji] = useState('🍜')
  const [note, setNote] = useState('')
  const [createdBillId, setCreatedBillId] = useState<string | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const createMutation = useMutation({
    ...postBillsMutationOptions(),
    onSuccess: (data: any) => {
      // In the backend, Created result returns bill.Id or response header bills/{bill.Id}
      const billId = typeof data === 'string' ? data.replace(/^bills\//, '') : data?.id || data
      setCreatedBillId(billId)
      // Invalidate bill queries
      queryClient.invalidateQueries({ queryKey: getBillsQueryKey() })
      queryClient.invalidateQueries({ queryKey: getBillsQueryKey({ query: { billToPay: true } }) })
    },
    onError: (err: any) => {
      setErrorMsg(err?.message || 'Failed to create bill. Please check backend connection.')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    const numAmount = parseFloat(amount)
    if (!name.trim()) {
      setErrorMsg('Please enter bill name')
      return
    }
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg('Please enter a valid amount')
      return
    }

    createMutation.mutate({
      body: {
        name: name.trim(),
        amount: numAmount,
        emoji,
        note: note.trim() || null,
      },
    })
  }

  const handleShare = async () => {
    if (!createdBillId) return
    setIsSharing(true)
    try {
      const flexMsg = createBillFlexMessage({
        bill: {
          id: createdBillId,
          name,
          amount,
          emoji,
          note,
        },
        senderName: profile?.displayName || 'Friend',
        liffId: import.meta.env.VITE_LIFF_ID || '',
      })

      await shareTargetPicker([flexMsg])
    } finally {
      setIsSharing(false)
    }
  }

  if (createdBillId) {
    return (
      <div className="space-y-6 pt-6">
        <Card className="text-center py-8 px-6 space-y-4 border-emerald-100 bg-emerald-50/40">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
            {emoji}
          </div>
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Created Successfully
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">{name}</h2>
            <p className="text-3xl font-black text-slate-900 mt-1">
              ฿{parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            {note && <p className="text-xs text-slate-500 mt-1">{note}</p>}
          </div>

          <div className="pt-4 space-y-2">
            <Button
              onClick={handleShare}
              disabled={isSharing}
              className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              {isSharing ? 'Opening LINE...' : 'Share to Debtor LINE Chat'}
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate({ to: '/bills/$billId', params: { billId: createdBillId } })}
              className="w-full"
            >
              View Bill Detail
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                setCreatedBillId(null)
                setName('')
                setAmount('')
                setNote('')
              }}
              className="w-full text-xs"
            >
              + Create Another Bill
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Create New Bill</h1>
        <p className="text-xs text-slate-500 mt-0.5">Record an expense and split it with friends</p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-700">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Emoji Selector */}
        <div>
          <Label>Category Icon</Label>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {EMOJI_OPTIONS.map((e) => (
              <button
                type="button"
                key={e}
                onClick={() => setEmoji(e)}
                className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                  emoji === e
                    ? 'bg-emerald-100 border-2 border-emerald-500 scale-105'
                    : 'bg-white border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Bill Title */}
        <div>
          <Label>Bill Title</Label>
          <Input
            placeholder="e.g. Dinner at Shabu Shop, Taxi, Coffee"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Total Amount */}
        <div>
          <Label>Total Amount (฿)</Label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="text-lg font-bold"
          />
        </div>

        {/* Note */}
        <div>
          <Label>Notes (Optional)</Label>
          <Input
            placeholder="Account info or remarks"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          disabled={createMutation.isPending}
          className="w-full mt-2"
        >
          {createMutation.isPending ? 'Creating Bill...' : 'Create Bill'}
        </Button>
      </form>
    </div>
  )
}
