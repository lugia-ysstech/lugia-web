import React from 'react';
import Loading from './index';
import Widgets from '../consts/index';
import Theme from '../theme/index';
class LoadingDemo extends React.Component {
  render() {
    return (
      <div>
        <Theme config={{ [Widgets.Loading]: { width: 14, color: 'red' } }}>
          <Loading />
        </Theme>
        <br />
        <br />
        <br />
        <Loading scale />
      </div>
    );
  }
}

export default LoadingDemo;
