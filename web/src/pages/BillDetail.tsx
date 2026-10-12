import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { getBillsBillidQueryOptions } from '@/api/generated/hooks/useGetBillsBillid'
import { getPaymentsUseridQueryOptions } from '@/api/generated/hooks/useGetPaymentsUserid'
import type { Bill } from '@/api/generated/types/Bill'
import { useLiff } from '@/lib/liff'
import { Card } from '@/components/ui/inputs'
import { Button } from '@/components/ui/button'
import {
  Share2,
  AlertCircle,
  CreditCard,
  UserCheck,
  CheckCircle2,
  Copy,
  Calendar,
  DollarSign
} from 'lucide-react'
import { createBillFlexMessage } from '@/lib/lineFlex'

export const BillDetailPage: React.FC = () => {
  const { billId } = useParams({ strict: false })
  const { profile, shareTargetPicker } = useLiff()
  const [copied, setCopied] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  // 1. Fetch Bill Detail
  const { data: billData, isLoading, error, refetch } = useQuery({
    ...getBillsBillidQueryOptions({
      path: { billId: billId as string },
    }),
    enabled: Boolean(billId),
  })

  // The backend returns { isOwner: boolean, bill: Bill } or Bill directly
  const bill: Bill | undefined = (billData as any)?.bill || (billData as any)
  const isOwnerFromApi = (billData as any)?.isOwner
  const isOwner =
    typeof isOwnerFromApi === 'boolean'
      ? isOwnerFromApi
      : bill?.userId && profile?.userId
      ? bill.userId === profile.userId
      : false

  const ownerUserId = bill?.userId

  // 2. Fetch Payment Info of Bill Owner (only needed if viewer is not the owner)
  const { data: paymentData, isLoading: isPaymentLoading } = useQuery({
    ...getPaymentsUseridQueryOptions({
      path: { userId: ownerUserId || '' },
    }),
    enabled: Boolean(ownerUserId && !isOwner),
  })

  const ownerPayment: any = paymentData

  const handleShareAgain = async () => {
    if (!bill) return
    setIsSharing(true)
    try {
      const flexMsg = createBillFlexMessage({
        bill: {
          id: bill.id,
          name: bill.name,
          amount: bill.amount,
          emoji: bill.emoji,
          note: bill.notes,
        },
        senderName: profile?.displayName || bill.userName || 'Friend',
        liffId: import.meta.env.VITE_LIFF_ID || '',
      })

      await shareTargetPicker([flexMsg])
    } finally {
      setIsSharing(false)
    }
  }

  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="space-y-4 py-6">
        <div className="h-44 bg-slate-200 rounded-3xl animate-pulse" />
        <div className="h-28 bg-slate-200 rounded-2xl animate-pulse" />
      </div>
    )
  }

  if (error || !bill) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-3">
        <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
        <h2 className="text-sm font-bold text-rose-800">Bill not found or error loading</h2>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    )
  }

  const numAmount = typeof bill.amount === 'string' ? parseFloat(bill.amount) : bill.amount

  return (
    <div className="space-y-5">
      {/* Bill Card Hero */}
      <Card className="text-center py-6 px-4 bg-white border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl text-3xl flex items-center justify-center mx-auto mb-3 shadow-inner">
          {bill.emoji || '🧾'}
        </div>
        <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
          {isOwner ? '👑 You are the Owner' : `Owner: ${bill.userName || 'Friend'}`}
        </div>
        <h1 className="text-xl font-black text-slate-900">{bill.name}</h1>
        <p className="text-3xl font-black text-emerald-600 mt-2">
          ฿{numAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>

        {bill.notes && (
          <p className="text-xs text-slate-500 mt-2 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            "{bill.notes}"
          </p>
        )}

        <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {bill.timestamp ? new Date(bill.timestamp).toLocaleDateString() : 'Recent'}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" />
            {bill.payers?.length || 0} participants
          </span>
        </div>
      </Card>

      {/* OWNER ACTION: Share Again */}
      {isOwner ? (
        <Card className="bg-emerald-50 border border-emerald-100 p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-950">Share with Debtors</h3>
              <p className="text-xs text-emerald-700 mt-0.5">
                Send this bill directly to a LINE chat group or friend so they can view the breakdown and pay you.
              </p>
            </div>
          </div>
          <Button
            onClick={handleShareAgain}
            disabled={isSharing}
            className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            {isSharing ? 'Sharing to LINE...' : 'Share Again to LINE Chat'}
          </Button>
        </Card>
      ) : (
        /* DEBTOR VIEW: Owner's Payment Method */
        <Card className="p-4 space-y-3 border-amber-200/80 bg-amber-50/50">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">Owner's Payment Method</h3>
          </div>

          {isPaymentLoading ? (
            <div className="h-14 bg-slate-200/60 rounded-xl animate-pulse" />
          ) : ownerPayment ? (
            <div className="bg-white p-3.5 rounded-xl border border-amber-200/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Channel:</span>
                <span className="font-bold text-slate-800">
                  {ownerPayment.channelName || ownerPayment.channel || 'PromptPay / Bank'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Account Name:</span>
                <span className="font-semibold text-slate-800">{ownerPayment.name || '-'}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Account No.</span>
                  <span className="text-base font-mono font-bold text-slate-900">
                    {ownerPayment.accountNo || '-'}
                  </span>
                </div>
                {ownerPayment.accountNo && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyAccount(ownerPayment.accountNo)}
                    className="flex items-center gap-1 text-xs"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-3 bg-white/80 rounded-xl text-center text-xs text-slate-500">
              The owner hasn't configured their payment details yet. Ask them to update their payment settings!
            </div>
          )}
        </Card>
      )}

      {/* Payers List */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          Participants ({bill.payers?.length || 0})
        </h3>
        {bill.payers && bill.payers.length > 0 ? (
          <div className="space-y-1.5">
            {bill.payers.map((payer) => (
              <Card key={payer.id} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold">
                    {payer.userName ? payer.userName.slice(0, 1) : <UserCheck className="w-4 h-4" />}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">{payer.userName || 'Participant'}</h5>
                    <span className="text-[10px] text-slate-400">
                      {payer.timestamp ? new Date(payer.timestamp).toLocaleTimeString() : ''}
                    </span>
                  </div>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      payer.isPay
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {payer.isPay ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-6 text-xs text-slate-400">
            No participants joined this bill yet. Share it to LINE to add debtors!
          </Card>
        )}
      </div>
    </div>
  )
}
