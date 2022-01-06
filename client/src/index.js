import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';

import { store } from './Redux/store';

import { ThemeProvider } from './Theme/ThemeContext';
import Background from './Theme/Background/Background';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Background>
          <App />
        </Background>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
