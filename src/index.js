//@flow
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/string';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './widgets/scroller/demo';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const root = document.getElementById('root');
if (root) {

  window.a = ReactDOM.render(
    <App/>,
    root
  );
}
registerServiceWorker();
