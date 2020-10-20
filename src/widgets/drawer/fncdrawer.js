/**
 *
 * create by Shine_Lee
 *
 * @flow
 *
 */

import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import Drawer from './drawer';

export class FncDrawer extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      visible: true,
    };
  }
  handleColse = () => {
    const { onClose } = this.props;
    this.setState(
      {
        visible: false,
      },
      this.removeDom
    );
    onClose && onClose();
  };
  handleToggle = () => {
    const { onToggle } = this.props;
    const { visible } = this.state;
    if (visible) {
      this.removeDom();
      onToggle && onToggle();
    }
    this.setState({ visible: !visible });
  };
  render() {
    const { visible } = this.state;
    const { children } = this.props;
    return (
      <Drawer
        {...this.props}
        visible={visible}
        onClose={this.handleColse}
        onToggle={this.handleToggle}
      >
        {children}
      </Drawer>
    );
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
