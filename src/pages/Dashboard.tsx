import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, apiError } from '../api'
import { Alert } from './ui'

type Material = { id: number; title: string; author: string; category: string; availableCopies: number }

export default function Dashboard() {
  const [page, setPage] = useState(0)
  const [items, setItems] = useState<Material[]>([])
  const [total, setTotal] = useState(1)
  const [load, setLoad] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    setLoad(true)
    setErr('')
    api.get('/materials', { params: { page, size: 10 } })
      .then(({ data }) => {
        setItems(data.content ?? [])
        setTotal(Math.max(data.totalPages ?? 1, 1))
      })
      .catch(e => setErr(apiError(e)))
      .finally(() => setLoad(false))
  }, [page])

  const btn = 'px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-40'

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Materiales</h2>
      <Alert msg={err} />
      {load ? <p>Cargando...</p> : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map(m => (
            <Link key={m.id} to={`/materiales/${m.id}`} className="bg-white rounded-xl shadow p-4 hover:ring-2 hover:ring-indigo-400">
              <h3 className="font-semibold text-indigo-700">{m.title}</h3>
              <p className="text-sm">Autor: {m.author}</p>
              <p className="text-sm">Categoría: {m.category}</p>
              <p className="text-sm">Disponibles: {m.availableCopies}</p>
            </Link>
          ))}
          {!items.length && !err && <p>No hay materiales.</p>}
        </div>
      )}
      <div className="flex items-center justify-center gap-4">
        <button className={btn} disabled={load || page === 0} onClick={() => setPage(page - 1)}>Anterior</button>
        <span>Página {page + 1} de {total}</span>
        <button className={btn} disabled={load || page + 1 >= total} onClick={() => setPage(page + 1)}>Siguiente</button>
      </div>
    </div>
  )
}
