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
import type { LayoutProps, LayoutState } from '../css/layout';
import { Layout } from '../css/layout';

export default ThemeProvider(
  class extends React.Component<LayoutProps, LayoutState> {
    render() {
      const { direction, children, getTheme, isWrap } = this.props;
      return (
        <Layout direction={direction} isWrap={isWrap} theme={getTheme()}>
          {children}
        </Layout>
      );
    }
  },
  Widget.Layout
);
