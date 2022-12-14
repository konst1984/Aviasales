import React from 'react';

import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import './index.module.scss';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
