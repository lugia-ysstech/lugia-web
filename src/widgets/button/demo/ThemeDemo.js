import * as React from 'react';
import Button from '../index';
import Theme from '../../theme';
import Widget from '../../consts/index';

export default class ButtonDemo extends React.Component<any, any> {
  render() {
    const view = {
      [Widget.Button]: {
        Container: {
          normal: {
            width: 100,
            height: 50,
            padding: 9,
            margin: 10,
            background: { color: 'orange' },
          },
        },
      },
    };
    return (
      <div>
        <Theme config={view}>
          <Button>Button</Button>
        </Theme>
      </div>
    );
  }
}
