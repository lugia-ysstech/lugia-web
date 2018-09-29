//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import moment from 'moment';
import SwitchPanel from './SwitchPanel';
import Trigger from '../trigger/index';
import Date from './Date';
import Input from '../input';
import RangeInput from './RangeInput';
import Icon from '../icon/index';
import { sortable } from '../common/Math';
import { getDerived, getDerivedForInput } from './getDerived';
class Range extends Component {
  constructor(props) {
    super(props);
    this.pickerFirst = React.createRef();
    this.pickerSecond = React.createRef();
    this.trigger = React.createRef();
    this.valueArr = [];
  }

  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { placeholder } = getDerived(nextProps, preState);
    const { value, format, hasValueProps } = getDerivedForInput(nextProps, preState);
    return {
      placeholder,
      value: (preState && preState.value) || value,
      panelValue: (preState && preState.panelValue) || value,
      format,
    };
  }
  onClickTrigger = (visible: boolean) => {
    this.setTreePopupVisible(visible);
    console.log(this.state.value);
    const { value } = this.state;
    this.pickerFirst.current.onFocus();
    this.pickerSecond.current.onFocus();
    //this.setState({panelIndex:0});
    // value[0] !== '' && value[1] !== '' && this.pickerSecond.current.onFocus();
  };
  onChange = (parmas: Object) => {
    console.log(parmas);
    const { newValue } = parmas;
    let { panelValue } = this.state;
    panelValue = [...newValue];

    this.setState({ value: panelValue, panelValue }, () => {
      this.pickerFirst.current.onFocus();
      this.pickerSecond.current.onFocus();
      // this.onClickTrigger(false);
    });
  };
  onChangeFirst = (parmas: Object) => {
    this.panelChange({ ...parmas, index: 0 });
  };
  onChangeSecond = (parmas: Object) => {
    this.panelChange({ ...parmas, index: 1 });
  };

  panelChange = (parmas: Object) => {
    const { newValue, index } = parmas;
    const { format } = this.state;

    const unix = moment(newValue, format).valueOf();
    this.valueArr.push(unix);
    const { length } = this.valueArr;
    if (length === 1) {
      this.choseDate = moment(this.valueArr[0]).format(format);
      this.setState({ panelValue: [], panelIndex: index }, () => {
        //  this.pickerFirst.current.onFocus();
        //  this.pickerSecond.current.onFocus();
      });
    }
    if (length === 2) {
      this.choseDate = '';
      const newVal = this.valueArr.sort(sortable);
      newVal.forEach((item, index) => {
        newVal[index] = moment(newVal[index]).format(format);
      });
      this.setState({ value: newVal, panelValue: newVal }, () => {
        this.setTreePopupVisible(false);
        this.valueArr = [];
      });
    }
  };
  rangeHoverChange = (obj: Object) => {
    const { rangeIndex, choseValue } = obj;
    const { panelIndex, panelValue } = this.state;
    if (rangeIndex === 0) {
      this.pickerSecond.current.onFocus();
      this.preIndex = 1;
    }
    if (rangeIndex === 1) {
      this.pickerFirst.current.onFocus();
      this.preIndex = 0;
    }
  };
  render() {
    const { disabled, readOnly } = this.props;
    const { value, panelValue, panelIndex } = this.state;
    const hasValue = value[0] !== '' && value[1] !== '' && panelValue.length === 2;

    return (
      <Trigger
        popup={
          <div>
            <SwitchPanel
              {...this.props}
              prePanelIndex={this.preIndex}
              panelChoseDate={this.choseDate}
              hasValue={hasValue}
              panelIndex={panelIndex}
              ref={this.pickerFirst}
              value={panelValue[0]}
              rangeValue={value}
              onChange={this.onChangeFirst}
              index={0}
              rangeHoverChange={this.rangeHoverChange}
            />
            <SwitchPanel
              {...this.props}
              prePanelIndex={this.preIndex}
              panelChoseDate={this.choseDate}
              hasValue={hasValue}
              panelIndex={panelIndex}
              ref={this.pickerSecond}
              value={panelValue[1]}
              rangeValue={value}
              onChange={this.onChangeSecond}
              index={1}
              rangeHoverChange={this.rangeHoverChange}
            />
          </div>
        }
        align="bottomLeft"
        key="trigger"
        ref={this.trigger}
        action={disabled ? [] : ['focus']}
        hideAction={['focus']}
      >
        <RangeInput
          placeholder={this.state.placeholder}
          value={value}
          onClick={this.onClickTrigger}
          onChange={this.onChange}
        />
      </Trigger>
    );
  }
  setTreePopupVisible(visible: boolean) {
    if (this.trigger.current && this.trigger.current.getThemeTarget()) {
      this.trigger.current.getThemeTarget().setPopupVisible(visible);
    }
  }
}
export default Range;
