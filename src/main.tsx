import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import './index.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Detalle from './pages/Detalle'
import MisOperaciones from './pages/MisOperaciones'

const Private = () => (localStorage.getItem('token') ? <Outlet /> : <Navigate to="/login" replace />)

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Private />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/materiales/:id" element={<Detalle />} />
          <Route path="/mis-operaciones" element={<MisOperaciones />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </BrowserRouter>
)
