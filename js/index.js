'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // bind event listener to react's "Presentational Components"

// redux store setup
import { store } from './logic/rStore';

// react view setup
import App from './view/app';

const root = document.createElement('div');
document.body.appendChild(root);

const initView = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );
};

const main = () => {
  initView();
};

window.addEventListener('load', main);