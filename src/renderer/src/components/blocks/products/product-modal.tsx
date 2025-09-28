import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import type { SubmitHandler } from 'react-hook-form'
import { Search, Plus, ArrowLeft, Wand2, Package } from 'lucide-react'
import { toast } from 'sonner'

// Shadcn UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@renderer/components/ui/dialog'
import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Textarea } from '@renderer/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/components/ui/form'
import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { Badge } from '@renderer/components/ui/badge'
import { Separator } from '@renderer/components/ui/separator'

// API and Hooks
import { useGetQuery, useMutationQuery } from '@renderer/hooks/react-query/useReactQuery'
import { API_Endpoints } from '@renderer/config/endpoints'
import { ControlledTextField } from '@renderer/components/form/controlled-text-field'

// Types
interface Product {
  name: string
  item_name: string
  item_code: string
  image?: string
  standard_rate: number
}

interface ProductSearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (product: Product) => void
}

// Validation schemas
const productSchema = Yup.object().shape({
  item_code: Yup.string().required('Item code is required'),
  item_name: Yup.string().required('Item name is required'),
  standard_rate: Yup.number().required('Standard rate is required').min(0, 'Rate must be positive'),
  description: Yup.string(),
  stock_uom: Yup.string().required('UOM is required'),
  item_group: Yup.string(),
  brand: Yup.string(),
  barcode: Yup.string(),
  opening_stock: Yup.number().min(0, 'Stock must be positive'),
  min_order_qty: Yup.number().min(0, 'Minimum quantity must be positive'),
  max_order_qty: Yup.number().min(0, 'Maximum quantity must be positive')
})

type ProductFormData = Yup.InferType<typeof productSchema>

// Product Search Component
const ProductSearch: React.FC<{
  onSelect: (product: Product) => void
  onCreateNew: () => void
}> = ({ onSelect, onCreateNew }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // Fetch products with search
  const { data: products, isLoading } = useGetQuery({
    endPoint: API_Endpoints.PRODUCTS,
    queryParams: {
      limit_start: 0,
      limit_page_length: 50,
      fields: '["name", "item_name", "item_code", "image", "standard_rate"]',
      filters: searchTerm ? `[["Item", "item_name", "like", "%${searchTerm}%"]]` : '[]'
    },
    method: 'GET',
    dependency: [searchTerm]
  })

  const productList = products?.data || []

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, productList.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && productList[selectedIndex]) {
          onSelect(productList[selectedIndex])
        }
        break
    }
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-4"
          autoFocus
        />
        <Button
          variant="outline"
          size="sm"
          onClick={onCreateNew}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7"
        >
          <Plus className="h-3 w-3 mr-1" />
          New
        </Button>
      </div>

      {/* Search Results */}
      <ScrollArea className="h-[300px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2 text-sm text-muted-foreground">Loading products...</span>
          </div>
        ) : productList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Package className="h-8 w-8 mb-2" />
            <span className="text-sm">
              {searchTerm ? 'No products found' : 'Start typing to search products'}
            </span>
          </div>
        ) : (
          <div className="space-y-1">
            {productList.map((product: Product, index: number) => (
              <div
                key={product.name}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedIndex === index ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                onClick={() => onSelect(product)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm leading-tight">{product.item_name}</h4>
                    <p
                      className={`text-xs mt-1 ${
                        selectedIndex === index
                          ? 'text-primary-foreground/80'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {product.item_code}
                    </p>
                  </div>
                  <Badge variant={selectedIndex === index ? 'secondary' : 'outline'}>
                    ${(product.standard_rate || 0).toFixed(2)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

// Product Create Component
const ProductCreate: React.FC<{
  onBack: () => void
  onSuccess: (product: Product) => void
}> = ({ onBack, onSuccess }) => {

  const form = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      item_code: '',
      item_name: '',
      description: '',
      standard_rate: 0,
      stock_uom: 'Nos',
      item_group: 'Products',
      brand: '',
      barcode: '',
      opening_stock: 0,
      min_order_qty: 0,
      max_order_qty: 0
    }
  })

  const { mutate: createProduct, isPending } = useMutationQuery({
    endPoint: API_Endpoints.PRODUCTS,
    method: 'POST',
    options: {
      onSuccess: (response) => {
        toast.success('Product created successfully!')
        onSuccess(response.data)
        form.reset()
      },
      onError: (error) => {
        console.error('Product creation failed:', error)
      }
    }
  })

  const generateItemCode = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    return `ITEM-${timestamp}-${random}`
  }

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    const productData = {
      doctype: 'Item',
      item_code: data.item_code,
      item_name: data.item_name,
      description: data.description,
      item_group: data.item_group || 'Products',
      stock_uom: data.stock_uom,
      standard_rate: data.standard_rate,
      is_stock_item: 1,
      include_item_in_manufacturing: 0,
      is_sales_item: 1,
      is_purchase_item: 1,
      ...(data.brand && { brand: data.brand }),
      ...(data.barcode && { barcode: data.barcode }),
      ...(data.opening_stock && { opening_stock: data.opening_stock }),
      ...(data.min_order_qty && { min_order_qty: data.min_order_qty }),
      ...(data.max_order_qty && { max_order_qty: data.max_order_qty })
    }

    createProduct({
      data: productData,
      params: {}
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2">
                <Package className="h-4 w-4" />
                <h3 className="text-sm font-semibold">Basic Information</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <ControlledTextField
                    name="item_code"
                    label="Item Code"
                    control={form.control}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => form.setValue('item_code', generateItemCode())}
                    className="w-full"
                  >
                    <Wand2 className="h-3 w-3 mr-1" />
                    Generate Code
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="stock_uom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit of Measure *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select UOM" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Nos">Nos</SelectItem>
                          <SelectItem value="Each">Each</SelectItem>
                          <SelectItem value="Box">Box</SelectItem>
                          <SelectItem value="Kg">Kg</SelectItem>
                          <SelectItem value="Ltr">Ltr</SelectItem>
                          <SelectItem value="Meter">Meter</SelectItem>
                          <SelectItem value="Piece">Piece</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <ControlledTextField
                name="item_name"
                label="Item Name"
                control={form.control}
                required
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Product description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Pricing & Category */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Pricing & Category</h3>

              <div className="grid grid-cols-2 gap-4">
                <ControlledTextField
                  name="standard_rate"
                  label="Standard Rate"
                  type="number"
                  control={form.control}
                  required
                />

                <ControlledTextField name="item_group" label="Item Group" control={form.control} />
              </div>

              <ControlledTextField name="brand" label="Brand" control={form.control} />
            </div>

            <Separator />

            {/* Inventory */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Inventory</h3>

              <div className="grid grid-cols-3 gap-4">
                <ControlledTextField
                  name="opening_stock"
                  label="Opening Stock"
                  type="number"
                  control={form.control}
                />

                <ControlledTextField
                  name="min_order_qty"
                  label="Min Order Qty"
                  type="number"
                  control={form.control}
                />

                <ControlledTextField
                  name="max_order_qty"
                  label="Max Order Qty"
                  type="number"
                  control={form.control}
                />
              </div>

              <ControlledTextField name="barcode" label="Barcode" control={form.control} />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create Product'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

// Main Modal Component
const ProductSearchModal: React.FC<ProductSearchModalProps> = ({
  open,
  onOpenChange,
  onSelect
}) => {
  const [view, setView] = useState<'search' | 'create'>('search')

  const handleClose = () => {
    setView('search')
    onOpenChange(false)
  }

  const handleProductSelect = (product: Product) => {
    onSelect(product)
    handleClose()
  }

  const handleProductCreated = (product: Product) => {
    onSelect(product)
    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {view === 'search' ? 'Search Products' : 'Create New Product'}
          </DialogTitle>
        </DialogHeader>

        {view === 'search' ? (
          <>
            <ProductSearch onSelect={handleProductSelect} onCreateNew={() => setView('create')} />
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DialogFooter>
          </>
        ) : (
          <ProductCreate onBack={() => setView('search')} onSuccess={handleProductCreated} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ProductSearchModal
