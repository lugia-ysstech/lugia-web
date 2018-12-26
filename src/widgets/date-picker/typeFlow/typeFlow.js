/*
 * by wangcuixia
 * @flow
 * */
declare module '@lugia/lugia-web' {
  declare type publicProps = {
    format?: string,
    disabled?: boolean,
    readOnly?: boolean,
    onChange?: Function,
    onFocus?: Function,
    onBlur?: Function,
    firstWeekDay?: number,
    lang?: string,
    extraFooter?: Object,
    theme: Object,
    mode: string,
  };
  declare type propsRange = {
    defaultValue?: Array<string>,
    value?: Array<string>,
    placeholder?: Array<string>,
  };
  declare type propsExceptRange = {
    defaultValue?: string,
    value?: string,
    placeholder?: string,
  };
  declare type propsForDateWeeksAndRange = {
    selectToday?: boolean,
  };
  declare type propsForDateAndRange = {
    showToday?: Object,
    showTime?: Object,
    onOk?: any,
    ButtonOptions?: Object,
  };
  declare type propsForMonth = {
    data: Array<any>,
  };
  declare type DateInputProps = {
    ...propsExceptRange,
    ...publicProps,
    ...propsForDateAndRange,
  };
}
