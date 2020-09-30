import React, { Component } from 'react';
import { unmountComponentAtNode, findDOMNode } from 'react-dom';
import Popconfirm from '../popconfirm/';
import Tootiple from '../tooltip/';
import Popover from '../popover/';

export default class FncPopupComps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    this.clearPopup();
    onCancel && onCancel();
  };
  handleConfirm = () => {
    const { onConfirm } = this.props;
    this.clearPopup();
    onConfirm && onConfirm();
  };

  componentDidMount() {
    document.addEventListener('click', this.listenerClearPopup);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.listenerClearPopup);
  }

  getPopContent = () => {
    const { visible } = this.state;
    const { popupName } = this.props;
    switch (popupName) {
      case 'Popconfirm':
        return (
          <Popconfirm
            {...this.props}
            visible={visible}
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
          />
        );
      case 'Tootiple':
        return <Tootiple {...this.props} visible={visible} />;
      case 'Popover':
        return <Popover {...this.props} visible={visible} />;
      default:
        return null;
    }
  };

  render() {
    return this.getPopContent();
  }

  listenerClearPopup = e => {
    const popupNodeWrap = findDOMNode(this).parentNode.nextSibling;
    if (popupNodeWrap && popupNodeWrap.firstChild.firstChild) {
      const isInnerClick = popupNodeWrap.firstChild.firstChild.contains(e.target);
      if (isInnerClick) {
        return;
      }
    }
    this.clearPopup();
  };

  clearPopup = () => {
    this.setState(
      {
        visible: false,
      },
      function() {
        this.removeDom();
      }
    );
  };

  removeDom = () => {
    const { visible } = this.state;
    const { parentDom } = this.props;
    if (!visible && parentDom) {
      unmountComponentAtNode(parentDom);
      if (document.body && document.body.contains(parentDom)) {
        document.body.removeChild(parentDom);
      }
    }
  };
}
