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
import Icon from '../icon';
import Divider from '../divider';
import { isVertical, matchType } from './utils';
import { ObjectUtils } from '@lugia/type-utils';

import CSSComponent, { css, keyframes, StaticComponent } from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';

import { deepMerge } from '@lugia/object-utils';
import colorsFunc from '../css/stateColor';

import { getBorder } from '@lugia/theme-utils';

const { themeColor, disableColor, defaultColor } = colorsFunc();

const BaseTab = CSSComponent({
  tag: 'div',
  className: 'DefaultTabPan',
  normal: {
    selectNames: [
      ['color'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['margin'],
      ['padding'],
      ['font'],
      ['opacity'],
      ['width'],
      ['height'],
    ],
    getCSS: (theme: Object, themeProps: Object) => {
      const { color, background } = theme;
      const {
        propsConfig: { isSelect, tabType, tabPosition },
      } = themeProps;
      let display = 'inline-block';
      let textAlign = 'text-align: center';
      let position = '';
      let border = '';
      if (isVertical(tabPosition)) {
        display = 'block';
        if (tabPosition === 'left') {
          textAlign = 'text-align: right';
        } else {
          textAlign = 'text-align: left';
        }
      }
      if (isSelect && tabType === 'line') {
        let cssString = css`
          width: 100%;
          height: 2px;
          left: 50%;
          animation: ${addWidth} 0.2s linear forwards;
          transform: translateX(-50%);
        `;
        let pos = tabPosition === 'top' ? 'bottom: 0px;' : 'top: 0px;';
        if (isVertical(tabPosition)) {
          pos = tabPosition === 'left' ? 'right: -20px;' : 'left: -20px;';
          cssString = css`
            width: 2px;
            height: 100%;
            top: 50%;
            animation: ${addHeight} 0.2s linear forwards;
            transform: translateY(-50%);
          `;
        }
        return css`
          display: ${display};
          ${textAlign}
          & > div::before {
            content: '';
            background: ${color || themeColor};
            border-radius: 2px;
            position: absolute;
            ${pos}
            ${cssString}
          }
        `;
      }
      if (tabType === 'card') {
        position = 'bottom: -1px;';
        if (isSelect) {
          border = `border-bottom: 1px solid ${background ? background.color : '#fff'};`;
        }
      }
      return css`
        display: ${display};
        ${textAlign}
        ${position}
        ${border}
      `;
    },
  },
  hover: {
    selectNames: [['color'], ['background'], ['border'], ['font'], ['opacity']],
    defaultTheme: {
      color: themeColor,
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { tabType, showDeleteBtn },
      } = themeProps;
      let cssString = `
        & > span {
          opacity: 1;
        }
      `;
      if (tabType === 'card' && showDeleteBtn === true) {
        cssString += ` & > div {
          transition: all 0.3s linear;
          transform: translateX(-8px);
        }`;
      }
      return css`
        ${cssString}
      `;
    },
  },
  disabled: {
    selectNames: [['color'], ['cursor']],
    defaultTheme: {
      cursor: 'not-allowed',
      color: 'yellow',
    },
    getCSS(theme: Object, themeProps: Object) {
      return css`
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
    padding: 0 20px;
  `,
  option: { hover: true },
});

BaseTab.displayName = 'Tabpane';

const SelectTab = CSSComponent({
  extend: BaseTab,
  className: 'SelectTabPan',
});

const addWidth = keyframes`
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
`;

const addHeight = keyframes`
    0% {
      height: 0;
    }
    100% {
      height: 100%;
    }
`;

const Title = CSSComponent({
  tag: 'div',
  className: 'TitleLine',
  normal: {
    selectNames: [['height'], ['lineHeight']],
    defaultTheme: {
      height: 42,
      lineHeight: 42,
    },
    getStyle: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      return {
        lineHeight: height ? `${height}px` : '3.4rem',
      };
    },
    getThemeMeta: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      return {
        lineHeight: height ? `${height}` : '3.4rem',
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
      height: 31,
      lineHeight: 31,
    },
    getStyle: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      const { propsConfig: { tabType } = {} } = themeProps;
      if (tabType === 'card') {
        return {
          lineHeight: height ? `${height}px` : '32px',
          textAlign: 'center',
          width: '100%',
        };
      }
      return {
        lineHeight: height ? `${height}px` : '32px',
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

const ClearButtonContainer = CSSComponent({
  tag: 'span',
  className: 'IconContainer',
  css: css`
    transition: all 0.3s linear 0.1s;
    z-index: 2;
    opacity: 0;
    color: #999;
    margin-left: -5px;
    vertical-align: middle;
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
      return '';
    },
  },
  hover: {
    selectNames: [],
  },

  disabled: {
    selectNames: [],
  },
});

const TabPanContainer = StaticComponent({
  tag: 'div',
  className: 'TabPanContainer',
  css: css`
    text-align: center;
    display: ${props => {
      return props.isVertical ? '' : 'inline-block';
    }};
  `,
});

type TabpaneState = {
  iconClass: string,
};

type TabpaneProps = {
  title: string,
  onDelete?: Function,
  icon?: string,
  suffixIcon?: string,
  tabType?: TabType,
  tabPosition?: TabPositionType,
  index: number,
  activityValue: string,
  keyVal: string,
  isSelect?: boolean,
  disabled?: boolean,
  showDeleteBtn?: boolean,
  onClick?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  showDividerLine: boolean,
};

class Tabpane extends Component<TabpaneProps, TabpaneState> {
  static displayName = Widget.Tabpane;

  static getDerivedStateFromProps(nextProps: TabpaneProps, state: TabpaneState) {
    if (!state) {
      return {
        iconClass: 'lugia-icon-reminder_close',
      };
    }
  }

  render() {
    const {
      title,
      tabType,
      tabPosition,
      isSelect,
      icon,
      suffixIcon,
      disabled,
      showDeleteBtn,
      showDividerLine,
    } = this.props;
    const { TargetTab, themeProps, iconThemes } = this.getHTabPaneThemeProps(
      tabType,
      isSelect,
      tabPosition,
      showDeleteBtn,
      disabled
    );
    const isLineType = matchType(tabType, 'line');

    const Target = (
      <TargetTab
        themeProps={themeProps}
        disabled={disabled}
        tabType={tabType}
        onClick={this.handleClick}
        isSelect={isSelect}
        tabPosition={tabPosition}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {isLineType ? (
          <Title
            className={'lineTitle'}
            themeProps={themeProps}
            tabType={tabType}
            isSelect={isSelect}
            disabled={disabled}
          >
            {this.getTabIconContainer(icon, iconThemes)}
            {title}
            {this.getTabIconContainer(suffixIcon, iconThemes)}
          </Title>
        ) : (
          <CardTitle
            className={'cardTitle'}
            themeProps={themeProps}
            tabType={tabType}
            isSelect={isSelect}
            disabled={disabled}
          >
            {this.getTabIconContainer(icon, iconThemes)}
            {title}
            {this.getTabIconContainer(suffixIcon, iconThemes)}
          </CardTitle>
        )}

        {!isLineType && this.getClearButton()}
      </TargetTab>
    );
    let resTabPan = Target;
    if (isLineType && showDividerLine) {
      resTabPan = (
        <TabPanContainer isVertical={isVertical(tabPosition)}>
          {Target}
          {this.getDivider(isVertical(tabPosition))}
        </TabPanContainer>
      );
    }
    return resTabPan;
  }

  getHTabPaneThemeProps(
    tabType: ?string,
    isSelect: ?boolean,
    tabPosition: ?string,
    showDeleteBtn: ?boolean,
    disabled: ?boolean
  ) {
    let titleThemeProps = this.props.getPartOfThemeProps('DefaultTabPan', {
      props: { isSelect, tabType, tabPosition, showDeleteBtn, disabled },
    });

    let { theme, viewClass } = this.props.getPartOfThemeHocProps('DefaultTabPan');
    const { icon, suffixIcon } = this.props;
    const themeObj = {
      [viewClass]: {
        normal: {
          getThemeMeta: (theme: Object, themeProps: Object) => {
            return { margin: { left: suffixIcon ? 10 : 0, right: icon ? 10 : 0 } };
          },
        },
        disabled: {
          getThemeMeta: (theme: Object, themeProps: Object) => {
            return { cursor: 'not-allowed', color: disableColor };
          },
        },
      },
    };
    theme = deepMerge(theme, themeObj);
    let selectThemeProps = this.props.getPartOfThemeProps('SelectTabPan', {
      props: { isSelect, tabType, tabPosition, showDeleteBtn, disabled },
    });
    selectThemeProps = deepMerge(
      titleThemeProps,
      { themeConfig: { normal: { color: themeColor } } },
      selectThemeProps
    );
    const baseDefaultTab = BaseTab;
    switch (tabType) {
      case 'card':
        const targetObj = {
          themeConfig: {
            normal: {
              border: getBorder(
                { color: '#e8e8e8', width: 1, style: 'solid' },
                { directions: ['l', 'r', 't'] }
              ),
              borderRadius: {
                topLeft: 4,
                topRight: 4,
              },
              margin: {
                left: 4,
                right: 4,
              },
              background: {
                color: '#e8e8e8',
              },
            },
          },
        };
        titleThemeProps = deepMerge(targetObj, titleThemeProps);
        const cardSelectObj = {
          themeConfig: {
            normal: {
              margin: {
                left: 4,
                right: 4,
              },
              border: getBorder(
                { color: '#e8e8e8', width: 1, style: 'solid' },
                { directions: ['l', 'r', 't'] }
              ),
              borderRadius: {
                topLeft: 4,
                topRight: 4,
              },
              background: { color: defaultColor },
            },
          },
        };
        selectThemeProps = deepMerge(cardSelectObj, selectThemeProps);
        break;
      case 'window':
        const windowSelectObj = {
          themeConfig: {
            normal: {
              border: getBorder({ border: 'none' }),
              borderRadius: {
                topLeft: 4,
                topRight: 4,
              },
              background: {
                color: '#fff',
              },
            },
          },
        };
        selectThemeProps = deepMerge(windowSelectObj, selectThemeProps);
        break;
      default:
        break;
    }
    const TargetTab = isSelect ? SelectTab : baseDefaultTab;
    const themeProps = isSelect ? selectThemeProps : titleThemeProps;
    return { TargetTab, themeProps, iconThemes: { theme, viewClass } };
  }

  handleClick = () => {
    const { index, onClick, disabled, keyVal } = this.props;
    if (!disabled) onClick && onClick({ index, activityValue: keyVal });
  };

  getTabIconContainer(icon: ?string, themeProps?: Object = {}) {
    return icon ? this.getIcon(icon, themeProps) : null;
  }
  getIcon(icon: string, themeProps: Object) {
    const { isSelect, disabled } = this.props;
    if (ObjectUtils.isString(icon)) {
      return (
        <Icon
          {...themeProps}
          isSelect={isSelect}
          iconClass={icon}
          disabled={disabled}
          singleTheme
        />
      );
    }
    return icon;
  }
  getDivider(isVertical: boolean): React$Node {
    const { theme, viewClass } = this.props.getPartOfThemeHocProps('DividerTheme');

    const props = isVertical ? 'width' : 'height';
    const size = isVertical ? 30 : 20;
    const defaultThemeObj = {
      [viewClass]: {
        Divider: {
          normal: {
            [props]: size,
          },
        },
      },
    };
    const mergeTheme = deepMerge(defaultThemeObj, theme);
    const newTheme = { theme: mergeTheme, viewClass };
    if (isVertical) {
      return <Divider {...newTheme} />;
    }
    return <Divider {...newTheme} type={'vertical'} />;
  }
  onDeleteClick = e => {
    e.stopPropagation();
    const { onDelete, index, keyVal } = this.props;
    onDelete && onDelete({ index, activityValue: keyVal });
  };
  getClearButton() {
    const { tabType, disabled, showDeleteBtn, themeProps } = this.props;
    const { iconClass } = this.state;
    const { viewClass, theme } = this.props.getPartOfThemeHocProps('DefaultTabPan');
    themeProps.propsConfig = { tabType };
    if (!matchType(tabType, 'line') && showDeleteBtn) {
      return (
        <ClearButtonContainer
          themeProps={themeProps}
          onMouseEnter={this.clearButtonMouseEnter}
          onMouseLeave={this.clearButtonMouseLeave}
          tabType={tabType}
        >
          <Icon
            singleTheme
            theme={theme}
            viewClass={viewClass}
            iconClass={iconClass}
            disabled={disabled}
            onClick={this.onDeleteClick}
          />
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
    const { onMouseEnter, index, keyVal } = this.props;
    onMouseEnter && onMouseEnter({ index, activityValue: keyVal });
  };
  onMouseLeave = (e: Object) => {
    const { onMouseLeave, index, keyVal } = this.props;
    onMouseLeave && onMouseLeave({ index, activityValue: keyVal });
  };
}

const TabPanHoc = ThemeHoc(Tabpane, Widget.Tabpane, {
  hover: false,
  active: false,
});
export default TabPanHoc;
