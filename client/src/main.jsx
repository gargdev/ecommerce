import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store'; // Ensure correct import path
import App from './App';
import './style.css';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Provider store={store}> {/* ✅ Wrap App in Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);
