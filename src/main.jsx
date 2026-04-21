main.jsximport React from 'react'
import ReactDOM from 'react-dom/client'
import KanbanCRM from './pages/KanbanCRM.jsx' // Certifique-se de que o KanbanCRM que criámos está nesta pasta
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <KanbanCRM />
  </React.StrictMode>,
)