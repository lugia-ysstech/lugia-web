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
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import { deepMerge } from '@lugia/object-utils';

const TabContentContainer = CSSComponent({
  tag: 'div',
  className: 'ContentBlock',
  normal: {
    selectNames: [['padding'], ['width'], ['height']],
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
});
const TabContent = CSSComponent({
  tag: 'div',
  className: 'ContentBlock',
  normal: {
    selectNames: [],
    getCSS: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { active, key },
      } = themeProps;
      if (active === key) {
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
    defaultTheme: {
      background: {
        color: '#f8f8f8',
      },
    },
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
    selectNames: [['width'], ['height']],
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
const VerticalOutContainer = CSSComponent({
  tag: 'div',
  className: 'OutContainer',
  normal: {
    selectNames: [['width'], ['height']],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
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
};

type TabsProps = {
  activityValue?: string,
  defaultActivityValue?: string,
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
};
export function hasTargetInProps(target: string, props: TabsProps) {
  return `${target}` in props;
}
export function setKeyValue(data: Array<Object>) {
  const newData = [...data];
  return newData.map((item, index) => {
    const newItem = { ...item };
    const { key } = newItem;
    if (!key) {
      newItem.key = `Tab${index + 1}`;
    }
    return newItem;
  });
}

export function getDefaultData(props: Object) {
  const { defaultData, data, children } = props;
  let configData = [
    { title: 'Tab1', content: 'Tab1 content', key: 'Tab1' },
    { title: 'Tab2', content: 'Tab2 content', key: 'Tab2' },
    { title: 'Tab3', content: 'Tab3 content', key: 'Tab3' },
  ];
  if (hasTargetInProps('data', props) && Array.isArray(data)) {
    configData = data ? data : [];
  } else {
    if (children) {
      configData = [];
      React.Children.map(children, child => {
        configData && configData.push(child.props);
      });
    } else {
      configData = defaultData ? defaultData : configData;
    }
  }
  return setKeyValue(configData);
}

class TabsBox extends Component<TabsProps, TabsState> {
  static defaultProps = {
    tabType: 'line',
    tabPosition: 'top',
    pagedType: 'single',
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

    let theData = getDefaultData(props);
    let theActivityValue =
      activityValue || defaultActivityValue || (theData.length !== 0 ? theData[0].key : null);
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

  render() {
    const { themeProps, tabType, tabPosition } = this.props;
    const ContainerBox =
      tabType === 'line' && isVertical(tabPosition) ? VerticalOutContainer : OutContainer;
    const containerThemeProps = this.props.getPartOfThemeProps('Container');
    let target = (
      <ContainerBox className={'OutContainer'} themeProps={containerThemeProps}>
        <TabHeader {...this.getTabHeaderProps()} />
        {this.getChildrenContent()}
      </ContainerBox>
    );
    if (tabType === 'line') {
      if (tabPosition === 'right' || tabPosition === 'bottom') {
        target = (
          <ContainerBox themeProps={containerThemeProps}>
            {this.getChildrenContent()}
            <TabHeader {...this.getTabHeaderProps()} />
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
                color: '#c9c9c9',
              },
            },
          },
        },
        containerThemeProps,
        this.props.getPartOfThemeProps('WindowContainer')
      );

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
    const {
      tabType,
      tabPosition,
      showAddBtn,
      pagedType,
      getTabpane,
      showDeleteBtn,
      themeProps,
      getPartOfThemeHocProps,
      getPartOfThemeProps,
    } = this.props;
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
    };
  }

  onChange = (res: Object) => {
    const { onChange } = this.props;
    onChange && onChange(res);
    if (hasTargetInProps('activityValue', this.props)) {
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
      title: `Tab${data.length + 1}`,
      content: `Tab${data.length + 1} Content`,
      key: `Tab${data.length + 1}`,
    };
    newData.push(item);
    this.setState({
      activityValue: item.key || `Tab${data.length + 1}`,
      data: setKeyValue(newData),
    });
  };

  getChildrenContent() {
    const { activityValue, data } = this.state;
    const { tabPosition, themeProps, hideContent } = this.props;
    if (data) {
      themeProps.propsConfig = { tabPosition };
      const contentThemeProps = this.props.getPartOfThemeProps('ContentBlock', {
        props: { tabPosition },
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
            const key = getAttributeFromObject(
              child,
              'key',
              getAttributeFromObject(
                child.props,
                'key',
                getAttributeFromObject(child, 'children', undefined)
              )
            );
            const props = { active: activityValue, key };
            const innerContentThemeProps = this.props.getPartOfThemeProps('ContentBlock', {
              props,
            });
            const { forceRender } = this.props;
            return forceRender ? (
              activityValue === key && (
                <TabContent themeProps={innerContentThemeProps}>
                  <TabContentInner
                    {...this.props}
                    themeProps={contentThemeProps}
                    content={content}
                    forceRender={forceRender && key === activityValue}
                  />
                </TabContent>
              )
            ) : (
              <TabContent themeProps={innerContentThemeProps}>
                <TabContentInner
                  {...this.props}
                  themeProps={contentThemeProps}
                  content={content}
                  forceRender={forceRender && key === activityValue}
                />
              </TabContent>
            );
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
