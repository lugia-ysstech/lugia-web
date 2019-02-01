/**
 *
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Empty from './index';
import Theme from '../theme';
import Widget from '../consts/index';

export default class extends React.Component<any, any> {
  render() {
    const config = { [Widget.Empty]: { width: 500 } };
    return (
      <Theme config={config}>
        <Empty />
      </Theme>
    );
  }
}
