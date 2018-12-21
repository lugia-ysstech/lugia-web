//@flow
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/string';

import React from 'react';
import ReactDOM from 'react-dom';
import './widgets/css/global.css';

// import App from './widgets/cascader/demo';
//import App from './widgets/switch/demo';
//import App from './widgets/loading/demo';
//import App from './widgets/icon/demo';
//import App from './widgets/tree-select/demo';
import App from './widgets/navmenu/demo';
// import App from './widgets/tree/demo';

// import App from './widgets/menu/demo';

import registerServiceWorker from './registerServiceWorker';

// console.info(ReactServer.renderToString(<App />));
const root = document.getElementById('root');
if (root) {
  window.a = ReactDOM.render(<App />, root);
}
registerServiceWorker();
