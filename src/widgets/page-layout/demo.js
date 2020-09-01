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
        id: 'com1C1',
        type: 'col',
        fatherId: 'com1',
        path: 'com1',
        size: {
          width: '30%',
          height: '100%',
        },
        children: [
          {
            id: 'com1C1C1',
            type: 'row',
            fatherId: 'com1C1',
            path: 'com1/com1C1',
            size: {
              width: '100%',
              height: '25%',
            },
          },
          {
            id: 'com1C1C2',
            type: 'row',
            fatherId: 'com1C1',
            path: 'com1/com1C1',
            size: {
              width: '100%',
              height: '40%',
            },
          },
          {
            id: 'com1C1C3',
            type: 'row',
            fatherId: 'com1C1',
            path: 'com1/com1C1',
            size: {
              width: '100%',
              height: '35%',
            },
          },
        ],
      },
      {
        id: 'com1C2',
        type: 'col',
        fatherId: 'com1',
        path: 'com1',
        size: {
          width: '70%',
          height: '100%',
        },
        children: [
          {
            id: 'com1C2C1',
            type: 'row',
            fatherId: 'com1C2',
            path: 'com1/com1C2',
            size: {
              width: '100%',
              height: '30%',
            },
          },

          {
            id: 'com1C2C2',
            type: 'row',
            fatherId: 'com1C2',
            path: 'com1/com1C2',
            size: {
              width: '100%',
              height: '70%',
            },
            children: [
              {
                id: 'com1C2C2C1',
                type: 'col',
                fatherId: 'com1C2C2',
                path: 'com1/com1C2/com1C2C2',
                size: {
                  width: '40%',
                  height: '100%',
                },
              },
              {
                id: 'com1C2C2C2',
                type: 'col',
                fatherId: 'com1C2C2',
                path: 'com1/com1C2/com1C2C2',
                size: {
                  width: '60%',
                  height: '100%',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'com2',
    type: 'row',
    size: { width: '100%', height: '40%' },
    children: [
      {
        id: 'com2C1',
        type: 'col',
        fatherId: 'com2',
        path: 'com2',
        size: {
          width: '20%',
          height: '100%',
        },
      },
      {
        id: 'com2C2',
        type: 'col',
        fatherId: 'com2',
        path: 'com2',
        size: {
          width: '80%',
          height: '100%',
        },
      },
    ],
  },
  {
    id: 'com3',
    type: 'row',
    size: { width: '100%', height: '20%' },
  },
];

const data2 = [
  {
    id: 'zoom1',
    type: 'row',
    size: {
      width: '100%',
      height: '100%',
    },
    children: [
      {
        id: 'zoom1C1',
        type: 'col',
        fatherId: 'zoom1',
        path: 'zoom1',
        size: { width: ' 20%', height: '100%' },
        children: [
          {
            id: 'zoom1C1C1',
            type: 'row',
            fatherId: 'zoom1C1',
            path: 'zoom1/zoom1C1',
            size: { width: '100%', height: '30%' },
          },
          {
            id: 'zoom1C1C2',
            type: 'row',
            fatherId: 'zoom1C1',
            path: 'zoom1/zoom1C1',
            size: { width: '100%', height: '40%' },
          },
          {
            id: 'zoom1C1C3',
            type: 'row',
            fatherId: 'zoom1C1',
            path: 'zoom1/zoom1C1',
            size: { width: '100%', height: '30%' },
          },
        ],
      },
      {
        id: 'zoom1C2',
        type: 'col',
        fatherId: 'zoom1',
        path: 'zoom1',
        size: { width: '40%', height: '100%' },
        children: [
          {
            id: 'zoom1C2C1',
            type: 'row',
            fatherId: 'zoom1C2',
            path: 'zoom1/zoom1C2',
            size: { width: '100%', height: '50%' },
          },
          {
            id: 'zoom1C2C2',
            type: 'row',
            fatherId: 'zoom1C2',
            path: 'zoom1/zoom1C2',
            size: { width: '100%', height: '30%' },
          },
          {
            id: 'zoom1C2C3',
            type: 'row',
            fatherId: 'zoom1C2',
            path: 'zoom1/zoom1C2',
            size: { width: '100%', height: '20%' },
          },
        ],
      },
      {
        id: 'zoom1C3',
        type: 'col',
        fatherId: 'zoom1',
        path: 'zoom1',
        size: { width: '40%', height: '100%' },
        children: [
          {
            id: 'zoom1C3C1',
            type: 'row',
            fatherId: 'zoom1C3',
            path: 'zoom1/zoom1C3',
            size: { width: '100%', height: '40%' },
            children: [
              {
                id: 'zoom1C3C1C1',
                type: 'col',
                fatherId: 'zoom1C3C1',
                path: 'zoom1/zoom1C3/zoom1C3C1',
                size: { width: '30%', height: '100%' },
              },
              {
                id: 'zoom1C3C1C2',
                type: 'col',
                fatherId: 'zoom1C3C1',
                path: 'zoom1/zoom1C3/zoom1C3C1',
                size: { width: '70%', height: '100%' },
              },
            ],
          },
          {
            id: 'zoom1C3C2',
            type: 'row',
            fatherId: 'zoom1C3',
            path: 'zoom1/zoom1C3',
            size: { width: '100%', height: '30%' },
          },
          {
            id: 'zoom1C3C3',
            type: 'row',
            fatherId: 'zoom1C3',
            path: 'zoom1/zoom1C3',
            size: { width: '100%', height: '30%' },
            children: [
              {
                id: 'zoom1C3C3C1',
                type: 'col',
                fatherId: 'zoom1C3C3',
                path: 'zoom1/zoom1C3/zoom1C3C3',
                size: { width: '60%', height: '100%' },
              },
              {
                id: 'zoom1C3C3C2',
                type: 'col',
                fatherId: 'zoom1C3C3',
                path: 'zoom1/zoom1C3/zoom1C3C3',
                size: { width: '40%', height: '100%' },
              },
            ],
          },
        ],
      },
    ],
  },
];

class Demo extends Component {
  onChange = data => {
    console.log('onChange', data);
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ height: 100 }}></div>
        <Index data={data} onChange={this.onChange} />
        <Index data={data2} onChange={this.onChange} />
      </React.Fragment>
    );
  }
}

export default Demo;
