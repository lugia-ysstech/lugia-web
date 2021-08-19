import React from 'react';
import styled from 'styled-components';
import Slider from '../index';

export const DemoItem = styled.div`
  padding: 0 30px;
`;
export default class IconSlider extends React.Component {
  render() {
    return (
      <Slider
        defaultValue={5}
        tips
        icons={[{ name: 'lugia-icon-financial_sad_o' }, { name: 'lugia-icon-financial_smile_o' }]}
      />
    );
  }
}
