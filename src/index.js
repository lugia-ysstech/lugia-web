//@flow
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/string';

import React from 'react';
import ReactDOM from 'react-dom';
import './widgets/css/global.css';

// import App from './widgets/date-picker/demo';
//import App from './widgets/popconfirm/demo';
//import App from './widgets/switch/demo';
//import App from './widgets/loading/demo';
// import App from './widgets/tag/demo';
// import App from './widgets/tree-select/demo';
// import App from './widgets/tree-select/defaultTreeSelect';
import App from './widgets/theme/demo';
import { enabledClassName } from './widgets/theme/CSSProvider';

// import App from './widgets/tree/InlineDataSingleTree';
// import App from './widgets/tree/InlineDataMutlipleTree';
// import App from './widgets/tree/DefaultMutlipleTree';
// import App from './widgets/tree/DefaultTree';
// import App from './widgets/tree/demo';

import registerServiceWorker from './registerServiceWorker';

enabledClassName();
// console.info(ReactServer.renderToString(<App />));
const root = document.getElementById('root');
if (root) {
  window.a = ReactDOM.render(<App />, root);
}
registerServiceWorker();
