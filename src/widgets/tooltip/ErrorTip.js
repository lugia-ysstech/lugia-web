/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Tooltip from './';
import Widget from '../consts/index';
import Theme from '../theme';
import colorsFunc from '../css/stateColor';

const { lightGreyColor, dangerColor } = colorsFunc();
export default class extends React.Component<any, any> {
  target: Object;

  render() {
    const config = {
      [Widget.Tooltip]: {
        TooltipContainer: {
          normal: {
            background: {
              color: lightGreyColor,
            },
          },
        },
        TooltipMessage: {
          normal: {
            color: dangerColor,
            fontSize: 16,
          },
        },
      },
    };
    const { children, title, action = ['focus'], placement = 'bottom', size } = this.props;
    const getTarget: Function = cmp => (this.target = cmp);
    return (
      <Theme config={config}>
        <Tooltip
          placement={placement}
          title={title}
          action={action}
          ref={getTarget}
          size={size}
          theme={this.props.themeProps}
        >
          {children}
        </Tooltip>
      </Theme>
    );
  }
}
