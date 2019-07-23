/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Menu from '../menu';
import Input from '../input';
import Trigger from '../trigger';
import ShortKeyBoard from '../common/ShortKeyBoard';
import Keys from '../consts/KeyBoard';
import Widget from '../consts/index';
import { DisplayField, ValueField } from '../consts/props';
import { OldValueItem, OldValueTitle, TimeIcon, EmptyBox } from '../css/autocomplete';
import { MenuItemHeight } from '../css/menu';
import ThemeHoc from '@lugia/theme-hoc';
import { findDOMNode } from 'react-dom';
const ScrollerStep = 30;

type AutoCompleteProps = {
  getTheme: Function,
  data: String[],
  showOldValue: boolean,
  value?: string,
  defaultValue?: string,
  onChange?: Function,
  onSelect?: Function,
  onFocus?: Function,
  onBlur?: Function,
  disabled?: boolean,
  placeholder?: string,
  prefix?: React$Element<any>,
  suffix?: React$Element<any>,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
};

type AutoCompleteState = {
  menuData: String[],
  preSelectValue: string,
  value: string,
  getPartOfThemeConfig: Function,
};

export default ShortKeyBoard(
  ThemeHoc(
    class AotuComplete extends React.Component<AutoCompleteProps, AutoCompleteState> {
      static defaultProps = {
        getTheme() {
          return {};
        },
        data: [],
        showOldValue: false,
      };
      static displayName = 'AutoComplete';
      inputEl: any;
      triggerEl: any;
      currentSelectValue: string;

      constructor(props: AutoCompleteProps) {
        super(props);
        this.currentSelectValue = '';
        this.inputEl = React.createRef();
        this.triggerEl = React.createRef();
      }

      static getDerivedStateFromProps(props: AutoCompleteProps, state: AutoCompleteState) {
        const hasValueInProps = 'value' in props;
        const value = hasValueInProps ? props.value : state ? state.value : props.defaultValue;
        if (!state) {
          return {
            menuData: [],
            preSelectValue: '',
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
        const { disabled, placeholder, prefix, suffix, getPartOfThemeHocProps } = props;
        const data = this.getMenuData();
        const len = data.length;
        const menuLen = Math.min(5, len);
        const menuHeight = menuLen * MenuItemHeight;

        const menu =
          menuHeight === 0 ? (
            <EmptyBox />
          ) : (
            [
              this.getOldValueItem(),
              <Menu
                data={data}
                {...getPartOfThemeHocProps('Menu')}
                mutliple={false}
                selectedKeys={value}
                onClick={this.menuItemClickHandler}
                step={ScrollerStep}
                valueField={ValueField}
                displayField={DisplayField}
              />,
            ]
          );

        return (
          <Trigger
            themePass
            align={'bottomLeft'}
            action={disabled ? [] : ['focus']}
            hideAction={['focus']}
            popup={menu}
            offsetY={4}
            ref={this.triggerEl}
          >
            <Input
              {...getPartOfThemeHocProps('AutoInput')}
              value={value}
              disabled={disabled}
              ref={this.inputEl}
              onChange={this.changeInputValue}
              onClear={this.clearInputValue}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              placeholder={placeholder}
              prefix={prefix}
              suffix={suffix}
            />
          </Trigger>
        );
      }
      setPopupVisible(...rest: any[]) {
        this.triggerEl.current && this.triggerEl.current.setPopupVisible(...rest);
      }
      getOldValueItem() {
        const { preSelectValue = '' } = this.state;
        if (preSelectValue === '') {
          return null;
        }
        const { showOldValue, getPartOfThemeProps } = this.props;
        const themeProps = getPartOfThemeProps('OldItem');
        return showOldValue ? (
          <OldValueItem onClick={this.handleClickOldValueItem} themeProps={themeProps}>
            <TimeIcon themeProps={themeProps} iconClass={'lugia-icon-reminder_clock_circle_o'} />
            <OldValueTitle themeProps={themeProps}>{preSelectValue}</OldValueTitle>
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
          if (typeof item === 'number') {
            item += '';
          }
          return {
            [ValueField]: item,
            [DisplayField]: item,
          };
        });
      }

      menuItemClickHandler = (event: Object, selectedValue: Object) => {
        const { onSelect } = this.props;
        const { selectedKeys } = selectedValue;
        onSelect && onSelect(selectedKeys);
        this.changeClickingOldValue(true);
        this.changeOldValueAnFocus(selectedKeys[0]);
      };

      clickingOldValue: boolean;
      currentSelectValue: string;
      handleClickOldValueItem = () => {
        this.changeClickingOldValue(true);
        const { state } = this;
        const { preSelectValue } = state;
        this.changeOldValueAnFocus(preSelectValue);
      };

      clearInputValue = () => {
        this.changeOldValueAnFocus('');
      };

      changeOldValueAnFocus(newValue: string) {
        this.changeOldValue(newValue);
        this.focusInput();
      }

      changeOldValue(newValue: string) {
        const oldValue = this.currentSelectValue;
        this.currentSelectValue = newValue;
        this.setValue(newValue, { preSelectValue: oldValue });
      }

      focusInput() {
        this.getInputDom().focus();
      }

      getInputDom(): Object {
        return findDOMNode(this.inputEl.current.getThemeTarget()).querySelector('input');
      }

      enterValue: string;
      onFocus = (e: Object) => {
        !this.clickingOldValue && (this.currentSelectValue = this.state.value);
        const { onFocus } = this.props;
        this.enterValue = this.state.value;
        onFocus && onFocus(e);
      };

      onBlur = (e: Object) => {
        const { onBlur } = this.props;
        onBlur && onBlur(e);
        const change = () => {
          const { value } = this.state;
          if (value !== this.enterValue) {
            this.changeOldValue(value);
          }
        };
        setTimeout(() => {
          if (this.clickingOldValue) {
            this.changeClickingOldValue(false);
            return;
          }
          change();
        }, 0);
      };

      changeClickingOldValue(val) {
        this.clickingOldValue = val;
      }

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

      onUp() {}
    },
    Widget.AutoComplete,
    { hover: true }
  ),
  [
    {
      shiftKey: true,
      keyCode: Keys.UP,
      method: ['onUp'],
    },
  ]
);
