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

const Wrapper = styled.div`
  margin: 100px;
`;
const IconWrapper = styled.div`
  border-radius: 50%;
  width: 14px;
  height: 14px;
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
    [Widget.Popconfirm]: {
      PopconfirmContent: {
        PopoverContent: {
          TooltipContent: {
            normal: { background: { color: '#f1f1f1' } },
          },
        },
      },
      PopconfirmTitle: {
        normal: {
          color: 'red',
          fontSize: 18,
        },
      },
      PopconfirmIcon: {
        normal: {
          color: 'red',
        },
      },
    },
  };
  return (
    <Wrapper>
      <Theme config={config}>
        <div style={{ marginLeft: 50, whiteSpace: 'nowrap' }}>
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
        <div style={{ width: 70, marginLeft: 200 }}>
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
        <div style={{ marginLeft: 50, clear: 'both', whiteSpace: 'nowrap' }}>
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
        <Popconfirm title={text} action={'focus'}>
          <Input placeholder={'聚焦弹出'} />
        </Popconfirm>
        <Popconfirm title={text} action={'hover'}>
          <Direction type="primary"> 悬停</Direction>
        </Popconfirm>
        <Popconfirm title={text} action={'click'} cancelText="No" okText="yes" okType="danger">
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
            icon={'lugia-icon-reminder_exclamation'}
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
              <IconWrapper>
                <Icon iconClass={'lugia-icon-reminder_question'} />
              </IconWrapper>
            }
          >
            <Direction type="primary">危险操作</Direction>
          </Popconfirm>
        </div>
      </Theme>
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
