/**
 *
 * create by ligx
 *
 * @flow
 */
import EventEmitter from '../common/EventEmitter';
import { splitSelectKeys } from './utils';

type TransferModelEventType = 'onSelectedKeyChange' | 'onListChange';
type TransferModelType = 'Source' | 'Target';
type TransferModelProps = {
  type: TransferModelType,
  selectedKeys: string[],
  list: string[],
};

export default class TransferModel extends EventEmitter<TransferModelEventType> {
  type: TransferModelType;
  selectedKeys: string[];
  list: string[];
  mapData: Object;
  cancelItem: Object[];
  treeData: Object[];
  canCheckKeys: string[];
  displayValue: string[];

  constructor(props: TransferModelProps) {
    super();
    const { type, list, selectedKeys } = props;
    this.type = type;
    this.list = list;
    this.selectedKeys = selectedKeys;
  }

  setMapData(mapData: Object) {
    this.mapData = mapData;
  }

  getMapData(): Object {
    return this.mapData;
  }

  setDisplayValue(displayValue: string[]) {
    this.displayValue = displayValue;
  }

  getDisplayValue(): string[] {
    return this.displayValue;
  }

  setTreeData(treeData: Object[]) {
    this.treeData = treeData;
  }

  getTreeData() {
    return this.treeData;
  }

  setCanCheckKeys(keys: string[]) {
    this.canCheckKeys = keys;
  }

  getCanCheckKeys() {
    return this.canCheckKeys;
  }

  getCheckAllKeys = (checked: boolean) => {
    const { disabledKeys: disabledCheckedKeys } = this.handleSplitSelectKeys();
    const checkKeys = checked
      ? [...this.canCheckKeys, ...disabledCheckedKeys]
      : disabledCheckedKeys || [];

    return checkKeys;
  };

  getMoveAfterKeysForSource = () => {
    const { validKeys: moveKey, disabledKeys } = this.handleSplitSelectKeys();
    const nextTargetKeys = [...new Set([...this.list, ...moveKey])];
    return { moveKey, disabledKeys, nextTargetKeys };
  };

  getMoveAfterKeysForTarget = () => {
    const { validKeys: moveKey, disabledKeys } = this.handleSplitSelectKeys();
    const nextTargetKeys: string[] = this.list.filter((item: string): boolean => {
      return !moveKey.includes(item);
    });
    return { moveKey, disabledKeys, nextTargetKeys };
  };

  handleSplitSelectKeys() {
    return splitSelectKeys(this.mapData, this.selectedKeys);
  }

  setCancelItem(item: Object[]) {
    this.cancelItem = item;
  }

  getCancelItem(): Object[] {
    return this.cancelItem;
  }

  changeCancelItem(item: Object[]) {
    this.cancelItem = item;
    this.emit('onCancelItemChange', { data: item });
  }

  changeSelectedKeys(selectKeys: string[]) {
    this.selectedKeys = selectKeys;
    this.emit('onSelectedKeyChange', { data: selectKeys });
  }

  changeList(list: string[]) {
    this.list = list;
    this.emit('onListChange', { data: this.getTypeList() });
  }

  getSelectedkeys(): string[] {
    return this.selectedKeys;
  }

  getList(): string[] {
    return this.list || [];
  }

  getTypeList(): Object {
    const { type } = this;

    switch (type) {
      case 'Source':
        return {
          blackList: this.list,
        };
      case 'Target':
        return {
          whiteList: this.list,
        };
      default:
        console.error('不支持的类型');
        return {
          whiteList: this.list,
        };
    }
  }

  getDataLength = (data: Object[]): number => {
    let length;
    if (this.type === 'Source') {
      length = data.length - this.getList().length + this.cancelItem.length;
    } else {
      length = this.getList().length - this.cancelItem.length;
    }
    return length;
  };
}
