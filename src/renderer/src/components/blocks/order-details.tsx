import React, { useState } from 'react';
import CustomerSearchModal from './CustomerSearchModal';
import { usePOSTabStore } from '../../store/usePOSTabStore';



const OrderDetails: React.FC = () => {

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({ name: 'Walking Customer', gst: 'Not Applicable' });

  const { tabs, activeTabId } = usePOSTabStore();
  const currentTab = tabs.find(tab => tab.id === activeTabId);

  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(false);
    console.log('Customer selected:', customer);
  };

  return (
    <div className="p-3 bg-white/60 backdrop-blur border-b border-white/20">
      <div className="grid grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Customer</label>
          <button
            onClick={() => setShowCustomerModal(true)}
            className="w-full p-4 bg-white/80 border border-white/40 rounded-xl shadow-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-left flex items-center justify-between hover:bg-white/90"
          >
            <span>{selectedCustomer.name}</span>
            <i className="fas fa-chevron-down text-gray-400"></i>
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Price List</label>
          <select className="w-full p-4 bg-white/80 border border-white/40 rounded-xl shadow-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all">
            <option selected>Default Price List</option>
            <option>Wholesale Price List</option>
            <option>Retail Price List</option>
            <option>VIP Price List</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Date</label>
          <input
            type="date"
            defaultValue="2025-01-21"
            className="w-full p-4 bg-white/80 border border-white/40 rounded-xl shadow-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Delivery</label>
          <div className="flex gap-2">
            <button className="px-4 py-3 bg-gradient-to-r from-primary to-slate-700 text-white text-sm rounded-lg shadow-lg transition-all">
              Instant
            </button>
            <button className="px-4 py-3 bg-white/60 border border-gray-200 text-sm rounded-lg hover:bg-white/80 transition-all">
              Scheduled
            </button>
          </div>
        </div>
      </div>

      {/* Customer Search Modal */}
      <CustomerSearchModal
        open={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        onSelect={handleCustomerSelect}
      />
    </div>
  );
}

export default OrderDetails
