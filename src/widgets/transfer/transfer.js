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
import TransferMenu from './transfer-menu';
import Tree from '../tree';
import Input from '../input';
import CheckBox from '../checkbox';
import Theme from '../theme';
import SearchIcon from '../icon/SearchIcon';
import type { TransferProps, TransferState } from '../css/transfer';
import {
  CancelBox,
  CancelBoxItem,
  Check,
  CheckText,
  MenuWrap,
  TransFer,
  TreeWrap,
} from '../css/transfer';
import { getKeys, isContained, filterEnableKeysFromSelectKeys } from './utils';

export default ThemeProvider(
  class extends React.Component<TransferProps, TransferState> {
    treeData: Object[];

    constructor(props) {
      super(props);
      const { model } = this.props;
      const selectedKeys = filterEnableKeysFromSelectKeys(model.getList(), model.getSelectedkeys());
      this.state = {
        inputValue: '',
        selectedKeys,
        typeList: model.getTypeList(),
        cancelItem: model.getCancelItem(),
        treeData: model.getTreeData(),
        treeDataLength: undefined,
      };

      model.on('onSelectedKeyChange', param => {
        const { data } = param;
        this.setState({
          selectedKeys: data,
        });
      });

      model.on('onListChange', param => {
        const { data } = param;
        this.setState({
          typeList: data,
        });
      });

      model.on('onCancelItemChange', param => {
        const { data } = param;
        this.setState({
          cancelItem: data,
        });
      });
    }

    createCancelCheckBox = () => {
      const { displayField, valueField } = this.props;
      const { cancelItem = [] } = this.state;
      const hasCancelItem = cancelItem && cancelItem.length > 0;
      if (hasCancelItem) {
        const elements = [];
        cancelItem.forEach((item, index) => {
          elements.push(
            <CancelBoxItem>
              <CheckBox
                key={index}
                value={item[valueField]}
                cancel
                handleCancelItemClick={this.cancelItemClick}
              >
                {item[displayField]}
              </CheckBox>
            </CancelBoxItem>
          );
        });
        return elements;
      }

      return null;
    };

    render() {
      const { selectedKeys = [], typeList, treeData, inputValue, treeDataLength } = this.state;
      const {
        showSearch,
        data = [],
        needCancelBox = false,
        type,
        title,
        direction,
        displayField,
        valueField,
      } = this.props;

      const view = {
        [Widget.Input]: {
          width: 235,
          margin: {
            top: 8,
            right: 10,
            bottom: 16,
            left: 10,
          },
        },
      };
      const menuView = {},
        treeView = {};
      if (direction === 'Source') {
        menuView[Widget.Menu] = {
          height: 300,
        };
        treeView[Widget.Tree] = {
          height: 300,
        };
      } else {
        menuView[Widget.Menu] = {
          height: 240,
        };
      }
      const inputConfig = {};
      if (!inputValue) {
        inputConfig.suffix = <SearchIcon />;
      }
      const canCheckKeys = this.props.model.getCanCheckKeys();
      const length = canCheckKeys && canCheckKeys.length;
      const checked =
        selectedKeys.length === 0
          ? false
          : length
          ? isContained(selectedKeys, canCheckKeys)
          : isContained(getKeys(data ? data : [], valueField), selectedKeys);
      const cancelBox = needCancelBox ? <CancelBox>{this.createCancelCheckBox()}</CancelBox> : null;
      const dataLength = this.getDataLength(type, direction);
      return (
        <TransFer>
          <Check>
            <CheckBox
              onChange={() => this.props.onCheckAll(!checked)}
              checked={checked}
              indeterminate={selectedKeys.length > 0}
            >
              {title}
            </CheckBox>

            <CheckText>
              {selectedKeys.length}/{type === 'panel' ? dataLength : treeDataLength}
            </CheckText>
          </Check>
          {showSearch ? (
            <Theme config={view}>
              <Input
                onChange={this.handleInputChange}
                placeholder={'搜索您想知道的内容'}
                {...inputConfig}
              />
            </Theme>
          ) : null}

          <MenuWrap>
            <Theme config={menuView}>
              {type === 'panel' ? (
                <TransferMenu
                  {...this.props}
                  query={inputValue}
                  {...typeList}
                  selectedKeys={selectedKeys}
                />
              ) : (
                <TreeWrap direction={direction}>
                  <Theme config={treeView}>
                    <Tree
                      displayField={displayField}
                      valueField={valueField}
                      data={treeData}
                      value={selectedKeys}
                      expandAll
                      mutliple
                      onChange={this.handleTreeChange}
                      query={inputValue}
                      {...typeList}
                      getTreeData={this.getTreeData}
                    />
                  </Theme>
                </TreeWrap>
              )}
            </Theme>
          </MenuWrap>

          {cancelBox}
        </TransFer>
      );
    }

    getTreeData = (data: Object[]) => {
      const oldLength = this.treeData && this.treeData.length;
      if (data.length !== oldLength) {
        this.setState({
          treeDataLength: data.length,
        });
      }
      this.treeData = data;
    };

    getDataLength = (type: 'panel' | 'tree', direction: 'Source' | 'Target'): number => {
      let length;
      const { data = [], model } = this.props;
      const { cancelItem = [] } = this.state;
      if (type === 'panel') {
        if (direction === 'Source') {
          length = data.length - model.getList().length + cancelItem.length;
        } else {
          length = model.getList().length - cancelItem.length;
        }
        return length;
      }

      return 0;
    };

    cancelItemClick = (value: string) => {
      const { onCancelItemClick } = this.props;
      onCancelItemClick && onCancelItemClick(value);
    };
    handleInputChange = (value: Object) => {
      const { newValue } = value;
      this.setState({
        inputValue: newValue,
      });
    };
    onClick = (e, keys, item) => {
      const { onSelect, valueField } = this.props;
      onSelect && onSelect([item[valueField]]);
    };
    handleTreeChange = value => {
      const { onSelect } = this.props;
      onSelect && onSelect(value);
    };

    componentWillUnmount(): void {
      this.props.model.removeAllListeners();
    }
  },
  Widget.Transfer
);
