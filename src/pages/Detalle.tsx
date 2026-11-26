import { useState, type SubmitEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api, apiError, useGet } from '../api'
import { Alert, Input, Status, btn } from './ui'
import type { Material } from './Dashboard'

export default function Detalle() {
  const { id } = useParams()
  const { data: m, load, err, reload } = useGet<Material>(`/materials/${id}`)
  const [days, setDays] = useState('')
  const [fieldErr, setFieldErr] = useState('')
  const [msg, setMsg] = useState({ text: '', ok: false })
  const [sending, setSending] = useState(false)

  const submit = async (e: SubmitEvent) => {
    e.preventDefault()
    const n = Number(days)
    setMsg({ text: '', ok: false })
    if (!Number.isInteger(n) || n < 1 || n > 7) return setFieldErr('Ingresa un número entero entre 1 y 7')
    setFieldErr('')
    setSending(true)
    try {
      await api.post('/loans', { materialId: Number(id), days: n })
      setMsg({ text: 'Solicitud de préstamo registrada', ok: true })
      setDays('')
      reload()
    } catch (e) {
      setMsg({ text: apiError(e), ok: false })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-4">
      <Link to="/dashboard" className="text-indigo-600 font-medium">← Volver al dashboard</Link>
      <Status load={load} err={err} reload={reload}>
        {m && (
          <div className="bg-white rounded-xl shadow p-6 space-y-2">
            <h2 className="text-2xl font-bold text-indigo-700">{m.title}</h2>
            <p>{m.description}</p>
            <p><b>Autor:</b> {m.author}</p>
            <p><b>Categoría:</b> {m.category}</p>
            <p><b>Ejemplares disponibles:</b> {m.availableCopies}</p>
          </div>
        )}
      </Status>
      <form onSubmit={submit} className="bg-white rounded-xl shadow p-6 space-y-3 max-w-sm">
        <label className="font-medium">Días de préstamo</label>
        <Input type="number" value={days} onChange={e => setDays(e.target.value)} placeholder="1 a 7" />
        {fieldErr && <p className="text-sm text-red-600">{fieldErr}</p>}
        <Alert msg={msg.text} ok={msg.ok} />
        <button className={`w-full ${btn}`} disabled={sending}>{sending ? 'Enviando...' : 'Solicitar préstamo'}</button>
      </form>
    </div>
  )
}
