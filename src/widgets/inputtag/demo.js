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
    <Theme config={{ [Widget.InputTag]: { width: 50, }, }}>
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={{ a: { text: 'asdfasfasdfadsfqreqwrqwadsfasfqweerqwrqwerqwrqwreqwrqwrqwrqwa', }, }}/>
    </Theme>,];
};
export default InputDemo;
