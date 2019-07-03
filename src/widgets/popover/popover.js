/**
 *
 * create by liangguodong on 2018/12/5
 *
 * @flow
 */
import * as React from 'react';
import Tooltip from '../tooltip/index';
import Icon from '../icon/index';
import Widget from '../consts/index';
import type { PopoverProps, PopoverState } from '../css/popover';
import { ObjectUtils } from '@lugia/type-utils';
import { getStateFromProps, processOnVisibleChange } from '../tooltip';

import ThemeHoc from '@lugia/theme-hoc';
import CSSComponent, { StaticComponent, css } from '../theme/CSSProvider';
import { units } from '@lugia/css';
import colorsFunc from '../css/stateColor';

const { px2remcss } = units;
const { mediumGreyColor, darkGreyColor, blackColor, defaultColor } = colorsFunc();

const ClearContainer: Object = StaticComponent({
  tag: 'div',
  className: 'PopoverIconContainer',
  normal: {
    selectNames: [
      ['opacity'],
      ['background'],
      ['width'],
      ['height'],
      ['color'],
      ['font'],
      ['fontSize'],
    ],
    defaultTheme: {},
  },
  css: css`
    position: absolute;
    right: ${px2remcss(8)};
    top: ${px2remcss(6)};
    width: ${px2remcss(10)};
    height: ${px2remcss(10)};
  `,
});
const Clear: Object = CSSComponent({
  extend: Icon,
  className: 'PopoverClearIcon',
  normal: {
    selectNames: [['color'], ['fontSize'], ['font']],
    defaultTheme: { color: mediumGreyColor, fontSize: 10 },
  },
});
const BaseText: Object = CSSComponent({
  tag: 'div',
  className: 'PopoverBaseText',
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
  },
  css: css`
    text-align: inherit;
    white-space: nowrap;
    overflow: hidden;
  `,
});
const Title: Object = CSSComponent({
  extend: BaseText,
  className: 'PopoverTitle',
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
      font: {
        size: 16,
        color: blackColor,
        weight: 500,
      },
    },
  },
  css: css`
    display: inline-block;
  `,
});
const Description: Object = CSSComponent({
  extend: BaseText,
  className: 'PopoverDescription',
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
      fontSize: 14,
      color: darkGreyColor,
    },
  },
});
const Content: Object = CSSComponent({
  tag: 'div',
  className: 'PopoverContent',
  normal: {
    selectNames: [['font'], ['fontSize'], ['padding'], ['background'], ['boxShadow']],
    defaultTheme: {
      padding: {
        top: 6,
        bottom: 6,
        left: 8,
        right: 8,
      },
      fontSize: 12,
    },
  },
  css: css`
    display: inline-block;
  `,
});

const TooltipWrapper: Object = CSSComponent({
  extend: Tooltip,
  className: 'PopoverWrapper',
  normal: {
    selectNames: [['background'], ['width'], ['height'], ['boxShadow'], ['border']],
    defaultTheme: {
      background: {
        color: defaultColor,
      },
    },
  },
  css: css`
    display: inline-block;
    position: relative;
  `,
});

class Popover extends React.Component<PopoverProps, PopoverState> {
  static displayName = Widget.Popover;
  static defaultProps = {
    defaultVisible: false,
    action: ['click'],
  };
  target: Object;

  constructor(props: PopoverProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: PopoverProps, state: PopoverState) {
    return getStateFromProps(props, state);
  }

  getTitle(): React.Node | null {
    const { title } = this.props;
    const PopoverTitleThemeProps = this.props.getPartOfThemeProps('PopoverTitle');
    return title ? <Title themeProps={PopoverTitleThemeProps}>{title} </Title> : null;
  }

  getDescription(): React.Node | null {
    const { description } = this.props;
    const descriptionThemeProps = this.props.getPartOfThemeProps('PopoverDescription');
    return description ? (
      <Description themeProps={descriptionThemeProps}>{description} </Description>
    ) : null;
  }

  getCloseContainer(): React.Node | null {
    const { clearIcon } = this.props;
    const PopoverOperationThemeProps = this.props.getPartOfThemeProps('PopoverOperation');
    return clearIcon ? (
      <ClearContainer themeProps={PopoverOperationThemeProps} onClick={this.onClearClick}>
        {this.getIcon(clearIcon)}
      </ClearContainer>
    ) : null;
  }

  getIcon(icon: React.Node): React.Node {
    return ObjectUtils.isString(icon) ? (
      <Clear {...this.props.getPartOfThemeHocProps(Widget.Icon)} iconClass={icon} />
    ) : (
      icon
    );
  }

  onClearClick = e => {
    const { onClearClick } = this.props;
    this.setState({ visible: false });
    onClearClick && onClearClick(e);
  };

  getContent() {
    const { content, title, description } = this.props;

    const contentThemeProps = this.props.getPartOfThemeProps('TooltipContent');
    if (content || title || description) {
      return (
        <Content themeProps={contentThemeProps}>
          {content}
          {this.getCloseContainer()}
          {this.getTitle()}
          {this.getDescription()}
        </Content>
      );
    }
    return null;
  }

  render() {
    const { children = <div />, action, placement } = this.props;
    const { visible } = this.state;
    const getTarget: Function = cmp => (this.target = cmp);
    const theThemeProps = this.props.getPartOfThemeProps('TooltipContent');
    return (
      <TooltipWrapper
        themeProps={theThemeProps}
        visible={visible}
        action={action}
        onVisibleChange={this.onVisibleChange}
        popArrowType={'round'}
        placement={placement}
        title={this.getContent()}
        ref={getTarget}
      >
        {children}
      </TooltipWrapper>
    );
  }

  onVisibleChange = (visible: boolean) => {
    processOnVisibleChange.call(this, visible);
  };
}

export default ThemeHoc(Popover, Widget.Popover, {
  hover: true,
  active: true,
});
