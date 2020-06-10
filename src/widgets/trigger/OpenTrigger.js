/**
 * @flow
 * @Description:
 * @author cuixia wang
 * @date 2020-06-10
 */
import React, { Component } from 'react';
import Trigger from './index';
type TypeProps = {
  alwaysOpen?: boolean,
  popupVisible?: boolean,
};
class OpenTrigger extends Component<TypeProps, any> {
  render() {
    const { alwaysOpen } = this.props;
    const newPopupVisible = alwaysOpen ? { popupVisible: true } : {};
    return <Trigger {...this.props} {...newPopupVisible} alwaysOpen={alwaysOpen} />;
  }
}

export default OpenTrigger;
