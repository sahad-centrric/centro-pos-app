import { Tabs, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { Button } from '@renderer/components/ui/button'
import { Badge } from '@renderer/components/ui/badge'
import { Plus } from 'lucide-react'

type Props = {
  orderNumber: string
  date: string
  activeTab: string
  onTabChange: (value: string) => void
}

const Header: React.FC<Props> = ({ orderNumber, date, activeTab, onTabChange }) => (
  <div className="flex justify-between items-center p-4 border-b">
    <div className="flex items-center gap-4">
      <Button className="bg-gray-800 hover:bg-gray-700">
        <Plus className="w-4 h-4 mr-2" />
        New Order
        <span className="ml-2 text-xs bg-gray-600 px-1 rounded">Ctrl+N</span>
      </Button>
      <div className="flex gap-2">
        <Badge variant="outline" className="text-blue-600">
          {orderNumber}
        </Badge>
        <Badge variant="outline" className="text-blue-600">
          #002
        </Badge>
      </div>
    </div>

    <div className="text-center">
      <div className="text-sm font-medium">{date}</div>
      <div className="text-xs text-gray-500">12:08 PM</div>
    </div>

    <Tabs value={activeTab} onValueChange={onTabChange} className="w-auto">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="product">Product</TabsTrigger>
        <TabsTrigger value="customer">Customer</TabsTrigger>
        <TabsTrigger value="stock">Stock</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
)

export default Header
