//@flow
import type { KeyBoardEventListenerHandle } from '@lugia/lugia-web';
import React from 'react';
import Table from './table';
import ThemeProvider from '../theme-provider';
import EditInput from './EditInput';
import type { EditTableProps, EditTableState } from './editTableCss';
import { Container, EditDiv, InnerTriggerDiv } from './editTableCss';
import KeyBoardEventListener from './connection';
import Widget from '../consts';
import { findDOMNode } from 'react-dom';
import {
  defaultTableTheme,
  restColumnsIntoData,
  setFirstRowAsHead,
  clearFirstRowAsHead,
  restDataWithMark,
  clearLugiaMarkAndResetRender,
  keyDownHandler,
  keyUpHandler,
  getThemeForTable,
  restColumnsWithMark,
  isSelected,
  isEditCell,
  resetSelectRow,
  getMovedCells,
  setInputChangedValue,
  onCellClick,
} from './editTable';

class EditTable extends React.Component<EditTableProps, EditTableState> {
  keyDownHandler: any;
  keyUpHandler: any;
  keyBoardListener: KeyBoardEventListenerHandle;
  Table: any;
  moveCellsListener: Object;
  quitEditListener: Object;
  enterEditingListener: Object;
  setStateListener: Object;
  exportOnCellListener: Object;

  constructor(props: EditTableProps) {
    super(props);
    const { columns, data = [] } = props;
    const dataWidthColumn = setFirstRowAsHead(restColumnsIntoData(columns)).concat(data);
    this.keyBoardListener = new KeyBoardEventListener();
    this.state = {
      columns: restColumnsWithMark(columns, this.renderFunc),
      data: restDataWithMark(dataWidthColumn),
      selectCell: [],
      editCell: {},
      editing: false,
    };

    this.moveCellsListener = this.keyBoardListener.on('moveCells', (props: Object) => {
      this.doMoveCells(props);
    });
    this.quitEditListener = this.keyBoardListener.on('quitEdit', (res: Object) => {
      this.quitEdit(res);
    });
    this.enterEditingListener = this.keyBoardListener.on('enterEditing', (res: Object) => {
      this.setState({ editing: true });
    });

    this.setStateListener = this.keyBoardListener.on('setState', (res: Object) => {
      this.doSetState(res);
    });
    this.exportOnCellListener = this.keyBoardListener.on('exportOnCell', (res: Object) => {
      this.exportOnCell(res);
    });
  }

  componentDidMount() {
    const { keyBoardListener } = this;
    const isInTarget = findDOMNode(this.Table.getThemeTarget()) === document.activeElement;
    window.addEventListener('keydown', keyDownHandler({ isInTarget, keyBoardListener }));
    window.addEventListener('keyup', keyUpHandler({ keyBoardListener }));
  }

  render() {
    const { data = [], columns = [] } = this.state;
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
          data={data}
          columns={columns}
          {...tableProps}
          showHeader={false}
        />
      </Container>
    );
  }

  renderFunc = (renderObject: Object) => {
    const { text, record, selectColumn } = renderObject;
    const defaultText =
      typeof text !== 'object' && (text || text === 0) ? record[text] || text : '';
    const { lugiaMark: selectRow, isHead } = record;
    const { editing, selectCell = [] } = this.state;
    const isSelect = !editing && isSelected({ selectColumn, selectRow }, selectCell);
    if (isSelect) {
      console.log('isSelect render', isSelect, editing, { selectColumn, selectRow }, selectCell);
    }

    const { isEditHead } = this.props;
    const headEdit = isEditHead ? true : selectRow !== 0;
    const { editCell } = this.state;
    const enterEdit = headEdit && editing && isEditCell({ selectColumn, selectRow }, editCell);

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
            listener={this.keyBoardListener}
            data={selectData}
          />
        </EditDiv>
      );
    }

    const { text, record, index, selectColumn, selectRow, customRender } = renderObject;
    const { selectSuffixElement, isEditHead } = this.props;
    const { selectCell } = this.state;
    const { keyBoardListener } = this;
    return (
      <EditDiv
        themeProps={editDivTheme}
        isSelect={isSelect}
        isHead={isHead}
        onClick={e =>
          onCellClick({ e, selectColumn, selectRow, selectCell, keyBoardListener, isEditHead })
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
      const { editCell, data, columns, editing } = this.state;
      const changedData = setInputChangedValue({
        value: newValue,
        editCell,
        data,
        columns,
        editing,
      });
      if (changedData) {
        const { data: newData } = changedData;
        this.setState({ data: newData });
        this.exportChange({ columns, data: newData });
      }
    }
    this.clearEditState();
  };

  clearEditState = () => {
    this.keyBoardListener.emit('quitMoveCells');
    this.setState({ editing: false, editCell: null, selectCell: [] });
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
    onCell && onCell(resetSelectRow({ ...res }));
  };

  doSetState = (stateInfo: Object) => {
    this.setState({ ...stateInfo });
  };

  doMoveCells = (props: Object) => {
    const { selectCell, data, columns } = this.state;
    const { keyBoardListener } = this;
    const selectInfo = getMovedCells({ selectCell, data, columns, ...props, keyBoardListener });
    this.exportOnCell({
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
