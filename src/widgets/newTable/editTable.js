//@flow
import React from 'react';
import Table from './table';
import ThemeProvider from '../theme-provider';
import EditInput from './EditInput';
import type { EditTableProps } from './editTableCss';

import { Container, EditDiv, InnerTriggerDiv } from './editTableCss';
import KeyBoardEventListener from './connection';
import Widget from '../consts';
import { findDOMNode } from 'react-dom';

export const restColumnsIntoData = (columns: Array<Object>) => {
  if (!columns) {
    return [];
  }
  const rowDataItem = {};
  columns.forEach(item => {
    const { title, dataIndex } = item;
    rowDataItem[dataIndex] = title;
  });
  return [rowDataItem];
};

export const setFirstRowAsHead = rowData => {
  if (!rowData) return rowData;
  const newData = [...rowData];
  newData[0].isHead = true;
  return newData;
};

export const clearFirstRowAsHead = (rowData: Array) => {
  const newRowData = [];
  rowData.forEach(item => {
    const { isHead } = item;
    if (!isHead) {
      newRowData.push({ ...item });
    }
  });
  return newRowData;
};

export const restDataWithMark = (data: Array<Object>) => {
  if (!data) return;
  const newData = [];
  data.forEach((item, index) => {
    const { lugiaMark: oldMark } = item;
    const newItem = { ...item };
    newItem.lugiaMark = oldMark || index;
    newData.push(newItem);
  });
  return newData;
};

const clearLugiaMarkAndResetRender = (data: Array) => {
  const newData = [];
  data.forEach(item => {
    const newItem = { ...item };
    delete newItem.lugiaMark;
    delete newItem.render;
    const { customRender } = newItem;
    if (customRender) {
      newItem.render = customRender;
    }
    delete newItem.customRender;
    newData.push({ ...newItem });
  });
  return newData;
};

const isSelectSameItem = (oldItem, currentItem) => {
  if (!oldItem || !currentItem) {
    return false;
  }
  const { selectColumn: oldSelectColumn, selectRow: oldSelectRow } = oldItem;
  const { selectColumn, selectRow } = currentItem;
  return selectColumn === oldSelectColumn && selectRow === oldSelectRow;
};

const doStopPropagation = (e: any, isStop?: boolean) => {
  e = e || window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
    isStop && e.preventDefault();
  } else {
    e.cancelBubble = true;
  }
};

class EditTable extends React.Component<EditTableProps, Object> {
  keyDownHandler: any;
  keyUpHandler: any;
  KeyBoardListener: any;
  count: number;
  Table: any;

  constructor(props: EditTableProps) {
    super(props);
    const { columns, data = [] } = props;
    const dataWidthColumn = setFirstRowAsHead(restColumnsIntoData(columns)).concat(data);
    this.count = 0;
    this.KeyBoardListener = new KeyBoardEventListener();
    this.state = {
      columns: this.restColumnsWithMark(columns),
      data: restDataWithMark(dataWidthColumn),
      selectCell: [],
      editCell: null,
      editing: false,
    };

    this.KeyBoardListener.on('moveCells', (props: Object) => {
      this.doMoveCells(props);
    });
    this.KeyBoardListener.on('quitEdit', (res: Object) => {
      this.quitEdit(res);
    });
  }

  componentDidMount() {
    this.keyDownHandler = (e: Object) => {
      const isInTarget = findDOMNode(this.Table.getThemeTarget()) === document.activeElement;
      doStopPropagation(e, isInTarget);
      const { key } = e;
      const isMultiple = this.KeyBoardListener.isMultiple();
      if (key.length === 1 && !isMultiple) {
        this.KeyBoardListener.emit('quitMoveCells');
        this.setState({ editing: true });
        return;
      }
      this.KeyBoardListener.onKeyDown(e);
    };
    this.keyUpHandler = (e: Object) => {
      doStopPropagation(e);
      const { editing } = this.state;
      if (editing) {
        return;
      }
      this.KeyBoardListener.onKeyUp(e);
    };

    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }

  render() {
    const { data = [], columns = [] } = this.state;
    const { tableSize, tableStyle } = this.props;
    const tableProps = { tableSize, tableStyle };
    const containerTheme = this.props.getPartOfThemeProps('Container');
    const TableTheme = this.props.getPartOfThemeHocProps('Table');

    return (
      <Container themeProps={containerTheme}>
        <Table
          ref={el => (this.Table = el)}
          {...TableTheme}
          data={data}
          columns={columns}
          {...tableProps}
          showHeader={false}
        />
      </Container>
    );
  }

  restColumnsWithMark = (columns: Array<Object>) => {
    if (!columns) return;
    const newCols = [];
    columns.forEach((item, index) => {
      const { lugiaMark: oldMark, render } = item;
      const newItem = { ...item };
      const lugiaMark = oldMark || index;
      newItem.lugiaMark = lugiaMark;
      newItem.customRender = render;
      newItem.render = (text, record, index) => {
        return this.renderFunc({ text, record, index, selectColumn: lugiaMark, ...newItem });
      };
      newCols.push(newItem);
    });
    return newCols;
  };

  renderFunc = (renderObject: Object) => {
    const { text, record, selectColumn } = renderObject;
    const defaultText =
      typeof text !== 'object' && (text || text === 0) ? record[text] || text : '';
    const { lugiaMark: selectRow, isHead } = record;
    const { editing } = this.state;
    const isSelect = !editing && this.isSelected({ selectColumn, selectRow });
    const { isEditHead } = this.props;
    const headEdit = isEditHead ? true : selectRow !== 0;
    const enterEdit = headEdit && editing && this.isEditCell({ selectColumn, selectRow });

    const renderPros = {
      defaultText,
      isSelect,
      isHead,
      enterEdit,
      selectRow,
      ...renderObject,
    };

    return this.getRenderTarget(renderPros);
  };

  getRenderTarget = (renderObject: Object) => {
    const {
      defaultText,
      isSelect,
      isHead,
      enterEdit,
      customEditElement,
      editType,
      selectData,
    } = renderObject;
    const EditElement = customEditElement || EditInput;
    const editDivTheme = this.props.getPartOfThemeProps('EditTarget', {
      props: { isSelect, isHead },
    });

    if (enterEdit) {
      return (
        <EditDiv themeProps={editDivTheme} className={'EditDiv'}>
          <EditElement
            value={defaultText}
            autoFocus={true}
            type={editType}
            listener={this.KeyBoardListener}
            data={selectData}
          />
        </EditDiv>
      );
    }

    const { text, record, index, selectColumn, selectRow, customRender } = renderObject;
    const { selectSuffixElement } = this.props;
    return (
      <EditDiv
        themeProps={editDivTheme}
        isSelect={isSelect}
        isHead={isHead}
        onClick={e => this.onCellClick(e, selectColumn, selectRow)}
      >
        {customRender && !isHead ? customRender(text, record, index) : defaultText.toString()}
        {isSelect && selectSuffixElement ? (
          <InnerTriggerDiv>{selectSuffixElement}</InnerTriggerDiv>
        ) : null}
      </EditDiv>
    );
  };

  quitEdit = (res: Object) => {
    const { oldValue, newValue } = res;
    if (oldValue !== newValue) {
      this.setInputChangedValue(newValue);
    }
    this.clearEditState();
  };

  clearEditState = () => {
    this.KeyBoardListener.emit('enterMoveCells');
    this.setState({ editing: false, editCell: null });
  };

  setInputChangedValue = value => {
    const { editing } = this.state;

    if (editing) {
      const {
        editCell: { selectColumn, selectRow },
        data,
        columns,
      } = this.state;
      let keyName = null;
      columns.forEach(col => {
        const { lugiaMark } = col;
        if (lugiaMark === selectColumn) {
          keyName = col.dataIndex;
        }
      });
      const newRowData = [...data];
      newRowData[selectRow][keyName] = value;
      this.setState({ data: newRowData });
      this.exportChange({ columns, data: newRowData });
    }
  };

  exportChange = (res: Object) => {
    const { columns, data } = res;
    res.data = clearLugiaMarkAndResetRender(clearFirstRowAsHead(data));
    res.columns = clearLugiaMarkAndResetRender(columns);
    const { onChange } = this.props;
    onChange && onChange(res);
  };

  exportOnCell = (res: Object) => {
    const { onCell } = this.props;
    onCell && onCell(this.resetSelectRow({ ...res }));
  };

  resetSelectRow = (res: Object) => {
    const { currentItem, newValue, oldValue } = res;
    const newItem = { ...currentItem };
    const { selectRow } = newItem;
    newItem.selectRow = selectRow - 1;
    const newValueRes = this.resetSelectRowFromArray(newValue);
    const oldValueRes = this.resetSelectRowFromArray(oldValue);
    return { currentItem: newItem, newValue: newValueRes, oldValue: oldValueRes };
  };

  resetSelectRowFromArray = (selectInfo: Object) => {
    if (!selectInfo || selectInfo.length === 0) {
      return selectInfo;
    }
    return [...selectInfo].map(item => {
      const newItem = { ...item };
      const { selectRow } = newItem;
      newItem.selectRow = selectRow - 1;
      return newItem;
    });
  };

  onCellClick = (e: Object, selectColumn: number, selectRow: number) => {
    this.onStopPropagation(e);
    this.count += 1;

    setTimeout(() => {
      if (this.count === 1) {
        const { selectCell = [] } = this.state;
        const isSelect = this.isSelected({ selectColumn, selectRow });
        let selectCellResult = [{ selectColumn, selectRow }];
        let currentItem = { selectColumn, selectRow };
        if (isSelect) {
          this.KeyBoardListener.emit('quitMoveCells');
          selectCellResult = this.getClearSingleSelectCell({ selectColumn, selectRow });
          currentItem = null;
        }
        this.clearCount();
        this.KeyBoardListener.emit('quiteMoveTrack');
        this.KeyBoardListener.emit('enterMoveTrack', { selectColumn, selectRow });
        const isMultiple = this.KeyBoardListener.isMultiple();

        if (isMultiple) {
          selectCellResult = selectCell.concat(selectCellResult);
        } else {
          this.KeyBoardListener.emit('enterMoveCells');
        }
        this.setState({
          selectCell: selectCellResult,
          editCell: currentItem,
        });
        this.exportOnCell({ currentItem, newValue: selectCellResult, oldValue: selectCell });
      } else if (this.count === 2) {
        this.clearCount();
        this.KeyBoardListener.emit('quiteMoveTrack');
        this.setState({
          editing: true,
          editCell: { selectColumn, selectRow },
        });
      }
    }, 200);
  };

  clearCount = () => {
    this.count = 0;
  };

  getClearSingleSelectCell = (currentItem: Object) => {
    const { selectCell = [] } = this.state;
    const newSelectCell = [];
    selectCell.forEach(item => {
      if (!isSelectSameItem(item, currentItem)) {
        newSelectCell.push(item);
      }
    });
    return newSelectCell;
  };

  isSelected = (currentItem: Object) => {
    const { selectCell } = this.state;
    if (!selectCell || selectCell.length === 0) {
      return false;
    }
    return selectCell.some(item => {
      return isSelectSameItem(item, currentItem);
    });
  };

  isEditCell = (currentItem: Object) => {
    const { editCell } = this.state;
    if (!editCell) {
      return false;
    }
    return isSelectSameItem(editCell, currentItem);
  };

  onStopPropagation = (e: any) => {
    e.stopPropagation();
  };

  doMoveCells = (props: Object) => {
    const { directions, key } = props;
    const { selectCell } = this.state;
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
        const moveTrack = this.KeyBoardListener.getMoveTrack();
        if (moveTrack && moveTrack.length > 0) {
          selectColumn = moveTrack[0].selectColumn;
        }
        selectRow += 1;
        break;
      default:
        break;
    }

    const { data = [], columns = [] } = this.state;
    const maxColumn = columns.length - 1;
    const maxData = data.length - 1;
    selectColumn = Math.max(Math.min(maxColumn, selectColumn), 0);
    selectRow = Math.max(Math.min(maxData, selectRow), 0);
    if (key && key === 'Tab' && selectCell) {
      this.KeyBoardListener.emit('enterMoveTrack', selectCell[0]);
    }
    this.exportOnCell({
      currentItem: { selectColumn, selectRow },
      newValue: [{ selectColumn, selectRow }],
      oldValue: selectCell,
    });
    this.setState({
      selectCell: [{ selectColumn, selectRow }],
      editCell: { selectColumn, selectRow },
    });
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }
}

export default ThemeProvider(EditTable, Widget.EditTable);
