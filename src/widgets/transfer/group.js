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
import type { GroupProps, GroupState } from '../css/transfer-group';
import { BtnText, OperationBtn, TransFerWrap } from '../css/transfer-group';
import { DisplayField, ValueField } from '../consts/props';
import {
  getCancelItem,
  getCanCheckKeys,
  getPanelSourceDataAndTargetData,
  getTreeData,
  getTruthValue,
  splitSelectKeys,
} from './utils';
import { getMapData } from './menu-utils';
import { recurTreeData } from '../menu/utils';
import TransferModel from './model';

export default ThemeProvider(
  class extends React.Component<GroupProps, GroupState> {
    static displayName = 'Transfer';
    sourceInputValue: string;
    targetInputValue: string;
    maping: boolean;
    sourceModel: TransferModel;
    targetModel: TransferModel;
    constructor(props: GroupProps) {
      super(props);
      const sourceSelectKeys = this.getSourceSelectedKeys(props);
      const targetSelectKeys = this.getTargetSelectedKeys(props);
      const theTargetKeys = this.getTargetKeys(props);
      const theDisplayValue = this.getDisplayValue(props);

      this.targetModel = new TransferModel({
        type: 'Target',
        selectedKeys: targetSelectKeys,
        list: theTargetKeys,
      });
      this.sourceModel = new TransferModel({
        type: 'Source',
        selectedKeys: sourceSelectKeys,
        list: theTargetKeys,
      });
      const { data, valueField = 'value', type = 'panel', displayField = 'text' } = props;
      let mapData;
      if (type === 'panel') {
        mapData = getMapData(data, valueField);
      } else {
        const { mapData: maps, target } = getTreeData(data, {
          displayField,
          valueField,
        });
        mapData = maps;
        this.targetModel.setTreeData(target);
        this.sourceModel.setTreeData(target);
      }
      this.targetModel.setMapData(mapData);
      this.sourceModel.setMapData(mapData);
      const cancelItem = getCancelItem(
        theTargetKeys,
        mapData,
        { valueField, displayField },
        theDisplayValue
      );
      this.targetModel.setCancelItem(cancelItem);
    }

    getTargetSelectedKeys(props) {
      return getTruthValue('targetSelectedKeys', props, undefined, 'defaultTargetSelectedKeys');
    }

    getSourceSelectedKeys(props) {
      return getTruthValue('sourceSelectedKeys', props, undefined, 'defaultSourceSelectedKeys');
    }

    getTargetKeys(props) {
      return getTruthValue('targetKeys', props, undefined, 'defaultTargetKeys');
    }

    getDisplayValue(props) {
      return getTruthValue('displayValue', props, undefined, 'defaultDisplayValue');
    }

    shouldComponentUpdate(nextProps: GroupProps, nextState: GroupState) {
      if (nextProps.data.length !== this.props.data.length || nextProps.data !== this.props.data) {
        const { data, valueField = 'value', type = 'panel', displayField = 'text' } = nextProps;
        let mapData;
        if (type === 'panel') {
          mapData = getMapData(data, valueField);
        } else {
          const { mapData: maps, target } = getTreeData(data, {
            displayField,
            valueField,
          });
          mapData = maps;
          this.targetModel.setTreeData(target);
          this.sourceModel.setTreeData(target);
        }
        this.targetModel.setMapData(mapData);
        this.sourceModel.setMapData(mapData);
      }
      if (this.isInProps('targetSelectedKeys')) {
        const targetSelctKeys = this.getTargetSelectedKeys(nextProps);
        this.targetModel.changeSelectedKeys(targetSelctKeys);
      }
      if (this.isInProps('sourceSelectedKeys')) {
        const keys = this.getSourceSelectedKeys(nextProps);
        this.sourceModel.changeSelectedKeys(keys);
      }
      if (this.isInProps('targetKeys')) {
        const targetSelctKeys = this.getTargetKeys(nextProps);
        this.targetModel.changeList(targetSelctKeys);
        this.sourceModel.changeList(targetSelctKeys);
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
      // const {
      //   sourceData,
      //   targetData,
      //   targetKeys,
      //   sourceSelectedKeys,
      //   targetSelectedKeys,
      //   sourceCheckKeys,
      //   targetCheckKeys,
      //   sourceSearchData,
      //   targetSearchData,
      //   cancelItem,
      //   enableKeys,
      // } = this.state;
      // const theSourceData = this.sourceInputValue ? sourceSearchData : sourceData;
      // const theTargetData = this.targetInputValue ? targetSearchData : targetData;
      // const treeData = {};
      // if (type === 'tree') {
      //   treeData.data = sourceData;
      // }
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
            model={this.sourceModel}
            // showSearch={showSearch}
            onCheckAll={this.checkAllForLeft}
            // canCheckKeys={sourceCheckKeys || enableKeys}
            // onSearch={this.searchCallbackForLeft}
            title="列表A"
            {...this.props}
            displayField={displayField}
            valueField={valueField}
            type={type}
            // 左侧 黑单
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
            model={this.targetModel}
            direction="Target"
            // type={type}
            onSelect={this.handleTargetSelect}
            // data={theTargetData}
            // showSearch={showSearch}
            onCheckAll={this.checkAllForRight}
            // canCheckKeys={targetCheckKeys}
            // onSearch={this.searchCallbackForRight}
            needCancelBox
            // cancelItem={cancelItem}
            onCancelItemClick={this.handleCancelItemClick}
            title="列表B"
            {...this.props}
            displayField={displayField}
            valueField={valueField}
            type={type}
            // onSelect={this.handleSelect}
            //右侧 白单
          />
        </TransFerWrap>
      );
    }
    handleSourceSelect = (item: string[]) => {
      const { onSelectChange } = this.props;
      const targetSelectedKeys = this.targetModel.getSelectedkeys();
      console.info('source selected', item);
      onSelectChange && onSelectChange(item, targetSelectedKeys);

      const hasSourceSelectedKeys = this.isInProps('sourceSelectedKeys');
      if (hasSourceSelectedKeys) {
        return;
      }
      this.sourceModel.changeSelectedKeys(item);
    };

    handleTargetSelect = (item: string[]) => {
      const { onSelectChange } = this.props;
      const sourceSelectedKeys = this.sourceModel.getSelectedkeys();
      console.info('target selected', item);
      onSelectChange && onSelectChange(sourceSelectedKeys, item);

      const hasTargetSelectedKeys = this.isInProps('targetSelectedKeys');
      if (hasTargetSelectedKeys) {
        return;
      }
      this.targetModel.changeSelectedKeys(item);
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
      const {
        moveKey,
        disabledKeys,
        nextTargetKeys,
      } = this.targetModel.getMoveAfterKeysForTarget();

      const { onDirectionClick } = this.props;
      onDirectionClick && onDirectionClick(nextTargetKeys, 'left', moveKey);

      const hasTargetKeys = this.isInProps('targetKeys');
      if (hasTargetKeys) {
        return;
      }
      this.targetModel.changeSelectedKeys(disabledKeys);
      this.targetModel.changeList(nextTargetKeys);
      this.sourceModel.changeList(nextTargetKeys);
    };

    handleToRight = () => {
      const {
        moveKey,
        disabledKeys,
        nextTargetKeys,
      } = this.sourceModel.getMoveAfterKeysForSource();

      const { onDirectionClick } = this.props;
      onDirectionClick && onDirectionClick(nextTargetKeys, 'right', moveKey);

      const hasTargetKeys = this.isInProps('targetKeys');
      if (hasTargetKeys) {
        return;
      }
      this.sourceModel.changeSelectedKeys(disabledKeys);
      this.sourceModel.changeList(nextTargetKeys);
      this.targetModel.changeList(nextTargetKeys);
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
