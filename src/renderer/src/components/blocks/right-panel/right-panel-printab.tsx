import React from 'react';
import type { InvoiceSummary } from '../../../types/pos';

interface Props {
 order: InvoiceSummary | null; // Your invoiceData from the tab
}

const RightPanelPrintTab: React.FC<Props> = ({ order }) => {
  if (!order) {
    return (
      <div className="p-4 text-center text-gray-500">
        <div className="py-8">
          <p className="text-lg font-medium mb-2">No Order Selected</p>
          <p className="text-sm">Create or select an order to view its bill</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="bg-white rounded-xl border p-4">
        <div className="font-bold text-xl mb-2">Invoice #{order.name || 'N/A'}</div>
        <div className="text-sm text-gray-600">Customer: {order.customer || 'N/A'}</div>
        <div className="text-sm text-gray-600">Date: {order.posting_date || 'N/A'}</div>
        <div className="text-sm text-gray-600">Total: ${order.grand_total?.toFixed(2) || '0.00'}</div>
      </div>
    </div>
  );
};

export default RightPanelPrintTab;