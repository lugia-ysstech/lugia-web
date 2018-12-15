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
import { DisplayField, ValueField } from '../consts/props';
import {
  getTruthValue,
  getPanelSourceDataAndTargetData,
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
      const {
        data = [],
        type = 'panel',
        valueField = ValueField,
        displayField = DisplayField,
      } = props;
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
        const utilMapData = getPanelSourceDataAndTargetData(data, theTargetKeys, valueField);
        const {
          sourceData,
          targetData,
          sourceKeys,
          targetCheckKeys,
          sourceCheckKeys,
          mapData: mapDataPanel,
        } = utilMapData;
        const cancelItem = getCancelItem(
          theTargetKeys,
          mapDataPanel,
          { valueField, displayField },
          theDisplayValue
        );
        return {
          ...commonState,
          cancelItem,
          sourceKeys,
          sourceData,
          targetData,
          sourceCheckKeys,
          targetCheckKeys,
          mapData: mapDataPanel,
        };
      }

      const { target: treeData, mapData: treeMapData, enableKeys } = getTreeData(data, {
        displayField,
        valueField,
      });
      const cancelItem = getCancelItem(
        theTargetKeys,
        treeMapData,
        { valueField, displayField },
        theDisplayValue
      );
      const { sourceCanCheckKeys, targetCanCheckKeys } = getCanCheckKeys(enableKeys, theTargetKeys);
      return {
        ...commonState,
        cancelItem,
        enableKeys,
        sourceCheckKeys: sourceCanCheckKeys,
        targetCheckKeys: targetCanCheckKeys,
        mapData: treeMapData,
        sourceData: treeData,
        targetData: treeData,
      };
    }

    shouldComponentUpdate(nextProps: GroupProps, nextState: GroupState) {
      const { type = 'panel' } = nextProps;
      if (type === 'panel') {
        if (nextState.targetKeys !== this.state.targetKeys) {
          if (this.sourceInputValue) {
            const { sourceData } = nextState;
            this.setSearchData(sourceData, this.sourceInputValue, 'sourceSearchData');
          }
          if (this.targetInputValue) {
            const { targetData } = nextState;
            this.setSearchData(targetData, this.targetInputValue, 'targetSearchData');
          }
        }
      }

      return true;
    }

    render() {
      const {
        showSearch,
        type = 'panel',
        valueField = ValueField,
        displayField = DisplayField,
      } = this.props;
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
        enableKeys,
      } = this.state;
      const theSourceData = this.sourceInputValue ? sourceSearchData : sourceData;
      const theTargetData = this.targetInputValue ? targetSearchData : targetData;
      return (
        <TransFerWrap>
          <TransFer
            key="1"
            // displayField={displayField}
            // valueField={valueField}
            direction="Source"
            // type={type}
            onSelect={this.handleSourceSelect}
            // // data={theSourceData}
            // data={this.props.data}
            selectedKeys={[...sourceSelectedKeys]}
            // showSearch={showSearch}
            // onCheckAll={this.checkAllForLeft}
            // canCheckKeys={sourceCheckKeys || enableKeys}
            // onSearch={this.searchCallbackForLeft}
            // title="列表A"
            {...this.props}
            type={type}
            // 左侧 黑单
            blackList={targetKeys}
          />
          <OperationBtn>
            <Button
              onClick={this.handleToRight}
              type="primary"
              // disabled={sourceSelectedKeys.length === 0}
            >
              <BtnText>></BtnText>
            </Button>
            <br />
            <Button
              onClick={this.handleToLeft}
              type="primary"
              // disabled={targetSelectedKeys.length === 0}
            >
              <BtnText>{'<'}</BtnText>
            </Button>
          </OperationBtn>
          <TransFer
            key="2"
            // displayField={displayField}
            // valueField={valueField}
            direction="Target"
            // type={type}
            onSelect={this.handleTargetSelect}
            // data={theTargetData}
            selectedKeys={[...targetSelectedKeys]}
            // showSearch={showSearch}
            // onCheckAll={this.checkAllForRight}
            // canCheckKeys={targetCheckKeys}
            // onSearch={this.searchCallbackForRight}
            // needCancelBox
            // cancelItem={cancelItem}
            // onCancelItemClick={this.handleCancelItemClick}
            // title="列表B"
            {...this.props}
            displayField={displayField}
            valueField={valueField}
            type={type}
            // onSelect={this.handleSelect}
            //右侧 白单
            whiteList={targetKeys}
          />
        </TransFerWrap>
      );
    }
    handleSourceSelect = (item: string[]) => {
      const { type = 'panel', onSelectChange } = this.props;
      const { sourceSelectedKeys, targetSelectedKeys } = this.state;
      const selectKeys = this.getSelectKeys(type, item, sourceSelectedKeys);
      onSelectChange && onSelectChange(selectKeys, targetSelectedKeys);

      const hasSourceSelectedKeys = this.isInProps('sourceSelectedKeys');
      if (hasSourceSelectedKeys) {
        return;
      }
      this.setState({ sourceSelectedKeys: selectKeys });
    };

    handleTargetSelect = (item: string[]) => {
      const { type = 'panel', onSelectChange } = this.props;
      const { sourceSelectedKeys, targetSelectedKeys } = this.state;
      const selectKeys = this.getSelectKeys(type, item, targetSelectedKeys);
      onSelectChange && onSelectChange(sourceSelectedKeys, selectKeys);

      const hasTargetSelectedKeys = this.isInProps('targetSelectedKeys');
      if (hasTargetSelectedKeys) {
        return;
      }
      this.setState({ targetSelectedKeys: selectKeys });
    };

    getSelectKeys = (type: 'panel' | 'tree', item: string[], oldSelectKeys: string[]) => {
      let selectKeys;
      if (type === 'panel') {
        const selectKey = item[0];
        selectKeys = this.checkSelectKeys(oldSelectKeys, selectKey);
      } else {
        selectKeys = item;
      }
      return selectKeys;
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
      console.info('targetSelectedKeys', targetSelectedKeys);
      console.info('moveKey', moveKey);
      console.info('disabledCheckedKeys', disabledCheckedKeys);
      moveKey.forEach(item => {
        const index = nextTargetKeys.indexOf(item);
        if (index > -1) {
          nextTargetKeys.splice(index, 1);
        }
      });
      console.info('left nextTargetKeys', nextTargetKeys);
      const { onDirectionClick } = this.props;
      onDirectionClick && onDirectionClick(nextTargetKeys, 'left', moveKey);

      const hasTargetKeys = this.isInProps('targetKeys');
      if (hasTargetKeys) {
        return;
      }
      this.setState({
        targetSelectedKeys: disabledCheckedKeys,
        targetKeys: nextTargetKeys,
      });
    };

    handleToRight = () => {
      const { mapData, sourceSelectedKeys, targetKeys } = this.state;
      const { validKeys: moveKey, disabledKeys: disabledCheckedKeys } = splitSelectKeys(
        mapData,
        sourceSelectedKeys
      );
      const nextTargetKeys = [...new Set([...targetKeys, ...moveKey])];
      const { onDirectionClick } = this.props;
      onDirectionClick && onDirectionClick(nextTargetKeys, 'right', moveKey);

      const hasTargetKeys = this.isInProps('targetKeys');
      if (hasTargetKeys) {
        return;
      }
      this.setState({
        sourceSelectedKeys: disabledCheckedKeys,
        targetKeys: nextTargetKeys,
      });
    };

    checkAllForLeft = (checked: boolean) => {
      const { mapData, sourceSelectedKeys, targetSelectedKeys, sourceCheckKeys } = this.state;
      const { onSelectChange } = this.props;
      // const disabledCheckedKeys = splitSelectKeys(mapData, sourceSelectedKeys).disabledKeys;
      //
      // const checkKeys = checked
      //   ? [...sourceCheckKeys, ...disabledCheckedKeys]
      //   : disabledCheckedKeys || [];
      const checkKeys = this.getCheckKeys(mapData, sourceSelectedKeys, sourceCheckKeys, checked);
      onSelectChange && onSelectChange(checkKeys, targetSelectedKeys);

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
      const checkKeys = this.getCheckKeys(mapData, targetSelectedKeys, targetCheckKeys, checked);
      onSelectChange && onSelectChange(sourceSelectedKeys, checkKeys);

      const hasTargetSelectedKeys = this.isInProps('targetSelectedKeys');
      if (hasTargetSelectedKeys) {
        return;
      }
      this.setState({
        targetSelectedKeys: checkKeys,
      });
    };
    getCheckKeys = (
      mapData: Object,
      selectKey: string[],
      allCanCheckKeys: string[],
      checked: boolean
    ) => {
      const { disabledKeys: disabledCheckedKeys } = splitSelectKeys(mapData, selectKey);
      const checkKeys = checked
        ? [...allCanCheckKeys, ...disabledCheckedKeys]
        : disabledCheckedKeys || [];

      return checkKeys;
    };

    searchCallbackForLeft = (inputValue: string) => {
      const { sourceData = [] } = this.state;
      this.sourceInputValue = inputValue;
      this.setSearchData(sourceData, inputValue, 'sourceSearchData');
    };
    searchCallbackForRight = (inputValue: string) => {
      const { targetData = [] } = this.state;
      this.targetInputValue = inputValue;
      this.setSearchData(targetData, inputValue, 'targetSearchData');
    };
    setSearchData = (data: Object[], inputValue: string, target: string) => {
      const SearchData = this.searchFilter(data, inputValue);
      this.setState({ [target]: inputValue ? SearchData : data });
    };
    searchFilter = (data: Object[], searchValue: string) => {
      const { valueField = ValueField } = this.props;
      const {
        filterOption = (value, option) => {
          return option[valueField].indexOf(value) > -1;
        },
      } = this.props;
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
