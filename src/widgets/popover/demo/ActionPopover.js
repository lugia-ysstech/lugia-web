import React from 'react';
import styled from 'styled-components';
import Popover from '../index';
import Button from '../../button/index';
import Input from '../../input/index';

const PopWrapper = styled.div`
  margin-right: 10px;
  display: inline-block;
`;
export default class ActionPopover extends React.Component<any, any> {
  render() {
    const text = 'this is title ';
    const description = 'this is description';
    return (
      <div>
        <PopWrapper>
          <Popover
            title={text}
            action={'click'}
            placement="top"
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Button type="primary">鼠标点击</Button>
          </Popover>
        </PopWrapper>
        <PopWrapper>
          <Popover
            title={text}
            action={'hover'}
            placement="top"
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Button type="primary">鼠标移入</Button>
          </Popover>
        </PopWrapper>
        <PopWrapper>
          <Popover
            title={text}
            action={'focus'}
            placement="top"
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Input placeholder={'聚焦弹出'} />
          </Popover>
        </PopWrapper>
      </div>
    );
  }
}
