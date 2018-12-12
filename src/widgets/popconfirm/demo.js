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

const Wrapper = styled.div`
  margin: 100px;
`;
const IconWrapper = styled.div`
  border-radius: 50%;
  width: 14px;
  height: 14px;
  background: red;
`;
const HintIcon = styled(Icon)`
  color: white;
`;
export class Condition extends React.Component {
  state = {
    visible: false,
    condition: true,
  };

  changeCondition = value => {
    this.setState({ condition: value });
  };

  confirm = () => {
    this.setState({ visible: false });
    notification.success({ title: 'Next step.' });
  };

  cancel = () => {
    this.setState({ visible: false });
    notification.error({ title: 'click cancel.' });
  };

  handleVisibleChange = visible => {
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
        <p> 触发确认框</p>
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
  return (
    <Wrapper>
      <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
        <Popconfirm arrowPosition="topLeft" title={text} action={'click'}>
          <Direction>TL</Direction>
        </Popconfirm>
        <Popconfirm arrowPosition="top" title={text}>
          <Direction>Top</Direction>
        </Popconfirm>
        <Popconfirm arrowPosition="topRight" title={text}>
          <Direction>TR</Direction>
        </Popconfirm>
      </div>
      <div style={{ width: 70, float: 'left' }}>
        <Popconfirm arrowPosition="leftTop" title={text}>
          <Direction>LT</Direction>
        </Popconfirm>
        <Popconfirm arrowPosition="left" title={text}>
          <Direction>Left</Direction>
        </Popconfirm>
        <Popconfirm arrowPosition="leftBottom" title={text}>
          <Direction>LB</Direction>
        </Popconfirm>
      </div>
      <div style={{ width: 70, marginLeft: 200 }}>
        <Popconfirm arrowPosition="rightTop" title={text}>
          <Direction>RT</Direction>
        </Popconfirm>
        <Popconfirm arrowPosition="right" title={text}>
          <Direction>Right</Direction>
        </Popconfirm>
        <Popconfirm arrowPosition="rightBottom" title={text}>
          <Direction>RB</Direction>
        </Popconfirm>
      </div>
      <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
        <Popconfirm arrowPosition="bottomLeft" title={text}>
          <Direction>BL</Direction>
        </Popconfirm>
        <Popconfirm arrowPosition="bottom" title={text}>
          <Direction>Bottom</Direction>
        </Popconfirm>
        <Popconfirm arrowPosition="bottomRight" title={text}>
          <Direction>BR</Direction>
        </Popconfirm>
      </div>
      <br />
      <Popconfirm arrowPosition="bottom" title={text} action={'focus'}>
        <Direction>聚焦</Direction>
      </Popconfirm>
      <Popconfirm arrowPosition="bottom" title={text} action={'hover'}>
        <Direction> 悬停</Direction>
      </Popconfirm>
      <Popconfirm
        arrowPosition="bottom"
        title={text}
        action={'click'}
        cancelText="No"
        okText="yes"
        okType="danger"
      >
        <Direction>点击</Direction>
      </Popconfirm>
      <Popconfirm
        arrowPosition="bottom"
        title={text}
        action={'click'}
        cancelText="No"
        okText="yes"
        okType="danger"
        icon={
          <IconWrapper>
            <HintIcon style={{ color: 'white' }} iconClass={'lugia-icon-reminder_exclamation'} />
          </IconWrapper>
        }
      >
        <Direction>自定义图标</Direction>
      </Popconfirm>
      <br />
    </Wrapper>
  );
};
export default () => {
  return [<WrapperDemo />, <Condition />];
};
