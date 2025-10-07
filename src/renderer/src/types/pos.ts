export type RightPanelTab = 'product' | 'customer' | 'print' | 'orders' | 'cash';

export interface ProductSummary {
  code: string;
  name: string;
  category?: string;
  unitPrice?: number;
  onHand?: number;
  cost?: number;
  marginPct?: number;
}

export interface CustomerSummary {
  name: string;
  gst: string;
}

export interface InvoiceSummary {
  name: string;
  status: 'Draft' | 'Partly Paid' | 'Overdue' | 'Paid';
  customer: string;
  posting_date: string;
  grand_total: number;
}

export interface InfoItem {
  label: string;
  value: string;
  color?: string;
  bg?: string;
}