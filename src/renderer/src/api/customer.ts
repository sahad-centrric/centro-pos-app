/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_Endpoints } from '@renderer/config/endpoints'
import api from '../services/api'

// Customer interface - simple and working
export interface Customer {
  id: string
  name: string
  email: string
  phone: string | null
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  pincode: string | null
  customerType: string
  gst: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Customer creation data interface
export interface CustomerCreateData {
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  country?: string
  pincode?: string
  customerType?: string
}

// Transform Frappe customer response - simple and working
const transformCustomer = (frappeCustomer: any): Customer | null => {
  if (!frappeCustomer) return null
  // Fallback: derive a simple address string from primary_address HTML if address_line_1 missing
  const rawPrimaryAddress: string | undefined = frappeCustomer.primary_address
  const derivedAddress = !frappeCustomer.address_line_1 && typeof rawPrimaryAddress === 'string'
    ? rawPrimaryAddress.replace(/<br\s*\/?>(\n)?/gi, ', ').replace(/<[^>]+>/g, '').replace(/\s+,/g, ',').replace(/,\s*,/g, ', ').trim()
    : undefined

  return {
    id: frappeCustomer.name,
    name: frappeCustomer.customer_name || frappeCustomer.name,
    email: frappeCustomer.email_id || '',
    phone: frappeCustomer.mobile_no || null,
    address: frappeCustomer.address_line_1 || derivedAddress || null,
    city: frappeCustomer.city || null,
    state: frappeCustomer.state || null,
    country: frappeCustomer.country || null,
    pincode: frappeCustomer.pincode || null,
    customerType: frappeCustomer.customer_type || 'Individual',
    gst: frappeCustomer.gst_number || null,
    isActive: frappeCustomer.disabled !== 1,
    createdAt: frappeCustomer.creation,
    updatedAt: frappeCustomer.modified
  }
}

// Transform Frappe customer list response from centro_pos_apis.api.customer.customer_list
const transformCustomerList = (response: any): Customer[] => {
  if (!response) return []

  // API returns: { data: [ { name, customer_name, ... } ] }
  const customers = Array.isArray(response?.data) ? response.data : Array.isArray(response?.message) ? response.message : ([] as any[])

  return customers
    .map((c: any) =>
      transformCustomer({
        name: c.name,
        customer_name: c.customer_name,
        email_id: c.email_id,
        mobile_no: c.phone,
        address_line_1: c.address_line1,
        city: c.city,
        state: c.state,
        pincode: c.pincode,
        customer_type: 'Individual',
        disabled: 0,
        creation: '',
        modified: ''
      })
    )
    .filter((customer): customer is Customer => customer !== null)
}

export const customersAPI = {
  // Get all customers
  getAll: async (params = {}): Promise<Customer[]> => {
    try {
      const defaultParams: any = {
        search_term: '',
        limit_start: 1, // API expects 1-based start
        limit_page_length: 50
      }

      // Use Frappe resource endpoint to avoid custom method permission issues (403)
      const response = await api.get(API_Endpoints.CUSTOMERS, {
        params: {
          fields:
            '["name","customer_name","email_id","mobile_no","address_line_1","city","state","country","pincode","customer_type","disabled","creation","modified"]',
          limit_start: defaultParams.limit_start,
          limit_page_length: defaultParams.limit_page_length,
          order_by: 'modified desc',
          ...params
        }
      })

      return transformCustomerList(response.data)
    } catch (error) {
      console.error('Get customers error:', error)
      throw error
    }
  },

  // Get customer by ID
  getById: async (id: string): Promise<Customer | null> => {
    try {
      const response = await api.get(`${API_Endpoints.CUSTOMERS}/${id}`)
      const transformed = transformCustomer(response.data?.data || response.data)
      if (!transformed) {
        throw new Error('Customer not found')
      }
      return transformed
    } catch (error) {
      console.error('Get customer error:', error)
      throw error
    }
  },

  // Search customers
  search: async (query: string, params = {}): Promise<Customer[]> => {
    try {
      const searchParams = {
        doctype: 'Customer',
        filters: `[["customer_name", "like", "%${query}%"], ["email_id", "like", "%${query}%"]]`,
        fields:
          '["name", "customer_name", "email_id", "mobile_no", "address_line_1", "city", "state", "country", "pincode", "customer_type", "disabled", "creation", "modified"]',
        limit_start: 0,
        limit_page_length: 50,
        order_by: 'customer_name asc'
      }

      const response = await api.get('/method/frappe.client.get_list', {
        params: { ...searchParams, ...params }
      })

      return transformCustomerList(response.data.message)
    } catch (error) {
      console.error('Search customers error:', error)
      throw error
    }
  },

  // Create new customer
  create: async (customerData: CustomerCreateData): Promise<Customer> => {
    try {
      const payload = {
        customer_name: customerData.name,
        email_id: customerData.email,
        mobile_no: customerData.phone || '',
        address_line_1: customerData.address || '',
        city: customerData.city || '',
        state: customerData.state || '',
        country: customerData.country || '',
        pincode: customerData.pincode || '',
        customer_type: customerData.customerType || 'Individual',
        disabled: 0
      }

      const response = await api.post('api/resource/Customer', payload)

      // Handle Frappe response structure
      let transformed: Customer | null = null

      if (response.data && response.data.data) {
        transformed = transformCustomer(response.data.data)
      } else {
        transformed = transformCustomer(response.data)
      }

      if (!transformed) {
        throw new Error('Failed to transform customer data')
      }

      return transformed
    } catch (error) {
      console.error('Create customer error:', error)
      throw error
    }
  },

  // Delete customer
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/resource/Customer/${id}`)
    } catch (error) {
      console.error('Delete customer error:', error)
      throw error
    }
  }
}
