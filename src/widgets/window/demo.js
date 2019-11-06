import React from 'react';
import styled from 'styled-components';
import Component from './';
import Modal from '../modal/index';
import Com from './mockDemo';
const BoxL = styled.div`
  width: 100%;
  height: 100%;
`;
const Head = styled.div`
  text-align: center;
  line-height: 30px;
  height: 30px;
`;
export default class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 100,
      direction: false,
      visible: false,
    };
    this.Com = React.createRef();
    this.Component = React.createRef();
  }
  divClick = () => {
    console.log('我是box 我被点击了');
  };
  onClose = () => {
    console.log('onCloseonClose', 'onClose');
    this.setState({ visible: !this.state.visible });
  };
  onDragStart = param => {
    const { x, y, lockDirection } = param;
    console.log('onDragStart', x, y, lockDirection, param);
    this.closeEvent(false);
  };
  onDrag = param => {
    console.log('onDrag', param);
  };
  onDragEnd = param => {
    console.log('onDragEnd', param);
    this.openEvent(true);
  };
  onChangeSizeStart = param => {
    console.log('onChangeSizeStart', param);
    this.closeEvent(false);
  };
  onChangeSize = param => {
    console.log('onChangeSize', param);
  };
  onChangeSizeEnd = param => {
    this.openEvent(true);
    console.log('onChangeSizeEnd', param);
    const { width } = param;
    const { direction } = this.state;
    this.setState({ width, direction: !direction });
  };
  onChangeLock = param => {
    console.log('onChangeLock', param);
  };
  closeEvent = () => {
    if (this.Com.current) {
      const { closeEvent } = this.Com.current;
      closeEvent();
    }
  };
  openEvent = () => {
    if (this.Com.current) {
      const { openEvent } = this.Com.current;
      openEvent();
    }
  };
  onOpen = param => {
    console.log('onOpen', param);
  };
  onUp = param => {
    console.log('onUp', param);
  };
  onFixed = param => {
    const { isFixed } = param;
    console.log(isFixed);
  };
  onClick = () => {
    this.setState({ visible: !this.state.visible });
  };
  getHeadEvent = event => {
    // head 的所有事件
    this.event = event;
    if (this.event) {
      //  this.event.onUpUp();
    }
    console.log(this.event);
  };
  componentDidMount() {
    if (this.event) {
      this.event.onUpUp();
    }
  }
  render() {
    const { visible } = this.state;
    return (
      <React.Fragment>
        <div onClick={this.divClick} />
        {/*<Com ref={this.Com} />*/}
        <Component
          canScale
          lockTop={80}
          lockBottom={100}
          lockingWay={'drag'}
          lockDirection={'right'}
          defaultIsLock={true}
          onChangeSizeStart={this.onChangeSizeStart}
          onChangeSize={this.onChangeSize}
          onChangeSizeEnd={this.onChangeSizeEnd}
          onDragStart={this.onDragStart}
          onDrag={this.onDrag}
          onDragEnd={this.onDragEnd}
          onUp={this.onUp}
          onOpen={this.onOpen}
          width={700}
          height={300}
          x={900}
          y={200}
          maxWidth={1000}
          minWidth={250}
          maxHeight={500}
          minimizeIcon={'lugia-icon-financial_shrink'}
          //lugia-icon-financial_shrink
          onClose={this.onClose}
          onFixed={this.onFixed}
          headReverse={true}
          canMinimize
          canDoubleClickScale
          getHeadEvent={this.getHeadEvent}
          ref={this.Component}
          visible={visible}
        >
          <div>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
            <p style={{ fontSize: 40, color: 'red' }}> 拖拽我，或者拉伸，红快快就不动了</p>
          </div>
        </Component>
        <Component canScale={true} />
        <Component x={200} y={100} onMove={this.onMove}>
          我是默认,带我去哪里都行偶
        </Component>
        <Component x={200} y={170} width={300} height={100}>
          我可以设置宽高的初始值，你不管我，我就任性
        </Component>
        <Component x={600} y={100}>
          我在这里，可以指定我的位置在哪里 x,y
        </Component>
        <Component z={100}>我层级比他们高耶,想多少，就多少</Component>
        <Component x={200} y={290} canMinimize={true}>
          点那个按钮,我可以缩小偶
        </Component>
        <Component x={200} y={380} canScale={true}>
          我可以变胖变瘦，八个方向可以改变我偶 试一下
        </Component>
        <Component
          canScale={true}
          lockingWay={'drag'}
          defaultIsLock={true}
          lockDirection={'left'}
          lockTop={100}
          lockBottom={100}
          maxWidth={500}
          onChangeSizeEnd={this.onChangeSizeEnd}
        >
          <BoxL>
            <p>锁定在左侧边的</p>
            <input style={{ width: `${this.state.width}px` }} />
            <div>
              <p>dfsdfdfd6546546654</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
              <p>dfsdfdfd</p>
            </div>
          </BoxL>
        </Component>
        <Component
          canScale={true}
          lockingWay={'drag'}
          defaultIsLock={true}
          lockDirection={'right'}
          lockTop={100}
          //lockBottom={100}
          //maxWidth={500}
          x={900}
          y={200}
        >
          <p>锁定在右边的</p>
        </Component>
        <Component
          x={600}
          y={300}
          lockingWay={'click'}
          lockingIcon={'lugia-icon-financial_italic'}
          minimizeIcon={'lugia-icon-direction_shrink'}
          canMinimize
        >
          点那个按钮，我就不飘了，回到文档流里
        </Component>
        <Component x={600} y={380} onClose={() => {}}>
          太多我了,可以关掉我偶
        </Component>
        <Component x={600} y={460} onClose={() => {}} headReverse={true}>
          我的关闭按钮换位置喽
        </Component>
        <Component x={600} y={520} onClose={() => {}}>
          还有其他的一切事件回调，可以看文档偶
        </Component>
        <span onClick={this.onClick}>弹出面板</span>
        <Component width={200} visible={visible} head={444} middle mask>
          自定义头部
        </Component>
        {/*<Modal drag visible>*/}
        {/*<div style={{ width: 500, height: 500 }}>我是modal</div>*/}
        {/*</Modal>*/}
      </React.Fragment>
    );
  }
}
