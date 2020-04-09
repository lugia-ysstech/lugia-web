//@flow
import { deepMerge } from '@lugia/object-utils';

export const defaultTableTheme = {
  Td: { normal: { padding: 0 } },
};

export const restColumnsIntoData = (columns: Array<Object>): Array<Object> => {
  if (!columns) {
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

export const isSelectSameItem = (oldItem: Object, currentItem: Object): boolean => {
  if (!oldItem || !currentItem) {
    return false;
  }
  const { selectColumn: oldSelectColumn, selectRow: oldSelectRow } = oldItem;
  const { selectColumn, selectRow } = currentItem;
  return selectColumn === oldSelectColumn && selectRow === oldSelectRow;
};

export const doStopPropagation = (e: any, isStop?: boolean): void => {
  e = e || window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
    isStop && e.preventDefault();
  } else {
    e.cancelBubble = true;
  }
};

export const keyDownHandler = (props: Object) => (e: Object): void => {
  const { isInTarget, EditTableListener } = props;
  doStopPropagation(e, isInTarget);
  const { key } = e;
  const isMultiple = EditTableListener && EditTableListener.isMultiple();
  if (key.length === 1 && !isMultiple) {
    EditTableListener.emit('quitMoveCells');
    EditTableListener.emit('enterEditing');
    return;
  }
  EditTableListener.onKeyDown(e);
};

export const keyUpHandler = (props: Object) => (e: Object): void => {
  const { EditTableListener } = props;
  doStopPropagation(e);
  EditTableListener.onKeyUp(e);
};

export const getThemeForTable = (targetTheme: Object, defaultTheme: Object): Object => {
  const { theme, viewClass } = targetTheme;
  const resultTheme = deepMerge({ [viewClass]: defaultTheme }, theme);
  return { theme: resultTheme, viewClass };
};

export const restColumnsWithRender = (
  columns: ?Array<Object>,
  renderFunc: Function
): Array<Object> => {
  if (!columns) {
    return [];
  }
  const newCols = [];
  columns.forEach((item: Object) => {
    const { render } = item;
    const newItem = { ...item };
    newItem.customRender = render;
    newItem.render = (text, record, index) => {
      return renderFunc({ text, record, index, ...newItem });
    };
    newCols.push(newItem);
  });
  return newCols;
};

export const isSelected = (currentItem: Object, selectCell: Object): boolean => {
  if (!selectCell || selectCell.length === 0) {
    return false;
  }
  return selectCell.some(item => {
    return isSelectSameItem(item, currentItem);
  });
};

export const isEditCell = (currentItem: Object, editCell: Object): boolean => {
  if (!editCell) {
    return false;
  }
  return isSelectSameItem(editCell, currentItem);
};

export const resetSelectRow = (res: Object): Object => {
  const { currentItem, newValue, oldValue, EditTableListener, columns } = res;
  const newItem = { ...currentItem };
  const newValueRes = resetSelectRowFromArray(newValue);
  const oldValueRes = resetSelectRowFromArray(oldValue);
  const currentInfo = getCellItem({ newItem, EditTableListener, columns });
  return { currentItem: currentInfo, newValue: newValueRes, oldValue: oldValueRes };
};

export const getCellItem = (props: Object) => {
  const { newItem, EditTableListener, columns } = props;
  const { selectColumn, selectRow } = newItem;
  if (!selectColumn || !selectRow) {
    return {};
  }
  const dataItem = EditTableListener.getSelectDataMark(selectRow - 1);
  const columnItem = columns[selectColumn].dataIndex;
  return {
    currentCell: { [columnItem]: dataItem[columnItem] },
    record: dataItem,
    cellIndex: resetItemName(newItem),
  };
};

export const resetSelectRowFromArray = (selectInfo: Object): Array<Object> => {
  if (!selectInfo || selectInfo.length === 0) {
    return [];
  }
  return [...selectInfo].map(item => {
    return resetItemName(item);
  });
};

export const resetItemName = (item: Object) => {
  const newItem = {};
  const { selectColumn, selectRow } = item;
  newItem.rowIndex = selectRow - 1;
  newItem.columnIndex = selectColumn;
  return newItem;
};

export const getClearSingleSelectCell = (
  currentItem: Object,
  selectCell: Array<Object>
): Array<Object> => {
  const newSelectCell = [];
  selectCell.forEach(item => {
    if (!isSelectSameItem(item, currentItem)) {
      newSelectCell.push(item);
    }
  });
  return newSelectCell;
};

export const getMovedCells = (props: Object): ?Object => {
  const { directions, key, selectCell, EditTableListener } = props;

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
      const moveTrack = EditTableListener.getMoveTrack();
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
    EditTableListener.emit('enterMoveTrack', selectCell[0]);
  }
  return { selectColumn, selectRow };
};

export const setInputChangedValue = (props: Object): Object => {
  const { value, editing } = props;
  if (editing) {
    const { editCell: { selectColumn, selectRow } = {}, data, columns, EditTableListener } = props;
    let keyName = null;
    columns.forEach(col => {
      const { dataIndex } = col;
      const currentMark = EditTableListener.getSelectColumnMark(dataIndex);
      if (currentMark === selectColumn) {
        keyName = dataIndex;
      }
    });
    const newRowData = JSON.parse(JSON.stringify(data));
    newRowData[selectRow - 1][keyName] = value;
    return { data: newRowData };
  }
};

export const onCellClick = (props: Object) => {
  const { e, EditTableListener } = props;
  let count = EditTableListener.getClickNumber();
  doStopPropagation(e);
  count += 1;
  EditTableListener.setClickNumber(count);
  setTimeout(() => {
    const { selectColumn, selectRow, selectCell = [] } = props;
    const currentCell = { selectColumn, selectRow };
    if (count === 1) {
      const isSelect = isSelected(currentCell, selectCell);
      let selectCellResult = [currentCell];
      let currentItem = currentCell;
      if (isSelect) {
        EditTableListener.emit('quitMoveCells');
        selectCellResult = getClearSingleSelectCell(currentCell, selectCell);
        currentItem = {};
      }
      EditTableListener.setClickNumber(0);
      EditTableListener.emit('quiteMoveTrack');
      EditTableListener.emit('enterMoveTrack', currentCell);
      const isMultiple = EditTableListener.isMultiple();

      if (isMultiple) {
        selectCellResult = selectCell.concat(selectCellResult);
      } else {
        EditTableListener.emit('enterMoveCells');
      }
      EditTableListener.emit('setState', { selectCell: selectCellResult, editCell: currentItem });
      EditTableListener.emit('exportOnCell', {
        currentItem,
        newValue: selectCellResult,
        oldValue: selectCell,
      });
    } else if (count === 2) {
      EditTableListener.setClickNumber(0);
      EditTableListener.emit('quitMoveCells');
      EditTableListener.emit('quiteMoveTrack');
      EditTableListener.emit('setState', { editing: true, editCell: currentCell });
    }
  }, 200);
};

export const isEqualArray = (oldValue?: Array<Object>, newValue?: Array<Object>): boolean => {
  return JSON.stringify(oldValue) === JSON.stringify(newValue);
};
