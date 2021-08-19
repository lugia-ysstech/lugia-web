import React from 'react';
import styled from 'styled-components';
import Switch from '../index';
import Button from '../../button/index';

export const DemoItem = styled.div`
  padding: 0;
  padding-bottom: 10px;
`;

export default class DisabledSwitch extends React.Component {
  state = {
    disabled: true,
  };

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };

  render() {
    return (
      <React.Fragment>
        <DemoItem>
          <Switch defaultValue disabled={this.state.disabled} />
        </DemoItem>
        <Button type="primary" onClick={this.toggle}>
          点击切换
        </Button>
      </React.Fragment>
    );
  }
}
