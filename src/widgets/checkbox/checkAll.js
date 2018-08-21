/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import Widget from '../consts/index';
import type { CheckBoxProps } from '../css/checkbox';
import styled from 'styled-components';
import CheckBox from './checkbox';
import CheckBoxGroup from './checkbox-group';

type CheckAllProps = {
  notHave?: boolean,
};
type CheckAllState = {
  value: Array<string>,
  indeterminate: boolean,
  checked: boolean,
};
const data = [
  {
    text: 'Apple',
    value: 'apple',
  },
  {
    text: 'Pear',
    value: 'pear',
  },
  {
    text: 'Orange',
    value: 'orange',
  },
];
const CheckAll = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ccc;
`;
const Items = styled.div`
  padding: 10px 20px;
`;

export default class extends React.Component<CheckAllProps, CheckAllState> {
  allValues: Array<string>;
  static getDerivedStateFromProps(props: Object, state: Object) {
    if (!state) {
      const value = ['pear'];
      return {
        value,
        indeterminate: true,
        checked: value.length === data.length,
      };
    }
  }
  componentDidMount() {
    this.allValues = [];
    data.map(item => {
      this.allValues.push(item.value);
    });
  }
  handleChange = (value: Array<string>) => {
    this.setState({
      value,
      checked: value.length === data.length,
      indeterminate: !!value.length && value.length < data.length,
    });
  };
  handleCheckAll = () => {
    const { checked } = this.state;
    this.setState({
      value: checked ? [] : this.allValues,
      checked: !checked,
      indeterminate: false,
    });
  };
  render() {
    const { value, indeterminate, checked } = this.state;
    return (
      <div>
        <CheckAll>
          <CheckBox indeterminate={indeterminate} checked={checked} onChange={this.handleCheckAll}>
            Check All
          </CheckBox>
        </CheckAll>
        <Items>
          <CheckBoxGroup data={data} value={value} onChange={this.handleChange} />
        </Items>
      </div>
    );
  }
}
