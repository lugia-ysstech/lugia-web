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
    getIconTheme = (status: 'success' | 'error') => {
      const { getPartOfThemeHocProps, type = 'line' } = this.props;
      const name = {
        success: {
          line: 'ProgressLineSuccessIcon',
          circle: 'ProgressCircleSuccessIcon',
          dashboard: 'ProgressDashboardSuccessIcon',
        },
        error: {
          line: 'ProgressLineErrorIcon',
          circle: 'ProgressCircleErrorIcon',
          dashboard: 'ProgressDashboardErrorIcon',
        },
      };

      return getPartOfThemeHocProps(name[status][type]);
    };
    render() {
      const { type = 'line' } = this.props;
      if (type === 'circle' || type === 'dashboard') {
        return <Circle {...this.props} getIconTheme={this.getIconTheme} />;
      }
      return <Line {...this.props} getIconTheme={this.getIconTheme} />;
    }
  },
  Widget.Progress
);
