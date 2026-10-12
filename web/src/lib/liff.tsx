import { useEffect, useState, createContext, useContext } from 'react'
import liff from '@line/liff'

export interface LiffProfile {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

interface LiffContextType {
  isReady: boolean
  isLoggedIn: boolean
  idToken: string | null
  profile: LiffProfile | null
  error: Error | null
  login: () => void
  logout: () => void
  shareTargetPicker: (messages: Parameters<typeof liff.shareTargetPicker>[0]) => Promise<boolean>
}

const LiffContext = createContext<LiffContextType>({
  isReady: false,
  isLoggedIn: false,
  idToken: null,
  profile: null,
  error: null,
  login: () => {},
  logout: () => {},
  shareTargetPicker: async () => false,
})

// Module-level token holder for Axios interceptors
let cachedIdToken: string | null = null

export function getCachedIdToken(): string | null {
  return cachedIdToken
}

export function LiffProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [idToken, setIdToken] = useState<string | null>(null)
  const [profile, setProfile] = useState<LiffProfile | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const liffId = import.meta.env.VITE_LIFF_ID

    if (!liffId || liffId.includes('placeholder')) {
      console.warn('⚠️ LIFF ID is not configured or is a placeholder. Using mock profile for local development.')
      const mockProfile: LiffProfile = {
        userId: 'mock-user-1234',
        displayName: 'Dev Cat',
        pictureUrl: 'https://placekitten.com/200/200',
      }
      setProfile(mockProfile)
      setIsLoggedIn(true)
      setIsReady(true)
      cachedIdToken = 'mock-id-token'
      setIdToken('mock-id-token')
      return
    }

    liff
      .init({ liffId })
      .then(async () => {
        setIsReady(true)
        if (liff.isLoggedIn()) {
          setIsLoggedIn(true)
          const token = liff.getIDToken()
          cachedIdToken = token
          setIdToken(token)

          try {
            const userProfile = await liff.getProfile()
            setProfile(userProfile)
          } catch (profileErr) {
            console.error('Failed to get LIFF profile', profileErr)
          }
        } else {
          // In LIFF browser, prompt login if not logged in
          if (liff.isInClient()) {
            liff.login()
          }
        }
      })
      .catch((err) => {
        console.error('LIFF initialization failed', err)
        setError(err)
        setIsReady(true)
      })
  }, [])

  const login = () => {
    if (!liff.isLoggedIn()) {
      liff.login()
    }
  }

  const logout = () => {
    if (liff.isLoggedIn()) {
      liff.logout()
      setIsLoggedIn(false)
      setIdToken(null)
      cachedIdToken = null
      setProfile(null)
    }
  }

  const shareTargetPicker = async (messages: Parameters<typeof liff.shareTargetPicker>[0]): Promise<boolean> => {
    if (!isReady) return false
    try {
      if (liff.isApiAvailable('shareTargetPicker')) {
        const res = await liff.shareTargetPicker(messages)
        return Boolean(res)
      } else {
        alert('LINE ShareTargetPicker is not supported in this client environment.')
        return false
      }
    } catch (err) {
      console.error('shareTargetPicker error:', err)
      return false
    }
  }

  return (
    <LiffContext.Provider
      value={{
        isReady,
        isLoggedIn,
        idToken,
        profile,
        error,
        login,
        logout,
        shareTargetPicker,
      }}
    >
      {children}
    </LiffContext.Provider>
  )
}

export function useLiff() {
  return useContext(LiffContext)
}
