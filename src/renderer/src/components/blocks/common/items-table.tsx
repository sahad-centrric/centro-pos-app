import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import { Textarea } from '@renderer/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@renderer/components/ui/select'
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
import { useState, useRef, useEffect } from 'react'
import { usePOSTabStore } from '@renderer/store/usePOSTabStore'
import { useHotkeys } from 'react-hotkeys-hook'

type Props = {
  selectedItemId?: string
  onRemoveItem: (value: string) => void
  selectItem: (value: string) => void
  shouldStartEditing?: boolean
  onEditingStarted?: () => void
}

type EditField = 'quantity' | 'uom' | 'discount_percentage'

const ItemsTable: React.FC<Props> = ({ selectedItemId, onRemoveItem, selectItem, shouldStartEditing = false, onEditingStarted }) => {
  const { getCurrentTabItems, activeTabId, updateItemInTab, getCurrentTab, updateTabOtherDetails } = usePOSTabStore();
  const items = getCurrentTabItems();
  const currentTab = getCurrentTab();
  const [activeField, setActiveField] = useState<EditField>('quantity');
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const warehouses = [
    { value: 'main-warehouse', label: 'Main Warehouse' },
    { value: 'secondary-warehouse', label: 'Secondary Warehouse' },
    { value: 'retail-store', label: 'Retail Store' },
  ]

  const paymentTerms = [
    { value: 'cash', label: 'Cash on Delivery' },
    { value: 'net-30', label: 'Net 30 Days' },
    { value: 'net-60', label: 'Net 60 Days' },
    { value: 'advance', label: 'Advance Payment' },
  ]

  const salesAccounts = [
    { value: 'sales-general', label: 'Sales - General' },
    { value: 'sales-retail', label: 'Sales - Retail' },
    { value: 'sales-wholesale', label: 'Sales - Wholesale' },
  ]

  useEffect(() => {
    if (shouldStartEditing && selectedItemId && !isEditing) {
      setActiveField('quantity');
      setIsEditing(true);
      onEditingStarted?.(); // Call the callback to reset the flag
    }
  }, [shouldStartEditing, selectedItemId, isEditing, onEditingStarted]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing, activeField, selectedItemId])

  // Set initial edit value when editing starts
  useEffect(() => {
    if (isEditing && selectedItemId) {
      const item = items.find((i) => i.item_code === selectedItemId)
      if (item) {
        const value = item[activeField]
        setEditValue(value?.toString() || '')
      }
    }
  }, [isEditing, activeField, selectedItemId, items])

  const handleSaveEdit = () => {
    if (!isEditing || !selectedItemId || !activeTabId) return

    const item = items.find((i) => i.item_code === selectedItemId)
    if (!item) return

    let finalValue: string | number = editValue

    if (activeField !== 'uom') {
      const numValue = parseFloat(editValue)
      if (isNaN(numValue) || numValue < 0) {
        setIsEditing(false)
        return
      }
      finalValue = numValue
    }

    updateItemInTab(activeTabId, selectedItemId, { [activeField]: finalValue })

    // Move to next field automatically
    const fieldOrder: EditField[] = ['quantity', 'uom', 'discount_percentage']
    const currentIndex = fieldOrder.indexOf(activeField)

    if (currentIndex < fieldOrder.length - 1) {
      // Move to next field
      const nextField = fieldOrder[currentIndex + 1];
      setTimeout(() => {
        setActiveField(nextField);
        setIsEditing(true);
      }, 50)
    } else {
      // Done editing this item
      setIsEditing(false)
    }
  }

  useHotkeys(
    'Enter',
    () => {
      handleSaveEdit()
    },
    { preventDefault: true }
  )

  useHotkeys(
    'Escape',
    () => {
      setIsEditing(false)
    },
    { preventDefault: true }
  )

  return (
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
                {items.map((item) => {
                  const isSelected = item.item_code === selectedItemId
                  const isEditingQuantity = isSelected && isEditing && activeField === 'quantity'
                  const isEditingUom = isSelected && isEditing && activeField === 'uom'
                  const isEditingDiscount =
                    isSelected && isEditing && activeField === 'discount_percentage'

                  return (
                    <TableRow
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!isEditing) {
                          selectItem(item.item_code)
                        }
                      }}
                      key={item.item_code}
                      className={`transition-all ${isSelected
                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-l-blue-500 shadow-md'
                        : 'hover:bg-gray-50'
                        }`}
                    >
                      <TableCell className={isSelected ? 'font-semibold text-blue-900' : ''}>
                        {item.item_code}
                      </TableCell>
                      <TableCell className={isSelected ? 'font-medium' : ''}>
                        {item.item_name}
                      </TableCell>

                      {/* Quantity Cell */}
                      <TableCell
                        className={`${isSelected && activeField === 'quantity'
                          ? 'ring-2 ring-blue-500 ring-inset bg-blue-50'
                          : ''
                          } ${isSelected ? 'font-medium' : ''}`}
                      >
                        {isEditingQuantity ? (
                          <input
                            ref={inputRef}
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                handleSaveEdit()
                              } else if (e.key === 'Escape') {
                                e.preventDefault()
                                setIsEditing(false)
                              }
                            }}
                            onBlur={handleSaveEdit}
                            className="w-full px-2 py-1 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                            min="0"
                            step="0.01"
                          />
                        ) : (
                          <div className="px-2 py-1">{item.quantity}</div>
                        )}
                      </TableCell>

                      {/* UOM Cell */}
                      <TableCell
                        className={`${isSelected && activeField === 'uom'
                          ? 'ring-2 ring-blue-500 ring-inset bg-blue-50'
                          : ''
                          } ${isSelected ? 'font-medium' : ''}`}
                      >
                        {isEditingUom ? (
                          <input
                            ref={inputRef}
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                handleSaveEdit()
                              } else if (e.key === 'Escape') {
                                e.preventDefault()
                                setIsEditing(false)
                              }
                            }}
                            onBlur={handleSaveEdit}
                            className="w-full px-2 py-1 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        ) : (
                          <div className="px-2 py-1">{item.uom}</div>
                        )}
                      </TableCell>

                      {/* Discount Cell */}
                      <TableCell
                        className={`${isSelected && activeField === 'discount_percentage'
                          ? 'ring-2 ring-blue-500 ring-inset bg-blue-50'
                          : ''
                          } ${isSelected ? 'font-medium' : ''}`}
                      >
                        {isEditingDiscount ? (
                          <input
                            ref={inputRef}
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                handleSaveEdit()
                              } else if (e.key === 'Escape') {
                                e.preventDefault()
                                setIsEditing(false)
                              }
                            }}
                            onBlur={handleSaveEdit}
                            className="w-full px-2 py-1 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                            min="0"
                            max="100"
                            step="0.01"
                          />
                        ) : (
                          <div className="px-2 py-1">{item.discount_percentage}</div>
                        )}
                      </TableCell>

                      <TableCell className={isSelected ? 'font-medium' : ''}>
                        ${item.standard_rate}
                      </TableCell>
                      <TableCell className={`font-semibold ${isSelected ? 'text-blue-900' : ''}`}>
                        $
                        {(
                          item.standard_rate *
                          item.quantity *
                          (1 - item.discount_percentage / 100)
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            onRemoveItem(item.item_code)
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <div className="p-3 border-t bg-gray-50">
              <Button
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Press &apos;Shift&apos; to add item • Space to edit • ←→ to navigate fields
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="other" className="mt-4">
          <div className="border rounded-lg p-6 bg-white space-y-6">
            {/* Row 1: PO Reference and Warehouse */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="po-reference" className="text-sm font-semibold text-gray-700">
                  PO Reference
                </Label>
                <Input
                  id="po-reference"
                  type="text"
                  placeholder="Purchase Order Reference"
                  value={currentTab?.otherDetails?.poReference || ''}
                  onChange={(e) => {
                    if (activeTabId) {
                      updateTabOtherDetails(activeTabId, { poReference: e.target.value })
                    }
                  }}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="warehouse" className="text-sm font-semibold text-gray-700">
                  Out Warehouse
                </Label>
                <Select
                  value={currentTab?.otherDetails?.outWarehouse || ''}
                  onValueChange={(value) => {
                    if (activeTabId) {
                      updateTabOtherDetails(activeTabId, { outWarehouse: value })
                    }
                  }}
                >
                  <SelectTrigger id="warehouse" className="h-12">
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    {warehouses.map((wh) => (
                      <SelectItem key={wh.value} value={wh.value}>
                        {wh.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 2: Payment Terms and Sales Account */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="payment-terms" className="text-sm font-semibold text-gray-700">
                  Payment Terms
                </Label>
                <Select
                  value={currentTab?.otherDetails?.paymentTerms || ''}
                  onValueChange={(value) => {
                    if (activeTabId) {
                      updateTabOtherDetails(activeTabId, { paymentTerms: value })
                    }
                  }}
                >
                  <SelectTrigger id="payment-terms" className="h-12">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    {paymentTerms.map((term) => (
                      <SelectItem key={term.value} value={term.value}>
                        {term.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sales-account" className="text-sm font-semibold text-gray-700">
                  Default Sales Account
                </Label>
                <Select
                  value={currentTab?.otherDetails?.salesAccount || ''}
                  onValueChange={(value) => {
                    if (activeTabId) {
                      updateTabOtherDetails(activeTabId, { salesAccount: value })
                    }
                  }}
                >
                  <SelectTrigger id="sales-account" className="h-12">
                    <SelectValue placeholder="Select sales account" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    {salesAccounts.map((account) => (
                      <SelectItem key={account.value} value={account.value}>
                        {account.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 3: Terms & Conditions */}
            <div className="space-y-2">
              <Label htmlFor="terms-conditions" className="text-sm font-semibold text-gray-700">
                Terms & Conditions
              </Label>
              <Textarea
                id="terms-conditions"
                rows={4}
                placeholder="Enter terms and conditions..."
                value={currentTab?.otherDetails?.termsConditions || ''}
                onChange={(e) => {
                  if (activeTabId) {
                    updateTabOtherDetails(activeTabId, { termsConditions: e.target.value })
                  }
                }}
                className="resize-none"
              />
            </div>

            {/* Row 4: Internal Notes */}
            <div className="space-y-2">
              <Label htmlFor="internal-notes" className="text-sm font-semibold text-gray-700">
                Internal Notes
              </Label>
              <Textarea
                id="internal-notes"
                rows={4}
                placeholder="Internal notes for staff..."
                value={currentTab?.otherDetails?.internalNotes || ''}
                onChange={(e) => {
                  if (activeTabId) {
                    updateTabOtherDetails(activeTabId, { internalNotes: e.target.value })
                  }
                }}
                className="resize-none"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ItemsTable
