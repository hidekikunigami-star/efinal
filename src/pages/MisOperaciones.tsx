import { useState } from 'react'
import { api, apiError, useGet } from '../api'
import { Alert, Status } from './ui'

type Loan = { id: number; materialTitle?: string; material?: { title: string }; days: number; status: string }

export default function MisOperaciones() {
  const { data, load, err, reload } = useGet<Loan[] | { content: Loan[] }>('/loans/my')
  const loans = Array.isArray(data) ? data : data?.content ?? []
  const [msg, setMsg] = useState({ text: '', ok: false })
  const [busy, setBusy] = useState<number>()

  const devolver = async (id: number) => {
    if (!confirm('¿Confirmas la devolución de este préstamo?')) return
    setBusy(id)
    try {
      await api.patch(`/loans/${id}/return`)
      setMsg({ text: 'Préstamo devuelto correctamente', ok: true })
    } catch (e: any) {
      setMsg({ text: e?.response?.status === 409 ? 'El préstamo cambió de estado. Se actualizó la lista.' : apiError(e), ok: false })
    } finally {
      setBusy(undefined)
      reload()
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Mis préstamos</h2>
      <Alert msg={msg.text} ok={msg.ok} />
      <Status load={load} err={err} reload={reload}>
        {!loans.length ? (
          <p className="text-center text-slate-500 py-10">Aún no tienes préstamos.</p>
        ) : (
          <table className="w-full bg-white rounded-xl shadow overflow-hidden text-left">
            <thead className="bg-indigo-600 text-white">
              <tr>{['ID', 'Material', 'Días', 'Estado', ''].map(h => <th key={h} className="p-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {loans.map(l => (
                <tr key={l.id} className="border-t">
                  <td className="p-3">{l.id}</td>
                  <td className="p-3">{l.materialTitle ?? l.material?.title}</td>
                  <td className="p-3">{l.days}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${l.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700'}`}>{l.status}</span>
                  </td>
                  <td className="p-3">
                    {l.status === 'ACTIVE' && (
                      <button onClick={() => devolver(l.id)} disabled={busy === l.id} className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm disabled:opacity-40">
                        {busy === l.id ? 'Devolviendo...' : 'Devolver'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Status>
    </div>
  )
}
