/**
 *
 * create by wangcuixia
 *
 * create date: 2018/07/018
 *
 */
import React, { Component } from 'react';
import Slider from './index';
import Icon from '../icon/index';

export default class Sl extends Component<any> {
  constructor() {
    super();
    this.state = {
      currentValue: 0,
      btnWidth: 20,
    };
  }
  onchange = v => {
    //console.log(v);
  };
  handleclick = () => {
    this.setState({ btnWidth: 30 });
  };
  render() {
    const { btnWidth } = this.state;
    return (
      <div style={{padding:'0 50px'}}>
          <div style={{float:'left',padding:'0 20px 50px'}}>
            <h2 style={{ padding: '20px 0' }}> normal</h2>
            <Slider/>
          </div>
        <div style={{float:'left',padding:'0 20px 50px'}}>
          <h2 style={{ padding: '20px 0' }}> 单滑块</h2>
          <Slider maxValue={30}  tips  minValue={0} defaultValue={10} />
        </div>
        <div style={{float:'left',padding:'0 20px 50px'}}>
          <h2 style={{ padding: '20px 0' }}> 双滑块 minValue -1</h2>
          <Slider
            maxValue={30}
            defaultValue={[10, 20, 25]}
            tips
            onChange={this.onchange}
            minValue={0}
          />
        </div>
        <div style={{float:'left',padding:'0 20px 50px'}}>
          <h2 style={{ padding: '20px 0' }}> disabled</h2>
          <Slider maxValue={30} defaultValue={20} tips onChange={this.onchange} disabled />
        </div>
        <div style={{float:'left',padding:'0 20px 50px'}}>
          <h2 style={{ padding: '20px 0' }}> value</h2>
          <Slider maxValue={30} defaultValue={10} value={23} tips  />
        </div>

      <div style={{float:'left',padding:'0 20px 50px'}}>
        <h2 style={{ padding: '20px 0' }}> 离散 marks 对象+对象</h2>
        <Slider
          maxValue={25}
          defaultValue={5}
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
    <div style={{float:'left',padding:'0 20px 50px'}}>
      <h2 style={{ padding: '20px 0' }}> 离散 marks 对象+string</h2>
      <Slider
        maxValue={50}
        defaultValue={[3,20]}
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
        <div style={{float:'left',padding:'0 40px 50px'}}>
          <h2 style={{ padding: '20px 0' }}> icon</h2>
          <Slider minValue={0} tips icons={[
            {
              name:'lugia-icon-financial_global',
              position:'left',
              style:{
                fontSize:'24px',
              }
            },
            {
              name:'lugia-icon-financial_switch_e_and_c',
              position:'right',
              style:{
                fontSize:'24px',
              }
            }
          ]}/>
        </div>
        <div style={{clear:'both'}}></div>
        <div style={{float:'left',padding:'0 50px 50px'}}>
          <h2 style={{ padding: '35px 0' }}>  normal</h2>
          <Slider vertical/>
        </div>
        <div style={{float:'left',padding:'0 50px 50px'}}>
          <h2 style={{ padding: '35px 0' }}> 单滑块</h2>
          <Slider defaultValue={10 }value={5} vertical/>
        </div>
        <div style={{float:'left',padding:'0 50px 50px'}}>
          <h2 style={{ padding: '35px 0' }}> 双滑块</h2>
          <Slider defaultValue={[10,20]} tips vertical/>
        </div>
        <div style={{float:'left',padding:'0 50px 50px'}}>
          <h2 style={{ padding: '35px 0' }}> 离散</h2>
          <Slider vertical
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
        <div style={{float:'left',padding:'0 50px 50px'}}>
          <h2 style={{ padding: '35px 0' }}> 离散</h2>
          <Slider vertical
                  maxValue={50}
                  defaultValue={[10,20]}
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
        <div style={{float:'left',padding:'0 50px 50px'}}>
          <h2 style={{ padding: '35px 0' }}> disabled</h2>
          <Slider defaultValue={10 }value={5} disabled vertical/>
        </div>
      </div>

    );
  }
}
