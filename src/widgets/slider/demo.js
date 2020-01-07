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
      <div style={{ padding: '0 60px' }}>
        <div>
          <h2> normal</h2>
          <Theme
            config={
              {
                [Widgets.Slider]: {
                  SliderContainer: {
                    normal: {
                      background: { color: 'transparent' },
                      opacity: 1,
                      border: {
                        top: { color: '', style: '', width: 0 },
                        right: { color: '', style: '', width: 0 },
                        bottom: { color: '', style: '', width: 0 },
                        left: { color: '', style: '', width: 0 },
                      },
                      borderRadius: {
                        topLeft: 0,
                        topRight: 0,
                        bottomLeft: 0,
                        bottomRight: 0,
                      },
                      margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                      },
                      padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                      },
                    },
                  },
                  Container: {
                    normal: {
                      // / width: 300,
                      height: 6,
                      background: {
                        color: '#e8e8e8',
                      },
                      borderRadius: {
                        topLeft: 6,
                        topRight: 6,
                        bottomLeft: 6,
                        bottomRight: 6,
                      },
                      border: {
                        top: { color: '', style: '', width: 0 },
                        right: { color: '', style: '', width: 0 },
                        bottom: { color: '', style: '', width: 0 },
                        left: { color: '', style: '', width: 0 },
                      },
                    },
                  },
                  SliderPassedWay: {
                    normal: {
                      background: { color: '#4d63ff' },
                      height: 6,
                      border: {
                        top: { color: '', style: '', width: 0 },
                        right: { color: '', style: '', width: 0 },
                        bottom: { color: '', style: '', width: 0 },
                        left: { color: '', style: '', width: 0 },
                      },
                    },
                  },
                  SliderButton: {
                    normal: {
                      background: { color: '#4d63ff' },
                      width: 16,
                      height: 16,
                      border: {
                        top: { color: '', style: '', width: 0 },
                        right: { color: '', style: '', width: 0 },
                        bottom: { color: '', style: '', width: 0 },
                        left: { color: '', style: '', width: 0 },
                      },
                      borderRadius: {
                        topLeft: 16,
                        topRight: 16,
                        bottomLeft: 16,
                        bottomRight: 16,
                      },
                    },
                  },
                  SliderTips: {
                    normal: {
                      width: 30,
                      height: 30,
                      border: {
                        top: { color: '', style: '', width: 0 },
                        right: { color: '', style: '', width: 0 },
                        bottom: { color: '', style: '', width: 0 },
                        left: { color: '', style: '', width: 0 },
                      },
                      borderRadius: {
                        topLeft: 3,
                        topRight: 3,
                        bottomLeft: 3,
                        bottomRight: 3,
                      },
                      background: { color: '#333' },
                      color: '#fff',
                      fontSize: 14,
                      font: { weight: 'normal' },
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
              // marks={{ 10: '10℃', 20: '20℃', 40: '40℃rtrtr54546' }}
              // icons={[
              //   { name: 'lugia-icon-financial_smile_o' },
              //   { name: 'lugia-icon-financial_sad_o' },
              // ]}
            />
          </Theme>
        </div>
        <div>
          <Slider />
        </div>
        <div>
          <h2 style={{ padding: '20px' }}> normal</h2>
          <Slider tips value={15} onChange={this.onchange} />
          <Slider tips value={[5, 15]} onChange={this.onchange} />
        </div>
        <div>
          <h2 style={{ padding: '20px 0' }}> 自定义css</h2>
          <Theme
            config={{
              [Widgets.SliderButton]: { color: '#f8ac30', width: 30, height: 20 },
              [Widgets.Slider]: { color: '#f8ac30', margin: 50, width: 300 },
            }}
          >
            <Slider minValue={undefined} defaultValue={undefined} tips />
          </Theme>
        </div>
        <div>
          <h2 style={{ padding: '20px 0' }}> 单滑块 defaultValue=-1</h2>
          <Slider maxValue={40} tips minValue={10} defaultValue={-1} />
        </div>
        <div>
          <h2 style={{ padding: '20px 0' }}> 单滑块</h2>
          <Slider maxValue={40} tips minValue={10} defaultValue={50} />
        </div>
        <div>
          <h2 style={{ padding: '20px 0' }}> 双滑块 minValue -1</h2>
          <Slider
            maxValue={30}
            defaultValue={[-1, 20, 25]}
            tips
            onChange={this.onchange}
            minValue={0}
          />
        </div>
        <div style={{ float: 'left', padding: '0 20px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> disabled</h2>
          <Slider maxValue={30} defaultValue={20} tips onChange={this.onchange} disabled />
        </div>
        <div style={{ float: 'left', padding: '0 20px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> value</h2>
          <Slider maxValue={30} defaultValue={10} value={23} tips onChange={this.onchange} />
        </div>

        <div style={{ float: 'left', padding: '0 20px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> 离散 marks 对象+对象</h2>
          <Slider
            maxValue={25}
            defaultValue={10}
            minValue={0}
            tips
            onChange={this.onchange}
            marks={{
              10: { text: '10℃', style: { color: 'blue' } },
              20: { text: '20℃', style: { color: 'pink' } },
              40: { text: '40℃', style: { color: 'red' } },
            }}
          />
        </div>
        <div style={{ float: 'left', padding: '0 20px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> 离散 marks 对象+对象</h2>
          <Slider
            maxValue={25}
            defaultValue={[10, 20]}
            minValue={0}
            tips
            onChange={this.onchange}
            marks={{
              10: { text: '10℃', style: { color: 'blue' } },
              20: { text: '20℃', style: { color: 'pink' } },
              40: { text: '40℃', style: { color: 'red' } },
            }}
          />
        </div>
        <div style={{ float: 'left', padding: '0 20px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> 离散no min max</h2>
          <Slider
            defaultValue={5}
            tips
            onChange={this.onchange}
            marks={{ 10: '10℃', 20: '20℃', 40: { text: '40℃', style: { color: 'red' } } }}
          />
        </div>
        <div style={{ float: 'left', padding: '0 40px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> icon</h2>
          <Slider
            minValue={0}
            tips
            icons={[
              { name: 'lugia-icon-financial_smile_o', style: { fontSize: 20 } },
              { name: 'lugia-icon-financial_sad_o' },
            ]}
          />
        </div>
        <div style={{ float: 'left', padding: '0 20px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> 单滑块 disabled false-> true</h2>
          <Slider
            maxValue={30}
            tips
            minValue={0}
            defaultValue={0}
            onChange={this.onchange}
            disabled={this.state.disabled}
          />
          <p>
            <button onClick={this.handleclick}>click me, you can change disabled</button>
          </p>
        </div>
        <div style={{ clear: 'both' }} />
        <div style={{ float: 'left', padding: '0 50px 50px' }}>
          <h2 style={{ padding: '35px 0' }}> normal</h2>
          <Slider vertical tips onChange={this.onchange} />
        </div>
        <div style={{ float: 'left', padding: '0 50px 50px' }}>
          <h2 style={{ padding: '35px 0' }}> 单滑块value</h2>
          <Slider defaultValue={0} vertical value={10} onChange={this.onchange} />
        </div>
        <div style={{ float: 'left', padding: '0 50px 50px' }}>
          <h2 style={{ padding: '35px 0' }}> 单滑块</h2>
          <Slider defaultValue={10} vertical />
        </div>
        <div style={{ float: 'left', padding: '0 50px 50px' }}>
          <h2 style={{ padding: '35px 0' }}> 双滑块</h2>
          <Slider defaultValue={[10, 20]} tips vertical />
        </div>
        <div style={{ float: 'left', padding: '0 50px 50px' }}>
          <h2 style={{ padding: '35px 0' }}> 双滑块value</h2>
          <Slider defaultValue={[10, 20]} value={[10, 20]} tips vertical onChange={this.onchange} />
        </div>
        <div style={{ float: 'left', padding: '0 50px 50px' }}>
          <h2 style={{ padding: '35px 0' }}> 离散</h2>
          <Slider
            vertical
            maxValue={50}
            defaultValue={10}
            minValue={0}
            tips
            onChange={this.onchange}
            marks={{ 10: '10℃', 20: '20℃', 40: { text: '40℃', style: { color: 'red' } } }}
          />
        </div>
        <div style={{ float: 'left', padding: '0 50px 50px' }}>
          <h2 style={{ padding: '35px 0' }}> 离散</h2>
          <Slider
            vertical // maxValue={50}
            defaultValue={[10, 20]} // minValue={0}
            tips
            onChange={this.onchange}
            marks={{
              0: '0℃',
              10: '10℃',
              20: '20℃',
              40: { text: '40℃', style: { color: 'red' } },
              50: '50℃',
            }}
          />
        </div>
        <div style={{ float: 'left', padding: '0 50px 50px' }}>
          <h2 style={{ padding: '35px 0' }}> disabled</h2>
          <Slider defaultValue={10} value={5} tips disabled vertical />
        </div>
        <div style={{ float: 'left', padding: '0 50px 50px' }}>
          <h2 style={{ padding: '35px 0' }}> 离散</h2>
          <Slider
            vertical // maxValue={50}
            defaultValue={0} // minValue={0}
            tips
            onChange={this.onchange}
            marks={{ 0: '0℃', 5: '5', 10: '10℃' }}
          />
        </div>
        <div style={{ float: 'left', padding: '0 40px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> icon</h2>
          <Theme
            config={{
              [Widgets.Slider]: {
                IconsFirst: {
                  normal: { color: 'red', fontSize: 100 },
                  disabled: { color: 'blue', fontSize: 30 },
                },
                IconsLast: {
                  normal: { color: 'green', fontSize: 30 },
                  disabled: { color: 'blue', fontSize: 30 },
                },
              },
            }}
          >
            <Slider
              minValue={0}
              tips
              vertical
              icons={[
                { name: 'lugia-icon-financial_smile_o' },
                { name: 'lugia-icon-financial_sad_o' },
              ]}
            />
          </Theme>
        </div>
      </div>
    );
  }
}
