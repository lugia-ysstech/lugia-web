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

const ToolTrigger = styled(Trigger)`
  ${getTriggerByArrow};
  box-shadow: none;
`;

const Content = styled.div`
  ${getSize};
  font-size: ${FontSize};
  line-height: 1;
  color: ${getColor};
  box-sizing: border-box;
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

type TooltipProps = {
  placement: string,
  action: Array<string>,
  children: any,
  title: any,
  getTheme: Function,
};

class Tooltip extends React.Component<TooltipProps, any> {
  getTargetDom() {
    return document.getElementById('root');
  }

  static displayName = Widget.Tooltip;

  static defaultProps = {
    action: ['click'],
    getTheme() {
      return {};
    },
  };
  trigger: Object;

  render() {
    const { placement, action, title } = this.props;
    const { getTheme } = this.props;
    const theme = getTheme();
    const fx = this.getFx(placement);
    const getTarget: Function = cmp => (this.trigger = cmp);

    return (
      <ToolTrigger
        align={placement}
        fx={fx}
        innerRef={getTarget}
        action={action}
        popup={
          <Content theme={theme}>
            <Arrow fx={fx} theme={theme} />
            <Message theme={theme}>{title}</Message>
          </Content>
        }
      >
        {this.props.children}
      </ToolTrigger>
    );
  }

  onSelectAlign = (align: string) => () => {
    this.setState({ align });
  };
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
