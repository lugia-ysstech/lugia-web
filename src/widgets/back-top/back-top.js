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
import Icon from '../icon';
import { getScrollTop } from '../affix/affix';
import { BackTop, BackTopContent } from '../css/back-top';
import type { BackTopProps, BackTopState } from '../css/back-top';

export default ThemeProvider(
  class extends React.Component<BackTopProps, BackTopState> {
    constructor(props) {
      super(props);
      this.state = {
        fixed: false,
      };
    }

    componentDidMount() {
      window.addEventListener('scroll', this.addWindowListener);
    }

    addWindowListener = () => {
      const scrollTop = getScrollTop() || 0;
      const { visibilityHeight = 400 } = this.props;

      this.setState({ fixed: this.needFixed(scrollTop, visibilityHeight) });
    };
    needFixed = (scrollTop: number, visibilityHeight: number): boolean => {
      return scrollTop >= visibilityHeight;
    };
    handleClick = () => {
      if (document) {
        const timer = setInterval(function() {
          if (document.body) {
            document.body.scrollTop -= 50;
          }
          if (document.documentElement) {
            document.documentElement.scrollTop -= 50;
          }
          const scrollTop = getScrollTop() || 0;
          if (scrollTop <= 0) {
            clearInterval(timer);
          }
        }, 10);
      }
    };
    componentWillUnmount() {
      window.removeEventListener('scroll', this.addWindowListener);
    }
    render() {
      const { children, getTheme } = this.props;
      const { fixed } = this.state;
      return (
        <div>
          {fixed ? (
            <BackTop fixed={fixed} onClick={this.handleClick}>
              {children ? (
                children
              ) : (
                <BackTopContent theme={getTheme()}>
                  <Icon iconClass="lugia-icon-direction_up" />
                </BackTopContent>
              )}
            </BackTop>
          ) : null}
        </div>
      );
    }
  },
  Widget.BackTop
);
