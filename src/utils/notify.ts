// 에러 알림
import { toast } from 'react-toastify'

export const notifyError = (text: string) =>
  toast.error(text, {
    position: 'bottom-center',
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'light',
  })

export const notifySuccess = (text: string) =>
  toast.success(text, {
    position: 'bottom-center',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'light',
  })
