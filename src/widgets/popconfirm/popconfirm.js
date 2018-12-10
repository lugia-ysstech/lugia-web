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
  arrowPosition: DirectionType,
  action: 'hover' | 'click' | 'focus',
  children: React.Node,
  visible?: boolean,
  defaultVisible: boolean,
};
type PopConfirmState = {
  visible: boolean,
};
const IconContainer = styled.div`
  position: absolute;
  right: ${em(-2)};
  top: ${em(0)};
  width: ${em(15)};
  height: ${em(15)};
`;
const HintIcon = styled(Icon)`
  font-size: 12px;
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
const Content = styled.div`
  font-size: 1.2rem;
  display: block;
`;
const Operation = styled.div`
  font-size: 1.2rem;
  display: block;
`;

const BaseButton = styled(Button)`
  font-size: 1.2rem;
  display: inline-block;
  padding: ${em(6)} ${em(8)};
  margin-left: ${em(6)};
`;
const Cancel = BaseButton.extend`
  font-size: 1.2rem;
`;
const Submit = BaseButton.extend`
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
  getIcon(): React.Node | null {
    const { clear } = this.props;
    if (ObjectUtils.isString(clear))
      return (
        <IconContainer>
          <HintIcon iconClass={clear}> </HintIcon>
        </IconContainer>
      );
    return clear;
  }
  getTitle(): React.Node | null {
    const { title } = this.props;
    return title ? <Title>{title} </Title> : null;
  }
  getOperation(): React.Node | null {
    return (
      <Operation>
        <Cancel size="small"> 取消</Cancel>
        <Submit type="primary" size="small">
          确定
        </Submit>
      </Operation>
    );
  }
  getContent() {
    return (
      <Content>
        {this.getTitle()}
        {this.getOperation()}
      </Content>
    );
  }
  render() {
    const { children, action, arrowPosition, getTheme } = this.props;
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
