import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

import InfoBoxGrid from '../common/InfoBoxGrid';
import type { InfoItem } from '@renderer/types/pos';

interface Props {
  customer: { name: string; gst: string } | undefined;
  customerInfo: InfoItem[];
  customerRecentOrders: Array<{ orderNumber: string; status: 'Paid' | 'Pending' | 'Draft' | 'Cancelled'; date: string; time: string; quantity: number; amount: string }>;
  mostOrderedData: Array<{ name: string; code: string; units: string; amount: string }>;
}

const RightPanelCustomerTab: React.FC<Props> = ({ customer, customerInfo, customerRecentOrders, mostOrderedData }) => {
  const customerName = customer?.name || 'Walking Customer';
  const customerGst = customer?.gst || 'Not Applicable';

  return (
    <div className="flex-1 overflow-hidden">
      <div className="p-4 border-b border-gray-200/60 bg-white/90">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-slate-700 rounded-full flex items-center justify-center">
            <FaUserCircle className="text-white text-lg" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{customerName}</h3>
            <p className="text-sm text-gray-600">GST: {customerGst}</p>
          </div>
        </div>
        <InfoBoxGrid items={customerInfo} />
      </div>

      <div className="p-4 bg-white/90">
        <h4 className="font-bold text-gray-800 mb-3">Recent Orders</h4>
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
          {customerRecentOrders.map((order, idx) => (
            <div key={idx} className="p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-primary text-sm">#{order.orderNumber}</span>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${order.status === 'Paid' ? 'bg-green-100 text-green-800' :
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                  }`}>
                  {order.status}
                </span>
              </div>
              <div className="text-xs text-gray-600 mb-1">{order.date} • {order.time}</div>
              <div className="flex justify-between text-xs">
                <span>Qty: {order.quantity}</span>
                <span className="font-semibold">{order.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-gray-200/60 bg-white/90">
        <h4 className="font-bold text-gray-800 mb-4">Most Ordered</h4>
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {mostOrderedData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
              <div>
                <div className="font-semibold text-sm">{item.name}</div>
                <div className="text-xs text-gray-600">{item.code}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm">{item.units}</div>
                <div className="text-xs text-gray-600">{item.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanelCustomerTab;