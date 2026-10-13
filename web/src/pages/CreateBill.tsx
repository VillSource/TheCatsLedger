import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postApiV1BillsMutationOptions as postBillsMutationOptions } from '@/api/generated/hooks/usePostApiV1Bills'
import { getApiV1BillsQueryKey as getBillsQueryKey } from '@/api/generated/hooks/useGetApiV1Bills'
import { useLiff } from '@/lib/liff'
import { useNavigate } from '@tanstack/react-router'
import { Card, Input, Label } from '@/components/ui/inputs'
import { Button } from '@/components/ui/button'
import { Share2, Sparkles, AlertCircle } from 'lucide-react'
import { createBillFlexMessage } from '@/lib/lineFlex'
import { useI18n } from '@/lib/i18n'

const EMOJI_OPTIONS = ['🍜', '☕', '🍻', '🎬', '🛒', '🚕', '✈️', '🎮', '🍕', '🐱']
const QUICK_AMOUNTS = [50, 100, 150, 200, 300, 500]

export const CreateBillPage: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { profile, liffId, shareTargetPicker } = useLiff()
  const { t, locale, formatMoney } = useI18n()

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [emoji, setEmoji] = useState('🍜')
  const [note, setNote] = useState('')
  const [createdBillId, setCreatedBillId] = useState<string | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const triggerShare = async (billId: string, billName: string, billAmount: string, billEmoji: string, billNote: string) => {
    setIsSharing(true)
    try {
      const flexMsg = createBillFlexMessage({
        bill: {
          id: billId,
          name: billName,
          amount: billAmount,
          emoji: billEmoji,
          note: billNote,
        },
        senderName: profile?.displayName || t('Friend'),
        liffId,
        locale,
      })

      await shareTargetPicker([flexMsg])
    } finally {
      setIsSharing(false)
    }
  }

  const createMutation = useMutation({
    ...postBillsMutationOptions(),
    onSuccess: async (data: any) => {
      // In the backend, Created result returns bill.Id or response header bills/{bill.Id}
      const billId = typeof data === 'string' ? data.replace(/^bills\//, '') : data?.id || data
      setCreatedBillId(billId)
      // Invalidate bill queries
      queryClient.invalidateQueries({ queryKey: getBillsQueryKey() })
      queryClient.invalidateQueries({ queryKey: getBillsQueryKey({ query: { billToPay: true } }) })

      // Automatically trigger shareTargetPicker as requested
      setTimeout(() => {
        triggerShare(billId, name, amount, emoji, note)
      }, 200)
    },
    onError: (err: any) => {
      setErrorMsg(err?.message || t('Failed to create bill. Please check backend connection.'))
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    const numAmount = parseFloat(amount)
    if (!name.trim()) {
      setErrorMsg(t('Please enter bill name'))
      return
    }
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg(t('Please enter a valid amount'))
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

  const handleShareManual = async () => {
    if (!createdBillId) return
    triggerShare(createdBillId, name, amount, emoji, note)
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
              <Sparkles className="w-3.5 h-3.5" /> {t('Created Successfully')}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">{name}</h2>
            <p className="text-3xl font-black text-slate-900 mt-1">
              {formatMoney(parseFloat(amount))}
            </p>
            {note && <p className="text-xs text-slate-500 mt-1">{note}</p>}
          </div>

          <div className="pt-4 space-y-2">
            <Button
              onClick={handleShareManual}
              disabled={isSharing}
              className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              {isSharing ? t('Opening LINE...') : t('Share to Debtor LINE Chat')}
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate({ to: '/bills/$billId', params: { billId: createdBillId } })}
              className="w-full cursor-pointer"
            >
              {t('View Bill Detail')}
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                setCreatedBillId(null)
                setName('')
                setAmount('')
                setNote('')
              }}
              className="w-full text-xs cursor-pointer"
            >
              {t('+ Create Another Bill')}
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{t('Create New Bill')}</h1>
        <p className="text-xs text-slate-500 mt-0.5">{t('Record an expense and split it with friends')}</p>
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
          <Label>{t('Category Icon')}</Label>
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
          <Label>{t('Bill Title')}</Label>
          <Input
            placeholder={t('e.g. Dinner at Shabu Shop, Taxi, Coffee')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Total Amount & Quick Amount Buttons */}
        <div>
          <div className="flex items-center justify-between">
            <Label>{t('Total Amount (฿)')}</Label>
            <span className="text-[11px] text-slate-400 font-medium">{t('Quick Amount')}</span>
          </div>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="text-lg font-bold"
          />

          {/* Quick Amount Button Pills */}
          <div className="grid grid-cols-6 gap-1.5 mt-2">
            {QUICK_AMOUNTS.map((val) => {
              const isSelected = amount === val.toString()
              return (
                <button
                  type="button"
                  key={val}
                  onClick={() => setAmount(val.toString())}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  ฿{val}
                </button>
              )
            })}
          </div>
        </div>

        {/* Note */}
        <div>
          <Label>{t('Notes (Optional)')}</Label>
          <Input
            placeholder={t('Account info or remarks')}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          disabled={createMutation.isPending}
          className="w-full mt-2 cursor-pointer"
        >
          {createMutation.isPending ? t('Creating Bill & Opening LINE Share...') : t('Create & Share Bill')}
        </Button>
      </form>
    </div>
  )
}
