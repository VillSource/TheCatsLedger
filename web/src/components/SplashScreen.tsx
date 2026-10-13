import React, { useEffect, useState } from 'react'
import { Cat, Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

interface SplashScreenProps {
  onFinish?: () => void
  duration?: number
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, duration = 1800 }) => {
  const [fadeOut, setFadeOut] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, duration - 400)

    const finishTimer = setTimeout(() => {
      onFinish?.()
    }, duration)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(finishTimer)
    }
  }, [duration, onFinish])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-6 bg-gradient-to-b from-emerald-500 via-emerald-600 to-teal-800 text-white transition-opacity duration-500 select-none ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Decorative background glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top spacer */}
      <div className="w-full" />

      {/* Center Brand Hero */}
      <div className="flex flex-col items-center text-center relative z-10">
        <div className="relative mb-6">
          <div className="w-28 h-28 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-950/30 transform hover:scale-105 transition-transform duration-300">
            <Cat className="w-16 h-16 text-white drop-shadow-md" />
          </div>

          {/* Sparkle badge */}
          <div className="absolute -top-2 -right-2 p-2 bg-amber-400 text-amber-950 rounded-2xl shadow-lg animate-bounce">
            <Sparkles className="w-4 h-4 fill-amber-950" />
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-tight drop-shadow-sm">
          The Cat's Ledger
        </h1>
        <p className="text-sm font-medium text-emerald-100 mt-2 max-w-xs drop-shadow-xs">
          {t('Smart, simple debt recording & bill splitting inside LINE')}
        </p>

        {/* Loading dots animation */}
        <div className="flex items-center gap-2 mt-8">
          <span className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-white animate-bounce" />
        </div>
      </div>

      {/* Bottom Branding / Version */}
      <div className="relative z-10 text-center text-xs text-emerald-100/70">
        <p className="font-semibold tracking-wider uppercase text-[10px] text-emerald-200">{t('LINE Mini App Edition')}</p>
        <p className="mt-0.5 text-[11px]">{t('Powered by LINE LIFF')}</p>
      </div>
    </div>
  )
}
