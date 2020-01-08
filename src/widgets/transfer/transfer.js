/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { getBorder, getBoxShadow } from '@lugia/theme-utils';
import { deepMerge } from '@lugia/object-utils';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import TransferMenu from './transfer-menu';
import Tree from '../tree';
import Menu from '../menu';
import Input from '../input';
import CheckBox from '../checkbox';
import SearchIcon from '../icon/SearchIcon';
import type { TransferProps, TransferState } from '../css/transfer';
import { CancelBox, CancelBoxItem, Check, CheckText, TransFer, TreeWrap } from '../css/transfer';
import { filterEnableKeysFromSelectKeys } from './utils';

const { MenuItem } = Menu;
const cancelBoxHeight = 70;

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
      const { displayField, valueField, cancelCheckboxTheme = {} } = this.props;
      const { cancelItem = [] } = this.state;
      const hasCancelItem = cancelItem && cancelItem.length > 0;
      if (hasCancelItem) {
        return cancelItem.map((item, index) => {
          return (
            <MenuItem key={item[valueField]}>
              <CancelBoxItem>
                <CheckBox
                  key={index}
                  value={item[valueField]}
                  cancel
                  handleCancelItemClick={this.cancelItemClick}
                  {...cancelCheckboxTheme}
                >
                  {item[displayField]}
                </CheckBox>
              </CancelBoxItem>
            </MenuItem>
          );
        });
      }

      return null;
    };

    getCancelMenuTheme = () => {
      const { cancelBoxMenuTheme = {}, needCancelBox = false } = this.props;
      if (!needCancelBox) {
        return {};
      }
      const { viewClass, theme } = cancelBoxMenuTheme;
      const defaultCancelMenuTheme = {
        [viewClass]: {
          Container: {
            normal: {
              height: cancelBoxHeight,
              width: 200,
            },
          },
        },
      };
      const cancelMenuTheme = deepMerge(defaultCancelMenuTheme, theme);

      return {
        viewClass,
        theme: cancelMenuTheme,
      };
    };

    render() {
      const { selectedKeys = [], treeDataLength, cancelItem } = this.state;
      const { needCancelBox = false, type, title } = this.props;
      const {
        theme = {},
        checkboxTheme,
        headerTextTheme,
        headerTheme,
        cancelBoxTheme,
      } = this.props;
      const cancelBox =
        needCancelBox && cancelItem && cancelItem.length ? (
          <CancelBox themeProps={cancelBoxTheme}>
            <Menu {...this.getCancelMenuTheme()}>{this.createCancelCheckBox()}</Menu>
          </CancelBox>
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
        <TransFer themeProps={theme}>
          <Check themeProps={headerTheme}>
            <CheckBox
              onChange={() => this.props.onCheckAll(!checked)}
              checked={checked}
              indeterminate={selectedKeys.length > 0}
              {...checkboxTheme}
            >
              {title}
            </CheckBox>
            <CheckText themeProps={headerTextTheme}>
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
      const { inputValue } = this.state;
      const { showSearch } = this.props;
      const inputConfig = {};
      if (!inputValue) {
        inputConfig.suffix = <SearchIcon />;
      }

      return showSearch ? (
        <Input
          onChange={this.handleInputChange}
          placeholder={'搜索你想知道的内容'}
          {...inputConfig}
          {...this.getInputThemeConfig()}
        />
      ) : null;
    }

    getTransferPanel() {
      const { selectedKeys = [], typeList, treeData, inputValue } = this.state;
      const { type, direction, displayField, valueField } = this.props;

      const { menuTheme, treeTheme, wrapHeight } = this.getPanelThemeConfig(direction);

      return type === 'panel' ? (
        <div>
          <TransferMenu
            {...this.props}
            query={inputValue}
            {...typeList}
            selectedKeys={selectedKeys}
            height={wrapHeight}
            menuThemeObj={menuTheme}
          />
        </div>
      ) : (
        <TreeWrap height={wrapHeight}>
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
            {...treeTheme}
          />
        </TreeWrap>
      );
    }

    getInputThemeConfig() {
      const { inputTheme = {} } = this.props;
      const { viewClass, theme } = inputTheme;
      const width = 200;
      const inputView = {
        [viewClass]: {
          Container: {
            normal: {
              width: width - 16,
              margin: {
                top: 8,
                right: 8,
                bottom: 16,
                left: 8,
              },
            },
          },
          Input: {
            normal: {
              border: getBorder({ width: 1, style: 'solid', color: '#e8e8e8' }),
            },
          },
          InputSuffix: {
            normal: {
              color: '#999999',
              fontSize: 12,
            },
          },
        },
      };
      const theInputTheme = deepMerge(inputView, theme);

      return { viewClass, theme: theInputTheme };
    }

    getCancelBoxHeight = () => {
      const { getPartOfThemeProps } = this.props;
      const { themeConfig } = getPartOfThemeProps('TransferCancelBox');
      const { normal = {} } = themeConfig;
      const { height = cancelBoxHeight + 6 } = normal;

      return height;
    };

    getPanelThemeConfig = direction => {
      const { cancelItem } = this.state;
      const { menuTheme, treeTheme } = this.props;
      const { viewClass: menuViewClass, theme: menuThemes } = menuTheme;
      const { viewClass: treeViewClass, theme: treeThemes } = treeTheme;
      const height = 206;
      const defaultTheme = {
        width: 200,
        height,
      };
      if (direction !== 'Source' && cancelItem && cancelItem.length) {
        const cancelBoxHeight = this.getCancelBoxHeight();
        defaultTheme.height = height - cancelBoxHeight;
      }
      const wrapHeight = defaultTheme.height;
      const menuDefaultView = {
        [menuViewClass]: {
          Container: {
            normal: { ...defaultTheme, boxShadow: getBoxShadow('0 0') },
          },
        },
      };
      const treeDefaultView = {
        [treeViewClass]: {
          Container: {
            normal: defaultTheme,
          },
        },
      };

      const theMenuTheme = deepMerge(menuDefaultView, menuThemes);
      const theTreeTheme = deepMerge(treeDefaultView, treeThemes);

      return {
        menuTheme: {
          viewClass: menuViewClass,
          theme: theMenuTheme,
        },
        treeTheme: {
          viewClass: treeViewClass,
          theme: theTreeTheme,
        },
        wrapHeight,
      };
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
      const { model, data = [] } = this.props;
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
