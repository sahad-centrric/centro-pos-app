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
import { usePOSTabStore } from '@renderer/store/usePOSTabStore'
import { toast } from 'sonner'
import AlertCenter from '../blocks/common/alert-center'

const POSInterface: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>()
  const [shouldStartEditing, setShouldStartEditing] = useState(false)

  const {
    getCurrentTabItems,
    addItemToTab,
    removeItemFromTab,
    activeTabId,
    itemExistsInTab,
    getCurrentTab
  } = usePOSTabStore();

  const items = getCurrentTabItems();
  const currentTab = getCurrentTab();

  const itemExists = (itemCode: string) => {
    if (!activeTabId) return false;
    return itemExistsInTab(activeTabId, itemCode);
  };

  // Add item to current tab
  const addItem = (item: any) => {
    if (!activeTabId) {
      toast.error('No active tab. Please create a new order first.');
      return;
    }

    if (itemExists(item.item_code)) {
      toast.error('Item already in cart');
      return;
    }

    addItemToTab(activeTabId, item);
    setSelectedItemId(item.item_code);

    // Trigger auto-editing
    setShouldStartEditing(true);
  };

  // Remove item from current tab
  const removeItem = (itemCode: string) => {
    if (!activeTabId) return;

    removeItemFromTab(activeTabId, itemCode);

    if (selectedItemId === itemCode) {
      setSelectedItemId(undefined);
    }
  };

  // Select item
  const selectItem = (itemCode: string) => {
    setSelectedItemId(itemCode);
  };

  // Navigate items (up/down)
  const navigateItem = (direction: 'up' | 'down') => {
    if (items.length === 0) return;

    const currentIndex = selectedItemId
      ? items.findIndex(item => item.item_code === selectedItemId)
      : -1;

    let newIndex;
    if (direction === 'down') {
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    }

    setSelectedItemId(items[newIndex].item_code);
  };

  useHotkeys('shift', () => setOpen(true))
  useHotkeys('backspace', () => {
    if (selectedItemId) {
      removeItem(selectedItemId);
    }
  }, { enableOnFormTags: false })
  useHotkeys('down', () => navigateItem('down'), { enableOnFormTags: false })
  useHotkeys('up', () => navigateItem('up'), { enableOnFormTags: false })
  useHotkeys('space', () => {
    if (selectedItemId) {
      toast.info('Press Space on a selected item to edit');
    }
  }, { enableOnFormTags: false, preventDefault: true })

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
            <OrderDetails />
            <ItemsTable
              onRemoveItem={removeItem}
              selectedItemId={selectedItemId}
              selectItem={selectItem}
              shouldStartEditing={shouldStartEditing}
              onEditingStarted={() => setShouldStartEditing(false)}
            />
            <DiscountSection />
          </div>
          <PaymentAlert orderNumber={currentTab?.orderId || ''} />
        </div>
        <div className="w-80 border-l bg-white">
          <ProductDetail selectedProduct={selectedItemId || ''} />
        </div>
      </div>
      <ProductSearchModal
        open={open}
        onOpenChange={setOpen}
        onSelect={addItem}
      />
      <AlertCenter/>
    </Fragment>
  )
}

export default POSInterface
