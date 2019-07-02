/**
 *
 * create by liangguodong on 2018/9/6
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import TabHeader from './tabheader';
import TabContentInner from './tabcontent';
import Widget from '../consts/index';
import { EditEventType, PagedType, TabPositionType, TabType } from '../css/tabs';
import { AddButtonSize } from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2remcss } from '../css/units';
import { isVertical } from './utils';
import { getAttributeFromObject } from '../common/ObjectUtils.js';

import Icon from '../icon';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import colorsFunc from '../css/stateColor';
const { superLightColor } = colorsFunc();
const TabContentContainer = CSSComponent({
  tag: 'div',
  className: 'ContentBlock',
  normal: {
    selectNames: [['height'], ['width']],
    getCSS: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { tabPosition },
      } = themeProps;
      if (isVertical(tabPosition)) {
        return 'float: left;';
      }
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    position: relative;
    padding: 10px;
    min-width: 100px;
    min-height: 100px;
  `,
}); //${getBackgroundShadow};
const TabContent = CSSComponent({
  tag: 'div',
  className: 'TabContent',
  normal: {
    selectNames: [],
    getCSS: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { active, index },
      } = themeProps;
      if (active === index) {
        return `
        display:block;
        z-index:10;
        `;
      }
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    overflow: hidden;
    background: #fff;
    padding: 10px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;
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

const WindowContainer = CSSComponent({
  tag: 'div',
  className: 'WindowContainer',
  normal: {
    selectNames: [['background'], ['padding'], ['border']],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    display: inline-block;
  `,
});

const OutContainer = CSSComponent({
  tag: 'div',
  className: 'OutContainer',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    display: inline-block;
  `,
});
OutContainer.displayName = Widget.TabsContainer;

type TabsState = {
  activityValue: number,
  data: Array<Object>,
  currentPage: number,
  totalPage: number,
  pagedCount: number,
  arrowShow: boolean,
  childrenSize: Array<number>,
};

type TabsProps = {
  activityValue: number,
  defaultActivityValue: number,
  onTabClick: Function,
  tabPosition?: TabPositionType,
  tabType?: TabType,
  onChange: Function,
  onNextClick?: Function,
  onPreClick?: Function,
  children?: React$Element<any>,
  data?: Array<Object>,
  defaultData?: Array<Object>,
  forceRender?: boolean,
  onDeleteClick: Function,
  showAddBtn?: boolean,
  onAddClick?: Function,
  pagedType?: PagedType,
  getTabpane?: Function,
  themeProps: Object,
  onTabMouseEnter?: Function,
  onTabMouseLeave?: Function,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
};
function hasDataInProps(props: TabsProps) {
  return 'data' in props;
}

function getDefaultData(props) {
  const { defaultData, data, children } = props;
  let configData = [];
  if (hasDataInProps(props)) {
    configData = data ? data : [];
  } else {
    if (children) {
      configData = [];
      React.Children.map(children, child => {
        configData && configData.push(child.props);
      });
    } else {
      configData = defaultData ? defaultData : [];
    }
  }
  return configData;
}

class TabsBox extends Component<TabsProps, TabsState> {
  static defaultProps = {
    tabType: 'line',
    tabPosition: 'top',
    pagedType: 'single',
    defaultData: [],
    forceRender: false,
  };
  static displayName = Widget.Tabs;

  constructor(props: TabsProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: TabsProps, state: TabsState) {
    const { activityValue, defaultActivityValue, data } = props;
    // const configData = getDefaultData(props);
    // let theData;
    // let theActivityValue = 0;
    // if (!state) {
    //   theData = configData || [];
    //   theActivityValue = activityValue || defaultActivityValue || 0;
    // } else {
    //   theData = state.data;
    //   theActivityValue = state.activityValue;
    // }
    //
    const returnData = {
      data: data || [],
      activityValue: activityValue || defaultActivityValue,
    };
    return {
      ...returnData,
    };
  }

  // shouldComponentUpdate(nextProps: any, nextState: any) {
  //   return true;
  // }

  render() {
    const { themeProps, tabType, tabPosition } = this.props;
    const outContainerThemeProps = this.props.getPartOfThemeProps('WindowContainer');
    const { activityValue, data } = this.state;
    let target = (
      <OutContainer themeProps={themeProps}>
        <TabHeader {...this.getTabHeaderProps()} />
        {this.getChildrenContent()}
      </OutContainer>
    );
    if (tabType === 'window') {
      target = (
        <WindowContainer themeProps={outContainerThemeProps}>
          <OutContainer themeProps={themeProps}>
            <TabHeader {...this.getTabHeaderProps()} />
            {this.getChildrenContent()}
          </OutContainer>
        </WindowContainer>
      );
    }
    return target;
  }

  getTabHeaderProps() {
    const { activityValue, data } = this.state;
    console.log('data tabs', data, this.props.data);
    const {
      tabType,
      tabPosition,
      showAddBtn,
      pagedType,
      onTabClick,
      onPreClick,
      onNextClick,
      onAddClick,
      onDeleteClick,
    } = this.props;
    const tabHeaderThemes = this.props.getPartOfThemeHocProps('TabHeader');
    return {
      activityValue,
      data,
      tabPosition,
      tabType,
      showAddBtn,
      pagedType,
      onChange: this.onChange,
      onTabClick: this.onTabClick,
      onPreClick: this.onPreClick,
      onNextClick: this.onNextClick,
      onAddClick,
      onDelete: this.onDelete,
      ...tabHeaderThemes,
    };
  }

  onChange = (index: number) => {
    this.setState({
      activityValue: index,
    });
  };

  onTabClick = (index: number) => {
    const { onTabClick } = this.props;
    onTabClick && onTabClick(index);
  };

  onPreClick = (e: Event) => {
    const { onPreClick } = this.props;
    onPreClick && onPreClick(e);
  };

  onNextClick = (e: Event) => {
    const { onPreClick } = this.props;
    onPreClick && onPreClick(e);
  };

  onDelete = (index: number) => {
    // this.setState({
    //   activityValue:index
    // });
  };

  componentDidMount() {
    const { doDelayFunc } = this;
    setTimeout(() => {
      doDelayFunc();
    }, 3000);
  }

  doDelayFunc = () => {
    console.log('delay in ');
    this.setState({
      activityValue: 1,
    });
  };

  getChildrenContent() {
    const { activityValue, data } = this.state;
    const { tabPosition, themeProps } = this.props;
    if (data) {
      themeProps.propsConfig = { tabPosition };
      return (
        <TabContentContainer themeProps={themeProps}>
          {data.map((child, index) => {
            const content = getAttributeFromObject(
              child,
              'content',
              getAttributeFromObject(
                child.props,
                'content',
                getAttributeFromObject(child, 'children', undefined)
              )
            );
            const props = { active: activityValue, index };
            const contentThemeProps = this.props.getPartOfThemeProps('ContentBlock', { props });
            console.log('contentThemeProps', contentThemeProps);
            const { forceRender } = this.props;
            return forceRender ? (
              activityValue === index && (
                <TabContent themeProps={contentThemeProps}>
                  <TabContentInner
                    {...this.props}
                    themeProps={contentThemeProps}
                    content={content}
                    forceRender={forceRender && index === activityValue}
                  />
                </TabContent>
              )
            ) : (
              <TabContent themeProps={contentThemeProps}>
                <TabContentInner
                  {...this.props}
                  themeProps={contentThemeProps}
                  content={content}
                  forceRender={forceRender && index === activityValue}
                />
              </TabContent>
            );
          })}
        </TabContentContainer>
      );
    }
  }
}

const TargetTabs = ThemeHoc(KeyBoardEventAdaptor(TabsBox), Widget.Tabs, {
  hover: true,
  active: false,
});
export default TargetTabs;
