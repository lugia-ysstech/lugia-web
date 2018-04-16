//@flow
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/string';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactServer from 'react-dom/server';

// import App from './widgets/tree-select/demo';
import App from './widgets/switch/demo';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

console.info(ReactServer.renderToString(<App/>));
const root = document.getElementById('root');
if (root) {

  window.a = ReactDOM.render(
    <App/>,
    root
  );
}
registerServiceWorker();
