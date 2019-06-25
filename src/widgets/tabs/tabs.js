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
import { EditEventType, PagedType, TabPositionType, TabType } from '../css/tabs';
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

const ShadowLine = CSSComponent({
  tag: 'div',
  className: 'BaseLine',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    width: 100%;
    position: absolute;
    bottom: ${px2remcss(-1)};
    height: ${px2remcss(1)};
    z-index: -1;
  `,
}); //${getBackgroundShadow};

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
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    transform: translateY(-50%);
    text-align: center;
    display: ${props => (props.arrowShow === false ? 'none' : 'inline-block')};
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
    left: ${px2remcss(10)};
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
    right: ${px2remcss(10)};
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
  css: css``,
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
  css: css``,
});

const OutContainer = CSSComponent({
  tag: 'div',
  className: 'OutContainer',
  normal: {
    selectNames: [['padding'], ['width']],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  `,
}); //width: ${hContainerWidth};height: ${vContainerHeight};
OutContainer.displayName = Widget.TabsContainer;

const HTabsContainer = CSSComponent({
  tag: 'div',
  className: 'HTabsContainer',
  normal: {
    selectNames: [],
    getCSS: (themeMeta: Object, themePros: Object) => {
      const { width } = themeMeta;
      return `width:${width + 'px' || '100%'};`;
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
  `,
});

const AddContainer = CSSComponent({
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
    width: ${px2remcss(AddButtonSize)};
    height: ${px2remcss(AddButtonSize)};
  `,
}); /* ${getAddBackground};${getTabpaneBorder};${getAddRadius};${getAddTop};&:focus {${getAddHoverBackground};}*/

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
  `,
}); // ${getAddTop};${getAddRight};  height: ${hContainerHeight};line-height: ${hContainerHeight};

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
    opacity: 0;
  `,
}); //${getAddButtonBottom};${getAddButtonDisplay};&:hover { ${getButtonShow};}

AddIcon.displayName = 'addIcon';

const HscrollerContainer = CSSComponent({
  tag: 'div',
  className: 'HscrollerContainer',
  normal: {
    selectNames: [],
    getCSS: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { tabPosition },
      } = themeProps;
      const { color = '#e8e8e8', width = 1 } = theme;
      let border = `border-bottom: ${width}px solid ${color};`;
      if (tabPosition === 'bottom') {
        border = `border-top: ${width}px solid ${color};`;
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
}); //height: ${hContainerHeight};

const VTabsContainer = CSSComponent({
  tag: 'div',
  className: 'VTabsContainer',
  normal: {
    selectNames: [],
    getCSS: (themeMeta: Object, themePros: Object) => {
      const { height } = themeMeta;
      return `height:${height + 'px' || '100%'};`;
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
}); //height: ${hContainerHeight};line-height: ${hContainerHeight};position: relative;${getContainerBorder};background: ${backgroundColor};${getContainerPadding};

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
}); //${getSelectColor};${getContainerBorder}; ${getContainerPadding};

const PageIcon = ThemeHoc(
  CSSComponent({
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
  }),
  'PageIcon',
  { hover: true, active: false }
);
// ${getCursor};

PageIcon.displayName = 'page';

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
  themeProps: Object,
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
    defaultData: [],
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
    const { getTheme, themeProps, tabPosition } = this.props;
    const config = {
      width: this.offsetWidth,
      height: this.offsetHeight,
    };
    const theme = { [Widget.TabsContainer]: config };
    return (
      <Theme config={theme}>
        <OutContainer themeProps={themeProps} theme={getTheme()}>
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
    const { tabPosition, themeProps } = this.props;
    const { data, activityValue, pagedCount, totalPage, arrowShow } = this.state;
    const arrowUp = 'lugia-icon-direction_up';
    const arrowDown = 'lugia-icon-direction_down';
    const y = -YtabsHeight * pagedCount;
    const borderThemeProps = this.props.getPartOfThemeProps('BorderStyle');
    borderThemeProps.propsConfig = { tabPosition };
    const tabsThemeProps = this.props.getPartOfThemeProps('TabsContainer');
    tabsThemeProps.propsConfig = { tabPosition };
    const moveDistance = this.computeMoveDistance();
    const { isDisabledToPrev, isDisabledToNext } = this.getIsAllowToMove(moveDistance);

    return (
      <VTabsOutContainer
        themeProps={themeProps}
        tabPosition={tabPosition}
        showPadding={totalPage > 1}
      >
        <VPrePage
          themeProps={themeProps}
          tabPosition={tabPosition}
          onClick={this.onPreClick(isDisabledToPrev)}
          {...this.getArrowConfig('pre')}
        >
          <PageIcon disabled={isDisabledToPrev} themeProps={themeProps} iconClass={arrowUp} />
        </VPrePage>
        <VTabsContainer themeProps={tabsThemeProps} innerRef={this.tabs}>
          <YscrollerContainer y={moveDistance} themeProps={borderThemeProps}>
            {this.getChildren()}
          </YscrollerContainer>
        </VTabsContainer>
        <VNextPage
          themeProps={themeProps}
          {...this.getArrowConfig('next')}
          tabPosition={tabPosition}
          onClick={this.onNextClick(isDisabledToNext)}
        >
          <PageIcon
            disabled={isDisabledToNext}
            themeProps={themeProps}
            iconClass={arrowDown}
            {...this.getArrowConfig('next')}
          />
        </VNextPage>
      </VTabsOutContainer>
    );
  }

  getHTabs() {
    const { tabType, tabPosition, getTheme, themeProps } = this.props;
    const { totalPage } = this.state;
    return [
      <HTabsOutContainer
        themeProps={themeProps}
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
    const { tabType, themeProps } = this.props;
    if (matchType(tabType, 'window')) {
      return <ShadowLine themeProps={themeProps} tabType={tabType} />;
    }
    return null;
  }

  getHtabsChildren() {
    const { tabType, tabPosition, getTheme, themeProps } = this.props;
    const arrowLeft = 'lugia-icon-direction_Left';
    const arrowRight = 'lugia-icon-direction_right';
    const pre = this.getArrowConfig('pre');
    const next = this.getArrowConfig('next');
    const borderThemeProps = this.props.getPartOfThemeProps('BorderStyle');
    borderThemeProps.propsConfig = { tabPosition };
    const tabsThemeProps = this.props.getPartOfThemeProps('TabsContainer');
    tabsThemeProps.propsConfig = { tabPosition };
    const moveDistance = this.computeMoveDistance();
    const { isDisabledToPrev, isDisabledToNext } = this.getIsAllowToMove(moveDistance);

    return [
      <HPrePage
        themeProps={themeProps}
        onClick={this.onPreClick(isDisabledToPrev)}
        tabType={tabType}
        {...pre}
      >
        <PageIcon
          disabled={isDisabledToPrev}
          themeProps={themeProps}
          iconClass={arrowLeft}
          {...pre}
        />
      </HPrePage>,
      <HTabsContainer themeProps={tabsThemeProps} tabType={tabType} innerRef={this.tabs}>
        <HscrollerContainer
          themeProps={borderThemeProps}
          tabType={tabType}
          x={moveDistance}
          theme={getTheme()}
        >
          {this.getChildren()}
          {this.getAddButton()}
        </HscrollerContainer>
      </HTabsContainer>,
      <HNextPage
        themeProps={themeProps}
        {...next}
        onClick={this.onNextClick(isDisabledToNext)}
        tabType={tabType}
      >
        <PageIcon
          disabled={isDisabledToNext}
          themeProps={themeProps}
          iconClass={arrowRight}
          {...next}
        />
      </HNextPage>,
    ];
  }

  getIsAllowToMove(moveDistance: number) {
    const { tabType, tabPosition } = this.props;
    const { childrenSize } = this.state;
    let actualWidth;
    let offsetSize;
    if (isVertical(tabPosition)) {
      actualWidth = this.getActualWidth('line', childrenSize);
      offsetSize = this.offsetHeight;
    } else {
      actualWidth = this.getActualWidth(tabType, childrenSize);
      offsetSize = this.offsetWidth;
    }
    const isDisabledToNext = offsetSize - moveDistance >= actualWidth;
    const isDisabledToPrev = moveDistance === 0;

    return { isDisabledToPrev, isDisabledToNext };
  }

  getAddButton() {
    const { tabType, getTheme, themeProps } = this.props;
    const add = 'lugia-icon-reminder_plus';
    if (!matchType(tabType, 'line')) {
      return (
        <AddOutContainer themeProps={themeProps} tabType={tabType} theme={getTheme()}>
          <AddContainer themeProps={themeProps} tabType={tabType} onClick={this.onAddClick}>
            <AddIcon themeProps={themeProps} tabType={tabType} iconClass={add} />
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

  getActualWidth(tabType, childrenSize) {
    const width = plusWidth(childrenSize.length - 1, childrenSize);
    return matchType(tabType, 'window')
      ? width + WindowMarginLeft + AddButtonSize
      : matchType(tabType, 'card')
      ? width + (childrenSize.length + 1) * CardMarginRight + AddButtonSize
      : width;
  }

  matchPage() {
    const { currentPage, childrenSize, data } = this.state;
    const { tabPosition, tabType } = this.props;

    let totalPage;
    if (isVertical(tabPosition)) {
      const actualHeight = this.getActualWidth('line', childrenSize);
      totalPage = computePage(this.offsetHeight, actualHeight);
    } else {
      const actualWidth = this.getActualWidth(tabType, childrenSize);
      totalPage = computePage(this.offsetWidth, actualWidth);
    }
    const arrowShow = totalPage > 1 && currentPage < totalPage;
    this.setState({ arrowShow, totalPage });
  }

  computeMoveDistance() {
    const { currentPage, totalPage, pagedCount, childrenSize } = this.state;
    const { tabType, tabPosition } = this.props;
    const currentTabsWidth = plusWidth(pagedCount - 1, childrenSize);
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

  initContainerSize() {
    const { getTheme } = this.props;
    const { width, height } = getTheme();
    this.offsetWidth = width ? width : 0;
    this.offsetHeight = height ? height : 0;
  }

  updateContainerSize() {
    if (this.tabs) {
      this.offsetWidth = this.tabs.current.offsetWidth;
      this.offsetHeight = this.tabs.current.offsetHeight;
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
      getTabpaneWidthOrHeight: this.getTabpaneWidthOrHeight,
      onDeleteClick: this.onDeleteClick,
      disabled,
      onMouseEnter: this.onTabMouseEnter,
      onMouseLeave: this.onTabMouseLeave,
    };
  }

  getChildren() {
    const { data } = this.state;
    const { getTabpane, themeProps } = this.props;
    return data
      ? data.map((child, i) => {
          const target = <Tabpane {...this.props} {...this.getTabpaneConfig(child, i)} />;
          return getTabpane ? getTabpane(target, i) : target;
        })
      : null;
  }
  getChildrenContent() {
    const { forceRender, tabPosition, themeProps } = this.props;
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
            getAttributeFromObject(
              child.props,
              'content',
              getAttributeFromObject(child, 'children', undefined)
            )
          );
          const contentThemeProps = this.props.getPartOfThemeProps('ContentBlock');
          contentThemeProps.propsConfig = { tabPosition };
          return (
            <TabContent
              {...this.props}
              themeProps={contentThemeProps}
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

  getTabpaneWidthOrHeight = (width: number) => {
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

  onNextClick = (isAllowToNext: boolead) => {
    if (isAllowToNext) {
      return;
    }
    return this.createNativeClick('onNextClick', 'next');
  };
  onPreClick = (isAllowToPrev: boolead) => {
    if (isAllowToPrev) {
      return;
    }
    return this.createNativeClick('onPreClick', 'pre');
  };

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

const TargetTabs = ThemeProvider(KeyBoardEventAdaptor(TabsBox), Widget.Tabs, {
  hover: true,
  active: false,
});
export default TargetTabs;
