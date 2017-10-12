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
  declare type NodeId2ExtendInfo = { [nodeId: string]: NodeExtendInfo } ;
}
