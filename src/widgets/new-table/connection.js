//@flow
import type { SelectItem } from '@lugia/lugia-web';
import Listener from '@lugia/listener';
import { deepMerge } from '@lugia/object-utils';

export default class EditTableEventListener extends Listener<any> {
  editing: boolean;
  multipleSelect: boolean;
  canMoveCells: boolean;
  isShift: boolean;
  isKeyBoardDown: boolean;
  clickNumber: number;
  moveTrack: Array<Object>;
  dataKeyMap: Object;
  keyDownListener: Object;
  enterMultipleSelect: Object;
  quitMultipleSelect: Object;
  enterMoveCells: Object;
  quitMoveCells: Object;
  shiftDown: Object;
  shiftUp: Object;
  enterMoveTrack: Object;
  quiteMoveTrack: Object;
  enterUpdateDataKeyMap: Object;

  constructor() {
    super();
    this.editing = false;
    this.multipleSelect = false;
    this.canMoveCells = false;
    this.isShift = false;
    this.isKeyBoardDown = false;
    this.moveTrack = [];
    this.clickNumber = 0;
    this.dataKeyMap = {
      columnsMap: {},
      dataMap: {},
    };

    this.keyDownListener = this.on('keyDown', this.onKeyDown);
    this.enterMultipleSelect = this.on('enterMultipleSelect', () => {
      this.multipleSelect = true;
    });
    this.quitMultipleSelect = this.on('quitMultipleSelect', () => {
      this.multipleSelect = false;
    });
    this.enterMoveCells = this.on('enterMoveCells', () => {
      this.canMoveCells = true;
    });
    this.quitMoveCells = this.on('quitMoveCells', () => {
      if (this.canMoveCells) {
        this.canMoveCells = false;
      }
    });
    this.shiftDown = this.on('shiftDown', () => {
      this.isShift = true;
    });
    this.shiftUp = this.on('shiftUp', () => {
      this.isShift = false;
    });
    this.enterMoveTrack = this.on('enterMoveTrack', (currentCell: Object) => {
      this.moveTrack = this.moveTrack.concat([currentCell]);
    });
    this.quiteMoveTrack = this.on('quiteMoveTrack', () => {
      this.moveTrack = [];
    });
    this.enterUpdateDataKeyMap = this.on('updateDataKeyMap', (props: Object) => {
      this.setUpdateDataKeyMap(props);
    });
  }

  onKeyDown = (e: Object) => {
    if (this.isKeyBoardDown) {
      return;
    }
    this.isKeyBoardDown = true;
    const { key, shiftKey } = e;

    if (shiftKey) {
      this.emit('shiftDown');
      this.emit('enterMultipleSelect');
      return;
    }
    if (this.isCanMoveCells()) {
      let directions;
      switch (key) {
        case 'ArrowLeft':
          directions = 'left';
          break;
        case 'ArrowUp':
          directions = 'top';
          break;
        case 'Enter':
          directions = 'backToBottom';
          break;
        case 'ArrowDown':
          directions = 'bottom';
          break;
        case 'ArrowRight':
        case 'Tab':
          directions = 'right';
          break;
        default:
          break;
      }
      this.emit('moveCells', { directions, key });
      if (key !== 'Tab' && key !== 'Enter') {
        this.emit('quiteMoveTrack');
      }
    }
  };
  onKeyUp = (e: Object) => {
    this.isKeyBoardDown = false;
    const { key } = e;
    if (key === 'Shift') {
      this.emit('shiftUp');
      this.emit('quitMultipleSelect');
    }
  };

  isMultiple = (): boolean => {
    return this.multipleSelect;
  };

  isCanMoveCells = (): boolean => {
    return this.canMoveCells;
  };

  isShiftDown = (): boolean => {
    return this.isShift;
  };

  getMoveTrack = (): Array<Object> => {
    return this.moveTrack;
  };

  getClickNumber = (): number => {
    return this.clickNumber;
  };

  setClickNumber = (number: number): void => {
    this.clickNumber = number;
  };

  setUpdateDataKeyMap = (props: Object): void => {
    this.dataKeyMap = this.getKeyMaps(props);
  };

  getKeyMaps = (props: Object) => {
    const { columns, data } = props;
    const dataKeyMap = { dataMap: {}, columnsMap: {} };
    data &&
      data.forEach((item: Object, index: number) => {
        dataKeyMap.dataMap[index] = { ...item };
      });
    columns &&
      columns.forEach((item: Object, index: number) => {
        const { dataIndex } = item;
        dataKeyMap.columnsMap[dataIndex] = index;
      });
    return dataKeyMap;
  };

  getSelectColumnMark = (dataIndex: number): number => {
    return this.dataKeyMap.columnsMap[dataIndex];
  };

  getSelectDataMark = (index: number): Object => {
    return this.dataKeyMap.dataMap[index];
  };

  restColumnsIntoData = (columns: Array<Object>): Array<Object> => {
    if (!columns || columns.length === 0) {
      return [];
    }
    const rowDataItem = {};
    columns.forEach(item => {
      const { title, dataIndex } = item;
      rowDataItem[dataIndex] = title;
      rowDataItem.isHead = true;
    });
    return [rowDataItem];
  };

  isSelectSameItem = (oldItem: SelectItem, currentItem: SelectItem): boolean => {
    if (!oldItem || !currentItem) {
      return false;
    }
    const { selectColumn: oldSelectColumn, selectRow: oldSelectRow } = oldItem;
    const { selectColumn, selectRow } = currentItem;
    return selectColumn === oldSelectColumn && selectRow === oldSelectRow;
  };

  doStopPropagation = (e: any, isStop?: boolean): void => {
    e = e || window.event;
    if (e.stopPropagation) {
      e.stopPropagation();
      isStop && e.preventDefault();
    } else {
      e.cancelBubble = true;
    }
  };

  keyDownHandler = (props: Object) => (e: Object): void => {
    const { isInTarget } = props;
    this.doStopPropagation(e, isInTarget);
    const { key } = e;
    const isMultiple = this.isMultiple();
    if (key.length === 1 && !isMultiple) {
      this.emit('quitMoveCells');
      this.emit('enterEditing');
      return;
    }
    this.onKeyDown(e);
  };

  keyUpHandler = (e: Object): void => {
    this.doStopPropagation(e);
    this.onKeyUp(e);
  };

  getThemeForTable = (targetTheme: Object, defaultTheme: Object): Object => {
    const { theme, viewClass } = targetTheme;
    const resultTheme = deepMerge({ [viewClass]: defaultTheme }, theme);
    return { theme: resultTheme, viewClass };
  };

  restColumnsWithRender = (columns: ?Array<Object>, renderFunc: Function): Array<Object> => {
    if (!columns) {
      return [];
    }
    const newCols = [];
    columns.forEach((item: Object) => {
      const { render } = item;
      const newItem = { ...item };
      if (render) {
        newItem.customRender = render;
      }
      newItem.render = (text, record, index) => {
        return renderFunc({ text, record, index, ...newItem });
      };
      newCols.push(newItem);
    });
    return newCols;
  };

  isSelected = (currentItem: SelectItem, selectCell: SelectItem[]): boolean => {
    if (!selectCell || selectCell.length === 0) {
      return false;
    }
    return selectCell.some(item => {
      return this.isSelectSameItem(item, currentItem);
    });
  };

  isEditCell = (currentItem: Object, editCell: Object): boolean => {
    if (!editCell) {
      return false;
    }
    return this.isSelectSameItem(editCell, currentItem);
  };

  resetSelectRow = (props: Object): Object => {
    const { currentItem, newValue, oldValue, columns } = props;
    const newItem = { ...currentItem };
    const newValueRes = this.resetSelectRowFromArray(newValue);
    const oldValueRes = this.resetSelectRowFromArray(oldValue);
    const currentInfo = this.getCellItem({ newItem, columns });
    return { currentItem: currentInfo, newValue: newValueRes, oldValue: oldValueRes };
  };

  getCellItem = (props: Object): Object => {
    const { newItem = {}, columns } = props;
    const { selectColumn, selectRow } = newItem;
    if (!selectColumn || !selectRow) {
      return {};
    }
    const dataItem = this.getSelectDataMark(selectRow - 1);
    const columnItem = columns[selectColumn].dataIndex;
    return {
      currentCell: { [columnItem]: dataItem[columnItem] },
      record: dataItem,
      cellIndex: this.resetItemName(newItem),
    };
  };

  resetSelectRowFromArray = (selectCell: SelectItem[]): Array<Object> => {
    if (!selectCell || selectCell.length === 0) {
      return [];
    }
    return [...selectCell].map(item => {
      return this.resetItemName(item);
    });
  };

  resetItemName = (selectItem: SelectItem): Object => {
    const newItem = {};
    const { selectColumn, selectRow } = selectItem;
    newItem.rowIndex = selectRow - 1;
    newItem.columnIndex = selectColumn;
    return newItem;
  };

  getClearSingleSelectCell = (currentItem: Object, selectCell: Array<Object>): Array<Object> => {
    const newSelectCell = [];
    selectCell.forEach(item => {
      if (!this.isSelectSameItem(item, currentItem)) {
        newSelectCell.push(item);
      }
    });
    return newSelectCell;
  };

  getMovedCells = (props: Object): ?Object => {
    const { directions, key, selectCell } = props;

    if (!selectCell || selectCell.length <= 0) {
      return;
    }
    let { selectColumn, selectRow } = selectCell[0];
    if ((!selectColumn && selectColumn !== 0) || (!selectRow && selectRow !== 0)) {
      return;
    }
    switch (directions) {
      case 'left':
        selectColumn -= 1;
        break;
      case 'right':
        selectColumn += 1;
        break;
      case 'top':
        selectRow -= 1;
        break;
      case 'bottom':
        selectRow += 1;
        break;
      case 'backToBottom':
        const moveTrack = this.getMoveTrack();
        if (moveTrack && moveTrack.length > 0) {
          selectColumn = moveTrack[0].selectColumn;
        }
        selectRow += 1;
        break;
      default:
        break;
    }

    const { data = [], columns = [] } = props;
    const maxColumn = columns.length && columns.length - 1;
    const maxData = data.length || 0;
    selectColumn = Math.max(Math.min(maxColumn, selectColumn), 0);
    selectRow = Math.max(Math.min(maxData, selectRow), 0);
    if (key && key === 'Tab' && selectCell) {
      this.emit('enterMoveTrack', selectCell[0]);
    }
    return { selectColumn, selectRow };
  };

  setInputChangedValue = (props: Object): Object => {
    const { value, editing } = props;
    if (editing) {
      const { editCell: { selectColumn, selectRow } = {}, data, columns } = props;
      let keyName = null;
      columns.forEach(col => {
        const { dataIndex } = col;
        const currentMark = this.getSelectColumnMark(dataIndex);
        if (currentMark === selectColumn) {
          keyName = dataIndex;
        }
      });
      const newRowData = JSON.parse(JSON.stringify(data));
      newRowData[selectRow - 1][keyName] = value;
      return { data: newRowData };
    }
  };

  onCellClick = (props: Object): void => {
    const { e } = props;
    let count = this.getClickNumber();
    this.doStopPropagation(e);
    count += 1;
    this.setClickNumber(count);
    setTimeout(() => {
      const { selectColumn, selectRow, selectCell = [] } = props;
      const currentCell = { selectColumn, selectRow };
      if (count === 1) {
        const isSelect = this.isSelected(currentCell, selectCell);
        let selectCellResult = [currentCell];
        let currentItem = currentCell;
        if (isSelect) {
          this.emit('quitMoveCells');
          selectCellResult = this.getClearSingleSelectCell(currentCell, selectCell);
          currentItem = {};
        }
        this.setClickNumber(0);
        this.emit('quiteMoveTrack');
        this.emit('enterMoveTrack', currentCell);
        const isMultiple = this.isMultiple();

        if (isMultiple && !isSelect) {
          selectCellResult = selectCell.concat(selectCellResult);
        } else {
          this.emit('enterMoveCells');
        }
        this.emit('setState', { selectCell: selectCellResult, editCell: currentItem });
        const { isHead } = props;
        !isHead &&
          this.emit('exportOnCell', {
            currentItem,
            newValue: selectCellResult,
            oldValue: selectCell,
          });
      } else if (count === 2) {
        this.setClickNumber(0);
        this.emit('quitMoveCells');
        this.emit('quiteMoveTrack');
        this.emit('setState', { editing: true, editCell: currentCell });
      }
    }, 200);
  };

  isEqualArray = (oldValue: ?Array<Object>, newValue: ?Array<Object>): boolean => {
    return JSON.stringify(oldValue) === JSON.stringify(newValue);
  };

  componentWillUnmount(): void {
    this.keyDownListener.removeListener();
    this.enterMultipleSelect.removeListener();
    this.quitMultipleSelect.removeListener();
    this.enterMoveCells.removeListener();
    this.quitMoveCells.removeListener();
    this.shiftDown.removeListener();
    this.shiftUp.removeListener();
    this.enterMoveTrack.removeListener();
    this.quiteMoveTrack.removeListener();
    this.enterUpdateDataKeyMap.removeListener();
  }
}
