import React, { useEffect, useMemo } from 'react';
import { FaHistory, FaBoxes, FaUserCircle } from 'react-icons/fa';


import RightPanelProductTab from './right-panel-product-tab';
import RightPanelCustomerTab from './right-panel-customertab';
import RightPanelOrdersTab from './right-panel-orderstab';
import RightPanelPrintTab from './right-panel-printab';
import { useRightPanelStore } from '@renderer/store/useRightPanelStore';

import { usePOSTabStore } from '@renderer/store/usePOSTabStore';
import type { InfoItem, InvoiceSummary } from '@renderer/types/pos';

const RightPanel: React.FC = () => {
  const {
    activeRightPanelTab,
    setActiveRightPanelTab,
    selectedProduct,
    selectedCustomer,
    orderActionTrigger,
    setOrderActionTrigger,
  } = useRightPanelStore();

  const { tabs, activeTabId, openTab } = usePOSTabStore();

  // Get current tab data
  const currentTab = useMemo(
    () => tabs.find(tab => tab.id === activeTabId),
    [tabs, activeTabId]
  );

  // Auto-switch to product tab when a product is selected
  useEffect(() => {
    if (selectedProduct) {
      setActiveRightPanelTab('product');
    }
  }, [selectedProduct, setActiveRightPanelTab]);

  // Auto-switch to customer tab when a customer is selected
  useEffect(() => {
    if (selectedCustomer && selectedCustomer.name !== 'Walking Customer') {
      setActiveRightPanelTab('customer');
    }
  }, [selectedCustomer, setActiveRightPanelTab]);

  // Auto-switch to orders tab when order action happens
  useEffect(() => {
    if (orderActionTrigger) {
      setActiveRightPanelTab('orders');
      setOrderActionTrigger(null);
    }
  }, [orderActionTrigger, setActiveRightPanelTab, setOrderActionTrigger]);

  // Mock data
  const customerInfo: InfoItem[] = [
    { label: 'Total Invoiced', value: '$12,450.00', color: 'text-blue-600', bg: 'from-blue-50 to-indigo-50' },
    { label: 'Amount Due', value: '$2,570.00', color: 'text-red-600', bg: 'from-red-50 to-pink-50' },
    { label: 'Last Payment', value: '$1,200.00', color: 'text-green-600', bg: 'from-green-50 to-emerald-50' },
    { label: 'Commission', value: '$125.40', color: 'text-orange-600', bg: 'from-orange-50 to-yellow-50' },
  ];

  const mostOrderedData = [
    { name: 'iPhone 15 Pro', code: 'IPH15-PRO', units: '15 units', amount: '$13,485' },
    { name: 'Galaxy S24', code: 'SGS24-256', units: '12 units', amount: '$9,588' },
  ];

  // Mock invoices - replace with your actual API call later
  const invoices: InvoiceSummary[] = [
    { name: 'POS-2025-001', status: 'Paid', customer: 'John Doe', posting_date: '2025-01-20', grand_total: 1847.5 },
    { name: 'POS-2025-002', status: 'Draft', customer: 'Walking Customer', posting_date: '2025-01-21', grand_total: 999.99 },
  ];

  const handleInvoiceClick = (invoice: InvoiceSummary) => {
    // Open the invoice in a new tab and switch to print view
    openTab(invoice.name, invoice);
    setActiveRightPanelTab('print');
  };

  return (
    <div className="w-full h-full bg-white/60 backdrop-blur border-l border-white/20 flex flex-col relative">
      {/* Top Tabs */}
      <div className="flex border-b border-gray-200/60 bg-white/80 ">
        <button
          className={`px-4 py-3 font-semibold text-sm border-b-3 ${activeRightPanelTab === 'product'
              ? 'border-accent bg-white/90 text-accent'
              : 'border-transparent text-gray-500 hover:text-black hover:bg-white/40 transition-all'
            }`}
          onClick={() => setActiveRightPanelTab('product')}
        >
          Product
        </button>
        <button
          className={`px-4 py-3 font-medium text-sm border-b-3 ${activeRightPanelTab === 'customer'
              ? 'border-accent bg-white/90 text-accent font-semibold'
              : 'border-transparent text-gray-500 hover:text-black hover:bg-white/40 transition-all'
            }`}
          onClick={() => setActiveRightPanelTab('customer')}
        >
          Customer
        </button>
        <button
          className={`px-4 py-3 font-medium text-sm border-b-3 ${activeRightPanelTab === 'print'
              ? 'border-accent bg-white/90 text-accent font-semibold'
              : 'border-transparent text-gray-500 hover:text-black hover:bg-white/40 transition-all'
            }`}
          onClick={() => setActiveRightPanelTab('print')}
        >
          Print
        </button>
        <button
          className={`px-4 py-3 font-medium text-sm border-b-3 ${activeRightPanelTab === 'orders'
              ? 'border-accent bg-white/90 text-accent font-semibold'
              : 'border-transparent text-gray-500 hover:text-black hover:bg-white/40 transition-all'
            }`}
          onClick={() => setActiveRightPanelTab('orders')}
        >
          Orders
        </button>
        <button className="px-4 py-3 font-medium text-gray-500 hover:text-black hover:bg-white/40 transition-all text-sm">
          Cash In/Out
        </button>
      </div>

      {/* Quick Action Controls - Only show for Product tab */}
      {activeRightPanelTab === 'product' && (
        <div className="p-4 bg-white/90 border-b border-gray-200/60">
          <div className="grid grid-cols-3 gap-3">
            <button className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
              <FaHistory />
              History
            </button>
            <button className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
              <FaBoxes />
              Stock
            </button>
            <button className="px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
              <FaUserCircle />
              Account
            </button>
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeRightPanelTab === 'product' && (
        <RightPanelProductTab
          selectedProduct={selectedProduct}
        />
      )}

      {activeRightPanelTab === 'customer' && (
        <RightPanelCustomerTab
          customer={currentTab?.customer}
          customerInfo={customerInfo}
          mostOrderedData={mostOrderedData}
        />
      )}

      {activeRightPanelTab === 'print' && (
        <RightPanelPrintTab order={currentTab?.invoiceData} />
      )}

      {activeRightPanelTab === 'orders' && (
        <RightPanelOrdersTab
          invoices={invoices}
          onOpenInvoice={handleInvoiceClick}
        />
      )}
    </div>
  );
};

export default RightPanel;