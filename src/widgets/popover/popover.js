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
import { deepMerge } from '@lugia/object-utils';
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
    defaultTheme: {},
  },
  css: css`
    display: inline-block;
  `,
});
const Description: Object = CSSComponent({
  extend: BaseText,
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

  onClearClick = e => {
    const { onClearClick } = this.props;
    this.setState({ visible: false });
    onClearClick && onClearClick(e);
  };

  getContent() {
    const { content } = this.props;
    return (
      <div>
        {content}
        {this.getCloseContainer()}
      </div>
    );
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

  getTitle(): React.Node | null {
    const { title } = this.props;
    return title;
  }

  getDescription(): React.Node | null {
    const { description } = this.props;
    return description ? description : null;
  }

  getIcon(icon: React.Node): React.Node {
    return ObjectUtils.isString(icon) ? (
      <Icon
        {...this.props.getPartOfThemeHocProps(Widget.Icon)}
        iconClass={'lugia-icon-reminder_refresh'}
      />
    ) : (
      icon
    );
  }

  render() {
    const { children = <div />, action, placement } = this.props;
    const { visible } = this.state;
    const getTarget: Function = cmp => (this.target = cmp);

    const { theme: theTheme, viewClass } = this.props.getPartOfThemeHocProps('PopoverContent');

    const tooltipTheme = deepMerge(
      {
        [viewClass]: {
          TooltipContent: {
            normal: {
              padding: {
                top: 6,
                bottom: 6,
                left: 8,
                right: 8,
              },
              fontSize: 12,
            },
          },
          TooltipTitle: {
            normal: {
              font: {
                size: 16,
                weight: 500,
              },
            },
          },
        },
      },
      theTheme
    );
    return (
      <Tooltip
        theme={tooltipTheme}
        viewClass={viewClass}
        visible={visible}
        action={action}
        onVisibleChange={this.onVisibleChange}
        popArrowType={'round'}
        placement={placement}
        content={this.getContent()}
        title={this.getTitle()}
        description={this.getDescription()}
        ref={getTarget}
      >
        {children}
      </Tooltip>
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
