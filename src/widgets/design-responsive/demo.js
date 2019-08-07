/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import Responsive from './';
import { ResponsiveContext } from './component';

const config = {
  '1366x1080': {
    mainPadSize: {
      width: 1366,
      height: 1080,
    },
    widthRange: [1025, 1366],
  },
  '1024x768': {
    mainPadSize: {
      width: 1024,
      height: 768,
    },
    widthRange: [0, 1024],
  },
};
const mode2LayoutData = {
  '1366x1080': {
    a: { width: 100, height: 100, point: [100, 100] },
    b: { width: 101, height: 101, point: [101, 101] },
  },
  '1024x768': {
    a: { width: 50, height: 50, point: [50, 50] },
    b: { width: 51, height: 51, point: [51, 51] },
  },
};

class Test extends React.Component<any, any> {
  render() {
    console.log('render');
    return (
      <div>
        <ResponsiveContext.Consumer>
          {context => {
            const widgetId = 'a';
            const { width, height, point } = context.getLayout(widgetId);
            return <p style={{ width }}>test</p>;
          }}
        </ResponsiveContext.Consumer>
        <ResponsiveContext.Consumer>
          {context => {
            const widgetId = 'a';
            const { width, height, point } = context.getLayout(widgetId);
            return <p style={{ width: `${width}px` }}>{width}</p>;
          }}
        </ResponsiveContext.Consumer>
      </div>
    );
  }
}

export default class extends React.Component<any, any> {
  render() {
    return (
      <Responsive mode2Config={config} mode2LayoutData={mode2LayoutData}>
        <Test />
      </Responsive>
    );
  }
}
