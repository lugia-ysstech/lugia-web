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
import type { AsideProps, AsideState } from '../css/aside';
import { Aside } from '../css/aside';

export default ThemeProvider(
  class extends React.Component<AsideProps, AsideState> {
    render() {
      const { children, getTheme } = this.props;
      return <Aside theme={getTheme()}>{children}</Aside>;
    }
  },
  Widget.Aside
);
