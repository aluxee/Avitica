import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store';
import './index.css';
import { restoreCSRF, csrfFetch } from './store/csrf';
import { Modal, ModalProvider } from './context/Modal';
import { LoggedProvider } from './context/LoggedProvider';


const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  // window.sessionActions = sessionActions;
}

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}






ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <LoggedProvider>
          <App />
          <Modal />
        </LoggedProvider>
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);
