import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getBillsQueryOptions } from '@/api/generated/hooks/useGetBills'
import type { Bill } from '@/api/generated/types/Bill'
import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/inputs'
import { HandCoins, ChevronRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { useLiff } from '@/lib/liff'

export const BillsToPayPage: React.FC = () => {
  const { profile } = useLiff()

  const { data, isLoading, error, refetch } = useQuery({
    ...getBillsQueryOptions({ query: { billToPay: true } }),
  })

  const rawList = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.result)
    ? (data as any).result
    : []

  const bills: Bill[] = rawList

  const totalToPay = bills.reduce((sum, b) => {
    const val = typeof b.amount === 'string' ? parseFloat(b.amount) : b.amount
    return sum + (isNaN(val) ? 0 : val)
  }, 0)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Bills to Pay</h1>
        <p className="text-xs text-slate-500">Expenses shared with you by others</p>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 shadow-md shadow-orange-600/10 p-5">
        <p className="text-xs font-medium text-amber-100 uppercase tracking-wider">Total Bills Involved</p>
        <p className="text-3xl font-black mt-1">฿{totalToPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        <div className="mt-2 text-xs text-amber-100/90 flex items-center gap-2">
          <span>{bills.length} bills pending or paid</span>
        </div>
      </Card>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3 py-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-slate-200/60 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col items-center text-center">
          <AlertCircle className="w-6 h-6 text-rose-500 mb-1" />
          <p className="text-xs font-medium text-rose-700">Failed to load bills to pay</p>
          <button
            onClick={() => refetch()}
            className="mt-2 text-xs text-rose-600 underline font-semibold cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && bills.length === 0 && (
        <Card className="text-center py-12 px-6">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400 mb-3">
            <HandCoins className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">All clear!</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            You don't have any pending debts or bills shared with you right now.
          </p>
        </Card>
      )}

      {/* Bill List */}
      <div className="space-y-2.5">
        {bills.map((bill) => {
          const numAmount = typeof bill.amount === 'string' ? parseFloat(bill.amount) : bill.amount
          // Find payer status for current user
          const myPayerRecord = bill.payers?.find((p) => p.userId === profile?.userId)
          const isPaid = myPayerRecord?.isPay ?? false

          return (
            <Link
              key={bill.id}
              to="/bills/$billId"
              params={{ billId: bill.id }}
              className="block group"
            >
              <Card className="hover:border-amber-300 transition-all flex items-center justify-between p-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-slate-100 rounded-2xl flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                    {bill.emoji || '🧾'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{bill.name}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>Owner: {bill.userName || 'Friend'}</span>
                      {bill.timestamp && (
                        <span>• {new Date(bill.timestamp).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-900 block">
                      ฿{numAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span
                      className={`inline-flex items-center gap-0.5 text-[10px] font-semibold mt-0.5 ${
                        isPaid ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {isPaid ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> Paid
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" /> Pending
                        </>
                      )}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
