import { Button } from '@renderer/components/ui/button'
import { usePOSTabStore } from '../../../store/usePOSTabStore'
import { API_Endpoints } from '@renderer/config/endpoints'
import { useMutationQuery } from '@renderer/hooks/react-query/useReactQuery'
import { useAuth } from '@renderer/hooks/useAuth'
// import { useMutationQuery } from '@renderer/hooks/react-query/useReactQuery'
// import { API_Endpoints } from '@renderer/config/endpoints'

const Header: React.FC = () => {

  const { tabs, activeTabId, setActiveTab, closeTab, createNewTab } = usePOSTabStore()

  const handleNewOrder = () => {
    createNewTab()
  }

  const { mutate } = useMutationQuery({
    endPoint: API_Endpoints.LOGOUT,
    method: 'POST'
  })

  const { logout } = useAuth()

  return (
    <div className="p-3 glass-effect border-b border-white/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button
            className="px-8 py-3 bg-gradient-to-r from-primary to-slate-700 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-3 "
            onClick={handleNewOrder}
          >
            <i className="fas fa-plus text-lg"></i>
            New Order{' '}
            <span className="text-xs opacity-80 bg-white/20 px-2 py-1 rounded-lg ml-2">Ctrl+N</span>
          </Button>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex items-center px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  activeTabId === tab.id ? 'bg-white/80 font-bold shadow' : 'bg-white/40'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>
                  {tab.orderId ? `#${tab.orderId}` : tab.type === 'new' ? 'New' : 'Order'}
                </span>
                <button
                  className="ml-2 text-gray-400 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(tab.id)
                  }}
                  title="Close tab"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        

        <div className="ml-auto text-right bg-white/60 backdrop-blur rounded-xl p-4 shadow-lg">
          <div className="font-bold text-lg">{new Date().toLocaleDateString()}</div>
          <div className="text-sm text-gray-600">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        <div className="ml-2 text-right   rounded-xl p-4 shadow-lg">
          <Button
            variant={'outline'}
            onClick={() =>
              mutate(
                {
                  data: undefined,
                  params: {}
                },
                {
                  onSuccess: () => {
                    logout()
                  }
                }
              )
            }
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header
