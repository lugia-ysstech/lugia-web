import React from 'react';
import styled from 'styled-components';
import Slider from '../index';

export const DemoItem = styled.div`
  padding: 0 20px 20px 0;
`;
export default class BaseSlider extends React.Component {
  constructor() {
    super();
    this.state = {
      tipsValue: '5%',
    };
  }
  onchange = obj => {
    const { newValue } = obj;
    this.setState({ tipsValue: `${newValue}%` });
  };
  render() {
    return (
      <React.Fragment>
        <DemoItem>
          <Slider defaultValue={5} tips={this.state.tipsValue} onChange={this.onchange} />
        </DemoItem>
        <Slider defaultValue={5} />
      </React.Fragment>
    );
  }
}
