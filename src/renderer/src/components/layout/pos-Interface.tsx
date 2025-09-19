import { useState } from 'react'
import ActionButtons from '../blocks/action-buttons'
import OrderDetails from '../blocks/order-details'
import ItemsTable from '../blocks/items-table'
import PaymentAlert from '../blocks/payment-alert'
import ProductDetail from '../blocks/product-detail'
import Header from '../blocks/header'
import DiscountSection from '../blocks/discount-section'

// Main POS Interface Component
const POSInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('product')
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

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header/>

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
  )
}

export default POSInterface
