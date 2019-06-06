import React from 'react';
import { createBrowserHistory } from 'history';
import { createApp, render } from '@lugia/lugiax-router';
import registerServiceWorker from './registerServiceWorker';
import Main from './App';

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
