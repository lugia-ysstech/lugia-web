/**
 *
 * create by liangguodong on 2018/9/6
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import Widget from '../consts/index';
import { TabType, TabPositionType, CardMarginRight } from '../css/tabs';
import {
  getTitlePadding,
  getSelectedStyleByTabType,
  getStyleByTabType,
  getHoverStyleByTabType,
  getTabpaneHoverTransform,
  getButtonShow,
  getTabpaneIconHoverColor,
  getClearButtonOpacity,
  getTabpaneHeight,
} from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2remcss } from '../css/units';
import Icon from '../icon';
import { isVertical, matchType } from './utils';
import { ObjectUtils } from '@lugia/type-utils';

import CSSComponent, { css, keyframes, getBorder } from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import { addMouseEvent } from '@lugia/theme-hoc';
import { deepMerge } from '@lugia/object-utils';
import colorsFunc from '../css/stateColor';

const { themeColor, mediumGreyColor, superLightColor, disableColor } = colorsFunc();

// const BaseTab = ThemeHoc(
//   CSSComponent({
//     tag: 'div',
//     className: 'BaseTab',
//     normal: {
//       selectNames: [['color'], ['background'], ['border'], ['margin']],
//     },
//     hover: {
//       selectNames: [['color'], ['background']],
//       defaultTheme: {
//         color: themeColor,
//       },
//       getCSS: (theme: Object, themeProps: Object) => {
//         return css`
//           & > span {
//             opacity: 1;
//           }
//           & > div.cardTitle {
//             transition: all 0.3s linear;
//             transform: translateX(-3px);
//           }
//         `;
//       },
//     },
//     disabled: {
//       selectNames: [],
//       defaultTheme: {
//         cursor: 'not-allowed',
//         color: '#999',
//       },
//       getCSS: (theme: Object, themeProps: Object) => {
//         const { color } = theme;
//         return css`
//           color: ${color || '#999'};
//
//           & > div.lineTitle::before {
//             content: '';
//             width: 0;
//             height: 0;
//           }
//           & > div.cardTitle {
//             transition: none;
//             transform: none;
//           }
//         `;
//       },
//     },
//     css: css`
//       position: relative;
//       cursor: pointer;
//       white-space: nowrap;
//       display: inline-block;
//       padding: 0 10px 0 20px;
//     `,
//   }),
//   'BaseTab',
//   { hover: true, active: false }
// );

const BaseTabHoc = CSSComponent({
  tag: 'div',
  className: 'BaseTab',
  normal: {
    selectNames: [['color'], ['background'], ['border'], ['margin']],
    getCSS: (theme: Object, themeProps: Object) => {},
  },
  hover: {
    selectNames: [['color'], ['background']],
    defaultTheme: {
      color: themeColor,
    },
    getCSS: (theme: Object, themeProps: Object) => {
      return css`
        & > span {
          opacity: 1;
        }
        & > div.cardTitle {
          transition: all 0.3s linear;
          transform: translateX(-3px);
        }
      `;
    },
  },
  disabled: {
    selectNames: [],
    defaultTheme: {
      cursor: 'not-allowed',
      color: '#999',
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const { color } = theme;
      return css`
        color: ${color || '#999'};

        & > div.lineTitle::before {
          content: '';
          width: 0;
          height: 0;
        }
        & > div.cardTitle {
          transition: none;
          transform: none;
        }
      `;
    },
  },
  css: css`
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    display: inline-block;
    padding: 0 10px 0 20px;
  `,
});

const BaseTab = ThemeHoc(
  class extends React.Component<any, any> {
    render() {
      const { tabType, themeProps } = this.props;

      themeProps.propsConfig = { tabType };
      return <BaseTabHoc themeProps={themeProps} className={'BaseTab'} />;
    }
  },
  'BaseTab',
  { hover: true, active: false }
);

const ActiveTab = ThemeHoc(
  CSSComponent({
    extend: BaseTab,
    className: 'BaseTab',
    normal: {
      selectNames: [['color'], ['background'], ['border'], ['margin']],
      getCSS: (theme: Object, themeProps: Object) => {
        const { color } = theme;
        return css`
          & > div.lineTitle::before {
            content: '';
            width: 100%;
            height: 2px;
            background: ${color || themeColor};
            border-radius: 2px;
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translate(-50%);
            animation: ${addWidth} 0.2s linear forwards;
          }
        `;
      },
    },
    hover: {
      selectNames: [['color']],
      defaultTheme: {
        color: themeColor,
      },
    },
    css: '',
  }),
  'ActiveTab',
  { hover: true, active: false }
);

const addWidth = keyframes`
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
`;

const Title = CSSComponent({
  tag: 'div',
  className: 'TitleLine',
  normal: {
    selectNames: [['height'], ['lineHeight']],
    defaultTheme: {
      height: 34,
      lineHeight: 34,
    },
    getStyle: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      return {
        lineHeight: height ? `${height}px` : '34px',
      };
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
      color: disableColor,
    },
  },
  css: css`
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    user-select: none;
    text-align: left;
    &:focus {
      color: ${themeColor};
    }
  `,
});

const CardTitle = CSSComponent({
  tag: 'div',
  className: 'TitleCard',
  normal: {
    selectNames: [['height'], ['lineHeight']],
    defaultTheme: {
      height: 34,
      lineHeight: 34,
    },
    getStyle: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      return {
        lineHeight: height ? `${height}px` : '34px',
      };
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
      color: disableColor,
    },
  },
  css: css`
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    user-select: none;
    text-align: left;
    &:focus {
      color: ${themeColor};
    }
  `,
});

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

const IconContainer = CSSComponent({
  tag: 'span',
  className: 'IconContainer',
  css: css`
    display: inline-block;
    height: 12px;
    width: 12px;
  `,
  normal: {
    selectNames: [['color']],
  },
  disabled: {
    selectNames: [],
  },
});

const ClearButtonContainer = CSSComponent({
  tag: 'span',
  className: 'IconContainer',
  css: css`
    transition: all 0.3s linear 0.1s;
    z-index: 2;
    opacity: 0;
    color: #999;
  `,
  normal: {
    selectNames: [],
    getCSS: (a, themeProps) => {
      const {
        propsConfig: { tabType },
      } = themeProps;
      if (tabType !== 'card') {
        return 'opacity: 1;margin-left:10px;';
      }
    },
  },
  hover: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
});

const ClearIcon = CSSComponent({
  extend: Icon,
  className: 'ClearIcon',
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

export const doDeepMerge = (mergeTarget: Object, themeProps: Object) => {
  return deepMerge({ themeConfig: { ...mergeTarget } }, themeProps);
};

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
  disabled?: boolean,
  onClick?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  getTabpaneWidth?: Function,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
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
    return this.getHTabPane();
  }

  getHTabPane() {
    const { title, tabType, tabPosition, isSelect, icon, suffixIcon, disabled } = this.props;

    const {
      tabThemeProps: { viewClass, theme },
      titleThemeProps,
    } = this.getHTabPaneThemeProps(tabType, isSelect);

    const TabTarget = isSelect ? ActiveTab : BaseTab;
    console.log('title', title);
    let Target = (
      <TabTarget
        // themeProps={tabThemeProps}
        {...addMouseEvent(this, { enter: this.onMouseEnter, leave: this.onMouseLeave })}
        theme={theme}
        viewClass={viewClass}
        disabled={disabled}
        tabType={tabType}
        onClick={this.handleClick}
        isSelect={isSelect}
        ref={this.tabpane}
        // onMouseEnter={this.onMouseEnter}
        // onMouseLeave={this.onMouseLeave}
      >
        {this.getTabIconContainer(icon, titleThemeProps)}
        {tabType === 'line' ? (
          <Title
            className={'lineTitle'}
            themeProps={titleThemeProps}
            hasPreIcon={this.getTabIconContainer(icon, titleThemeProps) !== null}
            hasSuffixIcon={this.getTabIconContainer(suffixIcon, titleThemeProps) !== null}
            tabType={tabType}
            isSelect={isSelect}
            disabled={disabled}
          >
            {title}
          </Title>
        ) : (
          <CardTitle
            className={'cardTitle'}
            themeProps={titleThemeProps}
            hasPreIcon={this.getTabIconContainer(icon, titleThemeProps) !== null}
            hasSuffixIcon={this.getTabIconContainer(suffixIcon, titleThemeProps) !== null}
            tabType={tabType}
            isSelect={isSelect}
            disabled={disabled}
          >
            {title}
          </CardTitle>
        )}

        {this.getTabIconContainer(suffixIcon, titleThemeProps, 'suffix')}
        {this.getClearButton()}
      </TabTarget>
    );
    if (matchType(tabType, 'line') && isVertical(tabPosition)) {
      Target = (
        <TabTarget
          theme={theme}
          viewClass={viewClass}
          disabled={disabled}
          tabType={tabType}
          onClick={this.handleClick}
          isSelect={isSelect}
          ref={this.tabpane}
          {...addMouseEvent(this, { enter: this.onMouseEnter, leave: this.onMouseLeave })}
          // onMouseEnter={this.onMouseEnter}
          // onMouseLeave={this.onMouseLeave}
        >
          {this.getTabIconContainer(icon, titleThemeProps)}
          <Title
            className={'lineTitle'}
            themeProps={titleThemeProps}
            hasPreIcon={this.getTabIconContainer(icon, titleThemeProps) !== null}
            hasSuffixIcon={this.getTabIconContainer(suffixIcon, titleThemeProps) !== null}
            tabType={tabType}
            isSelect={isSelect}
            disabled={disabled}
          >
            {title}
          </Title>
        </TabTarget>
      );
    }
    return Target;
  }

  getHTabPaneThemeProps(tabType: string, isSelect: boolean) {
    let titleThemeProps = this.props.getPartOfThemeProps('DefaultTabPan');
    const cardTabPanThemeProps = this.props.getPartOfThemeProps('SelectTabPan');
    console.log('doDeepMerge a,b', titleThemeProps, 'B', cardTabPanThemeProps);
    console.log('doDeepMerge', doDeepMerge(titleThemeProps, cardTabPanThemeProps));

    const { props } = this;
    const targetObj = { normal: { ...getTitlePadding(props) } };
    titleThemeProps = doDeepMerge(targetObj, titleThemeProps);

    // let tabThemeProps = this.props.getPartOfThemeProps('DefaultTabPan');
    const { viewClass, theme } = this.props.getPartOfThemeHocProps('DefaultTabPan');
    let themeRes = theme;
    switch (tabType) {
      case 'card':
        const borderInfo = { color: superLightColor, width: 1, style: 'solid' };
        const border = getBorder({ ...borderInfo }, { radius: 4, radiusDirections: ['tl', 'tr'] });
        const cardDefault = {
          normal: { background: { color: '#f8f8f8' }, margin: { right: CardMarginRight }, border },
        };
        const cardThemeProps = doDeepMerge(
          cardDefault,
          this.props.getPartOfThemeProps('CardTabPan')
        );

        const cardTabThemeProps = doDeepMerge(theme[viewClass], cardThemeProps);
        themeRes = { [viewClass]: cardTabThemeProps.themeConfig };

        break;
      case 'window':
        const windowBorder = getBorder(
          { border: 'none' },
          { radius: 4, radiusDirections: ['tl', 'tr'] }
        );
        const windowDefault = {
          normal: { background: { color: '#ffffff' }, border: windowBorder },
        };
        const windowThemeProps = doDeepMerge(
          windowDefault,
          this.props.getPartOfThemeProps('WindowTabPan')
        );
        const windowTabThemeProps = doDeepMerge(theme[viewClass], windowThemeProps);
        themeRes = { [viewClass]: windowTabThemeProps.themeConfig };
        break;
      default:
        break;
    }

    if (isSelect) {
      titleThemeProps = doDeepMerge(
        { ...titleThemeProps.themeConfig },
        this.props.getPartOfThemeProps('SelectTabPan')
      );
      const windowThemeProps = doDeepMerge(
        themeRes[viewClass],
        this.props.getPartOfThemeProps('SelectTabPan')
      );
      themeRes = { [viewClass]: windowThemeProps.themeConfig };
    }

    titleThemeProps.propsConfig = { tabType, isSelect };
    return { tabThemeProps: { viewClass, theme: themeRes }, titleThemeProps };
  }

  componentDidMount() {
    // this.getContainerWidth();
  }

  handleClick = () => {
    const { activityValue, onClick, disabled } = this.props;
    if (!disabled) onClick && onClick(activityValue);
  };

  getTabIconContainer(icon: ?string, themeProps?: Object = {}, type?: string) {
    // const closeTheme = {...themeProps};
    // if(type ==='suffix'){
    //   closeTheme.themeConfig = doDeepMerge(themeProps.themeConfig,{themeConfig:{normal:{color: '#999'}}}).themeConfig;
    // }
    return icon ? (
      <IconContainer themeProps={themeProps}>{this.getIcon(icon, themeProps)}</IconContainer>
    ) : null;
  }
  getIcon(icon: string, themeProps: Object) {
    const { isSelect, disabled } = this.props;
    if (ObjectUtils.isString(icon)) {
      return (
        <TabIcon themeProps={themeProps} isSelect={isSelect} iconClass={icon} disabled={disabled} />
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
    const cBtnthemeProps = deepMerge({ propsConfig: { tabType } }, themeProps);
    if (!matchType(tabType, 'line')) {
      return (
        <ClearButtonContainer
          themeProps={cBtnthemeProps}
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
// const TargetTabpano = ThemeProvider(KeyBoardEventAdaptor(Tabpane), Widget.Tabpane, {
//   hover: true,
//   actived: false,
// });
//
// export default TargetTabpano;
export default Tabpane;

// 原先是  const BaseTab = ThemeHoc(
//   CSSComponent({
//     ....
//   }),
//   'BaseTab',
//   { hover: true, active: false }
// );
//
// 拆成
// const BaseTabCSShOC = CSSComponent({
//     class TabsBox extends Component{
//        <aaa><aaa/>
//     }
// });
// BaseTabCSShOC.themeProps.propsConfig = {xxxxxxx};
//  <BaseTabCSShOC themeProps= { 合并后的themeProps }></BaseTabCSShOC>

// const BaseTab = ThemeHoc(
//    BaseTabCSShOC,
//   'BaseTab',
//   { hover: true, active: false }
// );

// <BaseTab theme={theme} viewClass={viewClass}></BaseTab>
