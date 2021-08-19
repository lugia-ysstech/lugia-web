import React from 'react';
import Radio from '../index';

export default class RadioDemo extends React.Component {
  render() {
    return (
      <div>
        <Radio value="1" disabled>
          Radio
        </Radio>
        <br />
        <br />
        <Radio value="1" checked disabled>
          Radio
        </Radio>
      </div>
    );
  }
}
