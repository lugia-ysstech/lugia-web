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
import { OldValueItem, TimeIcon, OldValueTitle } from '../css/autocomplete';
import { MenuItemHeight, DefaultWidth } from '../css/menu';

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
    const { valueField } = props;

    const { width = DefaultWidth } = props.getTheme();
    const len = this.getMenuData().length;
    const menuLen = len > 5 ? 5 : len;
    const menuHeight = menuLen * MenuItemHeight;

    const menuConfig = {
      [Widget.Menu]: { width, height: menuHeight },
      [Widget.Input]: { width },
      [Widget.Trigger]: { width, height: menuHeight },
    };

    const menu = [
      this.getOldValueItem(),
      <Menu
        valueField={valueField}
        data={this.getMenuData()}
        mutliple={false}
        selectedKeys={[value]}
        onClick={this.menuItemClickHandler}
        step={ScrollerStep}
      />,
    ];
    return (
      <Theme config={menuConfig}>
        <Trigger align="bottomLeft" action={['focus']} hideAction={['focus']} popup={menu}>
          <Input
            value={value}
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
    const { preSelectValue } = this.state;
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
    const newData = [];
    data.forEach(item => {
      const newItem = {};
      newItem[ValueField] = item;
      newItem[DisplayField] = item;
      newData.push(newItem);
    });

    return newData;
  }

  menuItemClickHandler = (event: Object, selectedValue: Object) => {
    const { state } = this;
    const { currentSelectValue } = state;

    const { selectedKeys } = selectedValue;
    const newValue = selectedKeys[0];
    this.setValue(newValue, { currentSelectValue: newValue, preSelectValue: currentSelectValue });
    this.onChangeHandle(newValue);
  };

  handleClickOldValueItem = () => {
    const { state } = this;
    const { preSelectValue } = state;

    this.setValue(preSelectValue, { currentSelectValue: preSelectValue, preSelectValue: '' });
    this.onChangeHandle(preSelectValue);
  };

  clearInputValue = () => {
    const { state } = this;
    const { currentSelectValue } = state;
    this.el.current.getThemeTarget().input.focus();
    this.onChangeHandle('');
    this.setValue('', { currentSelectValue: '', preSelectValue: currentSelectValue });
  };

  onFocus = (e: Object) => {
    const { onFocus } = this.props;
    onFocus && onFocus(e);
  };

  onBlur = (e: Object) => {
    const { onBlur } = this.props;
    onBlur && onBlur(e);
  };

  changeInputValue = (nextValue: any) => {
    const { newValue: value } = nextValue;
    this.onChangeHandle(value);
    this.setValue(value, {});
  };

  setValue(value: string, other: Object) {
    this.setState({ value, ...other });
  }

  onChangeHandle(value: string) {
    const { onChange } = this.props;
    onChange && onChange(value);
  }
}
