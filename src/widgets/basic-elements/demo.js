import React, { Component } from 'react';
import BasicElements from './';
import Widgets from '../consts/index';
import Theme from '../theme/index';
import { getBorderRadius, getBorder, getBoxShadow } from '@lugia/theme-utils';
class Demo extends Component {
  render() {
    return (
      <div>
        <Theme
          config={{
            [Widgets.BasicElements]: {
              Container: {
                normal: {
                  width: 200,
                  height: 300,
                  background: {
                    color: 'green',
                  },
                  borderRadius: getBorderRadius(20),
                  border: getBorder({ color: 'blue', width: 1, style: 'dashed' }),
                  boxShadow: getBoxShadow('2 2 20 red'),
                  margin: { top: 20, right: 20, bottom: 20, left: 20 },
                  opacity: 0.6,
                },
              },
            },
          }}
        >
          <BasicElements />
          <BasicElements shape={'circular'} />
          <BasicElements shape={'triangle'} />
        </Theme>
      </div>
    );
  }
}

export default Demo;
