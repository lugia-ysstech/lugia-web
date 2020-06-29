/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import notification from './index';
import Button from '../button';
import Notification from './notification';
import Theme from '../theme';
import Widget from '../consts';
import { getBorder, getBoxShadow, getBorderRadius } from '@lugia/theme-utils';

export default class NotificationDemo extends React.Component<any, any> {
  defaultOpen = () => {
    notification.open({ title: '今天天气很好！', description: '因为今天的太阳很大。' });
  };
  durationOpen = (duration: number) => {
    notification.open({ title: '今天天气很好！', description: '因为今天的太阳很大。', duration });
  };
  statusOpen = (type: 'info' | 'success' | 'error' | 'warning') => {
    notification[type]({ title: '今天天气很好！', description: '因为今天的太阳很大。' });
  };
  customIconOpen = (icon: string) => {
    notification.open({
      title: '今天天气很好！',
      description: '因为今天的太阳很大。',
      icon,
      duration: 0,
    });
  };
  placementOpen = (placement: 'bottomLeft' | 'bottomRight' | 'topLeft') => {
    notification.open({
      icon: 'lugia-icon-reminder_check_circle',
      title: '今天天气很好！',
      description: '因为今天的太阳很大。',
      placement,
    });
  };
  render() {
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
          Icon: {
            normal: {
              color: 'yellow',
            },
          },
        },
        NotificationCloseIcon: {
          Icon: {
            normal: {
              color: 'yellow',
            },
          },
        },
      },
    };
    return (
      <div>
        <br />
        <br />
        <Button onClick={this.defaultOpen}>基本用法</Button>
        <br />
        <br />
        <Button onClick={() => this.durationOpen(6)}>自定义延时关闭</Button>
        &nbsp;&nbsp;
        <Button onClick={() => this.durationOpen(0)}>自定义延时关闭</Button>
        <br />
        <br />
        <Button onClick={() => this.statusOpen('info')}>info</Button>&nbsp;&nbsp;
        <Button onClick={() => this.statusOpen('success')}>success</Button>&nbsp;&nbsp;
        <Button onClick={() => this.statusOpen('error')}>error</Button>&nbsp;&nbsp;
        <Button onClick={() => this.statusOpen('warning')}>warning</Button>&nbsp;&nbsp;
        <br />
        <br />
        <Button onClick={() => this.customIconOpen('lugia-icon-reminder_check_circle')}>
          自定义图标
        </Button>
        <br />
        <br />
        <Button onClick={() => this.placementOpen('bottomLeft')}>自定义方向-bottomLeft</Button>
        &nbsp;&nbsp;
        <Button onClick={() => this.placementOpen('bottomRight')}>自定义方向-bottomRight</Button>
        &nbsp;&nbsp;
        <Button onClick={() => this.placementOpen('topLeft')}>自定义方向-topLeft</Button>
        <br />
        <br />
        <Theme config={notificationTheme}>
          <Notification
            icon={'lugia-icon-logo_ysstech'}
            duration={1000}
            title="我是标题"
            description={<div>我是内容</div>}
          />
        </Theme>
      </div>
    );
  }
}
