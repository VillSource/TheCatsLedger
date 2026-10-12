import React from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Receipt, HandCoins, PlusCircle, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Navigation: React.FC = () => {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const navItems = [
    {
      to: '/my-bills',
      label: 'My Bills',
      icon: Receipt,
    },
    {
      to: '/bills-to-pay',
      label: 'Bills to Pay',
      icon: HandCoins,
    },
    {
      to: '/create-bill',
      label: 'New Bill',
      icon: PlusCircle,
      highlight: true,
    },
    {
      to: '/settings',
      label: 'Payment',
      icon: CreditCard,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 max-w-lg mx-auto">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentPath === item.to || (item.to === '/my-bills' && currentPath === '/')
          const Icon = item.icon

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 select-none text-xs font-medium',
                item.highlight
                  ? 'text-emerald-600 font-semibold'
                  : isActive
                  ? 'text-emerald-600'
                  : 'text-slate-500 hover:text-slate-800'
              )}
            >
              <div
                className={cn(
                  'p-1.5 rounded-xl transition-all',
                  item.highlight
                    ? 'bg-emerald-50 text-emerald-600'
                    : isActive
                    ? 'bg-slate-100 text-emerald-600'
                    : ''
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
