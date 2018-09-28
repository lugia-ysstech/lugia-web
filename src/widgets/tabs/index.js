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
} from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import { isVertical, plusWidth } from './utils';
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
  onNextClick: Function,
  onPrevClick: Function,
  children: React$Element<any>,
  data: Array<Object>,
  defaultData: Array<Object>,
  tab: string,
  forceRender: boolean,
  getTheme: Function,
  onDeleteClick: Function,
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
  childrenSize: Array<number>;
  totalPage: number;

  constructor(props: TabsProps) {
    super(props);
    this.containerRef = React.createRef();
    this.childrenSize = [];
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
    const { tabPosition, getTheme } = this.props;
    const { activityKey, currentPage, arrowShow } = this.state;
    const config = {
      width: this.getContainerSize('width'),
      height: this.getContainerSize('height'),
    };
    const theme = { [Widget.TabsContainer]: config };

    const y = (currentPage - 1) * this.offsetHeight * -1 + (currentPage - 1) * 40;
    if (isVertical(tabPosition)) {
      return (
        <Theme config={theme}>
          <OutContainer theme={getTheme()} innerRef={cmp => (this.containerRef = cmp)}>
            <VTabsOutContainer tabPosition={tabPosition}>
              <VPrePage tabPosition={tabPosition} onClick={this.onPrevClick} arrowShow={arrowShow}>
                <PageIcon iconClass="lugia-icon-direction_up" />
              </VPrePage>
              <VTabsContainer>
                <YscrollerContainer y={y}>
                  <VLine y={activityKey * 100} tabPosition={tabPosition} />
                  {this.getChildren()}
                </YscrollerContainer>
              </VTabsContainer>
              <VNextPage tabPosition={tabPosition} onClick={this.onNextClick} arrowShow={arrowShow}>
                <PageIcon iconClass="lugia-icon-direction_down" />
              </VNextPage>
            </VTabsOutContainer>
            {this.getChildrenContent()}
          </OutContainer>
        </Theme>
      );
    }
    return <Theme config={theme}>{this.getHTabs()}</Theme>;
  }

  getHTabs() {
    const { tabType, getTheme, tabPosition } = this.props;
    return (
      <OutContainer theme={getTheme()} innerRef={cmp => (this.containerRef = cmp)}>
        <HTabsOutContainer tabType={tabType} tabPosition={tabPosition}>
          {this.getHtabsChildren()}
          {this.getShadowLine()}
        </HTabsOutContainer>
        {this.getChildrenContent()}
      </OutContainer>
    );
  }

  getShadowLine() {
    const { tabType } = this.props;
    if (matchTabType(tabType, 'card')) {
      return <ShadowLine tabType={tabType} />;
    }
    return null;
  }

  getHline() {
    const { tabType, tabPosition } = this.props;
    const { activityKey, currentPage } = this.state;
    if (matchTabType(tabType, 'line')) {
      return (
        <HLine
          lineWidth={this.childrenSize[activityKey]}
          x={plusWidth(activityKey - 1, this.childrenSize) + 20 * currentPage}
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
          {this.getHline()}
        </HscrollerContainer>
      </HTabsContainer>,
      <HNextPage arrowShow={arrowShow} onClick={this.onNextClick}>
        <PageIcon iconClass="lugia-icon-direction_right" />
      </HNextPage>,
    ];
  }

  componentDidMount() {
    this.getContainerSize('width');
    this.getContainerSize('height');
    this.matchPage();
  }

  componentDidUpdate(props, preState, snapshot) {
    if (preState.data !== this.state.data) {
      this.matchPage();
    }
  }

  matchPage() {
    const { currentPage } = this.state;
    const { tabPosition } = this.props;
    const actualWidth = plusWidth(this.childrenSize.length - 1, this.childrenSize);
    const actualHeight = this.childrenSize.length * 32;
    let arrowShow;
    if (isVertical(tabPosition)) {
      this.totalPage = this.computePage(this.offsetHeight, actualHeight);
      arrowShow = currentPage < this.totalPage;
    } else {
      this.totalPage = this.computePage(this.offsetWidth, actualWidth);
      arrowShow = currentPage < this.totalPage;
    }
    this.setState({ arrowShow, currentPage });
  }

  computePage(offset, actualSize) {
    const dataTotalSize = offset - 2 * 16;
    const totalPage = Math.ceil(actualSize / dataTotalSize);
    return totalPage;
  }

  getContainerSize(type: string) {
    if (this.containerRef) {
      const { getTheme } = this.props;
      const { width, height } = getTheme();
      if (type === 'width') {
        this.offsetWidth = this.containerRef.offsetWidth;
        return width ? width : this.offsetWidth;
      }
      this.offsetHeight = this.containerRef.offsetHeight;
      return height ? height : this.offsetHeight;
    }
  }

  getConfig(child: React$Element<any>) {
    const { tabPosition, tabType } = this.props;
    const { activityKey } = this.state;
    return {
      tabPosition,
      tabType,
      title:
        getAttributeFromObject(child, 'title', '') !== ''
          ? getAttributeFromObject(child, 'title', '')
          : getAttributeFromObject(child.props, 'title', ''),
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
          : getAttributeFromObject(child.props, 'activityKey', 0)) === activityKey,
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
        const childActivityKey =
          child.activityKey !== undefined ? child.activityKey : child.props.activityKey;
        if (forceRender || childActivityKey === activityKey) {
          const content = child.content !== undefined ? child.content : child.props.content;
          return this.getContent(content);
        }
      });
    }
    return null;
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
  onDeleteClick = (e: Event, index: number) => {
    const { onDeleteClick } = this.props;
    let { data } = this.state;
    if (data.length > 1) {
      data = data.filter(tabpane => tabpane.activityKey !== index);
      setTimeout(() => {
        this.setState({
          data,
        });
      }, 100);
    }
    onDeleteClick && onDeleteClick(index);
  };
  getTabpaneWidth = (width: number) => {
    this.childrenSize.push(width);
  };

  onNextClick = this.createNativeClick('onNextClick', 'next');
  onPrevClick = this.createNativeClick('onPrevClick', 'pre');

  createNativeClick = (evnetName: 'onNextClick' | 'onPrevClick', type: EditType) => e => {
    const { [evnetName]: click } = this.props;
    this.handleChangePage(type);
    click && click(e);
  };

  handleChangePage = (type: EditType) => {
    let { currentPage } = this.state;
    if (type === 'next' && currentPage < this.totalPage) {
      currentPage++;
    } else if (type === 'pre' && currentPage > 1) {
      currentPage--;
    }
    this.setState({ currentPage });
  };
}

const TargetTabs = ThemeProvider(KeyBoardEventAdaptor(TabsBox), Widget.Tabs);
export default TargetTabs;
