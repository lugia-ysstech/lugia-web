//@flow
import type { EditTableEventListenerHandle } from '@lugia/lugia-web';
import React from 'react';
import Table from './table';
import ThemeProvider from '../theme-provider';
import EditInput from './EditInput';
import type { EditTableProps, EditTableState } from './editTableCss';
import { Container, TdContainer, EditDiv, InnerTriggerDiv } from './editTableCss';
import EditTableEventListener from './connection';
import Widget from '../consts';
import { findDOMNode } from 'react-dom';
import { getEditDivTheme, isValued, isEqualArray, getRandom } from './utils';

class EditTable extends React.Component<EditTableProps, EditTableState> {
  editTableListener: EditTableEventListenerHandle;
  table: any;
  moveCellsListener: Object;
  quitEditListener: Object;
  enterEditingListener: Object;
  setStateListener: Object;
  exportOnCellListener: Object;
  exportOnHeaderCellListener: Object;

  constructor(props: EditTableProps) {
    super(props);
    const { columns, data = [], rowKey } = props;

    this.editTableListener = new EditTableEventListener();
    this.state = {
      selectCell: [],
      editCell: {},
      editing: false,
    };
    this.editTableListener.emit('updateDataKeyMap', { columns, data, rowKey });
    this.moveCellsListener = this.editTableListener.on('moveCells', (props: Object) => {
      this.doMoveCells(props);
    });
    this.quitEditListener = this.editTableListener.on('quitEdit', (res: Object) => {
      this.quitEdit(res);
    });
    this.enterEditingListener = this.editTableListener.on('enterEditing', () => {
      this.doEnterEditing();
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
    const { data = [], columns = [] } = this.props;
    const { restColumnsIntoData, getThemeForTable, restColumnsWithRender } = this.editTableListener;
    const firstLineData = restColumnsIntoData(columns);
    const tableData = firstLineData.concat(data);
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
    const { text, record, dataIndex, index, disableEdit } = renderObject;
    const { getSelectColumnMark, isSelected, isEditCell } = this.editTableListener;

    const selectColumn = getSelectColumnMark(dataIndex);
    const defaultText = typeof text !== 'object' && isValued(text) ? record[text] || text : '';
    const { isHead } = record;
    const selectRow = index;
    const { editing, selectCell = [] } = this.state;
    const isSelect = !editing && isSelected({ selectColumn, selectRow }, selectCell);

    const { isEditHead } = this.props;
    const headEdit = isEditHead ? true : selectRow !== 0;
    const { editCell } = this.state;
    const enterEdit =
      !disableEdit && headEdit && editing && isEditCell({ selectColumn, selectRow }, editCell);

    const renderPros = {
      defaultText,
      isSelect,
      isHead,
      enterEdit,
      selectColumn,
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
      align,
      dataIndex,
      index,
    } = renderObject;
    const EditElement = customEditElement || EditInput;
    const editingTheme = enterEdit
      ? {
          themeConfig: {
            normal: {
              padding: { right: 0, left: 0 },
            },
          },
        }
      : {};
    const { isEditHead } = this.props;
    const isDisableEdit = isHead && isSelect && !isEditHead;
    const propsConfig = { isSelect, isHead, align, enterEdit, isDisableEdit };
    const editDivTheme = getEditDivTheme(this.props, isHead, propsConfig, editingTheme);
    const { editTableListener: { getSelectDataMark } = {} } = this;
    const keyMap = getSelectDataMark(index - 1);
    const keyVal = isHead ? dataIndex : keyMap.keyValue;
    const randomVal = getRandom(1000);
    const keyValue = `${dataIndex}-${keyVal}-${randomVal}`;
    if (enterEdit) {
      return (
        <TdContainer key={`editing-${keyValue}`}>
          <EditElement
            value={defaultText}
            autoFocus={true}
            type={editType}
            listener={this.editTableListener}
            data={selectData}
          />
        </TdContainer>
      );
    }

    const { text, record, selectColumn, selectRow, customRender } = renderObject;
    const { selectSuffixElement } = this.props;
    const { selectCell } = this.state;
    const allowEdit = !isDisableEdit;
    const { editTableListener: { onCellClick } = {} } = this;
    return (
      <EditDiv
        themeProps={editDivTheme}
        key={`editDiv-${keyValue}`}
        onClick={e =>
          onCellClick({
            e,
            selectColumn,
            selectRow,
            selectCell,
            isEditHead,
            isHead,
            allowEdit,
          })
        }
      >
        {customRender && !isHead ? customRender(text, record, index) : defaultText.toString()}
        {allowEdit && isSelect && selectSuffixElement ? (
          <InnerTriggerDiv>{selectSuffixElement}</InnerTriggerDiv>
        ) : null}
      </EditDiv>
    );
  };

  quitEdit = (res: Object): void => {
    const { oldValue, newValue } = res;
    if (oldValue !== newValue) {
      const { editCell, editing } = this.state;
      const { data, columns } = this.props;
      const { selectRow } = editCell;
      const result = {
        data,
        columns,
      };
      if (selectRow !== 0) {
        const changedData = this.editTableListener.setInputChangedValue({
          value: newValue,
          editCell,
          data,
          columns,
          editing,
        });
        if (changedData) {
          const { data: newData } = changedData;
          result.data = [...newData];
        }
      } else {
        const newColumns = this.editTableListener.changeColumns({
          value: newValue,
          editCell,
          columns,
          editing,
        });
        result.columns = [...newColumns];
      }
      this.exportChange({ ...result });
    }
    this.clearEditState();
  };

  clearEditState = (): void => {
    this.setState({ editing: false });
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
    const { selectCell } = this.state;
    const { data, columns, isEditHead } = this.props;
    const { editTableListener } = this;
    const selectInfo = editTableListener.getMovedCells({ selectCell, data, columns, ...props });
    const { selectRow } = selectInfo || {};
    const isQuitMove = !selectRow && !isEditHead;
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
      oldValue: selectCell,
    });
    this.setState({
      selectCell: [selectInfo],
      editCell: selectInfo,
    });
  };

  isAllowEditing = () => {
    const {
      editCell: { selectRow, selectColumn },
      editing,
    } = this.state;
    if (!isValued(selectColumn) || !isValued(selectRow)) {
      return false;
    }
    const { isEditHead, columns } = this.props;
    const isDisableEdit = columns[selectColumn].disableEdit;
    return !editing && (isEditHead || !!selectRow) && !isDisableEdit;
  };

  doEnterEditing = (): void => {
    const allowEdit = this.isAllowEditing();
    if (allowEdit) {
      this.setState({ editing: true });
    }
  };

  componentWillUnmount() {
    const tableEl = findDOMNode(this.table.getThemeTarget());
    if (tableEl) {
      tableEl.removeEventListener('keydown', this.editTableListener.keyDownHandler);
      tableEl.removeEventListener('keyup', this.editTableListener.keyUpHandler);
    }
    this.moveCellsListener.removeListener();
    this.quitEditListener.removeListener();
    this.enterEditingListener.removeListener();
    this.setStateListener.removeListener();
    this.exportOnCellListener.removeListener();
    this.exportOnHeaderCellListener.removeListener();
  }
}

export default ThemeProvider(EditTable, Widget.EditTable);
