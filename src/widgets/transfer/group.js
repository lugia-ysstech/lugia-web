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
import TransFer from './transfer';
import Button from '../button';
import { TransFerWrap, OperationBtn, BtnText } from '../css/transfer-group';
import type { GroupProps, GroupState } from '../css/transfer-group';
import { getSourceDataAndTargetData, getSelectKeys } from './utils';

export default ThemeProvider(
  class extends React.Component<GroupProps, GroupState> {
    static displayName = 'Transfer';
    sourceInputValue: string;
    targetInputValue: string;
    maping: boolean;

    static getDerivedStateFromProps(props, state) {
      const hasSourceSelectedKeys = 'sourceSelectedKeys' in props;
      const hasTargetSelectedKeys = 'targetSelectedKeys' in props;
      const hasTargetKeys = 'targetKeys' in props;
      const {
        sourceSelectedKeys,
        targetSelectedKeys,
        defaultSourceSelectedKeys,
        defaultTargetSelectedKeys,
        targetKeys = [],
        defaultTargetKeys,
        data = [],
      } = props;
      const sourceSelctKeys = hasSourceSelectedKeys
        ? sourceSelectedKeys
        : state
          ? state.sourceSelectedKeys
          : defaultSourceSelectedKeys || [];
      const targetSelctKeys = hasTargetSelectedKeys
        ? targetSelectedKeys
        : state
          ? state.targetSelectedKeys
          : defaultTargetSelectedKeys || [];
      const theTargetKeys = hasTargetKeys
        ? targetKeys
        : state
          ? state.targetKeys
          : defaultTargetKeys || [];

      const utilMapData = getSourceDataAndTargetData(data, theTargetKeys);
      const sourceData = utilMapData.sourceData;
      const targetData = utilMapData.targetData;
      const sourceKeys = utilMapData.sourceKeys;
      const targetCheckKeys = utilMapData.targetCheckKeys;
      const sourceCheckKeys = utilMapData.sourceCheckKeys;

      return {
        sourceSelectedKeys: sourceSelctKeys,
        targetSelectedKeys: targetSelctKeys,
        targetKeys: theTargetKeys,
        sourceKeys,
        sourceData,
        targetData,
        targetCheckKeys,
        sourceCheckKeys,
        mapData: utilMapData.mapData,
      };
    }

    render() {
      const { showSearch, onSelectChange } = this.props;
      const {
        sourceData,
        targetData,
        sourceSelectedKeys,
        targetSelectedKeys,
        sourceCheckKeys,
        targetCheckKeys,
        sourceSearchData,
        targetSearchData,
      } = this.state;
      const theSourceData = this.sourceInputValue ? sourceSearchData : sourceData;
      const theTargetData = this.targetInputValue ? targetSearchData : targetData;

      return (
        <TransFerWrap>
          <TransFer
            key="1"
            onSelect={this.handleSourceSelect}
            data={theSourceData}
            selectedKeys={sourceSelectedKeys}
            showSearch={showSearch}
            onCheckAll={this.checkAll('left')}
            canCheckKeys={sourceCheckKeys}
            onSearch={this.searchCallback('left')}
          />
          <OperationBtn>
            <Button
              onClick={this.handleClick('right')}
              type="primary"
              disabled={sourceSelectedKeys.length === 0}
            >
              <BtnText>></BtnText>
            </Button>
            <br />
            <Button
              onClick={this.handleClick('left')}
              type="primary"
              disabled={targetSelectedKeys.length === 0}
            >
              <BtnText>{'<'}</BtnText>
            </Button>
          </OperationBtn>
          <TransFer
            key="2"
            onSelect={this.handleTargetSelect}
            data={theTargetData}
            selectedKeys={targetSelectedKeys}
            showSearch={showSearch}
            onCheckAll={this.checkAll('right')}
            canCheckKeys={targetCheckKeys}
            onSearch={this.searchCallback('right')}
          />
        </TransFerWrap>
      );
    }
    handleSourceSelect = (e, keys, item) => {
      const selectKey = item.value;
      const { onSelectChange, onSourceSelect } = this.props;
      // onSourceSelect && onSourceSelect(selectKey, item);
      const { sourceSelectedKeys, targetSelectedKeys } = this.state;
      const hasSourceSelectedKeys = this.isInProps('sourceSelectedKeys');
      const selectKeys = this.checkSelectKeys(sourceSelectedKeys, selectKey);
      if (hasSourceSelectedKeys) {
        onSelectChange && onSelectChange(selectKeys, targetSelectedKeys);
        return;
      }

      this.setState(
        {
          sourceSelectedKeys: selectKeys,
        },
        () => onSelectChange && onSelectChange(selectKeys, targetSelectedKeys)
      );
    };
    handleTargetSelect = (e, keys, item) => {
      const selectKey = item.value;
      const { onSelectChange, onTargetSelect } = this.props;
      // onTargetSelect && onTargetSelect(selectKey, item);
      const { sourceSelectedKeys, targetSelectedKeys } = this.state;
      const hasTargetSelectedKeys = this.isInProps('targetSelectedKeys');
      const selectKeys = this.checkSelectKeys(targetSelectedKeys, selectKey);
      if (hasTargetSelectedKeys) {
        onSelectChange && onSelectChange(sourceSelectedKeys, selectKeys);
        return;
      }

      this.setState(
        {
          targetSelectedKeys: selectKeys,
        },
        () => onSelectChange && onSelectChange(sourceSelectedKeys, selectKeys)
      );
    };
    checkSelectKeys = (stateKeys: string[], key: string): string[] => {
      const isRepeat = stateKeys.includes(key);
      const data = [...stateKeys];
      if (isRepeat) {
        const index = data.indexOf(key);
        data.splice(index, 1);
        return data;
      }
      data.push(key);
      return data;
    };
    handleClick = (type: 'left' | 'right') => () => {
      const { mapData, sourceSelectedKeys, targetSelectedKeys, targetKeys } = this.state;
      let moveKey, disabledCheckedKeys;
      let nextTargetKeys = [...targetKeys];
      if (type === 'left') {
        moveKey = getSelectKeys(mapData, targetSelectedKeys).validKeys;
        disabledCheckedKeys = getSelectKeys(mapData, targetSelectedKeys).disabledKeys;
        moveKey.forEach(item => {
          const index = nextTargetKeys.indexOf(item);
          nextTargetKeys.splice(index, 1);
        });
      } else {
        moveKey = getSelectKeys(mapData, sourceSelectedKeys).validKeys;
        disabledCheckedKeys = getSelectKeys(mapData, sourceSelectedKeys).disabledKeys;
        nextTargetKeys = [...nextTargetKeys, ...moveKey];
      }
      const { onDirectionClick } = this.props;
      onDirectionClick && onDirectionClick(nextTargetKeys, type, moveKey);
      const hasTargetKeys = this.isInProps('targetKeys');
      if (hasTargetKeys) {
        return;
      }
      this.moveData(moveKey, disabledCheckedKeys, type);
    };
    moveData = (moveKey: string[], disabledCheckedKeys: string[], type: 'left' | 'right') => {
      const { targetKeys } = this.state;
      const {
        filterOption = (value: string, option: Object): boolean => {
          return option.value.indexOf(value) > -1;
        },
      } = this.props;
      let addKey = [];
      if (type === 'right') {
        const arr = new Set([...targetKeys, ...moveKey]);
        addKey = [...arr];
        this.setState({
          sourceSelectedKeys: disabledCheckedKeys,
        });
      } else {
        addKey = [...targetKeys];
        moveKey.forEach(item => {
          const index = addKey.indexOf(item);
          addKey.splice(index, 1);
        });
        this.setState({
          targetSelectedKeys: disabledCheckedKeys,
        });
      }
      this.setState(
        {
          targetKeys: addKey,
        },
        () => {
          if (this.sourceInputValue) {
            const SearchData = this.searchFilter(
              this.state.sourceData,
              this.sourceInputValue,
              filterOption
            );
            this.setState({ sourceSearchData: SearchData });
          }
          if (this.targetInputValue) {
            const SearchData = this.searchFilter(
              this.state.targetData,
              this.targetInputValue,
              filterOption
            );
            this.setState({ targetSearchData: SearchData });
          }
        }
      );
    };
    checkAll = (type: 'left' | 'right') => (checked: boolean) => {
      const {
        mapData,
        sourceSelectedKeys,
        targetSelectedKeys,
        targetCheckKeys,
        sourceCheckKeys,
      } = this.state;
      const { onSelectChange } = this.props;
      if (type === 'left') {
        const disabledCheckedKeys = getSelectKeys(mapData, sourceSelectedKeys).disabledKeys;
        const hasSourceSelectedKeys = this.isInProps('sourceSelectedKeys');
        const checkKeys = checked
          ? [...sourceCheckKeys, ...disabledCheckedKeys]
          : disabledCheckedKeys || [];
        onSelectChange && onSelectChange(checkKeys, targetSelectedKeys);
        if (hasSourceSelectedKeys) {
          return;
        }
        this.setState({
          sourceSelectedKeys: checkKeys,
        });
      } else {
        const hasTargetSelectedKeys = this.isInProps('targetSelectedKeys');
        const disabledCheckedKeys = getSelectKeys(mapData, targetSelectedKeys).disabledKeys;
        const checkKeys = checked
          ? [...targetCheckKeys, ...disabledCheckedKeys]
          : disabledCheckedKeys || [];
        onSelectChange && onSelectChange(sourceSelectedKeys, checkKeys);
        if (hasTargetSelectedKeys) {
          return;
        }
        this.setState({
          targetSelectedKeys: checkKeys,
        });
      }
    };
    searchCallback = (type: 'left' | 'right') => (inputValue: string) => {
      const {
        filterOption = (value, option) => {
          return option.value.indexOf(value) > -1;
        },
      } = this.props;
      const { sourceData, targetData } = this.state;
      if (type === 'left') {
        this.sourceInputValue = inputValue;
        const SearchData = this.searchFilter(sourceData, inputValue, filterOption);
        this.setState({ sourceSearchData: SearchData });
      } else {
        this.targetInputValue = inputValue;
        const SearchData = this.searchFilter(targetData, inputValue, filterOption);
        this.setState({ targetSearchData: SearchData });
      }
    };
    searchFilter = (data: Object[], searchValue: string, filterOption: Function) => {
      if (data && data.length > 0 && filterOption && typeof filterOption === 'function') {
        const searchData = [];
        if (this.maping) {
          return;
        }
        if (!this.maping) {
          this.maping = true;
          data.forEach(item => {
            if (filterOption(searchValue, item)) {
              searchData.push(item);
            }
          });
          this.maping = false;
          return searchData;
        }
      }
    };
    isInProps(value: string) {
      return value in this.props;
    }
  },
  Widget.Transfer
);
