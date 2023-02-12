import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ContextProvider } from './Context';
import { Provider } from 'react-redux';
import { store } from './store/config.store';
import { CartProvider } from 'react-use-cart';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ContextProvider>
        <CartProvider>
        <Provider store={store}>
        <App />   
        </Provider>
        </CartProvider>
      </ContextProvider>
    </Router>
  </React.StrictMode>
);


