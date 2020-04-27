/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import { deepMerge } from '@lugia/object-utils';
import { css } from 'styled-components';
import ThemeProvider from '../theme-provider';
import { addMouseEvent, addFocusBlurEvent } from '@lugia/theme-hoc';
import Widget from '../consts/index';
import DelayHoc from '../common/DelayHoc';
import MouseEventAdaptor from '../common/MouseEventAdaptor';
import {
  ButtonOut,
  ButtonContent,
  Text,
  getTextNormalTheme,
  getTextHoverStyle,
  getTextActiveTheme,
  getTextFocusStyle,
  getTextDisabledTheme,
  getTextLoadingTheme,
  getIconStyle,
  getLoadingIconStyle,
  getIconCursor,
} from '../css/button';
import type { ButtonOutProps } from '../css/button';
import { iconSizeTheme } from './theme';
import Icon from '../icon';

type ButtonState = { clicked: boolean };

ButtonOut.displayName = 'ButtonWrap';

export default ThemeProvider(
  MouseEventAdaptor(
    DelayHoc(
      class extends React.Component<ButtonOutProps, ButtonState> {
        static displayName = 'Button';
        constructor() {
          super();
          this.state = {
            clicked: false,
          };
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

        getIconTheme = ({ viewClass, theme, isSuffix }): Object => {
          const {
            type = 'default',
            plain,
            children,
            text,
            loading,
            size = 'default',
            disabled,
          } = this.props;
          const hasChildren = !!children || !!text;
          const normalIconSize = iconSizeTheme[size] || iconSizeTheme.default;
          const normalColor = getTextNormalTheme({ type, plain, loading });
          const hoverTheme = getTextHoverStyle({ type, plain });
          const activeTheme = getTextActiveTheme({ type, plain });
          const focusTheme = getTextFocusStyle({ type, plain });
          const disabledTheme = getTextDisabledTheme({ type, plain });
          return deepMerge(
            {
              [viewClass]: {
                normal: {
                  ...normalIconSize,
                  ...normalColor,
                  getCSS() {
                    return `
                      ${getIconStyle({ hasChildren, isSuffix })};
                      ${getIconCursor({ disabled })};
                    `;
                  },
                },
                hover: hoverTheme,
                active: activeTheme,
                disabled: disabledTheme,
                focus: focusTheme,
              },
            },
            theme
          );
        };

        handleChildren = () => {
          const {
            type = 'default',
            plain,
            children,
            text,
            icon,
            circle,
            loading,
            size = 'default',
            disabled,
            getPartOfThemeProps,
            getPartOfThemeHocProps,
            dispatchEvent,
            suffixIcon,
          } = this.props;
          const hasChildren = !!children || !!text;
          const textTheme = getPartOfThemeProps('ButtonText');
          const { viewClass, theme } = getPartOfThemeHocProps('ButtonIcon');
          textTheme.propsConfig = {
            type,
            plain,
            loading,
            size,
            circle,
          };
          const iconTheme = this.getIconTheme({ viewClass, theme, isSuffix: false });
          if (circle) {
            const iconType = icon || 'lugia-icon-direction_logout';

            return [
              <Icon
                singleTheme
                size={size}
                iconClass={iconType}
                viewClass={viewClass}
                theme={iconTheme}
                {...dispatchEvent(['hover', 'active', 'disabled', 'focus'], 'f2c')}
              />,
              <Text themeProps={textTheme}>{text || children}</Text>,
            ];
          }

          if (loading) {
            const loadingTheme = getTextLoadingTheme({ plain, type });
            const iconLoadingTheme = deepMerge(
              {
                [viewClass]: {
                  normal: {
                    ...loadingTheme,
                    getCSS() {
                      return css`
                        ${getIconStyle({ hasChildren })};
                        ${getLoadingIconStyle({ loading: true })};
                      `;
                    },
                  },
                },
              },
              theme
            );
            return [
              <Icon
                singleTheme
                loading
                iconClass="lugia-icon-financial_loading_o"
                viewClass={viewClass}
                theme={iconLoadingTheme}
              />,
              <Text themeProps={textTheme}>{text || children}</Text>,
            ];
          }

          const component = [<Text themeProps={textTheme}>{text || children}</Text>];
          const iconProps = {
            singleTheme: true,
            hasChildren,
            disabled,
            ...dispatchEvent(['hover', 'active', 'disabled', 'focus'], 'f2c'),
          };
          if (icon) {
            component.unshift(
              <Icon iconClass={icon} viewClass={viewClass} theme={iconTheme} {...iconProps} />
            );
          }
          if (suffixIcon) {
            const { viewClass, theme } = getPartOfThemeHocProps('ButtonSuffixIcon');
            const suffixIconTheme = this.getIconTheme({ viewClass, theme, isSuffix: true });
            component.push(
              <Icon
                iconClass={suffixIcon}
                viewClass={viewClass}
                theme={suffixIconTheme}
                {...iconProps}
              />
            );
          }
          return component;
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
            onMouseOver,
            onMouseEnter,
            onMouseLeave,
            onMouseUp,
            onMouseDown,
            block,
            getPartOfThemeProps,
          } = this.props;
          const { clicked } = this.state;
          const mouseConfig = {
            enter: onMouseEnter,
            leave: onMouseLeave,
            up: onMouseUp,
            down: onMouseDown,
          };
          const buttonWrapTheme = getPartOfThemeProps('Container');
          buttonWrapTheme.propsConfig = {
            type,
            plain,
            disabled,
            loading,
            size,
            circle,
            shape,
          };

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
              onMouseOver={onMouseOver}
              themes={getTheme()}
              block={block}
              themeProps={buttonWrapTheme}
              {...addMouseEvent(this, mouseConfig)}
              {...addFocusBlurEvent(this)}
            >
              <ButtonContent>{this.handleChildren()}</ButtonContent>
            </ButtonOut>
          );
        }
      }
    )
  ),
  Widget.Button,
  { hover: true, active: true, focus: true }
);
