import React, { useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import { Navigation } from './Navigation'
import { useLiff } from '@/lib/liff'
import { Cat, AlertCircle } from 'lucide-react'
import { SplashScreen } from './SplashScreen'
import { LocaleSelector, useI18n } from '@/lib/i18n'

export const Layout: React.FC = () => {
  const { isReady, isLoggedIn, profile, error, login } = useLiff()
  const { t } = useI18n()
  const [splashFinished, setSplashFinished] = useState(false)

  // Show rich Splash Screen while LIFF initializes and for initial brand experience
  if (!splashFinished || !isReady) {
    return <SplashScreen onFinish={() => setSplashFinished(true)} duration={1800} />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
        <div className="absolute top-4 right-4"><LocaleSelector /></div>
        <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
        <h2 className="text-lg font-bold text-slate-800">{t('Connection Error')}</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xs">{error.message}</p>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
        <div className="absolute top-4 right-4"><LocaleSelector /></div>
        <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
          <Cat className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">TheCatsLedger</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-xs">
          {t('Split bills and track debts easily with friends inside LINE.')}
        </p>
        <button
          onClick={login}
          className="mt-6 w-full max-w-xs py-3.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-semibold rounded-2xl shadow-md shadow-emerald-200 transition-all cursor-pointer"
        >
          {t('Log in with LINE')}
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 max-w-lg mx-auto shadow-sm min-w-[320px]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Cat className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-extrabold text-slate-900 leading-none">TheCatsLedger</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSelector />
          {profile && (
            <div className="flex items-center gap-2">
            {profile.pictureUrl ? (
              <img
                src={profile.pictureUrl}
                alt={profile.displayName}
                className="w-8 h-8 rounded-full border border-slate-200 object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">
                {profile.displayName.slice(0, 1)}
              </div>
            )}
            </div>
          )}
        </div>
      </header>

      {/* Main Outlet */}
      <main className="p-4">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  )
}
