import React, { Component, } from 'react';

import logo from './logo.svg';
import Input from './widgets/input';
import style from './App.css';

const debug = require('debug');
debug.enable('*');

class App extends Component {
  render () {
    return (
      <div className={style.App}>
        <div className={style.AppHeader}>
          <img src={logo} className={style.AppLogo} alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className={style.AppIntro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <Input/>
        </div>
      </div>
    );
  }
}

export default App;
