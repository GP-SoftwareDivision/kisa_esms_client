import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@/assets/styles/index.css'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from '@/components/ui/provider'

createRoot(document.getElementById('root')!).render(
  <Provider>
    <App />
  </Provider>
)
