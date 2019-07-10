/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Trigger from '../trigger';
import Widget from '../consts/index';
import type { TooltipProps, TooltipState } from '../css/tooltip';
import { Down, Left, Right, Up } from '../css/tooltip';
import colorsFunc from '../css/stateColor';
import ThemeHoc from '@lugia/theme-hoc';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import { getBoxShadow } from '@lugia/theme-utils';

import { units } from '@lugia/css';
const { px2remcss } = units;
const { defaultColor, blackColor } = colorsFunc();

const ContentWrapper: Object = CSSComponent({
  tag: 'div',
  className: 'TooltipContentWrapper',
  normal: {
    selectNames: [['margin'], ['opacity']],
    defaultTheme: {},
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { direction } = propsConfig;
      return `padding:${px2remcss(1)};padding-${direction}:${px2remcss(
        5
      )};background: transparent;box-shadow:none;`;
    },
  },
  css: css`
    position: relative;
  `,
});
const Content: Object = CSSComponent({
  tag: 'div',
  className: 'TooltipContent',
  normal: {
    selectNames: [
      ['background'],
      ['padding'],
      ['width'],
      ['height'],
      ['boxShadow'],
      ['borderRadius'],
      ['border'],
    ],
    defaultTheme: {
      background: { color: defaultColor },
      boxShadow: getBoxShadow('0 0 2 rgba(102, 102, 102, 0.15)'),
      padding: {
        top: 6,
        bottom: 6,
        left: 8,
        right: 8,
      },
    },
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { height } = themeMeta;
      const { size, popArrowType } = propsConfig;
      const theHeight =
        height && height > 0 ? height : size === 'large' ? 40 : size === 'small' ? 24 : 32;
      if (popArrowType !== 'round')
        return {
          height: theHeight,
        };
    },
  },
  css: css`
    border-radius: ${px2remcss(5)};
    position: relative;
    line-height: 1;
    box-sizing: border-box;
  `,
});

const Arrow: Object = CSSComponent({
  tag: 'div',
  className: 'ToolTipArrow',
  normal: {
    selectNames: [['fontSize'], ['color']],
    defaultTheme: {
      fonSize: 12,
      color: defaultColor,
    },
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { background = {} } = themeMeta;
      const { direction = Up } = propsConfig;
      const bgColor = background && background.color ? background.color : defaultColor;
      switch (direction) {
        case Up:
          return `
        left: ${px2remcss(10)};
        top: ${px2remcss(-5)};
        border-width: 0 ${px2remcss(5)} ${px2remcss(5)};
        border-bottom-color: ${bgColor};
      `;
        case Down:
          return `
        left: ${px2remcss(10)};
        bottom: ${px2remcss(-3)};
        border-width: ${px2remcss(5)} ${px2remcss(5)} 0;
        border-top-color: ${bgColor};
      `;
        case Left:
          return `
        top: ${px2remcss(10)};
        left: ${px2remcss(-5)};
        border-width: ${px2remcss(5)} ${px2remcss(5)} ${px2remcss(5)} 0;
        border-right-color: ${bgColor};
      `;
        case Right:
          return `
        top: ${px2remcss(10)};
        right: ${px2remcss(-5)};
        border-width: ${px2remcss(5)} 0 ${px2remcss(5)} ${px2remcss(5)};
        border-left-color: ${bgColor};
      `;
        default:
          return '';
      }
    },
  },
  css: css`
    border-color: transparent;
    position: absolute;
    border-style: solid;
    line-height: 1;
  `,
});
const BaseArrow: Object = CSSComponent({
  tag: 'div',
  className: 'ToolTipBaseArrow',
  normal: {
    selectNames: [['background'], ['opacity']],
    defaultTheme: {},
    getCSS(themeMeta: Object, themeProps: Object): string {
      const { propsConfig } = themeProps;
      const { background = {} } = themeMeta;
      const bgColor = background && background.color ? background.color : defaultColor;

      const { direction = Up, placement } = propsConfig;
      let angle = '';
      switch (direction) {
        case Up:
          angle = '45deg';
          break;
        case Down:
          angle = '225deg';
          break;
        case Left:
          angle = '315deg';
          break;
        case Right:
          angle = '135deg';
          break;
        default:
          break;
      }
      const theBottom = `top: ${px2remcss(-4)};`;
      const theTop = `bottom: ${px2remcss(-4)};`;
      const theLeft = `right: ${px2remcss(-4)};`;
      const theRight = `left: ${px2remcss(-4)};`;
      let arrowDirectionCSS = '';
      switch (placement) {
        case 'bottomLeft':
          arrowDirectionCSS = `left: ${px2remcss(10)};${theBottom}; `;
          break;
        case 'bottom':
          arrowDirectionCSS = `left: 46%;${theBottom}; `;
          break;
        case 'bottomRight':
          arrowDirectionCSS = `right: ${px2remcss(10)};${theBottom}; `;
          break;
        case 'topLeft':
          arrowDirectionCSS = `left: ${px2remcss(10)};${theTop};`;
          break;
        case 'top':
          arrowDirectionCSS = `left: 46%;${theTop};`;
          break;
        case 'topRight':
          arrowDirectionCSS = `right: ${px2remcss(10)};${theTop}; `;
          break;
        case 'rightTop':
          arrowDirectionCSS = `top: ${px2remcss(10)};${theRight}; `;
          break;
        case 'right':
          arrowDirectionCSS = `top: 46%;${theRight};`;
          break;
        case 'rightBottom':
          arrowDirectionCSS = `bottom: ${px2remcss(10)}; ${theRight};`;
          break;
        case 'leftTop':
          arrowDirectionCSS = `top: ${px2remcss(10)};${theLeft};`;
          break;
        case 'left':
          arrowDirectionCSS = ` top: 46%;${theLeft};`;
          break;
        case 'leftBottom':
          arrowDirectionCSS = ` bottom: ${px2remcss(10)}; ${theLeft};`;
          break;
        default:
          arrowDirectionCSS = '';
          break;
      }
      return `border-color: ${bgColor} transparent transparent ${bgColor};transform: rotateZ(${angle}); ${arrowDirectionCSS};`;
    },
  },
  css: css`
    position: absolute;
    border-style: solid;
    border-width: ${px2remcss(4)};
    border-top-left-radius: ${px2remcss(4)};
  `,
});

const NewArrow: Object = CSSComponent({
  extend: BaseArrow,
  className: 'ToolNewArrow',
  normal: {
    selectNames: [['background'], ['opacity'], ['boxShadow']],
    defaultTheme: {
      boxShadow: getBoxShadow('0 0 6 rgba(0, 0, 0, 0.15)'),
    },
  },
  css: css`
    z-index: -1;
  `,
});
const MaskArrow: Object = CSSComponent({
  extend: BaseArrow,
  className: 'ToolMaskArrow',
  normal: {
    selectNames: [['background'], ['opacity']],
    defaultTheme: {},
  },
  css: css`
    z-index: 0;
  `,
});

const Title: Object = CSSComponent({
  tag: 'div',
  className: 'TooltipTitle',
  normal: {
    selectNames: [
      ['opacity'],
      ['background'],
      ['width'],
      ['height'],
      ['color'],
      ['font'],
      ['fontSize'],
      ['margin'],
    ],
    defaultTheme: {
      color: blackColor,
      fontSize: 12,
    },
  },
  css: css`
    box-sizing: border-box;
    user-select: none;
    overflow: hidden;
    text-align: left;
    text-decoration: none;
  `,
});
const Description: Object = CSSComponent({
  tag: 'div',
  className: 'TooltipDescription',
  normal: {
    selectNames: [
      ['opacity'],
      ['background'],
      ['width'],
      ['height'],
      ['color'],
      ['font'],
      ['fontSize'],
      ['margin'],
    ],
    defaultTheme: {
      color: blackColor,
      fontSize: 12,
    },
  },
  css: css`
    box-sizing: border-box;
    user-select: none;
    overflow: hidden;
    text-align: left;
    text-decoration: none;
  `,
});

export function hasVisibleInProps(props: Object) {
  return 'visible' in props;
}

export function processOnVisibleChange(visible: boolean) {
  const { onVisibleChange } = this.props;
  const isHasVisible = hasVisibleInProps(this.props);
  const theVisible = isHasVisible ? this.props.visible : visible;
  if (!isHasVisible) {
    this.setState({ visible: theVisible });
  }
  onVisibleChange && onVisibleChange(visible);
}

export function getStateFromProps(
  props: { visible: boolean, defaultVisible?: boolean },
  state: { visible: boolean }
) {
  const isHasVisibleProps = hasVisibleInProps(props);
  const hasDefaultVisibleInprops = 'defaultVisible' in props;
  if (!state) {
    const theVisible = isHasVisibleProps
      ? props.visible
      : hasDefaultVisibleInprops
      ? props.defaultVisible
      : false;
    return { visible: !!theVisible };
  }
  if (isHasVisibleProps) {
    return { visible: !!props.visible };
  }
  return { visible: state.visible };
}

class Tooltip extends React.Component<TooltipProps, TooltipState> {
  static displayName = Widget.Tooltip;

  static defaultProps = {
    getTheme() {
      return {};
    },
    defaultVisible: false,
    action: ['click'],
  };
  trigger: Object;
  static getDerivedStateFromProps(props: TooltipProps, state: TooltipState) {
    const hasVisibleInprops = 'visible' in props;
    const hasDefaultVisibleInprops = 'defaultVisible' in props;
    if (!state) {
      const theVisible = hasVisibleInprops
        ? props.visible
        : hasDefaultVisibleInprops
        ? props.defaultVisible
        : false;
      return { visible: theVisible };
    }
    if (hasVisibleInprops) {
      return { visible: props.visible };
    }
    return { visible: state.visible };
  }
  render() {
    const { placement, action, popArrowType, children = <div />, size } = this.props;
    const { visible } = this.state;
    const direction = this.getDirection(placement);
    const getTarget: Function = cmp => (this.trigger = cmp);
    const contentThemeProps = this.props.getPartOfThemeProps('TooltipContent', {
      props: {
        size,
        popArrowType,
        direction,
      },
    });
    return (
      <Trigger
        popupVisible={visible}
        align={placement}
        ref={getTarget}
        onPopupVisibleChange={this.onVisibleChange}
        action={action}
        direction={direction}
        popup={
          <ContentWrapper themeProps={contentThemeProps}>
            {this.getContent(contentThemeProps, direction)}
          </ContentWrapper>
        }
      >
        {children}
      </Trigger>
    );
  }

  getContent(contentThemeProps, direction) {
    const { placement, popArrowType, content } = this.props;
    return (
      <Content themeProps={contentThemeProps} popArrowType={popArrowType} placement={placement}>
        {content}
        {this.getArrow(direction)}
        {this.getTitle()}
        {this.getDescription()}
      </Content>
    );
  }

  getArrow(direction) {
    const { placement, popArrowType } = this.props;
    const theThemeProps = this.props.getPartOfThemeProps('TooltipContent', {
      props: {
        direction,
        placement,
      },
    });

    if (popArrowType === 'round') {
      return [<NewArrow themeProps={theThemeProps} />, <MaskArrow themeProps={theThemeProps} />];
    }
    return <Arrow themeProps={theThemeProps} />;
  }

  getDirection = (placement: string) => {
    if (!placement) {
      return;
    }

    if (placement.startsWith(Left)) return Right;
    if (placement.startsWith(Right)) return Left;
    if (placement.startsWith(Down)) return Up;
    if (placement.startsWith(Up)) return Down;
  };
  onVisibleChange = (visible: boolean) => {
    processOnVisibleChange.call(this, visible);
  };

  getTitle(): React$Element<any> | null {
    const { title } = this.props;
    const TitleThemeProps = this.props.getPartOfThemeProps('TooltipTitle');
    if (title) {
      return <Title themeProps={TitleThemeProps}>{title}</Title>;
    }
    return null;
  }

  getDescription(): React$Element<any> | null {
    const { description } = this.props;
    const DescriptionThemeProps = this.props.getPartOfThemeProps('TooltipDescription');
    if (description) {
      return <Description themeProps={DescriptionThemeProps}>{description}</Description>;
    }
    return null;
  }
}

export default ThemeHoc(Tooltip, Widget.Tooltip);
