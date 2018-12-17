/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import Menu from '../menu';
import Input from '../input';
import Theme from '../theme';
import SearchIcon from '../icon/SearchIcon';
import type { TransferMenuProps, TransferMenuState } from '../css/transfer-menu';
import { NoData } from '../css/transfer';
import {
  getMapData,
  getMenuDataByBlackList,
  getWhiteListDataAndCancelItem,
  getSearchData,
} from './menu-utils';
import { getTruthValue } from './utils';

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
        return option[valueField].indexOf(value) > -1;
      },
    } = props;
    if (direction === 'Source') {
      // const sourceSelectKeys = getTruthValue(
      //   'sourceSelectedKeys',
      //   props,
      //   state,
      //   'defaultSourceSelectedKeys'
      // );
      const menuWhiteListData = getMenuDataByBlackList(data, valueField, blackList);
      return {
        menuData: getSearchData(menuWhiteListData, query, filterOption),
        // selectKeys: sourceSelectKeys,
      };
    }
    const { mapData = {} } = state;
    const { whiteListData, cancelItem } = getWhiteListDataAndCancelItem(
      mapData,
      displayValue,
      valueField,
      displayField,
      whiteList
    );
    const targetSelectKeys = getTruthValue(
      'targetSelectedKeys',
      props,
      state,
      'defaultTargetSelectedKeys'
    );

    return {
      menuData: getSearchData(whiteListData, query, filterOption),
      // cancelItem,
      // selectKeys: targetSelectKeys,
    };
  }

  render() {
    const { menuData } = this.state;
    const { displayField, valueField, selectedKeys, query } = this.props;
    if (query && !menuData.length) {
      //todo: nodata 左右 两侧 样式高度（direction）；
      return <NoData>无匹配数据</NoData>;
    }
    return (
      <Menu
        checkedCSS={'checkbox'}
        mutliple={true}
        data={menuData}
        selectedKeys={selectedKeys}
        onClick={this.onClick}
        displayField={displayField}
        valueField={valueField}
      />
    );
  }

  onClick = (e: Event, keys: Object, item: Object) => {
    const { onSelect } = this.props;
    //todo: 检查 menu 抛出 selectedKeys 值的 正确性；
    //todo: 抛出 selectedKeys 时 需要过滤 黑名单；
    const { selectedKeys } = keys;
    console.info('onClick selectedKeys', selectedKeys);
    onSelect && onSelect(selectedKeys);
  };

  isInProps(value: string) {
    return value in this.props;
  }
}
