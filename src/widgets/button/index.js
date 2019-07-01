/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import DelayHoc from '../common/DelayHoc';
import MouseEventAdaptor from '../common/MouseEventAdaptor';
import { ButtonOut, ChildrenSpan, IconWrap, CircleIcon } from '../css/button';
import type { ButtonOutProps } from '../css/button';

type ButtonState = { clicked: boolean, loading: boolean };

ButtonOut.displayName = 'ButtonWrap';

export default ThemeProvider(
  MouseEventAdaptor(
    DelayHoc(
      class extends React.Component<ButtonOutProps, ButtonState> {
        static displayName = 'Button';
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
            onMouseEnter,
            onMouseOver,
            onMouseUp,
            onMouseDown,
            block,
          } = this.props;
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
              onMouseOut={onMouseOut}
              onMouseEnter={onMouseEnter}
              onMouseOver={onMouseOver}
              onMouseUp={onMouseUp}
              onMouseDown={onMouseDown}
              themes={getTheme()}
              block={block}
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
  Widget.Button
);
