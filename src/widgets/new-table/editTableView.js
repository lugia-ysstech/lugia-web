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
import {
  defaultTableTheme,
  restColumnsIntoData,
  keyDownHandler,
  keyUpHandler,
  getThemeForTable,
  restColumnsWithRender,
  isSelected,
  isEditCell,
  resetSelectRow,
  getMovedCells,
  setInputChangedValue,
  onCellClick,
  isEqualArray,
} from './editTable';

class EditTable extends React.Component<EditTableProps, EditTableState> {
  keyDownHandler: any;
  keyUpHandler: any;
  EditTableListener: EditTableEventListenerHandle;
  Table: any;
  moveCellsListener: Object;
  quitEditListener: Object;
  enterEditingListener: Object;
  setStateListener: Object;
  exportOnCellListener: Object;

  constructor(props: EditTableProps) {
    super(props);
    const { columns, data = [] } = props;

    this.EditTableListener = new EditTableEventListener();
    this.state = {
      selectCell: [],
      editCell: {},
      editing: false,
    };
    this.EditTableListener.emit('updateDataKeyMap', { columns, data });
    this.moveCellsListener = this.EditTableListener.on('moveCells', (props: Object) => {
      this.doMoveCells(props);
    });
    this.quitEditListener = this.EditTableListener.on('quitEdit', (res: Object) => {
      this.quitEdit(res);
    });
    this.enterEditingListener = this.EditTableListener.on('enterEditing', (res: Object) => {
      this.setState({ editing: true });
    });

    this.setStateListener = this.EditTableListener.on('setState', (res: Object) => {
      this.doSetState(res);
    });
    this.exportOnCellListener = this.EditTableListener.on('exportOnCell', (res: Object) => {
      this.exportOnCell(res);
    });
  }

  shouldComponentUpdate(nextProps: EditTableProps, nextState: EditTableState) {
    const { data: oldData, columns: oldColumns } = this.props;
    const { data, columns } = nextProps;
    const isUpdateValue = !isEqualArray(oldData, data) || !isEqualArray(oldColumns, columns);
    if (isUpdateValue) {
      this.EditTableListener.emit('updateDataKeyMap', { columns, data });
    }
    return true;
  }

  componentDidMount() {
    const { EditTableListener } = this;
    const isInTarget = findDOMNode(this.Table.getThemeTarget()) === document.activeElement;
    window.addEventListener('keydown', keyDownHandler({ isInTarget, EditTableListener }));
    window.addEventListener('keyup', keyUpHandler({ EditTableListener }));
  }

  render() {
    const { data = [], columns = [] } = this.props;
    const firstLineData = restColumnsIntoData(columns);
    const tableData = firstLineData.concat(data);
    const { renderFunc } = this;
    const tableColumns = restColumnsWithRender(columns, renderFunc);
    const { tableSize, tableStyle } = this.props;
    const tableProps = { tableSize, tableStyle };
    const containerTheme = this.props.getPartOfThemeProps('Container');
    const TableTheme = getThemeForTable(
      this.props.getPartOfThemeHocProps('Table'),
      defaultTableTheme
    );
    return (
      <Container themeProps={containerTheme}>
        <Table
          ref={el => (this.Table = el)}
          {...TableTheme}
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
    const selectColumn = this.EditTableListener.getSelectColumnMark(dataIndex);

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
            listener={this.EditTableListener}
            data={selectData}
          />
        </EditDiv>
      );
    }

    const { text, record, index, selectColumn, selectRow, customRender } = renderObject;
    const { selectSuffixElement, isEditHead } = this.props;
    const { selectCell } = this.state;
    const { EditTableListener } = this;
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
            EditTableListener,
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

  quitEdit = (res: Object) => {
    const { oldValue, newValue } = res;
    if (oldValue !== newValue) {
      const { editCell, editing } = this.state;
      const { data, columns } = this.props;
      const { EditTableListener } = this;
      const changedData = setInputChangedValue({
        value: newValue,
        editCell,
        data,
        columns,
        editing,
        EditTableListener,
      });
      if (changedData) {
        const { data: newData } = changedData;
        this.exportChange({ columns, data: newData });
      }
    }
    this.clearEditState();
  };

  clearEditState = () => {
    this.setState({ editing: false, editCell: null, selectCell: [] });
  };

  exportChange = (res: Object) => {
    const { onChange } = this.props;
    onChange && onChange(res);
  };

  exportOnCell = (res: Object) => {
    const { onCell, columns } = this.props;
    const { EditTableListener } = this;
    const exportInfo = resetSelectRow({ ...res, EditTableListener, columns });
    onCell && onCell({ ...exportInfo });
  };

  doSetState = (stateInfo: Object) => {
    this.setState({ ...stateInfo });
  };

  doMoveCells = (props: Object) => {
    const { selectCell } = this.state;
    const { data, columns } = this.props;
    const { EditTableListener } = this;
    const selectInfo = getMovedCells({ selectCell, data, columns, ...props, EditTableListener });
    EditTableListener.emit('exportOnCell', {
      currentItem: selectInfo,
      newValue: [selectInfo],
      oldValue: selectCell,
    });
    this.setState({
      selectCell: [selectInfo],
      editCell: selectInfo,
    });
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDownHandler);
    window.removeEventListener('keyup', this.keyUpHandler);
    this.moveCellsListener.removeListener();
    this.quitEditListener.removeListener();
    this.enterEditingListener.removeListener();
    this.setStateListener.removeListener();
    this.exportOnCellListener.removeListener();
  }
}

export default ThemeProvider(EditTable, Widget.EditTable);
