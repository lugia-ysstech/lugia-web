declare module 'vx-widget/input' {
  declare  type State = {| focused: boolean, |};
  declare type Props = {
    onChange?: (old: any, value: any) => void,
    defaultValue?: string,
    value?: string
  };
}
