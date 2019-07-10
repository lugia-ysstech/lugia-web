/**
 *
 * create by liangguodong on 2018/12/5
 *
 * @flow
 */
import * as React from 'react';
import Button from '../button/index';
import Popover from '../popover/index';
import Icon from '../icon/index';
import Widget from '../consts/index';
import type { DirectionType } from '../css/tooltip';
import type { ButtonType } from '../css/button';
import { ObjectUtils } from '@lugia/type-utils';
import { getStateFromProps, processOnVisibleChange } from '../tooltip';
import ThemeHoc from '@lugia/theme-hoc';
import CSSComponent, { css, StaticComponent } from '../theme/CSSProvider';
import { units } from '@lugia/css';
import colorsFunc from '../css/stateColor';
import { deepMerge } from '@lugia/object-utils';
const { blackColor } = colorsFunc();
const { px2remcss } = units;

type PopconfirmProps = {
  description: React.Node,
  title: React.Node,
  content: React.Node,
  getTheme: Function,
  onCancel: Function,
  onConfirm: Function,
  onVisibleChange: Function,
  placement: DirectionType,
  action: 'hover' | 'click' | 'focus',
  children: React.Node,
  visible: boolean,
  defaultVisible?: boolean,
  icon: React.Node,
  cancelText: string,
  okText: string,
  okType: ButtonType,
  defaultChildren: React.Node,
  themeProps: Object,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
};
type PopconfirmState = {
  visible: boolean,
};
const IconContainer: Object = StaticComponent({
  tag: 'span',
  className: 'PopconfirmIconContainer ',
  normal: {
    selectNames: [],
  },
  css: css`
    position: relative;
    display: inline-block;
    margin-right: ${px2remcss(6)};
    text-align: center;
  `,
});
const Title = CSSComponent({
  tag: 'span',
  className: 'PopconfirmTitle',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color'], ['background']],
    defaultTheme: {
      font: {
        size: 16,
        color: blackColor,
        weight: 500,
      },
    },
  },
  css: css`
    text-align: inherit;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  `,
});
const Content = CSSComponent({
  tag: 'div',
  className: 'PopconfirmContent',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color'], ['margin'], ['padding'], ['background']],
    defaultTheme: {
      fontSize: 12,
    },
  },
  css: css`
    display: block;
  `,
});
const Operation = StaticComponent({
  tag: 'div',
  className: 'PopconfirmOperation',
  normal: {
    selectNames: [],
  },
  css: css`
    padding-top: ${px2remcss(12)};
    display: block;
    text-align: right;
  `,
});

class Popconfirm extends React.Component<PopconfirmProps, PopconfirmState> {
  static displayName = Widget.Popconfirm;
  static defaultProps = {
    defaultVisible: false,
  };
  target: Object;

  constructor(props: PopconfirmProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: PopconfirmProps, state: PopconfirmState) {
    return getStateFromProps(props, state);
  }

  getTitle(): React.Node | null {
    const { title } = this.props;
    return title ? (
      <Title themeProps={this.props.getPartOfThemeProps('PopconfirmTitle')}>{title}</Title>
    ) : null;
  }

  getOperation(): React.Node | null {
    const { cancelText = '取消', okText = '确定', okType = 'primary' } = this.props;
    const { theme: theTheme, viewClass } = this.props.getPartOfThemeHocProps('PopconfirmButton');

    const ButtonTheme = deepMerge(
      {
        [viewClass]: {
          ButtonWrap: {
            normal: {
              margin: {
                left: 6,
              },
            },
          },
          ButtonText: {
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
      <Operation>
        <Button
          theme={ButtonTheme}
          viewClass={viewClass}
          type={okType}
          size="small"
          onClick={this.onCancel}
        >
          {cancelText}
        </Button>
        <Button
          theme={ButtonTheme}
          viewClass={viewClass}
          type={okType}
          size="small"
          onClick={this.onConfirm}
        >
          {okText}
        </Button>
      </Operation>
    );
  }

  getContent() {
    const contentThemeProps = this.props.getPartOfThemeProps('TooltipContent');
    return (
      <Content themeProps={contentThemeProps}>
        {this.getIconContainer()}
        {this.getTitle()}
        {this.getOperation()}
      </Content>
    );
  }

  onCancel = e => {
    const { onCancel } = this.props;
    this.onVisibleChange(false);
    return onCancel && onCancel(e);
  };
  onConfirm = e => {
    const { onConfirm } = this.props;
    this.onVisibleChange(false);
    return onConfirm && onConfirm(e);
  };

  getIconContainer(): React.Node | null {
    const { icon } = this.props;
    return icon ? <IconContainer>{this.getIcon(icon)}</IconContainer> : null;
  }

  getIcon(icon: React.Node): React.Node {
    return ObjectUtils.isString(icon) ? (
      <Icon {...this.props.getPartOfThemeHocProps('PopconfirmIcon')} iconClass={icon} />
    ) : (
      icon
    );
  }

  render() {
    const { children, action, placement = 'topLeft', defaultChildren } = this.props;
    const getTarget: Function = cmp => (this.target = cmp);
    const theChildren = children ? children : defaultChildren;

    const { theme: theTheme, viewClass } = this.props.getPartOfThemeHocProps('PopconfirmContent');

    const popoverTheme = deepMerge(
      {
        [viewClass]: {
          PopoverContent: {
            TooltipContent: {
              normal: {
                fontSize: 12,
              },
            },
          },
        },
      },
      theTheme
    );
    return (
      <Popover
        theme={popoverTheme}
        viewClass={viewClass}
        showClearButton={false}
        visible={this.state.visible}
        action={action}
        onVisibleChange={this.onVisibleChange}
        content={this.getContent()}
        ref={getTarget}
        placement={placement}
      >
        {theChildren}
      </Popover>
    );
  }

  onVisibleChange = (visible: boolean) => {
    processOnVisibleChange.call(this, visible);
  };
}

export default ThemeHoc(Popconfirm, Widget.Popconfirm);
