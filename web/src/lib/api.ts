import { client } from '../api/generated/.kubb/client'
import { getCachedIdToken } from './liff'

// Configure Kubb Client with Base URL from Environment
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7216'

client.setConfig({
  baseURL,
  auth: () => {
    const token = getCachedIdToken()
    return token ?? undefined
  },
})

// Add request interceptor to always attach Bearer token if present
client.interceptors.request.use((config) => {
  const token = getCachedIdToken()
  if (token && config.headers) {
    // If not already set
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  }
  return config
})

export { client }
