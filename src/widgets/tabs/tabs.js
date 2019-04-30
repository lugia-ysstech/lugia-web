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
  getAddHoverBackground,
  getAddRadius,
  getAddRight,
  getAddTop,
  getArrowTop,
  getBackgroundShadow,
  getButtonShow,
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
  getContainerPadding,
} from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import {
  addActivityValue2Data,
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

const HLine = styled(BaseLine)`
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
const VLine = styled(BaseLine)`
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

const HBasePage = styled(ArrowContainer)`
  transform: translateY(-50%);
  line-height: 100%;
  ${getArrowTop};
`;

const HPrePage = styled(HBasePage)`
  left: ${em(10)};
`;
const HNextPage = styled(HBasePage)`
  right: ${em(10)};
`;
const VBasePage = styled(ArrowContainer)`
  width: 100%;
  text-align: center;
  height: ${em(24)};
`;
const VPrePage = styled(VBasePage)`
  top: ${em(12)};
`;
const VNextPage = styled(VBasePage)`
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
  ${getAddButtonDisplay};
  opacity: 0;
  &:hover {
    ${getButtonShow};
  }
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
  ${getContainerPadding};
  margin: ${em(20)} 0;
  z-index: 99;
`;

const VTabsOutContainer = styled.div`
  ${getSelectColor};
  ${getContainerBorder};
  display: inline-block;
  position: relative;
  ${getContainerPadding};
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

const defaultData = [
  {
    title: 'Tab1',
    content: 'content of Tab1',
  },
  {
    title: 'Tab2',
    content: 'content of Tab2',
  },
  {
    title: 'Tab3',
    content: 'content of Tab3',
  },
];

type TabsState = {|
  activityValue: string,
  data: Array<Object>,
  currentPage: number,
  totalPage: number,
  pagedCount: number,
  arrowShow: boolean,
  childrenSize: Array<number>,
|};

type TabsProps = {
  activityValue: string,
  defaultActivityValue: string,
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
  getTabpane: Function,
  onTabMouseEnter?: Function,
  onTabMouseLeave?: Function,
};
function hasDataInProps(props: TabsProps) {
  return 'data' in props;
}

class TabsBox extends Component<TabsProps, TabsState> {
  static defaultProps = {
    tabType: 'line',
    tabPosition: 'top',
    pagedType: 'single',
    defaultData,
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
    const { activityValue, defaultActivityValue, defaultData, data, children } = props;
    const hasActivityValueInprops = 'activityValue' in props;
    let configData = [];
    if (hasDataInProps(props)) {
      configData = data ? data : [];
    } else {
      if (Array.isArray(children) && children.length > 0) {
        configData = [];
        React.Children.map(children, child => {
          configData && configData.push(child.props);
        });
      } else {
        configData = defaultData ? defaultData : [];
      }
    }
    if (!state) {
      const theData = configData ? addActivityValue2Data(configData) : [];
      const theActivityValue = hasActivityValueInprops
        ? activityValue
        : defaultActivityValue
        ? defaultActivityValue
        : theData.length > 0
        ? theData[0].activityValue
        : undefined;
      return {
        data: theData,
        activityValue: theActivityValue,
        currentPage: 0,
        totalPage: 1,
        pagedCount: 0,
        arrowShow: false,
        childrenSize: [],
      };
    }
    const sData = state.data;
    const sActivityValue = state.activityValue;
    return {
      activityValue: hasActivityValueInprops ? activityValue : sActivityValue,
      data: hasDataInProps(props) ? addActivityValue2Data(configData) : sData,
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
          ref={cmp => {
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
    const { data, activityValue, pagedCount, totalPage } = this.state;
    const arrowUp = 'lugia-icon-direction_up';
    const arrowDown = 'lugia-icon-direction_down';
    const y = -YtabsHeight * pagedCount;
    return (
      <VTabsOutContainer tabPosition={tabPosition} showPadding={totalPage > 1}>
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
              y={getIndexfromKey(data, 'activityValue', activityValue) * 100}
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
    const { tabType, tabPosition, getTheme } = this.props;
    const { totalPage } = this.state;
    return [
      <HTabsOutContainer
        tabType={tabType}
        tabPosition={tabPosition}
        showPadding={totalPage > 1}
        theme={getTheme()}
      >
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
    const { activityValue, data, childrenSize } = this.state;
    if (matchType(tabType, 'line')) {
      return (
        <HLine
          lineWidth={childrenSize[getIndexfromKey(data, 'activityValue', activityValue)]}
          x={
            plusWidth(getIndexfromKey(data, 'activityValue', activityValue) - 1, childrenSize) +
            LineMarginLeft
          }
          tabPosition={tabPosition}
        />
      );
    }
    return null;
  }

  getHtabsChildren() {
    const { tabType, getTheme } = this.props;
    const arrowLeft = 'lugia-icon-direction_Left';
    const arrowRight = 'lugia-icon-direction_right';
    const pre = this.getArrowConfig('pre');
    const next = this.getArrowConfig('next');
    return [
      <HPrePage onClick={this.onPreClick} tabType={tabType} {...pre}>
        <PageIcon iconClass={arrowLeft} {...pre} />
      </HPrePage>,
      <HTabsContainer tabType={tabType}>
        <HscrollerContainer tabType={tabType} x={this.computePagedX()} theme={getTheme()}>
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
    const { tabType, getTheme } = this.props;
    const add = 'lugia-icon-reminder_plus';
    if (!matchType(tabType, 'line')) {
      return (
        <AddOutContainer tabType={tabType} theme={getTheme()}>
          <AddContainer tabType={tabType} onClick={this.onAddClick}>
            <AddIcon tabType={tabType} iconClass={add} />
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
    const { activityValue, data } = this.state;
    const TabpaneActivityValue = getAttributeFromObject(
      child,
      'activityValue',
      child
        ? getKeyfromIndex(data, i, 'activityValue')
        : getAttributeFromObject(
            child.props,
            'activityValue',
            child ? getKeyfromIndex(data, i, 'activityValue') : '0'
          )
    );
    const disabled = getAttributeFromObject(
      child,
      'disabled',
      getAttributeFromObject(child.props, 'disabled', false)
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
      suffixIcon: getAttributeFromObject(
        child,
        'suffixIcon',
        getAttributeFromObject(child.props, 'suffixIcon', '')
      ),
      activityValue: TabpaneActivityValue,
      onClick: this.onTabClick,
      isSelect: !disabled && TabpaneActivityValue === activityValue,
      getTabpaneWidth: this.getTabpaneWidth,
      onDeleteClick: this.onDeleteClick,
      disabled,
      onMouseEnter: this.onTabMouseEnter,
      onMouseLeave: this.onTabMouseLeave,
    };
  }

  getChildren() {
    const { data } = this.state;
    const { getTabpane } = this.props;
    return data
      ? data.map((child, i) => {
          const target = <Tabpane {...this.getTabpaneConfig(child, i)} />;
          return getTabpane ? getTabpane(target, i) : target;
        })
      : null;
  }
  getChildrenContent() {
    const { forceRender, tabPosition } = this.props;
    const { activityValue, data } = this.state;
    if (data && data.map) {
      return data.map((child, i) => {
        const childActivityValue = getAttributeFromObject(
          child,
          'activityValue',
          getAttributeFromObject(
            child.props,
            'activityValue',
            getKeyfromIndex(data, i, 'activityValue')
          )
        );
        if (forceRender || childActivityValue === activityValue) {
          const content = getAttributeFromObject(
            child,
            'content',
            getAttributeFromObject(child.props, 'content', undefined)
          );
          return (
            <TabContent
              content={content}
              activityValue={childActivityValue}
              tabPosition={tabPosition}
            />
          );
        }
      });
    }
    return null;
  }
  getTabpaneDisabled(activityValue: string) {
    const { data } = this.state;
    if (activityValue) {
      const index = getIndexfromKey(data, 'activityValue', activityValue);
      return data[index].disabled;
    }
    return false;
  }

  onTabClick = (activityValue: string, e: Event) => {
    const { onTabClick } = this.props;
    if (!this.getTabpaneDisabled(activityValue)) {
      onTabClick && onTabClick(activityValue, e);
      this.setActiveValue(activityValue, e);
    }
  };
  setActiveValue = (activityValue: string, e: Event) => {
    const { onChange } = this.props;
    if (activityValue !== this.state.activityValue) {
      if (!('activeValue' in this.props)) this.setState({ activityValue });
    }
    onChange && onChange(activityValue, e);
  };

  onDeleteClick = (e: Event, activityValue: string) => {
    const { data } = this.state;
    let newdata = [];
    if (!hasDataInProps(this.props)) {
      newdata = data.filter(tabpane => {
        return tabpane.activityValue !== activityValue;
      });
      this.setState(
        {
          data: newdata,
        },
        () => {
          this.updataChildrenSize();
        }
      );
    }
    const { onDeleteClick } = this.props;
    onDeleteClick && onDeleteClick(activityValue);
  };

  onAddClick = (e: Event) => {
    const { onAddClick } = this.props;
    if (!hasDataInProps(this.props)) {
      const { data } = this.state;
      const newdata = [...data];
      const tabIndex = this.state.data.length + 1;
      const item = onAddClick(e)
        ? onAddClick(e)
        : {
            title: `new tab ${tabIndex}`,
            content: `content of new tab ${tabIndex}`,
            activityValue: `newTab${tabIndex}`,
          };
      newdata.push(item);
      this.setState(
        {
          data: addActivityValue2Data(newdata),
        },
        () => {
          this.updataChildrenSize();
        }
      );
    }
    onAddClick && onAddClick(e);
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
  onTabMouseEnter = (activityValue: string, e: Event) => {
    const { onTabMouseEnter } = this.props;
    onTabMouseEnter && onTabMouseEnter(activityValue, e);
  };

  onTabMouseLeave = (activityValue: string, e: Event) => {
    const { onTabMouseLeave } = this.props;
    onTabMouseLeave && onTabMouseLeave(activityValue, e);
  };
}

const TargetTabs = ThemeProvider(KeyBoardEventAdaptor(TabsBox), Widget.Tabs);
export default TargetTabs;
