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
import styled from 'styled-components';
import colorsFunc from '../css/stateColor';
import { px2emcss } from '../css/units';
import { FontSizeNumber } from '../css';

const { warningColor, dangerColor } = colorsFunc();
const em = px2emcss(FontSizeNumber);
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
  constructor(props: Object) {
    super(props);
    this.state = {
      defaultProps: {
        count: 10,
        max: 10,
        value: 3,
        disabled: false,
        allowHalf: false,
        classify: false,
        onClick: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps', 'value', newValue);
        },
        onChange: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps', 'value', newValue);
        },
      },
      defaultProps1: {
        count: 5,
        max: 10,
        value: 7,
        disabled: false,
        allowHalf: true,
        classify: false,
        onClick: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps1', 'value', newValue);
        },
        onChange: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps1', 'value', newValue);
        },
      },
      defaultProps2: {
        count: 5,
        max: 5,
        value: 3.5,
        disabled: false,
        allowHalf: true,
        classify: true,
        onClick: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps2', 'value', newValue);
        },
        onChange: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps2', 'value', newValue);
        },
      },
      defaultProps3: {
        count: 5,
        max: 5,
        value: 3.6,
        disabled: true,
        allowHalf: true,
        className: 'cccc',
        onClick: (newValue: number, oldValue: number) => {},
        onChange: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps3', 'value', newValue);
        },
      },
      defaultProps4: {
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
        onClick: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps4', 'value', newValue);
        },
        onChange: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps4', 'value', newValue);
        },
      },
      defaultProps5: {
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
        onClick: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps5', 'value', newValue);
        },
        onChange: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps5', 'value', newValue);
        },
      },
      defaultProps6: {
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
        onClick: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps6', 'value', newValue);
        },
        onChange: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps6', 'value', newValue);
        },
      },
      defaultProps7: {
        count: 5,
        allowHalf: true,
        onClick: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps7', 'value', newValue);
        },
        onChange: (newValue: number, oldValue: number) => {
          this.setStateValue('defaultProps7', 'value', newValue);
        },
      },
      defaultProps8: 8,
    };
  }
  render() {
    const config = {
      [Widget.Rate]: {
        normal: {
          margin: {
            right: 10,
            left: 10,
            top: 20,
            bottom: 20,
          },
          width: 400,
          height: 30,
          fontSize: 20,
        },
        children: {
          activeIcon: {
            normal: {
              color: `${warningColor}`,
              margin: {
                right: 36,
              },
            },
          },
          defaultRateIcon: {
            normal: {
              color: '#e8e8e8',
              margin: {
                right: 36,
              },
            },
          },
          activeTextIcon: {
            normal: {
              color: `${warningColor}`,
              margin: {
                right: 36,
              },
            },
          },
          defaultTextIcon: {
            normal: {
              color: '#e8e8e8',
              margin: {
                right: 36,
              },
            },
          },
        },
      },
    };
    const configColorful = {
      [Widget.Rate]: {
        normal: {
          fontSize: 30,
          margin: {
            right: 30,
            left: 30,
            top: 30,
            bottom: 30,
          },
        },
        children: {
          activeIcon: {
            normal: {
              color: `${warningColor}`,
            },
          },
          defaultRateIcon: {
            normal: {
              color: '#e8e8e8',
            },
          },
          dangerIcon: {
            normal: {
              color: `${dangerColor}`,
            },
          },
          amazedIcon: {
            normal: {
              color: '#f88e30',
            },
          },
        },
      },
    };

    return (
      <div>
        <div>
          <TitleBox>基础用法 default：</TitleBox>
          <Rate {...this.state.defaultProps7} />
        </div>
        <Theme config={config}>
          <TitleBox>基础用法 default limit：</TitleBox>
          <Rate {...this.state.defaultProps} />
          <TextBox>{this.state.defaultProps.value} 颗星</TextBox>
        </Theme>
        <Theme config={config}>
          <TitleBox>半星用法(总分10分) allowHalf：</TitleBox>
          <Rate {...this.state.defaultProps1} />
          <TextBox>{this.state.defaultProps1.value} 分</TextBox>
        </Theme>
        <Theme config={config}>
          <TitleBox>辅助文字：</TitleBox>
          <Rate {...this.state.defaultProps2} character="啊" />
          <TextBox>{this.state.defaultProps2.value} 颗星</TextBox>
        </Theme>
        <Theme config={config}>
          <TitleBox>只读：</TitleBox>
          <Rate {...this.state.defaultProps3} character="好" />
          <TextBox>{this.state.defaultProps3.value} 颗星</TextBox>
        </Theme>
        <Theme config={configColorful}>
          <TitleBox>自定义图标：</TitleBox>
          <Rate {...this.state.defaultProps4} />
          <TextBox>{this.state.defaultProps4.value} 颗星</TextBox>
        </Theme>
        <Theme config={configColorful}>
          <TitleBox>自定义图标：</TitleBox>
          <Rate {...this.state.defaultProps5} />
          <TextBox>{this.state.defaultProps5.value} 颗星</TextBox>
        </Theme>
        <Theme config={configColorful}>
          <TitleBox>自定义图标：</TitleBox>
          <Rate {...this.state.defaultProps6} />
          <TextBox>{this.state.defaultProps6.value} 颗星</TextBox>
        </Theme>
        <div>
          <TitleBox>默认设置 noProps：</TitleBox>
          <Rate />
        </div>
      </div>
    );
  }
  setStateValue = (target: string, props: string, val: number) => {
    const data = Object.assign(this.state[target], { value: val });
    this.setState({
      [target]: data,
    });
  };
}
export default RateDemo;
