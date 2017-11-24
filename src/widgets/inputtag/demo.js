/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';

import InputTag from './';
import Theme from '../theme';
import * as Widget from '../consts/Widget';

const valArr = [],
  dispArr = [];
for (let i = 0; i < 10; i++) {
  valArr.push('k' + i);
  dispArr.push('v' + i);
}
const val = valArr.join(',');
const disp = dispArr.join(',');

class InputDemo extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
    this.state = { value: val, displayValue: disp, };
  }

  render () {
    // const { value, displayValue, } = this.state;
    return [
      <Theme config={{ [Widget.InputTag]: { width: 200, }, }}>
        <InputTag
          onChange={this.onChange}
          defaultValue={val} defaultDisplayValue={disp}/>
      </Theme>,];
  }

  onChange = ({ value, displayValue, }: Object) => {
    // console.info(value, displayValue);
    // this.setState({ value, displayValue, });
  };
}

export default InputDemo;
