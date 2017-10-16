//@flow
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/string';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './widgets/inputtag/demo';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

window.a = ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

registerServiceWorker();
