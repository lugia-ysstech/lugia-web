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
  YtabsHeight,
} from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2remcss } from '../css/units';
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
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import { addMouseEvent } from '@lugia/theme-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import { deepMerge } from '@lugia/object-utils';
import colorsFunc from '../css/stateColor';
import { getBorder } from '@lugia/theme-css-hoc';
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
}); //${getCursor};;

const HBasePage = CSSComponent({
  extend: ArrowContainer,
  className: 'HBasePage',
  normal: {
    selectNames: [],
    getCSS: (themeMeta: Object, themeProps: Object) => {
      const { height } = themeMeta;
      return `line-height: ${height ? height + 'px' : '35px'}`;
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    text-align: center;
    width: 24px;
    line-height: 35px;
    display: ${props => (props.arrowShow === false ? 'none' : 'block')};
  `,
}); //${getArrowTop};

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
    height: ${px2remcss(24)};
    line-height: ${px2remcss(24)};
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
  className: 'TitleContainer',
  normal: {
    selectNames: [['width']],
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

const AddContainer = ThemeHoc(
  CSSComponent({
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
    },
    disabled: {
      selectNames: [],
    },
    css: css`
      position: relative;
      text-align: center;
      cursor: pointer;
    `,
  }),
  'AddContainer',
  { hover: true, active: false }
);

AddContainer.displayName = 'addBtn';

const AddOutContainer = CSSComponent({
  tag: 'div',
  className: 'AddContainer',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    position: relative;
    text-align: center;
    display: inline-block;
    margin: 5px;
  `,
});

const AddIcon = CSSComponent({
  extend: Icon,
  className: 'AddIcon',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    position: relative;
    transition: all 0.3s linear 0.1s;
    font-size: 1rem;
    vertical-align: text-top !important;
  `,
});

const HscrollerContainer = CSSComponent({
  tag: 'div',
  className: 'HscrollerContainer',
  normal: {
    selectNames: [],
    getCSS: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { tabPosition, tabType },
      } = themeProps;
      const { color = '#e8e8e8', width = 1 } = theme;
      let border = `border-bottom: ${width}px solid ${color};`;
      if (tabPosition === 'bottom') {
        border = `border-top: ${width}px solid ${color};`;
      }
      if (tabType === 'window') {
        border = `border-bottom: ${0}px solid transparent;`;
      }
      return border;
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
    getCSS: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { tabPosition },
      } = themeProps;
      const { color = '#e8e8e8', width = 1 } = theme;
      let border = `border-left: ${width}px solid ${color};`;
      if (tabPosition === 'left') {
        border = `border-right: ${width}px solid ${color};`;
      }
      return border;
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
  className: 'HTabsOutContainer',
  normal: {
    selectNames: [],
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
  className: 'VTabsOutContainer',
  normal: {
    selectNames: [],
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

const PageIcon = CSSComponent({
  extend: Icon,
  className: 'PageIcon',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
    getCSS: () => {
      return 'cursor: not-allowed';
    },
  },
  css: css`
    display: inline-block;
    font-style: normal;
    text-align: center;
    font-size: 1rem;
  `,
});

PageIcon.displayName = 'page';

type TabsState = {
  activityValue: number,
  data: Array<Object>,
  currentPage: number,
  totalPage: number,
  pagedCount: number,
  arrowShow: boolean,
  titleSize: Array<number>,
  oldDataLength: number,
  allowToCalc: boolean,
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
  themeProps?: Object,
  viewClass?: string,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
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
  titleBox: any;
  titlePanel: any;
  static displayName = Widget.Tabs;
  offsetWidth: number;
  offsetHeight: number;
  titleWidthOrHeight: Array<number>;

  constructor(props: TabsProps) {
    super(props);

    this.titleBox = React.createRef();
    this.titlePanel = [...Array(props.data.length)].map(() => React.createRef());
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

  shouldComponentUpdate(nextProps: any, nextState: any) {
    const { allowToCalc } = this.state;
    if (allowToCalc) {
      this.matchPage();
    }
    return true;
  }

  componentDidMount() {
    if (this.titleBox) {
      this.offsetWidth = this.titleBox.offsetWidth;
      this.offsetHeight = this.titleBox.offsetHeight;
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
    this.setState({ arrowShow, totalPage, titleSize });
  }
  render() {
    return <React.Fragment>{this.getTabs()}</React.Fragment>;
  }

  getTabs() {
    const { tabPosition } = this.props;
    if (isVertical(tabPosition)) {
      return this.getVtabs();
    }
    return this.getHorizonTabPan();
    // return (<div>123123</div>);
    // return this.getTestHorizonTabPan();
  }

  getVtabs() {
    const { tabPosition, themeProps } = this.props;
    const { pagedCount, totalPage } = this.state;
    const borderThemeProps = this.props.getPartOfThemeProps('BorderStyle');
    borderThemeProps.propsConfig = { tabPosition };
    const tabsThemeProps = this.props.getPartOfThemeProps('TitleContainer');
    tabsThemeProps.propsConfig = { tabPosition };
    const moveDistance = this.computeMoveDistance();
    // const { isDisabledToPrev, isDisabledToNext } = { isDisabledToPrev:false, isDisabledToNext:false};
    const { isDisabledToPrev, isDisabledToNext } = this.getIsAllowToMove(moveDistance);

    return (
      <VTabsOutContainer
        themeProps={themeProps}
        tabPosition={tabPosition}
        showPadding={totalPage > 1}
      >
        {this.getPrevOrNextPage('prev', themeProps, isDisabledToPrev, isDisabledToNext)}
        <VTabsContainer themeProps={tabsThemeProps} innerRef={node => (this.titleBox = node)}>
          <YscrollerContainer y={moveDistance} themeProps={borderThemeProps}>
            {this.getChildren()}
          </YscrollerContainer>
        </VTabsContainer>
        {this.getPrevOrNextPage('next', themeProps, isDisabledToPrev, isDisabledToNext)}
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
          <PageIcon disabled={isDisabledToPrev} themeProps={themeProps} iconClass={arrowUp} />
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
        <PageIcon disabled={isDisabledToNext} themeProps={themeProps} iconClass={arrowDown} />
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
    const { totalPage } = this.state;

    const borderThemeProps = this.props.getPartOfThemeProps('BorderStyle', {
      props: { tabPosition, tabType },
    });
    const tabsThemeProps = this.props.getPartOfThemeProps('TitleContainer', {
      props: { tabPosition },
    });
    const moveDistance = this.computeMoveDistance();
    const { isDisabledToPrev, isDisabledToNext } = this.getIsAllowToMove(moveDistance);
    // const { isDisabledToPrev, isDisabledToNext } = { isDisabledToPrev:false, isDisabledToNext:false};

    const prevPageThemeProps = deepMerge(
      { themeConfig: { normal: { height: 35 } } },
      this.props.getPartOfThemeProps('DefaultTabPan')
    );
    return (
      <HTabsOutContainer
        themeProps={themeProps}
        tabType={tabType}
        tabPosition={tabPosition}
        showPadding={totalPage > 1}
      >
        {this.getPrevOrNextPage('prev', prevPageThemeProps, isDisabledToPrev, isDisabledToNext)}
        <HTabsContainer themeProps={tabsThemeProps} innerRef={node => (this.titleBox = node)}>
          <HscrollerContainer themeProps={borderThemeProps} x={moveDistance}>
            {this.getChildren()}
            {this.getAddButton()}
          </HscrollerContainer>
        </HTabsContainer>
        {this.getPrevOrNextPage('next', prevPageThemeProps, isDisabledToPrev, isDisabledToNext)}
      </HTabsOutContainer>
    );
  }

  getTestHorizonTabPan() {
    const { tabType, tabPosition } = this.props;

    const borderThemeProps = this.props.getPartOfThemeProps('BorderStyle', {
      props: { tabPosition, tabType },
    });
    const tabsThemeProps = this.props.getPartOfThemeProps('TitleContainer', {
      props: { tabPosition },
    });

    return (
      <HTabsContainer themeProps={tabsThemeProps} innerRef={node => (this.titleBox = node)}>
        <HscrollerContainer themeProps={borderThemeProps}>{this.getChildren()}</HscrollerContainer>
      </HTabsContainer>
    );
  }

  getChildren() {
    const { data } = this.state;
    const { getTabpane } = this.props;

    return data
      ? data.map((child, index) => {
          const target = (
            <Tabpane
              ref={this.titlePanel[index]}
              {...this.props}
              {...this.getTabpaneConfig(child, index)}
            />
          );
          return getTabpane ? getTabpane(target, index) : target;
        })
      : null;
  }

  getAddButton() {
    const { tabType, themeProps, showAddBtn } = this.props;
    const add = 'lugia-icon-reminder_plus';
    if (!matchType(tabType, 'line') && showAddBtn) {
      const { theme, viewClass } = this.props.getPartOfThemeHocProps('AddButton');
      return (
        <AddOutContainer themeProps={themeProps} tabType={tabType}>
          <AddContainer
            theme={theme}
            viewClass={viewClass}
            tabType={tabType}
            onClick={this.onAddClick}
          >
            <AddIcon themeProps={themeProps} tabType={tabType} iconClass={add} />
          </AddContainer>
        </AddOutContainer>
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
    const { activityValue, data } = this.state;
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
      onClick: this.onTabClick,
      activityValue,
      index: i,
      showDeleteBtn,
      isSelect: !disabled && activityValue === i,
      // getTabpaneWidthOrHeight: this.getTabpaneWidthOrHeight,
      onDelete: this.onDeleteClick,
      disabled,
      onMouseEnter: this.onTabMouseEnter,
      onMouseLeave: this.onTabMouseLeave,
    };
  }

  getTabpaneWidthOrHeight = () => {
    const { tabPosition } = this.props;
    const titleSize = this.titlePanel.map((item, index) => {
      const tabPan = findDOMNode(item.current);
      if (!tabPan) {
        return 0;
      }
      let offsetSize = 0;
      if (isVertical(tabPosition)) {
        offsetSize = tabPan.offsetHeight;
      } else {
        offsetSize = tabPan.offsetWidth;
      }
      return offsetSize;
    });
    return titleSize;
  };

  computeMoveDistance() {
    const { currentPage, totalPage, pagedCount, titleSize } = this.state;
    const { tabType, tabPosition } = this.props;
    const currentTabsWidth = plusWidth(pagedCount - 1, titleSize);
    const maxDistance = isVertical(tabPosition) ? this.offsetHeight : this.offsetWidth;
    let distance = totalPage > 1 ? currentPage * maxDistance : 0;
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
    const isDisabledToNext = offsetSize - moveDistance >= actualWidth;
    const isDisabledToPrev = moveDistance === 0;

    return { isDisabledToPrev, isDisabledToNext };
  }

  getActualWidth(tabType, titleSize) {
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
      // this.setState({ activityValue: index });
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

  onTabMouseEnter = (activityValue: string, e: Event) => {
    const { onMouseEnter } = this.props;
    onMouseEnter && onMouseEnter(activityValue, e);
  };

  onTabMouseLeave = (activityValue: string, e: Event) => {
    const { onMouseLeave } = this.props;
    onMouseLeave && onMouseLeave(activityValue, e);
  };

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

const TargetTabs = ThemeHoc(KeyBoardEventAdaptor(TabHeader), 'TabHeader', {
  hover: true,
  active: false,
});
export default TargetTabs;
