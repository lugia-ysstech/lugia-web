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
  constructor() {
    super();
    this.state = {
      visible: true,
    };
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
    const { content, component: Targert } = this.props;
    if (visible) {
      this.emit('onShow');
    }
    return (
      <Modal {...this.props} visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
        {Targert ? <Targert {...this.props} /> : content}
      </Modal>
    );
  }

  emit(eventName: string) {
    const { listener } = this.props;
    if (listener) {
      listener.emit(eventName, this.props);
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
