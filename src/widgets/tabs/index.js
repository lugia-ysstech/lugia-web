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
import type { TabType, TabPositionType, EditType } from '../css/tabs';

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
  vContainerHeight,
  getContentTransform,
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
  ${getLinePosition};
  transform: translate3d(${props => em(props.x)}, 0, 0);
  transition: all 0.3s;
`;
const ShadowLine = styled.div`
  width: 100%;
  position: absolute;
  bottom: -1px;
  height: ${em(1)};
  ${getBackgroundShadow};
`;
const VLine = BaseLine.extend`
  height: ${em(32)};
  width: ${em(2)};
  transform: translateY(${props => props.y}%);
  transition: all 0.3s;
  ${getLinePosition};
`;

const ArrowContainer = styled.span`
  position: absolute;
  font-size: 1rem;
  display: ${props => (props.arrowShow === false ? 'none' : 'inline-block')};
  z-index: 5;
`;

const HBasePage = ArrowContainer.extend`
  transform: translateY(-50%);
  line-height: 100%;
  top: 50%;
`;

const HPrePage = HBasePage.extend`
  left: ${em(10)};
`;
const HNextPage = HBasePage.extend`
  right: ${em(10)};
`;
const VBasePage = ArrowContainer.extend`
  width: 100%;
  text-align: center;
  height: ${em(24)};
`;
const VPrePage = VBasePage.extend`
  top: ${em(12)};
`;
const VNextPage = VBasePage.extend`
  transform: translateX(-100%);
  bottom: ${em(-6)};
`;
const OutContainer = styled.div`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  width: ${hContainerWidth};
  height: ${vContainerHeight};
`;
const HTabsContainer = styled.div`
  width: 100%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
`;
const HscrollerContainer = styled.div`
  height: ${hContainerHeight};
  display: inline-block;
  box-sizing: border-box;
  white-space: nowrap;
  transition: all 0.5s;
  transform: translate3d(${props => em(props.x)}, 0, 0);
`;
const VTabsContainer = styled.div`
  height: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  display: inline-block;
  overflow: hidden;
`;
const YscrollerContainer = styled.div`
  display: inline-block;
  box-sizing: border-box;
  white-space: nowrap;
  transition: all 0.5s;
  transform: translate3d(0, ${props => em(props.y)}, 0);
`;
const HTabsOutContainer = styled.div`
  height: ${hContainerHeight};
  position: relative;
  ${getContainerBorder};
  background: ${backgroundColor};
  padding: 0 ${em(24)};
  overflow: hidden;
  box-sizing: border-box;
  margin: ${em(20)} 0;
`;
OutContainer.displayName = Widget.TabsContainer;

const VTabsOutContainer = styled.div`
  ${getColor};
  ${getContainerBorder};
  display: inline-block;
  position: relative;
  padding: ${em(24)} 0;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  height: 100%;
  margin: 0 ${em(20)};
`;
const ContentContainer = styled.div`
  position: absolute;
  display: inline-block;
  overflow: hidden;
  ${getContentPosition};
  margin-left: ${props => props.x}%;
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
  currentPage: number,
  arrowShow: boolean,
|};

type TabsProps = {
  activityKey: string,
  defaultActivityKey: string,
  defaultTabs: string,
  onTabClick: Function,
  animated: boolean,
  hideAdd: boolean,
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
  offsetHeight: number;
  childrenWidth: Array<number>;
  totalPage: number;

  constructor(props: TabsProps) {
    super(props);
    this.containerRef = React.createRef();
    this.childrenWidth = [];
    this.totalPage = 0;
  }

  static getDerivedStateFromProps(props: TabsProps, state: TabsState) {
    const { activityKey, defaultActivityKey, defaultData, data, children } = props;
    const hasActivityKeyInprops = 'activityKey' in props;
    const hasDataInprops = 'data' in props;

    if (!state) {
      return {
        activityKey: hasActivityKeyInprops
          ? activityKey
          : defaultActivityKey
            ? defaultActivityKey
            : 0,
        data: hasDataInprops
          ? data
          : children
            ? children
            : state.data
              ? state.data
              : defaultData
                ? defaultData
                : [],
        currentPage: 1,
        arrowShow: false,
      };
    }
    if (hasActivityKeyInprops) {
      return { activityKey };
    }
  }

  render() {
    const { tabType, tabPosition, getTheme } = this.props;
    const { activityKey, currentPage, arrowShow } = this.state;
    const config = { width: this.getContainerWidth(), height: this.getContainerHeight() };
    const theme = { [Widget.TabsContainer]: config };
    if (matchTabType(tabType, 'line')) {
      if (matchTabPosition(tabPosition, 'left') || matchTabPosition(tabPosition, 'right')) {
        return (
          <Theme config={theme}>
            <OutContainer theme={getTheme()} innerRef={cmp => (this.containerRef = cmp)}>
              <VTabsOutContainer tabPosition={tabPosition}>
                <VPrePage
                  tabPosition={tabPosition}
                  onClick={this.onPrevClick}
                  arrowShow={arrowShow}
                >
                  <PageIcon iconClass="lugia-icon-direction_up" />
                </VPrePage>
                <VTabsContainer>
                  <YscrollerContainer
                    y={(currentPage - 1) * this.offsetHeight * -1 + (currentPage - 1) * 40}
                  >
                    <VLine y={activityKey * 100} tabPosition={tabPosition} />
                    {this.getChildren()}
                  </YscrollerContainer>
                </VTabsContainer>
                <VNextPage
                  tabPosition={tabPosition}
                  onClick={this.onNextClick}
                  arrowShow={arrowShow}
                >
                  <PageIcon iconClass="lugia-icon-direction_down" />
                </VNextPage>
              </VTabsOutContainer>
              {this.getChildrenContent()}
            </OutContainer>
          </Theme>
        );
      }
      return (
        <Theme config={theme}>
          <OutContainer theme={getTheme()} innerRef={cmp => (this.containerRef = cmp)}>
            <HTabsOutContainer tabPosition={tabPosition} tabType={tabType}>
              {this.getHtabsChildren()}
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
            {this.getHtabsChildren()}
            <ShadowLine tabType={tabType} />
          </HTabsOutContainer>
        </OutContainer>
      );
    }
  }

  getHline() {
    const { tabType, tabPosition } = this.props;
    const { activityKey, currentPage } = this.state;
    if (matchTabType(tabType, 'line')) {
      return (
        <HLine
          lineWidth={this.childrenWidth[activityKey]}
          x={this.plusWidth(activityKey - 1, this.childrenWidth) + 15 * currentPage}
          tabPosition={tabPosition}
        />
      );
    }
    return null;
  }

  getHtabsChildren() {
    const { arrowShow, currentPage } = this.state;
    const { tabType } = this.props;
    return [
      <HPrePage arrowShow={arrowShow} onClick={this.onPrevClick}>
        <PageIcon iconClass="lugia-icon-direction_Left" />
      </HPrePage>,
      <HTabsContainer tabType={tabType}>
        <HscrollerContainer tabType={tabType} x={(currentPage - 1) * (this.offsetWidth * -1 + 48)}>
          {this.getChildren()}
          {this.getHline()}
        </HscrollerContainer>
      </HTabsContainer>,
      <HNextPage arrowShow={arrowShow} onClick={this.onNextClick}>
        <PageIcon iconClass="lugia-icon-direction_right" />
      </HNextPage>,
    ];
  }

  componentDidMount() {
    this.getContainerWidth();
    this.getContainerHeight();
    this.handleData();
  }

  handleData() {
    const { currentPage } = this.state;
    const { tabPosition } = this.props;
    const actualWidth = this.plusWidth(this.childrenWidth.length - 1, this.childrenWidth);
    const actualHeight = this.childrenWidth.length * 32;

    if (matchTabPosition(tabPosition, 'left') || matchTabPosition(tabPosition, 'right')) {
      this.totalPage = this.computePage(this.offsetHeight, actualHeight);
      const arrowShow = currentPage < this.totalPage;
      this.setState({ arrowShow });
    } else {
      this.totalPage = this.computePage(this.offsetWidth, actualWidth);
      const arrowShow = currentPage < this.totalPage;
      this.setState({ arrowShow });
    }
  }

  computePage(offset, actualSize) {
    const dataTotalSize = offset - 2 * 16;
    const totalPage = Math.ceil(actualSize / dataTotalSize);
    return totalPage;
  }

  getContainerWidth() {
    if (this.containerRef) {
      const { getTheme } = this.props;
      const { width } = getTheme();
      this.offsetWidth = this.containerRef.offsetWidth;
      return width ? width : this.offsetWidth;
    }
  }
  getContainerHeight() {
    if (this.containerRef) {
      const { getTheme } = this.props;
      const { height } = getTheme();
      this.offsetHeight = this.containerRef.offsetHeight;
      return height ? height : this.offsetHeight;
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
    const { data, children, forceRender } = this.props;
    const { activityKey } = this.state;
    let childrenContent;
    if (data && data.length) {
      childrenContent = data.map(child => {
        if (child.activityKey === activityKey) {
          if (!forceRender) {
            const content = child.content;
            return this.getContent(content);
          }
        }
      });
      return childrenContent;
    }
    childrenContent = React.Children.map(children, child => {
      if (child.props.activityKey === activityKey) {
        return React.cloneElement(child, this.getContentConfig(child));
      }
    });
    return this.getContent(childrenContent[0].props.content);
  }

  getContent(content: React$Element<any>) {
    const { tabPosition } = this.props;
    const { activityKey } = this.state;
    return (
      <ContentContainer x={activityKey * -100} y={activityKey * 100} tabPosition={tabPosition}>
        {content}
      </ContentContainer>
    );
  }

  onTabClick = (activityKey: number) => {
    const { onTabClick } = this.props;
    if (activityKey !== this.state.activityKey) {
      this.setState({ activityKey });
    }
    onTabClick && onTabClick(activityKey);
  };
  onDelClick = (activityKey: number) => {
    const { onDelClick } = this.props;
    const { data } = this.state;
    data.splice(activityKey, 1);
    this.setState({ data });
    onDelClick && onDelClick(activityKey);
  };
  handleWidth = (width: number) => {
    this.childrenWidth.push(width);
  };
  onNextClick = (e: Event) => {
    const { onNextClick } = this.props;
    this.transWidth('next');
    onNextClick && onNextClick(e);
  };
  onPrevClick = e => {
    const { onPrevClick } = this.props;
    this.transWidth('pre');
    onPrevClick && onPrevClick(e);
  };
  plusWidth = (index: number, width: Array<number>): number => {
    let sum = 0;
    for (let i = 0; i <= index; i++) {
      sum += width[i];
    }
    return sum;
  };

  transWidth = (type: EditType) => {
    let { currentPage, arrowShow } = this.state;
    if (type === 'next' && currentPage < this.totalPage) {
      currentPage++;
      arrowShow = true;
    } else if (type === 'pre' && currentPage > 1) {
      currentPage--;
    }
    this.setState({ currentPage, arrowShow });
  };
}

const TargetTabs = ThemeProvider(KeyBoardEventAdaptor(TabsBox), Widget.Tabs);
export default TargetTabs;
