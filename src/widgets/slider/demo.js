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
    console.log(v);
    this.setState({
      currentValue: v,
    });
  };
  handleclick = () => {
    this.setState({ btnWidth: 30 });
  };
  render() {
    const { btnWidth } = this.state;
    return (
      <div>
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
          <h2 style={{ paddingBottom: '50px' }}> 双滑块</h2>
          <Slider maxValue={30} defaultValue={[10, 20]} />
        </div>
      </div>
    );
  }
}
