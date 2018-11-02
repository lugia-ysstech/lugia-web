/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import moment from 'moment';
import Menu from '../menu/index';
import Theme from '../theme';
import Widget from '../consts/index';
import { TimeWrap, TimeCol } from './styleTime';
import { getDerived, getDerivedForInput, modeStyle } from './getDerived';
import { getTimes, getTheme } from './utils';
const Placeholder = Menu.Placeholder;
const computeCanSeeCount = Menu.computeCanSeeCount();
type TypeProps = {
  defaultValue?: string,
  value?: string,
  onChange?: Function,
  isFocus?: boolean,
};
type TypeState = {
  value: string,
  format: string,
  keys: [],
  starts: [],
};
const getShowTime = (value: string, format: string) => {
  let newValue = ['', '', ''];
  if (value) {
    const moments = moment(value, format);
    newValue[0] = moments.hour();
    newValue[1] = moments.minute();
    newValue[2] = moments.second();
  } else {
    newValue = [0, 0, 0];
  }
  return newValue;
};
class Time extends Component<TypeProps, TypeState> {
  times: Object;
  newValue: Array<string>;
  constructor() {
    super();
    const hours = getTimes(24);
    const minutes = getTimes(60);
    const seconds = getTimes(60);
    const getCoversTimes = (times: Array<number>) => {
      const newTimes = [...times];
      for (let i = 0; i < computeCanSeeCount - 1; i++) {
        newTimes.push(Placeholder);
      }
      return newTimes;
    };
    this.times = {
      hours: getCoversTimes(hours),
      minutes: getCoversTimes(minutes),
      seconds: getCoversTimes(seconds),
    };
  }

  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { format } = getDerived(nextProps, preState);
    const { value } = getDerivedForInput(nextProps, preState);
    const { isFocus } = nextProps;
    const keys = value ? getShowTime(value, format) : ['', '', ''];
    const starts = value ? [...keys] : ['', '', ''];
    const stateIsScroll = isFocus ? false : preState && preState.isScroll;
    if (!preState) {
      return {
        keys,
        starts,
      };
    }
    return {
      format,
      keys,
      starts: stateIsScroll && preState ? preState.starts : starts,
    };
  }
  onClickHours = (e: any, selectedKeys: [], obj: Object) => {
    this.onClick(e, selectedKeys, obj, 0);
  };
  onClickMinutes = (e: any, selectedKeys: [], obj: Object) => {
    this.onClick(e, selectedKeys, obj, 1);
  };
  onClickSeconds = (e: any, selectedKeys: [], obj: Object) => {
    this.onClick(e, selectedKeys, obj, 2);
  };
  onClick = (e: any, selectedKeys: [], obj: Object, index: number) => {
    const { keys, starts, format } = this.state;
    keys[index] = obj.value;
    starts[index] = obj.value;
    const val = this.getValue(keys);
    const { onChange } = this.props;
    onChange && onChange({ value: val });
    const newVal = getShowTime(val, format);
    this.setState({ keys: [...newVal], starts, isScroll: true });
  };
  getValue = (newValue: Array<number>) => {
    const { value } = this.props;
    const { format } = this.state;
    const moments = value ? moment(value, format) : moment();
    const val = moments
      .set({ hour: newValue[0], minutes: newValue[1], seconds: newValue[2] })
      .format(format);
    return val;
  };
  onScrollerFirst = (start: number, end: number) => {
    this.onScroller({ start, end, index: 0 });
  };
  onScrollerSecond = (start: number, end: number) => {
    this.onScroller({ start, end, index: 1 });
  };
  onScrollerThird = (start: number, end: number) => {
    this.onScroller({ start, end, index: 2 });
  };
  onScroller = (obj: Object) => {
    const { start, end, index } = obj;
    const { starts } = this.state;
    starts[index] = start;
    const { onScroller } = this.props;
    onScroller && onScroller();
    this.setState({ starts, isScroll: true });
  };
  render() {
    const { hours, minutes, seconds } = this.times;
    const { keys, starts } = this.state;
    const { mode } = this.props;
    const { isTime } = modeStyle(mode);
    const picker = isTime ? 'Time' : 'TimePicker';
    const { theme } = getTheme(this.props, picker);
    const width = theme ? theme.width : 200;
    const menuWidth = width / 3;
    const config = {
      [Widget.Menu]: { ...theme, width: menuWidth },
    };
    return (
      <TimeWrap>
        <TimeCol>
          <Theme config={config}>
            <Menu
              data={hours}
              onClick={this.onClickHours}
              start={starts[0]}
              selectedKeys={[keys[0]]}
              checkedCSS={'background'}
              onScroller={this.onScrollerFirst}
            />
          </Theme>
        </TimeCol>
        <TimeCol>
          <Theme config={config}>
            <Menu
              data={minutes}
              onClick={this.onClickMinutes}
              start={starts[1]}
              selectedKeys={[keys[1]]}
              checkedCSS={'background'}
              onScroller={this.onScrollerSecond}
            />
          </Theme>
        </TimeCol>
        <TimeCol noBorder>
          <Theme config={config}>
            <Menu
              data={seconds}
              onClick={this.onClickSeconds}
              start={starts[2]}
              selectedKeys={[keys[2]]}
              checkedCSS={'background'}
              onScroller={this.onScrollerThird}
            />
          </Theme>
        </TimeCol>
      </TimeWrap>
    );
  }
}
export default Time;
