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
import Switch from '../switch';

const Button = CSSProvider({
  tag: 'button',
  css: css`
    background: green;
  `,
});

const Input = CSSProvider({
  tag: 'input',
  normal: { selectNames: ['width', 'height'], default: { hover: {} } },
  css: '',
});

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
      console.info(theme);

      const { themeState } = this.props;

      return (
        <span>
          <Switch viewClass={''} />
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
          switch: {},
        },
      },
      lgx: {
        normal: {
          height: 50,
          width: 50,
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
