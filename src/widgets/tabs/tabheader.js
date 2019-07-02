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
import { getBorder } from '@lugia/theme-css-hoc/lib/index';
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
    border: 1px solid ${superLightColor};
    border-radius: 4px;
    background: #f8f8f8;
    line-height: ${px2remcss(AddButtonSize)};
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
    vertical-align: text-top !important;
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
}); //height: ${hContainerHeight};

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
// ${getCursor};

PageIcon.displayName = 'page';

type TabsState = {|
  activityValue: number,
  data: Array<Object>,
  currentPage: number,
  totalPage: number,
  pagedCount: number,
  arrowShow: boolean,
  childrenSize: Array<number>,
|};

type TabsProps = {
  activityValue: number,
  tabPosition?: TabPositionType,
  tabType?: TabType,
  data?: Array<Object>,
  showAddBtn?: boolean,
  pagedType?: PagedType,
  onChange?: Function,
  onTabClick?: Function,
  onPreClick?: Function,
  onNextClick?: Function,
  onAddClick?: Function,
  onDeleteClick?: Function,
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
    console.log('componentDidUpdate props.data', props.data, this.titlePanel);
  }

  static getDerivedStateFromProps(props: TabsProps, state: TabsState) {
    const { activityValue, data } = props;
    // const configData = getDefaultData(props);
    // let theData;
    // let childrenSize = [];
    // let allowToAddChildrenSize = true;
    // if (!state) {
    //   theData = configData || [];
    // } else {
    //   theData = state.data;
    //
    //   childrenSize = state.childrenSize;
    //   allowToAddChildrenSize = (state.beforeDataLength === theData.length) ? false : true;
    // }
    //
    const returnData = {
      data,
      currentPage: 0,
      totalPage: 1,
      pagedCount: 0,
      arrowShow: false,
      activityValue,
    };
    return {
      ...returnData,
    };
  }

  // shouldComponentUpdate(nextProps: any, nextState: any) {
  //   console.log('componentDidUpdate',nextProps,nextState);
  //   return true;
  // }

  componentDidMount() {
    this.getTabpaneWidthOrHeight();
  }

  render() {
    const { data } = this.state;
    // this.titlePanel = [...Array(data.length)].map(() => React.createRef());
    return <React.Fragment>{this.getTabs()}</React.Fragment>;
  }

  getTabs() {
    const { tabPosition } = this.props;
    // if (isVertical(tabPosition)) {
    //   return this.getVtabs();
    // }
    // return this.getHorizonTabPan();
    // return (<div>123123</div>);
    return this.getTestHorizonTabPan();
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
    console.log('data---', data);
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

  getTabpaneConfig(child: React$Element<any>, i: number) {
    const { tabPosition, tabType } = this.props;
    const { activityValue, data, allowToAddChildrenSize, childrenSize } = this.state;
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
      isSelect: !disabled && activityValue === i,
      allowToAddChildrenSize,
      childrenSize,
      // getTabpaneWidthOrHeight: this.getTabpaneWidthOrHeight,
      onDeleteClick: this.onDeleteClick,
      disabled,
      onMouseEnter: this.onTabMouseEnter,
      onMouseLeave: this.onTabMouseLeave,
    };
  }

  getTabpaneWidthOrHeight = () => {
    console.log('componentDidUpdate getTabpaneWidthOrHeight', this.titlePanel);
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
    console.log('componentDidUpdate titleSize', titleSize);
  };

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
      this.setState({ activityValue: index });
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
      return data[index].disabled;
    }
    return false;
  }

  onTabMouseEnter = (activityValue: string, e: Event) => {
    const { onTabMouseEnter } = this.props;
    onTabMouseEnter && onTabMouseEnter(activityValue, e);
  };

  onTabMouseLeave = (activityValue: string, e: Event) => {
    const { onTabMouseLeave } = this.props;
    onTabMouseLeave && onTabMouseLeave(activityValue, e);
  };
}

const TargetTabs = ThemeHoc(KeyBoardEventAdaptor(TabHeader), 'TabHeader', {
  hover: true,
  active: false,
});
export default TargetTabs;
