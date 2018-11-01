//@flow
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/string';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactServer from 'react-dom/server';
import './widgets/css/global.css';

import App from './widgets/steps/demo';
//import App from './widgets/switch/demo';
//import App from './widgets/loading/demo';
//import App from './widgets/icon/demo';
//import App from './widgets/tree-select/demo';
// import App from './widgets/trigger/demo';
import registerServiceWorker from './registerServiceWorker';

// console.info(ReactServer.renderToString(<App />));
const root = document.getElementById('root');
if (root) {
  window.a = ReactDOM.render(<App />, root);
}
registerServiceWorker();
