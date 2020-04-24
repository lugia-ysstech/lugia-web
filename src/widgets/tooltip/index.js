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
import { Down, Left, Right, Up, getRoundArrowCSS, getArrowCSS } from '../css/tooltip';
import ThemeHoc from '@lugia/theme-hoc';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import { getBoxShadow, getBorderRadius } from '@lugia/theme-utils';
import get from '../css/theme-common-dict';
import { units } from '@lugia/css';
const { px2remcss } = units;

const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';
const borderRadiusValue = '$lugia-dict.@lugia/lugia-web.borderRadiusValue';

const ContentWrapper: Object = CSSComponent({
  tag: 'div',
  className: 'TooltipContentWrapper',
  normal: {
    selectNames: [],
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { direction } = propsConfig;
      return `padding-${direction}:${px2remcss(4)};
      background: transparent;box-shadow:none;`;
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
      ['opacity'],
    ],
    defaultTheme: {
      borderRadius: getBorderRadius(borderRadiusValue),
      background: { color: get('blackColor') },

      padding: {
        top: 4,
        bottom: 4,
        left: 8,
        right: 8,
      },
    },
    getThemeMeta(themeMeta, themeProps) {
      const { boxShadow } = themeMeta;
      const { x, y, color, blur, spread } = get('normalBoxShadow');
      const theBoxShadow =
        boxShadow || getBoxShadow(`${x}px ${y}px ${blur}px ${spread}px ${color}`);
      return {
        boxShadow: theBoxShadow,
      };
    },
  },
  css: css`
    position: relative;
    box-sizing: border-box;
  `,
  option: {
    hover: true,
  },
});

const Arrow: Object = CSSComponent({
  tag: 'div',
  className: 'ToolTipArrow',
  normal: {
    selectNames: [],
    getCSS(themeMeta, themeProps) {
      return getArrowCSS(themeMeta, themeProps);
    },
  },
  hover: {
    selectNames: [],
    getCSS(themeMeta, themeProps) {
      return getArrowCSS(themeMeta, themeProps);
    },
  },
  css: css`
    border-color: transparent;
    position: absolute;
    border-style: solid;
    line-height: 1;
  `,
  option: {
    hover: true,
  },
});
const BaseArrow: Object = CSSComponent({
  tag: 'div',
  className: 'ToolTipBaseArrow',
  normal: {
    selectNames: [],
    getCSS(themeMeta: Object, themeProps: Object): string {
      return getRoundArrowCSS(themeMeta, themeProps);
    },
  },
  hover: {
    selectNames: [],
  },
  css: css`
    position: absolute;
    border-style: solid;
    border-width: ${px2remcss(4)};
    border-top-left-radius: ${px2remcss(4)};
  `,
  option: {
    hover: true,
  },
});

const NewArrow: Object = CSSComponent({
  extend: BaseArrow,
  className: 'ToolNewArrow',
  css: css`
    z-index: -1;
  `,
  option: {
    hover: true,
  },
});
const MaskArrow: Object = CSSComponent({
  extend: BaseArrow,
  className: 'ToolMaskArrow',
  css: css`
    z-index: 0;
  `,
  option: {
    hover: true,
  },
});

const Title: Object = CSSComponent({
  tag: 'div',
  className: 'TooltipTitle',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize'], ['padding']],
    defaultTheme: {
      color: defaultColor,
      fontSize: 12,
    },
  },
  css: css`
    box-sizing: border-box;
    user-select: none;
    overflow: hidden;
    text-align: left;
    text-decoration: none;
    display: flex;
    align-items: center;
  `,
});
const Description: Object = CSSComponent({
  extend: Title,
  className: 'TooltipDescription',
  normal: {
    selectNames: [['margin']],
    defaultTheme: {
      margin: {
        top: 6,
      },
    },
  },
});
const ChildrenContainer: Object = CSSComponent({
  tag: 'div',
  className: 'ChildrenContainer',
  normal: {
    selectNames: [['width']],
  },
  css: css`
    display: inline-block;
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
    const {
      placement,
      action,
      popArrowType,
      children = <div />,
      size,
      getPartOfThemeProps,
    } = this.props;
    const { visible } = this.state;
    const direction = this.getDirection(placement);
    const getTarget: Function = cmp => (this.trigger = cmp);
    const contentThemeProps = getPartOfThemeProps('Container', {
      props: {
        size,
        popArrowType,
        direction,
      },
    });
    const childrenThemeProps = getPartOfThemeProps('ChildrenContainer');
    return (
      <Trigger
        themePass
        createPortal={true}
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
        <ChildrenContainer themeProps={childrenThemeProps}>{children}</ChildrenContainer>
      </Trigger>
    );
  }
  setPopupVisible(...rest: any[]) {
    this.trigger && this.trigger.setPopupVisible(...rest);
  }

  getContent(contentThemeProps, direction) {
    const { placement, popArrowType, content, createEventChannel } = this.props;
    const channel = createEventChannel(['hover']);
    return (
      <Content
        themeProps={contentThemeProps}
        popArrowType={popArrowType}
        placement={placement}
        {...channel.provider}
      >
        {this.getArrow(direction, channel)}
        {this.getTitle()}
        {this.getDescription()}
        {content}
      </Content>
    );
  }
  getArrow(direction, channel) {
    const { placement, popArrowType } = this.props;
    const theThemeProps = this.props.getPartOfThemeProps('Container', {
      props: {
        direction,
        placement,
      },
    });
    if (popArrowType === 'round') {
      return [
        <NewArrow lugiaConsumers={channel.consumer} themeProps={theThemeProps} />,
        <MaskArrow lugiaConsumers={channel.consumer} themeProps={theThemeProps} />,
      ];
    }
    return <Arrow lugiaConsumers={channel.consumer} themeProps={theThemeProps} />;
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
