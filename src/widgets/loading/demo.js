import React from 'react';
import Loading from './index';
import Widgets from '../consts/index';
import Theme from '../theme/index';
class LoadingDemo extends React.Component {
  render() {
    return (
      <div>
        <Theme config={{ [Widgets.Loading]: { width: 50, color: 'red' } }}>
          <Loading />
        </Theme>
        <br />
        <br />
        <br />
        <div style={{ margin: '100px' }}>
          <Loading scale />
        </div>
      </div>
    );
  }
}

export default LoadingDemo;
