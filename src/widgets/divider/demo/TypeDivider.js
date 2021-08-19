import React from 'react';
import Divider from '../index';

export default class TypeDivider extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Divider content={'solid'} type="horizontal" />
        <br />
        <Divider dashed={true} content={'dashed'} />
      </div>
    );
  }
}
