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

const BoxWrap = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;
const Target = styled.div`
  background: #ccc;
  height: 80px;
  width: 300px;
  margin: 30px auto;
`;

export default class DrawerDemo extends React.Component<any, any> {
  handlePopupMessage = (props: Object) => {
    popupComps.message(props);
  };
  handlePopupNotification = (props: Object) => {
    popupComps.notification(props);
  };
  handlePopupModal = (props: Object) => {
    popupComps.modal(props);
  };
  handlePopupTooltip = (props: Object, nodeId: string) => {
    popupComps.tooltip(props, nodeId);
  };
  handlePopupPopconfirm = (props: Object, nodeId: string) => {
    popupComps.popconfirm(props, nodeId);
  };
  handlePopupPopover = (props: Object, nodeId: string) => {
    popupComps.popover(props, nodeId);
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
      time: 2,
      theme: messageView,
    };

    const notificationTheme = {
      [Widget.Notification]: {
        Container: {
          normal: {
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

    const modalTheme = {
      [Widget.Modal]: {
        Container: {
          normal: {
            width: 800,
            height: 500,
            border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(50),
            opacity: 0.8,
            boxShadow: getBoxShadow('1px 2px 2px 2px #e8e8e8'),
            background: { color: 'orange' },
            padding: {
              top: 30,
              right: 30,
              bottom: 30,
              left: 50,
            },
          },
        },
        ModalTitle: {
          normal: {
            color: 'green',
            font: { size: 18, weight: 500 },
            padding: {
              top: 30,
              right: 30,
              bottom: 30,
              left: 0,
            },
          },
        },
        ModalContentText: {
          normal: {
            color: 'green',
            font: { size: 18, weight: 500 },
            padding: {
              top: 30,
              right: 30,
              bottom: 30,
              left: 0,
            },
          },
        },
        ModalCloseIcon: {
          normal: {
            color: 'green',
            fontSize: 18,
          },
        },
        ModalMask: {
          normal: {
            background: {
              color: 'green',
            },
          },
        },
        ModalOkButton: {
          Container: {
            normal: {
              width: 200,
            },
          },
        },
        ModalCancelButton: {
          Container: {
            normal: {
              width: 100,
              background: {
                color: 'red',
              },
            },
          },
        },
      },
    };
    const modalProps = {
      title: '弹窗标题',
      theme: modalTheme,
    };

    const tooltipTheme = {
      [Widget.Tooltip]: {
        Container: {
          normal: {
            background: {
              color: 'blue',
            },
          },
        },
      },
    };
    const tooltipProps = {
      placement: 'topLeft',
      title: '我是tooltip',
      theme: tooltipTheme,
    };

    const popoverProps = {
      placement: 'right',
      title: '我是popover',
      description: '一小段描述',
      content: '内容部分',
    };

    const popconfirmTheme = {
      [Widget.Popconfirm]: {
        PopconfirmContent: {
          Container: {
            normal: {
              width: 200,
            },
          },
        },
        PopconfirmOkButton: {
          Container: {
            normal: {
              background: {
                color: 'purple',
              },
            },
          },
          ButtonText: {
            normal: {
              color: '#eee',
            },
          },
        },
        PopconfirmCancelButton: {
          Container: {
            normal: {
              background: {
                color: '#eee',
              },
            },
          },
          ButtonText: {
            normal: {
              color: 'blue',
            },
          },
        },
      },
    };
    const popconfirmProps = {
      title: '弹窗标题',
      placement: 'left',
      action: 'click',
      visible: true,
      description: '弹窗描述',
      theme: popconfirmTheme,
      onConfirm: () => {
        console.log('确定');
      },
      onCancel: () => {
        console.log('取消');
      },
    };

    return (
      <div>
        <BoxWrap>
          <Button type="primary" onClick={() => this.handlePopupMessage(messageProps)}>
            弹出Message
          </Button>
        </BoxWrap>

        <BoxWrap>
          <Button type="primary" onClick={() => this.handlePopupNotification(notificationProps)}>
            弹出Notification
          </Button>
        </BoxWrap>

        <BoxWrap>
          <Button type="primary" onClick={() => this.handlePopupModal(modalProps)}>
            弹出Modal
          </Button>
        </BoxWrap>

        <Target id="tooltipTestId" />
        <BoxWrap>
          <Button
            type="primary"
            onClick={() => this.handlePopupTooltip(tooltipProps, 'tooltipTestId')}
          >
            弹出tooltip
          </Button>
        </BoxWrap>

        <Target id="targetPopoverBox" />
        <BoxWrap>
          <Button
            type="primary"
            onClick={() => this.handlePopupPopover(popoverProps, 'targetPopoverBox')}
          >
            弹出Popover
          </Button>
        </BoxWrap>

        <Target id="targetPopconfirmBox" />
        <BoxWrap>
          <Button
            type="primary"
            onClick={() => this.handlePopupPopconfirm(popconfirmProps, 'targetPopconfirmBox')}
          >
            弹出Popconfirm
          </Button>
        </BoxWrap>
      </div>
    );
  }
}
