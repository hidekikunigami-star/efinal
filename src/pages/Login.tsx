import { useState, type SubmitEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api, apiError } from '../api'
import { Card, Input, Button, Alert } from './ui'

export default function Login() {
  const [err, setErr] = useState('')
  const [load, setLoad] = useState(false)
  const nav = useNavigate()

  const submit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoad(true)
    try {
      const { data } = await api.post('/auth/login', Object.fromEntries(new FormData(e.currentTarget)))
      localStorage.setItem('token', data.token)
      nav('/dashboard')
    } catch (e: any) {
      setErr(e?.response?.status === 401 ? 'Correo o contraseña incorrectos' : apiError(e))
      setLoad(false)
    }
  }

  return (
    <Card title="Biblioteca Activa">
      <Alert msg={useLocation().state?.ok} ok />
      <form onSubmit={submit} className="space-y-3">
        <Input name="email" type="email" required placeholder="Correo" />
        <Input name="password" type="password" required placeholder="Contraseña" />
        <Alert msg={err} />
        <Button disabled={load}>{load ? 'Ingresando...' : 'Ingresar'}</Button>
      </form>
      <p className="text-sm text-center">¿No tienes cuenta? <Link to="/register" className="text-indigo-600 font-medium">Regístrate</Link></p>
    </Card>
  )
}
