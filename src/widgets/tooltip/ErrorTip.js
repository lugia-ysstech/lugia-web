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

export default class extends React.Component<any, any> {
  target: Object;

  render () {
    const config = {
      [ Widget.Tooltip ]: {
        color: '#fef0ef',
        fontColor: '#000',
      },
    };
    const { children, title, action = ['focus',], placement = 'bottom', } = this.props;
    const getTarget: Function = cmp => this.target = cmp;
    return <Theme config={config}>
      <Tooltip placement={placement} title={title} action={action} ref={getTarget}>
        {children}
      </Tooltip>
    </Theme>;
  }
}
