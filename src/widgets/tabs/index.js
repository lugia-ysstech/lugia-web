/**
 *
 * create by liangguodong on 2018/9/6
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import styled from 'styled-components';
import Tabpane from './tabpane';
import Widget from '../consts/index';
import Theme from '../theme';
import type { TabType, TabsSizeType, TabPositionType } from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import {
  getLinePosition,
  getColor,
  getContainerBorder,
  getContentPosition,
  hContainerWidth,
  hContainerHeight,
  getBackgroundShadow,
  matchTabPosition,
  matchTabType,
  backgroundColor,
  lineWidth,
} from '../css/tabs';
import { getAttributeFromObject } from '../common/ObjectUtils.js';

import Icon from '../icon';
const em = px2emcss(1.2);

const BaseLine = styled.div`
  background-color: blue;
  position: absolute;
  box-sizing: border-box;
  z-index: 3;
  border-radius: ${em(2)};
`;

const HLine = BaseLine.extend`
  height: ${em(2)};
  width: ${lineWidth};
  transform: translateX(${props => props.x}%);
  ${getLinePosition};
`;
const ShadowLine = styled.div`
  position: absolute;
  width: 100%;
  height: ${em(1)};
  ${getBackgroundShadow};
`;
const VLine = BaseLine.extend`
  height: ${em(32)};
  width: ${em(2)};
  transform: translateY(${props => props.y}%);
  ${getLinePosition};
`;

const ArrowContainer = styled.span`
  position: absolute;
  font-size: 1rem;
`;

const HBasePage = ArrowContainer.extend`
  transform: translateY(-50%);
  line-height: 100%;
  top: 50%;
  display: ${props => (!props.arrowShow ? 'none' : 'block')};
`;

const HPrePage = HBasePage.extend`
  left: ${em(10)};
`;
const HNextPage = HBasePage.extend`
  right: ${em(10)};
`;
const VBasePage = ArrowContainer.extend`
  z-index: 2;
  width: 100%;
  text-align: center;
`;
const VPrePage = VBasePage.extend`
  top: ${em(6)};
`;
const VNextPage = VBasePage.extend`
  transform: translateX(-100%);
  bottom: ${em(6)};
`;
const OutContainer = styled.div`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  width: ${hContainerWidth};
`;
const HTabsContainer = styled.div`
  height: ${hContainerHeight};
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  white-space: nowrap;
`;
const VTabsContainer = styled.div`
  height: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  display: inline-block;
`;

const HTabsOutContainer = styled.div`
  height: ${hContainerHeight};
  position: relative;
  ${getContainerBorder};
  transform: translateX(${props => props.x}%);
  background: ${backgroundColor};
  text-align: bottom;
  padding: 0 ${em(24)};
  overflow: hidden;
  box-sizing: border-box;
`;
OutContainer.displayName = Widget.TabsHContainer;

const VTabsOutContainer = styled.div`
  ${getColor};
  ${getContainerBorder};
  display: inline-block;
  position: relative;
  transform: translateY(${props => props.y}%);
  padding: ${em(24)} 0;
  box-sizing: border-box;
  white-space: nowrap;
`;
const HContentContainer = styled.div`
  position: absolute;
  display: inline-block;
  ${getContentPosition};
`;
const PageIcon: Object = styled(Icon)`
  display: inline-block;
  font-style: normal;
  text-align: center;
  font-size: 1rem;
`;

type TabsState = {|
  activityKey: number,
  data: Array<Object>,
  children: React$Element<any>,
|};

type TabsProps = {
  activityKey: string,
  defaultActivityKey: string,
  defaultTabs: string,
  onTabClick: Event,
  animated: boolean,
  hideAdd: boolean,
  size: TabsSizeType,
  tabBarGutter: number,
  tabPosition: TabPositionType,
  tabType: TabType,
  onChange: Function,
  onEdit: void,
  onNextClick: Function,
  onPrevClick: Function,
  children: React$Element<any>,
  data: Array<Object>,
  defaultData: Array<Object>,
  tab: string,
  forceRender: boolean,
  getTheme: Function,
  onDelClick: Function,
};

class TabsBox extends Component<TabsProps, TabsState> {
  static defaultProps = {
    tabType: 'line',
    defaultActivityKey: 0,
    tabPosition: 'top',
  };
  containerRef: any;
  static displayName = Widget.Tabs;
  offsetWidth: number;
  childrenWidth: Array<number>;

  constructor(props: TabsProps) {
    super(props);
    this.containerRef = React.createRef();
    this.childrenWidth = [];
  }

  static getDerivedStateFromProps(props: TabsProps, state: TabsState) {
    const { activityKey, defaultActivityKey, defaultData, data, children } = props;
    const hasActivityKeyInprops = 'activityKey' in props;
    const hasDataInprops = 'data' in props;
    const hasChildrenInprops = 'children' in props;

    if (!state) {
      return {
        activityKey: hasActivityKeyInprops
          ? activityKey
          : defaultActivityKey
            ? defaultActivityKey
            : 0,
        data: hasDataInprops ? data : defaultData,
        children: hasChildrenInprops ? children : '',
      };
    }
    if (hasActivityKeyInprops) {
      return { activityKey };
    }
  }

  render() {
    const { onNextClick, onPrevClick, tabType, tabPosition, getTheme } = this.props;
    const transValue = this.state.activityKey;

    const config = { width: this.getContainerWidth() };
    const theme = {
      [Widget.TabsHContainer]: config,
    };
    if (matchTabType(tabType, 'line')) {
      if (matchTabPosition(tabPosition, 'left') || matchTabPosition(tabPosition, 'right')) {
        return (
          <OutContainer>
            <VTabsOutContainer tabPosition={tabPosition}>
              <VLine y={transValue * 100} tabPosition={tabPosition} />
              <VPrePage tabPosition={tabPosition} onClick={onPrevClick}>
                <PageIcon iconClass="lugia-icon-direction_up" />
              </VPrePage>
              <VTabsContainer>{this.getChildren()}</VTabsContainer>
              <VNextPage tabPosition={tabPosition} onClick={onNextClick}>
                <PageIcon iconClass="lugia-icon-direction_down" />
              </VNextPage>
            </VTabsOutContainer>
            {this.getChildrenContent()}
          </OutContainer>
        );
      }
      return (
        <Theme config={theme}>
          <OutContainer theme={getTheme()} innerRef={cmp => (this.containerRef = cmp)}>
            <HTabsOutContainer tabPosition={tabPosition} tabType={tabType}>
              <HLine
                lineWidth={this.childrenWidth[transValue]}
                x={transValue * 100}
                tabPosition={tabPosition}
              />
              <HPrePage onClick={onPrevClick}>
                <PageIcon iconClass="lugia-icon-direction_Left" />
              </HPrePage>
              <HTabsContainer>{this.getChildren()}</HTabsContainer>
              <HNextPage onClick={onNextClick}>
                <PageIcon iconClass="lugia-icon-direction_right" />
              </HNextPage>
            </HTabsOutContainer>
            {this.getChildrenContent()}
          </OutContainer>
        </Theme>
      );
    }
    if (matchTabType(tabType, 'card')) {
      return (
        <OutContainer theme={getTheme()} innerRef={cmp => (this.containerRef = cmp)}>
          <HTabsOutContainer tabType={tabType}>
            <HPrePage onClick={onPrevClick}>
              <PageIcon iconClass="lugia-icon-direction_Left" />
            </HPrePage>
            <HTabsContainer> {this.getChildren()}</HTabsContainer>
            <HNextPage onClick={onNextClick}>
              <PageIcon iconClass="lugia-icon-direction_right" />
            </HNextPage>
          </HTabsOutContainer>
          <ShadowLine tabType={tabType} />
        </OutContainer>
      );
    }
  }

  componentDidMount() {
    this.getContainerWidth();
    this.handleData();
  }

  handleData() {
    const { data, children } = this.state;
    const currentData = [];
    let currentWidth = this.offsetWidth - 2 * 24;
    for (let i = 0; i < this.childrenWidth.length; i++) {
      if (currentWidth >= this.childrenWidth[i]) {
        currentWidth -= this.childrenWidth[i];
        if (data !== undefined) {
          currentData.push(data[i]);
        } else {
          currentData.push(children[i]);
        }
      }
    }
    this.setState({ data: currentData });
  }

  getContainerWidth() {
    if (this.containerRef) {
      const { getTheme } = this.props;
      const { width } = getTheme();
      this.offsetWidth = this.containerRef.offsetWidth;
      return width ? width : this.offsetWidth;
    }
  }

  getConfig(child: React$Element<any>) {
    const { tabPosition, tabType } = this.props;
    return {
      tabPosition,
      tabType,
      tab:
        getAttributeFromObject(child, 'tab', '') !== ''
          ? getAttributeFromObject(child, 'tab', '')
          : getAttributeFromObject(child.props, 'tab', ''),
      icon:
        getAttributeFromObject(child, 'icon', '') !== ''
          ? getAttributeFromObject(child, 'icon', '')
          : getAttributeFromObject(child.props, 'icon', ''),
      activityKey:
        getAttributeFromObject(child, 'activityKey', 0) !== 0
          ? getAttributeFromObject(child, 'activityKey', 0)
          : getAttributeFromObject(child.props, 'activityKey', 0),
      onClick: this.onTabClick,
      isSelect:
        (getAttributeFromObject(child, 'activityKey', 0) !== 0
          ? getAttributeFromObject(child, 'activityKey', 0)
          : getAttributeFromObject(child.props, 'activityKey', 0)) === this.state.activityKey,
      handleWidth: this.handleWidth,
      onDelClick: this.onDelClick,
    };
  }
  getContentConfig(child: React$Element<any>) {
    return {
      content: getAttributeFromObject(child.props, 'content', ''),
    };
  }

  getChildren() {
    const { data } = this.state;
    const { children } = this.props;
    const childrenWithProps =
      data && data.length
        ? data.map(child => {
            return <Tabpane {...this.props} {...this.getConfig(child)} />;
          })
        : children
          ? React.Children.map(children, child => {
              return React.cloneElement(child, this.getConfig(child));
            })
          : null;
    return childrenWithProps;
  }

  getChildrenContent() {
    const { data, tabPosition, children, forceRender } = this.props;
    let content;
    if (data && data.length) {
      content = data.map(child => {
        if (child.activityKey === this.state.activityKey) {
          if (!forceRender) {
            return <HContentContainer tabPosition={tabPosition}>{child.content}</HContentContainer>;
          }
        }
      });
      return content;
    }
    content = React.Children.map(children, child => {
      if (child.props.activityKey === this.state.activityKey) {
        return React.cloneElement(child, this.getContentConfig(child));
      }
    });
    return (
      <HContentContainer tabPosition={tabPosition}>{content[0].props.content}</HContentContainer>
    );
  }
  onTabClick = (activityKey: number) => {
    if (activityKey !== this.state.activityKey) {
      this.setState({ activityKey });
    }
  };
  onDelClick = (activityKey: number) => {
    const { data } = this.state;
    const { onDelClick } = this.props;
    data.splice(activityKey, 1);
    this.setState({ data });
    onDelClick && onDelClick();
  };
  handleWidth = (width: number) => {
    this.childrenWidth.push(width);
  };
}

const TargetTabs = ThemeProvider(KeyBoardEventAdaptor(TabsBox), Widget.Tabs);
export default TargetTabs;
