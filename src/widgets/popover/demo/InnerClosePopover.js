import React from 'react';
import Popover from '../index';
import Button from '../../button/index';

export default class InnerClosePopover extends React.Component<any, any> {
  state = {
    visible: false,
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    const description = 'this is long description this is long description';
    return (
      <Popover
        placement="top"
        title="this is the title"
        action="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        clear={'lugia-icon-reminder_close'}
        description={[
          <div>
            <div>{description}</div>
            <div>{description}</div>
            <div>{description}</div>
          </div>,
        ]}
        onClearClick={this.hide}
        showClearButton
      >
        <Button type="primary">内部关闭</Button>
      </Popover>
    );
  }
}
