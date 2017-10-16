/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Theme from '../theme';

import InputTag from './';
import * as Widget from '../consts/Widget';

const InputDemo = () => {

  return [<Theme config={{ [Widget.InputTag]: { width: 200, }, }} key="1">
    <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
              value={[{ key: '1', text: 'a', }, { key: '2', text: 'b', }, { key: '3', text: 'c', },]}/>
  </Theme>,
    <Theme config={{ [Widget.InputTag]: { width: 200, }, }} key="2">
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={[{ key: '1', text: 'abcdeddfasdddfadasf', }, { key: '2', text: 'b', }, {
                  key: '3',
                  text: 'c',
                },]}/>
    </Theme>,
    <Theme config={{ [Widget.InputTag]: { width: 200, }, }} key="3">
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={[{ key: '1', text: '12345678901234', }, { key: '2', text: 'b', }, { key: '3', text: 'c', },]}/>
    </Theme>,
    <Theme config={{ [Widget.InputTag]: { width: 200, }, }} key="4">
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={[{ key: '1', text: '123456789012345676890780', },]}/>
    </Theme>,
    <Theme config={{ [Widget.InputTag]: { width: 200, }, }} key="5">
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={[{ key: '1', text: '123456789012345676890780', }, { key: '2', text: 'b', }, {
                  key: '3',
                  text: 'c',
                },]}/>

    </Theme>,
    <div key="6">
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={[
                  { key: '1', text: '123456789012345676890780', },
                  { key: '4', text: '123456789012345676890781', },
                  { key: '5', text: '123456789012345676890782', },
                  { key: '6', text: '123456789012345676890783', },
                  { key: '7', text: '123456789012345676890784', },
                  { key: '8', text: '123456789012345676890785', },
                  { key: '9', text: '123456789012345676890786', },
                  { key: '10', text: '123456789012345676890787', },

                  { key: '2', text: 'b', }, {
                    key: '3',
                    text: 'c',
                  },]}/>

    </div>,];
};
export default InputDemo;
