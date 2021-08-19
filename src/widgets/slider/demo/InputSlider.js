import React from 'react';
import styled from 'styled-components';
import Slider from '../index';
import NumberInput from '../../number-input/index';
import Theme from '../../theme';
import Widget from '../../consts/index';

export const DemoItem = styled.div`
  display: inline-block;
  padding: 0 20px 20px 0;
`;
export default class InputSlider extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 5,
      maxValue: 30,
      minValue: 0,
    };
  }
  onChange = params => {
    const { newValue } = params;
    this.setState({ value: newValue });
  };
  render() {
    const { value, maxValue, minValue } = this.state;
    return (
      <React.Fragment>
        <DemoItem>
          <Theme
            config={{
              [Widget.Slider]: { Container: { normal: { width: 300 } } },
            }}
          >
            <Slider
              value={value}
              maxValue={maxValue}
              minValue={minValue}
              onChange={this.onChange}
            />
          </Theme>
        </DemoItem>
        <NumberInput value={value} max={maxValue} min={minValue} onChange={this.onChange} />
      </React.Fragment>
    );
  }
}
