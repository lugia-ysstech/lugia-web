//@flow
declare module 'sv-widget' {

  declare type GetValueArgType = {|
    defaultValue?: any,
    value?: any
  |};
  declare type NodeExtendInfo = {
    childrenIdx?: Array<number>,
    // 当前可见节点数
    nowVisible?: number,
    // 真实可见节点数
    realyVisible?: number,
    // 子节点树
    children?: number,
    // 子孙节点数
    begats?: number,
    index: number,
    expanded?: boolean,
  }

  declare type SelectType = 0 | 1 | 2;
  declare type NodeId2ExtendInfo = {} | { [string]: NodeExtendInfo } ;
  declare type NodeId2Checked = { [string]: boolean };
  declare type NodeId2SelectInfo = {
    checked: NodeId2Checked,
    halfchecked: NodeId2Checked,
    value: NodeId2Checked,
  };
}
