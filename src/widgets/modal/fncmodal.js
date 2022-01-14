/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import Modal from './modal';

export class FncModal extends React.Component<any, any> {
  key: Symbol;

  constructor() {
    super();
    this.state = {
      visible: true,
    };
    this.visible = false;
    this.key = Symbol();
  }
  handleOk = () => {
    const { onOk } = this.props;
    this.setState(
      {
        visible: false,
      },
      this.removeDom
    );
    this.emit('onOk');
    onOk && onOk();
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    this.setState(
      {
        visible: false,
      },
      this.removeDom
    );
    this.emit('onCancel');
    onCancel && onCancel();
  };

  render() {
    const { visible } = this.state;
    if (visible !== this.visible) {
      this.emit(visible ? 'onShow' : 'onHide');
    }
    this.visible = visible;
    const { content, component: Targert } = this.props;
    return (
      <Modal {...this.props} visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
        {Targert ? <Targert {...this.props} /> : content}
      </Modal>
    );
  }

  emit(eventName: string) {
    const { listener } = this.props;
    if (listener) {
      listener.emit(eventName, { props: this.props, key: this.key });
    }
  }

  removeDom = () => {
    const { visible } = this.state;
    const { parentDom } = this.props;
    if (!visible && parentDom) {
      unmountComponentAtNode(parentDom);
      document.body && document.body.removeChild(parentDom);
    }
  };
}
