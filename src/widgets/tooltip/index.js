/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Trigger from '../trigger';
import styled from 'styled-components';
import ThemeProvider from '../common/ThemeProvider';
import * as Widget from '../consts/Widget';

const Left = 'left';
const Right = 'right';
const Down = 'bottom';
const Up = 'top';

const getTriggerByArrow = props => {
  const { fx, } = props;
  switch (fx) {
    case Up:
      return 'padding-top: 8px;';
    case Down:
      return 'padding-bottom: 8px;';
    case Left:
      return 'padding-left: 8px;';
    case Right:
    default:
      return 'padding-right: 8px;';
  }
};
const ToolTrigger = styled(Trigger)`
  ${getTriggerByArrow}
  box-shadow: none;`;


const getColor = (props: Object) => {
  const { theme, } = props;
  const { color, } = theme;
  return color ? color : 'rgba(0, 0, 0, 0.75)';
};

const Content = styled.div`
    font-size: 14px;
    line-height: 1;
    color: ${getColor};
    box-sizing: border-box;
`;
const getArrow = props => {
  const { fx, } = props;
  switch (fx) {
    case Up:
      return `
        left: 16px;
        top: 3px;
        border-width: 0 5px 5px;
        border-bottom-color: ${getColor(props)};
      `;
    case Down:
      return `
        left: 16px;
        bottom: 3px;
        border-width: 5px 5px 0;
        border-top-color: ${getColor(props)};
      `;
    case Left:
      return `
        top: 8px;
        left: 3px;
        border-width: 5px 5px 5px 0;
        border-right-color: ${getColor(props)};
      `;
    case Right:
      return `
        top: 8px;
        right: 3px;
        border-width: 5px 0 5px 5px;
        border-left-color: ${getColor(props)};
      `;
    default:
      return '';
  }
};
const Arrow = styled.div`
    border-color: transparent;
    ${getArrow}
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    font-size: 14px;
    line-height: 1;
    color: ${getColor};
`;

const Message = styled.div`
    box-sizing: border-box;
    user-select: none;
    font-size: 14px;
    line-height: 1.5;
    max-width: 250px;
    padding: 6px 8px;
    color: #fff;
    text-align: left;
    text-decoration: none;
    background-color:  ${getColor};
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    min-height: 32px;
`;
const builtinPlacements = {
  left: ['cr', 'cl',],
  leftTop: ['tr', 'tl',],
  leftBottom: ['br', 'bl',],
  right: ['cl', 'cr',],
  rightTop: ['tl', 'tr',],
  rightBottom: ['bl', 'br',],
  top: ['bc', 'tc',],
  bottom: ['tc', 'bc',],
  topLeft: ['bl', 'tl',],
  topRight: ['br', 'tr',],
  bottomRight: ['tr', 'br',],
  bottomLeft: ['tl', 'bl',],
};

type TooltipProps = {
  placement: string,
  action: Array<string>,
  children: any,
  title: any,
  getTheme: Function,
};

class Tooltip extends React.Component<TooltipProps, any> {
  getTargetDom () {
    return document.getElementById('root');
  }

  static  defaultProps = {
    action: ['click',],
    getTheme () {
      return {};
    },
  };

  render () {
    const { placement, action, title, } = this.props;
    const { getTheme, } = this.props;
    const theme = getTheme();
    const fx = this.getFx(placement);
    return <ToolTrigger align={placement}
                        fx={fx}
                        action={action}
                        popup={
                          <Content theme={theme}>
                            <Arrow fx={fx} theme={theme}/>
                            <Message theme={theme}>{title}</Message>
                          </Content>
                        }>
      {this.props.children}
    </ToolTrigger>;
  }

  onSelectAlign = (align: string) => () => {
    this.setState({ align, });
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
