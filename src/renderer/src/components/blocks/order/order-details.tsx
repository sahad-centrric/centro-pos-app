import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'

import { Input } from '@renderer/components/ui/input'
import { Button } from '@renderer/components/ui/button'

import { Calendar, History, Package, User } from 'lucide-react'

type Props = {
  orderNumber: string
}

const OrderDetails: React.FC<Props> = ({ orderNumber }) => (
  <div className="p-4 space-y-4">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold">Order #: {orderNumber}</h3>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <History className="w-4 h-4 mr-2" />
          History
        </Button>
        <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600">
          <Package className="w-4 h-4 mr-2" />
          Stock
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-purple-500 text-white hover:bg-purple-600"
        >
          <User className="w-4 h-4 mr-2" />
          Account
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-4">
      <div>
        <label className="text-sm font-medium">Customer</label>
        <Select defaultValue="walking">
          <SelectTrigger>
            <SelectValue placeholder="Select customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="walking">Walking Customer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">Price List</label>
        <Select defaultValue="default">
          <SelectTrigger>
            <SelectValue placeholder="Select price list" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default Price List</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">Date</label>
        <div className="relative">
          <Input type="text" defaultValue="21/01/2025" />
          <Calendar className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Delivery</label>
        <div className="flex gap-2 mt-1">
          <Button size="sm" className="bg-gray-800 text-white flex-1">
            Instant
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Scheduled
          </Button>
        </div>
      </div>
    </div>
  </div>
)

export default OrderDetails
