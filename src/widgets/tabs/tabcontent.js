/**
 *
 * create by liangguodong on 2018/9/6
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import Widget from '../consts/index';
import type { TabType, TabPositionType } from '../css/tabs';

import { isVertical, matchType } from './utils';
import CSSComponent, { css, keyframes } from '@lugia/theme-css-hoc';

const ContentContainer = CSSComponent({
  tag: 'div',
  className: 'ContentContainer',
  normal: {
    selectNames: [['padding']],
    getCSS: (theme: Object, themeProps: Object) => {
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
    overflow: hidden;
    background: #fff;
    padding: 10px;
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
