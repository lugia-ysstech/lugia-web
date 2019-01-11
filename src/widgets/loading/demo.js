import React from 'react';
import Loading from './index';
import Widgets from '../consts/index';
import Theme from '../theme/index';
class LoadingDemo extends React.Component {
  render() {
    return (
      <div>
        <Theme config={{ [Widgets.Loading]: { width: 400, color: 'red' } }}>
          <h2>Theme delay</h2>
          <Loading delay={3} />
        </Theme>
        <h2>small</h2>
        <Loading size={'small'} />
        <h2>large</h2>
        <Loading size={'large'} />
        <h2>default</h2>
        <Loading />
        <h2>icon small</h2>
        <Loading iconClass={'lugia-icon-financial_loading_o'} size={'small'} />
        <h2>icon large</h2>
        <Loading iconClass={'lugia-icon-financial_loading_o'} size={'large'} />
        <h2>icon default</h2>
        <Loading iconClass={'lugia-icon-financial_loading_o'} />
        <Loading tip={'加载中.....'} />
      </div>
    );
  }
}

export default LoadingDemo;
