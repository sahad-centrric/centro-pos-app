import { createConfirmationCreater, createReactTreeMounter, createMountPoint } from 'react-confirm'

import ConfirmModal from './confirm'

const mounter = createReactTreeMounter()

export const createConfirmation = createConfirmationCreater(mounter)
export const MountPoint = createMountPoint(mounter)
export const confirm = createConfirmation(ConfirmModal)
