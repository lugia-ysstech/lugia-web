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

const InputDemo = () => {

  return [
    <Theme config={{ [Widget.InputTag]: { width: 200, }, }}>
      <InputTag
        value="1,2,3" displayValue="a,b,c,"/>
    </Theme>,];
};
export default InputDemo;
