/**
 *
 * create by liangguodong on 2018/12/5
 *
 * @flow
 */
import * as React from 'react';
import Direction from '../button';
import styled from 'styled-components';
import Popover from './popover';
import Input from '../input/index';

class InnerCloseDemo extends React.Component<any, any> {
  state = {
    visible: false,
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    const description = 'this is description';
    return (
      <Popover
        placement="top"
        title="this is the title"
        action="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        clear={'lugia-icon-reminder_close'}
        description={[<div>{description}</div>]}
        onClearClick={this.hide}
      >
        <Direction type="primary">Click me</Direction>
      </Popover>
    );
  }
}
class HoverAndClcikDemo extends React.Component<any, any> {
  state = {
    clicked: false,
    hovered: false,
  };

  hide = () => {
    this.setState({
      clicked: false,
      hovered: false,
    });
  };

  handleHoverChange = visible => {
    const { onVisibleChange } = this.props;
    this.setState({
      hovered: visible,
      clicked: false,
    });
    onVisibleChange && onVisibleChange(visible);
  };

  handleClickChange = visible => {
    this.setState({
      clicked: visible,
      hovered: false,
    });
  };

  render() {
    const hoverContent = <div>This is hover content.</div>;
    const clickContent = <div>This is click content.</div>;
    return (
      <Popover
        style={{ width: 500 }}
        description={hoverContent}
        title="This is  hover title"
        action={'hover'}
        placement="topLeft"
        visible={this.state.hovered}
        onVisibleChange={this.handleHoverChange}
      >
        <div>
          <Popover
            description={clickContent}
            title="This is  click title"
            action={'click'}
            placement="topLeft"
            visible={this.state.clicked}
            clear={'lugia-icon-reminder_close'}
            onVisibleChange={this.handleClickChange}
            onClearClick={this.hide}
          >
            <Direction type="primary">Hover and click / 悬停并单击</Direction>
          </Popover>
        </div>
      </Popover>
    );
  }
}
const Wrapper = styled.div`
  margin: 100px;
`;

export const WrapperDemo = () => {
  const text = 'this is title ';
  const description = 'this is description';
  return (
    <Wrapper>
      <div style={{ marginLeft: 50, whiteSpace: 'nowrap' }}>
        <Popover placement="topLeft" title={text} action={'click'}>
          <Direction>TL</Direction>
        </Popover>
        <Popover
          placement="top"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>Top</Direction>
        </Popover>
        <Popover
          placement="topRight"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>TR</Direction>
        </Popover>
      </div>
      <div style={{ width: 45, float: 'left' }}>
        <Popover
          placement="leftTop"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>LT</Direction>
        </Popover>
        <Popover
          placement="left"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>Left</Direction>
        </Popover>
        <Popover
          placement="leftBottom"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>LB</Direction>
        </Popover>
      </div>
      <div style={{ width: 50, marginLeft: 200 }}>
        <Popover
          placement="rightTop"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>RT</Direction>
        </Popover>
        <Popover
          placement="right"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>Right</Direction>
        </Popover>
        <Popover
          placement="rightBottom"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>RB</Direction>
        </Popover>
      </div>
      <div style={{ marginLeft: 50, clear: 'both', whiteSpace: 'nowrap' }}>
        <Popover
          placement="bottomLeft"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>BL</Direction>
        </Popover>
        <Popover
          placement="bottom"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>Bottom</Direction>
        </Popover>
        <Popover
          placement="bottomRight"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>BR</Direction>
        </Popover>
      </div>
      <br />
      <p />
      <Popover
        title={text}
        action={'focus'}
        description={[<div>{description}</div>, <div>{description}</div>]}
      >
        <Input placeholder={'聚焦弹出'} />
      </Popover>
      <Popover
        title={text}
        action={'hover'}
        description={[<div>{description}</div>, <div>{description}</div>]}
      >
        <Direction> 悬停</Direction>
      </Popover>
      <Popover
        title={text}
        action={'click'}
        description={[<div>{description}</div>, <div>{description}</div>]}
      >
        <Direction>点击</Direction>
      </Popover>
      <br />
    </Wrapper>
  );
};
export default () => {
  return [
    <Popover />,
    <WrapperDemo />,
    <Wrapper>
      <HoverAndClcikDemo /> <InnerCloseDemo />
    </Wrapper>,
  ];
};
