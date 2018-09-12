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

export const EnlargeContext = React.createContext({});

export default ThemeProvider(
  class extends React.Component<LayoutProps, LayoutState> {
    constructor(props) {
      super(props);
      this.state = {
        enlarge: false,
        enlargeValue: '',
      };
    }
    render() {
      const { direction, children, getTheme, needEnlarge = false } = this.props;
      const { enlarge, enlargeValue } = this.state;
      return (
        <Layout direction={direction} theme={getTheme()}>
          {needEnlarge ? (
            <EnlargeContext.Provider
              value={{ enlargeValue, onClick: this.handleEnlargeClick, enlarge }}
            >
              {children}
            </EnlargeContext.Provider>
          ) : (
            children
          )}
        </Layout>
      );
    }
    handleEnlargeClick = (val?: string) => {
      const { enlarge } = this.state;
      this.setState({
        enlarge: !enlarge,
        enlargeValue: val,
      });
    };
  },
  Widget.Layout
);
