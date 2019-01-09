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
      <div style={{ padding: '0 50px' }}>
        <div style={{ float: 'left', padding: '0 20px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> normal</h2>
          <Slider value={value} tips={tipsValue} onChange={this.onchangeFirst} />
        </div>

        <div style={{ float: 'left', padding: '0 20px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> normal</h2>
          <Slider tips onChange={this.onchange} />
        </div>
        <div style={{ float: 'left', padding: '0 20px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> 自定义css</h2>
          <Theme
            config={{
              [Widgets.SliderButton]: { color: '#f8ac30', width: 30, height: 20 },
              [Widgets.Slider]: { color: '#000000', margin: 50, width: 300 },
            }}
          >
            <Slider minValue={undefined} defaultValue={undefined} tips />
          </Theme>
        </div>
        <div style={{ float: 'left', padding: '0 20px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> 单滑块 defaultValue=-1</h2>
          <Slider maxValue={40} tips minValue={10} defaultValue={-1} />
        </div>
        <div style={{ float: 'left', padding: '0 20px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> 单滑块</h2>
          <Slider maxValue={40} tips minValue={10} defaultValue={50} />
        </div>
        <div style={{ float: 'left', padding: '0 20px 50px' }}>
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
              10: {
                text: '10℃',
                style: {
                  color: 'blue',
                },
              },
              20: {
                text: '20℃',
                style: {
                  color: 'pink',
                },
              },
              40: {
                text: '40℃',
                style: {
                  color: 'red',
                },
              },
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
              10: {
                text: '10℃',
                style: {
                  color: 'blue',
                },
              },
              20: {
                text: '20℃',
                style: {
                  color: 'pink',
                },
              },
              40: {
                text: '40℃',
                style: {
                  color: 'red',
                },
              },
            }}
          />
        </div>
        <div style={{ float: 'left', padding: '0 20px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> 离散no min max</h2>
          <Slider
            defaultValue={5}
            tips
            onChange={this.onchange}
            marks={{
              10: '10℃',
              20: '20℃',
              40: {
                text: '40℃',
                style: {
                  color: 'red',
                },
              },
            }}
          />
        </div>
        <div style={{ float: 'left', padding: '0 40px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> icon</h2>
          <Theme
            config={{
              [Widgets.SliderIcon]: { color: '#f8ac30', fontSize: 30, margin: 18 },
            }}
          >
            <Slider
              minValue={0}
              tips
              icons={[
                { name: 'lugia-icon-financial_smile_o' },
                { name: 'lugia-icon-financial_sad_o' },
              ]}
            />
          </Theme>
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
            marks={{
              10: '10℃',
              20: '20℃',
              40: {
                text: '40℃',
                style: {
                  color: 'red',
                },
              },
            }}
          />
        </div>
        <div style={{ float: 'left', padding: '0 50px 50px' }}>
          <h2 style={{ padding: '35px 0' }}> 离散</h2>
          <Slider
            vertical
            // maxValue={50}
            defaultValue={[10, 20]}
            // minValue={0}
            tips
            onChange={this.onchange}
            marks={{
              0: '0℃',
              10: '10℃',
              20: '20℃',
              40: {
                text: '40℃',
                style: {
                  color: 'red',
                },
              },
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
            vertical
            // maxValue={50}
            defaultValue={0}
            // minValue={0}
            tips
            onChange={this.onchange}
            marks={{
              0: '0℃',
              5: '5',
              10: '10℃',
            }}
          />
        </div>
        <div style={{ float: 'left', padding: '0 40px 50px' }}>
          <h2 style={{ padding: '20px 0' }}> icon</h2>
          <Slider
            minValue={0}
            tips
            vertical
            icons={[
              { name: 'lugia-icon-financial_smile_o' },
              { name: 'lugia-icon-financial_sad_o' },
            ]}
          />
        </div>
      </div>
    );
  }
}
