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
import Theme from '../theme/index';
import Widget from '../consts/index';
import styled from 'styled-components';
import { getTitleColor } from '../css/card';
import { px2emcss } from '../css/units';
import type { DirectionType } from '../css/tooltip';
import type { ButtonType } from '../css/button';
import ThemeProvider from '../theme-provider';
import { ObjectUtils } from '@lugia/type-utils';
import { getStateFromProps, processOnVisibleChange } from '../tooltip';

const em = px2emcss(1.2);

type PopconfirmProps = {
  description: React.Node,
  title: React.Node,
  content?: React.Node,
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
};
type PopconfirmState = {
  visible: boolean,
};
const IconContainer = styled.div`
  position: relative;
  width: ${em(15)};
  height: ${em(15)};
  display: inline-block;
  margin-right: ${em(6)};
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
`;
const Title = styled.div`
  text-align: inherit;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 500;
  ${getTitleColor};
`;
const HintIcon: Object = styled(Icon)`
  font-size: 1.4rem;
`;
const Basetext = styled.div`
  font-size: 1.2rem;
  display: block;
`;
const Content = Basetext.extend``;
const Operation = Basetext.extend`
  margin-top: ${em(12)};
  text-align: right;
`;
const CancelText = Basetext.extend``;

CancelText.displayName = 'cancelText';

const OkText = Basetext.extend``;

CancelText.displayName = 'okText';

const BaseButton = styled(Button)`
  font-size: 1.2rem;
  display: inline-block;
`;
const Cancel = BaseButton.extend`
  font-size: 1.2rem;
`;
const Confirm = BaseButton.extend`
  font-size: 1.2rem;
`;

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
    return title ? <Title>{title} </Title> : null;
  }

  getOperation(): React.Node | null {
    const { cancelText = '取消', okText = '确定', okType = 'primary' } = this.props;
    const margin = {
      [Widget.Button]: {
        margin: {
          left: 6,
        },
      },
    };
    return (
      <Theme config={margin}>
        <Operation>
          <Cancel size="small" onClick={this.onCancel}>
            <CancelText> {cancelText}</CancelText>
          </Cancel>
          <Confirm type={okType} size="small" onClick={this.onConfirm}>
            <OkText> {okText}</OkText>
          </Confirm>
        </Operation>
      </Theme>
    );
  }

  getContent() {
    return (
      <Content>
        <div>
          {this.getIconContainer()}
          {this.getTitle()}
        </div>
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
    return ObjectUtils.isString(icon) ? <HintIcon iconClass={icon}> </HintIcon> : icon;
  }

  render() {
    const { children, action, placement, getTheme } = this.props;
    const getTarget: Function = cmp => (this.target = cmp);
    return (
      <Popover
        visible={this.state.visible}
        action={action}
        onVisibleChange={this.onVisibleChange}
        theme={getTheme()}
        title={this.getContent()}
        ref={getTarget}
        placement={placement}
      >
        {children}
      </Popover>
    );
  }

  onVisibleChange = (visible: boolean) => {
    processOnVisibleChange.call(this, visible);
  };
}

export default ThemeProvider(Popconfirm, Widget.Popconfirm);
