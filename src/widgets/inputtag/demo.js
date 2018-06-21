/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';

import InputTag from './';
import Theme from '../theme';
import Widget from '../consts/index';

const valArr = [],
  dispArr = [];
for (let i = 0; i < 10; i++) {
  valArr.push('k' + i);
  dispArr.push('v' + i);
}
const val = valArr.join(',');
const disp = dispArr.join(',');

class InputDemo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: val, displayValue: disp };
  }

  render() {
    // const { value, displayValue, } = this.state;
    return [
      <Theme config={{ [Widget.InputTag]: { width: 200 } }}>
        <input />
        <InputTag
          validateStatus="error"
          defaultValue={val.split(',')}
          defaultDisplayValue={disp.split(',')}
        />
        <input />
      </Theme>,
    ];
  }
}

export default InputDemo;
