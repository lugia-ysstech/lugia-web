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

class InnerCloseDemo extends React.Component {
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
        arrowPosition="top"
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
class HoverAndClcikDemo extends React.Component {
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
        arrowPosition="topLeft"
        visible={this.state.hovered}
        onVisibleChange={this.handleHoverChange}
      >
        <div>
          <Popover
            description={clickContent}
            title="This is  click title"
            action={'click'}
            arrowPosition="topLeft"
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
      <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
        <Popover arrowPosition="topLeft" title={text} action={'click'}>
          <Direction>TL</Direction>
        </Popover>
        <Popover
          arrowPosition="top"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>Top</Direction>
        </Popover>
        <Popover
          arrowPosition="topRight"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>TR</Direction>
        </Popover>
      </div>
      <div style={{ width: 70, float: 'left' }}>
        <Popover
          arrowPosition="leftTop"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>LT</Direction>
        </Popover>
        <Popover
          arrowPosition="left"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>Left</Direction>
        </Popover>
        <Popover
          arrowPosition="leftBottom"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>LB</Direction>
        </Popover>
      </div>
      <div style={{ width: 70, marginLeft: 200 }}>
        <Popover
          arrowPosition="rightTop"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>RT</Direction>
        </Popover>
        <Popover
          arrowPosition="right"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>Right</Direction>
        </Popover>
        <Popover
          arrowPosition="rightBottom"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>RB</Direction>
        </Popover>
      </div>
      <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
        <Popover
          arrowPosition="bottomLeft"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>BL</Direction>
        </Popover>
        <Popover
          arrowPosition="bottom"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>Bottom</Direction>
        </Popover>
        <Popover
          arrowPosition="bottomRight"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>BR</Direction>
        </Popover>
      </div>
      <br />
      <Popover
        arrowPosition="bottom"
        title={text}
        action={'focus'}
        description={[<div>{description}</div>, <div>{description}</div>]}
      >
        <Direction>聚焦</Direction>
      </Popover>
      <Popover
        arrowPosition="bottom"
        title={text}
        action={'hover'}
        description={[<div>{description}</div>, <div>{description}</div>]}
      >
        <Direction> 悬停</Direction>
      </Popover>
      <Popover
        arrowPosition="bottom"
        title={text}
        action={'click'}
        arrowPosition="top"
        description={[<div>{description}</div>, <div>{description}</div>]}
      >
        <Direction>点击</Direction>
      </Popover>
      <br />
    </Wrapper>
  );
};
export default () => {
  return [<WrapperDemo />, <HoverAndClcikDemo />, <InnerCloseDemo />];
};
