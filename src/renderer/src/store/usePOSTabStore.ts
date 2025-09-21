import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Tab {
  id: string
  orderId: string | null
  orderData: any | null
  type: 'new' | 'existing'
  customer: {
    name: string
    gst: string
  }
  items?: any[]
  isEdited?: boolean
  taxAmount?: number
  invoiceData?: any
}

interface POSTabStore {
  tabs: Tab[]
  activeTabId: string | null

  openTab: (orderId: string, orderData?: any) => void
  createNewTab: () => void
  closeTab: (tabId: string) => void
  setActiveTab: (tabId: string) => void

  // Tab data methods
  addItemToTab: (tabId: string, item: any) => void
  removeItemFromTab: (tabId: string, itemIndex: number) => void
  setTabItems: (tabId: string, items: any[]) => void
  updateTabOrderId: (tabId: string, orderId: string) => void
  updateTabTaxAmount: (tabId: string, taxAmount: number) => void
  setTabEdited: (tabId: string, isEdited: boolean) => void
  updateTabInvoiceData: (tabId: string, invoiceData: any) => void
}

// Mock data
const mockProducts = [
  { id: 1, code: 'PROD001', name: 'Sample Product 1', price: 100, uom: 'Each' },
  { id: 2, code: 'PROD002', name: 'Sample Product 2', price: 200, uom: 'Each' },
  { id: 3, code: 'PROD003', name: 'Sample Product 3', price: 150, uom: 'Each' }
]

const mockCustomers = [{ name: 'Walking Customer', gst: 'Not Applicable' }]

export const usePOSTabStore = create<POSTabStore>()(
  persist(
    (set, get) => ({
      tabs: [],
      activeTabId: null,

      // Tab management methods
      openTab: (orderId: string, orderData?: any) => {
        const newTab: Tab = {
          id: `tab-${Date.now()}`,
          orderId,
          orderData,
          type: 'existing',
          customer: { name: 'Walking Customer', gst: 'Not Applicable' },
          items: [],
          isEdited: false,
          taxAmount: 0,
          invoiceData: null
        }

        set((state) => ({
          tabs: [...state.tabs, newTab],
          activeTabId: newTab.id
        }))
      },

      createNewTab: () => {
        const newTab: Tab = {
          id: `tab-${Date.now()}`,
          orderId: null,
          orderData: null,
          type: 'new',
          customer: { name: 'Walking Customer', gst: 'Not Applicable' },
          items: [],
          isEdited: false,
          taxAmount: 0,
          invoiceData: null
        }

        set((state) => ({
          tabs: [...state.tabs, newTab],
          activeTabId: newTab.id
        }))
      },

      closeTab: (tabId: string) => {
        set((state) => {
          const newTabs = state.tabs.filter((tab) => tab.id !== tabId)
          const newActiveTabId = newTabs.length > 0 ? newTabs[0].id : null

          return {
            tabs: newTabs,
            activeTabId: newActiveTabId
          }
        })
      },

      setActiveTab: (tabId: string) => {
        set({ activeTabId: tabId })
      },

      // Tab data methods
      addItemToTab: (tabId: string, item: any) => {
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === tabId ? { ...tab, items: [...(tab.items || []), item] } : tab
          )
        }))
      },

      removeItemFromTab: (tabId: string, itemIndex: number) => {
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === tabId
              ? { ...tab, items: (tab.items || []).filter((_, idx) => idx !== itemIndex) }
              : tab
          )
        }))
      },

      setTabItems: (tabId: string, items: any[]) => {
        set((state) => ({
          tabs: state.tabs.map((tab) => (tab.id === tabId ? { ...tab, items } : tab))
        }))
      },

      updateTabOrderId: (tabId: string, orderId: string) => {
        set((state) => ({
          tabs: state.tabs.map((tab) => (tab.id === tabId ? { ...tab, orderId } : tab))
        }))
      },

      updateTabTaxAmount: (tabId: string, taxAmount: number) => {
        set((state) => ({
          tabs: state.tabs.map((tab) => (tab.id === tabId ? { ...tab, taxAmount } : tab))
        }))
      },

      setTabEdited: (tabId: string, isEdited: boolean) => {
        set((state) => ({
          tabs: state.tabs.map((tab) => (tab.id === tabId ? { ...tab, isEdited } : tab))
        }))
      },

      updateTabInvoiceData: (tabId: string, invoiceData: any) => {
        set((state) => ({
          tabs: state.tabs.map((tab) => (tab.id === tabId ? { ...tab, invoiceData } : tab))
        }))
      }
    }),
    {
      name: 'pos-tab-store',
      partialize: (state) => ({ tabs: state.tabs, activeTabId: state.activeTabId })
    }
  )
)

export { mockProducts, mockCustomers }
