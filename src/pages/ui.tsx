import type { ReactNode, InputHTMLAttributes } from 'react'

export const Card = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="min-h-screen grid place-items-center bg-slate-100 p-4">
    <div className="w-full max-w-sm bg-white rounded-2xl shadow p-8 space-y-4">
      <h1 className="text-2xl font-bold text-indigo-700 text-center">{title}</h1>
      {children}
    </div>
  </div>
)

export const Input = (p: InputHTMLAttributes<HTMLInputElement>) => (
  <input {...p} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
)

export const btn = 'px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-40'

export const Button = ({ children, disabled }: { children: ReactNode; disabled?: boolean }) => (
  <button disabled={disabled} className={`w-full ${btn}`}>{children}</button>
)

export const Alert = ({ msg, ok }: { msg?: string; ok?: boolean }) =>
  msg ? <p className={`text-sm rounded-lg p-2 ${ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{msg}</p> : null

export const Spinner = () => (
  <div className="flex justify-center py-10">
    <div className="h-10 w-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
  </div>
)

export const Status = ({ load, err, reload, children }: { load: boolean; err: string; reload: () => void; children: ReactNode }) =>
  load ? <Spinner /> : err ? (
    <div className="space-y-2 text-center">
      <Alert msg={err} />
      <button className={btn} onClick={reload}>Reintentar</button>
    </div>
  ) : <>{children}</>
