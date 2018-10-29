/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import Modal from './index';
import Button from '../button';

class ModalBox extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      visable: false,
    };
  }

  click = () => {
    this.setState({
      visable: true,
    });
    console.info('click');
  };

  buttonClick = () => {
    this.setState({
      visable: false,
    });
  };

  render() {
    const { visable } = this.state;
    console.info('visable', visable);
    return (
      <div>
        <Button onClick={this.click}>弹出</Button>
        <Modal
          visible={visable}
          title="另一个对话框！"
          onOk={this.buttonClick}
          onCancel={this.buttonClick}
        >
          <div style={{ width: '100px', height: '300px' }}>我也是一个对话框</div>
        </Modal>
      </div>
    );
  }
}

export default class ModalDemo extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      visable1: false,
      visable2: false,
      visable3: false,
    };
  }

  Click = (cur: number) => () => {
    this.setState({
      ['visable' + cur]: true,
    });
  };
  buttonClick = (cur: number) => () => {
    this.setState({
      ['visable' + cur]: false,
    });
  };
  loadingClick = (cur: number) => () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        ['visable' + cur]: false,
      });
    }, 2000);
  };
  showModal = (type: 'confirm' | 'info' | 'success' | 'warning' | 'error') => {
    Modal[type]({ title: type, content: `this ${type} text!` });
  };

  render() {
    const { visable1, visable2, visable3, confirmLoading } = this.state;
    return (
      <div>
        <Button onClick={this.Click(1)}>Modal</Button>
        <Modal
          visible={visable1}
          title="这是标题！"
          onOk={this.buttonClick(1)}
          onCancel={this.buttonClick(1)}
        >
          <ModalBox />
        </Modal>
        <br />
        <br />
        <Button onClick={this.Click(2)}>异步关闭</Button>
        <Modal
          visible={visable2}
          confirmLoading={confirmLoading}
          onOk={this.loadingClick(2)}
          onCancel={this.buttonClick(2)}
          title="这是标题！"
        >
          这是内容！
        </Modal>
        <br />
        <br />
        <Button onClick={this.Click(3)}>自定义页脚</Button>
        <Modal
          visible={visable3}
          footer={[
            <Button type="primary" onClick={this.buttonClick(3)}>
              自定义页脚
            </Button>,
          ]}
          title="这是标题！"
        >
          这是内容！
        </Modal>
        <br />
        <br />
        <Button onClick={() => this.showModal('confirm')}>confirm</Button>
        <br />
        <br />
        <Button onClick={() => this.showModal('info')}>info</Button>
        <br />
        <br />
        <Button onClick={() => this.showModal('success')}>success</Button>
        <br />
        <br />
        <Button onClick={() => this.showModal('error')}>error</Button>
        <br />
        <br />
        <Button onClick={() => this.showModal('warning')}>warning</Button>
      </div>
    );
  }
}
