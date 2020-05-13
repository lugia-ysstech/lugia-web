/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { addMouseEvent } from '@lugia/theme-hoc';
import ThemeProvider from '../theme-provider';
import Icon from '../icon';
import Widget from '../consts/index';
import { getScrollTop } from '../affix/affix';
import { BackTop, BackTopContent, IconBox, textStyle, getThemeStyle } from '../css/back-top';
import type { BackTopProps, BackTopState } from '../css/back-top';
import { deepMerge } from '@lugia/object-utils';
export default ThemeProvider(
  class extends React.Component<BackTopProps, BackTopState> {
    static displayName = 'BackTop';
    constructor(props) {
      super(props);
      this.state = {
        fixed: false,
        posBottom: 50,
        posRight: 30,
      };
    }

    componentDidMount() {
      const { target } = this.props;
      if (target && typeof target === 'function') {
        setTimeout(() => {
          target().addEventListener('scroll', this.addTargetListener);
        }, 100);
        return;
      }
      this.addWindowListener();
      window.addEventListener('scroll', this.addWindowListener);
    }

    addWindowListener = () => {
      const scrollTop = getScrollTop();
      const { visibilityHeight = 400 } = this.props;
      this.setState({ fixed: this.needFixed(scrollTop, visibilityHeight) });
    };

    addTargetListener = () => {
      const { visibilityHeight = 400, target } = this.props;
      if (target) {
        const targetPos = target().getBoundingClientRect();
        const targetBottom = targetPos.bottom;
        const targetRight = targetPos.right;
        const posRight = targetRight - 60;
        const posBottom = targetBottom - 50;
        const targetScroll = target().scrollTop;
        this.setState({
          fixed: this.needFixed(targetScroll, visibilityHeight),
          posRight,
          posBottom,
        });
      }
    };

    needFixed = (scrollTop: number, visibilityHeight: number): boolean => {
      return scrollTop >= visibilityHeight;
    };

    handleClick = () => {
      if (this.hasTarget()) {
        const { target } = this.props;
        if (target && typeof target === 'function') {
          const timer = setInterval(() => {
            const targetScroll = target().scrollTop;
            if (targetScroll <= 0) {
              clearInterval(timer);
            }
            this.scrollerTargetTo(targetScroll - 50);
          });
        }
        return;
      }
      if (document) {
        const timer = setInterval(() => {
          const scrollTop = getScrollTop();
          if (scrollTop <= 0) {
            clearInterval(timer);
          }
          this.scrollerBodyTo(scrollTop - 200);
        }, 20);
      }
    };

    scrollerBodyTo(top: number) {
      if (document.body) {
        document.body.scrollTop = top;
      }
      if (document.documentElement) {
        document.documentElement.scrollTop = top;
      }
    }
    scrollerTargetTo(top: number) {
      const { target } = this.props;
      if (target) {
        target().scrollTop = top;
      }
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.addWindowListener);
      if (this.hasTarget()) {
        const { target } = this.props;
        if (target && typeof target === 'function') {
          const targetDom = target();
          targetDom && targetDom.removeEventListener('scroll', this.addTargetListener);
        }
      }
    }

    getTextTheme() {
      const { showType } = this.props;
      const containerTheme = this.props.getPartOfThemeProps('Container');
      const backTopContentTheme = deepMerge(
        {
          themeConfig: {
            normal: {
              boxShadow: getThemeStyle().normalBoxShadow,
            },
            hover: {
              boxShadow: getThemeStyle().hoverBoxShadow,
            },
            active: {
              boxShadow: getThemeStyle().activeBoxShadow,
            },
          },
        },
        containerTheme
      );
      if (showType === 'textType') {
        const resultTextTheme = deepMerge(
          {
            themeConfig: {
              ...textStyle,
            },
          },
          containerTheme
        );
        return resultTextTheme;
      }
      return backTopContentTheme;
    }

    render() {
      const {
        children,
        themeProps,
        getPartOfThemeHocProps,
        icon,
        showType = 'iconType',
        text,
      } = this.props;
      const { fixed, posRight, posBottom } = this.state;

      return (
        <div {...addMouseEvent(this)}>
          {fixed ? (
            <BackTop
              themeProps={themeProps}
              fixed={fixed}
              posRight={posRight}
              posBottom={posBottom}
              onClick={this.handleClick}
              hasTarget={this.hasTarget()}
            >
              {children ? (
                children
              ) : (
                <BackTopContent themeProps={this.getTextTheme()}>
                  <IconBox themeProps={themeProps}>
                    {showType === 'iconType' ? (
                      <Icon
                        iconClass={icon || 'lugia-icon-direction_up'}
                        {...getPartOfThemeHocProps('BackTopIcon')}
                        singleTheme
                      />
                    ) : (
                      <text>{text || 'up'}</text>
                    )}
                  </IconBox>
                </BackTopContent>
              )}
            </BackTop>
          ) : null}
        </div>
      );
    }
    hasTarget() {
      return 'target' in this.props;
    }
  },
  Widget.BackTop
);
