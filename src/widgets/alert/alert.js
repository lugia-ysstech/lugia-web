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
import { Alert, Icons, Message, CloseText, CloseIcon, Description } from '../css/alert';
import type { AlertProps, AlertState } from '../css/alert';

const AlertIcons = {
  info: 'lugia-icon-reminder_info_circle',
  success: 'lugia-icon-reminder_check_circle',
  error: 'lugia-icon-reminder_close_circle',
  warning: 'lugia-icon-reminder_exclamation_circle',
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
      } = this.props;
      const { visible, height, animateStart } = this.state;
      const hasDect = this.isInProps('description');
      return (
        <div>
          {visible ? (
            <Alert
              innerRef={(node: any) => (this.alert = node)}
              type={type}
              showIcon={showIcon}
              theme={getTheme()}
              visible={visible}
              animateStart={animateStart}
              height={height}
            >
              <div>
                {showIcon ? (
                  <Icons
                    theme={getTheme()}
                    hasDect={hasDect}
                    type={type}
                    iconClass={AlertIcons[type]}
                  />
                ) : null}
                <Message hasDect={hasDect}>{message}</Message>
              </div>
              <Description showIcon={showIcon}>{description}</Description>
              {closable && this.getCloseText()}
            </Alert>
          ) : null}
        </div>
      );
    }
    getCloseText = () => {
      const { closeText, type = 'info', getTheme } = this.props;
      return (
        <CloseText
          onClick={this.handleClose}
          theme={getTheme()}
          type={type}
          textInProps={this.isInProps('closeText')}
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
