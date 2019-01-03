/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import { FooterWrap, ExtraFooter, Footer, FooterBtn } from '../styled/styledFooter';
import { modeStyle } from '../utils/booleanUtils';
import moment from 'moment';

type TypeProps = {
  onChange?: Function,
  footerChange?: Function,
  onOk?: boolean | Object,
  extraFooter?: Object,
  showTime?: Object,
  buttonOptions?: Object,
  showToday?: boolean | Object,
  theme?: Object,
  status?: string,
  showTimeBtnIsDisabled?: boolean,
  format?: string,
  mode?: string,
  model?: Object,
};

type TypeState = {
  showExtraFooter: boolean,
  showFooter: boolean,
  isOnOk: boolean,
  isShowTime: boolean,
  isShowToday: boolean,
  onOkMessage: string,
  showTodayMessage: string,
  status: string,
  showTimeMessage: Object,
};

const normalShowTimeMessage = { showTime: '选择时间', showDate: '选择日期' };
function getShowTimeMessage(showTime) {
  const newMessage = {};
  for (const i in normalShowTimeMessage) {
    newMessage[i] = showTime[i];
    if (!showTime[i]) {
      newMessage[i] = normalShowTimeMessage[i];
    }
  }
  return newMessage;
}
class PageFooter extends Component<TypeProps, TypeState> {
  static displayName = 'PageFooter';
  timeMessage: string;
  constructor(props: TypeProps) {
    super(props);
    const { model } = props;
    model &&
      model.on('inputOnFocus', (data: Object) => {
        const { status } = data;
        this.setState({ status });
      });
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { onOk, extraFooter, showTime, buttonOptions, showToday, mode } = nextProps;
    const { isDate, isRange } = modeStyle(mode);
    const showExtraFooter = extraFooter && extraFooter.message;
    const includMode = isDate || isRange;
    const newOnOk = onOk && includMode;
    const newShowTime = showTime && includMode;
    const newShowToday = showToday && includMode;
    const newButtonOptions = buttonOptions && buttonOptions.options && includMode;
    const showFooter =
      newOnOk || newShowTime || showExtraFooter || newButtonOptions || newShowToday;
    const isShowTime = newShowTime;
    const isOnOk = newOnOk || isShowTime;
    const isShowToday = newShowToday;
    const status = preState && preState.status ? preState.status : 'showTime';
    const onOkMessage = onOk ? (onOk.message ? onOk.message : '确定') : isShowTime ? '确定' : '';
    const typeShowTime =
      showTime && typeof showTime.message === 'object' && !Array.isArray(showTime);
    const showTimeMessage = showTime
      ? typeShowTime
        ? getShowTimeMessage(showTime.message)
        : normalShowTimeMessage
      : '';
    const showTodayMessage = showToday ? (showToday.message ? showToday.message : '今天') : '';
    return {
      showExtraFooter,
      showFooter,
      isOnOk,
      isShowTime,
      isShowToday,
      onOkMessage,
      status,
      showTimeMessage:
        preState && preState.showTimeMessage ? preState.showTimeMessage : showTimeMessage,
      showTodayMessage,
    };
  }

  handleClick = (value: string | Array<string>) => (e: any) => {
    const { onChange } = this.props;
    onChange && onChange({ newValue: value, event: e });
  };
  onOkClick = (status: string) => () => {
    this.publicOnChange('onOk');
    this.setState({ status: 'showTime' });
  };

  statusClick = (status: string) => () => {
    if (status === 'showTime') {
      this.setState({ status: 'showDate' });
    }
    if (status === 'showDate') {
      this.setState({ status: 'showTime' });
    }
    this.publicOnChange(status);
  };
  publicOnChange = (status: string) => {
    const { footerChange } = this.props;
    footerChange && footerChange(status);
  };
  render() {
    const { extraFooter, buttonOptions, theme } = this.props;
    let ChildrenNode;
    if (buttonOptions && buttonOptions.options) {
      const optionsKeys = [];
      const { options } = buttonOptions;
      for (const key in options) {
        optionsKeys.push(key);
      }
      ChildrenNode = optionsKeys.map((item, index) => {
        let newItemValue = options[item];
        if (Array.isArray(options[item])) {
          const newOptions = [];
          for (let i = 0; i < options[item].length; i++) {
            newOptions.push(options[item][i]);
          }
          newItemValue = newOptions;
        }
        return (
          <FooterBtn buttonOptions onClick={this.handleClick(newItemValue)}>
            {item}
          </FooterBtn>
        );
      });
    }
    const {
      onOkMessage,
      showTodayMessage,
      showExtraFooter,
      showFooter,
      isOnOk,
      isShowTime,
      isShowToday,
    } = this.state;
    const { showTimeMessage, status } = this.state;
    const { format, mode } = this.props;
    const todayValueStar = moment()
      .set({ hour: 0, minute: 0, second: 0 })
      .format(format);
    const todayValueEnd = moment()
      .set({ hour: 23, minute: 59, second: 59 })
      .format(format);
    const { isRange, isDate } = modeStyle(mode);
    let newTodayValue = todayValueStar;
    if (isRange) {
      newTodayValue = [todayValueStar, todayValueEnd];
    }
    const { showTimeBtnIsDisabled } = this.props;
    const newChildrenNode = (isDate || isRange) && buttonOptions ? ChildrenNode : '';
    return (
      <FooterWrap {...theme} showFooter={showFooter}>
        {showFooter ? (
          <Footer {...this.props}>
            {showExtraFooter ? (
              <ExtraFooter extraFooter>{extraFooter && extraFooter.message}</ExtraFooter>
            ) : (
              ''
            )}
            {newChildrenNode}
            {isShowToday ? (
              <FooterBtn showToday onClick={this.handleClick(newTodayValue)}>
                {showTodayMessage}
              </FooterBtn>
            ) : (
              ''
            )}
            {isOnOk ? (
              <FooterBtn onOk background border onClick={this.onOkClick('onOk')}>
                {onOkMessage}
              </FooterBtn>
            ) : (
              ''
            )}
            {isShowTime ? (
              <FooterBtn
                showTime
                showTimeButton={showTimeBtnIsDisabled}
                onClick={this.statusClick(showTimeBtnIsDisabled ? status : '')}
              >
                {showTimeMessage && status === 'date'
                  ? showTimeMessage.showTime
                  : showTimeMessage[status]}
              </FooterBtn>
            ) : (
              ''
            )}
          </Footer>
        ) : (
          ''
        )}
      </FooterWrap>
    );
  }
}
export default PageFooter;
