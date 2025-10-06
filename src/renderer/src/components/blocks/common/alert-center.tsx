import React from 'react'
import { useAlertStore } from '@renderer/store/useAlertStore'
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@renderer/lib/utils'

const kindStyles: Record<string, { bg: string; text: string; ring: string; icon: React.ReactNode }> = {
  success: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-900',
    ring: 'ring-emerald-200',
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />
  },
  error: {
    bg: 'bg-rose-50',
    text: 'text-rose-900',
    ring: 'ring-rose-200',
    icon: <AlertTriangle className="h-5 w-5 text-rose-600" />
  },
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    ring: 'ring-blue-200',
    icon: <Info className="h-5 w-5 text-blue-600" />
  }
}

const AlertCard: React.FC<{
  title: string
  message?: string
  kind: 'success' | 'error' | 'info'
  onClose: () => void
}> = ({ title, message, kind, onClose }) => {
  const s = kindStyles[kind]
  return (
    <div
      className={cn(
        'w-full max-w-md rounded-xl shadow-2xl ring-1 p-4 pointer-events-auto',
        s.bg,
        s.text,
        s.ring
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{s.icon}</div>
        <div className="flex-1">
          <div className="font-semibold">{title}</div>
          {message ? <div className="text-sm opacity-90">{message}</div> : null}
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-sm opacity-60 hover:opacity-100 transition"
          aria-label="Close alert"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

const AlertCenter: React.FC = () => {
  const alerts = useAlertStore((s) => s.alerts)
  const remove = useAlertStore((s) => s.remove)

  if (alerts.length === 0) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="flex flex-col gap-3 items-center justify-center pointer-events-none">
        {alerts.map((a) => (
          <div key={a.id} className="pointer-events-auto animate-in fade-in zoom-in-95 duration-150">
            <AlertCard
              title={a.title}
              message={a.message}
              kind={a.kind}
              onClose={() => remove(a.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlertCenter