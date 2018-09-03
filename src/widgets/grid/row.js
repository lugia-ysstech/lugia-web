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
import type { RowProps, RowState, screensType } from '../css/row';
import { RowWrap } from '../css/row';

let enquire;
if (typeof window !== undefined) {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;

  enquire = require('enquire.js');
}
const responsiveMap: { [key: screensType]: string } = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};
const responsiveArray: screensType[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export default ThemeProvider(
  class extends React.Component<RowProps, RowState> {
    constructor(props: RowProps) {
      super(props);
      this.state = { screens: {} };
    }

    componentDidMount() {
      responsiveArray.forEach((screen: screensType) =>
        enquire.register(responsiveMap[screen], {
          match: () => {
            this.setState(prevState => ({
              screens: {
                ...prevState.screens,
                [screen]: true,
              },
            }));
          },
          unmatch: () => {
            this.setState(prevState => ({
              screens: {
                ...prevState.screens,
                [screen]: false,
              },
            }));
          },
          destroy() {},
        })
      );
    }

    componentWillUnmount() {
      responsiveArray.forEach((screen: screensType) => enquire.unregister(responsiveMap[screen]));
    }

    render() {
      const { type = 'default', justify, align, getTheme } = this.props;
      const scrrenSize = this.getScrrenSize();
      const gutter = this.getGutter(scrrenSize);
      return (
        <RowWrap type={type} justify={justify} align={align} gutter={gutter} theme={getTheme()}>
          {this.renderChildren(scrrenSize, gutter)}
        </RowWrap>
      );
    }

    getScrrenSize = (): string => {
      const { screens } = this.state;
      const len = responsiveArray.length;
      for (let i = len - 1; i >= 0; i--) {
        const breakpoint = responsiveArray[i];
        if (screens[breakpoint]) {
          return breakpoint;
        }
      }
      return responsiveArray[len - 1];
    };

    getGutter = (size: string) => {
      const { gutter } = this.props;
      if (typeof gutter === 'object') {
        return gutter[size];
      }
      return gutter;
    };

    renderChildren = (scrrenSize?: string, gutter?: number | Object) => {
      const { children } = this.props;
      return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            scrrenSize,
            gutter,
          });
        }
      });
    };
  },
  Widget.Row
);
