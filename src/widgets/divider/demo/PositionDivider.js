import React from 'react';
import Divider from '../index';

export default class PositionDivider extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Divider content="position left" position="left" />
        <Divider content="position right" position="right" />
        <Divider content="position center" />
      </div>
    );
  }
}
