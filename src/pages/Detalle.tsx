import { useParams } from 'react-router-dom'

export default function Detalle() {
  const { id } = useParams()
  return <h2 className="text-xl font-bold">Detalle del material {id}</h2>
}
