/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import CheckBox from './checkbox';
import CheckButton from '../check-button/button';
import Widget from '../consts';
import { DisplayField, ValueField } from '../consts/props';
import { Group } from '../css/checkbox-group';
import {
  didUpdate,
  getItems,
  getValueAndDisplayValue,
  handleCreate,
  updateMapData,
} from '../common/translateData';
import Theme from '../theme';

type CheckBoxGroupProps = {
  defaultValue?: string[],
  value?: Array<string>,
  disabled?: boolean,
  data?: Array<Object>,
  onChange?: Function,
  displayField?: string,
  displayValue?: Array<string>,
  defaultDisplayValue?: Array<string>,
  valueField?: string,
  children?: any,
  getTheme: Function,
  getPartOfThemeProps: Function,
  getPartOfThemeConfig: Function,
  styles?: 'default' | 'vertical',
  cache?: boolean,
  childType?: 'default' | 'button',
  size?: 'default' | 'small' | 'large' | 'bigger',
};
type CheckBoxGroupState = {
  value: Array<string>,
  displayValue: Array<string>,
  dataLength: number,
};

export default ThemeProvider(
  class extends React.Component<CheckBoxGroupProps, CheckBoxGroupState> {
    cancelItem: Array<Object>;
    cancelItemData: Object;
    dataItem: Object;

    constructor(props: CheckBoxGroupProps) {
      super(props);
      const { displayValue } = getValueAndDisplayValue(props, null);
      const disV = displayValue ? displayValue : [];
      updateMapData(props, disV, this.updateMapData);
    }

    static getDerivedStateFromProps(props, state) {
      const { data = [] } = props;
      const dataLength = data.length;
      const { value, displayValue } = getValueAndDisplayValue(props, state);
      const stateValue = value ? value : [];
      const stateDisplayValue = displayValue ? displayValue : [];
      return {
        value: stateValue,
        displayValue: stateDisplayValue,
        dataLength,
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

    shouldComponentUpdate(nextProps: CheckBoxGroupProps, nextState: CheckBoxGroupState) {
      const { displayValue, value, data } = this.props;
      const _this = {
        props: {
          displayValue,
          value,
          data,
        },
        state: {
          dataLength: this.state.dataLength,
        },
      };
      return didUpdate(
        nextProps,
        nextState,
        _this,
        (_, nextState) => nextState.displayValue,
        this.updateMapData
      );
    }

    render() {
      const {
        cache = true,
        childType = 'default',
        children,
        data,
        disabled,
        styles,
        getPartOfThemeProps,
      } = this.props;
      if (!cache) {
        updateMapData(this.props, this.state.displayValue, this.updateMapData);
      }
      const _this = {
        props: {
          children,
          data,
          disabled,
          styles,
        },
        state: {
          value: this.state.value,
        },
        getChildDom: (item, cancel) => this.getChildDom(item, cancel),
        handleChange: () => this.handleChange,
        hasValueProps: () => this.hasValueProps(),
        cancelItem: this.cancelItem,
      };
      return (
        <Theme config={this.getChildTheme()}>
          <Group themeProps={getPartOfThemeProps('Group')} childType={childType}>
            {handleCreate(_this, 'checkbox', childType)}
          </Group>
        </Theme>
      );
    }

    getChildDom = (item: Object, isCancel: boolean): any => {
      const {
        displayField = DisplayField,
        valueField = ValueField,
        disabled,
        styles = 'default',
        childType = 'default',
        size = 'default',
      } = this.props;
      const config = {};
      isCancel ? (config.cancel = true) : (config.disabled = disabled || item.disabled);
      const value = item[valueField];
      if (childType === 'button') {
        return (
          <CheckButton
            key={value}
            value={value}
            checked={!!~this.state.value.indexOf(value)}
            onChange={this.handleChange}
            {...config}
            size={size}
            hasValue={this.hasValueProps()}
            handleCancelItemClick={this.handleCancelItemClick}
          >
            {item[displayField]}
          </CheckButton>
        );
      }
      return (
        <CheckBox
          key={value}
          value={value}
          checked={!!~this.state.value.indexOf(value)}
          onChangeForGroup={this.handleChange}
          styles={styles}
          {...config}
          handleCancelItemClick={this.handleCancelItemClick}
        >
          {item[displayField]}
        </CheckBox>
      );
    };

    handleChange = (event, val: any) => {
      const { onChange } = this.props;
      const { value = [] } = this.state;
      const oldValue = value;
      const newValue: string[] = [...value];
      const valueIndex = value.indexOf(val);
      if (valueIndex > -1) {
        newValue.splice(valueIndex, 1);
      } else {
        newValue.push(val);
      }
      let newItem, oldItem, newDisplayValue;
      if (!this.props.children) {
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
            displayValue: this.state.displayValue,
          },
        };
        const { items, displayValue } = getItems(newValue, true, _this, handler);
        newItem = items;
        oldItem = getItems(oldValue, false, _this, handler).items;
        newDisplayValue = displayValue;
      }

      const obj = {
        newValue,
        oldValue,
        newItem,
        event,
        oldItem,
        newDisplayValue,
      };
      const notHasValue = !this.hasValueProps();
      onChange && onChange(obj);
      if (notHasValue) {
        this.setState({
          value: newValue,
        });
      }
    };

    hasValueProps() {
      return 'value' in this.props;
    }

    handleCancelItemClick = (value: any) => {
      if (!this.hasValueProps()) {
        const item = this.cancelItemData[value];
        const index = this.cancelItem.indexOf(item);
        this.cancelItem.splice(index, 1);
      }
    };

    getChildTheme() {
      const { getPartOfThemeConfig } = this.props;
      return {
        [Widget.Checkbox]: getPartOfThemeConfig('Checkbox'),
        [Widget.CheckButton]: getPartOfThemeConfig('CheckButton'),
      };
    }
  },
  Widget.CheckboxGroup
);
