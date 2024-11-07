import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@/assets/styles/index.css'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from '@/components/ui/provider'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider>
      <App />
    </Provider>
  </QueryClientProvider>
)
