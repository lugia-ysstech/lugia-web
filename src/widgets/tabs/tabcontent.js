/**
 *
 * create by liangguodong on 2018/9/6
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import styled from 'styled-components';
import Widget from '../consts/index';
import type { TabType, TabPositionType } from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { getContentPosition } from '../css/tabs';
import { isVertical, matchType } from './utils';
import CSSComponent, { css, keyframes } from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';

const ContentContainer = CSSComponent({
  tag: 'div',
  className: 'ContentContainer',
  normal: {
    selectNames: [['padding']],
    getCSS: (theme: Object, themeProps: Object) => {
      console.log('ContentContainer', theme, themeProps);
      const {
        propsConfig: { tabPosition },
      } = themeProps;
      if (isVertical(tabPosition)) {
        return 'float: left;';
      }
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    // display: inline-block;
    overflow: hidden;
    // width: 100%;
  `,
}); //${getContentPosition};

type TabContentState = {};
type TabContentProps = {
  content: React$Element<any>,
  tabType: TabType,
  tabPosition: TabPositionType,
  activityValue: string,
};

class TabContent extends Component<TabContentProps, TabContentState> {
  static defaultProps = {};
  static displayName = Widget.TabContent;

  constructor(props: TabContentProps) {
    super(props);
  }

  render() {
    const { tabPosition, content, activityValue, themeProps } = this.props;

    return (
      <ContentContainer
        themeProps={themeProps}
        activityValue={activityValue}
        tabPosition={tabPosition}
      >
        {content}
      </ContentContainer>
    );
  }
}

export default TabContent;
