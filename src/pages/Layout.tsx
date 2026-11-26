import { NavLink, Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
  const nav = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    nav('/login', { replace: true })
  }
  const link = ({ isActive }: { isActive: boolean }) => (isActive ? 'font-semibold underline' : 'opacity-90')

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-indigo-700 text-white px-6 py-3 flex items-center gap-6">
        <span className="font-bold text-lg">Biblioteca Activa</span>
        <NavLink to="/dashboard" className={link}>Dashboard</NavLink>
        <NavLink to="/mis-operaciones" className={link}>Mis operaciones</NavLink>
        <button onClick={logout} className="ml-auto bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1">Cerrar sesión</button>
      </header>
      <main className="max-w-4xl mx-auto p-6"><Outlet /></main>
    </div>
  )
}
