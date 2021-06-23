import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DrinksProvider from './context/Provider';

ReactDOM.render(
  <BrowserRouter>
    <DrinksProvider>
    <App />
    </DrinksProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
