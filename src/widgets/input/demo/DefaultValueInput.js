import React from 'react';
import Input from '../index';

export default class DefaultValueInput extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Input defaultValue="hello world" />
      </div>
    );
  }
}
