//@flow
declare module '@lugia/lugia-web' {
  declare type GetValueArgType = {|
    defaultValue?: any,
    value?: any,
  |};
  declare type NodeExtendInfo = {
    childrenIdx?: Array<number>,
    can: boolean,
    canTotal?: number,
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
  };

  declare type SelectType = 0 | 1 | 4;
  declare type NodeId2ExtendInfo = {} | { [string]: NodeExtendInfo };
  declare type NodeId2Checked = { [string]: boolean };
  declare type NodeId2Half = { [string]: number };
  declare type NodeId2SelectInfo = {
    checked: NodeId2Checked,
    halfchecked: NodeId2Half,
    value: NodeId2Checked,
  };

  declare type ExpandInfo = {
    id2ExtendInfo: NodeId2ExtendInfo,
  };

  declare type CommonCSS = {
    themeColor?: string,
    successColor?: string,
    warningColor?: string,
    dangerColor?: string,
    blackColor?: string,
    darkGreyColor?: string,
    mediumGreyColor?: string,
    lightGreyColor?: string,
    superLightColor?: string,
    disableColor?: string,
    defaultColor?: string,
    borderColor?: string,
    borderDisableColor?: string,
    borderSize?: string,
    boxShadowOpacity?: string,
    hShadow?: string,
    vShadow?: string,
    shadowSpread?: string,
    borderRadius?: string,
    circleBorderRadius?: string,
    transitionTime?: string,
    rulesColor?: string,
    rulesSize?: string,
    rulesOpacity?: string,
    padding?: string,
    paddingToText?: string,
    marginToSameElement?: string,
    marginToDifferentElement?: string,
    marginToPeerElementForY?: string,
    marginToSameElementForY?: string,
    marginToSonElement?: string,
  };

  declare type QueryType = 'include' | 'start' | 'end' | 'eql';

  declare type ThemeType = {
    width: WidthType,
    margin: MarginType,
    color: ColorType,
  };
  declare type WidthType = number;
  declare type MarginType = number | MarginObject;
  declare type ColorType = string;
  declare type MarginObject = {
    top: number,
    right: number,
    bottom: number,
    left: number,
  };
}
