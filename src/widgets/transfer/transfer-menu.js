/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import Menu from '../menu';
import type { TransferMenuProps, TransferMenuState } from '../css/transfer-menu';
import { NoData } from '../css/transfer';
import {
  getMapData,
  getMenuDataByBlackList,
  getWhiteListDataAndCancelItem,
  getSearchData,
} from './menu-utils';

export default class TransferMenu extends React.Component<TransferMenuProps, TransferMenuState> {
  constructor(props: TransferMenuProps) {
    super(props);
    const { data = [], valueField } = props;
    const mapData = getMapData(data, valueField);

    this.state = {
      mapData,
      cancelItem: [],
      menuData: [],
    };
  }

  static getDerivedStateFromProps(props: TransferMenuProps, state: TransferMenuState) {
    const {
      data = [],
      blackList,
      whiteList,
      displayField = 'text',
      valueField = 'value',
      displayValue = [],
      direction,
      query,
      filterOption = (value, option) => {
        return option[valueField].indexOf(value) > -1 || option[displayField].indexOf(value) > -1;
      },
    } = props;
    let targetData = [];
    if (direction === 'Source') {
      targetData = getMenuDataByBlackList(data, valueField, blackList);
    } else {
      const mapData = getMapData(data, valueField) || {};
      ({ whiteListData: targetData } = getWhiteListDataAndCancelItem(
        mapData,
        displayValue,
        valueField,
        displayField,
        whiteList
      ));
    }
    return {
      menuData: getSearchData(targetData, query, filterOption),
    };
  }

  render() {
    const { menuData } = this.state;
    const {
      displayField,
      valueField,
      selectedKeys,
      query,
      height,
      menuThemeObj,
      size,
    } = this.props;
    if (query && !menuData.length) {
      return <NoData height={height}>无匹配数据</NoData>;
    }
    return (
      <Menu
        size={size}
        checkedCSS={'checkbox'}
        mutliple={true}
        data={menuData}
        selectedKeys={selectedKeys}
        onClick={this.onClick}
        displayField={displayField}
        valueField={valueField}
        {...menuThemeObj}
      />
    );
  }

  onClick = (e: Event, keys: Object) => {
    const { onSelect } = this.props;
    const { selectedKeys } = keys;
    onSelect && onSelect(selectedKeys);
  };
}
