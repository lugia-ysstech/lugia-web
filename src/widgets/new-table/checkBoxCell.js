/**
 *
 *
 * @flow
 *
 */
import React from 'react';
import CheckBox from '../checkbox';
import { isEqualObject } from './utils';

export type CheckBoxCellProps = {
  selectOptions?: Object,
  record: Object,
  index: number,
  rowKey?: string,
};

export default class CheckBoxCell extends React.Component<CheckBoxCellProps> {
  shouldComponentUpdate(nextProps: CheckBoxCellProps) {
    const isSameProps = isEqualObject(nextProps, this.props);
    return !isSameProps;
  }

  getAllSelectData = (checked: boolean) => {
    const { data, rowKey } = this.props;
    if (!checked || !rowKey) {
      return [];
    }
    return data.map(item => {
      return item[rowKey];
    });
  };

  getSelectKeys = (selectRowKeys, value, checked) => {
    const newSelectKeys = [...selectRowKeys];
    if (checked) {
      newSelectKeys.push(value);
    } else {
      const index = selectRowKeys.findIndex(item => {
        return item === value;
      });
      newSelectKeys.splice(index, 1);
    }
    return newSelectKeys;
  };

  handleCheckBoxChange = (value, checked, record) => {
    const { selectOptions: { onChange, selectRowKeys = [] } = {} } = this.props;
    const { isLugiaHead } = record;

    const selectedKeys = isLugiaHead
      ? this.getAllSelectData(checked)
      : this.getSelectKeys(selectRowKeys, value, checked);

    const lineInfo = isLugiaHead ? {} : record;
    onChange && onChange(selectedKeys, checked, lineInfo);
  };

  render() {
    const { selectOptions, record, data } = this.props;

    const { isLugiaHead } = record;
    const { setCheckboxProps, selectRowKeys = [] } = selectOptions;
    const selectProps = setCheckboxProps ? setCheckboxProps(record) : {};
    const { index, rowKey } = this.props;
    const value = rowKey && !isLugiaHead ? record[rowKey] : index;
    let checked =
      rowKey &&
      selectRowKeys.findIndex((selectKeys: string) => {
        return selectKeys === value;
      }) !== -1;

    if (isLugiaHead) {
      const selectLength = selectRowKeys.length;
      checked = selectLength && selectLength === data.length;
    }
    return (
      <CheckBox
        checked={checked}
        {...selectProps}
        onChange={(event, checked) => this.handleCheckBoxChange(value, checked, record)}
      />
    );
  }
}
