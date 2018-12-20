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
import TransFerButton from './transfer-button';
import type { GroupProps, GroupState } from '../css/transfer-group';
import { TransFerWrap } from '../css/transfer-group';
import { DisplayField, ValueField } from '../consts/props';
import {
  getCancelItem,
  getPanelSourceDataAndTargetData,
  getTreeData,
  getTruthValue,
} from './utils';
import { getMapData } from './menu-utils';
import TransferModel from './model';

export default ThemeProvider(
  class extends React.Component<GroupProps, GroupState> {
    static displayName = 'Transfer';
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
      const { valueField = 'value', displayField = 'text' } = props;
      this.initModel(props, theTargetKeys);
      this.targetModel.setDisplayValue(theDisplayValue);
      const cancelItem = getCancelItem(
        theTargetKeys,
        this.sourceModel.getMapData(),
        { valueField, displayField },
        theDisplayValue
      );
      this.targetModel.setCancelItem(cancelItem);
      this.sourceModel.setCancelItem(cancelItem);
    }

    initModel(props: GroupProps, theTargetKeys) {
      const { data, valueField = 'value', type = 'panel', displayField = 'text' } = props;
      let mapData;
      if (type === 'panel') {
        mapData = getMapData(data, valueField);
        const { targetCheckKeys, sourceCheckKeys } = getPanelSourceDataAndTargetData(
          data,
          theTargetKeys,
          valueField
        );
        this.targetModel.setCanCheckKeys(targetCheckKeys);
        this.sourceModel.setCanCheckKeys(sourceCheckKeys);
      } else {
        const { mapData: maps, target } = getTreeData(data, {
          displayField,
          valueField,
        });
        mapData = maps;
        this.targetModel.setTreeData(target);
        this.sourceModel.setTreeData(target);

        const { sourceEnableKeys, targetEnableKeys } = this.getTreeCanCheckKeys(
          maps,
          theTargetKeys
        );
        this.targetModel.setCanCheckKeys(targetEnableKeys);
        this.sourceModel.setCanCheckKeys(sourceEnableKeys);
      }
      this.targetModel.setMapData(mapData);
      this.sourceModel.setMapData(mapData);
    }

    getTargetSelectedKeys(props) {
      console.info(
        getTruthValue('targetSelectedKeys', props, undefined, 'defaultTargetSelectedKeys')
      );
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
      const {
        valueField = 'value',
        type = 'panel',
        displayField = 'text',
        targetKeys = [],
      } = nextProps;

      if (nextProps.data.length !== this.props.data.length || nextProps.data !== this.props.data) {
        const theTargetKeys = this.getTargetKeys(nextProps);
        this.initModel(nextProps, theTargetKeys);
      }

      if (this.isInProps('targetSelectedKeys')) {
        this.targetModel.changeSelectedKeys(this.getTargetSelectedKeys(nextProps));
      }

      if (this.isInProps('sourceSelectedKeys')) {
        this.sourceModel.changeSelectedKeys(this.getSourceSelectedKeys(nextProps));
      }

      if (this.isInProps('targetKeys')) {
        const targetSelectKeys = this.getTargetKeys(nextProps);
        this.updateChangeList(targetSelectKeys);
      }

      if (this.isInProps('displayValue')) {
        const theTargetKeys = this.targetModel.getList();
        const mapData = this.targetModel.getMapData();
        const theDisplayValue = this.getDisplayValue(nextProps);
        const cancelItem = getCancelItem(
          theTargetKeys,
          mapData,
          { valueField, displayField },
          theDisplayValue
        );
        this.targetModel.changeCancelItem(cancelItem);
        this.sourceModel.setCancelItem(cancelItem);
        this.targetModel.setDisplayValue(theDisplayValue);
      }

      return true;
    }

    render() {
      const { type = 'panel', valueField = ValueField, displayField = DisplayField } = this.props;

      return (
        <TransFerWrap>
          <TransFer
            key="1"
            direction="Source"
            onSelect={this.handleSourceSelect}
            model={this.sourceModel}
            onCheckAll={this.checkAllForLeft}
            title="列表A"
            {...this.props}
            displayField={displayField}
            valueField={valueField}
            type={type}
          />
          <TransFerButton
            leftModel={this.sourceModel}
            rightModel={this.targetModel}
            onLeftClick={this.handleToRight}
            onRightClick={this.handleToLeft}
          />
          <TransFer
            key="2"
            model={this.targetModel}
            direction="Target"
            onSelect={this.handleTargetSelect}
            onCheckAll={this.checkAllForRight}
            needCancelBox
            onCancelItemClick={this.handleCancelItemClick}
            title="列表B"
            {...this.props}
            displayField={displayField}
            valueField={valueField}
            type={type}
          />
        </TransFerWrap>
      );
    }

    handleSourceSelect = (item: string[]) => {
      const targetSelectedKeys = this.targetModel.getSelectedkeys();
      this.onSelectChange(item, targetSelectedKeys);
      this.changeSelectedKeys('sourceSelectedKeys', item);
    };

    handleTargetSelect = (item: string[]) => {
      const sourceSelectedKeys = this.sourceModel.getSelectedkeys();
      this.onSelectChange(sourceSelectedKeys, item);
      this.changeSelectedKeys('targetSelectedKeys', item);
    };

    onSelectChange(source: string[], target: string[]) {
      const { onSelectChange } = this.props;
      onSelectChange && onSelectChange(source, target);
    }

    changeSelectedKeys(type: 'targetSelectedKeys' | 'sourceSelectedKeys', item: string[]) {
      const isLimit = this.isInProps(type);
      if (isLimit) {
        return;
      }

      const targetModel = type === 'targetSelectedKeys' ? this.targetModel : this.sourceModel;
      targetModel.changeSelectedKeys(item);
    }

    handleToLeft = () => {
      this.handleTransfer('left');
    };

    handleToRight = () => {
      this.handleTransfer('right');
    };

    handleTransfer = (direction: 'left' | 'right') => {
      const targetModel = direction === 'right' ? this.sourceModel : this.targetModel;
      const modelFunction =
        direction === 'right'
          ? this.sourceModel.getMoveAfterKeysForSource
          : this.targetModel.getMoveAfterKeysForTarget;
      const { moveKey, disabledKeys, nextTargetKeys } = modelFunction();

      const { onDirectionClick } = this.props;
      onDirectionClick && onDirectionClick(nextTargetKeys, direction, moveKey);

      const hasTargetKeys = this.isInProps('targetKeys');
      if (hasTargetKeys) {
        return;
      }
      targetModel.changeSelectedKeys(disabledKeys);
      this.updateChangeList(nextTargetKeys);
    };

    updateChangeList(nextTargetKeys) {
      const { type = 'panel' } = this.props;

      this.targetModel.changeList(nextTargetKeys);
      this.sourceModel.changeList(nextTargetKeys);

      const { sourceEnableKeys, targetEnableKeys } = this.getEnableKeys(type, nextTargetKeys);
      this.targetModel.setCanCheckKeys(targetEnableKeys);
      this.sourceModel.setCanCheckKeys(sourceEnableKeys);
    }

    getEnableKeys = (type: 'panel' | 'tree', nextTargetKeys: string[]) => {
      const { data, valueField = 'value' } = this.props;
      if (type === 'panel') {
        const { targetCheckKeys, sourceCheckKeys } = getPanelSourceDataAndTargetData(
          data,
          nextTargetKeys,
          valueField
        );
        return { sourceEnableKeys: sourceCheckKeys, targetEnableKeys: targetCheckKeys };
      }
      const maps = this.sourceModel.getMapData();
      const { sourceEnableKeys, targetEnableKeys } = this.getTreeCanCheckKeys(maps, nextTargetKeys);
      return { sourceEnableKeys, targetEnableKeys };
    };

    getTreeCanCheckKeys(mapData: Object, targetKeys: string[]) {
      const sourceData = { ...mapData };
      if (!targetKeys || !targetKeys.length) {
        return { sourceEnableKeys: Object.keys(sourceData), targetEnableKeys: [] };
      }
      const targetEnableKeys = targetKeys.filter(item => {
        const isInSource = sourceData[item];
        if (isInSource) {
          delete sourceData[item];
        }
        return isInSource;
      });
      return { sourceEnableKeys: Object.keys(sourceData), targetEnableKeys };
    }

    checkAllForLeft = (checked: boolean) => {
      const checkKeys = this.sourceModel.getCheckAllKeys(checked);
      const targetSelectedKeys = this.targetModel.getSelectedkeys();

      this.onSelectChange(checkKeys, targetSelectedKeys);
      this.changeSelectedKeys('sourceSelectedKeys', checkKeys);
    };

    checkAllForRight = (checked: boolean) => {
      const checkKeys = this.targetModel.getCheckAllKeys(checked);
      const sourceSelectedKeys = this.sourceModel.getSelectedkeys();

      this.onSelectChange(sourceSelectedKeys, checkKeys);
      this.changeSelectedKeys('targetSelectedKeys', checkKeys);
    };

    handleCancelItemClick = (value: string) => {
      const displayValue = this.targetModel.getDisplayValue();
      const targetKeys = this.targetModel.getList();
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

      const mapData = this.targetModel.getMapData();
      const { displayField = 'text', valueField = 'value' } = this.props;
      const cancelItem = getCancelItem(
        newTargetKeys,
        mapData,
        { valueField, displayField },
        newDisplayValue
      );

      this.targetModel.changeCancelItem(cancelItem);
      this.targetModel.setDisplayValue(newDisplayValue);
      this.targetModel.changeList(newTargetKeys);

      this.sourceModel.setCancelItem(cancelItem);
      this.sourceModel.changeList(newTargetKeys);
    };

    isInProps(value: string) {
      return value in this.props;
    }
  },
  Widget.Transfer
);
