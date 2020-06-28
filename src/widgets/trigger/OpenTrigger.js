/**
 * @flow
 * @Description:
 * @author cuixia wang
 * @date 2020-06-10
 */
import React from 'react';
import Trigger from './index';
type TypeProps = {
  alwaysOpen?: boolean,
  liquidLayout?: boolean,
};

export default class OpenTrigger extends React.Component<TypeProps, null> {
  triggerRef = React.createRef();
  getTrigger = () => {
    return this.triggerRef;
  };
  render() {
    const { alwaysOpen, liquidLayout } = this.props;
    const newPopupVisible = alwaysOpen ? { popupVisible: true } : {};
    const newCreatePortal = liquidLayout ? { createPortal: false } : {};
    return (
      <Trigger ref={this.triggerRef} {...this.props} {...newPopupVisible} {...newCreatePortal} />
    );
  }
}
