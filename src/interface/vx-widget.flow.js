//@flow
declare module 'vx-widget/input' {

  declare  type State = {| focused: boolean, |};
  declare type Props = {
    prefix?:  React$Element<any>,
    suffix?:  React$Element<any>,
    onChange?: (old: any, value: any) => void,
    defaultValue?: string,
    value?: string
  };
}
