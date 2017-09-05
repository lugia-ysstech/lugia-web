//@flow

import React from 'react';
import ReactDOM from 'react-dom';

import App from './widgets/trigger/demo';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

window.a = ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

registerServiceWorker();
