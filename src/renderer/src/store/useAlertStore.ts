import { create } from 'zustand'
import { nanoid } from 'nanoid'

type AlertKind = 'success' | 'error' | 'info'

export type AppAlert = {
  id: string
  kind: AlertKind
  title: string
  message?: string
  timeoutMs?: number
}

type AlertStore = {
  alerts: AppAlert[]
  add: (alert: Omit<AppAlert, 'id'>) => void
  addSuccess: (title: string, message?: string, timeoutMs?: number) => void
  addError: (title: string, message?: string, timeoutMs?: number) => void
  addInfo: (title: string, message?: string, timeoutMs?: number) => void
  remove: (id: string) => void
  clear: () => void
}

export const useAlertStore = create<AlertStore>((set, get) => ({
  alerts: [],

  add: (alert) => {
    const id = nanoid()
    const timeoutMs = alert.timeoutMs ?? 2500
    const next = { ...alert, id, timeoutMs }
    set((s) => ({ alerts: [...s.alerts, next] }))
    if (timeoutMs > 0) {
      setTimeout(() => get().remove(id), timeoutMs)
    }
  },

  addSuccess: (title, message, timeoutMs) =>
    get().add({ kind: 'success', title, message, timeoutMs }),

  addError: (title, message, timeoutMs) =>
    get().add({ kind: 'error', title, message, timeoutMs }),

  addInfo: (title, message, timeoutMs) =>
    get().add({ kind: 'info', title, message, timeoutMs }),

  remove: (id) => set((s) => ({ alerts: s.alerts.filter((a) => a.id !== id) })),
  clear: () => set({ alerts: [] })
}))