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
import { getTruthValue, getSourceDataAndTargetData, splitSelectKeys } from './utils';

export default ThemeProvider(
  class extends React.Component<GroupProps, GroupState> {
    static displayName = 'Transfer';
    sourceInputValue: string;
    targetInputValue: string;
    maping: boolean;

    static getDerivedStateFromProps(props, state) {
      const { data = [] } = props;
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
      const utilMapData = getSourceDataAndTargetData(data, theTargetKeys);
      const { sourceData, targetData, sourceKeys, targetCheckKeys, sourceCheckKeys } = utilMapData;

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
    shouldComponentUpdate(nextProps: GroupProps, nextState: GroupState) {
      const {
        filterOption = (value: string, option: Object): boolean => {
          return option.value.indexOf(value) > -1;
        },
      } = nextProps;
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

      return true;
    }

    render() {
      const { showSearch } = this.props;
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
            onCheckAll={this.checkAllForLeft}
            canCheckKeys={sourceCheckKeys}
            onSearch={this.searchCallbackForLeft}
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
            onSelect={this.handleTargetSelect}
            data={theTargetData}
            selectedKeys={targetSelectedKeys}
            showSearch={showSearch}
            onCheckAll={this.checkAllForRight}
            canCheckKeys={targetCheckKeys}
            onSearch={this.searchCallbackForRight}
          />
        </TransFerWrap>
      );
    }
    handleSourceSelect = (e, keys, item) => {
      const selectKey = item.value;
      const { onSelectChange } = this.props;
      const { sourceSelectedKeys, targetSelectedKeys } = this.state;
      const hasSourceSelectedKeys = this.isInProps('sourceSelectedKeys');
      const selectKeys = this.checkSelectKeys(sourceSelectedKeys, selectKey);
      if (hasSourceSelectedKeys) {
        onSelectChange && onSelectChange(selectKeys, targetSelectedKeys);
        return;
      }

      this.setState(
        { sourceSelectedKeys: selectKeys },
        () => onSelectChange && onSelectChange(selectKeys, targetSelectedKeys)
      );
    };

    handleTargetSelect = (e, keys, item) => {
      const selectKey = item.value;
      const { onSelectChange } = this.props;
      const { sourceSelectedKeys, targetSelectedKeys } = this.state;
      const hasTargetSelectedKeys = this.isInProps('targetSelectedKeys');
      const selectKeys = this.checkSelectKeys(targetSelectedKeys, selectKey);
      if (hasTargetSelectedKeys) {
        onSelectChange && onSelectChange(sourceSelectedKeys, selectKeys);
        return;
      }

      this.setState(
        { targetSelectedKeys: selectKeys },
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

    handleToLeft = () => {
      const { mapData, targetSelectedKeys, targetKeys } = this.state;
      const nextTargetKeys = [...targetKeys];
      const { validKeys: moveKey, disabledKeys: disabledCheckedKeys } = splitSelectKeys(
        mapData,
        targetSelectedKeys
      );
      moveKey.forEach(item => {
        const index = nextTargetKeys.indexOf(item);
        nextTargetKeys.splice(index, 1);
      });
      const { onDirectionClick } = this.props;
      onDirectionClick && onDirectionClick(nextTargetKeys, 'left', moveKey);
      const hasTargetKeys = this.isInProps('targetKeys');
      if (hasTargetKeys) {
        return;
      }
      this.moveDataToLeft(moveKey, disabledCheckedKeys);
    };

    moveDataToLeft = (moveKey: string[], disabledCheckedKeys: string[]) => {
      const { targetKeys } = this.state;
      const targetOddKeys = [...targetKeys];
      moveKey.forEach(item => {
        const index = targetOddKeys.indexOf(item);
        targetOddKeys.splice(index, 1);
      });
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
      const hasTargetKeys = this.isInProps('targetKeys');
      if (hasTargetKeys) {
        return;
      }
      this.moveDataToRight(moveKey, disabledCheckedKeys);
    };

    moveDataToRight = (moveKey: string[], disabledCheckedKeys: string[]) => {
      const { targetKeys } = this.state;
      const addKey = [...new Set([...targetKeys, ...moveKey])];
      this.setState({ sourceSelectedKeys: disabledCheckedKeys, targetKeys: addKey });
    };

    checkAllForLeft = (checked: boolean) => {
      const { mapData, sourceSelectedKeys, targetSelectedKeys, sourceCheckKeys } = this.state;
      const { onSelectChange } = this.props;
      const disabledCheckedKeys = splitSelectKeys(mapData, sourceSelectedKeys).disabledKeys;
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
    };
    checkAllForRight = (checked: boolean) => {
      const { mapData, sourceSelectedKeys, targetSelectedKeys, targetCheckKeys } = this.state;
      const { onSelectChange } = this.props;
      const hasTargetSelectedKeys = this.isInProps('targetSelectedKeys');
      const disabledCheckedKeys = splitSelectKeys(mapData, targetSelectedKeys).disabledKeys;
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
      const { sourceData } = this.state;
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
      const { targetData } = this.state;
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
    isInProps(value: string) {
      return value in this.props;
    }
  },
  Widget.Transfer
);
