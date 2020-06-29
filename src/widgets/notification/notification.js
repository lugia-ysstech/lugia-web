/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import ThemeProvider from '../theme-provider';
import {
  Notification,
  Content,
  CloseIconWrap,
  CloseIcon,
  Title,
  Text,
  Icons,
} from '../css/notification';
import type { NotificationProps, NotificationState } from '../css/notification';
import { IconInfo } from '../css/modal';
import Widget from '../consts';

export default ThemeProvider(
  class extends React.Component<NotificationProps, NotificationState> {
    timer: any;
    constructor() {
      super();
      this.state = {
        visible: true,
        opening: true,
        closing: false,
      };
    }
    componentDidMount() {
      const { duration } = this.props;
      const time = this.handleDuration(duration);
      if (typeof time === 'number') {
        this.timer = setTimeout(this.handleClose, time * 1000);
      }
    }
    handleDuration = (duration?: number | null) => {
      if (typeof duration !== 'undefined') {
        if (duration === 0 || duration === null) {
          return 'no';
        }
        return duration;
      }
      return 4.5;
    };

    render() {
      const {
        icon,
        iconType,
        closeIcon,
        title = '标题',
        description,
        getPartOfThemeProps,
        getPartOfThemeHocProps,
      } = this.props;
      const { visible, opening, closing } = this.state;
      const { placement = 'topRight' } = this.props;

      const notificationTheme = getPartOfThemeProps('Container');
      const notificationTitleTheme = getPartOfThemeProps('NotificationTitle');
      const notificationTextTheme = getPartOfThemeProps('NotificationText');
      const notificationIconTheme = getPartOfThemeHocProps('NotificationIcon');
      const notificationCloseIconTheme = getPartOfThemeHocProps('NotificationCloseIcon');

      if (visible) {
        return (
          <Notification
            needIcon={this.needIcon()}
            opening={opening}
            closing={closing}
            placement={placement}
            themeProps={notificationTheme}
          >
            {this.needIcon() ? (
              <Icons
                iconClass={iconType ? IconInfo[iconType].class : icon}
                iconColor={iconType && IconInfo[iconType].color}
                {...notificationIconTheme}
              />
            ) : null}
            <Content>
              <Title themeProps={notificationTitleTheme}>{title}</Title>
              <Text themeProps={notificationTextTheme}>{description}</Text>
            </Content>
            <CloseIconWrap onClick={this.handleClose}>
              <CloseIcon
                iconClass={closeIcon || 'lugia-icon-reminder_close'}
                {...notificationCloseIconTheme}
              />
            </CloseIconWrap>
          </Notification>
        );
      }
      return null;
    }
    handleClose = () => {
      const { closing } = this.state;
      if (closing) {
        return;
      }
      clearTimeout(this.timer);
      this.setState({
        opening: false,
        closing: true,
      });
      setTimeout(() => {
        this.setState({
          closing: false,
          visible: false,
        });
        this.removeDom();
      }, 300);
    };
    needIcon = () => {
      const { iconType, icon } = this.props;
      if (iconType || icon) {
        return true;
      }
      return false;
    };
    removeDom = () => {
      const { parentDom, rootDom } = this.props;
      if (parentDom && rootDom) {
        unmountComponentAtNode(parentDom);
        rootDom.removeChild(parentDom);
        if (!rootDom.children.length) {
          document.body && document.body.removeChild(rootDom);
        }
      }
    };
  },
  Widget.Notification
);
