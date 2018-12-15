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
  NoData,
  TransFer,
  TreeWrap,
} from '../css/transfer';
import { getKeys, isContained } from './utils';

export default ThemeProvider(
  class extends React.Component<TransferProps, TransferState> {
    maping: boolean;

    constructor(props) {
      super(props);

      const { model } = this.props;

      this.state = {
        inputValue: '',
        selectedKeys: model.getSelectedkeys(),
        typeList: model.getTypeList(),
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
      this.maping = false;
    }

    createCancelCheckBox = () => {
      const { cancelItem = [], displayField, valueField } = this.props;
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
      const { selectedKeys = [], typeList } = this.state;

      const {
        showSearch,
        data = [],
        canCheckKeys,
        needCancelBox = false,
        type,
        title,
        direction,
        displayField,
        valueField,
      } = this.props;
      const { inputValue } = this.state;
      const view = {
        [Widget.Input]: {
          margin: {
            top: 8,
            right: 10,
            bottom: 16,
            left: 10,
          },
        },
      };
      const menuView = {};
      if (direction === 'left') {
        menuView[Widget.Menu] = {
          height: 310,
        };
        menuView[Widget.Tree] = {
          height: 310,
        };
      }
      const inputConfig = {};
      if (!inputValue) {
        inputConfig.suffix = <SearchIcon />;
      }
      const length = canCheckKeys && canCheckKeys.length;
      const checked =
        selectedKeys.length === 0
          ? false
          : length
          ? isContained(selectedKeys, canCheckKeys)
          : isContained(getKeys(data ? data : [], valueField), selectedKeys);
      const list = {};

      const cancelBox = needCancelBox ? <CancelBox>{this.createCancelCheckBox()}</CancelBox> : null;
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
              {selectedKeys.length}/{data.length}
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

          {data.length > 0 ? (
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
                    <Tree
                      displayField={displayField}
                      valueField={valueField}
                      data={data}
                      value={selectedKeys}
                      expandAll
                      mutliple
                      onChange={this.handleTreeChange}
                      query={inputValue}
                      {...typeList}
                    />
                  </TreeWrap>
                )}
              </Theme>
            </MenuWrap>
          ) : (
            <NoData direction={direction}>{inputValue ? '无匹配数据' : '无数据'}</NoData>
          )}
          {cancelBox}
        </TransFer>
      );
    }

    cancelItemClick = (value: string) => {
      const { onCancelItemClick } = this.props;
      onCancelItemClick && onCancelItemClick(value);
    };
    handleInputChange = (value: Object) => {
      const { newValue } = value;
      const { onSearch, type = 'panel' } = this.props;
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
