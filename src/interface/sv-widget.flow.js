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
    onKeyUp?: (event: KeyboardEvent) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    onKeyPress?: (event: KeyboardEvent) => void;
    defaultValue?: string,
    value?: string
  |};


}
