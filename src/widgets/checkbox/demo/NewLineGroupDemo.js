import React from 'react';
import Checkbox from '../index';
import styled from 'styled-components';

const CheckboxGroup = Checkbox.Group;
const CheckboxWrapper = styled.div`
  width: 200px;
`;
export default class CheckBoxDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newValue: ['11', '44'],
    };
  }
  handleChange = ({ newValue, newDisplayValue }) => {
    console.info(newValue, newDisplayValue);
    this.setState({ newValue });
  };
  render() {
    return (
      <CheckboxWrapper>
        <CheckboxGroup
          onChange={this.handleChange}
          value={this.state.newValue}
          needNewLine={true}
          lines={2}
        >
          <Checkbox value="11" disabled>
            CheckBox
          </Checkbox>
          <Checkbox value="22">
            CheckBox CheckBox CheckBox CheckBox CheckBox CheckBox CheckBox CheckBox CheckBox
          </Checkbox>
          <Checkbox value="33">CheckBox3</Checkbox>
        </CheckboxGroup>
      </CheckboxWrapper>
    );
  }
}
