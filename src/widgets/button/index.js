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
import MouseEventAdaptor from '../common/MouseEventAdaptor';
import { px2emcss } from '../css/units';

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
  getChildrenLineHeight,
  getCircleIconFont,
} from '../css/button';
import type { ButtonOutProps } from '../css/button';

type ButtonState = { clicked: boolean, loading: boolean };

const ButtonOut = styled.button`
  display: inline-block;
  margin-bottom: 0;
  box-sizing: border-box;
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

const ChildrenSpan = styled.span`
  display: inline-block;
  ${getChildrenLineHeight}
`;

const IconWrap: Object = styled(Icon)`
  vertical-align: -${props => props.em(1.75)} !important;
  ${getIconStyle};
  ${getLoadingIconStyle};
`;
const CircleIcon: Object = styled(Icon)`
  vertical-align: -${props => props.em(1.75)} !important;
  ${getCircleIconFont};
`;
ButtonOut.displayName = 'hello';

export default ThemeProvider(
  MouseEventAdaptor(
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
          const { children, icon, circle, loading, size = 'default' } = this.props;
          let em = px2emcss(1.4);
          if (size === 'small') {
            em = px2emcss(1.2);
          }
          if (circle) {
            const iconType = icon || 'lugia-icon-direction_logout';
            return <CircleIcon size={size} em={em} iconClass={iconType} />;
          }

          if (loading) {
            return (
              <span>
                <IconWrap em={em} loading iconClass="lugia-icon-financial_loading_o" />
                {children}
              </span>
            );
          }
          if (icon) {
            return (
              <span>
                <IconWrap em={em} iconClass={icon} />
                {children}
              </span>
            );
          }
          return children;
        };
        render() {
          const {
            type,
            shape,
            disabled,
            plain,
            size = 'default',
            circle,
            getTheme,
            loading,
            onMouseOut,
            onMouseEnter,
            onMouseOver,
            onMouseUp,
            onMouseDown,
          } = this.props;
          const { clicked } = this.state;
          let em = px2emcss(1.4);
          if (size === 'small') {
            em = px2emcss(1.2);
          }
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
              onMouseOut={onMouseOut}
              onMouseEnter={onMouseEnter}
              onMouseOver={onMouseOver}
              onMouseUp={onMouseUp}
              onMouseDown={onMouseDown}
              themes={getTheme()}
              em={em}
            >
              <ChildrenSpan em={em} size={size}>
                {this.handleChildren()}
              </ChildrenSpan>
            </ButtonOut>
          );
        }
      }
    )
  ),
  Widget.Button
);
