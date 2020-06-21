/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Menu from '../menu';
import Input from '../input';
import { deepMerge } from '@lugia/object-utils';
import Trigger from '../trigger/OpenTrigger';
import ShortKeyBoard from '../common/ShortKeyBoard';
import Keys from '../consts/KeyBoard';
import Widget from '../consts/index';
import { DisplayField, ValueField } from '../consts/props';
import { OldValueItem, OldValueTitle, TimeIcon, EmptyBox } from '../css/autocomplete';
import { PopupMenuWrap, getDefaultPopupMenuWrap } from '../css/select';
import { MenuItemHeight } from '../css/menu';
import changeColor from '../css/utilsColor';
import ThemeHoc from '@lugia/theme-hoc';
import Theme from '../theme';
import { findDOMNode } from 'react-dom';
import get from '../css/theme-common-dict';

const ScrollerStep = 30;
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';

type AutoCompleteProps = {
  getTheme: Function,
  data: String[],
  showOldValue: boolean,
  createPortal?: boolean,
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
  getPartOfThemeConfig: Function,
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
        createPortal: true,
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

      getPopupMenu = () => {
        const data = this.getMenuData();
        const { value } = this.state;
        const menuThemeConfig = this.props.getPartOfThemeProps('Menu');
        const { themeConfig } = menuThemeConfig;
        const popupMenuWrapTheme = {
          normal: {
            ...getDefaultPopupMenuWrap(),
          },
        };
        menuThemeConfig.themeConfig = deepMerge(popupMenuWrapTheme, themeConfig.Container);
        return (
          <PopupMenuWrap themeProps={menuThemeConfig}>
            {this.getOldValueItem()}
            <Menu
              data={data}
              checkedCSS={'background'}
              {...this.getMenuTheme()}
              mutliple={false}
              selectedKeys={value}
              onClick={this.menuItemClickHandler}
              step={ScrollerStep}
              valueField={ValueField}
              displayField={DisplayField}
            />
          </PopupMenuWrap>
        );
      };
      render() {
        const { props, state } = this;
        const { value } = state;
        const {
          disabled,
          placeholder,
          prefix,
          suffix,
          validateType,
          validateStatus,
          size = 'default',
          alwaysOpen,
          liquidLayout,
        } = props;
        const data = this.getMenuData();
        const len = data.length;
        const menuLen = Math.min(5, len);
        const menuHeight = menuLen * MenuItemHeight;
        const menu = menuHeight === 0 ? <EmptyBox /> : this.getPopupMenu();
        return (
          <Theme config={this.getInputTheme()}>
            <Trigger
              createPortal={this.props.createPortal}
              themePass
              align={'bottomLeft'}
              action={disabled ? [] : ['focus']}
              hideAction={['focus']}
              popup={menu}
              offsetY={4}
              ref={this.triggerEl}
              alwaysOpen={alwaysOpen}
              liquidLayout={liquidLayout}
            >
              <Input
                size={size}
                value={value}
                disabled={disabled}
                ref={this.inputEl}
                getInputWidgetRef={this.getInputRef}
                onChange={this.changeInputValue}
                onClear={this.clearInputValue}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                placeholder={placeholder}
                prefix={prefix}
                suffix={suffix}
                validateType={validateType}
                validateStatus={validateStatus}
              />
            </Trigger>
          </Theme>
        );
      }

      getInputTheme() {
        const { getPartOfThemeConfig } = this.props;
        const inputtagTheme = {
          [Widget.Input]: {
            Container: getPartOfThemeConfig('Container'),
            InputSuffix: getPartOfThemeConfig('InputSuffix'),
            InputPrefix: getPartOfThemeConfig('InputPrefix'),
            ClearButton: getPartOfThemeConfig('InputClearButton'),
            ValidateErrorInput: getPartOfThemeConfig('ValidateErrorInput'),
            ValidateErrorText: getPartOfThemeConfig('ValidateErrorText'),
            Placeholder: getPartOfThemeConfig('Placeholder'),
          },
        };
        return inputtagTheme;
      }

      setPopupVisible(...rest: any[]) {
        if (
          this.triggerEl &&
          this.triggerEl.getTrigger() &&
          this.triggerEl.getTrigger().current &&
          this.triggerEl.getTrigger().current.getThemeTarget()
        ) {
          this.triggerEl
            .getTrigger()
            .current.getThemeTarget()
            .setPopupVisible(...rest);
        }
      }
      getOldValueItem() {
        const { preSelectValue = '' } = this.state;
        if (preSelectValue === '') {
          return null;
        }
        const { showOldValue, getPartOfThemeProps } = this.props;
        const defaultThemeConfig = {
          themeConfig: {
            normal: {
              background: {
                color: changeColor(get('themeColor'), 0, 0, 10).rgba,
              },
              color: blackColor,
            },
            hover: { color: themeColor },
          },
        };
        const themeProps = deepMerge(defaultThemeConfig, getPartOfThemeProps('OldItem'));

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

      getContainerWidth = () => {
        return this.state.menuWidth;
      };

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

      getMenuTheme = () => {
        const width = this.getContainerWidth();
        const initMenuTheme = {
          width,
          boxShadow: null,
        };
        const defaultMenuTheme = {
          Container: {
            normal: initMenuTheme,
          },
        };
        return this.mergeTheme('Menu', defaultMenuTheme);
      };

      getInputRef = refs => {
        const { ref } = refs;
        this.inputRef = ref;
      };

      componentDidMount() {
        const menuWidth = this.inputRef.current.offsetWidth;
        this.setState({
          menuWidth,
        });
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
