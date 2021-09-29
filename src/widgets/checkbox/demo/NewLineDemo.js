import React from 'react';
import Checkbox from '../index';

import styled from 'styled-components';
import BackTop from '../index';

const CheckboxWrapper = styled.div`
  width: 200px;
`;
export default class CheckBoxDemo extends React.Component {
  render() {
    return (
      <CheckboxWrapper>
        <Checkbox needNewLine={true} lines={2}>
          CheckBox CheckBox CheckBox CheckBox CheckBox CheckBox CheckBox CheckBox
        </Checkbox>
      </CheckboxWrapper>
    );
  }
}
