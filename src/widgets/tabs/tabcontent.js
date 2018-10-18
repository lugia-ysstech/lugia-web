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

const ContentContainer = styled.div`
  position: absolute;
  display: inline-block;
  overflow: hidden;
  width: 100%;
  ${getContentPosition};
`;

type TabContentState = {};
type TabContentProps = {
  content: React$Element<any>,
  tabType: TabType,
  tabPosition: TabPositionType,
  activityKey: string,
};

class TabContent extends Component<TabContentProps, TabContentState> {
  static defaultProps = {};
  static displayName = Widget.TabContent;

  constructor(props: TabContentProps) {
    super(props);
  }

  render() {
    const { tabPosition, content, activityKey } = this.props;

    return (
      <ContentContainer activityKey={activityKey} tabPosition={tabPosition}>
        {content}
      </ContentContainer>
    );
  }
}

const TargetTabContent = ThemeProvider(KeyBoardEventAdaptor(TabContent), Widget.TabContent);
export default TargetTabContent;
