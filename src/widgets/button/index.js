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
  Text,
  getTextNormalTheme,
  getTextHoverStyle,
  getTextActiveTheme,
  getTextDisabledTheme,
  getTextLoadingTheme,
  getIconStyle,
  getLoadingIconStyle,
  getIconCursor,
} from '../css/button';
import type { ButtonOutProps } from '../css/button';
import { TextSizeTheme } from './theme';
import { px2remcss } from '../css/units';
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
          const normalIconFont = TextSizeTheme[size] || TextSizeTheme.default;
          const normalColor = getTextNormalTheme({ type, plain, loading });
          const hoverTheme = getTextHoverStyle({ type, plain });
          const activeTheme = getTextActiveTheme({ type, plain });
          const disabledTheme = getTextDisabledTheme({ type, plain });
          const iconTheme = deepMerge(
            {
              [viewClass]: {
                normal: {
                  ...normalIconFont,
                  ...normalColor,
                  getCSS() {
                    return `
                      vertical-align: -${px2remcss(1.75)} !important;
                      ${getIconStyle({ hasChildren })};
                      ${getIconCursor({ disabled })};
                    `;
                  },
                },
                hover: hoverTheme,
                active: activeTheme,
                disabled: disabledTheme,
                focus: hoverTheme,
              },
            },
            theme
          );
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
          if (icon) {
            return [
              <Icon
                singleTheme
                iconClass={icon}
                hasChildren={hasChildren}
                disabled={disabled}
                viewClass={viewClass}
                theme={iconTheme}
                {...dispatchEvent(['hover', 'active', 'disabled', 'focus'], 'f2c')}
              />,
              <Text themeProps={textTheme}>{text || children} </Text>,
            ];
          }
          return <Text themeProps={textTheme}>{text || children}</Text>;
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
          const buttonWrapTheme = getPartOfThemeProps('ButtonWrap');
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
              {this.handleChildren()}
            </ButtonOut>
          );
        }
      }
    )
  ),
  Widget.Button,
  { hover: true, active: true, focus: true }
);
