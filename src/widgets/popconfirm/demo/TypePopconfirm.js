import React from 'react';
import styled from 'styled-components';
import Popconfirm from '../index';
import Button from '../../button/index';
import Icon from '../../icon/index';

const IconWrapper = styled.div`
  border-radius: 50%;
  width: 14px;
  height: 14px;
`;
const HintIcon: Object = styled(Icon)`
  color: white;
  font-size: 14px;
`;
const PopWrapper = styled.div`
  margin-right: 10px;
  display: inline-block;
`;
export default class TypePopconfirm extends React.Component<any, any> {
  render() {
    const text = '确定删除这个选项吗?';
    return (
      <div>
        <PopWrapper>
          <Popconfirm
            placement="top"
            title={text}
            action={'click'}
            cancelText="No"
            okText="yes"
            okType="danger"
            icon={
              <IconWrapper style={{ background: 'orange' }}>
                <HintIcon iconClass={'lugia-icon-reminder_exclamation'} />
              </IconWrapper>
            }
          >
            <Button type="primary">提示</Button>
          </Popconfirm>
        </PopWrapper>
        <PopWrapper>
          <Popconfirm
            placement="top"
            title={text}
            action={'click'}
            cancelText="No"
            okText="yes"
            okType="danger"
            icon={
              <IconWrapper style={{ background: '#f22735' }}>
                <HintIcon style={{ color: 'white' }} iconClass={'lugia-icon-reminder_question'} />
              </IconWrapper>
            }
          >
            <Button type="primary">危险操作</Button>
          </Popconfirm>
        </PopWrapper>
      </div>
    );
  }
}
