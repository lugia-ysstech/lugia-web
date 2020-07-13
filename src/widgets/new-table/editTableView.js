//@flow
import type { EditTableEventListenerHandle } from '@lugia/lugia-web';
import React from 'react';
import Table from './table';
import ThemeProvider from '../theme-provider';
import type { EditTableProps, EditTableState } from './editTableCss';
import { Container } from './editTableCss';
import EditTableEventListener from './connection';
import TableCell from './tableCell';
import Widget from '../consts';
import { findDOMNode } from 'react-dom';
import { isEqualArray } from './utils';

class EditTable extends React.Component<EditTableProps, EditTableState> {
  editTableListener: EditTableEventListenerHandle;
  table: any;
  moveCellsListener: Object;
  quitEditListener: Object;
  setStateListener: Object;
  exportOnCellListener: Object;
  exportOnHeaderCellListener: Object;

  static defaultProps = {
    allowEditHead: true,
    showHeader: true,
  };

  constructor(props: EditTableProps) {
    super(props);
    const { columns, data = [], rowKey } = props;

    this.editTableListener = new EditTableEventListener();
    this.editTableListener.emit('updateDataKeyMap', { columns, data, rowKey });
    this.moveCellsListener = this.editTableListener.on('moveCells', (props: Object) => {
      this.doMoveCells(props);
    });
    this.quitEditListener = this.editTableListener.on('quitEdit', (res: Object) => {
      this.quitEdit(res);
    });

    this.setStateListener = this.editTableListener.on('setState', (res: Object) => {
      this.doSetState(res);
    });
    this.exportOnCellListener = this.editTableListener.on('exportOnCell', (res: Object) => {
      this.exportOnCell(res);
    });
    this.exportOnHeaderCellListener = this.editTableListener.on(
      'exportOnHeaderCell',
      (res: Object) => {
        this.exportOnHeaderCell(res);
      }
    );
  }

  shouldComponentUpdate(nextProps: EditTableProps, nextState: EditTableState) {
    const { data: oldData, columns: oldColumns } = this.props;
    const { data, columns, rowKey } = nextProps;
    const isUpdateValue = !isEqualArray(oldData, data) || !isEqualArray(oldColumns, columns);
    if (isUpdateValue) {
      this.editTableListener.emit('updateDataKeyMap', { columns, data, rowKey });
    }
    return true;
  }

  componentDidMount() {
    const tableEl = findDOMNode(this.table.getThemeTarget());
    if (tableEl) {
      tableEl.addEventListener('keydown', this.editTableListener.keyDownHandler);
      tableEl.addEventListener('keyup', this.editTableListener.keyUpHandler);
    }
  }

  render() {
    const { data = [], columns = [], showHeader = true } = this.props;
    const { restColumnsIntoData, getThemeForTable, restColumnsWithRender } = this.editTableListener;
    const firstLineData = restColumnsIntoData(columns);
    const tableData = showHeader ? firstLineData.concat(data) : data;
    const { renderFunc } = this;
    const tableColumns = restColumnsWithRender(columns, renderFunc);
    const { tableSize, tableStyle } = this.props;
    const tableProps = { tableSize, tableStyle };
    const containerTheme = this.props.getPartOfThemeProps('Container');
    const defaultTableTheme = {
      Td: { normal: { padding: { left: 0, right: 0 } } },
    };
    const tableTheme = getThemeForTable(
      this.props.getPartOfThemeHocProps('Table'),
      defaultTableTheme
    );
    return (
      <Container themeProps={containerTheme}>
        <Table
          ref={el => (this.table = el)}
          {...tableTheme}
          data={tableData}
          columns={tableColumns}
          {...tableProps}
          showHeader={false}
        />
      </Container>
    );
  }

  renderFunc = (renderObject: Object) => {
    const { getPartOfThemeProps, allowEditHead, selectSuffixElement } = this.props;
    const { editTableListener } = this;
    const { index } = renderObject;
    const allowEdit = allowEditHead ? true : index !== 0;

    return (
      <TableCell
        {...renderObject}
        allowEdit={allowEdit}
        selectSuffixElement={selectSuffixElement}
        getPartOfThemeProps={getPartOfThemeProps}
        listener={editTableListener}
      />
    );
  };

  quitEdit = (res: Object): void => {
    const { oldValue, newValue } = res;
    if (oldValue !== newValue) {
      const editCell = this.editTableListener.getEditCell();
      const { data, columns, showHeader = true } = this.props;
      const { selectRow } = editCell;
      const result = {
        data,
        columns,
      };
      if (showHeader && selectRow === 0) {
        const newColumns = this.editTableListener.changeColumns({
          value: newValue,
          editCell,
          columns,
        });
        result.columns = [...newColumns];
      } else {
        const changedData = this.editTableListener.setInputChangedValue({
          value: newValue,
          editCell,
          data,
          columns,
          showHeader,
        });
        if (changedData) {
          const { data: newData } = changedData;
          result.data = [...newData];
        }
      }
      this.exportChange({ ...result });
    }
    this.clearEditState();
  };

  clearEditState = (): void => {
    this.editTableListener.emit('clearEditing');
    const tableEl = findDOMNode(this.table.getThemeTarget());
    this.editTableListener.focusTable(tableEl);
  };

  exportChange = (res: Object): void => {
    const { onChange } = this.props;
    onChange && onChange(res);
  };

  exportOnCell = (res: Object): void => {
    const { onCell, columns } = this.props;
    const exportInfo = this.editTableListener.resetSelectRow({ ...res, columns });
    onCell && onCell({ ...exportInfo });
  };

  exportOnHeaderCell = (res: Object): void => {
    const { onHeaderCell, columns } = this.props;
    const exportInfo = this.editTableListener.getHeaderCell({ ...res, columns });
    onHeaderCell && onHeaderCell({ ...exportInfo });
  };

  doSetState = (stateInfo: Object): void => {
    this.setState({ ...stateInfo });
  };

  doMoveCells = (props: Object): void => {
    const { data, columns, allowEditHead, showHeader } = this.props;
    const { editTableListener } = this;
    const { selectRow, oldSelectInfo, selectColumn } = editTableListener.getMovedCells({
      data,
      columns,
      showHeader,
      ...props,
    });
    const selectInfo = { selectRow, selectColumn };
    const isQuitMove = !selectRow && !allowEditHead;
    if (!selectInfo || isQuitMove) {
      return;
    }
    const isHeadCell = selectRow === 0;
    let emitName = 'exportOnCell';
    if (isHeadCell) {
      emitName = 'exportOnHeaderCell';
    }
    editTableListener.emit(emitName, {
      currentItem: selectInfo,
      newValue: [selectInfo],
      oldValue: oldSelectInfo,
    });
    editTableListener.emit('updateSelectCell', [{ selectColumn, selectRow }]);
    editTableListener.emit('updateEditCell', selectInfo);
    editTableListener.emit('setCellSelect', { selectCell: [selectInfo], editCell: selectInfo });
  };

  componentWillUnmount() {
    const tableEl = findDOMNode(this.table.getThemeTarget());
    if (tableEl) {
      tableEl.removeEventListener('keydown', this.editTableListener.keyDownHandler);
      tableEl.removeEventListener('keyup', this.editTableListener.keyUpHandler);
    }
    this.moveCellsListener.removeListener();
    this.quitEditListener.removeListener();
    this.setStateListener.removeListener();
    this.exportOnCellListener.removeListener();
    this.exportOnHeaderCellListener.removeListener();
  }
}

export default ThemeProvider(EditTable, Widget.EditTable);
