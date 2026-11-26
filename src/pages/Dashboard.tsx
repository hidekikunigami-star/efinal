import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGet } from '../api'
import { Status, btn } from './ui'

export type Material = { id: number; title: string; description: string; author: string; category: string; availableCopies: number }

export default function Dashboard() {
  const [page, setPage] = useState(0)
  const { data, load, err, reload } = useGet<{ content: Material[]; totalPages: number }>('/materials', { page, size: 10 })
  const items = data?.content ?? []
  const total = Math.max(data?.totalPages ?? 1, 1)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Materiales</h2>
      <Status load={load} err={err} reload={reload}>
        {!items.length && <p className="text-center text-slate-500 py-10">No hay materiales disponibles.</p>}
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map(m => (
            <Link key={m.id} to={`/materials/${m.id}`} className="bg-white rounded-xl shadow p-4 hover:ring-2 hover:ring-indigo-400">
              <h3 className="font-semibold text-indigo-700">{m.title}</h3>
              <p className="text-sm">Autor: {m.author}</p>
              <p className="text-sm">Categoría: {m.category}</p>
              <p className="text-sm">Disponibles: {m.availableCopies}</p>
            </Link>
          ))}
        </div>
      </Status>
      <div className="flex items-center justify-center gap-4">
        <button className={btn} disabled={load || page === 0} onClick={() => setPage(page - 1)}>Anterior</button>
        <span>Página {page + 1} de {total}</span>
        <button className={btn} disabled={load || page + 1 >= total} onClick={() => setPage(page + 1)}>Siguiente</button>
      </div>
    </div>
  )
}
