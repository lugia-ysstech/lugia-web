/**
 *@flow
 * create by zenjava
 *
 */

import React from 'react';
import Trigger from './';
import OpenTrigger from './OpenTrigger';

function preventDefault(e) {
  e.preventDefault();
}

function getPopupContainer(trigger) {
  return trigger.parentNode;
}

type PropsType = {};
type StateType = {
  mask: boolean,
  placement: string,
  trigger: Object,
  offsetX: number,

  offsetY: number,
  destroyPopupOnHide: boolean,
};

class Test extends React.Component<PropsType, StateType> {
  state = {
    destroyPopupOnHide: false,
    mask: false,
    placement: 'right',
    focus: () => {},
    click: () => {},
    trigger: {
      hover: 1,
      focus: 0,
      click: 0,
    },
    offsetX: 0,
    offsetY: 0,
  };

  onPlacementChange = (e: SyntheticInputEvent<any>) => {
    this.setState({
      placement: e.target.value,
    });
  };

  onTriggerChange = (e: SyntheticInputEvent<any>) => {
    const trigger = Object.assign({}, this.state.trigger);
    if (e.target.checked) {
      trigger[e.target.value] = 1;
    } else {
      delete trigger[e.target.value];
    }
    this.setState({
      trigger,
    });
  };

  onOffsetXChange = (e: SyntheticInputEvent<any>) => {
    const targetValue = e.target.value;
    this.setState({
      offsetX: Number(targetValue) || undefined,
    });
  };

  onOffsetYChange = (e: SyntheticInputEvent<any>) => {
    const targetValue = e.target.value;
    this.setState({
      offsetY: Number(targetValue) || undefined,
    });
  };

  onMask = (e: SyntheticInputEvent<any>) => {
    this.setState({
      mask: e.target.checked,
    });
  };

  destroyPopupOnHide = (e: SyntheticInputEvent<any>) => {
    this.setState({
      destroyPopupOnHide: e.target.checked,
    });
  };

  render() {
    const state = this.state;
    const trigger = state.trigger;
    return (
      <div>
        <div style={{ margin: '10px 20px' }}>
          <label>
            对齐方式:
            <select value={state.placement} onChange={this.onPlacementChange}>
              <option>right</option>
              <option>left</option>
              <option>top</option>
              <option>bottom</option>
              <option>topLeft</option>
              <option>topRight</option>
              <option>bottomRight</option>
              <option>bottomLeft</option>
            </select>
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp; 触发方式:
          <label>
            <input
              value="hover"
              checked={!!trigger.hover}
              type="checkbox"
              onChange={this.onTriggerChange}
            />
            hover
          </label>
          <label>
            <input
              value="focus"
              checked={!!trigger.focus}
              type="checkbox"
              onChange={this.onTriggerChange}
            />
            focus
          </label>
          <label>
            <input
              value="click"
              checked={!!trigger.click}
              type="checkbox"
              onChange={this.onTriggerChange}
            />
            click
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input
              checked={!!this.state.destroyPopupOnHide}
              type="checkbox"
              onChange={this.destroyPopupOnHide}
            />
            destroyPopupOnHide
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input checked={!!this.state.mask} type="checkbox" onChange={this.onMask} />
            是否开启蒙版
          </label>
          <br />
          <label>
            offsetX:
            <input type="text" onChange={this.onOffsetXChange} style={{ width: 50 }} />
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            offsetY:
            <input type="text" onChange={this.onOffsetYChange} style={{ width: 50 }} />
          </label>
        </div>
        <div style={{ margin: 100, position: 'relative' }}>
          <Trigger
            offsetX={this.state.offsetX}
            offsetY={this.state.offsetY}
            getPopupContainer={undefined && getPopupContainer}
            align={state.placement.toString()}
            destroyPopupOnHide={this.state.destroyPopupOnHide}
            mask={this.state.mask}
            action={Object.keys(state.trigger)}
            popup={
              <div style={{ border: '1px solid red', padding: 10, background: 'white' }}>
                弹出来了
              </div>
            }
            onDocumentClick={() => {
              console.log('onDocumentClick事件触发！！！！！');
            }}
          >
            <a href="#" style={{ margin: 20 }} onClick={preventDefault}>
              trigger
            </a>
          </Trigger>
        </div>
        <div style={{ position: 'relative', background: 'red' }}>
          <OpenTrigger
            alwaysOpen
            popup={
              <div style={{ border: '1px solid red', padding: 10, background: 'white' }}>
                弹出来了
              </div>
            }
          >
            <a href="#" style={{ margin: 20 }} onClick={preventDefault}>
              trigger alwaysOpen
            </a>
          </OpenTrigger>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />

        <div
          id="innerContainerId"
          style={{
            width: 250,
            height: 100,
            position: 'relative',
            border: '1px solid blue',
          }}
        >
          <Trigger
            createPortal
            action={'click'}
            align={'bottom'}
            popup={
              <div style={{ border: '1px solid red', padding: 10, background: 'white' }}>
                根据父容器id 弹出弹窗 根据父容器id 弹出弹窗 根据父容器id 弹出弹窗 根据父容器id
                弹出弹窗
              </div>
            }
            popupContainerId={'innerContainerId'}
          >
            <div
              style={{
                width: 50,
                height: 20,
                border: '1px solid red',
              }}
            >
              点击弹窗
            </div>
          </Trigger>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <p>popupContainerId 跨多个盒子 的id </p>
        <div
          id="outerContainerId"
          style={{ width: 400, height: 100, position: 'relative', border: '1px solid green' }}
        >
          <div
            id="innerContainerId"
            style={{
              width: 350,
              height: 100,
              position: 'relative',
              border: '1px solid blue',
            }}
          >
            <div
              id="innerContainerId"
              style={{
                width: 250,
                height: 100,
                position: 'relative',
                border: '1px solid blue',
              }}
            >
              <Trigger
                createPortal
                action={'click'}
                align={'bottom'}
                popup={
                  <div style={{ border: '1px solid red', padding: 10, background: 'white' }}>
                    根据父容器id 弹出弹窗 根据父容器id 弹出弹窗 根据父容器id 弹出弹窗 根据父容器id
                    弹出弹窗
                  </div>
                }
                popupContainerId={'outerContainerId'}
              >
                <div
                  style={{
                    width: 50,
                    height: 20,
                    border: '1px solid red',
                  }}
                >
                  点击弹窗
                </div>
              </Trigger>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <p>popupContainerId 赋值 和trigger无关的盒子 的id </p>
        <Trigger
          createPortal
          action={'click'}
          align={'bottom'}
          popup={
            <div style={{ border: '1px solid red', padding: 10, background: 'white' }}>
              根据父容器id 弹出弹窗 根据父容器id 弹出弹窗 根据父容器id 弹出弹窗 根据父容器id
              弹出弹窗
            </div>
          }
          popupContainerId={'otherContainer'}
        >
          <div
            style={{
              width: 50,
              height: 20,
              border: '1px solid red',
            }}
          >
            点击弹窗
          </div>
        </Trigger>
        <div
          id="otherContainer"
          style={{ width: 400, height: 100, position: 'relative', border: '1px solid green' }}
        />
      </div>
    );
  }
}

export default Test;
