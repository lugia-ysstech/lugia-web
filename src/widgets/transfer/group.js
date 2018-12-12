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
import {
  getTruthValue,
  getSourceDataAndTargetData,
  splitSelectKeys,
  getTreeData,
  getCancelItem,
  getCanCheckKeys,
} from './utils';

export default ThemeProvider(
  class extends React.Component<GroupProps, GroupState> {
    static displayName = 'Transfer';
    sourceInputValue: string;
    targetInputValue: string;
    maping: boolean;

    static getDerivedStateFromProps(props, state) {
      const { data = [], type = 'panel' } = props;
      const sourceSelctKeys = getTruthValue(
        'sourceSelectedKeys',
        props,
        state,
        'defaultSourceSelectedKeys'
      );
      const targetSelctKeys = getTruthValue(
        'targetSelectedKeys',
        props,
        state,
        'defaultTargetSelectedKeys'
      );
      const theTargetKeys = getTruthValue('targetKeys', props, state, 'defaultTargetKeys');
      const theDisplayValue = getTruthValue('displayValue', props, state, 'defaultDisplayValue');
      const commonState = {
        sourceSelectedKeys: sourceSelctKeys,
        targetSelectedKeys: targetSelctKeys,
        targetKeys: theTargetKeys,
        displayValue: theDisplayValue,
      };
      if (type === 'panel') {
        const utilMapData = getSourceDataAndTargetData(data, theTargetKeys);
        const {
          sourceData,
          targetData,
          sourceKeys,
          targetCheckKeys,
          sourceCheckKeys,
          mapData: mapDatas,
        } = utilMapData;
        const cancelItem = getCancelItem(theTargetKeys, mapDatas, theDisplayValue);
        return {
          ...commonState,
          cancelItem,
          sourceKeys,
          sourceData,
          targetData,
          targetCheckKeys,
          sourceCheckKeys,
          mapData: mapDatas,
        };
      }

      const obj = { target: [], mapData: [], leafKeys: [] };
      const { target: treeData, mapData: treeMapData, leafKeys } = getTreeData(data, obj);
      const cancelItem = getCancelItem(theTargetKeys, treeMapData, theDisplayValue);
      const { targetCanCheckKeys, sourceCanCheckKeys } = getCanCheckKeys(leafKeys, theTargetKeys);
      return {
        ...commonState,
        cancelItem,
        leafKeys,
        targetCheckKeys: targetCanCheckKeys,
        sourceCheckKeys: sourceCanCheckKeys,
        mapData: treeMapData,
        sourceData: treeData,
        targetData: treeData,
      };
    }
    shouldComponentUpdate(nextProps: GroupProps, nextState: GroupState) {
      const {
        type = 'panel',
        filterOption = (value: string, option: Object): boolean => {
          return option.value.indexOf(value) > -1;
        },
      } = nextProps;
      if (type === 'panel') {
        if (nextState.targetKeys !== this.state.targetKeys) {
          if (this.sourceInputValue) {
            const SearchData = this.searchFilter(
              nextState.sourceData,
              this.sourceInputValue,
              filterOption
            );
            this.setState({ sourceSearchData: SearchData });
          }
          if (this.targetInputValue) {
            const SearchData = this.searchFilter(
              nextState.targetData,
              this.targetInputValue,
              filterOption
            );
            this.setState({ targetSearchData: SearchData });
          }
        }
      }

      return true;
    }

    render() {
      const { showSearch, type = 'panel' } = this.props;
      const {
        sourceData,
        targetData,
        targetKeys,
        sourceSelectedKeys,
        targetSelectedKeys,
        sourceCheckKeys,
        targetCheckKeys,
        sourceSearchData,
        targetSearchData,
        cancelItem,
        leafKeys,
      } = this.state;
      const theSourceData = this.sourceInputValue ? sourceSearchData : sourceData;
      const theTargetData = this.targetInputValue ? targetSearchData : targetData;
      return (
        <TransFerWrap>
          <TransFer
            key="1"
            direction="left"
            type={type}
            onSelect={this.handleSourceSelect}
            data={theSourceData}
            selectedKeys={[...sourceSelectedKeys]}
            showSearch={showSearch}
            onCheckAll={this.checkAllForLeft}
            canCheckKeys={sourceCheckKeys || leafKeys}
            onSearch={this.searchCallbackForLeft}
            title="列表A"
            // 左侧 黑单
            blackList={targetKeys}
          />
          <OperationBtn>
            <Button
              onClick={this.handleToRight}
              type="primary"
              disabled={sourceSelectedKeys.length === 0}
            >
              <BtnText>></BtnText>
            </Button>
            <br />
            <Button
              onClick={this.handleToLeft}
              type="primary"
              disabled={targetSelectedKeys.length === 0}
            >
              <BtnText>{'<'}</BtnText>
            </Button>
          </OperationBtn>
          <TransFer
            key="2"
            direction="right"
            type={type}
            onSelect={this.handleTargetSelect}
            data={theTargetData}
            selectedKeys={[...targetSelectedKeys]}
            showSearch={showSearch}
            onCheckAll={this.checkAllForRight}
            canCheckKeys={targetCheckKeys}
            onSearch={this.searchCallbackForRight}
            needCancelBox
            cancelItem={cancelItem}
            onCancelItemClick={this.handleCancelItemClick}
            title="列表B"
            //右侧 白单
            whiteList={targetKeys}
          />
        </TransFerWrap>
      );
    }
    handleSourceSelect = (item: string[]) => {
      const { type = 'panel', onSelectChange } = this.props;
      const { sourceSelectedKeys, targetSelectedKeys, targetKeys } = this.state;
      let selectKeys;
      if (type === 'panel') {
        const selectKey = item[0];
        selectKeys = this.checkSelectKeys(sourceSelectedKeys, selectKey);
      } else {
        selectKeys = item;
      }
      onSelectChange && onSelectChange(selectKeys, targetSelectedKeys);
      console.info('source-click: ', 'item', item, 'selectKeys', selectKeys);

      const hasSourceSelectedKeys = this.isInProps('sourceSelectedKeys');
      if (hasSourceSelectedKeys) {
        return;
      }
      this.setState({ sourceSelectedKeys: selectKeys });
    };

    handleTargetSelect = (item: string[]) => {
      const { type = 'panel', onSelectChange } = this.props;
      const { sourceSelectedKeys, targetSelectedKeys, targetKeys } = this.state;
      let selectKeys = [];
      if (type === 'panel') {
        const selectKey = item[0];
        selectKeys = this.checkSelectKeys(targetSelectedKeys, selectKey);
      } else {
        selectKeys = item;
      }
      onSelectChange && onSelectChange(sourceSelectedKeys, selectKeys);

      const hasTargetSelectedKeys = this.isInProps('targetSelectedKeys');
      if (hasTargetSelectedKeys) {
        return;
      }
      this.setState({ targetSelectedKeys: selectKeys });
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

    handleToLeft = () => {
      const { mapData, targetSelectedKeys, targetKeys } = this.state;
      const nextTargetKeys = [...targetKeys];
      const { validKeys: moveKey, disabledKeys: disabledCheckedKeys } = splitSelectKeys(
        mapData,
        targetSelectedKeys
      );
      console.info('moveKey', moveKey);
      console.info('mapData', mapData);
      console.info('targetSelectedKeys', targetSelectedKeys);
      moveKey.forEach(item => {
        const index = nextTargetKeys.indexOf(item);
        nextTargetKeys.splice(index, 1);
      });
      const { onDirectionClick } = this.props;
      onDirectionClick && onDirectionClick(nextTargetKeys, 'left', moveKey);
      console.info('nextTargetKeys', nextTargetKeys, 'moveKey', moveKey);
      const hasTargetKeys = this.isInProps('targetKeys');
      if (hasTargetKeys) {
        return;
      }
      this.moveDataToLeft(moveKey, disabledCheckedKeys);
    };

    moveDataToLeft = (moveKey: string[], disabledCheckedKeys: string[]) => {
      const { targetKeys } = this.state;
      const targetOddKeys = [...targetKeys];
      console.info('state ,targetKeys', targetKeys);
      moveKey.forEach(item => {
        const index = targetOddKeys.indexOf(item);
        targetOddKeys.splice(index, 1);
      });
      console.info('moveKey', moveKey, 'targetKeys', targetOddKeys);
      this.setState({ targetSelectedKeys: disabledCheckedKeys, targetKeys: targetOddKeys });
    };

    handleToRight = () => {
      const { mapData, sourceSelectedKeys, targetKeys } = this.state;
      const { validKeys: moveKey, disabledKeys: disabledCheckedKeys } = splitSelectKeys(
        mapData,
        sourceSelectedKeys
      );
      const nextTargetKeys = [...targetKeys, ...moveKey];
      const { onDirectionClick } = this.props;
      onDirectionClick && onDirectionClick(nextTargetKeys, 'right', moveKey);
      console.info('nextTargetKeys', nextTargetKeys, 'moveKey', moveKey);
      const hasTargetKeys = this.isInProps('targetKeys');
      if (hasTargetKeys) {
        return;
      }
      this.moveDataToRight(moveKey, disabledCheckedKeys);
    };

    moveDataToRight = (moveKey: string[], disabledCheckedKeys: string[]) => {
      const { targetKeys } = this.state;
      const addKey = [...new Set([...targetKeys, ...moveKey])];
      console.info('addKey', addKey);
      this.setState({ sourceSelectedKeys: disabledCheckedKeys, targetKeys: addKey });
    };

    checkAllForLeft = (checked: boolean) => {
      const { mapData, sourceSelectedKeys, targetSelectedKeys, sourceCheckKeys } = this.state;
      const { onSelectChange, type = 'panel' } = this.props;
      const disabledCheckedKeys = splitSelectKeys(mapData, sourceSelectedKeys).disabledKeys;

      const checkKeys = checked
        ? [...sourceCheckKeys, ...disabledCheckedKeys]
        : disabledCheckedKeys || [];
      onSelectChange && onSelectChange(checkKeys, targetSelectedKeys);

      console.info('checkAllForLeft', checkKeys, checked);

      const hasSourceSelectedKeys = this.isInProps('sourceSelectedKeys');
      if (hasSourceSelectedKeys) {
        return;
      }
      this.setState({
        sourceSelectedKeys: checkKeys,
      });
    };
    checkAllForRight = (checked: boolean) => {
      const { mapData, sourceSelectedKeys, targetSelectedKeys, targetCheckKeys } = this.state;
      const { onSelectChange } = this.props;
      const disabledCheckedKeys = splitSelectKeys(mapData, targetSelectedKeys).disabledKeys;

      const checkKeys = checked
        ? [...targetCheckKeys, ...disabledCheckedKeys]
        : disabledCheckedKeys || [];
      onSelectChange && onSelectChange(sourceSelectedKeys, checkKeys);
      console.info('right-checkall', checkKeys);
      const hasTargetSelectedKeys = this.isInProps('targetSelectedKeys');
      if (hasTargetSelectedKeys) {
        return;
      }
      this.setState({
        targetSelectedKeys: checkKeys,
      });
    };
    // checkAll = (
    //   selectedKeys: string[],
    //   canSelectedKeys: string[],
    //   target: 'targetSelectedKeys' | 'sourceSelectedKeys',
    //   checked: boolean,
    // ) => {
    //   const { mapData, targetCheckKeys } = this.state;
    //   const { onSelectChange } = this.props;
    //   const inProps = this.isInProps(target);
    //   const disabledCheckedKeys = splitSelectKeys(mapData, selectedKeys).disabledKeys;
    //   const checkKeys = checked
    //     ? [...canSelectedKeys, ...disabledCheckedKeys]
    //     : disabledCheckedKeys || [];
    //
    //   // onSelectChange && onSelectChange(sourceSelectedKeys, checkKeys);
    //   if (inProps) {
    //     return;
    //   }
    //   this.setState({
    //     [target]: checkKeys,
    //   });
    // };

    searchCallbackForLeft = (inputValue: string) => {
      const {
        filterOption = (value, option) => {
          return option.value.indexOf(value) > -1;
        },
      } = this.props;
      const { sourceData = [] } = this.state;
      this.sourceInputValue = inputValue;
      if (inputValue) {
        const SearchData = this.searchFilter(sourceData, inputValue, filterOption);
        this.setState({ sourceSearchData: SearchData });
      } else {
        this.setState({ sourceSearchData: sourceData });
      }
    };
    searchCallbackForRight = (inputValue: string) => {
      const {
        filterOption = (value, option) => {
          return option.value.indexOf(value) > -1;
        },
      } = this.props;
      const { targetData = [] } = this.state;
      this.targetInputValue = inputValue;
      if (inputValue) {
        const SearchData = this.searchFilter(targetData, inputValue, filterOption);
        this.setState({ targetSearchData: SearchData });
      } else {
        this.setState({ targetSearchData: targetData });
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
    handleCancelItemClick = (value: string) => {
      const { displayValue, targetKeys } = this.state;
      const newDisplayValue = [...displayValue];
      const newTargetKeys = [...targetKeys];
      const index = targetKeys.indexOf(value);
      newDisplayValue.splice(index, 1);
      newTargetKeys.splice(index, 1);
      console.info('newDisplayValue', newDisplayValue);
      const { onCancelItemClick } = this.props;
      const hasDisplayValue = this.isInProps('displayValue');

      onCancelItemClick && onCancelItemClick(newTargetKeys, newDisplayValue);
      if (hasDisplayValue) {
        return;
      }

      this.setState({
        displayValue: newDisplayValue,
        targetKeys: newTargetKeys,
      });
    };
    isInProps(value: string) {
      return value in this.props;
    }
  },
  Widget.Transfer
);
