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
import Menu from '../menu';
import Input from '../input';
import CheckBox from '../checkbox';
import Theme from '../theme';
import SearchIcon from '../icon/SearchIcon';
import type { TransferProps, TransferState } from '../css/transfer';
import { TransFer, MenuWrap, Check, CheckText, NoData } from '../css/transfer';
import { isContained } from './utils';

export default ThemeProvider(
  class extends React.Component<TransferProps, TransferState> {
    maping: boolean;
    constructor(props) {
      super(props);
      this.state = {
        inputValue: '',
      };
      this.maping = false;
    }
    onClick = (e, keys, item) => {
      const { onSelect } = this.props;
      onSelect && onSelect(e, keys, item);
    };
    render() {
      const view = {
        [Widget.Input]: {
          width: 238,
          margin: {
            top: 8,
            right: 10,
            bottom: 16,
            left: 10,
          },
        },
      };
      const { showSearch, selectedKeys = [], data = [], canCheckKeys } = this.props;
      const { inputValue } = this.state;
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
            : isContained(data, selectedKeys);

      return (
        <TransFer>
          <Check>
            <CheckBox
              onChange={() => this.props.onCheckAll(!checked)}
              checked={checked}
              indeterminate={selectedKeys.length > 0}
            >
              可配置
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
              <Menu
                checkedCSS={'checkbox'}
                mutliple={true}
                data={data}
                selectedKeys={selectedKeys}
                onClick={this.onClick}
              />
            </MenuWrap>
          ) : (
            <NoData style={{ height: '250px' }}>{inputValue ? '无匹配数据' : '无数据'}</NoData>
          )}
        </TransFer>
      );
    }
    handleInputChange = (value: Object) => {
      const { newValue } = value;
      const { onSearch } = this.props;
      this.setState({
        inputValue: newValue,
      });
      onSearch && onSearch(newValue);
    };
  },
  Widget.Transfer
);
