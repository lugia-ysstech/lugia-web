/**
 *
 * create by liangguodong on 2018/9/6
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import Tabpane from './tabpane';
import Widget from '../consts/index';
import { EditEventType, PagedType, TabPositionType, TabType } from '../css/tabs';

import { px2remcss } from '../css/units';
import { computePage, isVertical, matchType, getTextAlign } from './utils';
import { getAttributeFromObject } from '../common/ObjectUtils.js';

import Icon from '../icon';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import { deepMerge } from '@lugia/object-utils';
import { findDOMNode } from 'react-dom';
import get from '../css/theme-common-dict';

const borderColor = '$lugia-dict.@lugia/lugia-web.borderColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const borderSize = '$lugia-dict.@lugia/lugia-web.borderSize';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const xsFontSize = '$lugia-dict.@lugia/lugia-web.xsFontSize';

const ArrowContainer = CSSComponent({
  tag: 'div',
  className: 'BaseLine',
  normal: {
    selectNames: [['color'], ['font']],
  },
  hover: {
    selectNames: [['color'], ['font']],
  },
  disabled: {
    selectNames: [['color'], ['font'], ['cursor']],
    defaultTheme: {
      cursor: 'not-allowed',
    },
  },
  css: css`
    font-size: 1.2rem;
    z-index: 5;
  `,
  option: { hover: true },
});

const HBasePage = CSSComponent({
  extend: ArrowContainer,
  className: 'HBasePage',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    text-align: center;
    width: 24px;
    display: ${props => (props.arrowShow === false ? 'none' : '')};
  `,
});

const VBasePage = CSSComponent({
  extend: ArrowContainer,
  className: 'VBasePage',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    width: 100%;
    text-align: center;
    display: ${props => (props.arrowShow === false ? 'none' : 'block')};
  `,
});

const HTabsContainer = CSSComponent({
  tag: 'div',
  className: 'HTabsContainer',
  normal: {
    selectNames: [['width']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig: { arrowShow, showAddBtn, addSize, isShowArrowIcon } = {} } = themeProps;
      if (arrowShow && isShowArrowIcon) {
        const W = showAddBtn ? (addSize ? addSize + 8 + 'px' : '80px') : '48px';
        return {
          width: `calc( 100% - ${W} )`,
        };
      }
      if (showAddBtn) {
        const W = addSize ? addSize + 8 + 'px' : '30px';
        return {
          width: `calc( 100% - ${W} )`,
        };
      }
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    float: left;
  `,
});

const AddContainer = CSSComponent({
  tag: 'div',
  className: 'AddButton',
  normal: {
    selectNames: [],
    defaultTheme: {
      width: 18,
      height: 18,
      lineHeight: 18,
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      return `line-height: ${height}px`;
    },
    getThemeMeta: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      return {
        lineHeight: height,
      };
    },
  },
  hover: {
    selectNames: [
      ['width'],
      ['height'],
      ['opacity'],
      ['background'],
      ['border'],
      ['boxShadow'],
      ['color'],
      ['fontSize'],
    ],
    defaultTheme: {
      background: {
        color: darkGreyColor,
      },
    },
    getThemeMeta: (theme: Object, themeProps: Object) => {},
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    position: relative;
    text-align: center;
    cursor: pointer;
    margin: 0 5px;
  `,
});

AddContainer.displayName = 'addBtn';

const TabPanBox = StaticComponent({
  tag: 'div',
  className: 'TabPanBox',
  css: css`
    display: flex;
    justify-content: ${props => getTextAlign(props.textAlign)};
  `,
});

const HscrollerContainer = CSSComponent({
  tag: 'div',
  className: 'HscrollerContainer',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
    transition: all 0.5s;
    min-width: 100%;
    transform: translateX(${props => px2remcss(props.x)});
  `,
});

const VTabsContainer = CSSComponent({
  tag: 'div',
  className: 'VTabsContainer',
  normal: {
    selectNames: [['height'], ['border']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig: { arrowShow, isShowArrowIcon } = {} } = themeProps;
      if (arrowShow && isShowArrowIcon) {
        return {
          height: 'calc( 100% - 48px )',
        };
      }
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    height: 100%;
    box-sizing: border-box;
    white-space: nowrap;
    display: inline-block;
    overflow: hidden;
  `,
});

const YscrollerContainer = CSSComponent({
  tag: 'div',
  className: 'YscrollerContainer',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
    transition: all 0.5s;
    transform: translateY(${props => px2remcss(props.y)});
  `,
});

const HTabsOutContainer = CSSComponent({
  tag: 'div',
  className: 'TitleContainer',
  normal: {
    selectNames: [['width'], ['background'], ['textAlign']],
    getThemeMeta: (theme: Object, themeProps: Object) => {
      const { background = { color: '#fff' } } = theme;
      const { propsConfig: { tabType } = {} } = themeProps;
      if (tabType === 'window') {
        return {};
      }
      return { background };
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const { border = {} } = theme;

      const { propsConfig: { tabPosition, tabType } = {} } = themeProps;
      if (tabType === 'window') {
        return '';
      }
      const position = tabPosition === 'bottom' ? 'top' : 'bottom';

      const { [position]: { color = get('superLightColor'), width } = {} } = border || {
        [position]: { color: get('superLightColor'), width: get('borderSize') },
      };
      const resPosition = `${position} : 0 ;height:${width}px;background-color:${color}`;

      return `
              &::before{
               content: '';
                position: absolute;
                ${resPosition};
                left: 0;
                width: 100%;
              }

      `;
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    position: relative;
    z-index: 99;
    overflow: hidden;
    display: flex;
    align-items: center;
  `,
});

const VTabsOutContainer = CSSComponent({
  tag: 'div',
  className: 'TitleContainer',
  normal: {
    selectNames: [['height'], ['background']],
    getCSS(themeMeta, themeProps) {
      const { border = {} } = themeMeta;
      const { propsConfig: { tabPosition } = {} } = themeProps;
      const position = tabPosition === 'right' ? 'left' : 'right';
      const { [position]: { color, width } = {} } = border || {
        [position]: { color: borderColor, width: borderSize },
      };
      const resPosition = `${position} : 0 ;width:${width}px;background-color:${color}`;

      return `&::before{
               content: '';
                position: absolute;
                ${resPosition};
                height: 100%;
              }
      `;
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    position: relative;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    flex: 0 0 auto;
    background: #fff;
  `,
});

type TabsState = {
  activityValue: string,
  data: Array<Object>,
  currentPage: number,
  totalPage: number,
  pagedCount: number,
  arrowShow: boolean,
  allowToCalc: boolean,
  titleSize: Array<number>,
  oldDataLength: number,
  maxIndex: number,
};

type TabsProps = {
  activityValue: string,
  tabPosition?: TabPositionType,
  tabType?: TabType,
  data: Array<Object>,
  showAddBtn?: boolean,
  showDeleteBtn?: boolean,
  pagedType?: PagedType,
  onChange?: Function,
  onTabClick?: Function,
  onPreClick?: Function,
  onNextClick?: Function,
  onAddClick?: Function,
  onDelete?: Function,
  themeProps: Object,
  viewClass?: string,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  getTabpane?: Function,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
  showDividerLine?: boolean,
  addIcon?: string,
  deleteIcon?: string,
  pageArrowIcon?: Object,
  isShowArrowIcon?: boolean,
};

const arrowSize = 48;
const defaultAddSize = 28;

class TabHeader extends Component<TabsProps, TabsState> {
  static defaultProps = {
    tabType: 'line',
    tabPosition: 'top',
    pagedType: 'single',
    defaultData: [],
  };
  scrollBox: any;
  tabPanBox: any;
  titlePanel: any;
  static displayName = Widget.Tabs;
  offsetWidth: number;
  offsetHeight: number;

  constructor(props: TabsProps) {
    super(props);
    this.scrollBox = React.createRef();
    this.tabPanBox = React.createRef();
    this.titlePanel = [];
  }

  static getDerivedStateFromProps(props: TabsProps, state: TabsState) {
    const { activityValue, data } = props;
    const dataLength = data ? data.length : 0;
    let allowToCalc = false;
    let returnData = {};
    if (state) {
      if (dataLength !== state.oldDataLength) {
        allowToCalc = true;
      }
      returnData = {
        data,
        currentPage: state.currentPage,
        totalPage: state.totalPage,
        pagedCount: state.pagedCount,
        arrowShow: state.arrowShow,
        activityValue,
        oldDataLength: dataLength,
        allowToCalc,
        titleSize: state.titleSize,
        maxIndex: state.maxIndex,
      };
    } else {
      returnData = {
        data,
        currentPage: 0,
        totalPage: 1,
        pagedCount: 0,
        arrowShow: false,
        activityValue,
        oldDataLength: dataLength,
        allowToCalc,
        titleSize: [],
        maxIndex: 0,
      };
    }

    return {
      ...returnData,
    };
  }

  componentDidUpdate(nextProps: Object, nextState: Object) {
    const { allowToCalc } = this.state;
    const { activityValue } = this.props;
    const { activityValue: nextActivityValue } = nextProps;
    if (allowToCalc || activityValue !== nextActivityValue) {
      this.matchPage();
    }
  }

  componentDidMount() {
    this.getOffsetSize();
    this.matchPage();
  }
  getOffsetSize() {
    if (this.scrollBox.current) {
      this.offsetWidth = this.scrollBox.current.offsetWidth;
      this.offsetHeight = this.scrollBox.current.offsetHeight;
    }
  }

  matchPage() {
    const titleSize = this.getTabpaneWidthOrHeight();

    const { maxIndex, data, activityValue } = this.state;
    const newMaxIndex = maxIndex ? maxIndex : this.getCurrentMaxIndex(titleSize);
    let { currentPage } = this.state;
    const { tabPosition, pagedType } = this.props;
    let offsetSize;
    if (isVertical(tabPosition)) {
      offsetSize = this.offsetHeight;
    } else {
      offsetSize = this.offsetWidth;
    }
    const actualSize = this.getActualWidthOrHeight();
    const arrowShow = offsetSize < actualSize;
    if (arrowShow) {
      offsetSize = this.getScrollBoxSize(offsetSize);
    }
    const isPageType = pagedType === 'page';
    const totalPage = isPageType ? computePage(offsetSize, actualSize) : titleSize.length;
    const newPage = this.getCurrentPageByActivityValue(data, activityValue, totalPage);
    currentPage =
      !isPageType && this.inSamePageRange({ newPage, oldPage: currentPage, maxIndex })
        ? currentPage
        : newPage;

    this.setState(
      { arrowShow, totalPage, currentPage, titleSize, allowToCalc: false, maxIndex: newMaxIndex },
      () => {
        this.handleChangePage();
      }
    );
  }

  inSamePageRange = (param: Object) => {
    const { newPage, oldPage, maxIndex } = param;
    return newPage < oldPage && newPage >= oldPage - maxIndex;
  };

  getScrollBoxSize = (offsetSize: number) => {
    const { showAddBtn } = this.props;
    const iconSize = showAddBtn ? arrowSize + defaultAddSize : arrowSize;
    return offsetSize - iconSize;
  };

  getCurrentMaxIndex(titleSize: Array<number>) {
    const { tabPosition, tabType } = this.props;
    let maxIndex = 0;
    let distance = 0;
    const offsetSize = isVertical(tabPosition) ? this.offsetHeight : this.offsetWidth;
    const actuallySize = this.getScrollBoxSize(offsetSize);
    const margin = isVertical(tabPosition) || matchType(tabType, 'line') ? 0 : 8;
    titleSize.some((item, index) => {
      distance += item + margin;
      if (distance > actuallySize) {
        maxIndex = index;
        return true;
      }
    });
    return maxIndex;
  }

  getCurrentPageByActivityValue(data: Array<Object>, activityValue: string, totalPage: number) {
    let currentIndex = 0;
    data.some((item, index) => {
      if (item.value === activityValue) {
        currentIndex = index + 1;
        return true;
      }
    });
    return Math.max(Math.ceil(currentIndex / Math.ceil(data.length / totalPage)), 0);
  }

  render() {
    this.titlePanel = [...Array(this.props.data.length)].map(() => React.createRef());
    return <React.Fragment>{this.getTabs()}</React.Fragment>;
  }

  getTabs() {
    const { tabPosition } = this.props;
    if (isVertical(tabPosition)) {
      return this.getVtabs();
    }
    return this.getHorizonTabPan();
  }

  handleBorderStyle(borderThemeProps: Object, tabPosition: TabPositionType, tabType?: TabType) {
    let border;
    if (tabType === 'window') {
      border = null;
    } else {
      const {
        themeConfig: { normal: { color, width, background: { color: bgColor } = {} } = {} } = {},
      } = borderThemeProps;

      const borderColor = bgColor || color || get('superLightColor'),
        borderWidth = width || 1,
        borderStyle = 'solid';

      const style = {
        width: borderWidth,
        color: borderColor,
        style: borderStyle,
      };

      const tabPositionMap = {
        bottom: 'top',
        top: 'bottom',
        right: 'left',
        left: 'right',
      };
      const borderPosition = tabPositionMap[tabPosition];

      border = { [borderPosition]: style };
    }

    const borderTheme = deepMerge(
      { ...this.props.themeProps },
      { themeConfig: { normal: { border } } }
    );
    return { ...borderTheme };
  }

  getVtabs() {
    const { tabPosition, themeProps, isShowArrowIcon } = this.props;
    const { arrowShow } = this.state;
    const borderThemeProps = this.handleBorderStyle(
      this.props.getPartOfThemeProps('BorderStyle'),
      tabPosition
    );
    const tabsThemeProps = this.props.getPartOfThemeProps('TitleContainer');
    const tabsOutContainerThemeProps = deepMerge(tabsThemeProps, borderThemeProps);
    const moveDistance = this.computeMoveDistance();
    const { isDisabledToPrev, isDisabledToNext } = this.getIsAllowToMove();
    themeProps.propsConfig = { arrowShow, isShowArrowIcon };
    tabsOutContainerThemeProps.propsConfig = { tabPosition };

    const prevPageThemeProps = deepMerge(
      { themeConfig: { normal: { height: 24 } } },
      this.props.getPartOfThemeProps('ArrowIcon')
    );
    const IconThemeProps = this.props.getPartOfThemeHocProps('ArrowIcon');
    return (
      <VTabsOutContainer themeProps={tabsOutContainerThemeProps} ref={this.scrollBox}>
        {isShowArrowIcon
          ? this.getPrevOrNextPage(
              'prev',
              prevPageThemeProps,
              IconThemeProps,
              isDisabledToPrev,
              isDisabledToNext
            )
          : null}
        <VTabsContainer themeProps={themeProps}>
          <YscrollerContainer y={moveDistance} themeProps={themeProps} ref={this.tabPanBox}>
            {this.getChildren()}
          </YscrollerContainer>
        </VTabsContainer>
        {isShowArrowIcon
          ? this.getPrevOrNextPage(
              'next',
              prevPageThemeProps,
              IconThemeProps,
              isDisabledToPrev,
              isDisabledToNext
            )
          : null}
      </VTabsOutContainer>
    );
  }

  getPrevOrNextPage(
    type: string,
    themeProps: Object,
    IconThemeProps: Object,
    isDisabledToPrev: boolean,
    isDisabledToNext: boolean
  ) {
    const { arrowShow } = this.state;
    if (!arrowShow) {
      return;
    }
    const { tabPosition } = this.props;
    const { arrowUp, arrowDown } = this.getIconByDirection(tabPosition);
    if (type === 'prev') {
      const Target = isVertical(tabPosition) ? VBasePage : HBasePage;
      return (
        <Target
          themeProps={themeProps}
          tabPosition={tabPosition}
          onClick={this.onPreClick(isDisabledToPrev)}
          {...this.getArrowConfig('pre')}
        >
          <Icon
            {...this.getArrowTheme(IconThemeProps)}
            disabled={isDisabledToPrev}
            iconClass={arrowUp}
            singleTheme
          />
        </Target>
      );
    }

    const Target = isVertical(tabPosition) ? VBasePage : HBasePage;
    return (
      <Target
        themeProps={themeProps}
        {...this.getArrowConfig('next')}
        tabPosition={tabPosition}
        onClick={this.onNextClick(isDisabledToNext)}
      >
        <Icon
          disabled={isDisabledToNext}
          {...this.getArrowTheme(IconThemeProps)}
          iconClass={arrowDown}
          singleTheme
        />
      </Target>
    );
  }

  getIconByDirection(tabPosition: TabPositionType) {
    const { pageArrowIcon: { preIcon, suffixIcon } = {} } = this.props;
    const isVerticalDirection = isVertical(tabPosition);
    const defaultUp = isVerticalDirection ? 'lugia-icon-direction_up' : 'lugia-icon-direction_Left';

    const defaultDown = isVerticalDirection
      ? 'lugia-icon-direction_down'
      : 'lugia-icon-direction_right';
    const arrowUp = preIcon || defaultUp;
    const arrowDown = suffixIcon || defaultDown;
    return { arrowUp, arrowDown };
  }

  getArrowTheme(IconThemeProps: Object) {
    const { viewClass, theme: configTheme } = IconThemeProps;
    const defaultTheme = {
      [viewClass]: {
        normal: {
          color: mediumGreyColor,
          fontSize: xsFontSize,
        },
        hover: {
          color: darkGreyColor,
        },
        disabled: {
          color: disableTextColor,
          cursor: 'not-allowed',
        },
      },
    };
    const theme = deepMerge(defaultTheme, configTheme);

    return { viewClass, theme };
  }

  getArrowConfig(type: EditEventType) {
    const { currentPage, arrowShow, totalPage, pagedCount, titleSize } = this.state;
    const { pagedType } = this.props;
    return {
      type,
      pagedType,
      totalPage,
      currentPage,
      arrowShow,
      pagedCount,
      titleSize,
    };
  }

  handleChangePage = (type: EditEventType) => {
    let { currentPage, totalPage, pagedCount } = this.state;
    currentPage = this.getPagedCount(currentPage, totalPage, type);
    this.setState({ currentPage, pagedCount });
  };

  getPagedCount(currentPage: number, totalPage: number, type: EditEventType) {
    if (matchType(type, 'next')) {
      currentPage++;
    } else if (matchType(type, 'pre')) {
      currentPage--;
    }
    return Math.max(Math.min(currentPage, totalPage), 0);
  }

  getHorizonTabPan() {
    const { tabType, tabPosition, themeProps, showAddBtn, isShowArrowIcon } = this.props;
    const { arrowShow } = this.state;

    const tabsThemeProps = this.props.getPartOfThemeProps('TitleContainer', {
      props: { tabType, tabPosition },
    });

    const borderThemeProps = this.handleBorderStyle(
      this.props.getPartOfThemeProps('BorderStyle'),
      tabPosition,
      tabType
    );

    const tabsOutContainerThemeProps = deepMerge(tabsThemeProps, borderThemeProps);
    let addSize = 0;
    if (showAddBtn) {
      const addBtnThemeProps = this.props.getPartOfThemeProps('AddButton');
      const { themeConfig: { normal } = {} } = addBtnThemeProps;
      if (normal) {
        const { width } = normal;
        addSize = width ? width : addSize;
      }
    }
    themeProps.propsConfig = { arrowShow, showAddBtn, addSize, isShowArrowIcon };
    const moveDistance = this.computeMoveDistance();

    const { isDisabledToPrev, isDisabledToNext } = this.getIsAllowToMove();

    const prevPageThemeProps = deepMerge(
      { themeConfig: { normal: { height: 32 } } },
      this.props.getPartOfThemeProps('ArrowIcon')
    );
    const IconThemeProps = this.props.getPartOfThemeHocProps('ArrowIcon');
    const { themeConfig: { normal: { textAlign = 'left' } = {} } = {} } = tabsThemeProps;
    return (
      <HTabsOutContainer
        themeProps={tabsOutContainerThemeProps}
        tabType={tabType}
        tabPosition={tabPosition}
        ref={this.scrollBox}
      >
        {isShowArrowIcon
          ? this.getPrevOrNextPage(
              'prev',
              prevPageThemeProps,
              IconThemeProps,
              isDisabledToPrev,
              isDisabledToNext
            )
          : null}
        <HTabsContainer themeProps={themeProps}>
          <HscrollerContainer themeProps={themeProps} x={moveDistance} ref={this.tabPanBox}>
            <TabPanBox textAlign={textAlign}>{this.getChildren()}</TabPanBox>
          </HscrollerContainer>
        </HTabsContainer>
        {isShowArrowIcon
          ? this.getPrevOrNextPage(
              'next',
              prevPageThemeProps,
              IconThemeProps,
              isDisabledToPrev,
              isDisabledToNext
            )
          : null}
        {this.getAddButton()}
      </HTabsOutContainer>
    );
  }

  getChildren(): React$Node {
    const { data } = this.state;
    const { getTabpane } = this.props;
    return data
      ? data.map((child: Object, index: number) => {
          const Target = (
            <Tabpane
              ref={node => (this.titlePanel[index] = node)}
              {...this.props}
              {...this.getTabpaneConfig(child, index)}
              onClick={this.onTabClick(child)}
              onDelete={this.onDeleteClick(child)}
            />
          );
          return getTabpane ? getTabpane(Target, index) : Target;
        })
      : '';
  }

  getAddButton() {
    const { showAddBtn, themeProps, addIcon } = this.props;
    if (showAddBtn) {
      const { theme: addBtnThemeProps, viewClass } = this.props.getPartOfThemeHocProps('AddButton');
      const defaultIconTheme = {
        [viewClass]: {
          normal: {
            color: mediumGreyColor,
            fontSize: xsFontSize,
          },
          hover: {
            color: darkGreyColor,
          },
          disabled: {
            cursor: 'not-allowed',
            color: disableTextColor,
          },
        },
      };
      const iconTheme = deepMerge(defaultIconTheme, addBtnThemeProps);
      return (
        <AddContainer themeProps={themeProps} onClick={this.onAddClick}>
          <Icon iconClass={addIcon} theme={iconTheme} viewClass={viewClass} singleTheme />
        </AddContainer>
      );
    }
    return null;
  }

  onAddClick = (e: Event) => {
    const { onAddClick } = this.props;
    onAddClick && onAddClick(e);
  };

  getTabpaneConfig(child: React$Element<any>, i: number) {
    const { tabPosition, tabType } = this.props;
    let { showDeleteBtn } = this.props;
    const { activityValue } = this.state;
    const hideCloseBtn = getAttributeFromObject(
      child,
      'hideCloseBtn',
      getAttributeFromObject(child.props, 'hideCloseBtn', false)
    );
    const onMouseEnter = getAttributeFromObject(
      child,
      'onMouseEnter',
      getAttributeFromObject(child.props, 'onMouseEnter', false)
    );

    showDeleteBtn =
      !hideCloseBtn &&
      (showDeleteBtn ||
        getAttributeFromObject(
          child,
          'showDeleteBtn',
          getAttributeFromObject(child.props, 'showDeleteBtn', false)
        ));
    const disabled = getAttributeFromObject(
      child,
      'disabled',
      getAttributeFromObject(child.props, 'disabled', false)
    );
    const value = getAttributeFromObject(
      child,
      'value',
      getAttributeFromObject(child.props, 'value', false)
    );
    const tabHeaderTheme = this.props.getPartOfThemeHocProps('TabHeader');
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

      activityValue,
      keyVal: value,
      index: i,
      showDeleteBtn,
      isSelect: !disabled && activityValue === value,
      onMouseEnter,
      disabled,
      ...tabHeaderTheme,
    };
  }

  getTabpaneWidthOrHeight = () => {
    const { tabPosition } = this.props;
    return this.titlePanel.map(item => {
      let offsetSize = 0;
      if (item) {
        const tabPan = findDOMNode(item.getThemeTarget());
        if (!tabPan) {
          return offsetSize;
        }
        if (isVertical(tabPosition)) {
          offsetSize = tabPan.offsetHeight;
        } else {
          offsetSize = tabPan.offsetWidth;
        }
      }
      return offsetSize;
    });
  };

  computeMoveDistance() {
    const { currentPage, titleSize } = this.state;
    const { pagedType, tabPosition } = this.props;
    const actualSize = this.getActualWidthOrHeight();
    this.getOffsetSize();
    const offsetSize = isVertical(tabPosition) ? this.offsetHeight : this.offsetWidth;
    if (actualSize <= offsetSize) {
      return 0;
    }
    let distance = 0;

    switch (pagedType) {
      case 'single':
        const maxIndex = this.getCurrentMaxIndex(titleSize);
        const length = currentPage - maxIndex;
        for (let i = 1; i < length; i++) {
          distance += titleSize[Math.min(maxIndex + i, titleSize.length - 1)];
        }
        break;
      case 'page':
        const scrollBoxSize = this.getScrollBoxSize(offsetSize);
        distance = scrollBoxSize * Math.max(currentPage - 1, 0);
        break;
      default:
        break;
    }
    return -distance;
  }

  getIsAllowToMove() {
    const { currentPage, maxIndex, totalPage } = this.state;
    const { pagedType } = this.props;
    const isDisabledToNext = currentPage >= totalPage;
    const isDisabledToPrev = pagedType === 'page' ? currentPage <= 1 : currentPage <= maxIndex;
    return { isDisabledToPrev, isDisabledToNext };
  }

  getActualWidthOrHeight() {
    const { tabPosition } = this.props;
    let actualSize = 0;
    if (this.tabPanBox.current) {
      const { offsetHeight, offsetWidth } = this.tabPanBox.current;
      actualSize = isVertical(tabPosition) ? offsetHeight : offsetWidth;
    }

    return actualSize;
  }

  onTabClick = (currentItem: Object) => (res: Object) => {
    const { index } = res;
    if (this.isTabpaneDisabled(index)) {
      return;
    }
    const { onTabClick } = this.props;
    const { activityValue } = this.state;
    const { activityValue: newActivityValue } = res;
    const oldItem = this.getItemWithValue(activityValue);
    const returnItems = {
      ...res,
      oldItem,
      newItem: currentItem,
      newValue: newActivityValue,
      oldValue: activityValue,
    };
    onTabClick && onTabClick({ ...returnItems });

    if (activityValue === newActivityValue) {
      return;
    }
    const { onChange } = this.props;

    onChange && onChange({ ...returnItems });
  };

  getItemWithValue = (value: string) => {
    const { data } = this.props;
    return data.find(currentItem => {
      const { value: currentValue } = currentItem;
      return currentValue === value;
    }, value);
  };

  onDeleteClick = (currentItem: Object) => (res: Object) => {
    const { index, activityValue } = res;
    if (this.isTabpaneDisabled(index)) {
      return;
    }
    const { onDelete } = this.props;
    onDelete && onDelete({ ...res, item: currentItem, value: activityValue });
  };

  isTabpaneDisabled(index: number) {
    const { data } = this.state;
    if (index) {
      return data[index] && data[index].disabled;
    }
    return false;
  }

  createNativeClick = (eventName: 'onNextClick' | 'onPreClick', type: EditEventType) => (
    e: Event
  ) => {
    const { [eventName]: click } = this.props;
    this.handleChangePage(type);
    click && click(e);
  };

  onNextClick = (isAllowToNext: boolean) => {
    if (isAllowToNext) {
      return;
    }
    return this.createNativeClick('onNextClick', 'next');
  };
  onPreClick = (isAllowToPrev: boolean) => {
    if (isAllowToPrev) {
      return;
    }
    return this.createNativeClick('onPreClick', 'pre');
  };
}

export default TabHeader;
