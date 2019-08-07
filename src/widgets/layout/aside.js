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
import { Aside, Trigger, IconWrap, ChildrenWrap } from '../css/aside';
import type { screensType } from '../css/row';
import { EnlargeContext } from './layout';

const responsiveMap: { [key: screensType]: string } = {
  xs: '(max-width: 575px)',
  sm: '(max-width: 576px)',
  md: '(max-width: 768px)',
  lg: '(max-width: 992px)',
  xl: '(max-width: 1200px)',
  xxl: '(max-width: 1600px)',
};

let enquire;
if (typeof window !== 'undefined') {
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

Trigger.displayName = 'trigger';
export default ThemeProvider(
  class extends React.Component<AsideProps, AsideState> {
    static getDerivedStateFromProps(props, state) {
      const inProps = 'collapsed' in props;
      const { collapsed, defaultCollapsed } = props;
      const result = inProps ? collapsed : state ? state.collapsed : defaultCollapsed || false;
      return {
        collapsed: !!result,
        screens: state ? state.screens : {},
      };
    }
    componentDidMount() {
      const { breakpoint, onBreakpoint } = this.props;
      const responsiveSize = breakpoint && responsiveMap[breakpoint];
      if (breakpoint && responsiveSize) {
        enquire.register(responsiveSize, {
          match: () => {
            onBreakpoint && onBreakpoint(true);
            this.setState({
              collapsed: true,
              screens: breakpoint,
            });
          },
          unmatch: () => {
            onBreakpoint && onBreakpoint(false);
            this.setState({
              collapsed: false,
              screens: breakpoint,
            });
          },
          destroy() {},
        });
      }
    }

    componentWillUnmount() {
      const { breakpoint } = this.props;
      if (breakpoint && responsiveMap[breakpoint]) {
        enquire.unregister(responsiveMap[breakpoint]);
      }
    }

    render() {
      const { children, getTheme, collapsedWidth, collapsible, trigger, value } = this.props;
      const { collapsed } = this.state;
      return (
        <EnlargeContext.Consumer>
          {(context: Object) => {
            const { enlargeValue, enlarge } = context;
            if (enlargeValue && value !== enlargeValue && enlarge) {
              return null;
            }

            return (
              <Aside theme={getTheme()} collapsed={collapsed} collapsedWidth={collapsedWidth}>
                <ChildrenWrap theme={getTheme()}>
                  <div>{children}</div>
                  {collapsible && trigger !== null ? (
                    <Trigger
                      themePass
                      theme={getTheme()}
                      collapsed={collapsed}
                      onClick={this.handleTriggerClick}
                      collapsedWidth={collapsedWidth}
                    >
                      {this.getTrigger()}
                    </Trigger>
                  ) : null}
                </ChildrenWrap>
              </Aside>
            );
          }}
        </EnlargeContext.Consumer>
      );
    }

    getTrigger = () => {
      const { trigger, reverseArrow = false } = this.props;
      const { collapsed } = this.state;

      if (trigger) {
        return trigger;
      }

      return (
        <IconWrap
          iconClass={
            collapsed
              ? `lugia-icon-direction_${reverseArrow ? 'Left' : 'right'}`
              : `lugia-icon-direction_${reverseArrow ? 'right' : 'Left'}`
          }
        />
      );
    };
    handleTriggerClick = () => {
      const { collapsible, onCollapse } = this.props;
      const { collapsed } = this.state;

      if (collapsible) {
        onCollapse && onCollapse(!collapsed);
        if (!this.isInProps()) {
          this.setState({
            collapsed: !collapsed,
          });
        }
      }
    };
    isInProps() {
      return 'collapsed' in this.props;
    }
  },
  Widget.Aside
);
