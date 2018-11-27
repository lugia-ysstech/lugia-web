/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import Theme from '../theme';
import Widget from '../consts/index';
import Drawer from './drawer';
import Button from '../button';
import Radio from '../radio';

const RadioGroup = Radio.Group;
const DemoBox = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
`;

export default class DrawerDemo extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      radioValue: 'right',
    };
  }
  onClick = (cur: number) => () => {
    this.setState({
      ['visible' + cur]: false,
    });
  };
  openDrawer = (cur: number) => () => {
    this.setState({
      ['visible' + cur]: true,
    });
  };
  handleChange = (obj: Object) => {
    this.setState({
      radioValue: obj.newValue,
    });
  };
  render() {
    const { radioValue, visible1, visible2, visible3, visible4, visible5, visible6 } = this.state;
    const view = {
      [Widget.Drawer]: {
        width: 500,
        height: 500,
      },
    };
    return (
      <div>
        <DemoBox>
          <Button type="primary" onClick={this.openDrawer(1)}>
            click me
          </Button>
        </DemoBox>
        <Drawer title="Basic Drawer" onClose={this.onClick(1)} visible={visible1}>
          <p>Basic Drawer</p>
          <p>Basic Drawer</p>
          <p>Basic Drawer</p>
        </Drawer>
        <DemoBox>
          <RadioGroup value={radioValue} onChange={this.handleChange}>
            <Radio value="right">right</Radio>
            <Radio value="left">left</Radio>
            <Radio value="top">top</Radio>
            <Radio value="bottom">bottom</Radio>
          </RadioGroup>
          <Button type="primary" onClick={this.openDrawer(2)}>
            click me
          </Button>
        </DemoBox>
        <Drawer
          title="Direction Drawer"
          placement={radioValue}
          onClose={this.onClick(2)}
          visible={visible2}
        >
          <p>Direction Drawer</p>
          <p>Direction Drawer</p>
          <p>Direction Drawer</p>
        </Drawer>

        <DemoBox>
          <Button type="primary" onClick={this.openDrawer(3)}>
            click me
          </Button>
        </DemoBox>
        <Drawer title="Drawer-Header" onClose={this.onClick(3)} visible={visible3}>
          <p>First contents...</p>
          <p>First contents...</p>
          <p>First contents...</p>
          <Button type="primary" onClick={this.openDrawer(4)}>
            Second Drawer
          </Button>
          <Drawer onClose={this.onClick(4)} visible={visible4}>
            <p>Second contents...</p>
            <p>Second contents...</p>
            <p>Second contents...</p>
          </Drawer>
        </Drawer>

        <DemoBox>
          <Button type="primary" onClick={this.openDrawer(5)}>
            click me
          </Button>
        </DemoBox>
        <Drawer
          title="Basic Drawer"
          closable
          maskClosable={false}
          onClose={this.onClick(5)}
          visible={visible5}
        >
          <p>closable Drawer</p>
          <p>closable Drawer</p>
          <p>closable Drawer</p>
        </Drawer>

        <DemoBox>
          <Button type="primary" onClick={this.openDrawer(6)}>
            click me
          </Button>
        </DemoBox>
        <Theme config={view}>
          <Drawer title="Theme Drawer" onClose={this.onClick(6)} visible={visible6}>
            <p>Theme Drawer</p>
            <p>Theme Drawer</p>
            <p>Theme Drawer</p>
          </Drawer>
        </Theme>
      </div>
    );
  }
}
