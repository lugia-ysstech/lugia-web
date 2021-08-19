import React from 'react';
import styled from 'styled-components';
import Popconfirm from '../index';
import Button from '../../button/index';
import notification from '../../notification/index';
import Switch from '../../switch/index';

const PopWrapper = styled.div`
  margin-right: 10px;
  display: inline-block;
`;

export default class CoditionPopconfirm extends React.Component<any, any> {
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
      <div>
        <PopWrapper>
          <Switch defaultChecked onChange={this.changeCondition} />
        </PopWrapper>
        <PopWrapper>
          <Popconfirm
            placement="top"
            title="确定要删除吗?"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary">删除任务</Button>
          </Popconfirm>
        </PopWrapper>
      </div>
    );
  }
}
