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
import styled from 'styled-components';
import { getDescripitionColor, getTitleColor } from '../css/card';
import type { PopoverProps, PopoverState } from '../css/popover';
import { getIconColor } from '../css/popover';
import { px2emcss } from '../css/units';
import ThemeProvider from '../theme-provider';
import { ObjectUtils } from '@lugia/type-utils';
import { getStateFromProps, processOnVisibleChange } from '../tooltip';
const em = px2emcss(1.2);

const ClearContainer = styled.div`
  position: absolute;
  right: ${em(8)};
  top: ${em(6)};
  width: ${em(10)};
  height: ${em(10)};
`;
const Clear = styled(Icon)`
  font-size: 1rem;
  ${getIconColor};
`;
const Basetext = styled.div`
  text-align: inherit;
  white-space: nowrap;
  overflow: hidden;
`;
const Title = Basetext.extend`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 500;
  ${getTitleColor};
`;
const Descripition = Basetext.extend`
  font-size: 1.4rem;
  ${getDescripitionColor};
`;
const Content = styled.div`
  font-size: 1.2rem;
  display: inline-block;
  padding: ${em(6)} ${em(8)};
`;
const TooltipWrapper = styled(Tooltip)`
  font-size: 1.2rem;
  display: inline-block;
  position: relative;
`;

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
    return title ? <Title>{title} </Title> : null;
  }

  getDescripition(): React.Node | null {
    const { description } = this.props;
    return description ? <Descripition>{description} </Descripition> : null;
  }

  getCloseContainer(): React.Node | null {
    const { clear } = this.props;
    return clear ? (
      <ClearContainer onClick={this.onClearClick}>{this.getIcon(clear)}</ClearContainer>
    ) : null;
  }

  getIcon(icon: React.Node): React.Node {
    return ObjectUtils.isString(icon) ? <Clear iconClass={icon}> </Clear> : icon;
  }

  onClearClick = e => {
    const { onClearClick } = this.props;
    this.setState({ visible: false });
    onClearClick && onClearClick(e);
  };

  getContent() {
    const { content, title, description } = this.props;
    if (content || title || description) {
      return (
        <Content>
          {content}
          {this.getCloseContainer()}
          {this.getTitle()}
          {this.getDescripition()}
        </Content>
      );
    }
    return null;
  }

  render() {
    const { children, action, placement, getTheme } = this.props;
    const { visible } = this.state;
    const getTarget: Function = cmp => (this.target = cmp);
    return (
      <TooltipWrapper
        visible={visible}
        action={action}
        onVisibleChange={this.onVisibleChange}
        theme={getTheme()}
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

export default ThemeProvider(Popover, Widget.Popover);
