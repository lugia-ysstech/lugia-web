import React from 'react';
import styled from 'styled-components';
import Popconfirm from '../index';
import Button from '../../button/index';
import Input from '../../input/index';

const PopWrapper = styled.div`
  margin-right: 10px;
  display: inline-block;
`;
export default class ActionPopconfirm extends React.Component<any, any> {
  render() {
    const text = '确定删除这个选项吗?';
    return (
      <div>
        <PopWrapper>
          <Popconfirm placement="top" title={text} action={'click'}>
            <Button type="primary">鼠标点击</Button>
          </Popconfirm>
        </PopWrapper>
        <PopWrapper>
          <Popconfirm placement="top" title={text} action={'hover'}>
            <Button type="primary">鼠标移入</Button>
          </Popconfirm>
        </PopWrapper>
        <PopWrapper>
          <Popconfirm title={text} action={'focus'} placement="top">
            <Input placeholder={'聚焦弹出'} />
          </Popconfirm>
        </PopWrapper>
      </div>
    );
  }
}
