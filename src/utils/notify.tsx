// 에러 알림
import { toast } from 'react-toastify'

export const notify = (text: string) =>
  toast.error(text, {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: 'light',
  })
