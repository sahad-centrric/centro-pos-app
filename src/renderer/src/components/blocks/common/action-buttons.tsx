// import { CreditCard, RotateCcw, Send } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'

// type Props = unknown

const ActionButtons: React.FC = () => {
  // const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  // Get current tab and its items from Zustand (replaces useCartStore)
  // const { tabs, activeTabId, updateTabOrderId, updateTabTaxAmount, setTabEdited, updateTabInvoiceData }: POSTabStore = usePOSTabStore();
  // const currentTab: Tab | undefined = tabs.find(tab => tab.id === activeTabId);
  // const cartItems: CartItem[] = currentTab?.items || [];

  // Get customer from cart store
  // const { setActiveRightPanelTab, setOrderActionTrigger }: CartStore = useCartStore();

  // Determine if Save button should be shown
  // const shouldShowSaveButton = (): boolean => {
  //   // Show Save button if:
  //   // 1. New order (no orderId) - to create draft
  //   // 2. Draft order that has been edited
  //   return !currentTab?.orderId || currentTab?.isEdited;
  // };

  // const transactionDate: string = new Date().toISOString().slice(0, 10);
  // const { addSuccess, addError }: AlertStore = useAlertStore();
  // const deliveryDate: string = transactionDate;
  // const triggerRefresh: () => void = useOrderRefreshStore((state: OrderRefreshStore) => state.triggerRefresh);

  // const customerName: string = currentTab?.customer?.name || 'Walking Customer';

  // const handleCreateInvoice = async (): Promise<void> => {
  //   // Check if there are items to save
  //   if (!cartItems || cartItems.length === 0) {
  //     addError('Please add items to the order before saving.');
  //     return;
  //   }

  //   const invoiceData: InvoiceData = {
  //     customer: customerName,
  //     transaction_date: transactionDate,
  //     delivery_date: deliveryDate,
  //     items: cartItems.map(item => ({
  //       item_code: item.code,
  //       qty: item.quantity || 1,
  //       rate: item.price,
  //       warehouse: item.warehouse || 'Stores - CIPL',
  //     })),
  //     // Remove payment_amount and total_amount
  //   };

  //   try {
  //     let savedInvoice: any;

  //     if (currentTab?.orderId) {
  //       // UPDATE existing draft
  //       const updateData = prepareInvoiceUpdateData(invoiceData, getCurrentBackend());
  //       savedInvoice = await ordersAPI.update(currentTab.orderId, updateData);

  //       const normalizedInvoice = normalizeInvoice(savedInvoice.data, getCurrentBackend());
  //       updateTabInvoiceData(currentTab.id, normalizedInvoice);
  //       setTabEdited(currentTab.id, false);
  //       addSuccess('Order updated!');
  //     } else {
  //       // CREATE new draft
  //       const createData = prepareInvoiceData(invoiceData, getCurrentBackend());
  //       savedInvoice = await ordersAPI.createSaleInvoice(createData);

  //       if (currentTab && savedInvoice.id) {
  //         updateTabOrderId(currentTab.id, savedInvoice.id);
  //         updateTabTaxAmount(currentTab.id, savedInvoice.taxAmount || 0);
  //         updateTabInvoiceData(currentTab.id, savedInvoice);
  //       }

  //       addSuccess('Order saved as draft!');
  //     }

  //     setOrderActionTrigger('order_saved');
  //     setActiveRightPanelTab('orders');
  //     triggerRefresh();
  //   } catch (error: any) {
  //     console.error('Failed to save order:', error);
  //     addError(error?.message || 'Failed to save order!');
  //   }
  // };

  // const handlePaymentSubmit = async (paymentAmount: number): Promise<void> => {
  //   try {
  //     // Step 1: Update payment
  //     const paymentResponse = await ordersAPI.updatePayment(currentTab!.orderId!, paymentAmount);

  //     // Step 2: Submit order
  //     const submitResponse = await ordersAPI.submitInvoice(currentTab!.orderId!);

  //     // Success - both operations completed
  //     addSuccess('Payment successfully completed');
  //     setShowPaymentModal(false);
  //     setOrderActionTrigger('payment_processed');
  //     setActiveRightPanelTab('orders');
  //     triggerRefresh();

  //   } catch (error: any) {
  //     console.error(' Payment submission failed:', error);

  //     // Check if it's a submit error (payment might have succeeded)
  //     if (error.message && error.message.includes('submit')) {
  //       addError('Payment recorded but order submission failed. Please try submitting again.');
  //       // Keep modal open for retry
  //     } else {
  //       addError('Payment failed. Please try again.');
  //       // Keep modal open for retry
  //     }
  //   }
  // };

  // // COMPLETE: Handle order submission
  // const handleSubmitOrder = async (): Promise<void> => {
  //   console.log('🔍 Submit button clicked!');
  //   console.log('Current tab:', currentTab);
  //   console.log('Order ID:', currentTab?.orderId);

  //   // Check if we have a saved invoice to submit
  //   if (!currentTab?.orderId) {
  //     addError('Please save the order first before submitting.');
  //     return;
  //   }

  //   // Check if we have invoice data
  //   if (!currentTab?.invoiceData) {
  //     addError('Invoice data not found. Please save the order first.');
  //     return;
  //   }

  //   console.log('🔍 Current tab invoice data:', currentTab?.invoiceData);
  //   console.log('🔍 Grand total:', currentTab?.invoiceData?.grand_total);

  //   setShowPaymentModal(true);
  // };

  return (
    <>
      <div className="p-3 bg-white/40 backdrop-blur border-b border-white/20">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            {/* {shouldShowSaveButton() && ( */}
            <Button
              className="px-2 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3  text-xs"
            // onClick={handleCreateInvoice}
            >
              <i className="fas fa-save text-lg"></i>
              Save <span className="text-xs opacity-80 bg-white/20 px-2 py-1 rounded-lg">Ctrl+S</span>
            </Button>
            {/* )} */}
            <Button
              className="px-2 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3  text-xs"
            // onClick={handleSubmitOrder}
            >
              <i className="fas fa-paper-plane text-lg"></i>
              Submit <span className="text-xs opacity-80 bg-white/20 px-2 py-1 rounded-lg">Ctrl+Enter</span>
            </Button>
            <Button className="px-2 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3  text-xs">
              <i className="fas fa-credit-card text-lg"></i>
              Pay <span className="text-xs opacity-80 bg-white/20 px-2 py-1 rounded-lg">Ctrl+P</span>
            </Button>
            <Button className="px-2 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3  text-xs">
              <i className="fas fa-rotate-left text-lg"></i>
              Return <span className="text-xs opacity-80 bg-white/20 px-2 py-1 rounded-lg">Ctrl+R</span>
            </Button>
          </div>
          <div className="text-sm font-semibold text-gray-700">
            {/* Order #: {currentTab?.orderId || 'New Order'} | Items: {cartItems.length} */}
          </div>
        </div>
      </div>
      {/* <PaymentSubmissionModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSubmit={handlePaymentSubmit}
        grandTotal={currentTab?.invoiceData?.total}
        outstandingAmount={currentTab?.invoiceData?.outstandingAmount} 
      /> */}
    </>
  );
};

export default ActionButtons
