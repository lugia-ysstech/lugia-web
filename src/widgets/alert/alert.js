/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import type { AlertProps, AlertState } from '../css/alert';
import { Alert, CloseIcon, CloseText, Description, Icons, Message } from '../css/alert';

const AlertIcons = {
  info: 'lugia-icon-reminder_info_circle_o',
  success: 'lugia-icon-reminder_check_circle_o',
  error: 'lugia-icon-reminder_close_circle_o',
  warning: 'lugia-icon-reminder_exclamation_circle_o',
};

export default ThemeProvider(
  class extends React.Component<AlertProps, AlertState> {
    alert: any;

    constructor() {
      super();
      this.state = {
        visible: true,
        animateStart: false,
        height: 0,
      };
    }

    componentDidMount() {
      const height = this.alert && this.alert.offsetHeight;
      this.setState({
        height,
      });
    }

    render() {
      const {
        type = 'info',
        showIcon = false,
        getTheme,
        message,
        closable = false,
        description,
        icon,
      } = this.props;
      const { visible, height, animateStart } = this.state;
      const hasDect = this.isInProps('description');
      return visible ? (
        <Alert
          innerRef={(node: any) => (this.alert = node)}
          type={type}
          showIcon={showIcon}
          theme={getTheme()}
          visible={visible}
          animateStart={animateStart}
          height={height}
          hasDect={hasDect}
        >
          {showIcon ? (
            <Icons
              theme={getTheme()}
              hasDect={hasDect}
              type={type}
              iconClass={icon || AlertIcons[type]}
            />
          ) : null}
          <Message hasDect={hasDect} showIcon={showIcon}>
            {message}
          </Message>
          <Description showIcon={showIcon}>{description}</Description>
          {closable && this.getCloseText()}
        </Alert>
      ) : null;
    }

    getCloseText = () => {
      const { closeText, type = 'info', getTheme } = this.props;
      return (
        <CloseText
          onClick={this.handleClose}
          theme={getTheme()}
          type={type}
          textInProps={this.isInProps('closeText')}
          hasDect={this.isInProps('description')}
        >
          {closeText || <CloseIcon iconClass="lugia-icon-reminder_close" />}
        </CloseText>
      );
    };
    handleClose = (e: Event) => {
      const { onClose } = this.props;
      e.preventDefault();
      this.setState({
        animateStart: true,
      });
      onClose && onClose(e);
      setTimeout(() => {
        this.setState({ visible: false });
      }, 250);
    };

    isInProps(value: string): boolean {
      return value in this.props;
    }
  },
  Widget.Alert
);
