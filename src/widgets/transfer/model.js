/**
 *
 * create by ligx
 *
 * @flow
 */
import EventEmitter from '../common/EventEmitter';
import { splitSelectKeys } from './utils';

type TransferModelEventType = 'onSelectedKeyChange' | 'onListChange';

type TransferModelProps = {
  type: TransferModelType,
  selectedKeys: string[],
  list: string[],
};

type TransferModelType = 'Source' | 'Target';
export default class TransferModel extends EventEmitter<TransferModelEventType> {
  type: TransferModelType;
  selectedKeys: string[];
  list: string[];
  mapData: Object;
  cancelItem: Object[];

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

  getMoveAfterKeysForSource() {
    const { validKeys: moveKey, disabledKeys } = splitSelectKeys(this.mapData, this.selectedKeys);
    const nextTargetKeys = [...new Set([...this.list, ...moveKey])];
    return { moveKey, disabledKeys, nextTargetKeys };
  }

  getMoveAfterKeysForTarget() {
    const { validKeys: moveKey, disabledKeys } = splitSelectKeys(this.mapData, this.selectedKeys);
    const nextTargetKeys = [...this.list];
    moveKey.forEach(item => {
      const index = nextTargetKeys.indexOf(item);
      if (index > -1) {
        nextTargetKeys.splice(index, 1);
      }
    });
    return { moveKey, disabledKeys, nextTargetKeys };
  }

  setCancelItem(item: Object[]) {
    this.cancelItem = item;
  }

  getCancelItem(): Object[] {
    return this.cancelItem;
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
    //todo: 过滤掉 disabled 项 和 黑白 单 里面 的项；
    return this.selectedKeys;
  }

  getList(): string[] {
    return this.list;
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
}
