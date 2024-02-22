import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import MainContent from './MainContent.jsx'
import { BrowserRouter } from 'react-router-dom'
import '../firebase.js';
import { Provider } from 'react-redux';
import {store,persistor} from '../store/store.js';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import Preloader from './html/components/Preloader.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(

    
  
  <Provider store={store}>
    
    <PersistGate loading={<Preloader />} persistor={persistor}>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </PersistGate>
  </Provider>

)
