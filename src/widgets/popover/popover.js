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

export function hasVisibleInProps(props: PopoverProps) {
  return 'visible' in props;
}

export function getStateFromProps(props: PopoverProps, state: PopoverState): PopoverState {
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

export function processOnVisibleChange(visible: boolean) {
  const { onVisibleChange } = this.props;
  const isHasVisible = hasVisibleInProps(this.props);
  const theVisible = isHasVisible ? this.props.visible : visible;
  if (!isHasVisible) {
    this.setState({ visible: theVisible });
  }
  onVisibleChange && onVisibleChange(visible);
}

class Popover extends React.Component<PopoverProps, PopoverState> {
  static defaultProps = {
    defaultVisible: false,
    action: ['click'],
    placement: 'top',
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
