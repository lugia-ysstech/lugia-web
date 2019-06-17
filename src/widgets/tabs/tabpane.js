/**
 *
 * create by liangguodong on 2018/9/6
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import Widget from '../consts/index';
import { TabType, TabPositionType } from '../css/tabs';
import { getTitlePadding, getClearButtonOpacity, getTabpaneHeight } from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2remcss } from '../css/units';
import Icon from '../icon';
import { isVertical, matchType } from './utils';
import { ObjectUtils } from '@lugia/type-utils';

import CSSComponent, { css, keyframes } from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import { deepMerge } from '@lugia/object-utils';
import colorsFunc from '../css/stateColor';
const { themeColor, mediumGreyColor, superLightColor, disableColor } = colorsFunc();

const em = px2remcss(1.2);
//
// const BaseTab = styled.div`
//   position: relative;
//   cursor: pointer;
//   white-space: nowrap;
//   ${getTabpaneCursor};
// `;

const BaseTab = CSSComponent({
  tag: 'div',
  className: 'BaseTab',
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
    defaultTheme: {
      cursor: 'not-allowed',
    },
  },
  css: css`
    position: relative;
    cursor: pointer;
    white-space: nowrap;
  `,
});

const VTab = CSSComponent({
  extend: BaseTab,
  className: 'VTab',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [['color']],
    defaultTheme: {
      color: themeColor,
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      cursor: 'not-allowed',
      color: disableColor,
    },
  },
  css: css`
    padding: 0 10px;
    display: block;
  `,
});
// 《-text-align: ${props => (matchType(props.tabPosition, 'left') ? 'right' : 'left')};

// const VTab = styled(BaseTab)`
//   text-align: ${props => (matchType(props.tabPosition, 'left') ? 'right' : 'left')};
//   padding: 0 ${em(10)};
//   display: block;
//   &:hover > div {
//     ${getTabpaneHoverColor};
//   }
// `;

VTab.displayName = 'yTabpane';
// const HTab = styled(BaseTab)`
//   display: inline-block;
//   line-height: ${getTabpaneHeight};
//   ${getTabpanePadding};
//   ${getTabpaneFocusShadow};
//   ${getTabpaneBorderTopRadius};
//   ${getTabpaneBottom};
//   ${getTabpaneLeft};
//   ${getTabpaneBackground};
//   ${getTabpaneBorder};
//   ${getTabpaneMarginRight};
//   z-index: 5;
//   box-sizing: border-box;
//   &:hover > div {
//     ${getTabpaneHoverTransform};
//     ${getTabpaneHoverColor};
//   }
//
//   &:hover > span > i:first-child {
//     ${getTabpaneIconHoverColor};
//   }
//
//   &:hover > span {
//     ${getButtonShow};
//   }
// `;

const HTab = CSSComponent({
  extend: BaseTab,
  className: 'HTab',
  normal: {
    selectNames: [['height']],
    defaultTheme: {
      height: 34,
    },
  },
  hover: {
    selectNames: [['color']],
    defaultTheme: {
      color: themeColor,
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      cursor: 'not-allowed',
      color: disableColor,
    },
  },
  css: css`
    display: inline-block;
  `,
});

HTab.displayName = 'hTabpane';
//
// const Title = styled.div`
//   ${getSelectColor};
//   position: relative;
//   display: inline-block;
//   box-sizing: border-box;
//   user-select: none;
//   text-align: left;
//   ${getTitlePadding};
//   height: ${getTabpaneHeight};
//   line-height: ${getTabpaneHeight};
//   &:focus {
//     ${getTabpaneHoverColor};
//   }
// `;

const Title = CSSComponent({
  tag: 'div',
  className: 'BaseTab',
  normal: {
    selectNames: [['height'], ['color'], ['padding']],
    defaultTheme: {
      height: 34,
    },
  },
  disabled: {
    selectNames: [],
    defaultTheme: {
      color: disableColor,
    },
  },
  css: css`
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    user-select: none;
    text-align: left;
    line-height: 34px;
    &:focus {
      color: ${themeColor};
    }
  `,
});

// const TabIcon: Object = styled(Icon)`
//   ${getSelectColor};
//   display: inline-block;
// `;

const TabIcon = CSSComponent({
  extend: Icon,
  className: 'TabIcon',
  css: css`
    vertical-align: text-bottom !important;
    display: inline-block;
  `,
  normal: {
    selectNames: [['color']],
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: disableColor,
    },
  },
});
//
// const IconContainer = styled.span`
//   display: inline-block;
//   height: ${em(12)};
//   width: ${em(12)};
// `;

const IconContainer = CSSComponent({
  tag: 'span',
  className: 'IconContainer',
  css: css`
    display: inline-block;
    height: 12px;
    width: 12px;
  `,
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
});
// ${getClearButtonOpacity}; -》
const ClearButtonContainer = CSSComponent({
  tag: 'span',
  className: 'IconContainer',
  css: css`
    transition: all 0.3s linear 0.1s;
    z-index: 2;
    display: inline-block;
  `,
  normal: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
});

const ClearIcon = CSSComponent({
  tag: 'span',
  className: 'IconContainer',
  css: css`
    font-size: 1rem;
  `,
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
    defaultTheme: {
      color: mediumGreyColor,
    },
  },
});

ClearIcon.displayName = 'deleteIcon';
type TabpaneState = {
  iconClass: string,
};

type TabpaneProps = {
  title: string,
  onDeleteClick?: Function,
  icon?: string,
  suffixIcon?: string,
  tabType: TabType,
  tabPosition: TabPositionType,
  activityValue: string,
  isSelect: boolean,
  disabled: boolean,
  onClick?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  getTabpaneWidth?: Function,
  themeProps: Object,
  // getTheme: Function,
};

class Tabpane extends Component<TabpaneProps, TabpaneState> {
  static defaultProps = {};
  static displayName = Widget.Tabpane;
  tabpane: any;
  offsetWidth: number;

  constructor(props: TabpaneProps) {
    super(props);
    this.tabpane = React.createRef();
    this.offsetWidth = 0;
  }

  static getDerivedStateFromProps(nextProps: TabpaneProps, state: TabpaneState) {
    if (!state) {
      return {
        iconClass: 'lugia-icon-reminder_close',
      };
    }
  }

  render() {
    const { title, tabType, tabPosition, isSelect, disabled, themeProps } = this.props;
    if (matchType(tabType, 'line') && isVertical(tabPosition)) {
      return (
        <VTab
          themeProps={themeProps}
          tabPosition={tabPosition}
          onClick={this.handleClick}
          isSelect={isSelect}
          disabled={disabled}
        >
          <Title themeProps={themeProps} isSelect={isSelect} disabled={disabled}>
            {title}
          </Title>
        </VTab>
      );
    }
    return this.getHTabpane();
  }

  getHTabpane() {
    const {
      title,
      tabType,
      isSelect,
      icon,
      suffixIcon,
      disabled,
      getTheme,
      themeProps,
    } = this.props;
    let titleThemeProps = this.props.getPartOfThemeProps('SelectTitle');
    if (isSelect) {
      titleThemeProps = this.props.getPartOfThemeProps('SelectTitle');
    }
    // {themeConfig:{getTitlePadding(this.props)}}
    const { props } = this;

    titleThemeProps = deepMerge(
      { themeConfig: { normal: { ...getTitlePadding(props) } } },
      titleThemeProps
    );
    console.log('titleThemeProps', titleThemeProps);
    const Target = (
      <HTab
        themeProps={themeProps}
        disabled={disabled}
        tabType={tabType}
        onClick={this.handleClick}
        isSelect={isSelect}
        ref={this.tabpane}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        theme={getTheme()}
      >
        {this.getTabIconContainer(icon)}
        <Title
          themeProps={titleThemeProps}
          hasPreIcon={this.getTabIconContainer(icon) !== null}
          hasSuffixIcon={this.getTabIconContainer(suffixIcon) !== null}
          tabType={tabType}
          isSelect={isSelect}
          disabled={disabled}
          theme={getTheme()}
        >
          {title}
        </Title>
        {this.getTabIconContainer(suffixIcon, 'suffix')}
        {this.getClearButton()}
      </HTab>
    );
    return Target;
  }

  componentDidMount() {
    console.log('themeProps componentDidMount');

    // this.getContainerWidth();
  }

  handleClick = () => {
    const { activityValue, onClick, disabled } = this.props;
    if (!disabled) onClick && onClick(activityValue);
  };

  getTabIconContainer(icon, type) {
    const { themeProps, isSelect } = this.props;

    return icon ? (
      <IconContainer themeProps={themeProps}>{this.getIcon(icon)}</IconContainer>
    ) : null;
  }
  getIcon(icon) {
    const { isSelect, disabled, themeProps } = this.props;
    let selectThemeProps = themeProps;
    if (isSelect) {
      selectThemeProps = this.props.getPartOfThemeHocProps('SelectTitle');
    }
    if (ObjectUtils.isString(icon)) {
      return (
        <TabIcon
          themeProps={selectThemeProps}
          isSelect={isSelect}
          iconClass={icon}
          disabled={disabled}
        />
      );
    }
    return icon;
  }
  onDeleteClick = (e: Event) => {
    const { onDeleteClick, activityValue } = this.props;
    onDeleteClick && onDeleteClick(e, activityValue);
  };
  getClearButton() {
    const { tabType, themeProps } = this.props;
    const { iconClass } = this.state;
    if (!matchType(tabType, 'line')) {
      return (
        <ClearButtonContainer
          themeProps={themeProps}
          onMouseEnter={this.clearButtonMouseEnter}
          onMouseLeave={this.clearButtonMouseLeave}
          onClick={this.onDeleteClick}
          tabType={tabType}
        >
          <ClearIcon themeProps={themeProps} iconClass={iconClass} />
        </ClearButtonContainer>
      );
    }
    return null;
  }
  clearButtonMouseEnter = () => {
    this.setState({ iconClass: 'lugia-icon-reminder_close_circle' });
  };
  clearButtonMouseLeave = () => {
    this.setState({ iconClass: 'lugia-icon-reminder_close' });
  };
  onMouseEnter = (e: Object) => {
    const { onMouseEnter, activityValue } = this.props;
    onMouseEnter && onMouseEnter(activityValue);
  };
  onMouseLeave = (e: Object) => {
    const { onMouseLeave, activityValue } = this.props;
    onMouseLeave && onMouseLeave(activityValue);
  };
  getContainerWidth() {
    if (this.tabpane) {
      this.offsetWidth = this.tabpane.offsetWidth;
    }
    // const { getTabpaneWidth } = this.props;
    // getTabpaneWidth && getTabpaneWidth(this.offsetWidth);
  }
}

// const TargetTabpano = ThemeProvider(Tabpane, Widget.Tabpane, { hover: true, actived: false });
const TargetTabpano = ThemeProvider(KeyBoardEventAdaptor(Tabpane), Widget.Tabpane, {
  hover: true,
  actived: false,
});

export default TargetTabpano;
