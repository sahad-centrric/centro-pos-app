import React, { useMemo } from 'react'
import { Percent, Gift, Handshake } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { usePOSTabStore } from '@renderer/store/usePOSTabStore'



type Props = unknown

const DiscountSection: React.FC<Props> = () => {
  const { getCurrentTabItems } = usePOSTabStore()
  const items = getCurrentTabItems()

  const { subtotal, totalDiscount, vatAmount, rounding, finalTotal } = useMemo(() => {
    const safeNum = (v: any): number => (typeof v === 'number' && !isNaN(v) ? v : 0)

    let subtotal = 0
    let totalDiscount = 0

    for (const item of items) {
      const quantity = safeNum(item.quantity) || 1
      const unitPrice = safeNum(item.standard_rate) || 0
      const discountPct = Math.min(Math.max(safeNum(item.discount_percentage), 0), 100)

      const lineGross = quantity * unitPrice
      const lineDiscount = (lineGross * discountPct) / 100

      subtotal += lineGross
      totalDiscount += lineDiscount
    }

    const vatRate = 0.10
    const vatAmount = (subtotal - totalDiscount) * vatRate

    const totalBeforeRounding = subtotal - totalDiscount + vatAmount
    const rounding = Math.round(totalBeforeRounding) - totalBeforeRounding
    const finalTotal = Math.round(totalBeforeRounding)

    return { subtotal, totalDiscount, vatAmount, rounding, finalTotal }
  }, [items])


  return (
    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200/60">
      <div className="flex gap-3 mb-4 ml-4">
        <Button
          variant="outline"
          className="px-6 py-2 bg-white border border-gray-200 font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Percent className="w-4 h-4 text-blue-500" />
          Discount
          <span className="text-xs opacity-70 bg-gray-100 px-2 py-1 rounded-lg">Ctrl+D</span>
        </Button>

        <Button
          variant="outline"
          className="px-6 py-2 bg-white border border-gray-200 font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Gift className="w-4 h-4 text-emerald-500" />
          Offer
          <span className="text-xs opacity-70 bg-gray-100 px-2 py-1 rounded-lg">Ctrl+O</span>
        </Button>

        <Button
          variant="outline"
          className="px-6 py-2 bg-white border border-gray-200 font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Handshake className="w-4 h-4 text-orange-500" />
          Commission
          <span className="text-xs opacity-70 bg-gray-100 px-2 py-1 rounded-lg">Ctrl+C</span>
        </Button>
      </div>

      <div className="p-2">
        <div className="grid grid-cols-5 gap-3 text-sm mb-3">
          <div className="text-center p-3 bg-white/80 rounded-xl shadow-lg">
            <div className="text-gray-500 font-medium text-xs">Untaxed</div>
            <div className="font-bold text-base">${subtotal.toFixed(2)}</div>
          </div>
          <div className="text-center p-3 bg-white/80 rounded-xl shadow-lg">
            <div className="text-gray-500 font-medium text-xs">Discount</div>
            <div className="font-bold text-base text-red-600">-${totalDiscount.toFixed(2)}</div>
          </div>
          <div className="text-center p-3 bg-white/80 rounded-xl shadow-lg">
            <div className="text-gray-500 font-medium text-xs">VAT (10%)</div>
            <div className="font-bold text-base">${vatAmount.toFixed(2)}</div>
          </div>
          <div className="text-center p-3 bg-white/80 rounded-xl shadow-lg">
            <div className="text-gray-500 font-medium text-xs">Rounding</div>
            <div className="font-bold text-base">${rounding.toFixed(2)}</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-primary to-slate-700 text-white rounded-xl shadow-xl">
            <div className="text-white/80 font-medium text-xs">Total</div>
            <div className="font-bold text-xl">${finalTotal.toFixed(2)}</div>
          </div>
        </div>

        {/* Alerts area - uncomment if you have the alert store/component wired */}
        {/* <AlertSection alerts={alerts} onDismiss={removeAlert} /> */}
      </div>
    </div>
  )
}

export default DiscountSection
