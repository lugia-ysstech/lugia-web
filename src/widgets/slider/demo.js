/**
 *
 * create by wangcuixia
 *
 * create date: 2018/07/018
 *
 */
import React, { Component } from 'react';
import Slider from './index';
import Widgets from '../consts/index';
import Theme from '../theme/index';
import { getBorderRadius, getBorder } from '@lugia/theme-utils';
export default class Sl extends Component<any> {
  constructor() {
    super();
    this.state = {
      currentValue: 0,
      btnWidth: 20,
      disabled: false,
      value: 0,
      tipsValue: '0%',
    };
  }

  onchangeFirst = obj => {
    const { newValue } = obj;
    this.setState({ value: newValue, tipsValue: `${newValue}%` });
  };
  handleclick = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };

  render() {
    const { value, tipsValue } = this.state;
    return (
      <div style={{ margin: '0 60px' }}>
        <div style={{ width: '100%' }}>
          <h2> normal</h2>
          <Theme
            config={
              {
                [Widgets.Slider]: {
                  // Icons: {
                  //   normal: { color: 'red', fontSize: 300 },
                  //   disabled: { color: 'blue', fontSize: 30 },
                  // },
                  Container: {
                    normal: {
                      background: { color: 'yellow' },
                      //width: '30%',
                      opacity: 0.5,
                      //border: getBorder({ style: 'solid', width: 1, color: '#000' }, { radius: 6 }),
                    },
                    hover: {
                      background: { color: 'green' },
                      border: getBorder({ color: 'red' }, { radius: 20 }),
                    },
                    active: {
                      background: { color: 'green' },
                      border: getBorder({ color: 'blue' }, { radius: 10 }),
                    },
                    disabled: {
                      background: { color: 'green' },
                      border: getBorder({ color: 'pink' }, { radius: 15 }),
                    },
                  },
                  SliderTrack: {
                    normal: {
                      background: { color: 'green' },
                      width: 600,
                      height: 30,
                      border: getBorder({ style: 'solid', width: 1, color: '#000' }, { radius: 6 }),
                    },
                    hover: { background: { color: '#4fe24f' } },
                    active: { background: { color: '#4fe24f' } },
                    disabled: { background: { color: '#cae6ca' } },
                  },
                  SliderPassedWay: {
                    normal: { background: { color: '#b53030' }, height: 10 },
                    hover: { background: { color: 'yellow' }, height: 20 },
                    active: { background: { color: 'blue' }, height: 50 },
                    disabled: { background: { color: 'pink' }, height: 40 },
                  },
                  SliderButton: {
                    normal: {
                      background: { color: '#ef5a5a' },
                      width: 20,
                      height: 10,
                      border: getBorder(
                        { style: 'solid', color: 'yellow', width: 1 },
                        { radius: 5 }
                      ),
                    },
                    hover: {
                      background: { color: 'red' },
                      width: 30,
                      height: 20,
                      border: getBorder(
                        { style: 'solid', color: 'blue', width: 2 },
                        { radius: 10 }
                      ),
                    },
                    active: { background: { color: 'yellow' }, width: 60, height: 60 },
                  },
                  SliderTips: {
                    normal: {
                      width: 30,
                      height: 30,
                      border: getBorder({ style: 'solid', color: 'blue', width: 1 }, { radius: 3 }),
                      background: { color: 'red' },
                      color: '#fff',
                      boxShadow: '0 0 2px 0 red',
                      fontSize: 14,
                      font: { weight: 'bold' },
                    },
                  },
                  SliderMarks: {
                    normal: {
                      first: { color: 'red', font: { weight: 700, size: 14 } },
                      nth1: { color: 'blue', font: { weight: 700, size: 14 } },
                      last: { color: 'green', font: { weight: 700, size: 14 } },
                    },
                    disabled: {
                      first: { color: '#ccc', font: { weight: 700, size: 14 } },
                      last: { color: '#ccc', font: { weight: 700, size: 14 } },
                      nth2: { color: 'red', font: { weight: 700, size: 14 } },
                    },
                  },
                },
              }
              // margin: { top: 10, right: 20, bottom: 30, left: 40 },
              // padding: { top: 10, right: 20, bottom: 30, left: 40 },
            }
          >
            <Slider
              defaultValue={20}
              //vertical
              tips
              onChange={
                this.onchangeFirst //disabled
              }
              marks={{ 10: '10℃', 20: '20℃', 40: '40℃rtrtr54546' }}
              icons={[
                { name: 'lugia-icon-financial_smile_o' },
                { name: 'lugia-icon-financial_sad_o' },
              ]}
            />
          </Theme>
        </div>
        <div style={{ width: 500 }}>
          <Slider
            defaultValue={20}
            // vertical
            tips
            onChange={
              this.onchangeFirst //disabled
            }
            // marks={{ 10: '10℃', 20: '20℃', 40: '40℃rtrtr54546' }}
            // icons={[
            //   { name: 'lugia-icon-financial_smile_o' },
            //   { name: 'lugia-icon-financial_sad_o' },
            // ]}
          />
        </div>
      </div>
    );
  }
}
