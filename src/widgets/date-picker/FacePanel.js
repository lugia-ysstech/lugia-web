/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import moment from 'moment';
import Icon from '../icon/index';
import DatePicker from './DateInput';
import { getDerived } from './getDerived';
import { OtherChild, OtherChildText, DatePanel } from './styled';
type TypeProps = {
  onChange?: Function,
  showYears?: boolean,
};
type TypeState = {
  value: string,
  format: string,
  currentYear: number,
};
class FacePanel extends Component<TypeProps, TypeState> {
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { format } = getDerived(nextProps, preState);
    const value = (preState && preState.value) || nextProps.value;
    const moments = moment(value, format);
    return {
      value: moments.format(format) || moment(),
      currentYear: moments.year(),
    };
  }
  getChildIndex = (choseValue: number) => () => {
    const { value, format } = this.state;
    const { showYears } = this.props;
    let year = choseValue;
    const { onChange } = this.props;
    onChange && onChange(choseValue);
    if (showYears) {
      const { start } = choseValue;
      year = start + 1;
      onChange && onChange({ ...choseValue, showYears: false });
    }
    const newValue = moment(value, format)
      .set({ year })
      .format(format);
    this.setState({ value: newValue });
  };
  render() {
    const { currentYear } = this.state;

    const { start } = this.props;
    console.log(start);
    const nextYear = moment()
      .set('year', start)
      .add(-1, 'year');
    const years = [];
    for (let i = 0; i < 12; i++) {
      const moments = moment(nextYear);
      const year = moments.add(i, 'year');
      years.push(year.year());
    }
    const { end, showYears } = this.props;

    const doubleYear = [];
    if (showYears) {
      const times = end - start + 1;
      const yStart = start - times;
      for (let i = 0; i < 12; i++) {
        const star = yStart + times * i;
        const en = star + times - 1;
        const text = star + '-' + en;
        doubleYear.push({ text, start: star });
      }
    }
    const ChildrenData = showYears ? doubleYear : years;
    return (
      <DatePanel>
        {ChildrenData.map((current, index) => {
          const text = showYears ? current.text : current;
          // const pamas =current;

          return (
            <OtherChild onClick={this.getChildIndex(current)} key={index}>
              <OtherChildText isChose={current === currentYear}>{text}</OtherChildText>
            </OtherChild>
          );
        })}
      </DatePanel>
    );
  }
}

export default FacePanel;
