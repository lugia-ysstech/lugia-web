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
import Icon from '../icon';
import DelayHoc from '../common/DelayHoc';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';

import {
  getTypeCSS,
  getActiveCSS,
  getCircleCSS,
  getClickCSS,
  getDisabledCSS,
  getShapeCSS,
  getSizeCSS,
  hoverStyle,
  getThemeStyle,
  getIconStyle,
  getLoadingIconStyle,
} from '../css/button';
import type { ButtonOutProps } from '../css/button';

type ButtonState = { clicked: boolean, loading: boolean };

const ButtonOut = styled.button`
  display: inline-block;
  margin-bottom: 0;
  text-align: center;
  touch-action: manipulation;
  cursor: pointer;
  white-space: nowrap;
  line-height: 1;
  font-family: Trebuchet Ms, Arial, Helvetica, sans-serif;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  text-transform: none;
  outline: 0;
  vertical-align: bottom;
  &:hover {
    ${hoverStyle}
  }
  
  &:focus {
    ${hoverStyle}
  }
  &:active {
    ${getActiveCSS}
  }
  
  ${getTypeCSS} 
  ${getSizeCSS} 
  ${getShapeCSS}
  ${getCircleCSS}
  ${props => (props.loading ? hoverStyle : '')}
  ${props => (props.loading ? 'pointer-events: none;' : '')}
  ${getDisabledCSS}
  ${getClickCSS}
  ${getThemeStyle}
`;

const IconWrap = styled(Icon)`
  vertical-align: bottom !important;
  ${getIconStyle};
  ${getLoadingIconStyle};
`;
ButtonOut.displayName = 'hello';

export default ThemeProvider(
  KeyBoardEventAdaptor(
    DelayHoc(
      class extends React.Component<ButtonOutProps, ButtonState> {
        static getDerivedStateFromProps(nextProps, prevState) {
          if (!prevState) {
            return {
              clicked: false,
            };
          }
        }

        onClick = e => {
          const { onClick, disabled, loading } = this.props;
          if (!disabled && !loading) {
            this.setState({
              clicked: true,
            });
            setTimeout(() => {
              this.setState({
                clicked: false,
              });
            }, 500);
            onClick && onClick(e);
          }
        };

        handleChildren = () => {
          const { children, icon, circle, loading } = this.props;
          if (circle) {
            const iconType = icon || 'lugia-icon-direction_logout';
            return <Icon iconClass={iconType} />;
          }
          if (loading) {
            return (
              <span>
                <IconWrap loading iconClass="lugia-icon-financial_loading_o" />
                {children}
              </span>
            );
          }
          if (icon) {
            return (
              <span>
                <IconWrap iconClass={icon} />
                {children}
              </span>
            );
          }
          return children;
        };
        render() {
          const { type, shape, disabled, plain, size, circle, getTheme, loading } = this.props;
          const { clicked } = this.state;
          return (
            <ButtonOut
              clicked={clicked}
              type={type}
              disabled={disabled}
              size={size}
              plain={plain}
              shape={shape}
              circle={circle}
              loading={loading}
              onClick={this.onClick}
              themes={getTheme()}
            >
              <span>{this.handleChildren()}</span>
            </ButtonOut>
          );
        }
      }
    )
  ),
  Widget.Button
);
