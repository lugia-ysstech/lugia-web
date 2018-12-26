/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import { FooterWrap, ExtraFooter, Footer, FooterBtn } from '../styled';
import { modeStyle } from '../utils/booleanUtils';
import moment from 'moment';

type TypeProps = {
  onChange?: Function,
  footerChange?: Function,
  onOk?: boolean | Object,
  extraFooter?: Object,
  showTime?: Object,
  ButtonOptions?: Object,
  showToday?: boolean | Object,
  theme?: Object,
  status?: string,
  showTimeBtnIsDisabled?: boolean,
  format?: string,
  mode?: string,
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
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { onOk, extraFooter, showTime, ButtonOptions, showToday } = nextProps;
    const showExtraFooter = extraFooter && extraFooter.message;
    const showFooter = onOk || showTime || (ButtonOptions && ButtonOptions.options) || showToday;
    const isShowTime = !!showTime;
    const isOnOk = !!onOk || isShowTime;
    const isShowToday = !!showToday;
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

  handleClick = (value: string | Array<string>) => () => {
    const { onChange } = this.props;
    onChange && onChange({ newValue: value });
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
    const { extraFooter, ButtonOptions, theme } = this.props;
    let ChildrenNode;
    if (ButtonOptions && ButtonOptions.options) {
      const optionsKeys = [];
      const { options } = ButtonOptions;
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
          <FooterBtn ButtonOptions onClick={this.handleClick(newItemValue)}>
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
    const { isRange } = modeStyle(mode);
    let newTodayValue = todayValueStar;
    if (isRange) {
      newTodayValue = [todayValueStar, todayValueEnd];
    }
    const { showTimeBtnIsDisabled } = this.props;
    return (
      <FooterWrap {...theme} showFooter={showFooter}>
        {showFooter ? (
          <Footer {...this.props}>
            {showExtraFooter ? (
              <ExtraFooter extraFooter>{extraFooter && extraFooter.message}</ExtraFooter>
            ) : (
              ''
            )}
            {ButtonOptions ? ChildrenNode : ''}
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
                {showTimeMessage && showTimeMessage[status]}
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
