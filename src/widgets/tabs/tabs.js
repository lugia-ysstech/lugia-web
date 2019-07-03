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
import { addMouseEvent } from '@lugia/theme-hoc';
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
  showDeleteBtn?: boolean,
  onDeleteClick: Function,
  showAddBtn?: boolean,
  onAddClick?: Function,
  getAddItem?: Function,
  pagedType?: PagedType,
  getTabpane?: Function,
  themeProps: Object,
  onTabMouseEnter?: Function,
  onTabMouseLeave?: Function,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
};
function hasTargetInProps(target: string, props: TabsProps) {
  return `${target}` in props;
}

function getDefaultData(props) {
  const { defaultData, data, children } = props;
  let configData = [];
  if (hasTargetInProps('data', props)) {
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
    showAddBtn: false,
    showDeleteBtn: false,
  };
  static displayName = Widget.Tabs;

  constructor(props: TabsProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: TabsProps, state: TabsState) {
    const { activityValue, defaultActivityValue, data } = props;
    let theActivityValue = activityValue || defaultActivityValue || 0;
    let theData = getDefaultData(props);
    if (state) {
      theActivityValue = hasTargetInProps('activityValue', props)
        ? theActivityValue
        : state.activityValue;
      theData =
        hasTargetInProps('data', props) || hasTargetInProps('children', props)
          ? theData
          : state.data;
    }
    const returnData = {
      data: theData,
      activityValue: theActivityValue,
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
    const { tabType, tabPosition, showAddBtn, pagedType, onAddClick, showDeleteBtn } = this.props;
    const tabHeaderThemes = this.props.getPartOfThemeHocProps('TabHeader');
    return {
      activityValue,
      data,
      tabPosition,
      tabType,
      showAddBtn,
      pagedType,
      showDeleteBtn,
      onChange: this.onChange,
      onTabClick: this.onTabClick,
      onPreClick: this.onPreClick,
      onNextClick: this.onNextClick,
      onAddClick: this.onAddClick,
      onDelete: this.onDelete,
      ...tabHeaderThemes,
    };
  }

  onChange = (index: number) => {
    const { onChange } = this.props;
    onChange && onChange(index);
    if (hasTargetInProps('activityValue', this.props)) {
      return;
    }
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
    const { onDeleteClick } = this.props;
    onDeleteClick && onDeleteClick(index);
    if (hasTargetInProps('data', this.props) || hasTargetInProps('children', this.props)) {
      return;
    }
    const { data } = this.props;
    const newDate = [...data];
    newDate.splice(index, 1);
    this.setState({ data: newDate });
  };

  onAddClick = (e: Event) => {
    const { onAddClick } = this.props;
    onAddClick && onAddClick();
    if (hasTargetInProps('activityValue', this.props)) {
      return;
    }
    if (hasTargetInProps('data', this.props) || hasTargetInProps('children', this.props)) {
      return;
    }
    const { data } = this.state;
    const newData = [...data];
    const { getAddItem } = this.props;
    const item = (getAddItem && getAddItem()) || {
      title: `Tab${data.length}`,
      content: `Tab${data.length} Content`,
    };
    newData.push(item);
    this.setState({
      activityValue: data.length,
      data: newData,
    });
  };

  componentDidMount() {
    console.log('componentDidMount tabs');
  }

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
