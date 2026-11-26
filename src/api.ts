import axios from 'axios'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.request.use(c => {
  const t = localStorage.getItem('token')
  if (t) c.headers.Authorization = `Bearer ${t}`
  return c
})

export const apiError = (e: any): string => {
  const d = e?.response?.data
  if (!d) return 'No se pudo conectar con el servidor'
  if (typeof d === 'string') return d
  if (Array.isArray(d.errors)) return d.errors.map((x: any) => x.message ?? x).join(', ')
  if (d.errors && typeof d.errors === 'object') return Object.values(d.errors).join(', ')
  return d.message ?? d.error ?? 'Error inesperado'
}
