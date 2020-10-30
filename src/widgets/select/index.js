/**
 * create by szfeng
 *
 * @flow
 */
import type { QueryType } from '@lugia/lugia-web';
import '../common/shirm';
import * as React from 'react';
import Theme from '../theme';
import InputTag from '../inputtag';
import Trigger from '../trigger/OpenTrigger';
import Menu from '../menu';
import Widget from '../consts/index';
import QueryInput from '../common/QueryInput';
import { deepMerge } from '@lugia/object-utils';
import ValidateHoc from '../input/validateHoc';
import { getInputtagThemeHoc } from './utils';
import { PopupMenuWrap, getDefaultPopupMenuWrap } from '../css/select';

import {
  didUpdate,
  getDisplayValue,
  getItems,
  getValueAndDisplayValue,
  updateMapData,
} from '../common/translateData';
import { DisplayField, ValueField } from '../consts/props';
import { appendCustomValue, isCanInput, isMutliple, setNewValue } from '../common/selectFunction';
import { toMatchFromType } from '../common/StringUtils';
import ThemeHoc from '@lugia/theme-hoc';
import { inputTagThemeDefaultConfig } from '../css/select';
type ValidateStatus = 'success' | 'error';
type RowData = { [key: string]: any };
type CheckedCSS = 'none' | 'background' | 'checkbox';
type Size = 'small' | 'default' | 'large';

export function getNewValueOrOldValue(v: string[], mutliple: boolean) {
  return mutliple ? v : v[0];
}

type SelectProps = {
  getTheme?: Function,
  data?: Object[],
  mutliple: boolean,
  canInput: boolean,
  valueField?: string,
  displayField?: string,
  mode?: 'local' | 'remote',
  throttle?: number,
  disabled?: boolean,
  validateStatus: ValidateStatus,
  canSearch: boolean,
  splitQuery: string,
  limitCount: number,
  placeholder?: string,
  searchType?: QueryType,
  onChange?: Function,
  onTrigger?: Function,
  onQuery?: Function,
  onClear?: Function,
  onSelect?: Function,
  onFocus?: Function,
  onBlur?: Function,
  onRefresh?: Function,
  value?: string[],
  displayValue?: string[],
  defaultValue?: string[],
  defaultDisplayValue?: string[],
  createPortal?: boolean,
  children?: any,
  query: string | number,
  prefix?: any,
  suffix?: any,
  getPartOfThemeConfig: Function,
  canClear?: boolean,
  divided?: boolean,
  defaultHeight?: number,
  autoHeight?: boolean,
  pullIconClass?: string,
  clearIconClass?: string,
  searchClearIcon?: string,
  searchAddIcon?: string,
  toggleIcon?: string,
  resetIcon?: string,
  singleClearIcon?: string,
  checkAllIcon?: string,
  deselectionIcon?: string,
  searchIcon?: string,
  isShowClearButton?: boolean,
  size?: Size,
  checkedCSS?: CheckedCSS,
  getPartOfThemeProps: (str: string) => any,
  getPartOfThemeHocProps: (str: string) => any,
};
type SelectState = {
  value: Array<string>,
  displayValue: Array<string>,
  data: Array<Object>,
  length: number,
  disabled: boolean,
  query: string,
  validateStatus: ValidateStatus,
  selectCount: number,
  isCheckedAll: boolean,
  menuVisible: boolean,
};

const ScrollerStep = 30;

function getQuery(propsQuery: string | number, stateQuery?: string) {
  if (propsQuery || propsQuery === 0 || propsQuery === '0') {
    return propsQuery.toString();
  }
  return stateQuery ? stateQuery : '';
}

class Select extends React.Component<SelectProps, SelectState> {
  static defaultProps = {
    getTheme() {
      return {};
    },
    mutliple: false,
    canInput: false,
    createPortal: true,
    displayField: DisplayField,
    valueField: ValueField,
    mode: 'local',
    throttle: 100,
    disabled: false,
    validateStatus: 'success',
    canSearch: false,
    autoHeight: false,
    splitQuery: ',',
    searchType: 'include',
    query: '',
    pullIconClass: 'lugia-icon-direction_down',
    clearIconClass: 'lugia-icon-reminder_close',
    singleClearIcon: 'lugia-icon-reminder_close_circle',
    searchAddIcon: 'lugia-icon-reminder_plus',
    checkAllIcon: 'lugia-icon-financial_check_all',
    deselectionIcon: 'lugia-icon-financial_deselection',
    isShowClearButton: true,
    size: 'default',
  };
  static displayName = Widget.Select;

  cancelItem: Array<Object>;
  cancelItemData: Object;
  dataItem: Object;

  queryHandle: TimeoutID;
  menuVisible: boolean;
  menuCmp: Object;
  menuTriger: Object;
  inputTag: Object;
  displayValue: string[];

  constructor(props: SelectProps) {
    super(props);
    this.menuVisible = false;
    const { displayValue, value } = getValueAndDisplayValue(props, null);
    updateMapData(props, displayValue, this.updateMapData);
    this.displayValue = displayValue;
    if (!this.displayValue) {
      this.updateDisplayValue(value);
    }
    this.inputTag = React.createRef();
  }

  updateDisplayValue(value: string[]) {
    const { displayField = DisplayField } = this.props;
    this.displayValue = getDisplayValue(value, {
      cancelItemData: this.cancelItemData,
      dataItem: this.dataItem,
      displayField,
    });
  }

  static getDerivedStateFromProps(props: SelectProps, state: SelectState) {
    const { data = [], validateStatus = 'success', query, virtual = false } = props;
    const length = data.length;

    const { value, displayValue } = getValueAndDisplayValue(props, state);
    const theValue = value ? value : [];

    if (!state) {
      return {
        value: theValue,
        displayValue,
        data,
        length,
        query: getQuery(query),
        validateStatus,
        isCheckedAll: false,
        __virtual: virtual,
      };
    }
    return {
      value: theValue,
      displayValue,
      data,
      length,
      query: getQuery(query, state.query),
      validateStatus,
      __virtual: virtual,
    };
  }

  updateMapData = ({ cancelItem, cancelItemData, dataItem }) => {
    this.cancelItem = cancelItem;
    this.cancelItemData = cancelItemData;
    this.dataItem = dataItem;
  };

  getMapData = () => {
    return {
      cancelItem: this.cancelItem,
      dataItem: this.dataItem,
      cancelItemData: this.cancelItemData,
    };
  };

  dataHasItem = (val: any) => {
    return val in this.dataItem;
  };

  cancelHasItem = (val: any) => {
    return val in this.cancelItemData;
  };

  needUpdate = (val: any) => {
    return !this.dataHasItem(val) && !this.cancelHasItem(val);
  };

  shouldComponentUpdate(nextProps: SelectProps, nextState: SelectState) {
    const { displayValue, value, data } = this.props;
    const _this = {
      props: {
        displayValue,
        value,
        data,
      },
      state: {
        dataLength: this.state.length,
      },
    };
    const needUpdate = didUpdate(
      nextProps,
      nextState,
      _this,
      (_, nextState) => nextState.displayValue,
      this.updateMapData
    );

    this.displayValue = nextState.displayValue;
    if (needUpdate && !this.displayValue) {
      this.updateDisplayValue(nextState.value);
    }
    return needUpdate;
  }

  isLimit(): boolean {
    const { value } = this.state;
    const limitCount = this.getLimitCount();
    return value.length >= limitCount;
  }

  render() {
    return this.fetchRenderItems();
  }

  addClick = () => {
    this.appendValue();
  };

  getInChecked(item: Object) {
    const { value } = this.state;
    if (value.indexOf(item) === -1) {
      return false;
    }
    return true;
  }

  refreshValue = (event: Object) => {
    const { onRefresh } = this.props;
    this.onQueryInputChange({ newValue: '' });
    const value = [];
    const displayValue = [];
    this.setValue(value, displayValue, { query: '' });
    this.onChangeHandle({ value, displayValue, event });
    onRefresh && onRefresh();
  };

  getLimitCount = () => {
    const { limitCount } = this.props;
    const { length } = this.state;
    const totalLimitCount = length + this.cancelItem.length;
    if (limitCount && limitCount > totalLimitCount) {
      return totalLimitCount;
    }
    return limitCount ? limitCount : totalLimitCount;
  };

  onCheckAll = (event: Object) => {
    const { state } = this;
    const { data, isCheckedAll, length, value } = state;
    const { displayValue } = this;
    const limitCount = this.getLimitCount();

    if (isCheckedAll) {
      this.setValue([], [], {});
      this.onChangeHandle({ value: [], displayValue: [], event });
    } else {
      let newValue = [],
        newDisp = [];

      const { valueField: key, displayField: title } = this.props;

      if (limitCount >= 0) {
        const needItemLen = limitCount - value.length;
        for (let i = 0; i < length; i++) {
          const item = data[i];
          if (this.getInChecked(item[key])) {
            continue;
          }
          if (newValue.length >= needItemLen) break;
          newValue.push(item[key]);
          newDisp.push(item[title]);
        }
      } else {
        for (let i = 0; i < length; i++) {
          const item = data[i];
          newValue.push(item[key]);
          newDisp.push(item[title]);
        }
      }
      newValue = [...value, ...newValue];
      newDisp = [...displayValue, ...newDisp];
      this.setValue(newValue, newDisp, {});
      this.onChangeHandle({ value: newValue, displayValue: newDisp, event });
    }
  };

  getContainerWidth = () => {
    return (
      this.inputTag &&
      this.inputTag.current &&
      this.inputTag.current.getThemeTarget().container.offsetWidth
    );
  };

  getPopupMenu = () => {
    const { props, state } = this;
    const {
      mutliple,
      canSearch,
      canInput,
      data,
      getPartOfThemeProps,
      getPartOfThemeHocProps,
      searchClearIcon,
      toggleIcon,
      resetIcon,
      searchAddIcon,
      checkAllIcon,
      deselectionIcon,
      searchIcon,
    } = props;
    const { query, isCheckedAll } = state;
    const getMenu: Function = (cmp: Object) => {
      this.menuCmp = cmp;
    };
    const queryInputTheme = {
      [Widget.QueryInput]: {
        OutContainer: {
          normal: {
            margin: { top: 4, right: 4, bottom: 4, left: 4 },
          },
        },
      },
    };
    const receivedQueryInputTheme = getPartOfThemeProps('QueryInput');
    const toggleIconTheme = getPartOfThemeHocProps('ToggleIcon');
    const resetIconTheme = getPartOfThemeHocProps('ResetIcon');
    const searchAddIconTheme = getPartOfThemeHocProps('SearchAddIcon');
    const checkAllIconTheme = getPartOfThemeHocProps('CheckAllIcon');
    const deselectionIconTheme = getPartOfThemeHocProps('DeselectionIcon');
    const searchIconTheme = getPartOfThemeHocProps('SearchIcon');

    const menu = [
      data && data.length !== 0 ? (
        <QueryInput
          theme={queryInputTheme}
          receivedTheme={receivedQueryInputTheme}
          toggleIconTheme={toggleIconTheme}
          resetIconTheme={resetIconTheme}
          searchAddIconTheme={searchAddIconTheme}
          checkAllIconTheme={checkAllIconTheme}
          deselectionIconTheme={deselectionIconTheme}
          searchIconTheme={searchIconTheme}
          query={query}
          onQueryInputChange={this.onQueryInputChange}
          onQueryInputKeyDown={this.onQueryInputKeyDown}
          refreshValue={this.refreshValue}
          addClick={this.addClick}
          isCheckedAll={isCheckedAll}
          onCheckAll={this.onCheckAll}
          canSearch={canSearch}
          mutliple={mutliple}
          canInput={canInput}
          searchClearIcon={searchClearIcon}
          toggleIcon={toggleIcon}
          resetIcon={resetIcon}
          searchAddIcon={searchAddIcon}
          checkAllIcon={checkAllIcon}
          deselectionIcon={deselectionIcon}
          searchIcon={searchIcon}
        />
      ) : null,
      this.getMenuItems(getMenu),
    ];

    const width = this.getContainerWidth();
    const menuThemeConfig = this.props.getPartOfThemeProps('Menu');
    const { themeConfig } = menuThemeConfig;
    const PopupMenuWrapTheme = {
      normal: {
        width,
        ...getDefaultPopupMenuWrap(),
      },
    };
    menuThemeConfig.themeConfig = deepMerge(PopupMenuWrapTheme, themeConfig.Container);
    return <PopupMenuWrap themeProps={menuThemeConfig}>{menu}</PopupMenuWrap>;
  };

  fetchRenderItems() {
    const { props, state } = this;
    const {
      disabled,
      validateStatus,
      placeholder,
      createPortal,
      prefix,
      suffix,
      canClear,
      pullIconClass,
      clearIconClass,
      singleClearIcon,
      isShowClearButton,
      onFocus,
      onBlur,
      alwaysOpen,
      liquidLayout,
      popupContainerId,
    } = props;
    const { displayValue = [] } = this;
    const { value = [], menuVisible } = state;

    const menu = this.getPopupMenu();

    const getMenuTriger: Function = (cmp: Object) => {
      this.menuTriger = cmp;
    };
    const result = (
      <Theme config={getInputtagThemeHoc(props)}>
        <Trigger
          popupContainerId={popupContainerId}
          themePass
          popup={menu}
          key="trigger"
          offsetY={4}
          ref={getMenuTriger}
          createPortal={createPortal}
          action={disabled ? [] : ['click']}
          hideAction={['click']}
          onPopupVisibleChange={this.onMenuPopupVisibleChange}
          alwaysOpen={alwaysOpen}
          liquidLayout={liquidLayout}
        >
          <InputTag
            ref={this.inputTag}
            menuVisible={menuVisible}
            key="inputtag"
            prefix={prefix}
            suffix={suffix}
            canClear={canClear}
            value={value}
            displayValue={displayValue}
            validateStatus={validateStatus}
            onChange={this.onInputTagChange}
            onPopupVisibleChange={this.onInputTagPopupVisibleChange}
            disabled={disabled}
            createPortal={createPortal}
            placeholder={placeholder}
            mutliple={isMutliple(props)}
            onClear={this.onClear}
            pullIconClass={pullIconClass}
            clearIconClass={clearIconClass}
            isShowClearButton={isShowClearButton}
            onFocus={onFocus}
            onBlur={onBlur}
            singleClearIcon={singleClearIcon}
          />
        </Trigger>
      </Theme>
    );
    return result;
  }

  getMenuItems(getMenu?: Function) {
    const { state, props } = this;
    const { value, query, data, __virtual } = state;
    const {
      displayField,
      valueField,
      limitCount,
      searchType,
      divided,
      autoHeight,
      defaultHeight,
      checkedCSS = 'background',
      renderSuffixItems,
    } = props;
    const menuData = this.updateMenuData(data, query, searchType);
    return (
      <Menu
        {...this.getMenuTheme()}
        __virtual={__virtual}
        checkedCSS={checkedCSS}
        displayField={displayField}
        valueField={valueField}
        data={menuData}
        divided={divided}
        defaultHeight={defaultHeight}
        mutliple={isMutliple(props)}
        selectedKeys={[...value]}
        ref={getMenu}
        limitCount={limitCount}
        onClick={this.menuItemClickHandler}
        step={ScrollerStep}
        autoHeight={autoHeight}
        renderSuffixItems={renderSuffixItems}
      />
    );
  }

  getItem(targetValue: Array<string>, isNeedDisplayValue: boolean) {
    const handler = {
      updateHanlder: this.updateMapData,
      needUpdate: this.needUpdate,
      getMapData: this.getMapData,
    };
    const { displayField, children, data, valueField, value, defaultValue } = this.props;
    const _this = {
      props: {
        displayField,
        children,
        data,
        valueField,
        value,
        defaultValue,
      },
      state: {
        displayValue: this.displayValue,
      },
    };

    return getItems(targetValue, isNeedDisplayValue, _this, handler);
  }

  menuItemClickHandler = (event: Object, selectedValue: Object) => {
    const { props } = this;
    const { selectedKeys } = selectedValue;

    const { displayValue = [] } = this.getItem(selectedKeys, true);

    if (isMutliple(props)) {
      this.setValue(selectedKeys, displayValue, {});
      this.onChangeHandle({ value: selectedKeys, displayValue, event });
    } else {
      const key = selectedKeys;
      const nextDisplayValue = this.getSingleItemDisplayValue(this.dataItem[key]);
      this.onChangeHandle({ value: key, displayValue, event });
      this.setSelectMenuPopupVisible(false);
      const valueIsInProps = 'value' in props;

      if (!valueIsInProps) {
        this.setState({
          value: key,
          displayValue: [nextDisplayValue],
        });
      }
    }
  };

  getSingleItemDisplayValue(item: Object) {
    const { displayField } = this.props;
    const val = item[displayField];
    return val === null || val === undefined ? '' : val;
  }

  onQueryInputChange = (nextValue: any) => {
    const { props, state } = this;
    const { newValue } = nextValue;

    const value = newValue ? newValue : '';

    if (value === state.query) {
      return;
    }

    if (this.queryHandle) {
      clearTimeout(this.queryHandle);
    }

    this.setState({ query: value });

    const doQuery = () => {
      const { onQuery, mode = 'local' } = props;

      if (mode === 'local') {
        this.getCurrentRow(value);
      }
      onQuery && onQuery(value);
      setTimeout(() => {
        if (
          this.menuTriger &&
          this.menuTriger.getTrigger() &&
          this.menuTriger.getTrigger().current &&
          this.menuTriger.getTrigger().current.getThemeTarget()
        ) {
          this.menuTriger
            .getTrigger()
            .current.getThemeTarget()
            .forceAlign();
        }
      }, 0);
    };

    const { throttle = -1 } = props;

    if (throttle > 0) {
      this.queryHandle = setTimeout(doQuery, throttle);
    } else {
      doQuery();
    }
  };

  getCurrentRow(query: string) {
    this.setState({ query });
  }

  needPush(row: RowData, queryField: string[], queryArray: Array<string>, searchType: QueryType) {
    return queryField.some(field => {
      return toMatchFromType(row[field], queryArray, searchType);
    });
  }

  isOpenMultiConditionQuery() {
    const { searchFields = [] } = this.props;
    return searchFields && Array.isArray(searchFields) && searchFields.length > 0;
  }

  updateMenuData(data: Array<Object>, query: string | number, searchType?: QueryType = 'include') {
    const { displayField = DisplayField, searchFields = [] } = this.props;

    let menuData;
    const queryAll = query === '' || !query;
    const isQueryZero = query === 0 || query === '0';

    if (queryAll && !isQueryZero) {
      menuData = data;
    } else {
      const queryArray = this.getQueryArray(query);
      const rowSet = [];
      const len = data.length;
      const queryField = this.isOpenMultiConditionQuery() ? searchFields : [displayField];
      for (let i = 0; i < len; i++) {
        const row: RowData = data[i];
        if (this.needPush(row, queryField, queryArray, searchType)) {
          rowSet.push(row);
        }
      }
      if (rowSet.length === len) {
        menuData = data;
      } else {
        menuData = rowSet.reverse();
      }
    }
    return menuData;
  }

  getQueryArray(query: string | number): Array<string> {
    const { splitQuery } = this.props;
    if (splitQuery) {
      return query.toString().split(splitQuery);
    }
    return [query.toString()];
  }

  onQueryInputKeyDown = (e: Object) => {
    const isEnter = e.keyCode === 13;
    if (isEnter) {
      this.appendValue();
    }
  };

  onClear = (e: Object) => {
    const { onClear } = this.props;
    onClear && onClear(e);
  };

  appendValue() {
    const { props, state } = this;
    const { displayValue } = this;
    const { query, value } = state;
    const inputValue = query;
    if (inputValue && inputValue.trim() && isCanInput(props) && !this.isLimit()) {
      clearTimeout(this.queryHandle);

      const { newValue, newDisplayValue } = appendCustomValue(props, query, value, displayValue);
      const newValueArray = [...newValue];
      const newDisplayValueArray = [...newDisplayValue];

      this.setValue(newValueArray, newDisplayValueArray, {});
      this.onQueryInputChange({ newValue: '' });
      this.onChangeHandle({ value: newValueArray, displayValue: newDisplayValueArray });
    }
  }

  setPopupVisible(...rest: any[]) {
    if (
      this.menuTriger &&
      this.menuTriger.getTrigger() &&
      this.menuTriger.getTrigger().current &&
      this.menuTriger.getTrigger().current.getThemeTarget()
    ) {
      this.menuTriger
        .getTrigger()
        .current.getThemeTarget()
        .setPopupVisible(...rest);
    }
  }

  onInputTagChange = ({ value, displayValue }: Object) => {
    this.setValue(value, displayValue, {});
    this.onChangeHandle({ value, displayValue });
  };

  setValue(
    value: Array<string>,
    displayValue: Array<string>,
    other: Object,
    callback: Function | Object = () => {}
  ) {
    const { props } = this;
    const isPropsHasValue = 'value' in props;
    const { realyVal, realDisp } = setNewValue(value, displayValue);
    const isCheckedAll = this.getIsCheckedAll(realyVal);
    if (isPropsHasValue) {
      this.setState({ ...other });
    } else {
      this.setState(
        {
          value: realyVal,
          displayValue: realDisp,
          ...other,
          isCheckedAll,
        },
        callback
      );
    }
  }

  onMenuPopupVisibleChange = (visible: boolean) => {
    if (visible) {
      const { onTrigger } = this.props;
      onTrigger && onTrigger(visible);
      this.onQueryInputChange({ newValue: '' });
    }
    this.setState({ menuVisible: visible });
    this.menuVisible = visible;
  };

  onInputTagPopupVisibleChange = (visible: boolean) => {
    if (visible) {
      this.setSelectMenuPopupVisible(false);
    }
  };

  setSelectMenuPopupVisible(visible: boolean) {
    if (
      this.menuTriger &&
      this.menuTriger.getTrigger() &&
      this.menuTriger.getTrigger().current &&
      this.menuTriger.getTrigger().current.getThemeTarget()
    ) {
      this.menuTriger
        .getTrigger()
        .current.getThemeTarget()
        .setPopupVisible(visible);
    }
  }

  onChangeHandle(targetObj: Object) {
    const { onChange, onSelect, mutliple } = this.props;

    const { value: nextValue, displayValue: nextDisplayValue, event = null } = targetObj;
    const isCheckedAll = this.getIsCheckedAll(nextValue);

    const { value: preValue = [] } = this.state;

    const newValue = getNewValueOrOldValue(nextValue, mutliple);
    const newDisplayValue = getNewValueOrOldValue(nextDisplayValue, mutliple);
    const oldValue = getNewValueOrOldValue(preValue, mutliple);
    let { items: oldItem } = this.getItem(preValue, false);
    let { items: newItem } = this.getItem(nextValue, false);
    oldItem = mutliple ? oldItem : oldItem[0];
    newItem = mutliple ? newItem : newItem[0];

    const obj = {
      newValue,
      oldValue,
      newItem,
      oldItem,
      newDisplayValue,
      event,
    };
    this.setState({ isCheckedAll });
    onChange && onChange(obj);
    onSelect && onSelect(obj);
  }

  getIsCheckedAll(value: string[]) {
    const totalLimitCount = this.getLimitCount();
    return totalLimitCount === value.length;
  }

  mergeTheme = (target: string, defaultTheme: Object) => {
    const { viewClass, theme } = this.props.getPartOfThemeHocProps(target);

    const themeHoc = deepMerge(
      {
        [viewClass]: { ...defaultTheme },
      },
      theme
    );

    const newTheme = {
      viewClass,
      theme: themeHoc,
    };
    return newTheme;
  };

  getInputTagTheme = () => {
    const { getPartOfThemeConfig, size = 'default' } = this.props;
    const defaultInputTagThemeConfig = inputTagThemeDefaultConfig[size];
    const customInputTagThemeConfig = {
      InputTagWrap: getPartOfThemeConfig('Container'),
      TagWrap: getPartOfThemeConfig('TagWrap'),
      TagIcon: getPartOfThemeConfig('TagIcon'),
      SwitchIcon: getPartOfThemeConfig('SwitchIcon'),
      ClearIcon: getPartOfThemeConfig('ClearIcon'),
      Placeholder: getPartOfThemeConfig('Placeholder'),
      Menu: getPartOfThemeConfig('InputMenu'),
    };
    const deepMergeThemeConfig = deepMerge(defaultInputTagThemeConfig, customInputTagThemeConfig);
    const inputTagTheme = {
      [Widget.InputTag]: deepMergeThemeConfig,
    };
    return inputTagTheme;
  };

  getMenuTheme = () => {
    const width = this.getContainerWidth();
    const defaultMenuTheme = {
      Container: {
        normal: {
          width,
          boxShadow: null,
        },
        hover: {},
      },
    };
    return this.mergeTheme('Menu', defaultMenuTheme);
  };
}

export default ThemeHoc(ValidateHoc(Select), Widget.Select, { hover: true });
