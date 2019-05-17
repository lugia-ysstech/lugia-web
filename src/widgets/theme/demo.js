/**
 *
 * create by ligx
 *
 * @flow
 */

import React from 'react';
import { css } from 'styled-components';
import Theme from './';
import ThemeProvider from '../theme-provider';
import CSSProvider, { getClassName } from './CSSProvider.js';

const Button = CSSProvider({
  tag: 'button',
  normal: {
    normal: { selectNames: ['width', 'height', 'background'] },
  },
  css: css`
    background: green;
  `,
});

const Input = CSSProvider({
  tag: 'input',
  normal: { selectNames: ['background'], default: { width: 100, height: 100 } },
  css: '',
});
const Child = CSSProvider({
  tag: 'div',
  normal: {
    selectNames: ['width', 'height', 'background'], //只应用于配置属性
    default: { width: 30, height: 30 },
  },
  hover: {
    selectNames: ['background'],
  },
  css: css`
    width: 60px;
    height: 60px;
    background-color: blue;
    display: block;
  `,
});

function getSelfTheme(theme: ThemeConfig, viewClass: string): ThemeConfig {
  const { children } = theme;
  if (children) {
    const childTheme = children[viewClass];
    return childTheme;
  }
}

const ButtonInput = ThemeProvider(
  class extends React.Component<any, any> {
    constructor() {
      super();
      this.state = {
        themeState: {
          click: false,
          disabled: false,
          hover: false,
        },
      };
    }

    render() {
      const { children, getTheme } = this.props;
      const theme = getTheme();

      const { themeState } = this.props;
      const childTheme = getSelfTheme(theme, 'child');

      return (
        <span>
          <Child themeState={themeState} themeConfig={childTheme} />
          <Button themeState={themeState} themeConfig={theme} className={getClassName('hello')}>
            {children}
          </Button>
          <Input themeState={themeState} themeConfig={theme} />
        </span>
      );
    }
  },
  'ButtonInput'
);

class Demo extends React.Component<any, any> {
  render() {
    const config = {
      helloWorld: {
        normal: {
          height: 60,
          width: 60,
        },
        clicked: {
          height: 60,
          width: 60,
          color: 'blue',
        },
        hover: {
          height: 60,
          width: 60,
          color: 'red',
        },
        children: {
          child: {
            normal: {
              height: 50,
              width: 50,
              background: 'red',
            },
            hover: {
              height: 100,
              width: 100,
              background: 'orange',
            },
          },
        },
      },
    };
    return (
      <Theme config={config}>
        <ButtonInput viewClass={'helloWorld'}>你好</ButtonInput>
      </Theme>
    );
  }
}

export default () => {
  return <Demo />;
};
