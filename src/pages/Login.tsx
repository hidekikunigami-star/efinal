import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api, apiError } from '../api'
import { Card, Input, Button, Alert } from './ui'

export default function Login() {
  const [f, setF] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')
  const [load, setLoad] = useState(false)
  const nav = useNavigate()
  const ok = useLocation().state?.ok

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setErr('')
    setLoad(true)
    try {
      const { data } = await api.post('/auth/login', f)
      localStorage.setItem('token', data.token ?? data.accessToken ?? data.jwt)
      nav('/dashboard')
    } catch (e: any) {
      setErr([400, 401].includes(e?.response?.status) ? 'Correo o contraseña incorrectos' : apiError(e))
    } finally {
      setLoad(false)
    }
  }

  return (
    <Card title="Biblioteca Activa">
      <Alert msg={ok} ok />
      <form onSubmit={submit} className="space-y-3">
        <Input type="email" required placeholder="Correo" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
        <Input type="password" required placeholder="Contraseña" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} />
        <Alert msg={err} />
        <Button disabled={load}>{load ? 'Ingresando...' : 'Ingresar'}</Button>
      </form>
      <p className="text-sm text-center">¿No tienes cuenta? <Link to="/register" className="text-indigo-600 font-medium">Regístrate</Link></p>
    </Card>
  )
}
