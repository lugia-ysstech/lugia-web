/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import moment from 'moment';
import Head from './Head';
import FacePanel from './FacePanel';
import DatePicker from './DateInput';
import { DateWrapper } from './styled';
import { getDerived } from './getDerived';
type TypeProps = {
  step?: number,
};
type TypeState = {
  year: number,
  secondTitle: string,
  isWeekInner: boolean,
  weeks: number,
};
class Weeks extends Component<TypeProps, TypeState> {
  constructor(props) {
    super(props);
    this.picker = React.createRef();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { moments } = getDerived(nextProps, preState);
    const format = nextProps.format || 'YYYY-WW周';

    if (!preState) {
      return {
        year: moment().year(),
        secondTitle: '',
        isWeekInner: true,
        moments,
        format,
        weeks: moments.weeks(),
        mode: '',
        from: '',
      };
    }
    return {
      weeks: (preState && preState.weeks) || moments.weeks(),
      mode: (preState && preState.mode) || nextProps.mode,
      from: (preState && preState.from) || nextProps.from,
    };
  }
  arrorChange = (param: Object) => {
    const { year } = param;
    this.setState({ year });
  };
  onHeadChange = (param: Object) => {
    const { start, end } = param;
    this.setState({ isWeekInner: false });
  };
  headOnChange = (parma: Object) => {
    const { year } = parma;
    const { weeks } = this.state;
    this.setState({ year });
    const { onChangeYear } = this.props;
    const newValue = moment()
      .set({ year, weeks })
      .format('YYYY-W周');
    onChangeYear && onChangeYear({ newValue, mode: 'year', from: 'week', year, weeks });
  };
  panelChange = (param: Object) => {
    const { isWeekInner, start, text, weeks } = param;
    const { year, moments, format, mode, from } = this.state;
    this.setState({ weeks });
    if (isWeekInner) {
      this.setState({ secondTitle: text, isWeekInner, weeks: start + 1 });
    }
    if (!isWeekInner) {
      const newValue = year + '-' + weeks + '周';
      this.getOnChange({ year, weeks, mode, from, newValue });
    }
  };
  getHeadInfo = (param: Object) => {
    const { isWeekInner, text } = this.picker.current.getHeadInfo();
    this.setState({ secondTitle: text, isWeekInner });
  };
  getOnChange = (data: Object) => {
    const { onChange } = this.props;
    onChange && onChange(data);
  };
  getFreshPicker = (obj: Object) => {
    const { mode, from, moments } = obj;
    const { format } = this.state;
    let year = moments.year();
    const month = moments.month();
    const weeks = moments.weeks();

    if (month === 11 && weeks === 1) {
      year = year + 1;
    }
    this.setState({ weeks, year, mode, from }, () => {
      this.getHeadInfo();
    });
  };
  componentDidMount() {
    this.getHeadInfo();
  }
  render() {
    const { year, secondTitle, isWeekInner, weeks } = this.state;
    const { step = 12 } = this.props;
    return (
      <DateWrapper width={300}>
        <div width={300}>
          <Head
            {...this.props}
            start={year}
            mode={'week'}
            isWeekInner={isWeekInner}
            secondTitle={secondTitle}
            onChange={this.arrorChange}
            onHeadChange={this.onHeadChange}
            headOnChange={this.headOnChange}
          />
          <FacePanel
            {...this.props}
            isWeekInner={isWeekInner}
            start={year}
            mode={'week'}
            weeks={weeks}
            step={step}
            onChange={this.panelChange}
            ref={this.picker}
          />
        </div>
      </DateWrapper>
    );
  }
}

export default Weeks;
