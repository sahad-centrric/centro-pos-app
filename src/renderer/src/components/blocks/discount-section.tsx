import { Button } from '@renderer/components/ui/button'

type Props = unknown

const DiscountSection: React.FC<Props> = () => (
  <div className="p-4">
    <div className="flex gap-4 mb-4">
      <Button variant="outline" className="flex items-center gap-2">
        <span className="text-blue-500">%</span>
        Discount
        <span className="text-xs bg-gray-200 px-1 rounded">Ctrl+D</span>
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <span className="text-green-500">$</span>
        Offer
        <span className="text-xs bg-gray-200 px-1 rounded">Ctrl+O</span>
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <span className="text-orange-500">%</span>
        Commission
        <span className="text-xs bg-gray-200 px-1 rounded">Ctrl+C</span>
      </Button>
    </div>

    <div className="grid grid-cols-5 gap-4 items-end">
      <div className="text-center">
        <div className="text-sm text-gray-600">Untaxed</div>
        <div className="text-lg font-semibold">$2,417.10</div>
      </div>
      <div className="text-center">
        <div className="text-sm text-gray-600">Discount</div>
        <div className="text-lg font-semibold text-red-500">-$80.90</div>
      </div>
      <div className="text-center">
        <div className="text-sm text-gray-600">VAT (10%)</div>
        <div className="text-lg font-semibold">$233.62</div>
      </div>
      <div className="text-center">
        <div className="text-sm text-gray-600">Rounding</div>
        <div className="text-lg font-semibold">$0.18</div>
      </div>
      <div className="text-center">
        <div className="text-sm text-white bg-gray-800 p-2 rounded">
          <div className="text-sm">Total</div>
          <div className="text-xl font-bold">$2,570.00</div>
        </div>
      </div>
    </div>
  </div>
)

export default DiscountSection
