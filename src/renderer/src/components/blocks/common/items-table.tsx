import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { Button } from '@renderer/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/ui/table'
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
  <div className="p-4 bg-white">
    <Tabs defaultValue="items" className="w-full">
      <TabsList>
        <TabsTrigger value="items">Items</TabsTrigger>
        <TabsTrigger value="other">Other Details</TabsTrigger>
      </TabsList>

      <TabsContent value="items" className="mt-4">
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Code</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>UOM</TableHead>
                <TableHead>Disc %</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.code}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.label}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{item.uom}</TableCell>
                  <TableCell>{item.discount}</TableCell>
                  <TableCell>${item.unitPrice}</TableCell>
                  <TableCell className="font-medium">${item.total}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={() => onRemoveItem(item.code)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

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
