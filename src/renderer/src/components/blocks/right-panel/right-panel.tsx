// import { useState, useEffect } from 'react';
// import { FaHistory, FaBoxes, FaUserCircle } from 'react-icons/fa';
// import InfoBoxGrid from './InfoBoxGrid';
// import RightPanelProductTab from './RightPanelProductTab';
// import RightPanelCustomerTab from './RightPanelCustomerTab';
// import RightPanelOrdersTab from './RightPanelOrdersTab';
// import RightPanelPrintTab from './RightPanelPrintTab';
// import { useCartStore } from '../store/useCartStore';

// // Type definitions
// interface MostOrderedItem {
//   name: string;
//   code: string;
//   units: string;
//   amount: string;
// }

// interface InfoBoxItem {
//   label: string;
//   value: string;
//   color: string;
//   bg: string;
// }

// interface Product {
//   id?: string;
//   name?: string;
//   code?: string;
//   price?: number;
//   quantity?: number;
//   [key: string]: any;
// }

// interface Customer {
//   id?: string;
//   name?: string;
//   [key: string]: any;
// }

// interface CartStore {
//   activeRightPanelTab: string;
//   setActiveRightPanelTab: (tab: string) => void;
//   selectedProduct: Product | null;
//   selectedCustomer: Customer | null;
//   orderActionTrigger: string | null;
//   setOrderActionTrigger: (trigger: string | null) => void;
// }

// interface RightPanelProductTabProps {
//   upsellTab: string;
//   setUpsellTab: (tab: string) => void;
//   productInfo: InfoBoxItem[];
//   selectedProduct: Product | null;
// }

// interface RightPanelCustomerTabProps {
//   customerInfo: InfoBoxItem[];
//   mostOrderedData: MostOrderedItem[];
// }

// const mostOrderedData: MostOrderedItem[] = [
//   {
//     name: 'iPhone 15 Pro',
//     code: 'IPH15-PRO',
//     units: '15 units',
//     amount: '$13,485',
//   },
//   {
//     name: 'Galaxy S24',
//     code: 'SGS24-256',
//     units: '12 units',
//     amount: '$9,588',
//   },
// ];

// const RightPanel: React.FC = () => {
//   // Get active tab from cart store
//   const { 
//     activeRightPanelTab, 
//     setActiveRightPanelTab, 
//     selectedProduct, 
//     selectedCustomer, 
//     orderActionTrigger, 
//     setOrderActionTrigger 
//   }: CartStore = useCartStore();
  
//   const [upsellTab, setUpsellTab] = useState<string>('upsell');
//   const [isInitialized, setIsInitialized] = useState<boolean>(false);

//   // Auto-switch to product tab when a product is selected
//   useEffect(() => {
//     if (selectedProduct) {
//       setActiveRightPanelTab('product');
//     }
//   }, [selectedProduct, setActiveRightPanelTab]);

//   // Auto-switch to customer tab when customer is selected
//   useEffect(() => {
//     if (selectedCustomer && selectedCustomer.name !== 'Walking Customer') {
//       setActiveRightPanelTab('customer');
//     }
//   }, [selectedCustomer, setActiveRightPanelTab]);

//   // Auto-switch to orders tab when order action happens
//   useEffect(() => {
//     if (orderActionTrigger) {
//       setActiveRightPanelTab('orders');
//       // Reset the trigger after switching
//       setOrderActionTrigger(null);
//     }
//   }, [orderActionTrigger, setActiveRightPanelTab, setOrderActionTrigger]);

//   useEffect(() => {
//     // Only set default tab once when app first loads
//     if (!isInitialized) {
//       setActiveRightPanelTab('orders');
//       setIsInitialized(true);
//       return;
//     }

//     // After initialization, only auto-switch when there are actual selections
//     if (selectedProduct || selectedCustomer || orderActionTrigger) {
//       return; // Something is selected, don't change
//     }
//   }, [isInitialized, selectedProduct, selectedCustomer, orderActionTrigger, setActiveRightPanelTab]);

//   // InfoBoxGrid data for each tab
//   const productInfo: InfoBoxItem[] = [
//     { label: 'Unit Price', value: '$799.00', color: 'text-blue-600', bg: 'from-blue-50 to-indigo-50' },
//     { label: 'On Hand', value: '3 units', color: 'text-red-600', bg: 'from-red-50 to-pink-50' },
//     { label: 'Cost', value: '$650.00', color: 'text-orange-600', bg: 'from-orange-50 to-yellow-50' },
//     { label: 'Margin', value: '18.6%', color: 'text-purple-600', bg: 'from-purple-50 to-pink-50' },
//   ];

//   const customerInfo: InfoBoxItem[] = [
//     { label: 'Total Invoiced', value: '$12,450.00', color: 'text-blue-600', bg: 'from-blue-50 to-indigo-50' },
//     { label: 'Amount Due', value: '$2,570.00', color: 'text-red-600', bg: 'from-red-50 to-pink-50' },
//     { label: 'Last Payment', value: '$1,200.00', color: 'text-green-600', bg: 'from-green-50 to-emerald-50' },
//     { label: 'Commission', value: '$125.40', color: 'text-orange-600', bg: 'from-orange-50 to-yellow-50' },
//   ];

//   return (
//     <div className="w-full h-full bg-white/60 backdrop-blur border-l border-white/20 flex flex-col relative">
//       {/* Top Tabs */}
//       <div className="flex border-b border-gray-200/60 bg-white/80 overflow-x-auto">
//         <button
//           className={`px-4 py-3 font-semibold text-sm border-b-3 ${activeRightPanelTab === 'product' ? 'border-accent bg-white/90 text-accent' : 'border-transparent text-gray-500 hover:text-black hover:bg-white/40 transition-all'}`}
//           onClick={() => setActiveRightPanelTab('product')}
//         >
//           Product
//         </button>
//         <button
//           className={`px-4 py-3 font-medium text-sm border-b-3 ${activeRightPanelTab === 'customer' ? 'border-accent bg-white/90 text-accent font-semibold' : 'border-transparent text-gray-500 hover:text-black hover:bg-white/40 transition-all'}`}
//           onClick={() => setActiveRightPanelTab('customer')}
//         >
//           Customer
//         </button>
//         <button 
//           className={`px-4 py-3 font-medium text-sm border-b-3 ${activeRightPanelTab === 'print' ? 'border-accent bg-white/90 text-accent font-semibold' : 'border-transparent text-gray-500 hover:text-black hover:bg-white/40 transition-all'}`}
//           onClick={() => setActiveRightPanelTab('print')}
//         >
//           Print
//         </button>
//         <button
//           className={`px-4 py-3 font-medium text-sm border-b-3 ${activeRightPanelTab === 'orders' ? 'border-accent bg-white/90 text-accent font-semibold' : 'border-transparent text-gray-500 hover:text-black hover:bg-white/40 transition-all'}`}
//           onClick={() => setActiveRightPanelTab('orders')}
//         >
//           Orders
//         </button>
//         <button className="px-4 py-3 font-medium text-gray-500 hover:text-black hover:bg-white/40 transition-all text-sm">
//           Cash In/Out
//         </button>
//       </div>

//       {/* Quick Action Controls - Only show for Product tab */}
//       {activeRightPanelTab === 'product' && (
//         <div className="p-4 bg-white/90 border-b border-gray-200/60">
//           <div className="grid grid-cols-3 gap-3">
//             <button className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
//               <FaHistory />
//               History
//             </button>
//             <button className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
//               <FaBoxes />
//               Stock
//             </button>
//             <button className="px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
//               <FaUserCircle />
//               Account
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Tab Content */}
//       {activeRightPanelTab === 'product' && (
//         <RightPanelProductTab
//           upsellTab={upsellTab}
//           setUpsellTab={setUpsellTab}
//           productInfo={productInfo}
//           selectedProduct={selectedProduct}
//         />
//       )}
//       {activeRightPanelTab === 'customer' && (
//         <RightPanelCustomerTab
//           customerInfo={customerInfo}
//           mostOrderedData={mostOrderedData}
//         />
//       )}
//       {activeRightPanelTab === 'print' && (
//         <RightPanelPrintTab />
//       )}
//       {activeRightPanelTab === 'orders' && (
//         <RightPanelOrdersTab />
//       )}
//       {/* TODO: Add modular components for Invoice, Cash In/Out tabs in the future */}
//     </div>
//   );
// };

// export default RightPanel;