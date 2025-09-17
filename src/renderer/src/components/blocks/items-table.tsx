import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'

import { Button } from '@renderer/components/ui/button'

import { Plus, X } from 'lucide-react'

type Props = {
  items: {
    code: string
    label: string
    qty: number
    uom: string
    discount: number
    unitPrice: number
    total: string
  }[]
  onRemoveItem: (value: string) => void
}

const ItemsTable: React.FC<Props> = ({ items, onRemoveItem }) => (
  <div className="p-4">
    <Tabs defaultValue="items" className="w-full">
      <TabsList>
        <TabsTrigger value="items">Items</TabsTrigger>
        <TabsTrigger value="other">Other Details</TabsTrigger>
      </TabsList>
      <TabsContent value="items" className="mt-4">
        <div className="border rounded-lg">
          <div className="grid grid-cols-8 gap-4 p-3 bg-gray-50 text-sm font-medium">
            <div>Product Code</div>
            <div>Label</div>
            <div>Qty</div>
            <div>UOM</div>
            <div>Disc %</div>
            <div>Unit Price</div>
            <div>Total</div>
            <div></div>
          </div>
          {items.map((item) => (
            <div key={item.code} className="grid grid-cols-8 gap-4 p-3 border-t items-center">
              <div className="text-sm">{item.code}</div>
              <div className="text-sm">{item.label}</div>
              <div className="text-sm">{item.qty}</div>
              <div className="text-sm">{item.uom}</div>
              <div className="text-sm">{item.discount}</div>
              <div className="text-sm">${item.unitPrice}</div>
              <div className="text-sm font-medium">${item.total}</div>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700 p-1"
                onClick={() => onRemoveItem(item.code)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <div className="p-3 border-t">
            <Button variant="ghost" className="text-blue-500 hover:text-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Click to add item...
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
)

export default ItemsTable
