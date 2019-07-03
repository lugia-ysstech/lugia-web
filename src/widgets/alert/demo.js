/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Alert from './alert';
import Widget from '../consts/index';
import Theme from '../theme';

const Demo = styled.div`
  margin: 50px;
  & > div {
    margin-bottom: 16px;
  }
`;
export default class AlertDemo extends React.Component<any, any> {
  render() {
    const view = {
      [Widget.Alert]: {
        AlertWrap: {
          normal: {
            width: 200,
            height: 200,
            color: '#ffa500',
            opacity: 0.8,
            background: { color: 'orange' },
            border: {
              left: { color: 'red', style: 'solid', width: 4 },
              radius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
            },
            boxShadow: '1px 2px 2px 2px green',
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            },
            padding: {
              left: 50,
            },
          },
        },
        AlertMessage: {
          normal: {
            color: 'green',
            font: { size: 18, weight: 500 },
          },
        },
        AlertDescription: {
          normal: {
            color: 'pink',
            font: { size: 14, weight: 500 },
            padding: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            },
          },
        },
        CloseText: {
          normal: {
            color: 'green',
            font: { size: 16, weight: 500 },
          },
        },
        AlertIcon: {
          normal: {
            color: 'green',
            fontSize: 30,
          },
        },
      },
    };
    return (
      <Demo>
        <Alert message="Alert-info" />
        <Alert type="success" message="Alert-success" />
        <Alert type="error" message="Alert-error" />
        <Alert type="warning" message="Alert-warning" />

        <Alert message="Alert-info" closable />
        <Alert type="success" message="Alert-success" closable />
        <Alert type="error" message="Alert-error" closable closeText="确定" />
        <Alert type="warning" message="Alert-warning" closable closeText="ok" />

        <Alert message="Alert-info" showIcon />
        <Alert type="success" message="Alert-success" showIcon />
        <Alert type="error" message="Alert-error" showIcon />
        <Alert type="warning" message="Alert-warning" showIcon />

        <Alert message="Alert-info" closable description="这是辅助性文字介绍" />
        <Alert type="success" message="Alert-success" closable description="这是辅助性文字介绍" />
        <Alert
          type="error"
          message="Alert-error"
          closable
          closeText="确定"
          description="这是辅助性文字介绍"
        />
        <Alert
          type="warning"
          message="Alert-warning"
          closable
          closeText="ok"
          description="这是辅助性文字介绍"
        />

        <Alert message="Alert-info" closable description="这是辅助性文字介绍" showIcon />
        <Alert
          type="success"
          message="Alert-success"
          closable
          description="这是辅助性文字介绍"
          showIcon
        />
        <Alert
          type="error"
          message="Alert-error"
          closable
          closeText="确定"
          description="这是辅助性文字介绍"
          showIcon
        />
        <Alert
          type="warning"
          message="Alert-warning"
          closable
          closeText="ok"
          description="这是辅助性文字介绍"
          showIcon
        />

        <Alert showIcon icon="lugia-icon-logo_twitter" message="Alert-info" />

        <p>Theme</p>
        <Theme config={view}>
          <Alert message="Alert-info" />
        </Theme>
        <Theme config={view}>
          <Alert showIcon message="Alert-info" />
        </Theme>
        <Theme config={view}>
          <Alert showIcon closable closeText="ok" message="Alert-info" />
        </Theme>
        <Theme config={view}>
          <Alert message="Alert-info" showIcon closable description="这是辅助性文字介绍" />
        </Theme>
        <Theme config={view}>
          <Alert type="error" message="Alert-error" closable closeText="确定" />
        </Theme>
      </Demo>
    );
  }
}
