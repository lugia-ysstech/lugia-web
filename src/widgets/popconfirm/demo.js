/**
 *
 * create by liangguodong on 2018/12/5
 *
 * @flow
 */
import * as React from 'react';
import Direction from '../button';
import Icon from '../icon';
import Switch from '../switch';
import notification from '../notification';
import styled from 'styled-components';
import Popconfirm from './popconfirm';
import Input from '../input/index';
import Widget from '../consts';
import Theme from '../theme';
import Popover from '../popover/popover';

const Wrapper = styled.div`
  margin: 100px;
`;
export class Condition extends React.Component<any, any> {
  state = {
    visible: false,
    condition: true,
  };

  changeCondition = (value: Object) => {
    const condition = value.oldValue === true;
    this.setState({ condition });
  };

  confirm = () => {
    this.setState({ visible: false });
    notification.success({ title: '操作成功 ' });
  };

  cancel = () => {
    this.setState({ visible: false });
    notification.error({ title: '取消操作' });
  };

  handleVisibleChange = (visible: Object) => {
    if (!visible) {
      this.setState({ visible });
      return;
    }
    if (this.state.condition === true) {
      this.confirm();
    } else {
      this.setState({ visible });
    }
  };

  render() {
    return (
      <div style={{ margin: 20 }}>
        <p> 触发弹出框</p>
        <Switch defaultChecked onChange={this.changeCondition} />
        <Popconfirm
          title="确定要删除吗?"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
          onConfirm={this.confirm}
          onCancel={this.cancel}
          okText="确定"
          cancelText="取消"
        >
          <Direction>删除任务</Direction>
        </Popconfirm>
      </div>
    );
  }
}

export const WrapperDemo = () => {
  const text = '确定删除这个选项吗?';
  const config = {
    [Widget.Button]: { Container: { normal: { width: 80 } } },
  };
  const iconConfig = {
    [Widget.Icon]: {
      normal: {
        fontSize: 14,
        color: 'red',
      },
    },
  };
  const buttonTheme = {
    [Widget.Popconfirm]: {
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
  return (
    <Wrapper>
      <Theme config={config}>
        <div style={{ marginLeft: 80, whiteSpace: 'nowrap' }}>
          <Popconfirm placement="topLeft" title={text} action={'click'}>
            <Direction type="primary">TL</Direction>
          </Popconfirm>
          <Popconfirm placement="top" title={text}>
            <Direction type="primary">Top</Direction>
          </Popconfirm>
          <Popconfirm placement="topRight" title={text}>
            <Direction type="primary">TR</Direction>
          </Popconfirm>
        </div>
        <div style={{ width: 70, float: 'left' }}>
          <Popconfirm placement="leftTop" title={text}>
            <Direction type="primary">LT</Direction>
          </Popconfirm>
          <Popconfirm placement="left" title={text}>
            <Direction type="primary">Left</Direction>
          </Popconfirm>
          <Popconfirm placement="leftBottom" title={text}>
            <Direction type="primary">LB</Direction>
          </Popconfirm>
        </div>
        <div style={{ width: 70, marginLeft: 320 }}>
          <Popconfirm placement="rightTop" title={text}>
            <Direction type="primary">RT</Direction>
          </Popconfirm>
          <Popconfirm placement="right" title={text}>
            <Direction type="primary">Right</Direction>
          </Popconfirm>
          <Popconfirm placement="rightBottom" title={text}>
            <Direction type="primary">RB</Direction>
          </Popconfirm>
        </div>
        <div style={{ marginLeft: 80, clear: 'both', whiteSpace: 'nowrap' }}>
          <Popconfirm placement="bottomLeft" title={text}>
            <Direction type="primary">BL</Direction>
          </Popconfirm>
          <Popconfirm placement="bottom" title={text}>
            <Direction type="primary">Bottom</Direction>
          </Popconfirm>
          <Popconfirm placement="bottomRight" title={text}>
            <Direction type="primary">BR</Direction>
          </Popconfirm>
        </div>

        <br />
        <Popconfirm title={text} action={'focus'} placement="bottom">
          <Input placeholder={'聚焦弹出'} />
        </Popconfirm>
        <Popconfirm title={text} action={'hover'} placement="bottom">
          <Direction type="primary"> 悬停</Direction>
        </Popconfirm>
        <Popconfirm
          title={text}
          action={'click'}
          cancelText="No"
          okText="yes"
          okType="danger"
          placement="bottom"
        >
          <Direction type="primary">点击</Direction>
        </Popconfirm>
        <br />
        <div>
          <Popconfirm
            title={text}
            action={'click'}
            cancelText="No"
            okText="yes"
            okType="danger"
            icon={
              <Theme config={iconConfig}>
                <Icon iconClass={'lugia-icon-reminder_exclamation_circle_o'} singleTheme />
              </Theme>
            }
          >
            <Direction type="primary">提示</Direction>
          </Popconfirm>
          <Popconfirm
            title={text}
            action={'click'}
            cancelText="No"
            okText="yes"
            okType="danger"
            icon={
              <Theme config={iconConfig}>
                <Icon iconClass={'lugia-icon-reminder_question_circle_o'} singleTheme />
              </Theme>
            }
          >
            <Direction type="primary">危险操作</Direction>
          </Popconfirm>
        </div>
      </Theme>
      <br />
      <p>按钮主题</p>
      <Theme config={buttonTheme}>
        <Popconfirm
          title={text}
          action={'click'}
          cancelText="No"
          okText="yes"
          okType="danger"
          placement="bottom"
          popArrowType="round"
        >
          <Direction type="primary">点击</Direction>
        </Popconfirm>
      </Theme>
      <br />
      <br />
      <br />
      <p>包含的组件 继承容器的高度</p>
      <div style={{ width: 100, height: 50 }}>
        <Popover title={text} action={'click'} placement="top">
          <div style={{ height: '100%', border: '1px solid red' }}>点击触发</div>
        </Popover>
      </div>
    </Wrapper>
  );
};
export default () => {
  return [
    <WrapperDemo />,
    <Wrapper>
      <Condition />
    </Wrapper>,
  ];
};
