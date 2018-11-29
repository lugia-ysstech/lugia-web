/*
 *create by LYQ
 *
 *2018-11-21
 *
 *@flow
 *
 */
import React from 'react';
import Rate from './index';
import Theme from '../theme';
import Widget from '../consts/index';
import colorsFunc from '../css/stateColor';
import Icon from '../icon';
import styled from 'styled-components';
const { warningColor } = colorsFunc();
const TitleBox = styled.div`
  position: relative;
  padding: 10px;
  font-size: 18px;
  border-top: 1px solid #ccc;
`;
const TextBox = styled.span`
  font-size: 14px;
  color: #333;
`;
class RateDemo extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const config = {
      [Widget.Rate]: { fontSize: '18px' },
    };
    const defaultProps = {
      count: 10,
      max: 10,
      value: 3,
      disabled: false,
      allowHalf: false,
      classify: false,
      className: 'cccc',
      onClick: (x: any) => {
        console.log('onClick defaultProps', x);
        this.setStateValue('defaultProps', x);
      },
      onChange: (x: any) => {
        console.log('onChange defaultProps', x);
        this.setStateValue('defaultProps', x);
      },
    };
    const defaultProps1 = {
      count: 5,
      max: 10,
      value: 7,
      disabled: false,
      allowHalf: true,
      classify: false,
      // iconClass:{
      //     default:'lugia-icon-financial_smile_o',
      //     primary:'lugia-icon-financial_smile',
      //     half:'lugia-icon-financial_sad',
      //     danger:'lugia-icon-financial_sad',
      //     amazed:'lugia-icon-financial_smile'
      // },
      iconClass: {
        // default:'lugia-icon-financial_star',
        // primary:'lugia-icon-financial_star',
        // half:'lugia-icon-financial_sad',
      },
      className: 'cccc',
      onClick: (x: any) => {
        console.log('onClick defaultProps1', x);
        this.setStateValue('defaultProps1', x);
      },
      onChange: (x: any) => {
        console.log('onChange defaultProps1', x);
        this.setStateValue('defaultProps1', x);
      },
    };
    const defaultProps2 = {
      count: 5,
      max: 5,
      value: 3.5,
      disabled: false,
      allowHalf: true,
      classify: false,
      className: 'cccc',
      onClick: (x: any) => {
        console.log('onClick defaultProps2', x);
        this.setStateValue('defaultProps2', x);
      },
      onChange: (x: any) => {
        console.log('onChange defaultProps2', x);
        this.setStateValue('defaultProps2', x);
      },
    };
    const defaultProps3 = {
      count: 5,
      max: 5,
      value: 3.5,
      disabled: true,
      allowHalf: false,
      className: 'cccc',
      onClick: (x: any) => {
        console.log('onClick defaultProps3', x);
      },
      onChange: (x: any) => {
        console.log('onChange defaultProps3', x);
        this.setStateValue('defaultProps3', x);
      },
    };
    const defaultProps4 = {
      count: 5,
      max: 5,
      value: 2,
      disabled: false,
      allowHalf: false,
      classify: true,
      iconClass: {
        default: 'lugia-icon-financial_meh',
        danger: 'lugia-icon-financial_sad',
        amazed: 'lugia-icon-financial_smile',
      },
      className: 'cccc',
      onClick: (x: any) => {
        console.log('onClick defaultProps4', x);
        this.setStateValue('defaultProps4', x);
      },
      onChange: (x: any) => {
        console.log('onChange defaultProps4', x);
        this.setStateValue('defaultProps4', x);
      },
    };
    const defaultProps5 = {
      count: 5,
      max: 5,
      value: 3,
      disabled: false,
      allowHalf: false,
      classify: true,
      iconClass: {
        default: 'lugia-icon-financial_meh',
        danger: 'lugia-icon-financial_sad',
        amazed: 'lugia-icon-financial_smile',
      },
      className: 'cccc',
      onClick: (x: any) => {
        console.log('onClick defaultProps5', x);
        this.setStateValue('defaultProps5', x);
      },
      onChange: (x: any) => {
        console.log('onChange defaultProps5', x);
        this.setStateValue('defaultProps5', x);
      },
    };
    const defaultProps6 = {
      count: 5,
      max: 5,
      value: 4,
      disabled: false,
      allowHalf: false,
      classify: true,
      iconClass: {
        default: 'lugia-icon-financial_meh',
        danger: 'lugia-icon-financial_sad',
        amazed: 'lugia-icon-financial_smile',
      },
      className: 'cccc',
      onClick: (x: any) => {
        console.log('onClick defaultProps6', x);
        this.setStateValue('defaultProps6', x);
      },
      onChange: (x: any) => {
        console.log('onChange defaultProps6', x);
        this.setStateValue('defaultProps6', x);
      },
    };
    const defaultProps7 = {
      count: 5,
      onClick: (x: any) => {
        console.log('onClick defaultProps7', x);
        this.setStateValue('defaultProps7', x);
      },
      onChange: (x: any) => {
        console.log('onChange defaultProps7', x);
        this.setStateValue('defaultProps7', x);
      },
    };
    return (
      <div>
        <Theme config={config}>
          <TitleBox>基础用法 default：</TitleBox>
          <Rate {...defaultProps7} />
          <TextBox>{this.state.defaultProps7} 颗星</TextBox>
        </Theme>
        <Theme config={config}>
          <TitleBox>基础用法 default：</TitleBox>
          <Rate {...defaultProps} />
          <TextBox>{this.state.defaultProps} 颗星</TextBox>
        </Theme>
        <Theme config={config}>
          <TitleBox>半星用法(总分10分) allowHalf：</TitleBox>
          <Rate {...defaultProps1} />
          <TextBox>{this.state.defaultProps1} 分</TextBox>
        </Theme>
        <Theme config={config}>
          <TitleBox>辅助文字：</TitleBox>
          <Rate {...defaultProps2} character="好" />
          <TextBox>{this.state.defaultProps2} 颗星</TextBox>
        </Theme>
        <Theme config={config}>
          <TitleBox>只读：</TitleBox>
          <Rate {...defaultProps3} character="好" />
          <TextBox>{this.state.defaultProps3} 颗星</TextBox>
        </Theme>
        <Theme config={config}>
          <TitleBox>自定义图标：</TitleBox>
          <Rate {...defaultProps4} />
          <TextBox>{this.state.defaultProps4} 颗星</TextBox>
        </Theme>
        <Theme config={config}>
          <TitleBox>自定义图标：</TitleBox>
          <Rate {...defaultProps5} />
          <TextBox>{this.state.defaultProps5} 颗星</TextBox>
        </Theme>
        <Theme config={config}>
          <TitleBox>自定义图标：</TitleBox>
          <Rate {...defaultProps6} />
          <TextBox>{this.state.defaultProps6} 颗星</TextBox>
        </Theme>
      </div>
    );
  }
  setStateValue = (target: sring, val: number) => {
    this.setState({
      [target]: val,
    });
  };
}
export default RateDemo;
