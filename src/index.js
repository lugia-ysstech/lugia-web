import './widgets/css/global.css';
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/string';
import React from 'react';
import { createBrowserHistory } from 'history';
import { createApp, render } from '@lugia/lugiax-router';
import registerServiceWorker from './registerServiceWorker';
import Main from './widgets/table/demo/ScrollFixedDemo';

const history = createBrowserHistory();
const App = createApp(
  {
    '/': {
      component: Main,
    },
  },
  history
);

render(() => {
  return <App />;
}, 'root');

registerServiceWorker();
