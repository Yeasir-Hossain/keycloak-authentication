import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import Global from './layouts/Global.tsx'

createRoot(document.getElementById('root')!).render(
  <Global>
    <App />
  </Global>,
)
