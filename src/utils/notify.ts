// 에러 알림
import toast from 'react-hot-toast'

export const notifyError = (text: string) => {
    toast.dismiss()
    toast.error(text)
}

export const notifySuccess = (text: string) =>{
    toast.dismiss()
    toast.success(text)
}
