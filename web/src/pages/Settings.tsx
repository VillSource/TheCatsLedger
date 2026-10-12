import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPaymentsUseridQueryOptions, getPaymentsUseridQueryKey } from '@/api/generated/hooks/useGetPaymentsUserid'
import { postPaymentsMutationOptions } from '@/api/generated/hooks/usePostPayments'
import { useLiff } from '@/lib/liff'
import { Card, Input, Label } from '@/components/ui/inputs'
import { Button } from '@/components/ui/button'
import { CreditCard, CheckCircle2, AlertCircle, LogOut } from 'lucide-react'

const CHANNELS = [
  { id: 'PromptPay', name: 'PromptPay (พร้อมเพย์)' },
  { id: 'KBANK', name: 'Kasikornbank (กสิกรไทย)' },
  { id: 'SCB', name: 'Siam Commercial Bank (ไทยพาณิชย์)' },
  { id: 'BBL', name: 'Bangkok Bank (กรุงเทพ)' },
  { id: 'KTB', name: 'Krungthai Bank (กรุงไทย)' },
  { id: 'TTB', name: 'TMBThanachart (ทีทีบี)' },
  { id: 'Other', name: 'Other Bank / Wallet' },
]

export const SettingsPage: React.FC = () => {
  const { profile, logout } = useLiff()
  const queryClient = useQueryClient()

  const [channel, setChannel] = useState('PromptPay')
  const [channelName, setChannelName] = useState('PromptPay')
  const [accountNo, setAccountNo] = useState('')
  const [name, setName] = useState('')
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Fetch current user's existing payment method if available
  const { data: existingPayment } = useQuery({
    ...getPaymentsUseridQueryOptions({
      path: { userId: profile?.userId || '' },
    }),
    enabled: Boolean(profile?.userId),
  })

  useEffect(() => {
    if (existingPayment) {
      const p: any = existingPayment
      if (p.channel) setChannel(p.channel)
      if (p.channelName) setChannelName(p.channelName)
      if (p.accountNo) setAccountNo(p.accountNo)
      if (p.name) setName(p.name)
    } else if (profile?.displayName && !name) {
      setName(profile.displayName)
    }
  }, [existingPayment, profile])

  const saveMutation = useMutation({
    ...postPaymentsMutationOptions(),
    onSuccess: () => {
      setSavedSuccess(true)
      setErrorMsg(null)
      if (profile?.userId) {
        queryClient.invalidateQueries({
          queryKey: getPaymentsUseridQueryKey({ path: { userId: profile.userId } }),
        })
      }
      setTimeout(() => setSavedSuccess(false), 3000)
    },
    onError: (err: any) => {
      setErrorMsg(err?.message || 'Failed to update payment info.')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!accountNo.trim() || !name.trim()) {
      setErrorMsg('Please fill in both Account Number and Account Name')
      return
    }

    saveMutation.mutate({
      body: {
        channel,
        channelName,
        accountNo: accountNo.trim(),
        name: name.trim(),
      },
    })
  }

  const handleChannelSelect = (selectedId: string) => {
    setChannel(selectedId)
    const match = CHANNELS.find((c) => c.id === selectedId)
    setChannelName(match ? match.name : selectedId)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Payment Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure where friends should transfer money when settling debts
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Payment method saved successfully!</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Payment Channel</Label>
            <select
              value={channel}
              onChange={(e) => handleChannelSelect(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {CHANNELS.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Account Number / PromptPay Phone / ID</Label>
            <Input
              placeholder="e.g. 0812345678 or 123-4-56789-0"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Account Owner Full Name</Label>
            <Input
              placeholder="e.g. Somchai Prasert"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={saveMutation.isPending}
            className="w-full flex items-center justify-center gap-2 mt-2"
          >
            <CreditCard className="w-4 h-4" />
            {saveMutation.isPending ? 'Saving...' : 'Save Payment Info'}
          </Button>
        </form>
      </Card>

      {/* Account Info Profile */}
      <Card className="p-4 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">LINE Account</h3>
        <div className="flex items-center gap-3">
          {profile?.pictureUrl && (
            <img
              src={profile.pictureUrl}
              alt={profile.displayName}
              className="w-10 h-10 rounded-full border border-slate-200"
            />
          )}
          <div>
            <p className="text-sm font-bold text-slate-800">{profile?.displayName || 'User'}</p>
            <p className="text-[11px] text-slate-400 font-mono">{profile?.userId}</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="w-full text-slate-600 hover:text-rose-600 flex items-center justify-center gap-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          Log out of LINE
        </Button>
      </Card>
    </div>
  )
}
