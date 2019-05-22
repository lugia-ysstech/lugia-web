/**
 *
 * create by ligx
 *
 * @flow
 */

import React from 'react';
import { css } from 'styled-components';
import Theme from './';
import Input from '../input';
import ThemeProvider from '../theme-provider';
import CSSProvider, { getClassName } from './CSSProvider.js';

const Button = CSSProvider({
  tag: 'button',
  normal: {
    selectNames: [['width'], ['height'], ['backgroundColor'], ['font']],
    default: { width: 30, height: 30 },
  },
  css: css`
    background: green;
  `,
});

const SelfInput = CSSProvider({
  tag: 'input',
  normal: { selectNames: [['backgroundColor']], default: { width: 100, height: 100 } },
  css: '',
});
const Child = CSSProvider({
  tag: 'div',
  normal: {
    selectNames: [['width'], ['height'], ['backgroundColor'], ['border']], //只应用于配置属性
    default: { width: 100, height: 100 },
  },
  hover: {
    selectNames: [['backgroundColor']],
    default: { backgroundColor: 'black' },
  },
  css: css`
    width: 60px;
    height: 60px;
    background-color: blue;
    display: block;
  `,
});

function getSelfTheme(theme: ThemeConfig, viewClass: string) {
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
          <SelfInput themeState={themeState} themeConfig={theme} />
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
          backgroundColor: 'blue',
        },
        hover: {
          height: 60,
          width: 60,
          backgroundColor: 'yellow',
        },
        children: {
          child: {
            normal: {
              height: 50,
              width: 50,
              backgroundColor: 'red',
              border: {
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'black',
              },
            },
            hover: {
              height: 100,
              width: 100,
              backgroundColor: 'orange',
            },
          },
        },
      },
    };
    return (
      <Theme config={config}>
        <ButtonInput viewClass={'helloWorld'}>button</ButtonInput>
      </Theme>
    );
  }
}
class InputDemo extends React.Component<any, any> {
  render() {
    const config = {
      input: {
        normal: {
          height: 20,
          width: 100,
        },
      },
    };
    return (
      <Theme config={config}>
        <Input viewClass={'input'}>button</Input>
      </Theme>
    );
  }
}

export default () => {
  return [<Demo />, <InputDemo />];
};
