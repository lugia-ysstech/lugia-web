import React from 'react';
import styled from 'styled-components';
import Slider from '../index';
import Button from '../../button/index';

export const DemoItem = styled.div`
  padding: 20px 0 0 8px;
`;
export default class DisabledSlider extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
    };
  }
  toggle = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };
  render() {
    return (
      <div>
        <Slider defaultValue={5} tips disabled={this.state.disabled} />
        <DemoItem>
          <Button type="primary" onClick={this.toggle}>
            点击切换
          </Button>
        </DemoItem>
      </div>
    );
  }
}
