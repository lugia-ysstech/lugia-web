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
const IconContainer: Object = CSSComponent({
  tag: 'span',
  className: 'PopconfirmIconContainer ',
  normal: {
    selectNames: [[]],
    defaultTheme: {
      width: 15,
      height: 15,
    },
  },
  css: css`
    position: relative;
    display: inline-block;
    margin-right: ${px2remcss(6)};
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  `,
});
const Title = CSSComponent({
  tag: 'span',
  className: 'PopconfirmTitle',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color']],
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
      padding: {
        top: 6,
        bottom: 6,
        left: 8,
        right: 8,
      },
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
const CancelText = CSSComponent({
  extend: Content,
  className: 'PopconfirmCancelText',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color']],
    defaultTheme: {},
  },
});
const OkText = CSSComponent({
  extend: Content,
  className: 'PopconfirmOkText',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color']],
    defaultTheme: {},
  },
});

CancelText.displayName = 'cancelText';

OkText.displayName = 'okText';

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
    const PopconfirmTitleThemeProps = this.props.getPartOfThemeProps('PopconfirmTitle');
    return title ? <Title themeProps={PopconfirmTitleThemeProps}>{title} </Title> : null;
  }

  getOperation(): React.Node | null {
    const { cancelText = '取消', okText = '确定', okType = 'primary' } = this.props;
    const PopconfirmOperationThemeProps = this.props.getPartOfThemeProps('PopconfirmOperation');
    const textThemeProps = this.props.getPartOfThemeProps('PopconfirmText');
    return (
      <Operation themeProps={PopconfirmOperationThemeProps}>
        <Button
          type={okType}
          size="small"
          onClick={this.onCancel}
          {...this.props.getPartOfThemeHocProps(Widget.Button)}
        >
          <CancelText themeProps={textThemeProps}> {cancelText}</CancelText>
        </Button>
        <Button
          type={okType}
          size="small"
          onClick={this.onConfirm}
          {...this.props.getPartOfThemeHocProps(Widget.Button)}
        >
          <OkText themeProps={textThemeProps}> {okText}</OkText>
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
    return icon ? (
      <IconContainer themeProps={this.props.getPartOfThemeProps('PopconfirmIconContainer')}>
        {this.getIcon(icon)}
      </IconContainer>
    ) : null;
  }

  getIcon(icon: React.Node): React.Node {
    return ObjectUtils.isString(icon) ? (
      <Icon {...this.props.getPartOfThemeHocProps(Widget.Icon)} iconClass={icon} />
    ) : (
      icon
    );
  }

  render() {
    const { children, action, placement, defaultChildren } = this.props;
    const getTarget: Function = cmp => (this.target = cmp);
    const theChildren = children ? children : defaultChildren;
    return (
      <Popover
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
