import { create } from 'zustand';
import type { RightPanelTab } from '../types/pos';

interface RightPanelState {
  activeRightPanelTab: RightPanelTab;
  selectedProduct: any | null; // Will be set from your existing product selection
  selectedCustomer: any | null; // Will be set from your existing customer selection
  orderActionTrigger: string | null;

  setActiveRightPanelTab: (tab: RightPanelTab) => void;
  setSelectedProduct: (product: any | null) => void;
  setSelectedCustomer: (customer: any | null) => void;
  setOrderActionTrigger: (trigger: string | null) => void;
}

export const useRightPanelStore = create<RightPanelState>((set) => ({
  activeRightPanelTab: 'orders',
  selectedProduct: null,
  selectedCustomer: null,
  orderActionTrigger: null,

  setActiveRightPanelTab: (tab) => set({ activeRightPanelTab: tab }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
  setOrderActionTrigger: (trigger) => set({ orderActionTrigger: trigger }),
}));