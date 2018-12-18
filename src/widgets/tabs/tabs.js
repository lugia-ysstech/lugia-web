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
import TabContent from './tabcontent';
import Widget from '../consts/index';
import Theme from '../theme';
import type { EditEventType, PagedType, TabPositionType, TabType } from '../css/tabs';
import {
  AddButtonSize,
  ArrowContainerWidth,
  backgroundColor,
  CardBorderAndMarginWidth,
  CardMarginRight,
  getAddBackground,
  getAddButtonBottom,
  getAddButtonDisplay,
  getAddButtonShow,
  getAddHoverBackground,
  getAddRadius,
  getAddRight,
  getAddTop,
  getArrowTop,
  getBackgroundShadow,
  getContainerBorder,
  getCursor,
  getLinePosition,
  getSelectColor,
  getTabpaneBorder,
  hContainerHeight,
  hContainerWidth,
  LineMarginLeft,
  lineWidth,
  vContainerHeight,
  WindowMarginLeft,
  YtabsHeight,
} from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import {
  addActivityKey2Data,
  addWidth2Data,
  computePage,
  isVertical,
  matchType,
  plusWidth,
} from './utils';
import { getAttributeFromObject } from '../common/ObjectUtils.js';

import Icon from '../icon';
import { getIndexfromKey, getKeyfromIndex } from '../common/ObjectUtils';

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
  transform: translateX(${props => em(props.x)});
  transition: all 0.3s;
`;
const ShadowLine = styled.div`
  width: 100%;
  position: absolute;
  bottom: ${em(-1)};
  height: ${em(1)};
  z-index: -1;
  ${getBackgroundShadow};
`;
const VLine = BaseLine.extend`
  height: ${em(YtabsHeight)};
  width: ${em(2)};
  transform: translateY(${props => props.y}%);
  transition: all 0.3s;
  ${getLinePosition};
`;

const ArrowContainer = styled.span`
  position: absolute;
  font-size: 1.2rem;
  display: ${props => (props.arrowShow === false ? 'none' : 'inline-block')};
  z-index: 5;
  ${getCursor};
`;

const HBasePage = ArrowContainer.extend`
  transform: translateY(-50%);
  line-height: 100%;
  ${getArrowTop};
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
OutContainer.displayName = Widget.TabsContainer;
const HTabsContainer = styled.div`
  width: 100%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
`;
const AddContainer = styled.div`
  position: relative;
  ${getAddBackground};
  ${getTabpaneBorder};
  ${getAddRadius};
  ${getAddTop};
  width: ${em(AddButtonSize)};
  height: ${em(AddButtonSize)};
  &:focus {
    ${getAddHoverBackground};
  }
`;

const AddOutContainer = styled.div`
  position: relative;
  text-align: center;
  ${getAddTop};
  ${getAddRight};
  display: inline-block;
  height: ${hContainerHeight};
  line-height: ${hContainerHeight};
`;
const AddIcon: Object = styled(Icon)`
  position: relative;
  transition: all 0.3s linear 0.1s;
  font-size: 1rem;
  ${getAddButtonBottom};
  ${getAddButtonShow};
  ${getAddButtonDisplay};
`;
AddIcon.displayName = 'addIcon';
const HscrollerContainer = styled.div`
  height: ${hContainerHeight};
  display: inline-block;
  box-sizing: border-box;
  white-space: nowrap;
  transition: all 0.5s;
  transform: translateX(${props => em(props.x)});
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
  transform: translateY(${props => em(props.y)});
`;
const HTabsOutContainer = styled.div`
  height: ${hContainerHeight};
  line-height: ${hContainerHeight};
  position: relative;
  ${getContainerBorder};
  background: ${backgroundColor};
  padding: 0 ${em(24)};
  margin: ${em(20)} 0;
  z-index: 99;
`;

const VTabsOutContainer = styled.div`
  ${getSelectColor};
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
const PageIcon: Object = styled(Icon)`
  display: inline-block;
  font-style: normal;
  text-align: center;
  font-size: 1rem;
  ${getCursor};
`;
PageIcon.displayName = 'page';

type TabsState = {|
  activityKey: string,
  data: Array<Object>,
  currentPage: number,
  totalPage: number,
  pagedCount: number,
  arrowShow: boolean,
  addButtonShow: boolean,
  childrenSize: Array<number>,
|};

type TabsProps = {
  activityKey: string,
  defaultActivityKey: string,
  onTabClick: Function,
  tabPosition: TabPositionType,
  tabType: TabType,
  onChange: Function,
  onNextClick: Function,
  onPreClick: Function,
  children: React$Element<any>,
  data: Array<Object>,
  defaultData: Array<Object>,
  forceRender: boolean,
  getTheme: Function,
  onDeleteClick: Function,
  onAddClick: Function,
  pagedType: PagedType,
};

class TabsBox extends Component<TabsProps, TabsState> {
  static defaultProps = {
    tabType: 'line',
    tabPosition: 'top',
    pagedType: 'single',
  };
  tabs: any;
  static displayName = Widget.Tabs;
  offsetWidth: number;
  offsetHeight: number;

  constructor(props: TabsProps) {
    super(props);
    this.tabs = React.createRef();
    this.initContainerSize();
  }

  static getDerivedStateFromProps(props: TabsProps, state: TabsState) {
    const { activityKey, defaultActivityKey, defaultData, data, children } = props;
    const hasActivityKeyInprops = 'activityKey' in props;
    const hasDataInprops = 'data' in props;
    let configData;
    if (hasDataInprops) {
      configData = data ? data : [];
    } else {
      if (Array.isArray(children) && children.length > 0) {
        configData = [];
        React.Children.map(children, child => {
          configData && configData.push(child.props);
        });
      }
    }
    const theData = configData
      ? addActivityKey2Data(configData)
      : addActivityKey2Data(defaultData)
      ? addActivityKey2Data(defaultData)
      : [];
    const theActivityKey = hasActivityKeyInprops
      ? activityKey
      : defaultActivityKey
      ? defaultActivityKey
      : theData.length > 0
      ? theData[0].activityKey
      : undefined;

    if (!state) {
      return {
        data: theData,
        activityKey: theActivityKey,
        currentPage: 0,
        totalPage: 1,
        pagedCount: 0,
        arrowShow: false,
        addButtonShow: false,
        childrenSize: [],
      };
    }
    const sData = state.data;
    const sActivityKey = state.activityKey;

    return {
      activityKey: hasActivityKeyInprops ? activityKey : sActivityKey,
      data: hasDataInprops ? theData : sData,
    };
  }

  render() {
    const { getTheme } = this.props;
    const config = {
      width: this.offsetWidth,
      height: this.offsetHeight,
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

  getArrowConfig(type: EditEventType) {
    const { currentPage, arrowShow, totalPage, pagedCount, childrenSize } = this.state;
    const { pagedType } = this.props;
    return {
      type,
      pagedType,
      totalPage,
      currentPage,
      arrowShow,
      pagedCount,
      childrenSize,
    };
  }

  getVtabs() {
    const { tabPosition } = this.props;
    const { data, activityKey, pagedCount } = this.state;
    const arrowUp = 'lugia-icon-direction_up';
    const arrowDown = 'lugia-icon-direction_down';
    const y = -YtabsHeight * pagedCount;
    return (
      <VTabsOutContainer tabPosition={tabPosition}>
        <VPrePage
          tabPosition={tabPosition}
          onClick={this.onPreClick}
          {...this.getArrowConfig('pre')}
        >
          <PageIcon iconClass={arrowUp} {...this.getArrowConfig('pre')} />
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
        <VNextPage
          {...this.getArrowConfig('next')}
          tabPosition={tabPosition}
          onClick={this.onNextClick}
        >
          <PageIcon iconClass={arrowDown} {...this.getArrowConfig('next')} />
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
    if (matchType(tabType, 'window')) {
      return <ShadowLine tabType={tabType} />;
    }
    return null;
  }

  getHline() {
    const { tabType, tabPosition } = this.props;
    const { activityKey, data, childrenSize } = this.state;

    if (matchType(tabType, 'line')) {
      return (
        <HLine
          lineWidth={childrenSize[getIndexfromKey(data, 'activityKey', activityKey)]}
          x={
            plusWidth(getIndexfromKey(data, 'activityKey', activityKey) - 1, childrenSize) +
            LineMarginLeft
          }
          tabPosition={tabPosition}
        />
      );
    }
    return null;
  }

  getHtabsChildren() {
    const { tabType } = this.props;
    const arrowLeft = 'lugia-icon-direction_Left';
    const arrowRight = 'lugia-icon-direction_right';
    const pre = this.getArrowConfig('pre');
    const next = this.getArrowConfig('next');
    return [
      <HPrePage onClick={this.onPreClick} tabType={tabType} {...pre}>
        <PageIcon iconClass={arrowLeft} {...pre} />
      </HPrePage>,
      <HTabsContainer tabType={tabType}>
        <HscrollerContainer tabType={tabType} x={this.computePagedX()}>
          {this.getChildren()}
          {this.getAddButton()}
          {this.getHline()}
        </HscrollerContainer>
      </HTabsContainer>,
      <HNextPage {...next} onClick={this.onNextClick} tabType={tabType}>
        <PageIcon iconClass={arrowRight} {...next} />
      </HNextPage>,
    ];
  }

  getAddButton() {
    const { tabType } = this.props;
    const { addButtonShow } = this.state;
    const add = 'lugia-icon-reminder_plus';
    if (!matchType(tabType, 'line')) {
      return (
        <AddOutContainer tabType={tabType}>
          <AddContainer
            tabType={tabType}
            onClick={this.onAddClick}
            onMouseEnter={this.addButtonMouseEnter}
            onMouseLeave={this.addButtonMouseLeave}
          >
            <AddIcon tabType={tabType} iconClass={add} show={addButtonShow} />
          </AddContainer>
        </AddOutContainer>
      );
    }
    return null;
  }

  componentDidMount() {
    this.measurePage();
  }

  measurePage() {
    this.updateContainerSize();
    this.matchPage();
  }

  addButtonMouseEnter = () => {
    this.setState({ addButtonShow: true });
  };

  addButtonMouseLeave = () => {
    this.setState({ addButtonShow: false });
  };

  matchPage() {
    const { currentPage, childrenSize, data } = this.state;
    const { tabPosition, tabType } = this.props;
    const width = plusWidth(childrenSize.length - 1, childrenSize);

    const actualWidth = matchType(tabType, 'window')
      ? width + WindowMarginLeft + AddButtonSize
      : matchType(tabType, 'card')
      ? width + (childrenSize.length + 1) * CardMarginRight + AddButtonSize
      : width;
    const actualHeight = data.length * YtabsHeight;
    const totalPage = isVertical(tabPosition)
      ? computePage(this.offsetHeight - ArrowContainerWidth, actualHeight)
      : computePage(this.offsetWidth - ArrowContainerWidth, actualWidth);
    const arrowShow = totalPage > 1 && currentPage < totalPage;
    this.setState({ arrowShow, totalPage });
  }

  computePagedX() {
    const { currentPage, totalPage, pagedCount, childrenSize } = this.state;
    const { tabType } = this.props;
    const currentTabsWidth = plusWidth(pagedCount - 1, childrenSize);
    let x = totalPage > 1 ? currentPage * (this.offsetWidth - ArrowContainerWidth) : 0;
    if (pagedCount > 0) {
      if (matchType(tabType, 'card')) {
        x = currentTabsWidth + CardBorderAndMarginWidth * pagedCount;
      } else if (matchType(tabType, 'window')) {
        x = currentTabsWidth + WindowMarginLeft;
      } else {
        x = currentTabsWidth;
      }
    }
    return -x;
  }

  initContainerSize() {
    const { getTheme } = this.props;
    const { width, height } = getTheme();
    this.offsetWidth = width ? width : 0;
    this.offsetHeight = height ? height : 0;
  }

  updateContainerSize() {
    if (this.tabs) {
      this.offsetWidth = this.tabs.offsetWidth;
      this.offsetHeight = this.tabs.offsetHeight;
    }
  }

  getTabpaneConfig(child: React$Element<any>, i: number) {
    const { tabPosition, tabType } = this.props;
    const { activityKey, data } = this.state;
    const TabpaneActivityKey = getAttributeFromObject(
      child,
      'activityKey',
      child
        ? getKeyfromIndex(data, i, 'activityKey')
        : getAttributeFromObject(
            child.props,
            'activityKey',
            child ? getKeyfromIndex(data, i, 'activityKey') : '0'
          )
    );

    return {
      tabPosition,
      tabType,
      title: getAttributeFromObject(
        child,
        'title',
        getAttributeFromObject(child.props, 'title', '')
      ),
      icon: getAttributeFromObject(child, 'icon', getAttributeFromObject(child.props, 'icon', '')),
      activityKey: TabpaneActivityKey,
      onClick: this.onTabClick,
      isSelect: TabpaneActivityKey === activityKey,
      getTabpaneWidth: this.getTabpaneWidth,
      onDeleteClick: this.onDeleteClick,
    };
  }

  getChildren() {
    const { data } = this.state;
    const childrenWithProps = data
      ? data.map((child, i) => {
          return <Tabpane {...this.getTabpaneConfig(child, i)} />;
        })
      : null;
    return childrenWithProps;
  }

  getChildrenContent() {
    const { forceRender, tabPosition } = this.props;
    const { activityKey, data } = this.state;
    if (data && data.map) {
      return data.map((child, i) => {
        const childActivityKey = getAttributeFromObject(
          child,
          'activityKey',
          getAttributeFromObject(
            child.props,
            'activityKey',
            getKeyfromIndex(data, i, 'activityKey')
          )
        );
        if (forceRender || childActivityKey === activityKey) {
          const content = getAttributeFromObject(
            child,
            'content',
            getAttributeFromObject(child.props, 'content', undefined)
          );
          return (
            <TabContent
              content={content}
              activityKey={childActivityKey}
              tabPosition={tabPosition}
            />
          );
        }
      });
    }
    return null;
  }

  onTabClick = (activityKey: string, e: Event) => {
    const { onTabClick } = this.props;
    onTabClick && onTabClick(activityKey, e);
    this.setActiveKey(activityKey, e);
  };
  setActiveKey = (activityKey: string, e: Event) => {
    const { onChange } = this.props;
    if (activityKey !== this.state.activityKey) {
      if (!('activeKey' in this.props)) this.setState({ activityKey });
    }
    onChange && onChange(activityKey, e);
  };
  onDeleteClick = (e: Event, activityKey: string) => {
    const { onDeleteClick } = this.props;
    onDeleteClick && onDeleteClick(activityKey);
  };

  onAddClick = (e: Event) => {
    const { onAddClick } = this.props;
    onAddClick && onAddClick();
  };

  getTabpaneWidth = (width: number) => {
    const { childrenSize } = this.state;
    const newChildrenSize = childrenSize;
    newChildrenSize.push(width);
    this.setState({ childrenSize: newChildrenSize });
    this.updataChildrenSize();
  };

  updataChildrenSize() {
    const { data, childrenSize } = this.state;
    const newData = addWidth2Data(data, childrenSize);
    const newChildrenSize = [];
    newData.map(item => {
      return newChildrenSize.push(item.width);
    });
    this.setState({ childrenSize: newChildrenSize });
  }

  createNativeClick = (eventName: 'onNextClick' | 'onPreClick', type: EditEventType) => (
    e: Event
  ) => {
    const { [eventName]: click } = this.props;
    this.handleChangePage(type);
    click && click(e);
  };

  onNextClick = this.createNativeClick('onNextClick', 'next');
  onPreClick = this.createNativeClick('onPreClick', 'pre');

  getPagedCount(currentPage: number, totalPage: number, type: EditEventType) {
    if (matchType(type, 'next')) {
      currentPage++;
    } else if (matchType(type, 'pre')) {
      currentPage--;
    }
    return Math.max(Math.min(currentPage, totalPage - 1), 0);
  }

  handleChangePage = (type: EditEventType) => {
    let { currentPage, totalPage, pagedCount, childrenSize } = this.state;
    const { pagedType } = this.props;

    if (pagedType === 'page') {
      currentPage = this.getPagedCount(currentPage, totalPage, type);
    } else {
      pagedCount = this.getPagedCount(pagedCount, childrenSize.length, type);
    }

    this.setState({ currentPage, pagedCount });
  };
}

const TargetTabs = ThemeProvider(KeyBoardEventAdaptor(TabsBox), Widget.Tabs);
export default TargetTabs;
