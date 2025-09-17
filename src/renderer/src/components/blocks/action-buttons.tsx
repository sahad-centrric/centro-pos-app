import { CreditCard, RotateCcw, Send } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'

type Props = unknown

const ActionButtons: React.FC<Props> = () => (
  // const ActionButtons = () => (
  <div className="flex gap-3 p-4">
    <Button className="bg-green-500 hover:bg-green-600 flex-1">
      <Send className="w-4 h-4 mr-2" />
      Submit
      <span className="ml-2 text-xs bg-green-600 px-1 rounded">Ctrl+Enter</span>
    </Button>
    <Button className="bg-blue-500 hover:bg-blue-600 flex-1">
      <CreditCard className="w-4 h-4 mr-2" />
      Pay
      <span className="ml-2 text-xs bg-blue-600 px-1 rounded">Ctrl+P</span>
    </Button>
    <Button className="bg-orange-500 hover:bg-orange-600 flex-1">
      <RotateCcw className="w-4 h-4 mr-2" />
      Return
      <span className="ml-2 text-xs bg-orange-600 px-1 rounded">Ctrl+R</span>
    </Button>
  </div>
)

export default ActionButtons
