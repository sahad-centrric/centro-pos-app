import React from 'react';
import { FaPlus, FaExchangeAlt } from 'react-icons/fa';
import InfoBoxGrid from '../common/InfoBoxGrid';
import type { InfoItem} from '../../../types/pos';

interface Props {
  selectedProduct: any | null;
}

const RightPanelProductTab: React.FC<Props> = ({ selectedProduct }) => {
  const productInfo: InfoItem[] = selectedProduct ? [
    { 
      label: 'Unit Price', 
      value: `$${(selectedProduct.standard_rate || 0).toFixed(2)}`, 
      color: 'text-blue-600', 
      bg: 'from-blue-50 to-indigo-50' 
    },
    { 
      label: 'On Hand', 
      value: `${selectedProduct.actual_qty || 0} units`, 
      color: 'text-red-600', 
      bg: 'from-red-50 to-pink-50' 
    },
    { 
      label: 'Cost', 
      value: `$${(selectedProduct.valuation_rate || 0).toFixed(2)}`, 
      color: 'text-orange-600', 
      bg: 'from-orange-50 to-yellow-50' 
    },
    { 
      label: 'UOM', 
      value: selectedProduct.stock_uom || 'N/A', 
      color: 'text-purple-600', 
      bg: 'from-purple-50 to-pink-50' 
    },
  ] : [
    { label: 'Unit Price', value: '$0.00', color: 'text-blue-600', bg: 'from-blue-50 to-indigo-50' },
    { label: 'On Hand', value: '0 units', color: 'text-red-600', bg: 'from-red-50 to-pink-50' },
    { label: 'Cost', value: '$0.00', color: 'text-orange-600', bg: 'from-orange-50 to-yellow-50' },
    { label: 'UOM', value: 'N/A', color: 'text-purple-600', bg: 'from-purple-50 to-pink-50' },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Product Overview */}
      <div className="p-4 border-b border-gray-200/60 bg-white/90">
        <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center">
          {selectedProduct?.image ? (
            <img
              className="w-24 h-24 object-cover rounded-lg"
              src={selectedProduct.image}
              alt={selectedProduct.item_name || 'Product'}
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-xs">No Image</span>
            </div>
          )}
        </div>
        
        {selectedProduct ? (
          <div className="space-y-2">
            <div className="font-bold text-lg text-primary">{selectedProduct.item_code}</div>
            <div className="font-semibold text-gray-800">{selectedProduct.item_name}</div>
            <div className="text-sm text-gray-600">
              Category: {selectedProduct.item_group || 'Not specified'}
            </div>
            {selectedProduct.brand && (
              <div className="text-sm text-gray-600">
                Brand: {selectedProduct.brand}
              </div>
            )}
            <div className="text-sm font-semibold text-green-600">
              ${(selectedProduct.standard_rate || 0).toFixed(2)}
            </div>
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

      {/* Product Description (if available) */}
      {selectedProduct?.description && (
        <div className="p-4 border-b border-gray-200/60 bg-white/90">
          <h4 className="font-bold text-gray-800 mb-2">Description</h4>
          <p className="text-sm text-gray-600">{selectedProduct.description}</p>
        </div>
      )}

      {/* Customer Purchase History */}
      <div className="p-4 border-b border-gray-200/60 bg-white/90">
        <h4 className="font-bold text-gray-800 mb-3">Customer's History</h4>
        <div className="text-xs text-gray-500 mb-2">
          Previous purchases of {selectedProduct?.item_name || 'selected product'}
        </div>
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
        <div className="p-4">
          <h4 className="font-bold text-gray-800 mb-3">Recommendations</h4>
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-bold text-sm text-primary">SGS24-CASE</div>
                  <div className="text-xs text-gray-600">Galaxy S24 Premium Case</div>
                  <div className="text-xs text-green-600 font-semibold mt-1">$49.99</div>
                </div>
                <button className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 transition-all flex items-center">
                  <FaPlus className="mr-1" />
                  Add
                </button>
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-bold text-sm text-primary">SGS24-512</div>
                  <div className="text-xs text-gray-600">Galaxy S24 (512GB)</div>
                  <div className="text-xs text-purple-600 font-semibold mt-1">$949.00</div>
                </div>
                <button className="px-3 py-1 bg-purple-500 text-white text-xs rounded-lg hover:bg-purple-600 transition-all flex items-center">
                  <FaExchangeAlt className="mr-1" />
                  Replace
                </button>
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-bold text-sm text-primary">SGS24-CHRG</div>
                  <div className="text-xs text-gray-600">Wireless Charger 25W</div>
                  <div className="text-xs text-blue-600 font-semibold mt-1">$89.99</div>
                </div>
                <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-all flex items-center">
                  <FaPlus className="mr-1" />
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanelProductTab;