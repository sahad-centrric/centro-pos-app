import React, { useState } from 'react';
import { FaPlus, FaExchangeAlt } from 'react-icons/fa';

import InfoBoxGrid from '../common/InfoBoxGrid';
import type { InfoItem } from '../../../types/pos';
import { cn } from '@renderer/lib/utils';



export interface PurchaseHistoryItem {
  invoiceNumber: string;
  date: string;
  quantity: number;
  amount: string;
}

export interface RecommendationItem {
  code: string;
  name: string;
  price: string;
  available: number;
  colorTheme: 'emerald' | 'blue' | 'purple' | 'orange';
}

interface Props {
  selectedProduct: any | null;
  purchaseHistory: PurchaseHistoryItem[];
  upsellProducts: RecommendationItem[];
  alternativeProducts: RecommendationItem[];
}

const RightPanelProductTab: React.FC<Props> = ({ selectedProduct, purchaseHistory, upsellProducts, alternativeProducts }) => {

  const [upsellTab, setUpsellTab] = useState<'upsell' | 'alternative'>('upsell');

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
    <div className="flex-1 overflow-hidden">
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
        <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
          {purchaseHistory.map((item, idx) => (
            <div key={idx} className="p-2 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg text-xs">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-primary">{item.invoiceNumber}</div>
                <div className="text-gray-600">{item.date}</div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-600">Qty: {item.quantity}</span>
                <span className="font-semibold text-green-600">{item.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upsell & Alternative Products */}
      <div className="bg-white/90">
        <div className="flex border-b border-gray-200/60">
          <button
            className={cn(
              "flex-1 px-4 py-3 text-sm transition-all border-b-2",
              upsellTab === 'upsell'
                ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold"
                : "border-transparent text-gray-500 font-medium"
            )}
            onClick={() => setUpsellTab('upsell')}
          >
            Upsell Products
          </button>
          <button
            className={cn(
              "flex-1 px-4 py-3 text-sm transition-all border-b-2",
              upsellTab === 'alternative'
                ? "border-purple-500 bg-purple-50 text-purple-700 font-semibold"
                : "border-transparent text-gray-500 font-medium"
            )}
            onClick={() => setUpsellTab('alternative')}
          >
            Alternatives
          </button>
        </div>

        {/* Upsell Products Tab Content */}
        {upsellTab === 'upsell' && (
          <div className="p-4">
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
              {upsellProducts.map((product, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-3 rounded-xl border",
                    product.colorTheme === 'emerald' && "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200",
                    product.colorTheme === 'blue' && "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200",
                    product.colorTheme === 'purple' && "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200",
                    product.colorTheme === 'orange' && "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-bold text-sm text-primary">{product.code}</div>
                      <div className="text-xs text-gray-600">{product.name}</div>
                      <div className="text-xs text-green-600 font-semibold mt-1">
                        Available: {product.available}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "font-bold",
                        product.colorTheme === 'emerald' && "text-emerald-600",
                        product.colorTheme === 'blue' && "text-blue-600",
                        product.colorTheme === 'purple' && "text-purple-600",
                        product.colorTheme === 'orange' && "text-orange-600"
                      )}>
                        {product.price}
                      </div>
                      <button
                        className={cn(
                          "mt-1 px-3 py-1 text-white text-xs rounded-lg transition-all flex items-center",
                          product.colorTheme === 'emerald' && "bg-emerald-500 hover:bg-emerald-600",
                          product.colorTheme === 'blue' && "bg-blue-500 hover:bg-blue-600",
                          product.colorTheme === 'purple' && "bg-purple-500 hover:bg-purple-600",
                          product.colorTheme === 'orange' && "bg-orange-500 hover:bg-orange-600"
                        )}
                      >
                        <FaPlus className="mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alternative Products Tab Content */}
        {upsellTab === 'alternative' && (
          <div className="p-4">
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
              {alternativeProducts.map((product, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-3 rounded-xl border",
                    product.colorTheme === 'emerald' && "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200",
                    product.colorTheme === 'blue' && "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200",
                    product.colorTheme === 'purple' && "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200",
                    product.colorTheme === 'orange' && "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-bold text-sm text-primary">{product.code}</div>
                      <div className="text-xs text-gray-600">{product.name}</div>
                      <div className="text-xs text-green-600 font-semibold mt-1">
                        Available: {product.available}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "font-bold",
                        product.colorTheme === 'emerald' && "text-emerald-600",
                        product.colorTheme === 'blue' && "text-blue-600",
                        product.colorTheme === 'purple' && "text-purple-600",
                        product.colorTheme === 'orange' && "text-orange-600"
                      )}>
                        {product.price}
                      </div>
                      <button
                        className={cn(
                          "mt-1 px-3 py-1 text-white text-xs rounded-lg transition-all flex items-center",
                          product.colorTheme === 'emerald' && "bg-emerald-500 hover:bg-emerald-600",
                          product.colorTheme === 'blue' && "bg-blue-500 hover:bg-blue-600",
                          product.colorTheme === 'purple' && "bg-purple-500 hover:bg-purple-600",
                          product.colorTheme === 'orange' && "bg-orange-500 hover:bg-orange-600"
                        )}
                      >
                        <FaExchangeAlt className="mr-1" />
                        Replace
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanelProductTab;