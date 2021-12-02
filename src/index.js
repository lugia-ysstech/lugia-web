import './widgets/css/global.css';
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/string';
import React from 'react';
import { createBrowserHistory } from 'history';
import { render } from '@lugia/lugiax-router';
import registerServiceWorker from './registerServiceWorker';
import Main from './widgets/table/demo/ScorllerFixedDemo';

const history = createBrowserHistory();

render(() => {
  return <Main />;
}, 'root');

registerServiceWorker();
