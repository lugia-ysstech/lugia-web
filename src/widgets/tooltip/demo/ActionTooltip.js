import React from 'react';
import styled from 'styled-components';
import Tooltip from '../index';
import Button from '../../button/index';
import Input from '../../input/index';

const PopWrapper = styled.div`
  margin-right: 10px;
  display: inline-block;
`;
export default class ActionTooltip extends React.Component<any, any> {
  render() {
    const text = 'this is title ';
    return (
      <div>
        <PopWrapper>
          <Tooltip title={text} action={'click'} placement="top">
            <Button type="primary">鼠标点击</Button>
          </Tooltip>
        </PopWrapper>
        <PopWrapper>
          <Tooltip title={text} action={'hover'} placement="top">
            <Button type="primary">鼠标移入</Button>
          </Tooltip>
        </PopWrapper>
        <PopWrapper>
          <Tooltip title={text} action={'focus'} placement="top">
            <Input placeholder={'聚焦弹出'} />
          </Tooltip>
        </PopWrapper>
      </div>
    );
  }
}
