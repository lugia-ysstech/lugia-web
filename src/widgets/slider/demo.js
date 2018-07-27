/**
 *
 * create by wangcuixia
 *
 * create date: 2018/07/018
 *
 */
import React, { Component } from 'react';
import Slider from './index';

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
      <div>
        <div style={{float:'left'}}>
        {/*<div >*/}
        {/*<h2 style={{ paddingBottom: '50px' }}>normal</h2>*/}
        {/*<Slider />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*<h2 style={{ paddingBottom: '50px' }}> maxValue="30" defaultValue="8" </h2>*/}
        {/*<Slider maxValue={30} defaultValue={8} tips/>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*<h2 style={{ paddingBottom: '50px' }}>maxValue="30" defaultValue="8" value="2"</h2>*/}
        {/*<Slider maxValue={30} defaultValue={8} value={2} tips />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*<h2 style={{ paddingBottom: '50px' }}>maxValue="30" defaultValue="8" value="2"</h2>*/}
        {/*<Slider value={2} maxValue={30} disabled />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*<h2 style={{ paddingBottom: '50px' }}> 样式</h2>*/}
        {/*<Slider btnWidth={'24px'} btnHeight={24} rangeW={200} rangeH={10} background={'#f22735'}/>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*<h2 style={{ paddingBottom: '50px' }}> 样式</h2>*/}
        {/*<Slider value={2} maxValue={30} />*/}
        {/*</div>*/}
        {/*<div style={{ paddingTop: '20px' }}>*/}
        {/*<button onClick={this.handleclick}>click me</button>*/}
        {/*<p>I am current value {this.state.currentValue}</p>*/}
        {/*</div>*/}
        <div>
        <h2 style={{ paddingBottom: '50px' }}> normal</h2>
        <Slider/>
        </div>
        <div>
        <h2 style={{ paddingBottom: '50px' }}> 单滑块</h2>
        <Slider maxValue={30}  tips onChange={this.onchange} minValue={2} defaultValue={5} />
        </div>
        <div>
          <h2 style={{ paddingBottom: '50px' }}> 双滑块 minValue -1</h2>
          <Slider
            maxValue={30}
            defaultValue={[10, 20, 25]}
            tips
            onChange={this.onchange}
            minValue={-1}
          />
        </div>
        <div>
        <h2 style={{ paddingBottom: '50px' }}> disabled</h2>
        <Slider maxValue={30} defaultValue={20} tips onChange={this.onchange} disabled />
        </div>
        <div>
        <h2 style={{ paddingBottom: '50px' }}> value</h2>
        <Slider maxValue={30} defaultValue={[10, 20]} value={23} tips  />
        </div>
      </div>
      <div style={{float:'left',margin:'0 20px'}}>
      <div>
      <h2 style={{ paddingBottom: '50px' }}> 离散 marks 对象+对象</h2>
    <Slider
      maxValue={25}
      defaultValue={5}
      minValue={1}
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
    <div>
      <h2 style={{ paddingBottom: '50px' }}> 离散 marks 对象+string</h2>
      <Slider
        maxValue={50}
        defaultValue={[3,20]}
        minValue={3}
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
      </div>
    </div>
    );
  }
}
