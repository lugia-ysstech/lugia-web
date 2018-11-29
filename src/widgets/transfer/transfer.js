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
import Tree from '../tree';
import Input from '../input';
import CheckBox from '../checkbox';
import Theme from '../theme';
import SearchIcon from '../icon/SearchIcon';
import type { TransferProps, TransferState } from '../css/transfer';
import { TransFer, MenuWrap, Check, CheckText, NoData } from '../css/transfer';
import { isContained, forData } from './utils';

// const treeData = [
//   {
//     text: '0-0',
//     value: '0-0',
//     children: [
//       {
//         text: '0-0-0',
//         value: '0-0-0',
//         children: [
//           { text: '0-0-0-0', value: '0-0-0-0' },
//           { text: '0-0-0-1', value: '0-0-0-1' },
//           { text: '0-0-0-2', value: '0-0-0-2' },
//         ],
//       },
//       {
//         text: '0-0-1',
//         value: '0-0-1',
//         children: [
//           { text: '0-0-1-0', value: '0-0-1-0' },
//           { text: '0-0-1-1', value: '0-0-1-1' },
//           { text: '0-0-1-2', value: '0-0-1-2' },
//         ],
//       },
//       {
//         text: '0-0-2',
//         value: '0-0-2',
//       },
//     ],
//   },
//   {
//     text: '0-1',
//     value: '0-1',
//     children: [
//       { text: '0-1-0-0', value: '0-1-0-0' },
//       { text: '0-1-0-1', value: '0-1-0-1' },
//       { text: '0-1-0-2', value: '0-1-0-2' },
//     ],
//   },
//   {
//     text: '0-2',
//     value: '0-2',
//   },
// ];
//
// const testData = [
//   { text: '1', value: '1', children: [{ text: '1.1', value: '1.1' }] },
//   { text: '1', value: '1', children: [{ text: '1.2', value: '1.2' }] },
// ];

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
      // const newData = [];
      // forData(testData, newData);
      // console.info(newData);
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
              {/*<Tree*/}
              {/*data={newData}*/}
              {/*// value={['1.1.1.1.1']}*/}
              {/*expandAll*/}
              {/*mutliple*/}
              {/*onClick={this.handleTreeChange}*/}
              {/*/>*/}
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
    // handleTreeChange = (value, a, b, c) => {
    //   console.info(value, a, b, c);
    // };
  },
  Widget.Transfer
);
