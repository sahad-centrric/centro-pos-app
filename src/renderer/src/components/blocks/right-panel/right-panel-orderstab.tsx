import React from 'react';
import { FaReceipt, FaUser, FaCalendar } from 'react-icons/fa';
import type { InvoiceSummary } from '../../../types/pos';

interface Props {
  invoices: InvoiceSummary[];
  loading?: boolean;
  onOpenInvoice: (invoice: InvoiceSummary) => void;
}

const getStatusColor = (status: InvoiceSummary['status']) => {
  switch (status) {
    case 'Draft':
      return 'bg-yellow-100 text-yellow-800';
    case 'Partly Paid':
      return 'bg-blue-100 text-blue-800';
    case 'Overdue':
      return 'bg-red-100 text-red-800';
    case 'Paid':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const RightPanelOrdersTab: React.FC<Props> = ({ invoices, loading = false, onOpenInvoice }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 border-b border-gray-200/60 bg-white/90">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <FaReceipt className="text-white text-lg" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">Sale Orders</h3>
            <p className="text-sm text-gray-600">Recent Orders and payments</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white/90">
        <h4 className="font-bold text-gray-800 mb-3">Recent Orders</h4>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading Orders...</div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No Orders found</div>
        ) : (
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.name}
                className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onOpenInvoice(invoice)}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-bold text-primary text-lg">#{invoice.name}</span>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-400" />
                    <span className="text-gray-700">{invoice.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-gray-400" />
                    <span className="text-gray-700">{invoice.posting_date}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Amount:</span>
                    <span className="font-bold text-lg text-green-600">${invoice.grand_total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanelOrdersTab;