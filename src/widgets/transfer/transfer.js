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
import { filterEnableKeysFromSelectKeys } from './utils';

export default ThemeProvider(
  class extends React.Component<TransferProps, TransferState> {
    treeData: Object[];
    static displayName = 'TransferPanel';
    constructor(props) {
      super(props);
      const { model, direction } = this.props;
      const selectedKeys = filterEnableKeysFromSelectKeys(
        model.getList(),
        model.getSelectedkeys(),
        direction
      );
      this.state = {
        inputValue: '',
        selectedKeys,
        typeList: model.getTypeList(),
        cancelItem: model.getCancelItem(),
        treeData: model.getTreeData(),
        treeDataLength: 0,
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
        return cancelItem.map((item, index) => {
          return (
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
      }

      return null;
    };

    render() {
      const { selectedKeys = [], treeDataLength, cancelItem } = this.state;
      const { needCancelBox = false, type, title } = this.props;

      const cancelBox =
        needCancelBox && cancelItem && cancelItem.length ? (
          <CancelBox>{this.createCancelCheckBox()}</CancelBox>
        ) : null;
      const dataLength = type === 'panel' ? this.getDataLength() : treeDataLength;
      const selectKeyLength = (selectedKeys && selectedKeys.length) || 0;
      const checked =
        selectKeyLength === 0
          ? false
          : type === 'panel'
          ? selectKeyLength >= this.getDataLength()
          : selectKeyLength >= treeDataLength;
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
              {selectedKeys.length}/{dataLength}
            </CheckText>
          </Check>
          {this.getSearchBox()}
          {this.getTransferPanel()}
          {cancelBox}
        </TransFer>
      );
    }

    getSearchBox() {
      const { inputView } = this.getInputThemeConfig();
      const { inputValue } = this.state;
      const { showSearch } = this.props;
      const inputConfig = {};
      if (!inputValue) {
        inputConfig.suffix = <SearchIcon />;
      }

      return showSearch ? (
        <Theme config={inputView}>
          <Input
            onChange={this.handleInputChange}
            placeholder={'搜索您想知道的内容'}
            {...inputConfig}
          />
        </Theme>
      ) : null;
    }

    getTransferPanel() {
      const { selectedKeys = [], typeList, treeData, inputValue } = this.state;
      const { type, direction, displayField, valueField } = this.props;

      const { menuView, treeView, wrapHeight } = this.getPanelThemeConfig(direction);

      return type === 'panel' ? (
        <MenuWrap>
          <Theme config={menuView}>
            <TransferMenu
              {...this.props}
              query={inputValue}
              {...typeList}
              selectedKeys={selectedKeys}
              height={wrapHeight}
            />
          </Theme>
        </MenuWrap>
      ) : (
        <TreeWrap height={wrapHeight}>
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
      );
    }

    getInputThemeConfig() {
      const inputView = {
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
      return { inputView };
    }
    getPanelThemeConfig = direction => {
      const { theme = {} } = this.props;
      const { height = 300 } = theme;
      let wrapHeight = height;
      const menuView = {},
        treeView = {};
      if (direction === 'Source') {
        menuView[Widget.Menu] = {
          height,
        };
        treeView[Widget.Tree] = {
          height,
        };
      } else {
        const { cancelItem } = this.state;
        const targetHeight = cancelItem && cancelItem.length ? height - 60 : height;
        wrapHeight = targetHeight;
        menuView[Widget.Menu] = {
          height: targetHeight,
        };
        treeView[Widget.Tree] = {
          height: targetHeight,
        };
      }
      return { menuView, treeView, wrapHeight };
    };

    getTreeData = (data: Object[]) => {
      const { valueField = 'value', model } = this.props;
      const oldLength = this.treeData && this.treeData.length;
      if (data.length !== oldLength) {
        model.setCanCheckKeys(
          data.map(item => {
            return item[valueField];
          })
        );

        this.setState({
          treeDataLength: data.length,
        });
      }
      this.treeData = data;
    };

    getDataLength = (): number => {
      const { model, data } = this.props;
      return model.getDataLength(data);
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
