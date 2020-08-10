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
import { PagedType, TabPositionType, TabType } from '../css/tabs';
import { isVertical } from './utils';
import { getAttributeFromObject } from '../common/ObjectUtils.js';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import { deepMerge } from '@lugia/object-utils';
import { getBorderRadius } from '@lugia/theme-utils';
import { px2emcss } from '../css/units';

const FontSize = 1.2;
const em = px2emcss(FontSize);

const borderRadiusValue = '$lugia-dict.@lugia/lugia-web.borderRadiusValue';
const disableColor = '$lugia-dict.@lugia/lugia-web.disableColor';

const TabContentContainer = CSSComponent({
  tag: 'div',
  className: 'ContentBlock',
  normal: {
    selectNames: [
      ['padding'],
      ['width'],
      ['height'],
      ['background'],
      ['boxShadow'],
      ['border'],
      ['borderRadius'],
      ['textAlign'],
      ['font'],
      ['color'],
    ],
    getThemeMeta: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { tabType },
      } = themeProps;
      const borderRadiusStyle =
        tabType === 'window' ? { borderRadius: getBorderRadius(borderRadiusValue) } : {};
      return {
        ...borderRadiusStyle,
      };
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { tabPosition },
      } = themeProps;
      const { textAlign = 'left' } = theme;
      const textAlignStyle = `text-align:${textAlign};`;
      let flex = '';
      if (isVertical(tabPosition)) {
        flex = 'flex: 1 1 auto;';
      }
      return `${textAlignStyle}
      ${flex}`;
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    position: relative;
    background: #fff;
    min-width: 100px;
    height: 100%;
    padding: 10px;
  `,
});
const TabContent = CSSComponent({
  tag: 'div',
  className: 'TabContent',
  normal: {
    selectNames: [],
    getCSS: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { active, value },
      } = themeProps;
      if (active === value) {
        return `
        display:block;
        z-index:10;
        height:100%;
        `;
      }
      return '';
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    overflow: hidden;
    width: 100%;
    height: 0;
    display: none;
  `,
});

const WindowContainer = CSSComponent({
  tag: 'div',
  className: 'WindowContainer',
  normal: {
    selectNames: [
      ['background'],
      ['padding'],
      ['border'],
      ['borderRadius'],
      ['opacity'],
      ['width'],
      ['height'],
    ],
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
});

const OutContainer = CSSComponent({
  tag: 'div',
  className: 'OutContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
    ],
    getThemeMeta(themeMeta, themeConfig) {
      const {
        propsConfig: { tabType },
      } = themeConfig;
      if (tabType === 'window') {
        return { height: '100%' };
      }
    },
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,
});
const VerticalOutContainer = CSSComponent({
  tag: 'div',
  className: 'VerticalOutContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
    ],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    display: flex;
  `,
});
OutContainer.displayName = Widget.TabsContainer;

type TabsState = {
  activityValue: string,
  data: Array<Object>,
  currentPage: number,
  totalPage: number,
  pagedCount: number,
  arrowShow: boolean,
  childrenSize: Array<number>,
  hideContent: boolean,
};

type TabsProps = {
  activityValue?: string,
  activeValue?: string,
  defaultActiveValue?: string,
  defaultActivityValue?: string,
  addIcon?: string,
  deleteIcon?: string,
  pageArrowIcon?: Object,
  onTabClick?: Function,
  tabPosition?: TabPositionType,
  tabType?: TabType,
  onChange?: Function,
  onNextClick?: Function,
  onPreClick?: Function,
  children?: React$Element<any>,
  data?: Array<Object>,
  defaultData?: Array<Object>,
  forceRender?: boolean,
  showDeleteBtn?: boolean,
  onDelete?: Function,
  showAddBtn?: boolean,
  onAddClick?: Function,
  getAddItem?: Function,
  pagedType?: PagedType,
  getTabpane?: Function,
  themeProps: Object,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
  hideContent?: boolean,
  showDividerLine?: boolean,
  hideTabBar?: boolean,
  isShowArrowIcon?: boolean,
};
export function hasTargetInProps(target: string, props: TabsProps) {
  return `${target}` in props;
}
export function setKeyValue(data: Array<Object>): Array<Object> {
  const newData = [...data];
  return newData.map((item, index) => {
    const newItem = { ...item };
    const { value, key } = newItem;
    if (!value) {
      newItem.value = key || `Tab${index + 1}`;
    }
    return newItem;
  });
}

export function getDefaultData(props: Object) {
  const { defaultData, data, children } = props;
  let configData = [
    { title: 'Tab1', value: 'Tab1' },
    { title: 'Tab2', value: 'Tab2' },
    { title: 'Tab3', value: 'Tab3' },
  ];
  if (hasTargetInProps('data', props) && Array.isArray(data)) {
    configData = data ? data : [];
  } else {
    if (children) {
      configData = [];
      React.Children.map(children, child => {
        if (typeof child === 'string') {
          return;
        }
        const item = { ...child.props };
        configData && configData.push(item);
      });
    } else {
      configData = defaultData ? defaultData : configData;
    }
  }
  return setKeyValue(configData);
}

export function hasTargetInPropsActiveValue(props: Object) {
  return hasTargetInProps('activeValue', props) || hasTargetInProps('activityValue', props);
}

class TabsBox extends Component<TabsProps, TabsState> {
  static defaultProps = {
    tabType: 'line',
    tabPosition: 'top',
    pagedType: 'single',
    forceRender: false,
    showAddBtn: false,
    showDeleteBtn: false,
    addIcon: 'lugia-icon-reminder_plus',
    deleteIcon: 'lugia-icon-reminder_close',
    hideTabBar: false,
    isShowArrowIcon: true,
  };
  static displayName = Widget.Tabs;

  header: Object;

  constructor(props: TabsProps) {
    super(props);
    this.header = React.createRef();
  }

  static getDerivedStateFromProps(props: TabsProps, state: TabsState) {
    const { activeValue, defaultActiveValue, activityValue, defaultActivityValue } = props;

    let theData = getDefaultData(props);
    let theActivityValue =
      activeValue ||
      defaultActiveValue ||
      activityValue ||
      defaultActivityValue ||
      (theData.length !== 0 ? theData[0].value : null);
    if (state) {
      theActivityValue = hasTargetInPropsActiveValue(props)
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

  render() {
    const { themeProps, tabType, tabPosition, hideTabBar } = this.props;
    const ContainerBox =
      tabType === 'line' && isVertical(tabPosition) ? VerticalOutContainer : OutContainer;
    const containerThemeProps = this.props.getPartOfThemeProps('Container');
    let target = (
      <ContainerBox themeProps={containerThemeProps}>
        {!hideTabBar ? <TabHeader {...this.getTabHeaderProps()} ref={this.header} /> : null}
        {this.getChildrenContent()}
      </ContainerBox>
    );
    if (tabType === 'line') {
      if (tabPosition === 'right' || tabPosition === 'bottom') {
        target = (
          <ContainerBox themeProps={containerThemeProps}>
            {this.getChildrenContent()}
            <TabHeader {...this.getTabHeaderProps()} ref={this.header} />
          </ContainerBox>
        );
      }
    }
    if (tabType === 'window') {
      const outContainerThemeProps = deepMerge(
        {
          themeConfig: {
            normal: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
              background: {
                color: disableColor,
              },
            },
          },
        },
        containerThemeProps,
        this.props.getPartOfThemeProps('WindowContainer')
      );
      const outContainerTheme = deepMerge(themeProps, { propsConfig: { tabType } });
      target = (
        <WindowContainer themeProps={outContainerThemeProps}>
          <OutContainer className={'OutContainer'} themeProps={outContainerTheme}>
            {!hideTabBar ? <TabHeader {...this.getTabHeaderProps()} ref={this.header} /> : null}
            {this.getChildrenContent()}
          </OutContainer>
        </WindowContainer>
      );
    }
    return target;
  }

  getTabHeaderProps() {
    const { activityValue, data } = this.state;
    const {
      tabType,
      showAddBtn,
      pagedType,
      getTabpane,
      showDeleteBtn,
      themeProps,
      getPartOfThemeHocProps,
      getPartOfThemeProps,
      showDividerLine,
      addIcon,
      deleteIcon,
      pageArrowIcon,
      isShowArrowIcon,
    } = this.props;
    let { tabPosition } = this.props;
    tabPosition = tabType === 'line' ? tabPosition : 'top';
    return {
      activityValue,
      data,
      tabPosition,
      tabType,
      showAddBtn,
      pagedType,
      showDeleteBtn,
      getTabpane,
      onChange: this.onChange,
      onTabClick: this.onTabClick,
      onPreClick: this.onPreClick,
      onNextClick: this.onNextClick,
      onAddClick: this.onAddClick,
      onDelete: this.onDelete,
      themeProps,
      getPartOfThemeHocProps,
      getPartOfThemeProps,
      showDividerLine,
      addIcon,
      deleteIcon,
      pageArrowIcon,
      isShowArrowIcon,
    };
  }

  onChange = (res: Object) => {
    const { onChange } = this.props;
    onChange && onChange(res);
    if (hasTargetInPropsActiveValue(this.props)) {
      return;
    }
    const { activityValue } = res;
    this.setState({
      activityValue,
    });
  };

  onTabClick = (res: Object) => {
    const { onTabClick } = this.props;
    onTabClick && onTabClick(res);
  };

  onPreClick = (e: Event) => {
    const { onPreClick } = this.props;
    onPreClick && onPreClick(e);
  };

  onNextClick = (e: Event) => {
    const { onNextClick } = this.props;
    onNextClick && onNextClick(e);
  };

  onDelete = (res: Object) => {
    const { onDelete } = this.props;
    onDelete && onDelete(res);
    if (hasTargetInProps('data', this.props) || hasTargetInProps('children', this.props)) {
      return;
    }
    const { data } = this.state;
    const newDate = [...data];
    const { index } = res;
    newDate.splice(index, 1);
    this.setState({ data: newDate });
  };

  onAddClick = (e: Event) => {
    const { onAddClick } = this.props;
    onAddClick && onAddClick(e);
    if (
      hasTargetInProps('data', this.props) ||
      hasTargetInProps('activeValue', this.props) ||
      hasTargetInProps('activityValue', this.props) ||
      hasTargetInProps('children', this.props)
    ) {
      return;
    }
    const { data } = this.state;
    const newData = [...data];
    const { getAddItem } = this.props;
    const item = (getAddItem && getAddItem()) || {
      title: `Tab${data.length + 1}`,
      content: `Tab${data.length + 1} Content`,
      value: `Tab${data.length + 1}`,
    };
    newData.push(item);
    this.setState({
      activityValue: item.value || `Tab${data.length + 1}`,
      data: setKeyValue(newData),
    });
  };

  getChildrenContent() {
    const { activityValue, data } = this.state;
    const { tabPosition, themeProps, hideContent, tabType } = this.props;
    if (data) {
      themeProps.propsConfig = { tabPosition };
      const contentThemeProps = this.props.getPartOfThemeProps('ContentBlock', {
        props: { tabPosition, tabType },
      });
      if (hideContent) {
        return;
      }
      return (
        <TabContentContainer themeProps={contentThemeProps}>
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
            const value = getAttributeFromObject(
              child,
              'value',
              getAttributeFromObject(
                child.props,
                'value',
                getAttributeFromObject(child, 'children', undefined)
              )
            );
            const props = { active: activityValue, value };
            const innerContentThemeProps = this.props.getPartOfThemeProps('ContentBlock', {
              props,
            });
            const { forceRender } = this.props;
            return content ? (
              forceRender ? (
                activityValue === value && (
                  <TabContent themeProps={innerContentThemeProps}>
                    <TabContentInner
                      {...this.props}
                      themeProps={contentThemeProps}
                      content={content}
                      forceRender={forceRender && value === activityValue}
                    />
                  </TabContent>
                )
              ) : (
                <TabContent themeProps={innerContentThemeProps}>
                  <TabContentInner
                    {...this.props}
                    themeProps={contentThemeProps}
                    content={content}
                    forceRender={forceRender && value === activityValue}
                  />
                </TabContent>
              )
            ) : null;
          })}
        </TabContentContainer>
      );
    }
  }
}

export default ThemeHoc(TabsBox, Widget.Tabs, {
  hover: true,
  active: false,
});
