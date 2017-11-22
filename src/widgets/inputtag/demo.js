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
for (let i = 0; i < 100000; i++) {
  valArr.push('k' + i);
  dispArr.push('v' + i);
}
const val = valArr.join(',');
const disp = dispArr.join(',');
const InputDemo = () => {
  const onChange = v => {
    // console.info(v);
  };
  return [
    <Theme config={{ [Widget.InputTag]: { width: 200, }, }}>
      <InputTag
        onChange={onChange}
        value={val} displayValue={disp}/>
    </Theme>,];
};
export default InputDemo;
