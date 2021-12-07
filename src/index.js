import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './Redux/Stateprovider';
import reducer, { initialState } from './Redux/store';



ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

