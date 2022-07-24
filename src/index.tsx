import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {HashRouter} from 'react-router-dom';
import './index.css';
import { store } from './main/bll/store';
import { App } from './main/ui/app/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);

reportWebVitals();