export interface CartItem {
  name: string
  item_name: string
  uom: string
  item_code: string
  image?: string | null
  standard_rate: number
  quantity: number
  discount_percentage: number
}

export type EditableField = 'quantity' | 'uom' | 'discount_percentage'
