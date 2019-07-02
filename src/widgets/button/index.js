/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import { addMouseEvent } from '@lugia/theme-hoc';
import Widget from '../consts/index';
import DelayHoc from '../common/DelayHoc';
import MouseEventAdaptor from '../common/MouseEventAdaptor';
import { ButtonOut, ChildrenSpan, IconWrap, CircleIcon } from '../css/button';
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
          const { children, text, icon, circle, loading, size = 'default', disabled } = this.props;
          if (circle) {
            const iconType = icon || 'lugia-icon-direction_logout';
            return <CircleIcon size={size} iconClass={iconType} />;
          }

          if (loading) {
            return (
              <span>
                <IconWrap loading iconClass="lugia-icon-financial_loading_o" />
                {text || children}
              </span>
            );
          }
          if (icon) {
            const hasChildren = !!children || !!text;
            return (
              <span>
                <IconWrap iconClass={icon} hasChildren={hasChildren} disabled={disabled} />
                {text || children}
              </span>
            );
          }
          return text || children;
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
              onFocus={() => console.log('focus')}
              onBlur={() => console.log('onBlur')}
            >
              <ChildrenSpan size={size} type={type} plain={plain}>
                {this.handleChildren()}
              </ChildrenSpan>
            </ButtonOut>
          );
        }
      }
    )
  ),
  Widget.Button,
  { hover: true, active: true }
);
