import React, { Component } from 'react';
import moment from 'moment';
import SwitchPanel from './SwitchPanel';
import Input from '../input';
import Icon from '../icon/index';
import { getDerived, modeStyle } from './getDerived';
import { RangeWrap, RangeInnerTop } from './styled';

class SingleRange extends Component {
  constructor(props) {
    super(props);
    this.picker = React.createRef();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { value, hasDefaultProps, hasValueProps } = getDerived(nextProps, preState);
    let newValue = value;
    if (!hasDefaultProps && !hasValueProps) {
      newValue = '';
    }
    return {
      value: (preState && preState.value) || newValue,
    };
  }
  onChange = (params: Object) => {
    const { newValue } = params;
    this.setState({ value: newValue }, () => {
      this.picker.current.getChangeValue(newValue);
    });
  };
  render() {
    const { value } = this.state;
    const { disabled, readOnly, placeholder } = this.props;
    return (
      <RangeWrap>
        <RangeInnerTop>
          <Input
            // prefix={<Icon className="lugia-icon-financial_date" />}
            value={value}
            onChange={this.onChange}
            placeholder={placeholder}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            disabled={disabled}
            readOnly={readOnly}
          />
        </RangeInnerTop>
        <SwitchPanel onChange={this.onChange} ref={this.picker} />
      </RangeWrap>
    );
  }
}
export default SingleRange;
