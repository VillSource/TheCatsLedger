import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getApiV1BillsQueryOptions as getBillsQueryOptions } from '@/api/generated/hooks/useGetApiV1Bills'
import type { Bill } from '@/api/generated/types/Bill'
import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/inputs'
import { Receipt, Users, Plus, AlertCircle, ChevronRight } from 'lucide-react'

export const MyBillsPage: React.FC = () => {
  const { data, isLoading, error, refetch } = useQuery({
    ...getBillsQueryOptions(),
  })

  // The backend returns TaskOfListOfBill / ListOfBill: [{ id, name, amount, ... }]
  // Unwrapping might give array directly or an object with result
  const rawList = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.result)
    ? (data as any).result
    : []

  const bills: Bill[] = rawList

  const totalAmount = bills.reduce((sum, b) => {
    const val = typeof b.amount === 'string' ? parseFloat(b.amount) : b.amount
    return sum + (isNaN(val) ? 0 : val)
  }, 0)

  return (
    <div className="space-y-4">
      {/* Header Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">My Bills</h1>
          <p className="text-xs text-slate-500">Bills created by you</p>
        </div>
        <Link
          to="/create-bill"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> New Bill
        </Link>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-0 shadow-md shadow-emerald-700/10 p-5">
        <p className="text-xs font-medium text-emerald-100 uppercase tracking-wider">Total Recorded by You</p>
        <p className="text-3xl font-black mt-1">฿{totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        <div className="mt-2 text-xs text-emerald-100/90 flex items-center gap-2">
          <span>{bills.length} total bills</span>
        </div>
      </Card>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-3 py-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-slate-200/60 rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col items-center text-center">
          <AlertCircle className="w-6 h-6 text-rose-500 mb-1" />
          <p className="text-xs font-medium text-rose-700">Failed to load bills</p>
          <button
            onClick={() => refetch()}
            className="mt-2 text-xs text-rose-600 underline font-semibold cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && bills.length === 0 && (
        <Card className="text-center py-12 px-6">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400 mb-3">
            <Receipt className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No bills yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            You haven't created any bills yet. Tap the button below to start tracking your first expense.
          </p>
          <Link
            to="/create-bill"
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl"
          >
            <Plus className="w-4 h-4" /> Create Bill
          </Link>
        </Card>
      )}

      {/* List */}
      <div className="space-y-2.5">
        {bills.map((bill) => {
          const numAmount = typeof bill.amount === 'string' ? parseFloat(bill.amount) : bill.amount
          const payersCount = bill.payers?.length || 0

          return (
            <Link
              key={bill.id}
              to="/bills/$billId"
              params={{ billId: bill.id }}
              className="block group"
            >
              <Card className="hover:border-emerald-300 transition-all flex items-center justify-between p-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-slate-100 rounded-2xl flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                    {bill.emoji || '🧾'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{bill.name}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {payersCount} payers
                      </span>
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
