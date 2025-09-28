import type { FC, ReactNode } from 'react'
import { Fragment } from 'react'
import { confirmable } from 'react-confirm'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../alert-dialog'

export interface IConfirmation {
  okLabel?: string
  cancelLabel?: string
  title?: string
  confirmation?: string | ((proceed: (value: boolean) => void, dismiss: () => void) => ReactNode)
  hideButton?: boolean
}

const Confirmation: FC<any> = (props) => {
  const {
    show,
    dismiss,
    proceed,
    confirmation = 'Are you sure you want to delete this item?',
    okLabel = 'YES',
    cancelLabel = 'NO',
    title = 'Delete',
    hideButton = false
  } = props

  const renderContent = () => {
    if (typeof confirmation === 'string') {
      return (
        <AlertDialogDescription className="text-muted-foreground">
          {confirmation}
        </AlertDialogDescription>
      )
    }
    return confirmation(proceed, dismiss)
  }

  const renderButtons = () => {
    if (hideButton) return <Fragment />

    return (
      <AlertDialogFooter>
        <AlertDialogCancel onClick={dismiss}>{cancelLabel}</AlertDialogCancel>
        <AlertDialogAction onClick={() => proceed(true)}>{okLabel}</AlertDialogAction>
      </AlertDialogFooter>
    )
  }

  return (
    <AlertDialog open={show} onOpenChange={(isOpen) => !isOpen && dismiss()}>
      <AlertDialogContent className="max-w-sm rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary font-semibold">{title}</AlertDialogTitle>
          {renderContent()}
        </AlertDialogHeader>
        {renderButtons()}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default confirmable(Confirmation)
