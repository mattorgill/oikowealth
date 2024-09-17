import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { GlobalStyle } from './assets/styles/GlobalStyle';
// import { GlobalProvider } from './context/GlobalContext';
import { SessionProvider } from './context/SessionContext';
import { TransactionProvider } from './context/TransactionContext';
import { GlobalProvider } from './context/GlobalContext';
import { CategoryProvider } from "./context/CategoryContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log("Start at index");
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider>
    <SessionProvider>
      <TransactionProvider>
        <CategoryProvider>
          <App />
        </CategoryProvider>
      </TransactionProvider>
    </SessionProvider>
    </GlobalProvider>

  </React.StrictMode>
);


