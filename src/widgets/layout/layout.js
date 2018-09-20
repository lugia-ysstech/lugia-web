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
    child2father: Object;
    father2childs: Object;

    constructor(props) {
      super(props);
      this.state = {
        enlarge: false,
        enlargeValue: [],
      };
      this.child2father = {};
      this.father2childs = {};
    }

    render() {
      const { direction, children, getTheme, needEnlarge = false } = this.props;
      const { enlarge, enlargeValue } = this.state;
      return (
        <Layout direction={direction} theme={getTheme()}>
          {needEnlarge ? (
            <EnlargeContext.Provider
              value={{
                enlargeValue,
                onClick: this.handleEnlargeClick,
                enlarge,
                order: { current: 0 },
                talkRoot: this.talkRoot,
              }}
            >
              {children}
            </EnlargeContext.Provider>
          ) : (
            children
          )}
        </Layout>
      );
    }

    handleEnlargeClick = (val: string) => {
      const { enlarge } = this.state;
      const enlargeValue = [];
      let value = val;
      do {
        enlargeValue.push(value);
        if (value !== undefined && value !== null && value === this.child2father[value]) {
          break;
        }
        value = this.child2father[value];
      } while (value);
      const childs = this.father2childs[val];
      if (childs) {
        Array.prototype.push.apply(enlargeValue, childs);
      }
      this.setState({
        enlarge: !enlarge,
        enlargeValue,
      });
    };
    talkRoot = (father: number, level) => {
      this.child2father[level] = father;
      let childs = this.father2childs[father];
      if (!childs) {
        childs = this.father2childs[father] = [];
      }
      childs.push(level);
    };
  },
  Widget.Layout
);
