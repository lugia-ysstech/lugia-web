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
import CSSComponent, { css, keyframes } from '@lugia/theme-css-hoc';
import { addMouseEvent } from '@lugia/theme-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import { deepMerge } from '@lugia/object-utils';

const BaseLine = CSSComponent({
  tag: 'div',
  className: 'BaseLine',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    background-color: blue;
    position: absolute;
    box-sizing: border-box;
    z-index: 3;
    border-radius: ${px2remcss(2)};
  `,
});

const HLine = CSSComponent({
  extend: BaseLine,
  className: 'HLine',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    height: ${px2remcss(2)};
    width: ${lineWidth};
    transform: translateX(${props => px2remcss(props.x)});
    transition: all 0.3s;
  `,
}); // ${getLinePosition};

// const HLine = styled(BaseLine)`
//   height: ${px2remcss(2)};
//   width: ${lineWidth};
//   ${getLinePosition};
//   transform: translateX(${props => px2remcss(props.x)});
//   transition: all 0.3s;
// `;

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

const VLine = CSSComponent({
  extend: BaseLine,
  className: 'VLine',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    height: ${px2remcss(YtabsHeight)};
    width: ${px2remcss(2)};
    transform: translateY(${props => props.y}%);
    transition: all 0.3s;
  `,
}); //${getLinePosition};

const ArrowContainer = CSSComponent({
  tag: 'span',
  className: 'BaseLine',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    position: absolute;
    font-size: 1.2rem;
    display: ${props => (props.arrowShow === false ? 'none' : 'inline-block')};
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
    line-height: 100%;
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
  css: css`
    top: ${px2remcss(12)};
  `,
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
  css: css`
    transform: translateX(-100%);
    bottom: ${px2remcss(-6)};
  `,
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
  `,
}); //width: ${hContainerWidth};height: ${vContainerHeight};
OutContainer.displayName = Widget.TabsContainer;

const HTabsContainer = CSSComponent({
  tag: 'div',
  className: 'HTabsContainer',
  normal: {
    selectNames: [],
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
    height: 100%;
  `,
}); //${getSelectColor};${getContainerBorder}; ${getContainerPadding};

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
  },
  css: css`
    display: inline-block;
    font-style: normal;
    text-align: center;
    font-size: 1rem;
  `,
}); // ${getCursor};

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
    const { getTheme, themeProps } = this.props;
    const config = {
      width: this.offsetWidth,
      height: this.offsetHeight,
    };
    const theme = { [Widget.TabsContainer]: config };
    // {...addMouseEvent(this)}
    return (
      <Theme config={theme}>
        <OutContainer
          themeProps={themeProps}
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
    const { tabPosition, themeProps } = this.props;
    const { data, activityValue, pagedCount, totalPage } = this.state;
    const arrowUp = 'lugia-icon-direction_up';
    const arrowDown = 'lugia-icon-direction_down';
    const y = -YtabsHeight * pagedCount;
    return (
      <VTabsOutContainer
        themeProps={themeProps}
        tabPosition={tabPosition}
        showPadding={totalPage > 1}
      >
        <VPrePage
          themeProps={themeProps}
          tabPosition={tabPosition}
          onClick={this.onPreClick}
          {...this.getArrowConfig('pre')}
        >
          <PageIcon themeProps={themeProps} iconClass={arrowUp} {...this.getArrowConfig('pre')} />
        </VPrePage>
        <VTabsContainer themeProps={themeProps}>
          <YscrollerContainer y={y} themeProps={themeProps}>
            <VLine
              themeProps={themeProps}
              y={getIndexfromKey(data, 'activityValue', activityValue) * 100}
              tabPosition={tabPosition}
            />
            {this.getChildren()}
          </YscrollerContainer>
        </VTabsContainer>
        <VNextPage
          themeProps={themeProps}
          {...this.getArrowConfig('next')}
          tabPosition={tabPosition}
          onClick={this.onNextClick}
        >
          <PageIcon
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

  getHline() {
    const { tabType, tabPosition, themeProps } = this.props;
    const { activityValue, data, childrenSize } = this.state;
    if (matchType(tabType, 'line')) {
      return (
        <HLine
          themeProps={themeProps}
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
    const { tabType, getTheme, themeProps } = this.props;
    const arrowLeft = 'lugia-icon-direction_Left';
    const arrowRight = 'lugia-icon-direction_right';
    const pre = this.getArrowConfig('pre');
    const next = this.getArrowConfig('next');
    return [
      <HPrePage themeProps={themeProps} onClick={this.onPreClick} tabType={tabType} {...pre}>
        <PageIcon themeProps={themeProps} iconClass={arrowLeft} {...pre} />
      </HPrePage>,
      <HTabsContainer themeProps={themeProps} tabType={tabType}>
        <HscrollerContainer
          themeProps={themeProps}
          tabType={tabType}
          x={this.computePagedX()}
          theme={getTheme()}
        >
          {this.getChildren()}
          {this.getAddButton()}
          {this.getHline()}
        </HscrollerContainer>
      </HTabsContainer>,
      <HNextPage themeProps={themeProps} {...next} onClick={this.onNextClick} tabType={tabType}>
        <PageIcon themeProps={themeProps} iconClass={arrowRight} {...next} />
      </HNextPage>,
    ];
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
          return (
            <TabContent
              themeProps={themeProps}
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

const TargetTabs = ThemeProvider(KeyBoardEventAdaptor(TabsBox), Widget.Tabs, {
  hover: true,
  active: false,
});
export default TargetTabs;
