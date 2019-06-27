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
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: '',
}); //${getContentPosition};

type TabContentState = {};
type TabContentProps = {
  content: React$Element<any>,
  tabType: TabType,
};

class TabContent extends Component<TabContentProps, TabContentState> {
  static defaultProps = {};
  static displayName = Widget.TabContent;

  constructor(props: TabContentProps) {
    super(props);
  }

  render() {
    const { content, themeProps } = this.props;

    return <ContentContainer themeProps={themeProps}>{content}</ContentContainer>;
  }
}

export default TabContent;
