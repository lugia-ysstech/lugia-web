/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Trigger from '../trigger';
import styled from 'styled-components';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import type { TooltipProps, TooltipState } from '../css/tooltip';
import {
  getTriggerByArrow,
  getFontColor,
  getColor,
  getArrow,
  getNewArrow,
  getDeg,
  getSize,
  Left,
  Right,
  Down,
  Up,
  RadiusSize,
} from '../css/tooltip';
import { FontSize, FontSizeNumber } from '../css';
import { px2emcss } from '../css/units';
const em = px2emcss(FontSizeNumber);

const ToolTrigger: Object = styled(Trigger)`
  ${getTriggerByArrow};
  box-shadow: none;
`;

const Content = styled.div`
  position: relative;
  ${getSize};
  font-size: ${FontSize};
  line-height: 1;
  color: ${getColor};
  box-sizing: border-box;
  z-index: 2;
`;

const Arrow = styled.div`
  border-color: transparent;
  ${getArrow};
  position: absolute;
  border-style: solid;
  font-size: ${FontSize};
  line-height: 1;
  color: ${getColor};
`;
const BaseArrow = styled.div`
  ${getNewArrow};
  position: absolute;
  border-style: solid;
  border-width: ${em(8)};
  border-top-left-radius: ${RadiusSize};
  border-color: ${getColor} transparent transparent ${getColor};
  transform: rotateZ(${getDeg});
`;

const NewArrow = BaseArrow.extend`
  box-shadow: 0 0 ${em(6)} rgba(0, 0, 0, 0.15);
  z-index: -1;
`;
const MaskArrow = BaseArrow.extend`
  z-index: 0;
`;

const Message = styled.div`
  box-sizing: border-box;
  user-select: none;
  font-size: ${FontSize};
  line-height: 1.5;
  overflow: hidden;
  padding: ${em(6)} ${em(8)};
  color: ${getFontColor};
  text-align: left;
  text-decoration: none;
  background-color: ${getColor};
  border-radius: ${RadiusSize};
  box-shadow: 0 ${em(2)} ${em(8)} rgba(0, 0, 0, 0.15);
`;
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
  props: { visible: boolean, defaultVisible: boolean },
  state: TooltipState
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
    action: 'click',
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
    const { placement, action, title, popArrowType, getTheme, children } = this.props;
    const { visible } = this.state;
    const direction = this.getDirection(placement);
    const getTarget: Function = cmp => (this.trigger = cmp);
    return (
      <ToolTrigger
        popupVisible={visible}
        popArrowType={popArrowType}
        align={placement}
        innerRef={getTarget}
        onPopupVisibleChange={this.onVisibleChange}
        action={action}
        direction={direction}
        popup={
          <Content
            theme={getTheme()}
            popArrowType={popArrowType}
            direction={direction}
            placement={placement}
          >
            {this.getArrow(direction)}
            <Message theme={getTheme()}>{title}</Message>
          </Content>
        }
      >
        {children}
      </ToolTrigger>
    );
  }
  getArrow(direction) {
    const { placement, popArrowType } = this.props;
    const { getTheme } = this.props;
    const theme = getTheme();
    const arrowConfig = { placement, direction, theme };
    if (popArrowType === 'round') {
      return [<NewArrow {...arrowConfig} />, <MaskArrow {...arrowConfig} />];
    }
    return <Arrow direction={direction} theme={theme} />;
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
}

export default ThemeProvider(Tooltip, Widget.Tooltip);
