/**
 * @flow
 *
 * created by szfeng
 */

import React, { Component } from 'react';
import Index from './index';

const data = [
  {
    id: 'com1',
    type: 'row',
    size: { width: '100%', height: '40%' },
    children: [
      {
        id: 'com1Child1',
        type: 'col',
        size: {
          width: '30%',
          height: '100%',
        },
      },
      {
        id: 'com1Child2',
        type: 'col',
        size: {
          width: '70%',
          height: '100%',
        },
      },
    ],
  },
  {
    id: 'com2',
    type: 'row',
    size: { width: '100%', height: '60%' },
    children: [
      {
        id: 'com2Child1',
        type: 'col',
        size: {
          width: '20%',
          height: '100%',
        },
      },
      {
        id: 'com2Child2',
        type: 'col',
        size: {
          width: '80%',
          height: '100%',
        },
      },
    ],
  },
];

class Demo extends Component {
  render() {
    return <Index data={data} />;
  }
}

export default Demo;
