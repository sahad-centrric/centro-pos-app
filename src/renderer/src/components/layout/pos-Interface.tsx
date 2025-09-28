import { Fragment, useState } from 'react'
import ActionButtons from '../blocks/common/action-buttons'
import OrderDetails from '../blocks/order/order-details'
import ItemsTable from '../blocks/common/items-table'
import PaymentAlert from '../blocks/payment/payment-alert'
import ProductDetail from '../blocks/products/product-detail'
import Header from '../blocks/common/header'
import DiscountSection from '../blocks/products/discount-section'
import { useGetQuery } from '@renderer/hooks/react-query/useReactQuery'
import { API_Endpoints } from '@renderer/config/endpoints'
import ProductSearchModal from '../blocks/products/product-modal'

// Main POS Interface Component
const POSInterface: React.FC = () => {
  const [open, setOpen] = useState(false) // For future use if needed

  const [items, setItems] = useState([
    {
      code: 'IPH15-128',
      label: 'Apple iPhone 15',
      qty: 1,
      uom: 'Each',
      discount: 0,
      unitPrice: 899.0,
      total: '899.00'
    },
    {
      code: 'SGS24-256',
      label: 'Samsung Galaxy S24',
      qty: 2,
      uom: 'Each',
      discount: 5,
      unitPrice: 799.0,
      total: '1,518.10'
    },
    {
      code: 'IPD-PRO-12',
      label: 'iPad Pro 12.9"',
      qty: 1,
      uom: 'Each',
      discount: 0,
      unitPrice: 1299.0,
      total: '1,299.00'
    }
  ])

  const removeItem = (code: string): void => {
    setItems(items.filter((item) => item.code !== code))
  }

  const { data } = useGetQuery({
    endPoint: API_Endpoints.PRODUCTS,
    queryParams: {
      limit_start: 0,
      limit_page_length: 100,
      fields: '["name", "item_name", "item_code", "image", "standard_rate"]',
      filters: '[]'
    },
    method: 'GET'
  })

  console.log('data', data)

  return (
    <Fragment>
      <div className="h-screen bg-gray-50 flex  w-screen">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Header />

          <button onClick={() => setOpen(true)} className="m-4 p-2 bg-blue-500 text-white rounded">
            Open
          </button>

          <ActionButtons />

          <div className="flex-1 overflow-auto">
            <OrderDetails orderNumber="POS-2025-001" />
            <ItemsTable items={items} onRemoveItem={removeItem} />
            <DiscountSection />
          </div>

          <PaymentAlert orderNumber={''} />
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l bg-white">
          <ProductDetail selectedProduct="" />
        </div>
      </div>



      <ProductSearchModal
        open={open}
        onOpenChange={setOpen}
        onSelect={(product) => console.log('product', product)}
      />
    </Fragment>
  )
}

export default POSInterface
