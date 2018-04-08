/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';


const Text = styled.span`
`;
export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'default' | 'large';

type CSSProps = {
  shape?: ButtonShape,
  type?: ButtonType,
}

export type ButtonProps = {
  children: React.Node,
  htmlType?: string,
  icon?: string,
  size?: ButtonSize,
  onClick?: (SyntheticEvent<HTMLButtonElement>) => any,
  onMouseUp?: (SyntheticMouseEvent<HTMLButtonElement>) => any,
  onMouseDown?: (SyntheticMouseEvent<HTMLButtonElement>) => any,
  onKeyPress?: (SyntheticKeyboardEvent<HTMLButtonElement>) => any,
  onKeyDown?: (SyntheticKeyboardEvent<HTMLButtonElement>) => any,
  tabIndex?: number,
  loading?: boolean | { delay?: number },
  disabled?: boolean,
  prefixCls?: string,
  className?: string,
  ghost?: boolean,
  target?: string,
  href?: string,
  download?: string,
} & CSSProps;

type ButtonState = {};

type TypeColor = {
  color: string,
  backgroundColor: string,
  borderColor: string,
};

const TypeCSS: { [key: ButtonType]: TypeColor } = {
  primary: {
    color: 'rgba(0,0,0,.65)',
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
  },
  ghost: {
    color: 'rgba(0,0,0,.65)',
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
  },
  danger: {
    color: '#f5222d',
    backgroundColor: 'transparent',
    borderColor: '#f5222d',
  },
  dashed: {
    color: 'rgba(0,0,0,.65)',
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
  },
};

const getTypeCSS = (props: CSSProps) => {
  const { type = 'primary', } = props;
  const { color, backgroundColor, borderColor, } = TypeCSS[ type ];

  return `
    color: ${color};
    background-color: ${backgroundColor};
    border-color: ${borderColor};
  `;
};
const ButtonOut = styled.button`
    color: #fff;
    background-color: #108ee9;
    border-color: #108ee9;
    margin-right: 8px;
    margin-bottom: 12px;
    display: inline-block;
    margin-bottom: 0;
    text-align: center;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    padding: 4px 15px;
    font-size: 12px;
    border-radius: 4px;
    user-select: none;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    position: relative;
    ${getTypeCSS}
    text-transform: none;
    outline: 0;
    &:hover{
        color: #40a9ff;
        background-color: #fff;
        border-color: #40a9ff;
    }
`;
ButtonOut.displayName = 'hello';
export default ThemeProvider(class extends React.Component<ButtonProps, ButtonState> {
  onClick = e => {
    const { onClick, } = this.props;
    onClick && onClick(e);
  };

  render () {
    const { children, type, shape, } = this.props;
    return <ButtonOut type={type} shape={shape} onClick={this.onClick}><Text>{children}</Text></ButtonOut>;
  }
}, Widget.Button);
