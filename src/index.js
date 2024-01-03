import React from 'react';
import { createRoot } from 'react-dom/client';
import "antd/dist/antd.min.css"
import { Provider } from 'react-redux';
import App from './app/App';
import './tailwind.css';
import store from './app/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
