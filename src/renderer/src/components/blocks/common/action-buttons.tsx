import { Button } from '@renderer/components/ui/button'



const ActionButtons: React.FC = () => {

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
              <i className="fas fa-save  text-lg"></i>
              <span className='font-medium text-base'>Save</span>
              <span className="text-xs opacity-80 bg-white/20 px-2 py-1 rounded-lg">Ctrl+S</span>
            </Button>
            {/* )} */}
            <Button
              className="px-2 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3  text-xs"
            // onClick={handleSubmitOrder}
            >
              <i className="fas fa-paper-plane text-lg"></i>
              <span className='font-medium text-base'>Submit</span>
              <span className="text-xs opacity-80 bg-white/20 px-2 py-1 rounded-lg">Ctrl+Enter</span>
            </Button>
            <Button className="px-2 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3  text-xs">
              <i className="fas fa-credit-card text-lg"></i>
              <span className='font-medium text-base'>Pay</span>
              <span className="text-xs opacity-80 bg-white/20 px-2 py-1 rounded-lg">Ctrl+P</span>
            </Button>
            <Button className="px-2 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3  text-xs">
              <i className="fa-solid fa-undo text-lg"></i>
              <span className='font-medium text-base'>Return</span>
              <span className="text-xs opacity-80 bg-white/20 px-2 py-1 rounded-lg">Ctrl+R</span>
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
