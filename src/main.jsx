import React from 'react';
import ReactDOM from 'react-dom/client';
import { JournalApp } from './JournalApp';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './styles.css';

// BrowseRouter siempre hay que ponerlo en el lugar mas alto de la aplicacion, en este caso JournalApp
// ThemeProvider 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
       <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
