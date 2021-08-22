//@flow
export type GetValueArgType = {| defaultValue?: any, value?: any |};
export type NodeExtendInfo = {
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

export type SelectType = 0 | 1 | 4;
export type NodeId2ExtendInfo = {} | { [string]: NodeExtendInfo };
export type NodeId2Checked = { [string]: boolean };
export type NodeId2Half = { [string]: number };
export type NodeId2SelectInfo = {
  checked: NodeId2Checked,
  halfchecked: NodeId2Half,
  value: NodeId2Checked,
};

export type ExpandInfo = { id2ExtendInfo: NodeId2ExtendInfo };

export type CommonCSS = {
  themeColor?: string,
  successColor?: string,
  warningColor?: string,
  dangerColor?: string,
  blackColor?: string,
  darkGreyColor?: string,
  disableTextColor?: string,
  mediumGreyColor?: string,
  lightGreyColor?: string,
  superLightColor?: string,
  disableColor?: string,
  defaultColor?: string,
  borderColor?: string,
  borderDisableColor?: string,
  borderSize?: number,
  boxShadowOpacity?: number,
  hShadow?: string,
  vShadow?: string,
  shadowSpread?: number,
  borderRadius?: number,
  circleBorderRadius?: string,
  transitionTime?: string,
  rulesColor?: string,
  rulesSize?: number,
  rulesOpacity?: number,
  padding?: number,
  paddingToText?: number,
  marginToSameElement?: number,
  marginToDifferentElement?: number,
  marginToPeerElementForY?: number,
  marginToSameElementForY?: number,
  marginToSonElement?: number,
};

export type QueryType = 'include' | 'start' | 'end' | 'eql';

export type ThemeType = {
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
export type WidthType = number;
export type HeightType = number;
export type MarginType = number | MarginObject;
export type BorderSizeType = number | BorderSizeObject;
export type ColorType = string;
export type RadiusType = number | RadiusSize;
export type OpacityType = number;

export type MarginObject = { top?: number, right?: number, bottom?: number, left?: number };
export type PositionType = { top?: number, right?: number, bottom?: number, left?: number };
export type BorderSizeObject = { top?: number, right?: number, bottom?: number, left?: number };

export type RadiusSize = {
  topLeft?: number,
  topRight?: number,
  bottomLeft?: number,
  bottomRight?: number,
};

export type ChangeEventParam = {
  newValue: any,
  oldValue: any,
  choseValue?: any,
  weeks?: any,
};

export type ChangeItemEventParam = ChangeEventParam & {
  newDisplayValue: any,
  oldDisplayValue: any,
  newItem: any,
  oldItem: any,
};

export type ListenerHandle = {
  removeListener: Function,
};

export type SelectItem = {
  selectColumn: number,
  selectRow: number,
};

export interface EventListener {
  on(eventName: string, cb: Function): ListenerHandle;

  once(eventName: string, cb: Function): ListenerHandle;

  take(eventName: string, count: number): Promise<any>;

  emit(eventName: string, param: Object): void;
}

export type EditTableEventListenerHandle = EventListener & {
  multipleSelect: boolean,
  canMoveCells: boolean,
  isShift: boolean,
  isKeyBoardDown: boolean,
  moveTrack: Array<Object>,
  keyDownListener: Object,
  enterMultipleSelect: Object,
  quitMultipleSelect: Object,
  enterMoveCells: Object,
  quitMoveCells: Object,
  shiftDown: Object,
  shiftUp: Object,
  enterMoveTrack: Object,
  quiteMoveTrack: Object,
  selectCell: Object,
  editCell: Object,
  updateSelectCellListener: Object,
  updateEditCellListener: Object,
  onKeyDown(e: Object): void,
  onKeyUp(e: Object): void,
  isMultiple(): boolean,
  isCanMoveCells(): boolean,
  isShiftDown(): boolean,
  getMoveTrack(): Array<Object>,
  setClickNumber(number: number): void,
  getClickNumber(): number,
  setUpdateDataKeyMap(props: Object): void,
  getKeyMaps(props: Object): Object,
  getSelectDataMark(index: number): Object,
  getSelectColumnMark(dataIndex: string): number,
  restColumnsIntoData(columns: Array<Object>): Array<Object>,
  isSelectSameItem(oldItem: SelectItem, currentItem: SelectItem): boolean,
  doStopPropagation(e: Object, isStop?: boolean): void,
  keyDownHandler: (e: Object) => void,
  keyUpHandler(e: Object): void,
  getThemeForTable(targetTheme: Object, defaultTheme: Object): Object,
  restColumnsWithRender(columns: ?Array<Object>, renderFunc: Function): Array<Object>,
  isSelected(currentItem: SelectItem, selectCell: SelectItem[]): boolean,
  isEditCell(currentItem: SelectItem, editCell: SelectItem): boolean,
  resetSelectRow(props: Object): Object,
  getCellItem(props: Object): Object,
  resetSelectRowFromArray(selectCell: SelectItem[]): Array<Object>,
  getClearSingleSelectCell(currentItem: SelectItem, selectCell: SelectItem[]): Array<Object>,
  resetItemName(selectItem: SelectItem): Object,
  getMovedCells(props: Object): Object,
  setInputChangedValue(props: Object): Object,
  changeData(
    data: Array<Object>,
    selectRow: number,
    keyName: ?string,
    value: string | number
  ): Array<Object>,
  changeColumns(props: Object): ?Array<Object>,
  onCellClick(props: Object): void,
  onCellDBClick(props: Object): void,
  clearSelectInfo(): void,
  isEqualArray(oldValue: ?Array<Object>, newValue: ?Array<Object>): boolean,
  getHeaderCell(props: Object): Object,
  focusTable(table: Object): void,
  updateSelectCell(selectCell: Object): void,
  updateEditCell(editCell: Object): void,
  getEditCell(): Object,
  getSelectCell(): Array<Object>,
};
