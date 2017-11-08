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
    viewSize: 100,
    totalSize: 1000,
    left: 100,
    value: 0,
    onChange: (...rest) => {
    },
  };
  function onChange (v) {
    console.info(v);
  }
  return <div style={{ top: '50px', position: 'absolute',}}>
    {/*<Scroller {...config}/>*/}
    <Scroller {...config} type="y" onChange={onChange}/>
  </div>;
};
export default InputDemo;
