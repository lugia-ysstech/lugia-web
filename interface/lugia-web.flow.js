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

  declare type ListenerHandle = {
    removeListener: Function,
  };

  declare type SelectItem = {
    selectColumn: number,
    selectRow: number,
  };

  declare interface EventListener {
    on(eventName: string, cb: Function): ListenerHandle;

    once(eventName: string, cb: Function): ListenerHandle;

    take(eventName: string, count: number): Promise<any>;

    emit(eventName: string, param: Object): void;
  }

  declare type EditTableEventListenerHandle = EventListener & {
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
}
