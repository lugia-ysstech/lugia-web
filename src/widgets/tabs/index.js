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
import type { EditType, TabPositionType, TabType } from '../css/tabs';
import {
  backgroundColor,
  getBackgroundShadow,
  getColor,
  getContainerBorder,
  getContentPosition,
  getLinePosition,
  hContainerHeight,
  hContainerWidth,
  lineWidth,
  matchTabType,
  vContainerHeight,
  getAddHoverBackground,
  getAddBackground,
} from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import { isVertical, plusWidth } from './utils';
import { getAttributeFromObject } from '../common/ObjectUtils.js';

import Icon from '../icon';
import { getIndexfromKey } from '../common/ObjectUtils';
import { didUpdate } from '../common/translateData';

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
  z-index: -1;
  ${getBackgroundShadow};
`;
const Line = styled.div`
  width: 100%;
  position: absolute;
  bottom: -1px;
  height: ${em(1)};
  z-index: 1;
  background: #e8e8e8;
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
const AddContainer = styled.div`
  top: ${em(8)};
  position: relative;
  ${getAddBackground};
  width: ${em(18)};
  height: ${em(18)};
  border-radius: 50%;

  &:hover {
    ${getAddHoverBackground};
  }
`;
const AddOutContainer = styled.div`
  position: relative;
  right: ${em(-10)};
  text-align: center;
  top: ${em(8)};
  display: inline-block;
  height: ${hContainerHeight};
  line-height: ${hContainerHeight};
  border-radius: 50%;
`;
const AddIcon: Object = styled(Icon)`
  bottom: ${em(8)};
  position: relative;
  font-size: 1em;
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
  line-height: ${hContainerHeight};
  position: relative;
  ${getContainerBorder};
  background: ${backgroundColor};
  padding: 0 ${em(24)};
  box-sizing: border-box;
  margin: ${em(20)} 0;
  z-index: 99;
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
`;
const PageIcon: Object = styled(Icon)`
  display: inline-block;
  font-style: normal;
  text-align: center;
  font-size: 1rem;
`;

type TabsState = {|
  activityKey: string,
  data: Array<Object>,
  currentPage: number,
  totalPage: number,
  arrowShow: boolean,
  childrenSize: Array<number>,
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
  onNextClick: Function,
  onPrevClick: Function,
  children: React$Element<any>,
  data: Array<Object>,
  defaultData: Array<Object>,
  tab: string,
  forceRender: boolean,
  getTheme: Function,
  onDeleteClick: Function,
  onAddClick: Function,
};

class TabsBox extends Component<TabsProps, TabsState> {
  static defaultProps = {
    tabType: 'line',
    defaultActivityKey: '0',
    tabPosition: 'top',
  };
  tabs: any;
  static displayName = Widget.Tabs;
  offsetWidth: number;
  offsetHeight: number;

  totalPage: number;

  constructor(props: TabsProps) {
    super(props);
    this.tabs = React.createRef();
  }

  static getDerivedStateFromProps(props: TabsProps, state: TabsState) {
    const { activityKey, defaultActivityKey, defaultData, data, children } = props;
    const hasActivityKeyInprops = 'activityKey' in props;
    const hasDataInprops = 'data' in props;
    if (!state) {
      const childrenData = [];
      React.Children.map(children, child => {
        return childrenData.push(child.props);
      });
      return {
        activityKey: hasActivityKeyInprops
          ? activityKey
          : defaultActivityKey
            ? defaultActivityKey
            : '0',
        data: hasDataInprops
          ? data
          : childrenData
            ? childrenData
            : state.data
              ? state.data
              : defaultData
                ? defaultData
                : [],
        currentPage: 1,
        totalPage: 1,
        arrowShow: false,
        childrenSize: [],
      };
    }
    if (hasActivityKeyInprops) {
      return { activityKey };
    }
    console.log('getDerivedStateFromProps', state.data);
  }

  render() {
    const { getTheme } = this.props;
    const config = {
      width: this.getContainerSize('width'),
      height: this.getContainerSize('height'),
    };
    const theme = { [Widget.TabsContainer]: config };

    return (
      <Theme config={theme}>
        <OutContainer
          theme={getTheme()}
          innerRef={cmp => {
            this.tabs = cmp;
          }}
        >
          {this.getTabs()}
          {this.getChildrenContent()}
        </OutContainer>
      </Theme>
    );
  }
  getTabs() {
    const { tabPosition } = this.props;
    if (isVertical(tabPosition)) {
      return this.getVtabs();
    }
    return this.getHTabs();
  }

  getVtabs() {
    const { tabPosition } = this.props;
    const { data, activityKey, currentPage, arrowShow } = this.state;
    const y = (currentPage - 1) * this.offsetHeight * -1 + (currentPage - 1) * 40;
    return (
      <VTabsOutContainer tabPosition={tabPosition}>
        <VPrePage tabPosition={tabPosition} onClick={this.onPrevClick} arrowShow={arrowShow}>
          <PageIcon iconClass="lugia-icon-direction_up" />
        </VPrePage>
        <VTabsContainer>
          <YscrollerContainer y={y}>
            <VLine
              y={getIndexfromKey(data, 'activityKey', activityKey) * 100}
              tabPosition={tabPosition}
            />
            {this.getChildren()}
          </YscrollerContainer>
        </VTabsContainer>
        <VNextPage tabPosition={tabPosition} onClick={this.onNextClick} arrowShow={arrowShow}>
          <PageIcon iconClass="lugia-icon-direction_down" />
        </VNextPage>
      </VTabsOutContainer>
    );
  }

  getHTabs() {
    const { tabType, tabPosition } = this.props;
    return [
      <HTabsOutContainer tabType={tabType} tabPosition={tabPosition}>
        {this.getHtabsChildren()}
        {this.getShadowLine()}
      </HTabsOutContainer>,
    ];
  }

  getShadowLine() {
    const { tabType } = this.props;
    if (matchTabType(tabType, 'window')) {
      return <ShadowLine tabType={tabType} />;
    }
    if (matchTabType(tabType, 'card')) {
      return <Line tabType={tabType} />;
    }
    return null;
  }

  getHline() {
    const { tabType, tabPosition } = this.props;
    const { activityKey, data, childrenSize } = this.state;
    if (matchTabType(tabType, 'line')) {
      return (
        <HLine
          lineWidth={childrenSize[getIndexfromKey(data, 'activityKey', activityKey)]}
          x={plusWidth(getIndexfromKey(data, 'activityKey', activityKey) - 1, childrenSize) + 20}
          tabPosition={tabPosition}
        />
      );
    }
    return null;
  }

  getHtabsChildren() {
    const { arrowShow, currentPage } = this.state;
    const { tabType } = this.props;
    const x = (currentPage - 1) * (this.offsetWidth * -1 + 48);
    return [
      <HPrePage arrowShow={arrowShow} onClick={this.onPrevClick}>
        <PageIcon iconClass="lugia-icon-direction_Left" />
      </HPrePage>,
      <HTabsContainer tabType={tabType}>
        <HscrollerContainer tabType={tabType} x={x}>
          {this.getChildren()}
          {this.getAddButton()}
          {this.getHline()}
        </HscrollerContainer>
      </HTabsContainer>,
      <HNextPage arrowShow={arrowShow} onClick={this.onNextClick}>
        <PageIcon iconClass="lugia-icon-direction_right" />
      </HNextPage>,
    ];
  }

  getAddButton() {
    const { tabType } = this.props;
    if (matchTabType(tabType, 'window')) {
      return (
        <AddOutContainer tabType={tabType}>
          <AddContainer onClick={this.onAddClick}>
            <AddIcon iconClass="lugia-icon-reminder_plus" />
          </AddContainer>
        </AddOutContainer>
      );
    }
    return null;
  }
  componentWillMount() {}

  componentDidUpdate(props, preState) {
    const { data } = this.state;
    console.log('preState', preState.data);
    console.log('this.state', data);
    if (data !== preState.data) {
      this.getContainerSize('width');
      this.getContainerSize('height');
      this.matchPage();
    }
  }
  componentDidMount() {
    this.getContainerSize('width');
    this.getContainerSize('height');
    this.matchPage();
  }

  matchPage() {
    const { currentPage, childrenSize } = this.state;
    let { totalPage } = this.state;
    const { tabPosition } = this.props;
    const actualWidth = plusWidth(childrenSize.length - 1, childrenSize);
    const actualHeight = childrenSize.length * 32;
    console.log('actualWidth', actualWidth);
    console.log('actualHeight', actualHeight);
    if (isVertical(tabPosition)) {
      totalPage = this.computePage(this.offsetHeight, actualHeight);
    } else {
      totalPage = this.computePage(this.offsetWidth, actualWidth);
    }
    const arrowShow = currentPage <= totalPage;
    this.setState({ arrowShow, totalPage });
  }

  computePage(offset, actualSize) {
    const dataTotalSize = offset - 2 * 24;
    const totalPage = Math.ceil(actualSize / dataTotalSize);
    return totalPage;
  }

  getContainerSize(type: string) {
    if (this.tabs) {
      const { getTheme } = this.props;
      const { width, height } = getTheme();
      if (type === 'width') {
        this.offsetWidth = this.tabs.offsetWidth;
        return width ? width : this.offsetWidth;
      }
      this.offsetHeight = this.tabs.offsetHeight;
      return height ? height : this.offsetHeight;
    }
  }

  getConfig(child: React$Element<any>) {
    const { tabPosition, tabType } = this.props;
    const { activityKey } = this.state;
    return {
      tabPosition,
      tabType,
      title: getAttributeFromObject(
        child,
        'title',
        getAttributeFromObject(child.props, 'title', '')
      ),
      icon: getAttributeFromObject(child, 'icon', getAttributeFromObject(child.props, 'icon', '')),
      activityKey: getAttributeFromObject(
        child,
        'activityKey',
        getAttributeFromObject(child.props, 'activityKey', '0')
      ),
      onClick: this.onTabClick,
      isSelect:
        getAttributeFromObject(
          child,
          'activityKey',
          getAttributeFromObject(child.props, 'activityKey', '0')
        ) === activityKey,
      getTabpaneWidth: this.getTabpaneWidth,
      onDeleteClick: this.onDeleteClick,
    };
  }

  getChildren() {
    const { data } = this.state;
    const childrenWithProps =
      data && data.length
        ? data.map(child => {
            return <Tabpane {...this.getConfig(child)} />;
          })
        : null;
    return childrenWithProps;
  }

  getChildrenContent() {
    const { forceRender } = this.props;
    const { activityKey, data } = this.state;
    if (data && data.length) {
      return data.map(child => {
        const childActivityKey = getAttributeFromObject(
          child,
          'activityKey',
          getAttributeFromObject(child.props, 'activityKey', undefined)
        );
        if (forceRender || childActivityKey === activityKey) {
          const content = getAttributeFromObject(
            child,
            'content',
            getAttributeFromObject(child.props, 'content', undefined)
          );
          return this.getContent(content);
        }
      });
    }
    return null;
  }

  getContent(content: React$Element<any>) {
    const { tabPosition } = this.props;
    return <ContentContainer tabPosition={tabPosition}>{content}</ContentContainer>;
  }

  onTabClick = (activityKey: string) => {
    const { onTabClick } = this.props;
    if (activityKey !== this.state.activityKey) {
      this.setState({ activityKey });
    }
    onTabClick && onTabClick(activityKey);
  };
  onDeleteClick = (e: Event, activityKey: string) => {
    const { onDeleteClick } = this.props;
    let { data } = this.state;
    if (data.length > 1) {
      data = data.filter(tabpane => tabpane.activityKey !== activityKey);
      this.setState({
        data,
      });
    }
    onDeleteClick && onDeleteClick();
  };
  onAddClick = (e: Event) => {
    const { onAddClick } = this.props;
    const { data } = this.state;
    const activityKey = `tab${data.length + 1}`;
    const title = `Tab${data.length + 1}`;
    data.push({ title, content: 'Content of new Tab', activityKey });
    console.log('addClick', data);
    this.setState({
      data,
    });
    onAddClick && onAddClick(e);
  };
  getTabpaneWidth = (width: number) => {
    const { childrenSize } = this.state;
    childrenSize.push(width);
  };

  createNativeClick = (eventName: 'onNextClick' | 'onPrevClick', type: EditType) => e => {
    const { [eventName]: click } = this.props;
    this.handleChangePage(type);
    click && click(e);
  };

  onNextClick = this.createNativeClick('onNextClick', 'next');
  onPrevClick = this.createNativeClick('onPrevClick', 'pre');

  handleChangePage = (type: EditType) => {
    let { currentPage, totalPage } = this.state;
    if (type === 'next' && currentPage < totalPage) {
      currentPage++;
    } else if (type === 'pre' && currentPage > 1) {
      currentPage--;
    }
    this.setState({ currentPage });
  };
}

const TargetTabs = ThemeProvider(KeyBoardEventAdaptor(TabsBox), Widget.Tabs);
export default TargetTabs;
