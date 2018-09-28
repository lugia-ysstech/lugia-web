/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import type { QueryType } from '@lugia/lugia-web';
import Menu from '../menu';
import Input from '../input';
import Trigger from '../trigger';
import Theme from '../theme';
import Widget from '../consts/index';
import { DisplayField, ValueField } from '../consts/props';
import CommonIcon from '../icon';
import { OldValueItem, OldValueTitle, TimeIcon } from '../css/autocomplete';
import { DefaultWidth, MenuItemHeight } from '../css/menu';

const ScrollerStep = 30;

type AutoCompleteProps = {
  getTheme: Function,
  valueField?: string,
  data: String[],
  step: number,
  showOldValue: boolean,
  onChange?: Function,
  value?: string,
  defaultValue?: string,
  onFocus?: Function,
  onBlur?: Function,
};

type AutoCompleteState = {
  menuData: String[],
  preSelectValue: string,
  currentSelectValue: string,
  value: string,
};

export default class AotuComplete extends React.Component<AutoCompleteProps, AutoCompleteState> {
  static defaultProps = {
    getTheme() {
      return {};
    },
    valueField: ValueField,
    displayField: DisplayField,
    data: [],
    showOldValue: true,
    step: ScrollerStep,
  };

  el: any;

  constructor(props: AutoCompleteProps) {
    super(props);
    this.el = React.createRef();
  }

  static getDerivedStateFromProps(props: AutoCompleteProps, state: AutoCompleteState) {
    const hasValueInProps = 'value' in props;
    const value = hasValueInProps ? props.value : state ? state.value : props.defaultValue;
    if (!state) {
      return {
        menuData: [],
        preSelectValue: '',
        currentSelectValue: '',
        value,
      };
    }
    return {
      value,
    };
  }

  render() {
    const { props, state } = this;
    const { value } = state;
    const { valueField, disabled } = props;

    const { width = DefaultWidth } = props.getTheme();
    const data = this.getMenuData();
    const len = data.length;
    const menuLen = Math.min(5, len);
    const menuHeight = menuLen * MenuItemHeight;

    const themeConfig = { width, height: menuHeight };
    const menuConfig = {
      [Widget.Menu]: themeConfig,
      [Widget.Input]: { width: themeConfig.width },
      [Widget.Trigger]: themeConfig,
    };

    const menu = [
      this.getOldValueItem(),
      <Menu
        valueField={valueField}
        data={data}
        mutliple={false}
        selectedKeys={[value]}
        onClick={this.menuItemClickHandler}
        step={ScrollerStep}
      />,
    ];
    return (
      <Theme config={menuConfig}>
        <Trigger
          align="bottomLeft"
          action={disabled ? [] : ['click']}
          hideAction={['click']}
          popup={menu}
        >
          <Input
            value={value}
            disabled={disabled}
            ref={this.el}
            onChange={this.changeInputValue}
            onClear={this.clearInputValue}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </Trigger>
      </Theme>
    );
  }

  getOldValueItem() {
    const { preSelectValue = '' } = this.state;
    if (preSelectValue === '') {
      return null;
    }
    const { showOldValue } = this.props;
    return showOldValue ? (
      <OldValueItem onClick={this.handleClickOldValueItem}>
        <TimeIcon>
          <CommonIcon iconClass={'lugia-icon-reminder_clock_circle_o'} />
        </TimeIcon>
        <OldValueTitle>{preSelectValue}</OldValueTitle>
      </OldValueItem>
    ) : null;
  }

  getMenuData = () => {
    const { value } = this.state;
    if (!value) {
      return [];
    }
    return this.getData();
  };

  getData() {
    const { data } = this.props;
    return data.map(item => {
      return {
        [ValueField]: item,
        [DisplayField]: item,
      };
    });
  }

  menuItemClickHandler = (event: Object, selectedValue: Object) => {
    const { selectedKeys } = selectedValue;
    this.clckingOldValue = true;
    this.changeOldValue(selectedKeys[0]);
  };

  clckingOldValue: boolean;
  handleClickOldValueItem = () => {
    this.clckingOldValue = true;
    const { state } = this;
    const { preSelectValue } = state;
    this.changeOldValue(preSelectValue);
  };

  changeOldValue(newValue: string) {
    const { currentSelectValue } = this.state;
    this.setValue(newValue, { currentSelectValue: newValue, preSelectValue: currentSelectValue });
  }

  clearInputValue = () => {
    this.focusInput();
    this.changeOldValue('');
  };

  focusInput() {
    this.getInputDom().focus();
  }

  getInputDom(): Object {
    return this.el.current.getThemeTarget().input;
  }

  enterValue: string;
  onFocus = (e: Object) => {
    const { onFocus } = this.props;
    this.enterValue = this.state.value;
    onFocus && onFocus(e);
  };

  onBlur = (e: Object) => {
    const { onBlur } = this.props;
    onBlur && onBlur(e);
    const { value } = this.state;
    const change = () => {
      if (value !== this.enterValue) {
        this.changeOldValue(this.state.value);
      }
    };
    setTimeout(() => {
      if (this.clckingOldValue) {
        this.clckingOldValue = false;
        return;
      }
      change();
    }, 0);
  };

  changeInputValue = (nextValue: any) => {
    const { newValue: value } = nextValue;
    this.onChangeHandle(value);
    this.setValue(value, {});
  };

  setValue(value: string, other: Object) {
    this.setState({ value, ...other });
    this.onChangeHandle(value);
  }

  onChangeHandle(value: string) {
    const { onChange } = this.props;
    onChange && onChange(value);
  }
}
