import React from 'react'
import ReactDOM from 'react-dom/client'
import { JournalApp } from './JournalApp'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'

// BrowseRouter siempre hay que ponerlo en el lugar mas alto de la aplicacion, en este caso JournalApp
// ThemeProvider 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>    
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>    
  </React.StrictMode>,
)
