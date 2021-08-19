import React from 'react';
import Slider from '../../index';
import styled from 'styled-components';
export const DemoItem = styled.div`
  padding: 0 20px 20px 0;
`;
export default class BaseSlider extends React.Component {
  onchange = v => {};
  render() {
    return (
      <DemoItem>
        <div>default 无props</div>
        <Slider />
      </DemoItem>
    );
  }
}
