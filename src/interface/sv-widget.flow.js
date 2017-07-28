//@flow
declare module 'sv-widget' {

  declare  type InputState = {|
    value: string,
  |};

  declare type GetValueArgType = {|
    defaultValue?: string,
    value?: string
  |};

  declare type InputProps = {|
    prefix?: React$Element<any>,
    suffix?: React$Element<any>,
    onChange?: (newValue: any, oldValue: any) => void,
    defaultValue?: string,
    value?: string
  |};


}
