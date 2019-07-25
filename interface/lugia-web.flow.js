//@flow
declare module '@lugia/lugia-web' {
  declare type GetValueArgType = {| defaultValue?: any, value?: any |};
  declare type NodeExtendInfo = {
    childrenIdx?: Array<number>,
    can: boolean,
    canTotal?: number, // 当前可见节点数
    nowVisible?: number, // 真实可见节点数
    realyVisible?: number, // 子节点树
    children?: number, // 子孙节点数
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

  declare type ExpandInfo = { id2ExtendInfo: NodeId2ExtendInfo };

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
    shadowSpread?: number,
    borderRadius?: number,
    circleBorderRadius?: string,
    transitionTime?: string,
    rulesColor?: string,
    rulesSize?: string,
    rulesOpacity?: string,
    padding?: number,
    paddingToText?: number,
    marginToSameElement?: number,
    marginToDifferentElement?: number,
    marginToPeerElementForY?: number,
    marginToSameElementForY?: number,
    marginToSonElement?: number,
  };

  declare type QueryType = 'include' | 'start' | 'end' | 'eql';

  declare type ThemeType = {
    width?: WidthType,
    height?: HeightType,
    margin?: MarginType,
    padding?: MarginType,
    color?: ColorType,
    borderColor?: ColorType,
    backgroundColor?: ColorType,
    borderRadius?: RadiusType,
    borderSize?: BorderSizeType,
    position?: PositionType,
    opacity?: OpacityType,
  };
  declare type WidthType = number;
  declare type HeightType = number;
  declare type MarginType = number | MarginObject;
  declare type BorderSizeType = number | BorderSizeObject;
  declare type ColorType = string;
  declare type RadiusType = number | RadiusSize;
  declare type OpacityType = number;

  declare type MarginObject = { top?: number, right?: number, bottom?: number, left?: number };
  declare type PositionType = { top?: number, right?: number, bottom?: number, left?: number };
  declare type BorderSizeObject = { top?: number, right?: number, bottom?: number, left?: number };

  declare type RadiusSize = {
    topLeft?: number,
    topRight?: number,
    bottomLeft?: number,
    bottomRight?: number,
  };

  declare type ChangeEventParam = {
    newValue: any,
    oldValue: any,
    choseValue?: any,
    weeks?: any,
  };
  declare type ChangeItemEventParam = ChangeEventParam & {
    newDisplayValue: any,
    oldDisplayValue: any,
    newItem: any,
    oldItem: any,
  };
}
