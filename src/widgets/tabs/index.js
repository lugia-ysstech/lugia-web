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
import type { TabPositionType, TabType, EditType, PagingType } from '../css/tabs';
import {
  backgroundColor,
  getBackgroundShadow,
  getSelectColor,
  getContainerBorder,
  getLinePosition,
  hContainerHeight,
  hContainerWidth,
  lineWidth,
  vContainerHeight,
  getAddHoverBackground,
  getAddBackground,
  getAddRadius,
  getAddTop,
  getAddRight,
  getAddButtonDisplay,
  getAddButtonBottom,
  getArrowTop,
  getAddButtonShow,
  getTabpaneBorder,
  getCursor,
  addButtonSize,
  cardBorderAndMarginWidth,
  windowMarginLeft,
  arrowContainerWidth,
  yTabsHeight,
} from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import { isVertical, plusWidth, computePage, matchTab } from './utils';
import { getAttributeFromObject } from '../common/ObjectUtils.js';

import Icon from '../icon';
import { getIndexfromKey } from '../common/ObjectUtils';

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
  height: ${em(yTabsHeight)};
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
  width: ${em(addButtonSize)};
  height: ${em(addButtonSize)};
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
const AddButton: Object = styled(Icon)`
  position: relative;
  transition: all 0.3s linear 0.1s;
  font-size: 1rem;
  ${getAddButtonBottom};
  ${getAddButtonShow};
  ${getAddButtonDisplay};
`;
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

type TabsState = {|
  activityKey: string,
  data: Array<Object>,
  currentPage: number,
  totalPage: number,
  clickCount: number,
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
  onPrevClick: Function,
  children: React$Element<any>,
  data: Array<Object>,
  defaultData: Array<Object>,
  forceRender: boolean,
  getTheme: Function,
  onDeleteClick: Function,
  onAddClick: Function,
  pagingType: PagingType,
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
        clickCount: -1,
        arrowShow: false,
        addButtonShow: false,
        childrenSize: [],
      };
    }
    if (hasActivityKeyInprops) {
      return { activityKey };
    }
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
  getArrowConfig(type: EditType) {
    const { currentPage, arrowShow, totalPage, clickCount, childrenSize } = this.state;
    const { pagingType } = this.props;
    return {
      type,
      pagingType,
      totalPage,
      currentPage,
      arrowShow,
      clickCount,
      childrenSize,
    };
  }
  getVtabs() {
    const { tabPosition } = this.props;
    const { data, activityKey } = this.state;
    return (
      <VTabsOutContainer tabPosition={tabPosition}>
        <VPrePage
          tabPosition={tabPosition}
          onClick={this.onPrevClick}
          {...this.getArrowConfig('pre')}
        >
          <PageIcon iconClass="lugia-icon-direction_up" {...this.getArrowConfig('pre')} />
        </VPrePage>
        <VTabsContainer>
          <YscrollerContainer>
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
          <PageIcon iconClass="lugia-icon-direction_down" {...this.getArrowConfig('next')} />
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
    if (matchTab(tabType, 'window')) {
      return <ShadowLine tabType={tabType} />;
    }
    return null;
  }

  getHline() {
    const { tabType, tabPosition } = this.props;
    const { activityKey, data, childrenSize } = this.state;
    if (matchTab(tabType, 'line')) {
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
    const { tabType } = this.props;
    return [
      <HPrePage {...this.getArrowConfig('pre')} onClick={this.onPrevClick} tabType={tabType}>
        <PageIcon iconClass="lugia-icon-direction_Left" {...this.getArrowConfig('pre')} />
      </HPrePage>,
      <HTabsContainer tabType={tabType}>
        <HscrollerContainer tabType={tabType} x={this.computePagingX()}>
          {this.getChildren()}
          {this.getAddButton()}
          {this.getHline()}
        </HscrollerContainer>
      </HTabsContainer>,
      <HNextPage {...this.getArrowConfig('next')} onClick={this.onNextClick} tabType={tabType}>
        <PageIcon iconClass="lugia-icon-direction_right" {...this.getArrowConfig('next')} />
      </HNextPage>,
    ];
  }

  getAddButton() {
    const { tabType } = this.props;
    const { addButtonShow } = this.state;
    if (!matchTab(tabType, 'line')) {
      return (
        <AddOutContainer tabType={tabType}>
          <AddContainer
            tabType={tabType}
            onClick={this.onAddClick}
            onMouseEnter={this.addButtonMouseEnter}
            onMouseLeave={this.addButtonMouseLeave}
          >
            <AddButton
              tabType={tabType}
              iconClass="lugia-icon-reminder_plus"
              show={addButtonShow}
            />
          </AddContainer>
        </AddOutContainer>
      );
    }
    return null;
  }
  componentWillMount() {}

  componentDidUpdate(props, preState) {
    const { data } = this.state;
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

    const actualWidth = matchTab(tabType, 'window')
      ? width + 6 + addButtonSize
      : matchTab(tabType, 'card')
        ? width + childrenSize.length * 4 + addButtonSize + 4
        : width;
    const actualHeight = data.length * yTabsHeight;
    const totalPage = isVertical(tabPosition)
      ? computePage(this.offsetHeight - arrowContainerWidth, actualHeight)
      : computePage(this.offsetWidth - arrowContainerWidth, actualWidth);
    const arrowShow = totalPage > 1 && currentPage <= totalPage;
    this.setState({ arrowShow, totalPage });
  }

  computePagingX() {
    const { currentPage, totalPage, clickCount, childrenSize } = this.state;
    const { tabType } = this.props;
    let x = totalPage > 1 ? (1 - currentPage) * (this.offsetWidth - arrowContainerWidth) : 0;

    if (clickCount >= 0) {
      if (matchTab(tabType, 'card')) {
        x =
          -1 * (plusWidth(clickCount, childrenSize) + cardBorderAndMarginWidth * (clickCount + 1));
        console.log('card', x);
      } else if (matchTab(tabType, 'window')) {
        x = -1 * (plusWidth(clickCount, childrenSize) + windowMarginLeft);
      } else {
        x = -1 * plusWidth(clickCount, childrenSize);
      }
    }
    return x;
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
    const { forceRender, tabPosition } = this.props;
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
          return <TabContent content={content} tabPosition={tabPosition} />;
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
    let { data, childrenSize } = this.state;

    if (data.length > 1) {
      let delIndex = 0;
      data = data.filter((tabpane, i) => {
        if (tabpane.activityKey !== activityKey) return true;
        delIndex = i;
        return false;
      });
      childrenSize.splice(delIndex, 1);
      this.setState({
        data,
        childrenSize,
      });
    }
    onDeleteClick && onDeleteClick();
  };
  onAddClick = (e: Event) => {
    const { onAddClick } = this.props;
    const { data } = this.state;
    const activityKey = `tab${data.length + 1}`;
    const title = 'new Tab';
    const newdata = [...data];
    newdata.push({ title, content: 'new Tab content', activityKey });
    this.setState({
      data: newdata,
    });
    onAddClick && onAddClick(e);
  };
  getTabpaneWidth = (width: number) => {
    const { childrenSize } = this.state;
    const newchildrenSize = childrenSize;
    newchildrenSize.push(width);
    this.setState({ childrenSize: newchildrenSize });
  };

  createNativeClick = (eventName: 'onNextClick' | 'onPrevClick', type: EditType) => e => {
    const { [eventName]: click } = this.props;
    this.handleChangePage(type);
    click && click(e);
  };

  onNextClick = this.createNativeClick('onNextClick', 'next');
  onPrevClick = this.createNativeClick('onPrevClick', 'pre');

  handleChangePage = (type: EditType) => {
    let { currentPage, totalPage, clickCount, childrenSize } = this.state;
    const { pagingType } = this.props;
    if (pagingType === 'page') {
      if (type === 'next' && currentPage < totalPage) {
        currentPage++;
      } else if (type === 'pre' && currentPage >= 2) {
        currentPage--;
      }
    } else {
      if (type === 'next' && clickCount < childrenSize.length - 1) {
        clickCount++;
      } else if (type === 'pre' && clickCount >= 0) {
        clickCount--;
      }
    }
    this.setState({ currentPage, clickCount });
  };
}

const TargetTabs = ThemeProvider(KeyBoardEventAdaptor(TabsBox), Widget.Tabs);
export default TargetTabs;
