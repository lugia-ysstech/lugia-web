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
import {
  AddButtonSize,
  CardBorderAndMarginWidth,
  CardMarginRight,
  WindowMarginLeft,
} from '../css/tabs';

import { px2remcss } from '../css/units';
import { computePage, isVertical, matchType, plusWidth } from './utils';
import { getAttributeFromObject } from '../common/ObjectUtils.js';

import Icon from '../icon';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import { deepMerge } from '@lugia/object-utils';
import colorsFunc from '../css/stateColor';
import { getBorder } from '@lugia/theme-utils';
import { findDOMNode } from 'react-dom';

const { superLightColor } = colorsFunc();

const ArrowContainer = CSSComponent({
  tag: 'div',
  className: 'BaseLine',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    font-size: 1.2rem;
    z-index: 5;
  `,
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
    transform: translateY(50%);
    display: ${props => (props.arrowShow === false ? 'none' : 'block')};
  `,
});

const HPrePage = CSSComponent({
  extend: HBasePage,
  className: 'HPrePage',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    float: left;
  `,
});

const HNextPage = CSSComponent({
  extend: HBasePage,
  className: 'HNextPage',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    float: right;
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

const VPrePage = CSSComponent({
  extend: VBasePage,
  className: 'VPrePage',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
});

const VNextPage = CSSComponent({
  extend: VBasePage,
  className: 'VNextPage',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
});

const HTabsContainer = CSSComponent({
  tag: 'div',
  className: 'HTabsContainer',
  normal: {
    selectNames: [['width']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig: { arrowShow, showAddBtn, addSize } = {} } = themeProps;
      if (arrowShow) {
        const W = showAddBtn ? (addSize ? addSize + 8 + 'px' : '80px') : '70px';
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
      width: 18,
      height: 18,
      border: getBorder({ color: superLightColor, width: 1, style: 'solid' }),
      background: {
        color: '#f8f8f8',
      },
      lineHeight: 18,
      borderRadius: '4px',
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
        color: '#999',
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
    float: right;
    margin: 5px;
    transform: translateY(25%);
  `,
});

AddContainer.displayName = 'addBtn';

const HscrollerContainer = CSSComponent({
  tag: 'div',
  className: 'HscrollerContainer',
  normal: {
    selectNames: [['border']],
    getThemeMeta: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { tabPosition, tabType },
      } = themeProps;
      const color = '#e8e8e8',
        width = 1;
      let border = { bottom: { width, color, style: 'solid' } };
      if (tabPosition === 'bottom') {
        border = { top: { width, color, style: 'solid' } };
      }
      if (tabType === 'window') {
        border = { bottom: { width: 0, color: 'transparent', style: 'solid' } };
      }
      return { border };
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
    transition: all 0.5s;
    transform: translateX(${props => px2remcss(props.x)});
  `,
});

const VTabsContainer = CSSComponent({
  tag: 'div',
  className: 'VTabsContainer',
  normal: {
    selectNames: [['height']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig: { arrowShow } = {} } = themeProps;
      if (arrowShow) {
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
    selectNames: [['border']],
    getThemeMeta: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { tabPosition },
      } = themeProps;
      const color = '#e8e8e8',
        width = 1;
      let border = { left: { width, color, style: 'solid' } };
      if (tabPosition === 'left') {
        border = { right: { width, color, style: 'solid' } };
      }
      return { border };
    },
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
    selectNames: [['width']],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    position: relative;
    z-index: 99;
    overflow: hidden;
  `,
});

const VTabsOutContainer = CSSComponent({
  tag: 'div',
  className: 'TitleContainer',
  normal: {
    selectNames: [['height']],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    float: left;
  `,
});

type TabsState = {
  activityValue: number,
  data: Array<Object>,
  currentPage: number,
  totalPage: number,
  pagedCount: number,
  arrowShow: boolean,
  allowToCalc: boolean,
  titleSize: Array<number>,
  oldDataLength: number,
};

type TabsProps = {
  activityValue: number,
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
};

class TabHeader extends Component<TabsProps, TabsState> {
  static defaultProps = {
    tabType: 'line',
    tabPosition: 'top',
    pagedType: 'single',
    defaultData: [],
  };
  scrollBox: any;
  titlePanel: any;
  static displayName = Widget.Tabs;
  offsetWidth: number;
  offsetHeight: number;

  constructor(props: TabsProps) {
    super(props);
    this.scrollBox = React.createRef();
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
      };
    }

    return {
      ...returnData,
    };
  }

  componentDidUpdate(nextProps: Object, nextState: Object) {
    const { allowToCalc } = this.state;
    if (allowToCalc) {
      this.matchPage();
    }
  }

  componentDidMount() {
    if (this.scrollBox) {
      this.offsetWidth = this.scrollBox.current.offsetWidth;
      this.offsetHeight = this.scrollBox.current.offsetHeight;
    }
    this.matchPage();
  }

  matchPage() {
    const titleSize = this.getTabpaneWidthOrHeight();
    const { currentPage } = this.state;
    const { tabPosition, tabType } = this.props;
    let totalPage;
    if (isVertical(tabPosition)) {
      const actualHeight = this.getActualWidth('line', titleSize);
      totalPage = computePage(this.offsetHeight, actualHeight);
    } else {
      const actualWidth = this.getActualWidth(tabType, titleSize);
      totalPage = computePage(this.offsetWidth, actualWidth);
    }
    const arrowShow = totalPage > 1 && currentPage < totalPage;
    this.setState({ arrowShow, totalPage, titleSize, allowToCalc: false });
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

  getVtabs() {
    const { tabPosition, themeProps } = this.props;
    const { totalPage, arrowShow } = this.state;
    const borderThemeProps = this.props.getPartOfThemeProps('BorderStyle');
    borderThemeProps.propsConfig = { tabPosition };
    const tabsThemeProps = this.props.getPartOfThemeProps('TitleContainer');
    const moveDistance = this.computeMoveDistance();
    const { isDisabledToPrev, isDisabledToNext } = this.getIsAllowToMove(moveDistance);
    themeProps.propsConfig = { arrowShow };

    const prevPageThemeProps = deepMerge(
      { themeConfig: { normal: { height: 24 } } },
      this.props.getPartOfThemeProps('DefaultTabPan')
    );

    return (
      <VTabsOutContainer
        themeProps={tabsThemeProps}
        tabPosition={tabPosition}
        showPadding={totalPage > 1}
      >
        {this.getPrevOrNextPage('prev', prevPageThemeProps, isDisabledToPrev, isDisabledToNext)}
        <VTabsContainer themeProps={themeProps} ref={this.scrollBox}>
          <YscrollerContainer y={moveDistance} themeProps={borderThemeProps}>
            {this.getChildren()}
          </YscrollerContainer>
        </VTabsContainer>
        {this.getPrevOrNextPage('next', prevPageThemeProps, isDisabledToPrev, isDisabledToNext)}
      </VTabsOutContainer>
    );
  }

  getPrevOrNextPage(
    type: string,
    themeProps: Object,
    isDisabledToPrev: boolean,
    isDisabledToNext: boolean
  ) {
    const { arrowShow } = this.state;
    if (!arrowShow) {
      return;
    }
    const { tabPosition } = this.props;
    if (type === 'prev') {
      const arrowUp = isVertical(tabPosition)
        ? 'lugia-icon-direction_up'
        : 'lugia-icon-direction_Left';
      const Target = isVertical(tabPosition) ? VPrePage : HPrePage;
      return (
        <Target
          themeProps={themeProps}
          tabPosition={tabPosition}
          onClick={this.onPreClick(isDisabledToPrev)}
          {...this.getArrowConfig('pre')}
        >
          <Icon disabled={isDisabledToPrev} iconClass={arrowUp} />
        </Target>
      );
    }

    const arrowDown = isVertical(tabPosition)
      ? 'lugia-icon-direction_down'
      : 'lugia-icon-direction_right';
    const Target = isVertical(tabPosition) ? VNextPage : HNextPage;
    return (
      <Target
        themeProps={themeProps}
        {...this.getArrowConfig('next')}
        tabPosition={tabPosition}
        onClick={this.onNextClick(isDisabledToNext)}
      >
        <Icon disabled={isDisabledToNext} themeProps={themeProps} iconClass={arrowDown} />
      </Target>
    );
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
    let { currentPage, totalPage, pagedCount, titleSize } = this.state;
    const { pagedType } = this.props;
    if (pagedType === 'page') {
      currentPage = this.getPagedCount(currentPage, totalPage, type);
    } else {
      pagedCount = this.getPagedCount(pagedCount, titleSize.length, type);
    }

    this.setState({ currentPage, pagedCount });
  };

  getPagedCount(currentPage: number, totalPage: number, type: EditEventType) {
    if (matchType(type, 'next')) {
      currentPage++;
    } else if (matchType(type, 'pre')) {
      currentPage--;
    }
    return Math.max(Math.min(currentPage, totalPage - 1), 0);
  }

  getHorizonTabPan() {
    const { tabType, tabPosition, themeProps, showAddBtn } = this.props;
    const { totalPage, arrowShow } = this.state;

    const borderThemeProps = this.props.getPartOfThemeProps('BorderStyle', {
      props: { tabPosition, tabType },
    });
    const tabsThemeProps = this.props.getPartOfThemeProps('TitleContainer');

    let addSize = 0;
    if (showAddBtn) {
      const addBtnThemeProps = this.props.getPartOfThemeProps('AddButton');
      const { themeConfig: { normal: { width } } = {} } = addBtnThemeProps;
      addSize = width ? width : addSize;
    }
    themeProps.propsConfig = { arrowShow, showAddBtn, addSize };
    const moveDistance = this.computeMoveDistance();

    const { isDisabledToPrev, isDisabledToNext } = this.getIsAllowToMove(moveDistance);

    const prevPageThemeProps = deepMerge(
      { themeConfig: { normal: { height: 31 } } },
      this.props.getPartOfThemeProps('DefaultTabPan')
    );
    return (
      <HTabsOutContainer
        themeProps={tabsThemeProps}
        tabType={tabType}
        tabPosition={tabPosition}
        showPadding={totalPage > 1}
      >
        {this.getPrevOrNextPage('prev', prevPageThemeProps, isDisabledToPrev, isDisabledToNext)}
        <HTabsContainer themeProps={themeProps} ref={this.scrollBox}>
          <HscrollerContainer themeProps={borderThemeProps} x={moveDistance}>
            {this.getChildren()}
          </HscrollerContainer>
        </HTabsContainer>
        {this.getAddButton()}
        {this.getPrevOrNextPage('next', prevPageThemeProps, isDisabledToPrev, isDisabledToNext)}
      </HTabsOutContainer>
    );
  }

  getChildren() {
    const { data } = this.state;
    const { getTabpane } = this.props;
    return data
      ? data.map((child: Object, index: number) => {
          const Target = (
            <Tabpane
              ref={node => (this.titlePanel[index] = node)}
              {...this.props}
              {...this.getTabpaneConfig(child, index)}
            />
          );
          return getTabpane ? getTabpane(Target, index) : Target;
        })
      : '';
  }

  getAddButton() {
    const { tabType, showAddBtn } = this.props;
    const add = 'lugia-icon-reminder_plus';
    if (!matchType(tabType, 'line') && showAddBtn) {
      const addBtnthemeProps = this.props.getPartOfThemeProps('AddButton');
      return (
        <AddContainer themeProps={addBtnthemeProps} onClick={this.onAddClick}>
          <Icon iconClass={add} />
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
    const { tabPosition, tabType, showDeleteBtn } = this.props;
    const { activityValue } = this.state;
    const disabled = getAttributeFromObject(
      child,
      'disabled',
      getAttributeFromObject(child.props, 'disabled', false)
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
      onClick: this.onTabClick,
      activityValue,
      index: i,
      showDeleteBtn,
      isSelect: !disabled && activityValue === i,
      onDelete: this.onDeleteClick,
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
    const { currentPage, totalPage, pagedCount, titleSize } = this.state;
    const { tabType, tabPosition } = this.props;
    const currentTabsWidth = plusWidth(pagedCount - 1, titleSize);
    const scrollDistance = isVertical(tabPosition) ? this.offsetHeight : this.offsetWidth;
    let distance = totalPage > 1 ? currentPage * scrollDistance : 0;

    if (pagedCount > 0) {
      if (matchType(tabType, 'card')) {
        distance = currentTabsWidth + CardBorderAndMarginWidth * pagedCount;
      } else if (matchType(tabType, 'window')) {
        distance = currentTabsWidth + WindowMarginLeft;
      } else {
        distance = currentTabsWidth;
      }
    }
    return -distance;
  }

  getIsAllowToMove(moveDistance: number) {
    const { tabType, tabPosition } = this.props;
    const { titleSize } = this.state;
    let actualWidth;
    let offsetSize;
    if (isVertical(tabPosition)) {
      actualWidth = this.getActualWidth('line', titleSize);
      offsetSize = this.offsetHeight;
    } else {
      actualWidth = this.getActualWidth(tabType, titleSize);
      offsetSize = this.offsetWidth;
    }
    const isDisabledToNext = offsetSize - 46 - moveDistance >= actualWidth;
    const isDisabledToPrev = moveDistance === 0;
    return { isDisabledToPrev, isDisabledToNext };
  }

  getActualWidth(tabType: TabType, titleSize: Array<number>) {
    const width = plusWidth(titleSize.length - 1, titleSize);
    return matchType(tabType, 'window')
      ? width + WindowMarginLeft + AddButtonSize
      : matchType(tabType, 'card')
      ? width + (titleSize.length + 1) * CardMarginRight + AddButtonSize
      : width;
  }

  onTabClick = (index: number) => {
    if (!this.getTabpaneDisabled(index)) {
      const { onTabClick } = this.props;
      const { activityValue } = this.state;
      onTabClick && onTabClick(index);
      if (activityValue === index) {
        return;
      }
      const { onChange } = this.props;
      onChange && onChange(index);
    }
  };

  onDeleteClick = (index: number) => {
    if (!this.getTabpaneDisabled(index)) {
      const { onDelete } = this.props;
      onDelete && onDelete(index);
    }
  };

  getTabpaneDisabled(index: number) {
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
