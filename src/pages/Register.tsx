import { useState, type SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, apiError } from '../api'
import { Card, Input, Button, Alert } from './ui'

export default function Register() {
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState('')
  const [load, setLoad] = useState(false)
  const nav = useNavigate()

  const validate = () => {
    if (!f.name.trim() || f.name.length > 100) return 'El nombre es obligatorio y de máximo 100 caracteres'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return 'Correo inválido'
    if (f.password.length < 8 || f.password.length > 72) return 'La contraseña debe tener entre 8 y 72 caracteres'
    return ''
  }

  const submit = async (e: SubmitEvent) => {
    e.preventDefault()
    const v = validate()
    setErr(v)
    if (v) return
    setLoad(true)
    try {
      await api.post('/auth/register', { ...f, name: f.name.trim() })
      nav('/login', { state: { ok: 'Registro exitoso, inicia sesión' } })
    } catch (e) {
      setErr(apiError(e))
    } finally {
      setLoad(false)
    }
  }

  return (
    <Card title="Crear cuenta">
      <form onSubmit={submit} className="space-y-3">
        <Input placeholder="Nombre" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
        <Input placeholder="Correo" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
        <Input type="password" placeholder="Contraseña" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} />
        <Alert msg={err} />
        <Button disabled={load}>{load ? 'Enviando...' : 'Registrarse'}</Button>
      </form>
      <p className="text-sm text-center">¿Ya tienes cuenta? <Link to="/login" className="text-indigo-600 font-medium">Inicia sesión</Link></p>
    </Card>
  )
}
