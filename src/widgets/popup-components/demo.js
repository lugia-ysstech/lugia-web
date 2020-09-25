/**
 *
 * create by Shine_Lee
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import Button from '../button';
import popupComps from './index';
import Widget from '../consts';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
import Notification from '../css/notification';

const BoxWrap = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

export default class DrawerDemo extends React.Component<any, any> {
  handlePopupMessage = (obj: Object) => {
    popupComps.message(obj);
  };
  handlePopupNotification = (obj: Object) => {
    popupComps.notification(obj);
  };

  render() {
    const messageView = {
      [Widget.Message]: {
        Container: {
          normal: {
            width: 200,
            height: 50,
            boxShadow: getBoxShadow('0 0'),
            background: {
              color: 'green',
            },
            borderRadius: getBorderRadius(6),
            padding: 10,
            opacity: 0.8,
            border: getBorder({ width: 1, style: 'solid', color: 'red' }),
          },
        },
        MessageText: {
          normal: {
            color: 'red',
            font: { size: 16, weight: 600 },
          },
        },
        MessageIcon: {
          normal: {
            color: 'pink',
            font: { size: 18 },
          },
        },
      },
    };
    const messageProps = {
      iconType: 'success',
      content: '成功提醒',
      time: 3,
      theme: messageView,
    };

    const notificationTheme = {
      [Widget.Notification]: {
        Container: {
          normal: {
            width: 500,
            height: 100,
            borderRadius: getBorderRadius(10),
            background: {
              color: '#ccc',
            },
            border: getBorder({ width: 1, style: 'solid', color: 'blue' }),
            boxShadow: getBoxShadow('0 0 8 red'),
            margin: {
              left: 60,
            },
          },
        },
        NotificationTitle: {
          normal: {
            color: 'red',
          },
        },
        NotificationText: {
          normal: {
            color: 'yellow',
          },
        },
        NotificationIcon: {
          normal: {
            color: 'yellow',
          },
        },
        NotificationCloseIcon: {
          normal: {
            color: 'yellow',
          },
        },
      },
    };
    const notificationProps = {
      icon: 'lugia-icon-logo_ysstech',
      closeIcon: 'lugia-icon-reminder_close_circle_o',
      duration: 3,
      title: '我是标题',
      placement: 'topRight',
      theme: notificationTheme,
    };

    return (
      <div style={{ marginTop: '20px' }}>
        <BoxWrap>
          <Button type="primary" onClick={() => this.handlePopupMessage(messageProps)}>
            弹出message
          </Button>
        </BoxWrap>

        <BoxWrap>
          <Button type="primary" onClick={() => this.handlePopupNotification(notificationProps)}>
            弹出notification
          </Button>
        </BoxWrap>
      </div>
    );
  }
}
