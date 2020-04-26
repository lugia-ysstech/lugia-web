/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import moment from 'moment';
import Menu from '../../menu/index';
import InnerMenu from '../../menu/menu';
import Theme from '../../theme';

import { TimeWrap, TimeWrapInner, TimeCol, TimeTitle } from '../styled/styledTime';
import { modeStyle } from '../utils/booleanUtils';
import { getFacePanelContain, getTimeTheme } from '../themeConfig/themeConfig';
import {
  getTimes,
  getShowTime,
  getCoversTimes,
  getBoundaryValue,
  haveWhichOneItemInTime,
} from '../utils/differUtils';
import Widget from '../../consts';
const Placeholder = InnerMenu.Placeholder;
const computeCanSeeCount = InnerMenu.computeCanSeeCount();
type TypeProps = {
  defaultValue?: string,
  value?: string,
  onChange?: Function,
  onScroller?: Function,
  getPartOfThemeProps: Function,
  isFocus?: boolean,
  theme?: Object,
  mode: string,
  model?: Object,
  hasTimeWrapBorder?: boolean,
  format: string,
  isScroll?: boolean,
};
type TypeState = {
  value: string,
  format: string,
  isScroll: boolean,
  keys: Array<number>,
  starts: Array<number>,
};
class Time extends Component<TypeProps, TypeState> {
  static displayName = 'Time';
  times: Object;
  constructor(props: TypeProps) {
    super(props);
    const hours = getTimes(24);
    const minutes = getTimes(60);
    const seconds = getTimes(60);
    this.times = {
      hours: getCoversTimes(hours, computeCanSeeCount, Placeholder),
      minutes: getCoversTimes(minutes, computeCanSeeCount, Placeholder),
      seconds: getCoversTimes(seconds, computeCanSeeCount, Placeholder),
    };
    const { model } = props;
    model &&
      model.on('inputOnChange', (data: Object) => {
        const { isScroll } = data;
        this.setState({ isScroll });
      });
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { format, value, isScroll } = nextProps;
    const newIsScroll = preState ? preState.isScroll : isScroll;
    const keys = value ? getShowTime(value, format) : ['', '', ''];
    const starts = value ? [...keys] : ['', '', ''];
    const newStarts = newIsScroll && preState ? preState.starts : starts;
    return {
      format,
      keys,
      starts: newStarts,
    };
  }
  onClickHours = (e: any, selectedKeys: [], obj: Object) => {
    this.onClick(e, obj, 0);
  };
  onClickMinutes = (e: any, selectedKeys: [], obj: Object) => {
    this.onClick(e, obj, 1);
  };
  onClickSeconds = (e: any, selectedKeys: [], obj: Object) => {
    this.onClick(e, obj, 2);
  };
  onClick = (e: any, obj: Object, index: number) => {
    const { keys, starts, format } = this.state;
    keys[index] = obj.value;
    starts[index] = obj.value;
    const val = this.getValue(keys);
    const { onChange } = this.props;
    onChange && onChange({ value: val, keys, newValue: val, event: e });
    const newVal = getShowTime(val, format);
    this.setState({ keys: [...newVal], starts, isScroll: true });
  };
  getValue = (keys: Array<number>) => {
    const newKeys = [...keys];
    newKeys[0] = getBoundaryValue(0, 23, newKeys[0]);
    newKeys[1] = getBoundaryValue(0, 59, newKeys[1]);
    newKeys[2] = getBoundaryValue(0, 59, newKeys[2]);
    const { value } = this.props;
    const { format } = this.state;
    const moments = value ? moment(value, format) : moment();
    const val = moments
      .set({ hour: newKeys[0], minutes: newKeys[1], seconds: newKeys[2] })
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
    const { start, index } = obj;
    const { starts } = this.state;
    starts[index] = start;
    this.setState({ starts, isScroll: true });
  };
  render() {
    const { hours, minutes, seconds } = this.times;
    const { keys, starts } = this.state;
    const { mode, value, getPartOfThemeProps } = this.props;
    const { isTime } = modeStyle(mode);
    const { format } = this.state;
    const { hasHour, hasMinutes, hasSeconds } = isTime && haveWhichOneItemInTime(format);

    const { timePikerSingleWrapTheme, timePikerColSizeTheme } = getFacePanelContain({
      mode,
      getPartOfThemeProps,
    });
    const {
      themeConfig: {
        normal: { width },
      },
    } = timePikerColSizeTheme;
    const {
      timePanelTheme,
      timePanelListTheme,
      selectTimeOptionTheme,
      timePanelHeadTheme,
    } = getTimeTheme({
      getPartOfThemeProps,
    });
    const timeColTheme = timePanelListTheme;
    const { themeConfig: menuContainerTheme } = timePanelTheme;
    const { themeConfig: selectTimeOptionThemeTheme } = selectTimeOptionTheme;
    console.log('selectTimeOptionThemeTheme', selectTimeOptionThemeTheme);
    console.log('timePanelTheme', timePanelTheme);
    return (
      <Theme
        config={{
          [Widget.Menu]: {
            Container: {
              ...menuContainerTheme,
            },
            MenuItem: {
              SelectedMenuItemWrap: {
                ...selectTimeOptionThemeTheme,
              },
            },
          },
        }}
      >
        <TimeWrap themeProps={timePikerSingleWrapTheme}>
          {isTime ? (
            ''
          ) : (
            <TimeTitle themeProps={timePanelHeadTheme}>
              {moment(value).format('YYYY年MM月DD日')}
            </TimeTitle>
          )}
          <TimeWrapInner>
            {isTime && !hasHour ? (
              ''
            ) : (
              <TimeCol themeProps={timeColTheme}>
                <Menu
                  data={hours}
                  onClick={this.onClickHours}
                  start={starts[0]}
                  selectedKeys={[keys[0]]}
                  checkedCSS={'background'}
                  onScroller={this.onScrollerFirst}
                />
              </TimeCol>
            )}
            {isTime && !hasMinutes ? (
              ''
            ) : (
              <TimeCol themeProps={timeColTheme}>
                <Menu
                  data={minutes}
                  onClick={this.onClickMinutes}
                  start={starts[1]}
                  selectedKeys={[keys[1]]}
                  checkedCSS={'background'}
                  onScroller={this.onScrollerSecond}
                />
              </TimeCol>
            )}
            {isTime && !hasSeconds ? (
              ''
            ) : (
              <TimeCol themeProps={timeColTheme}>
                <Menu
                  data={seconds}
                  onClick={this.onClickSeconds}
                  start={starts[2]}
                  selectedKeys={[keys[2]]}
                  checkedCSS={'background'}
                  onScroller={this.onScrollerThird}
                />
              </TimeCol>
            )}
          </TimeWrapInner>
        </TimeWrap>
      </Theme>
    );
  }
}
export default Time;
