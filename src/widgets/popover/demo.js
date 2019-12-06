/**
 *
 * create by liangguodong on 2018/12/5
 *
 * @flow
 */
import * as React from 'react';
import Button from '../button';
import styled from 'styled-components';
import Popover from './popover';
import Input from '../input/index';
import Widget from '../consts';
import Theme from '../theme';

const buttonWidth = 80;
const Direction = styled(Button)`
  width: ${buttonWidth}px;
`;
const description = 'This is description';
const title = 'This is title';
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
    return (
      <Popover
        showClearButton
        placement="top"
        title={title}
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
class HoverAndClickDemo extends React.Component<any, any> {
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
    const config = {
      [Widget.Popover]: {
        PopoverContent: {
          Container: {
            normal: { width: 200, background: { color: 'blue' } },
          },
        },
      },
      [Widget.Button]: { width: buttonWidth },
    };
    return (
      <Theme config={config}>
        <Popover
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
      </Theme>
    );
  }
}
const Wrapper = styled.div`
  margin: 100px;
`;

export const WrapperDemo = () => {
  const text = 'This is title ';
  const description = 'This is description';
  const config = {
    [Widget.Popover]: {
      PopoverClearIcon: {
        normal: { color: 'purple' },
      },
      PopoverContent: {
        Container: { normal: { background: { color: 'pink' } } },
        TooltipTitle: { normal: { color: 'green' } },
        TooltipDescription: { normal: { color: 'yellow' } },
      },
    },
    [Widget.Button]: {
      Container: {
        normal: {
          width: buttonWidth,
        },
      },
    },
  };
  return (
    <Wrapper>
      <Theme config={config}>
        <div style={{ marginLeft: 80, whiteSpace: 'nowrap' }}>
          <Popover placement="topLeft" title={text} action={'click'} description={description}>
            <Direction type="primary">TL</Direction>
          </Popover>
          <Popover
            placement="top"
            title={text}
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Direction type="primary">Top</Direction>
          </Popover>
          <Popover
            placement="topRight"
            title={text}
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Direction type="primary">TR</Direction>
          </Popover>
        </div>
        <div style={{ width: 45, float: 'left' }}>
          <Popover
            placement="leftTop"
            title={text}
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Direction type="primary">LT</Direction>
          </Popover>
          <Popover
            placement="left"
            title={text}
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Direction type="primary">Left</Direction>
          </Popover>
          <Popover
            placement="leftBottom"
            title={text}
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Direction type="primary">LB</Direction>
          </Popover>
        </div>
        <div style={{ width: 50, marginLeft: 320 }}>
          <Popover
            placement="rightTop"
            title={text}
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Direction type="primary">RT</Direction>
          </Popover>
          <Popover
            placement="right"
            title={text}
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Direction type="primary">Right</Direction>
          </Popover>
          <Popover
            placement="rightBottom"
            title={text}
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Direction type="primary">RB</Direction>
          </Popover>
        </div>
        <div style={{ marginLeft: 80, clear: 'both', whiteSpace: 'nowrap' }}>
          <Popover
            placement="bottomLeft"
            title={text}
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Direction type="primary">BL</Direction>
          </Popover>
          <Popover
            placement="bottom"
            title={text}
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Direction type="primary">Bottom</Direction>
          </Popover>
          <Popover
            placement="bottomRight"
            title={text}
            description={[<div>{description}</div>, <div>{description}</div>]}
          >
            <Direction type="primary">BR</Direction>
          </Popover>
        </div>
      </Theme>
      <br />
      <p />
      <Popover
        title={text}
        action={'focus'}
        placement="bottom"
        description={[<div>{description}</div>, <div>{description}</div>]}
      >
        <Input placeholder={'聚焦弹出'} />
      </Popover>
      <Popover
        title={text}
        action={'hover'}
        placement="bottom"
        description={[<div>{description}</div>, <div>{description}</div>]}
      >
        <Direction type="primary"> 悬停</Direction>
      </Popover>
      <Popover
        title={text}
        action={'click'}
        placement="bottom"
        description={[<div>{description}</div>, <div>{description}</div>]}
      >
        <Direction type="primary">点击</Direction>
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
      <HoverAndClickDemo /> <InnerCloseDemo />
    </Wrapper>,
  ];
};
