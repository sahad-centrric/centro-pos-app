import React from 'react';
import { FaPlus, FaExchangeAlt } from 'react-icons/fa';
import InfoBoxGrid from '../common/InfoBoxGrid';
import type { InfoItem, ProductSummary } from '../../../types/pos';

interface Props {
  productInfo: InfoItem[];
  selectedProduct: ProductSummary | null;
}

const RightPanelProductTab: React.FC<Props> = ({ productInfo, selectedProduct }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Product Overview */}
      <div className="p-4 border-b border-gray-200/60 bg-white/90">
        <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center">
          <img
            className="w-24 h-24 object-cover rounded-lg"
            src="https://via.placeholder.com/96"
            alt="Product image placeholder"
          />
        </div>
        {selectedProduct ? (
          <div className="space-y-2">
            <div className="font-bold text-lg text-primary">{selectedProduct.code}</div>
            <div className="font-semibold text-gray-800">{selectedProduct.name}</div>
            <div className="text-sm text-gray-600">Category: {selectedProduct.category ?? 'Not specified'}</div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="font-bold text-lg text-gray-400">No Product Selected</div>
            <div className="font-semibold text-gray-400">Select a product to view details</div>
          </div>
        )}
      </div>

      {/* Pricing & Stock (InfoBoxGrid) */}
      <div className="p-4 border-b border-gray-200/60 bg-white/90">
        <h4 className="font-bold text-gray-800 mb-3">Pricing & Stock</h4>
        <InfoBoxGrid items={productInfo} />
      </div>

      {/* Customer Purchase History */}
      <div className="p-4 border-b border-gray-200/60 bg-white/90">
        <h4 className="font-bold text-gray-800 mb-3">Customer's History</h4>
        <div className="text-xs text-gray-500 mb-2">Previous purchases of selected product</div>
        <div className="space-y-2">
          <div className="p-2 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg text-xs">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-primary">POS-2024-892</div>
              <div className="text-gray-600">Dec 15, 2024</div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-gray-600">Qty: 1</span>
              <span className="font-semibold text-green-600">$799.00</span>
            </div>
          </div>
          <div className="p-2 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg text-xs">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-primary">POS-2024-654</div>
              <div className="text-gray-600">Oct 22, 2024</div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-gray-600">Qty: 2</span>
              <span className="font-semibold text-green-600">$1,598.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upsell & Alternative Products */}
      <div className="bg-white/90">
        <div className="p-4 space-y-3">
          <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-sm text-primary">SGS24-CASE</div>
              <div className="text-xs text-gray-600">Galaxy S24 Premium Case</div>
            </div>
            <button className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-lg flex items-center">
              <FaPlus className="mr-1" />Add
            </button>
          </div>

          <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-sm text-primary">SGS24-512</div>
              <div className="text-xs text-gray-600">Galaxy S24 (512GB)</div>
            </div>
            <button className="px-3 py-1 bg-purple-500 text-white text-xs rounded-lg flex items-center">
              <FaExchangeAlt className="mr-1" />Replace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanelProductTab;