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

const { warningColor, dangerColor } = colorsFunc();
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
        onClick: res => {
          const { newValue } = res;
          this.setStateValue('defaultProps', 'value', newValue);
        },
        onChange: res => {},
      },
      defaultProps1: {
        count: 5,
        max: 10,
        value: 7,
        disabled: false,
        allowHalf: true,
        classify: false,
        onClick: res => {
          const { newValue } = res;
          this.setStateValue('defaultProps1', 'value', newValue);
        },
        onChange: res => {},
      },
      defaultProps2: {
        count: 5,
        max: 5,
        value: 3.5,
        disabled: false,
        allowHalf: true,
        classify: true,
        onClick: res => {
          const { newValue } = res;
          this.setStateValue('defaultProps2', 'value', newValue);
        },
        onChange: res => {},
      },
      defaultProps3: {
        count: 5,
        max: 5,
        value: 3.6,
        disabled: true,
        allowHalf: true,
        className: 'cccc',
        onClick: res => {
          const { newValue } = res;
          this.setStateValue('defaultProps3', 'value', newValue);
        },
        onChange: res => {},
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
        onClick: res => {
          const { newValue } = res;
          this.setStateValue('defaultProps4', 'value', newValue);
        },
        onChange: res => {},
      },
      defaultProps5: {
        count: 5,
        max: 5,
        value: 3,
        disabled: true,
        allowHalf: false,
        classify: true,
        iconClass: {
          default: 'lugia-icon-financial_meh',
          danger: 'lugia-icon-financial_sad',
          amazed: 'lugia-icon-financial_smile',
        },
        onClick: res => {
          const { newValue } = res;
          this.setStateValue('defaultProps5', 'value', newValue);
        },
        onChange: res => {},
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
        onClick: res => {
          const { newValue } = res;
          this.setStateValue('defaultProps6', 'value', newValue);
        },
        onChange: res => {},
      },
      defaultProps7: {
        onClick: res => {
          const { newValue } = res;
          this.setStateValue('defaultProps7', 'value', newValue);
        },
        onChange: res => {
          const { newValue } = res;
          this.setStateValue('defaultProps7', 'value', newValue);
        },
      },
      defaultProps8: 8,
    };
  }
  render() {
    const config = {
      [Widget.Rate]: {
        ActiveIcon: {
          normal: {
            color: `${warningColor}`,
          },
          disabled: {
            color: '#ccc',
          },
        },
        DefaultRateIcon: {
          normal: {
            color: '#e8e8e8',
            margin: {
              right: 36,
            },
          },
          disabled: {
            color: '#f2f2f2',
          },
        },
        ActiveTextIcon: {
          normal: {
            color: `${warningColor}`,
            margin: {
              right: 80,
            },
          },
          disabled: {
            color: '#ccc',
          },
        },
        DefaultTextIcon: {
          normal: {
            color: '#e8e8e8',
            margin: {
              right: 10,
            },
          },
          disabled: {
            color: '#f2f2f2',
          },
        },
      },
    };

    const configColorful = {
      [Widget.Rate]: {
        ActiveIcon: {
          normal: {
            color: `${warningColor}`,
          },
        },
        DefaultRateIcon: {
          normal: {
            color: '#e8e8e8',
          },
        },
        DangerIcon: {
          normal: {
            color: `${dangerColor}`,
          },
        },
        AmazedIcon: {
          normal: {
            color: '#f88e30',
          },
        },
      },
    };

    const configGlobal = {
      [Widget.Rate]: {
        ActiveIcon: {
          normal: {
            color: `${warningColor}`,
          },
        },
        DefaultRateIcon: {
          normal: {
            color: '#e8e8e8',
          },
        },
      },
    };
    return (
      <div>
        <Rate {...this.state.defaultProps2} disabled={true} character="啊" />
        <TextBox>{this.state.defaultProps2.value} 颗星</TextBox>
        <div>
          <Theme config={configGlobal}>
            <TitleBox>基础用法 default：</TitleBox>
            <Rate {...this.state.defaultProps7} />
            <TextBox>{this.state.defaultProps7.value} 颗星</TextBox>
          </Theme>
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
          <TitleBox>自定义图标 disabled：</TitleBox>
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
