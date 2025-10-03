import { Fragment, useState } from 'react'
import ActionButtons from '../blocks/common/action-buttons'
import OrderDetails from '../blocks/order/order-details'
import ItemsTable from '../blocks/common/items-table'
import PaymentAlert from '../blocks/payment/payment-alert'
import ProductDetail from '../blocks/products/product-detail'
import Header from '../blocks/common/header'
import DiscountSection from '../blocks/products/discount-section'
import ProductSearchModal from '../blocks/products/product-modal'
import { useHotkeys } from 'react-hotkeys-hook'
import { useCartItemStore } from '@renderer/store/useCartItemStore'
import { toast } from 'sonner'
import { EditableField } from '@renderer/types/cart'

const POSInterface: React.FC = () => {
  const [open, setOpen] = useState(false)
  const {
    items,
    selectedItemId,
    addItem,
    removeItem,
    selectItem,
    navigateItem,
    itemExists,
    setEditingState
  } = useCartItemStore()

  useHotkeys('shift', () => setOpen(true))
  useHotkeys(
    'backspace',
    () => {
      const state = useCartItemStore.getState()
      if (!state.isEditing) {
        removeItem(selectedItemId)
      }
    },
    { enableOnFormTags: false }
  )

  useHotkeys(
    'down',
    () => {
      const state = useCartItemStore.getState()
      if (!state.isEditing) {
        navigateItem('down')
      }
    },
    { enableOnFormTags: false }
  )

  useHotkeys(
    'up',
    () => {
      const state = useCartItemStore.getState()
      if (!state.isEditing) {
        navigateItem('up')
      }
    },
    { enableOnFormTags: false }
  )

  useHotkeys(
    'space',
    () => {
      const state = useCartItemStore.getState()
      if (!state.isEditing && state.selectedItemId) {
        setEditingState(true, state.activeField)
      }
    },
    { enableOnFormTags: false, preventDefault: true }
  )

  useHotkeys(
    'left',
    () => {
      const state = useCartItemStore.getState()
      if (!state.isEditing && state.selectedItemId) {
        const fieldOrder: EditableField[] = ['quantity', 'uom', 'discount_percentage']
        const currentIndex = fieldOrder.indexOf(state.activeField)
        if (currentIndex > 0) {
          state.setEditingState(false, fieldOrder[currentIndex - 1])
        }
      }
    },
    { enableOnFormTags: false }
  )

  useHotkeys(
    'right',
    () => {
      const state = useCartItemStore.getState()
      if (!state.isEditing && state.selectedItemId) {
        const fieldOrder: EditableField[] = ['quantity', 'uom', 'discount_percentage']

        const currentIndex = fieldOrder.indexOf(state.activeField)
        if (currentIndex < fieldOrder.length - 1) {
          state.setEditingState(false, fieldOrder[currentIndex + 1])
        }
      }
    },
    { enableOnFormTags: false }
  )

  return (
    <Fragment>
      <div className="h-screen bg-gray-50 flex w-screen">
        <div className="flex-1 flex flex-col">
          <Header />
          {/* <button onClick={() => setOpen(true)} className="m-4 p-2 bg-blue-500 text-white rounded">
            Open
          </button> */}
          <ActionButtons />
          <div className="flex-1 overflow-auto">
            <OrderDetails  />
            <ItemsTable
              items={items}
              onRemoveItem={removeItem}
              selectedItemId={selectedItemId}
              selectItem={selectItem}
            />
            <DiscountSection />
          </div>
          <PaymentAlert orderNumber={''} />
        </div>
        <div className="w-80 border-l bg-white">
          <ProductDetail selectedProduct="" />
        </div>
      </div>
      <ProductSearchModal
        open={open}
        onOpenChange={setOpen}
        onSelect={(product) => {
          if (itemExists(product.item_code)) {
            toast.error('Item already in cart')
          } else {
            addItem({ ...product, quantity: 1, discount_percentage: 0, uom: 'pcs' })
            // Automatically start editing quantity after adding item
            setTimeout(() => {
              useCartItemStore.getState().setEditingState(true, 'quantity')
            }, 100)
          }
        }}
      />
    </Fragment>
  )
}

export default POSInterface
