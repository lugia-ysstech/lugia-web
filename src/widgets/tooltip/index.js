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
import {
  getTriggerByArrow,
  getFontColor,
  getColor,
  getArrow,
  getNewArrow,
  getDeg,
  Left,
  Right,
  Down,
  Up,
  RadiusSize,
} from '../css/tooltip';
import { FontSize, FontSizeNumber } from '../css';
import { px2emcss } from '../css/units';
const em = px2emcss(FontSizeNumber);

const ToolTrigger = styled(Trigger)`
  ${getTriggerByArrow};
  box-shadow: none;
`;

const Content = styled.div`
  position: relative;
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

class Tooltip extends React.Component<TooltipProps, TooltipState> {
  static displayName = Widget.Tooltip;

  static defaultProps = {
    action: ['click'],
    getTheme() {
      return {};
    },
  };
  trigger: Object;

  render() {
    const { placement, action, title, isPop, getTheme, children, visible } = this.props;
    const fx = this.getFx(placement);
    const getTarget: Function = cmp => (this.trigger = cmp);
    return (
      <ToolTrigger
        popupVisible={visible}
        isPop={isPop}
        align={placement}
        innerRef={getTarget}
        onPopupVisibleChange={this.onVisibleChange}
        action={action}
        fx={fx}
        popup={
          <Content theme={getTheme()} isPop={isPop} fx={fx} placement={placement}>
            {this.getArrow(fx)}
            <Message theme={getTheme()}>{title}</Message>
          </Content>
        }
      >
        {children}
      </ToolTrigger>
    );
  }
  onVisibleChange = (visible: boolean) => {
    const { onVisibleChange } = this.props;
    this.setState({ visible });
    onVisibleChange && onVisibleChange(visible);
  };
  getArrow(fx) {
    const { placement, isPop } = this.props;
    const { getTheme } = this.props;
    const theme = getTheme();
    const arrowConfig = { placement, fx, theme };
    if (isPop === true) {
      return [<NewArrow {...arrowConfig} />, <MaskArrow {...arrowConfig} />];
    }
    return <Arrow fx={fx} theme={theme} />;
  }

  getFx = (placement: string) => {
    if (!placement) {
      return 'down';
    }

    if (placement.startsWith(Left)) return Right;
    if (placement.startsWith(Right)) return Left;
    if (placement.startsWith(Down)) return Up;
    if (placement.startsWith(Up)) return Down;
  };
}

export default ThemeProvider(Tooltip, Widget.Tooltip);
