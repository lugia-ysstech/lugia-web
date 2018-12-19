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
      this.targetModel.setDisplayValue(theDisplayValue);
      const cancelItem = getCancelItem(
        theTargetKeys,
        mapData,
        { valueField, displayField },
        theDisplayValue
      );
      this.targetModel.setCancelItem(cancelItem);
      this.sourceModel.setCancelItem(cancelItem);
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
      const {
        data,
        valueField = 'value',
        type = 'panel',
        displayField = 'text',
        targetKeys = [],
      } = nextProps;
      if (nextProps.data.length !== this.props.data.length || nextProps.data !== this.props.data) {
        const theTargetKeys = this.getTargetKeys(nextProps);
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
      if (this.isInProps('targetSelectedKeys')) {
        const targetSelectKeys = this.getTargetSelectedKeys(nextProps);
        this.targetModel.changeSelectedKeys(targetSelectKeys);
      }
      if (this.isInProps('sourceSelectedKeys')) {
        const keys = this.getSourceSelectedKeys(nextProps);
        this.sourceModel.changeSelectedKeys(keys);
      }
      if (this.isInProps('targetKeys')) {
        const targetSelectKeys = this.getTargetKeys(nextProps);
        this.targetModel.changeList(targetSelectKeys);
        this.sourceModel.changeList(targetSelectKeys);

        const { sourceEnableKeys, targetEnableKeys } = this.getEnableKeys(type, targetKeys);
        this.targetModel.setCanCheckKeys(targetEnableKeys);
        this.sourceModel.setCanCheckKeys(sourceEnableKeys);
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
          <OperationBtn>
            <Button onClick={this.handleToRight} type="primary">
              <BtnText>></BtnText>
            </Button>
            <br />
            <Button onClick={this.handleToLeft} type="primary">
              <BtnText>{'<'}</BtnText>
            </Button>
          </OperationBtn>
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
      const { onSelectChange } = this.props;
      const targetSelectedKeys = this.targetModel.getSelectedkeys();
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
      onSelectChange && onSelectChange(sourceSelectedKeys, item);

      const hasTargetSelectedKeys = this.isInProps('targetSelectedKeys');
      if (hasTargetSelectedKeys) {
        return;
      }
      this.targetModel.changeSelectedKeys(item);
    };

    handleToLeft = () => {
      const {
        moveKey,
        disabledKeys,
        nextTargetKeys,
      } = this.targetModel.getMoveAfterKeysForTarget();

      const { onDirectionClick, type = 'panel' } = this.props;
      onDirectionClick && onDirectionClick(nextTargetKeys, 'left', moveKey);

      const hasTargetKeys = this.isInProps('targetKeys');
      if (hasTargetKeys) {
        return;
      }
      this.targetModel.changeSelectedKeys(disabledKeys);
      this.targetModel.changeList(nextTargetKeys);
      this.sourceModel.changeList(nextTargetKeys);

      const { sourceEnableKeys, targetEnableKeys } = this.getEnableKeys(type, nextTargetKeys);
      this.targetModel.setCanCheckKeys(targetEnableKeys);
      this.sourceModel.setCanCheckKeys(sourceEnableKeys);
    };

    handleToRight = () => {
      const {
        moveKey,
        disabledKeys,
        nextTargetKeys,
      } = this.sourceModel.getMoveAfterKeysForSource();

      const { onDirectionClick, type = 'panel' } = this.props;
      onDirectionClick && onDirectionClick(nextTargetKeys, 'right', moveKey);

      const hasTargetKeys = this.isInProps('targetKeys');
      if (hasTargetKeys) {
        return;
      }
      this.sourceModel.changeSelectedKeys(disabledKeys);
      this.sourceModel.changeList(nextTargetKeys);
      this.targetModel.changeList(nextTargetKeys);

      const { sourceEnableKeys, targetEnableKeys } = this.getEnableKeys(type, nextTargetKeys);
      this.targetModel.setCanCheckKeys(targetEnableKeys);
      this.sourceModel.setCanCheckKeys(sourceEnableKeys);
    };

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
      const sourceData = { ...mapData },
        targetEnableKeys = [];
      if (!targetKeys || !targetKeys.length) {
        return { sourceEnableKeys: Object.keys(sourceData), targetEnableKeys };
      }
      targetKeys.forEach(item => {
        if (sourceData[item]) {
          targetEnableKeys.push(item);
          delete sourceData[item];
        }
      });
      return { sourceEnableKeys: Object.keys(sourceData), targetEnableKeys };
    }

    checkAllForLeft = (checked: boolean) => {
      const { onSelectChange } = this.props;
      const checkKeys = this.sourceModel.getCheckAllKeys(checked);
      const targetSelectedKeys = this.targetModel.getSelectedkeys();

      onSelectChange && onSelectChange(checkKeys, targetSelectedKeys);

      const hasSourceSelectedKeys = this.isInProps('sourceSelectedKeys');
      if (hasSourceSelectedKeys) {
        return;
      }
      this.sourceModel.changeSelectedKeys(checkKeys);
    };
    checkAllForRight = (checked: boolean) => {
      const { onSelectChange } = this.props;
      const checkKeys = this.targetModel.getCheckAllKeys(checked);
      const sourceSelectedKeys = this.sourceModel.getSelectedkeys();
      onSelectChange && onSelectChange(sourceSelectedKeys, checkKeys);

      const hasTargetSelectedKeys = this.isInProps('targetSelectedKeys');
      if (hasTargetSelectedKeys) {
        return;
      }
      this.targetModel.changeSelectedKeys(checkKeys);
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
      this.sourceModel.setCancelItem(cancelItem);
      this.targetModel.setDisplayValue(newDisplayValue);
      this.targetModel.changeList(newTargetKeys);
      this.sourceModel.changeList(newTargetKeys);
    };
    isInProps(value: string) {
      return value in this.props;
    }
  },
  Widget.Transfer
);
