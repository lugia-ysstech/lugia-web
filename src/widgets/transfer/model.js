/**
 *
 * create by ligx
 *
 * @flow
 */
import EventEmitter from '../common/EventEmitter';

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

  constructor(props: TransferModelProps) {
    super();
    const { type, list, selectedKeys } = props;
    this.type = type;
    this.list = list;
    this.selectedKeys = selectedKeys;
  }

  changeSelectedKeys(selectKeys: string[]) {
    this.selectedKeys = selectKeys;
    this.emit('onSelectedKeyChange', { data: selectKeys });
  }

  changeList(list: string[]) {
    this.list = list;
    this.emit('onListChange', { data: list });
  }

  getSelectedkeys(): string[] {
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
