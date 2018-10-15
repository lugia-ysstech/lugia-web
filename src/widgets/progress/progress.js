/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import Line from './line';
import Circle from './circle';

export default ThemeProvider(
  class extends React.Component<any, any> {
    render() {
      const { type = 'line' } = this.props;
      if (type === 'circle' || 'dashboard') {
        return <Circle {...this.props} />;
      }
      return <Line {...this.props} />;
    }
  },
  Widget.Progress
);
