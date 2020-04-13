//@flow
import type { EditTableEventListenerHandle } from '@lugia/lugia-web';
import React from 'react';
import Table from './table';
import ThemeProvider from '../theme-provider';
import EditInput from './EditInput';
import type { EditTableProps, EditTableState } from './editTableCss';
import { Container, EditDiv, InnerTriggerDiv } from './editTableCss';
import EditTableEventListener from './connection';
import Widget from '../consts';
import { findDOMNode } from 'react-dom';

class EditTable extends React.Component<EditTableProps, EditTableState> {
  editTableListener: EditTableEventListenerHandle;
  Table: any;
  moveCellsListener: Object;
  quitEditListener: Object;
  enterEditingListener: Object;
  setStateListener: Object;
  exportOnCellListener: Object;

  constructor(props: EditTableProps) {
    super(props);
    const { columns, data = [] } = props;

    this.editTableListener = new EditTableEventListener();
    this.state = {
      selectCell: [],
      editCell: {},
      editing: false,
    };
    this.editTableListener.emit('updateDataKeyMap', { columns, data });
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
  }

  shouldComponentUpdate(nextProps: EditTableProps, nextState: EditTableState) {
    const { data: oldData, columns: oldColumns } = this.props;
    const { data, columns } = nextProps;
    const { isEqualArray } = this.editTableListener;
    const isUpdateValue = !isEqualArray(oldData, data) || !isEqualArray(oldColumns, columns);
    if (isUpdateValue) {
      this.editTableListener.emit('updateDataKeyMap', { columns, data });
    }
    return true;
  }

  componentDidMount() {
    const isInTarget = findDOMNode(this.Table.getThemeTarget()) === document.activeElement;
    window.addEventListener('keydown', this.editTableListener.keyDownHandler({ isInTarget }));
    window.addEventListener('keyup', this.editTableListener.keyUpHandler);
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
          ref={el => (this.Table = el)}
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
    const { text, record, dataIndex, index } = renderObject;
    const { getSelectColumnMark, isSelected, isEditCell } = this.editTableListener;

    const selectColumn = getSelectColumnMark(dataIndex);
    const defaultText =
      typeof text !== 'object' && (text || text === 0) ? record[text] || text : '';
    const { isHead } = record;
    const selectRow = index;
    const { editing, selectCell = [] } = this.state;
    const isSelect = !editing && isSelected({ selectColumn, selectRow }, selectCell);

    const { isEditHead } = this.props;
    const headEdit = isEditHead ? true : selectRow !== 0;
    const { editCell } = this.state;
    const enterEdit = headEdit && editing && isEditCell({ selectColumn, selectRow }, editCell);

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
            listener={this.editTableListener}
            data={selectData}
          />
        </EditDiv>
      );
    }

    const { text, record, index, selectColumn, selectRow, customRender } = renderObject;
    const { selectSuffixElement, isEditHead } = this.props;
    const { selectCell } = this.state;
    const { editTableListener: { onCellClick } = {} } = this;
    return (
      <EditDiv
        themeProps={editDivTheme}
        isSelect={isSelect}
        isHead={isHead}
        onClick={e =>
          onCellClick({
            e,
            selectColumn,
            selectRow,
            selectCell,
            isEditHead,
            isHead,
          })
        }
      >
        {customRender && !isHead ? customRender(text, record, index) : defaultText.toString()}
        {isSelect && selectSuffixElement ? (
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
      const changedData = this.editTableListener.setInputChangedValue({
        value: newValue,
        editCell,
        data,
        columns,
        editing,
      });
      if (changedData) {
        const { data: newData } = changedData;
        this.exportChange({ columns, data: newData });
      }
    }
    this.clearEditState();
  };

  clearEditState = (): void => {
    this.setState({ editing: false, editCell: null, selectCell: [] });
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

  doSetState = (stateInfo: Object): void => {
    this.setState({ ...stateInfo });
  };

  doMoveCells = (props: Object): void => {
    const { selectCell } = this.state;
    const { data, columns } = this.props;
    const { editTableListener } = this;
    const selectInfo = editTableListener.getMovedCells({ selectCell, data, columns, ...props });
    if (!selectInfo) {
      return;
    }
    editTableListener.emit('exportOnCell', {
      currentItem: selectInfo,
      newValue: [selectInfo],
      oldValue: selectCell,
    });
    this.setState({
      selectCell: [selectInfo],
      editCell: selectInfo,
    });
  };

  doEnterEditing = () => {
    const { isEditHead } = this.props;
    const {
      editCell: { selectRow },
    } = this.state;
    const allowEdit = isEditHead ? true : selectRow !== 0;
    if (allowEdit) {
      this.setState({ editing: true });
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.editTableListener.keyDownHandler);
    window.removeEventListener('keyup', this.editTableListener.keyUpHandler);
    this.moveCellsListener.removeListener();
    this.quitEditListener.removeListener();
    this.enterEditingListener.removeListener();
    this.setStateListener.removeListener();
    this.exportOnCellListener.removeListener();
  }
}

export default ThemeProvider(EditTable, Widget.EditTable);
