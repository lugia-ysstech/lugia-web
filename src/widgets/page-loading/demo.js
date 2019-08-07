import React, { Component } from 'react';
import PageLoading from './index';
class Demo extends Component {
  render() {
    return (
      <div style={{ height: '300px', width: '400px' }}>
        <PageLoading loading={true} />
      </div>
    );
  }
}

export default Demo;
