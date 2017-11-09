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
    viewSize: 300,
    totalSize: 1000,
    left: 100,
    // value: 50,
  };

  function onChange (v) {
    console.info('滚动', v);

  }

  return <div style={{ top: '50px', position: 'absolute', }}>
    {/*<Scroller {...config}/>*/}
    <Scroller {...config} onChange={onChange} />
  </div>;
};
export default InputDemo;
