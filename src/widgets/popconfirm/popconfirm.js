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
import { DirectionType } from '../css/tooltip';
import ThemeProvider from '../theme-provider';
import { ObjectUtils } from '@lugia/type-utils';

const em = px2emcss(1.2);

type PopConfirmProps = {
  description: React.Node,
  title: React.Node,
  content?: React.Node,
  getTheme: Function,
  onCancel: Function,
  onConfirm: Function,
  arrowPosition: DirectionType,
  action: 'hover' | 'click' | 'focus',
  children: React.Node,
  visible?: boolean,
  icon: React.Node,
  cancelText: string,
  okText: string,
  okType: string,
};
type PopConfirmState = {
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
const HintIcon = styled(Icon)`
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
class PopConfirm extends React.Component<PopConfirmProps, PopConfirmState> {
  static defaultProps = {
    defaultVisible: false,
    action: 'click',
  };
  target: Object;
  constructor(props: PopConfirmProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: PopConfirmProps, state: PopConfirmState) {
    const hasVisibleInprops = 'visible' in props;
    const hasDefaultVisibleInprops = 'defaultVisible' in props;
    if (!state) {
      const theVisible = hasVisibleInprops
        ? props.visible
        : hasDefaultVisibleInprops
        ? props.defaultVisible
        : state.visible
        ? state.visible
        : false;
      return { visible: theVisible };
    }
    if (hasVisibleInprops) {
      return { visible: props.visible };
    }
    return { visible: state.visible };
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
            {cancelText}
          </Cancel>
          <Confirm type={okType} size="small" onClick={this.onConfirm}>
            {okText}
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
    return onCancel && onCancel(e);
  };
  onConfirm = e => {
    const { onConfirm } = this.props;
    return onConfirm && onConfirm(e);
  };
  getIconContainer(): React.Node | null {
    const { icon } = this.props;
    if (icon) return <IconContainer>{this.getIcon(icon)}</IconContainer>;
    return null;
  }
  getIcon(icon: React.Node): React.Node {
    if (ObjectUtils.isString(icon)) return <HintIcon iconClass={icon}> </HintIcon>;
    return icon;
  }
  render() {
    const { children, action, arrowPosition = 'top', getTheme } = this.props;
    const getTarget: Function = cmp => (this.target = cmp);
    return (
      <Popover
        visible={this.state.visible}
        action={action}
        onVisibleChange={this.onVisibleChange}
        theme={getTheme()}
        title={this.getContent()}
        ref={getTarget}
        arrowPosition={arrowPosition}
      >
        {children}
      </Popover>
    );
  }
  onVisibleChange = (visible: boolean) => {
    const { onVisibleChange } = this.props;
    const hasVisibleInprops = 'visible' in this.props;
    const theVisible = hasVisibleInprops ? this.props.visible : visible;
    if (!hasVisibleInprops) {
      this.setState({ visible: theVisible });
    }
    onVisibleChange && onVisibleChange(visible);
  };
}
export default ThemeProvider(PopConfirm, Widget.PopConfirm);
