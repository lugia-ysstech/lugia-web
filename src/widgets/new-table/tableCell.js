//@flow
import * as React from 'react';
import type { TableCellProps, TableCellState } from './tableCss';
import { TdContainer, EditDiv, InnerTriggerDiv } from './editTableCss';

import EditInput from './EditInput';
import { getEditDivTheme, isValued, isEqualObject, isInArray } from './utils';

const defaultEditTheme = {
  themeConfig: {
    normal: {
      padding: { right: 0, left: 0 },
    },
  },
};

export default class TableCell extends React.Component<TableCellProps, TableCellState> {
  defaultProps = {};
  currentCell: Object;
  setSelectListener: Object;
  clearSelectInfoListener: Object;
  enterEditingListener: Object;
  clearEditingListener: Object;
  constructor(props) {
    super(props);
    const { listener, dataIndex, index } = props;
    this.state = {
      isSelect: false,
      editing: false,
      clearValue: false,
    };
    const { getSelectColumnMark } = listener;
    const selectColumn = getSelectColumnMark(dataIndex);
    this.currentCell = { selectColumn, selectRow: index };
    this.setSelectListener = listener.on('setCellSelect', (res: Object) => {
      this.doSetSelectStatus(res);
    });
    this.clearSelectInfoListener = listener.on('clearSelect', () => {
      this.clearSelect();
    });
    this.enterEditingListener = listener.on('enterEditing', props => {
      this.doEnterEditing(props);
    });
    this.clearEditingListener = listener.on('clearEditing', () => {
      this.doClearEditing();
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isSameState = isEqualObject(nextState, this.state);
    const isSameProps = isEqualObject(nextProps, this.props);
    return !isSameState || !isSameProps;
  }

  getRenderElement = () => {
    const {
      customEditElement,
      editType,
      selectData,
      align,
      allowEdit,
      text,
      record,
      disableEdit,
      listener,
    } = this.props;

    const { isSelect, editing, clearValue } = this.state;

    const EditElement = customEditElement || EditInput;
    const editingTheme = editing ? defaultEditTheme : {};
    const { isLugiaHead } = record;
    const propsConfig = { isSelect, align, isLugiaHead, isDisableEdit: disableEdit };
    const editDivTheme = getEditDivTheme(this.props, isLugiaHead, propsConfig, editingTheme);
    const defaultText = clearValue
      ? ''
      : typeof text !== 'object' && isValued(text)
      ? record[text] || text
      : '';
    const isAllowSelect = allowEdit && !disableEdit;

    if (editing) {
      return (
        <TdContainer>
          <EditElement
            value={defaultText}
            autoFocus={true}
            type={editType}
            listener={listener}
            data={selectData}
          />
        </TdContainer>
      );
    }

    const { dataIndex, index, selectSuffixElement, customRender } = this.props;
    const { getSelectColumnMark, onCellClick } = listener;
    const selectColumn = getSelectColumnMark(dataIndex);
    return (
      <EditDiv
        themeProps={editDivTheme}
        onClick={e =>
          onCellClick({
            e,
            selectColumn,
            selectRow: index,
            isLugiaHead,
            isAllowSelect,
          })
        }
      >
        {customRender && !isLugiaHead
          ? customRender(text, record, index)
          : defaultText && defaultText.toString()}
        {isAllowSelect && isSelect && selectSuffixElement ? (
          <InnerTriggerDiv>{selectSuffixElement}</InnerTriggerDiv>
        ) : null}
      </EditDiv>
    );
  };

  clearSelect = () => {
    const { isSelect } = this.state;
    if (isSelect) {
      this.setState({ isSelect: false });
    }
  };

  isCurrentCell = (selectInfo: Object) => {
    const { selectCell, editCell } = selectInfo;
    const { currentCell } = this;
    return isInArray(selectCell, currentCell) || isEqualObject(editCell, currentCell);
  };

  doSetSelectStatus = (selectInfo: Object): void => {
    const isCurrentCell = this.isCurrentCell(selectInfo);
    if (isCurrentCell) {
      const { editing, editCell } = selectInfo;
      this.setState({ isSelect: true, editing, editCell });
    } else {
      const { isSelect } = this.state;
      if (isSelect) {
        this.clearSelectInfo();
      }
    }
  };

  doEnterEditing = (props): void => {
    const { listener } = this.props;
    const editCell = listener.getEditCell();
    const isCurrentCell = this.isCurrentCell({ editCell });
    if (!isCurrentCell) {
      return;
    }

    const allowEdit = this.isAllowEditing();
    if (allowEdit) {
      const { clearValue = false } = props;
      this.setState({ editing: true, clearValue });
    }
  };

  isAllowEditing = () => {
    const { listener } = this.props;
    const { selectRow, selectColumn } = listener.getEditCell() || {};
    if (!isValued(selectColumn) || !isValued(selectRow)) {
      return false;
    }
    const { editing } = this.state;
    return !editing;
  };

  doClearEditing = (): void => {
    const { editing } = this.state;
    if (editing) {
      this.setState({ editing: false, clearValue: false });
    }
  };

  clearSelectInfo = () => {
    this.setState({ isSelect: false, editing: false });
  };

  render() {
    return <React.Fragment>{this.getRenderElement()}</React.Fragment>;
  }

  componentWillUnmount() {
    this.setSelectListener.removeListener();
    this.clearSelectInfoListener.removeListener();
    this.enterEditingListener.removeListener();
    this.clearEditingListener.removeListener();
  }
}
