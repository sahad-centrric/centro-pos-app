// useCartItemStore.ts
import { CartItem, EditableField } from '@renderer/types/cart'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ICartItemStore {
  items: CartItem[]
  selectedItemId: string
  activeField: EditableField
  isEditing: boolean
  _indexMap: Map<string, number>
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  selectItem: (itemId: string) => void
  updateItem: (itemId: string, updates: Partial<CartItem>) => void
  clearItems: () => void
  itemExists: (itemId: string) => boolean
  navigateItem: (direction: 'up' | 'down') => void
  setEditingState: (editing: boolean, field: EditableField) => void
}

export const useCartItemStore = create<ICartItemStore>()(
  persist(
    (set, get) => ({
      items: [],
      selectedItemId: '',
      activeField: 'quantity',
      isEditing: false,
      _indexMap: new Map(),

      addItem: (item: CartItem) =>
        set((state) => {
          const newItems = [...state.items, item]
          const newMap = new Map<string, number>()
          newItems.forEach((item, idx) => newMap.set(item.item_code, idx))
          return {
            items: newItems,
            selectedItemId: item.item_code,
            activeField: 'quantity',
            isEditing: false,
            _indexMap: newMap
          }
        }),

      removeItem: (itemId: string) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.item_code !== itemId)
          const newMap = new Map<string, number>()
          newItems.forEach((item, idx) => newMap.set(item.item_code, idx))
          return {
            items: newItems,
            isEditing: false,
            _indexMap: newMap
          }
        }),

      selectItem: (itemId: string) =>
        set(() => ({
          selectedItemId: itemId,
          activeField: 'quantity',
          isEditing: false
        })),

      updateItem: (itemId: string, updates: Partial<CartItem>) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.item_code === itemId ? { ...item, ...updates } : item
          )
        })),

      clearItems: () =>
        set(() => ({
          items: [],
          selectedItemId: '',
          activeField: 'quantity',
          isEditing: false,
          _indexMap: new Map()
        })),

      navigateItem: (direction: 'up' | 'down') => {
        const { items, selectedItemId, _indexMap } = get()
        if (!items.length) return
        const currentIndex = _indexMap.get(selectedItemId) ?? -1
        let nextIndex: number
        if (direction === 'down') {
          nextIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 1, items.length - 1)
        } else {
          nextIndex = currentIndex === -1 ? items.length - 1 : Math.max(currentIndex - 1, 0)
        }
        set({
          selectedItemId: items[nextIndex].item_code,
          activeField: 'quantity',
          isEditing: false
        })
      },

      setEditingState: (editing: boolean, field: EditableField) => {
        set({ isEditing: editing, activeField: field })
      },

      itemExists: (itemId: string) => {
        return get()._indexMap.has(itemId)
      }
    }),
    {
      name: 'item-cart-store',
      partialize: (state) => ({
        items: state.items,
        selectedItemId: state.selectedItemId
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const newMap = new Map<string, number>()
          state.items.forEach((item, idx) => newMap.set(item.item_code, idx))
          state._indexMap = newMap
          state.activeField = 'quantity'
          state.isEditing = false
        }
      }
    }
  )
)
