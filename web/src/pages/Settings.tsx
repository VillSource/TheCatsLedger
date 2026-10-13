import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getApiV1PaymentsUseridQueryOptions as getPaymentsUseridQueryOptions,
  getApiV1PaymentsUseridQueryKey as getPaymentsUseridQueryKey,
} from '@/api/generated/hooks/useGetApiV1PaymentsUserid'
import { postApiV1PaymentsMutationOptions as postPaymentsMutationOptions } from '@/api/generated/hooks/usePostApiV1Payments'
import { postSummarize } from '@/api/generated/clients/postSummarize'
import { useLiff } from '@/lib/liff'
import { Card, Input, Label } from '@/components/ui/inputs'
import { Button } from '@/components/ui/button'
import { CreditCard, CheckCircle2, AlertCircle, LogOut, QrCode } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

export const SettingsPage: React.FC = () => {
  const { profile, logout } = useLiff()
  const { t } = useI18n()
  const queryClient = useQueryClient()

  const [channel] = useState('PromptPay')
  const [channelName] = useState('PromptPay (พร้อมเพย์)')
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
      setErrorMsg(err?.message || t('Failed to update payment info.'))
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!accountNo.trim() || !name.trim()) {
      setErrorMsg(t('Please fill in both Account Number and Account Name'))
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

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{t('Payment Settings')}</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {t('Configure where friends should transfer money when settling debts')}
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t('Payment method saved successfully!')}</span>
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
            <Label>{t('Payment Channel')}</Label>
            <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800">
              <QrCode className="w-4 h-4 text-emerald-600" />
              <span>{t('PromptPay (พร้อมเพย์)')}</span>
              <span className="ml-auto text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full">
                {t('Active')}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {t('Currently available for PromptPay. Other channels (Bank accounts, TrueMoney) coming soon!')}
            </p>
          </div>

          <div>
            <Label>{t('PromptPay Number (Phone / National ID)')}</Label>
            <Input
              placeholder={t('e.g. 0812345678 or 1234567890123')}
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>{t('Account Owner Full Name')}</Label>
            <Input
              placeholder={t('e.g. Somchai Prasert')}
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
            {saveMutation.isPending ? t('Saving...') : t('Save Payment Info')}
          </Button>
        </form>
      </Card>

      {/* Account Info Profile */}
      <Card className="p-4 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('LINE Account')}</h3>
        <div className="flex items-center gap-3">
          {profile?.pictureUrl && (
            <img
              src={profile.pictureUrl}
              alt={profile.displayName}
              className="w-10 h-10 rounded-full border border-slate-200"
            />
          )}
          <div>
            <p className="text-sm font-bold text-slate-800">{profile?.displayName || t('User')}</p>
            <p className="text-[11px] text-slate-400 font-mono">{profile?.userId}</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="w-full text-slate-600 hover:text-rose-600 flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          {t('Log out of LINE')}
        </Button>
      </Card>

      {/* Dev Mode Action: Trigger Daily Notification Summaries */}
      {import.meta.env.DEV && (
        <Card className="p-4 space-y-2 border-dashed border-amber-300 bg-amber-50/30">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800">{t('Developer Testing')}</h3>
          <p className="text-[11px] text-slate-500">
            {t('Trigger Hangfire summary notifications immediately (08:00 debtor & 20:00 owner summaries) via POST /summarize.')}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={async () => {
              try {
                await postSummarize().unwrap()
                alert(t('Summary notifications triggered successfully!'))
              } catch (err: unknown) {
                alert(t('Error: {message}', { message: err instanceof Error ? err.message : String(err) }))
              }
            }}
            className="w-full text-xs font-semibold cursor-pointer border-amber-300 hover:bg-amber-100"
          >
            ⚡ Test /summarize Notification
          </Button>
        </Card>
      )}
    </div>
  )
}
