type Props = {
  orderNumber: string
}

const PaymentAlert: React.FC<Props> = () => (
  <div className="mx-4 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
    <div className="flex items-center">
      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
      <div>
        <p className="text-sm font-medium text-red-800">Payment pending for order #POS-2025-001</p>
        <p className="text-xs text-red-600">2 more alerts</p>
      </div>
    </div>
  </div>
)

export default PaymentAlert
