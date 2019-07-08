/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import { addMouseEvent, addFocusBlurEvent } from '@lugia/theme-hoc';
import Widget from '../consts/index';
import DelayHoc from '../common/DelayHoc';
import MouseEventAdaptor from '../common/MouseEventAdaptor';
import { ButtonOut, Text, IconWrap, CircleIcon } from '../css/button';
import type { ButtonOutProps } from '../css/button';

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
            themeProps,
            getPartOfThemeProps,
          } = this.props;
          const textTheme = getPartOfThemeProps('ButtonText');
          textTheme.propsConfig = {
            type,
            plain,
            loading,
            size,
            circle,
          };
          if (circle) {
            const iconType = icon || 'lugia-icon-direction_logout';
            return [
              <CircleIcon size={size} iconClass={iconType} />,
              <Text themeProps={textTheme}>{text || children}</Text>,
            ];
          }

          if (loading) {
            return [
              <IconWrap
                loading
                iconClass="lugia-icon-financial_loading_o"
                themeProps={themeProps}
              />,
              <Text themeProps={textTheme}>{text || children}</Text>,
            ];
          }
          if (icon) {
            const hasChildren = !!children || !!text;
            return [
              <IconWrap
                iconClass={icon}
                hasChildren={hasChildren}
                disabled={disabled}
                themeProps={this.props.getPartOfThemeProps('IconWrap')}
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
          const ButtonWrapTheme = getPartOfThemeProps('ButtonWrap');
          ButtonWrapTheme.propsConfig = {
            type,
            plain,
            disabled,
            loading,
            size,
            circle,
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
              themeProps={ButtonWrapTheme}
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
