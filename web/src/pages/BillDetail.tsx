import React, { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { getBillsBillidQueryOptions, getBillsBillidQueryKey } from '@/api/generated/hooks/useGetBillsBillid'
import { getPaymentsUseridQueryOptions } from '@/api/generated/hooks/useGetPaymentsUserid'
import { postBillsBillidPayMutationOptions } from '@/api/generated/hooks/usePostBillsBillidPay'
import { postBillsBillidPayersPayeridConfirmMutationOptions } from '@/api/generated/hooks/usePostBillsBillidPayersPayeridConfirm'
import { postBillsBillidPayersPayeridRejectMutationOptions } from '@/api/generated/hooks/usePostBillsBillidPayersPayeridReject'
import type { Bill } from '@/api/generated/types/Bill'
import type { BillPayer } from '@/api/generated/types/BillPayer'
import { useLiff } from '@/lib/liff'
import { Card, Input, Label } from '@/components/ui/inputs'
import { Button } from '@/components/ui/button'
import {
  Share2,
  AlertCircle,
  CreditCard,
  UserCheck,
  CheckCircle2,
  Copy,
  Calendar,
  DollarSign,
  Download,
  QrCode,
  Upload,
  Check,
  X,
  Clock,
  Eye,
  Send
} from 'lucide-react'
import { createBillFlexMessage } from '@/lib/lineFlex'
import promptpayQR from 'promptpay-qr'
import QRCode from 'qrcode'

export const BillDetailPage: React.FC = () => {
  const { billId } = useParams({ strict: false })
  const { profile, shareTargetPicker } = useLiff()
  const queryClient = useQueryClient()

  const [copied, setCopied] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [qrGenerating, setQrGenerating] = useState(false)

  // Debtor pay modal state
  const [showPayModal, setShowPayModal] = useState(false)
  const [debtorNote, setDebtorNote] = useState('')
  const [slipImageBase64, setSlipImageBase64] = useState<string | null>(null)
  const [slipFileName, setSlipFileName] = useState<string | null>(null)
  const [payError, setPayError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Owner inspection modal state
  const [inspectSlipUrl, setInspectSlipUrl] = useState<string | null>(null)

  // 1. Fetch Bill Detail
  const { data: billData, isLoading, error, refetch } = useQuery({
    ...getBillsBillidQueryOptions({
      path: { billId: billId as string },
    }),
    enabled: Boolean(billId),
  })

  const bill: Bill | undefined = (billData as any)?.bill || (billData as any)
  const isOwnerFromApi = (billData as any)?.isOwner
  const isOwner =
    typeof isOwnerFromApi === 'boolean'
      ? isOwnerFromApi
      : bill?.userId && profile?.userId
      ? bill.userId === profile.userId
      : false

  const ownerUserId = bill?.userId

  // 2. Fetch Owner Payment Info
  const { data: paymentData, isLoading: isPaymentLoading } = useQuery({
    ...getPaymentsUseridQueryOptions({
      path: { userId: ownerUserId || '' },
    }),
    enabled: Boolean(ownerUserId && !isOwner),
  })

  const ownerPayment: any = paymentData

  // Identify current user's payer record if debtor
  const myPayerRecord: BillPayer | undefined = bill?.payers?.find((p) => p.userId === profile?.userId)

  // 3. PromptPay QR Code generation
  useEffect(() => {
    if (!ownerPayment?.accountNo || !bill) {
      setQrDataUrl(null)
      return
    }

    const isPromptPay =
      !ownerPayment.channel ||
      ownerPayment.channel.toLowerCase().includes('promptpay') ||
      ownerPayment.channel === 'PromptPay'

    if (!isPromptPay) return

    setQrGenerating(true)
    try {
      const numAmount = typeof bill.amount === 'string' ? parseFloat(bill.amount) : bill.amount
      const targetAmount = !isNaN(numAmount) && numAmount > 0 ? numAmount : undefined
      const cleanAccountNo = ownerPayment.accountNo.replace(/[^0-9]/g, '')

      const payload = promptpayQR(cleanAccountNo, {
        amount: targetAmount,
      })

      QRCode.toDataURL(payload, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
        .then((url) => {
          setQrDataUrl(url)
          setQrGenerating(false)
        })
        .catch((err) => {
          console.error('Failed to generate QR data URL', err)
          setQrGenerating(false)
        })
    } catch (err) {
      console.error('PromptPay QR payload error', err)
      setQrGenerating(false)
    }
  }, [ownerPayment, bill])

  // 4. Mutations
  // Pay bill mutation
  const payMutation = useMutation({
    ...postBillsBillidPayMutationOptions(),
    onSuccess: () => {
      setShowPayModal(false)
      setDebtorNote('')
      setSlipImageBase64(null)
      setSlipFileName(null)
      queryClient.invalidateQueries({
        queryKey: getBillsBillidQueryKey({ path: { billId: billId as string } }),
      })
    },
    onError: (err: any) => {
      setPayError(err?.message || 'Failed to submit payment.')
    },
  })

  // Confirm payment mutation
  const confirmMutation = useMutation({
    ...postBillsBillidPayersPayeridConfirmMutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getBillsBillidQueryKey({ path: { billId: billId as string } }),
      })
    },
    onError: (err: any) => {
      alert(err?.message || 'Failed to confirm payment.')
    },
  })

  // Reject payment mutation
  const rejectMutation = useMutation({
    ...postBillsBillidPayersPayeridRejectMutationOptions(),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: getBillsBillidQueryKey({ path: { billId: billId as string } }),
      })
      alert('Payment rejected. Opening LINE share to notify debtor again...')
      // Re-trigger share to debtor
      await handleShareAgain()
    },
    onError: (err: any) => {
      alert(err?.message || 'Failed to reject payment.')
    },
  })

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

  const handleDownloadQR = () => {
    if (!qrDataUrl) return
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = `PromptPay-QR-${bill?.name || 'bill'}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // Handle Slip Upload (Up to 10MB)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      setPayError('File size exceeds 10MB limit.')
      return
    }

    setSlipFileName(file.name)
    setPayError(null)

    const reader = new FileReader()
    reader.onloadend = () => {
      setSlipImageBase64(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!billId) return
    payMutation.mutate({
      path: { billId },
      body: {
        note: debtorNote.trim() || null,
        slipImage: slipImageBase64 || null,
      },
    })
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

      {/* DEBTOR PAYMENT ACTION BUTTON & STATUS */}
      {!isOwner && (
        <Card className="p-4 space-y-3 border-emerald-100 bg-emerald-50/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Your Payment Status</h3>
              <p className="text-xs text-slate-500">
                {myPayerRecord?.isConfirm
                  ? 'Payment confirmed by owner! 🎉'
                  : myPayerRecord?.isPay
                  ? 'Paid. Waiting for owner to confirm.'
                  : 'Transfer money and click below to notify owner.'}
              </p>
            </div>
            <div>
              {myPayerRecord?.isConfirm ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Confirmed
                </span>
              ) : myPayerRecord?.isPay ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Pending Review
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold">
                  Unpaid
                </span>
              )}
            </div>
          </div>

          {!myPayerRecord?.isConfirm && (
            <Button
              onClick={() => setShowPayModal(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/10"
            >
              <Send className="w-4 h-4" />
              {myPayerRecord?.isPay ? 'Update Payment / Slip' : 'I Have Paid (Notify Owner)'}
            </Button>
          )}
        </Card>
      )}

      {/* OWNER ACTION: Share Again */}
      {isOwner && (
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
            className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white flex items-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            {isSharing ? 'Sharing to LINE...' : 'Share Again to LINE Chat'}
          </Button>
        </Card>
      )}

      {/* DEBTOR VIEW: Owner's Payment Method + PromptPay QR Code */}
      {!isOwner && (
        <Card className="p-4 space-y-3 border-amber-200/80 bg-amber-50/50">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">Owner's Payment Method</h3>
          </div>

          {isPaymentLoading ? (
            <div className="h-24 bg-slate-200/60 rounded-xl animate-pulse" />
          ) : ownerPayment ? (
            <div className="bg-white p-4 rounded-xl border border-amber-200/60 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Channel:</span>
                <span className="font-bold text-slate-800">
                  {ownerPayment.channelName || ownerPayment.channel || 'PromptPay (พร้อมเพย์)'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Account Name:</span>
                <span className="font-semibold text-slate-800">{ownerPayment.name || '-'}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">PromptPay Number</span>
                  <span className="text-base font-mono font-bold text-slate-900">
                    {ownerPayment.accountNo || '-'}
                  </span>
                </div>
                {ownerPayment.accountNo && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyAccount(ownerPayment.accountNo)}
                    className="flex items-center gap-1 text-xs cursor-pointer"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                )}
              </div>

              {/* PromptPay QR Code Display */}
              {qrDataUrl && (
                <div className="pt-3 border-t border-slate-100 flex flex-col items-center text-center space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                    <QrCode className="w-3.5 h-3.5" /> PromptPay QR Code
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <img
                      src={qrDataUrl}
                      alt="PromptPay QR Code"
                      className="w-48 h-48 object-contain mx-auto"
                    />
                    <p className="text-[11px] font-bold text-slate-700 mt-1">
                      Scan to pay ฿{numAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    onClick={handleDownloadQR}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-1.5 text-xs py-2.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Save QR Code
                  </Button>
                </div>
              )}

              {qrGenerating && (
                <div className="text-center py-4 text-xs text-slate-400">
                  Generating PromptPay QR Code...
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-white/80 rounded-xl text-center text-xs text-slate-500">
              The owner hasn't configured their payment details yet. Ask them to update their payment settings!
            </div>
          )}
        </Card>
      )}

      {/* Payers List & Owner Review Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          Participants ({bill.payers?.length || 0})
        </h3>
        {bill.payers && bill.payers.length > 0 ? (
          <div className="space-y-3">
            {bill.payers.map((payer) => {
              const awaitingReview = payer.isPay && !payer.isConfirm

              return (
                <Card
                  key={payer.id}
                  className={`p-3.5 space-y-3 transition-all ${
                    awaitingReview && isOwner
                      ? 'border-amber-300 bg-amber-50/40 shadow-sm'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {payer.userProfile ? (
                        <img
                          src={payer.userProfile}
                          alt={payer.userName || 'Payer'}
                          className="w-9 h-9 rounded-full border border-slate-200 object-cover"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold">
                          {payer.userName ? payer.userName.slice(0, 1) : <UserCheck className="w-4 h-4" />}
                        </div>
                      )}
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">{payer.userName || 'Participant'}</h5>
                        <span className="text-[10px] text-slate-400">
                          {payer.timestamp ? new Date(payer.timestamp).toLocaleTimeString() : ''}
                        </span>
                      </div>
                    </div>

                    <div>
                      {payer.isConfirm ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                          <CheckCircle2 className="w-3 h-3" /> Paid & Confirmed
                        </span>
                      ) : payer.isPay ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                          <Clock className="w-3 h-3" /> Awaiting Confirmation
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                          Unpaid
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Debtor Note & Slip Thumbnail if submitted */}
                  {(payer.payerNote || payer.slipImageBase64) && (
                    <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-xs space-y-2">
                      {payer.payerNote && (
                        <p className="text-slate-600">
                          <span className="font-semibold text-slate-800">Note:</span> {payer.payerNote}
                        </p>
                      )}
                      {payer.slipImageBase64 && (
                        <div className="flex items-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => setInspectSlipUrl(payer.slipImageBase64 || null)}
                            className="relative group rounded-lg overflow-hidden border border-slate-200 cursor-pointer"
                          >
                            <img
                              src={payer.slipImageBase64}
                              alt="Transfer Slip"
                              className="w-14 h-14 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Eye className="w-4 h-4 text-white" />
                            </div>
                          </button>
                          <div>
                            <span className="text-[11px] font-bold text-slate-800 block">Transfer Slip Uploaded</span>
                            <button
                              type="button"
                              onClick={() => setInspectSlipUrl(payer.slipImageBase64 || null)}
                              className="text-[11px] text-emerald-600 font-semibold underline cursor-pointer"
                            >
                              Tap to inspect slip
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Owner Action Buttons: Confirm or Reject */}
                  {isOwner && awaitingReview && (
                    <div className="pt-2 flex items-center gap-2 border-t border-amber-200/60">
                      <Button
                        size="sm"
                        disabled={confirmMutation.isPending || rejectMutation.isPending}
                        onClick={() => {
                          if (!payer.id) return
                          if (confirm('Confirm that debtor has paid this bill? (Slip will be deleted from database)')) {
                            confirmMutation.mutate({
                              path: { billId: bill.id, payerId: payer.id },
                            })
                          }
                        }}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 text-xs h-9 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        {confirmMutation.isPending ? 'Confirming...' : 'Confirm Payment'}
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={confirmMutation.isPending || rejectMutation.isPending}
                        onClick={() => {
                          if (!payer.id) return
                          if (confirm('Reject this payment? This will reset the status and let you re-share the bill.')) {
                            rejectMutation.mutate({
                              path: { billId: bill.id, payerId: payer.id },
                            })
                          }
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs h-9 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        {rejectMutation.isPending ? 'Rejecting...' : 'Reject & Re-share'}
                      </Button>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="text-center py-6 text-xs text-slate-400">
            No participants joined this bill yet. Share it to LINE to add debtors!
          </Card>
        )}
      </div>

      {/* MODAL: Debtor Pay / Upload Slip Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Notify Payment</h3>
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Let {bill.userName || 'the owner'} know you transferred ฿{numAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}.
            </p>

            {payError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{payError}</span>
              </div>
            )}

            <form onSubmit={handlePaySubmit} className="space-y-3">
              <div>
                <Label>Note to Owner (Optional)</Label>
                <Input
                  placeholder="e.g. Transferred via PromptPay at 12:45"
                  value={debtorNote}
                  onChange={(e) => setDebtorNote(e.target.value)}
                />
              </div>

              <div>
                <Label>Attach Transfer Slip (Optional, max 10MB)</Label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {slipImageBase64 ? (
                  <div className="relative border border-slate-200 rounded-2xl p-2 flex items-center gap-3 bg-slate-50">
                    <img
                      src={slipImageBase64}
                      alt="Slip preview"
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                    <div className="overflow-hidden flex-1">
                      <p className="text-xs font-bold text-slate-800 truncate">{slipFileName || 'Slip image'}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setSlipImageBase64(null)
                          setSlipFileName(null)
                        }}
                        className="text-[11px] text-rose-600 font-semibold underline mt-0.5 cursor-pointer"
                      >
                        Remove slip
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-2xl py-4 flex flex-col items-center justify-center text-slate-400 hover:text-emerald-600 transition-all cursor-pointer bg-slate-50/50"
                  >
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-xs font-semibold">Upload Slip Image</span>
                    <span className="text-[10px] text-slate-400">JPG, PNG up to 10MB</span>
                  </button>
                )}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPayModal(false)}
                  className="flex-1 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={payMutation.isPending}
                  className="flex-1 bg-emerald-600 text-white cursor-pointer"
                >
                  {payMutation.isPending ? 'Sending...' : 'Send Notice'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Full View of Transfer Slip */}
      {inspectSlipUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative max-w-sm w-full bg-white rounded-3xl p-3 shadow-2xl space-y-3">
            <div className="flex items-center justify-between px-2 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Transfer Slip</h4>
              <button
                type="button"
                onClick={() => setInspectSlipUrl(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-100 max-h-[70vh] flex items-center justify-center bg-black/5">
              <img
                src={inspectSlipUrl}
                alt="Transfer Slip Large"
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInspectSlipUrl(null)}
              className="w-full cursor-pointer"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
