/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Scroller from './';

const InputDemo = () => {
  const config = {
    type: 'x',
    viewSize: 800,
    totalSize: 5000,
    left: 100,
    value: 50,
    onChange: (...rest) => {
    },
  };
  return <div>
    {/*<Scroller {...config}/>*/}
    <Scroller {...config} type="y"/>
  </div>;
};
export default InputDemo;
