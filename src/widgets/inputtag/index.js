/**
 * 标签输入框
 * create by ligx
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import styled from 'styled-components';
import ThemeHoc from '@lugia/theme-hoc';
import Item from './ItemOption';
import Icon from '../icon';
import MoreItem from './MoreItem';
import FontItem from './FontItem';
import { deepMerge } from '@lugia/object-utils';
import { toNumber, isNumber } from '../common/NumberUtils';
import Widget from '../consts/index';
import { ValueField } from '../consts/props';
import DropMenu from '../dropmenu';
import Menu from '../menu';
import Support from '../common/FormFieldWidgetSupport';
import PlaceContainer from '../common/PlaceContainer';
import { DefaultHelp } from '../css/input';
import { DefaultHeight } from '../css/menu';
import { addMouseEvent } from '@lugia/theme-hoc';
import { getBoxShadow } from '@lugia/theme-utils';
import changeColor from '../css/utilsColor';
import { getBorder } from '@lugia/theme-utils';
import {
  fontSize,
  OutContainer,
  InnerContainer,
  SingleInnerContainer,
  Prefix,
  Suffix,
  CommonIcon,
  FlexResBox,
  List,
  HiddenList,
  FocuInput,
  TextContent,
  blackColor,
  themeColor,
} from '../css/inputtag';
import ErrorTip from '../tooltip/ErrorTip';
import { px2remcss } from '../css/units';
import get from '../css/theme-common-dict';

const ClearMenuItemButton: Object = styled(Icon)`
  top: 50%;
  right: ${px2remcss(fontSize)};
  position: absolute;
  transform: translateY(-50%);
  font-size: ${px2remcss(16)};
  color: ${get('lightGreyColor')};
`;

type ValidateStatus = 'success' | 'error';

type InputTagProps = {
  help?: string,
  placeholder?: string,
  getTheme: Function,
  onChange?: Function,
  onFocus?: Function,
  validateStatus: ValidateStatus,
  onBlur?: Function,
  value?: string,
  disabled: boolean,
  svThemVersion?: number,
  mutliple: boolean,
  focus: boolean,
  canClear: boolean,
  displayValue?: string,
  defaultValue?: string,
  defaultDisplayValue?: string,
  onClick?: Function,
  onClear?: Function,
  onPopupVisibleChange?: Function,
  prefix?: any,
  suffix?: any,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
  getPartOfThemeConfig: Function,
  pullIconClass?: string,
  clearIconClass?: string,
  createPortal?: boolean,
  menuVisible?: boolean,
  isShowClearButton?: boolean,
};

type InputTagState = {
  focus: boolean,
  items: Array<React.Node>,
  value: Object,
  query: string,
  popupVisible: boolean,
};

class InputTag extends React.Component<InputTagProps, InputTagState> {
  static displayName = Widget.InputTag;
  static defaultProps = {
    getTheme: () => {
      return {};
    },
    mutliple: true,
    disabled: false,
    validateStatus: 'success',
    help: DefaultHelp,
    canClear: true,
    isShowClearButton: true,
    pullIconClass: 'lugia-icon-direction_down',
    clearIconClass: 'lugia-icon-reminder_close',
  };

  container: Object;
  count: number;
  dropMenu: ?Object;
  errorTip: ?Object;
  fontItem: Object;
  list: Object;
  needMoreItem: boolean;
  oldWidth: number;

  isMutliple() {
    return !!this.props.mutliple;
  }

  constructor(props: InputTagProps) {
    super(props);
    this.count = 0;
    this.state = {
      focus: false,
      items: [],
      query: '',
      popupVisible: false,
      value: this.fetchValueObject(props),
    };
    this.fontItem = React.createRef();
  }

  shouldComponentUpdate(nextPros: InputTagProps, nextState: InputTagState) {
    const { props, state } = this;
    const isChange =
      state.items !== nextState.items ||
      props.value !== nextPros.value ||
      props.value.length !== nextPros.value.length ||
      props.svThemVersion !== nextPros.svThemVersion ||
      props.mutliple !== nextPros.mutliple ||
      props.validateStatus !== nextPros.validateStatus ||
      props.help !== nextPros.help ||
      props.disabled !== nextPros.disabled ||
      (this.needMoreItem && state.query !== nextState.query) ||
      state.value !== nextState.value ||
      state.focus !== nextState.focus ||
      props.menuVisible !== nextPros.menuVisible ||
      props.displayValue !== nextPros.displayValue ||
      props.displayValue.length !== nextPros.displayValue.length;
    return isChange;
  }

  fetchValueObject(props: InputTagProps): Object {
    const result = {};
    const { value = [], displayValue = [] } = this.getValue(props);
    const isEmptyValue = !value || value.length === 0;
    if (this.isMutliple() === false) {
      if (isEmptyValue) {
        return {};
      }
      this.count = 1;

      return { text: displayValue === [] ? value : displayValue };
    }

    const valLen = value.length;
    for (let i = 0; i < valLen; i++) {
      const val = value[i];
      if (val !== '') {
        const displayVal = displayValue[i];
        result[val] = { text: displayVal ? displayVal : val };
      }
    }
    this.count = valLen;
    return result;
  }

  getCount(): number {
    return this.count;
  }

  getValueObject(): Object {
    return this.state.value;
  }

  getValue(props: InputTagProps): { value: Array<string>, displayValue: Array<string> } {
    return Support.getCodeItemArray(props);
  }

  isLimit(): boolean {
    const { props } = this;
    return !Support.isNotLimit(props);
  }

  componentWillReceiveProps(props: InputTagProps) {
    if (this.isLimit()) {
      if (props.value !== this.props.value) {
        const value = this.fetchValueObject(props);
        this.setState(
          {
            value,
          },
          () => {
            this.adaptiveItems(this.getOffSetWidth());
          }
        );
      }
    }
  }

  render() {
    const { props, state } = this;
    let result;
    const clearButton = this.getClearButton();
    const placeholder = this.getPlaceholder();
    const FontItemThemeProps = props.getPartOfThemeProps('TagWrap');
    const font = (
      <FontItem
        themeProps={FontItemThemeProps}
        theme={this.getTagItemTheme()}
        ref={this.fontItem}
        key="fontItem"
      />
    );
    const { focus } = state;
    const {
      disabled,
      validateStatus,
      prefix,
      suffix,
      getPartOfThemeProps,
      createPortal,
      menuVisible,
      dispatchEvent,
    } = props;
    const themeProps = getPartOfThemeProps('InputTagWrap');
    const textContentThemeProps = getPartOfThemeProps('TextContent');
    const { themeState } = themeProps;
    themeState.focus = menuVisible;
    if (!this.isMutliple()) {
      result = (
        <SingleInnerContainer disabled={disabled} themeProps={themeProps}>
          <FlexResBox>
            {prefix ? (
              <Prefix {...dispatchEvent(['hover', 'disabled'], 'f2c')}>{prefix}</Prefix>
            ) : null}
            {placeholder}
            <TextContent themeProps={textContentThemeProps}>{this.getSingleValue()}</TextContent>
            <FocuInput />
          </FlexResBox>
          {suffix ? (
            <Suffix {...dispatchEvent(['hover', 'disabled'], 'f2c')}>{suffix}</Suffix>
          ) : null}
          {clearButton}
        </SingleInnerContainer>
      );
    } else {
      const { items } = state;
      result = (
        <InnerContainer disabled={disabled} themeProps={themeProps}>
          <FlexResBox>
            <List ref={cmp => (this.list = cmp)}>{items}</List>
            {placeholder}
            <FocuInput onFocus={this.onFocus} onBlur={this.onBlur} />
          </FlexResBox>
          {clearButton}
        </InnerContainer>
      );

      if (this.needMoreItem) {
        const { query } = state;
        result = (
          <DropMenu
            menus={this.getItems(query)}
            onQuery={this.onQueryInput}
            onPopupVisibleChange={this.onPopupVisibleChange}
            action={[]}
            query={query}
            hideAction={['click']}
            ref={cmp => {
              this.dropMenu = cmp;
            }}
            createPortal={createPortal}
          >
            {result}
          </DropMenu>
        );
      }
    }

    const defaultOutContainerTheme = {
      themeConfig: {
        disabled: {
          border: getBorder(get('disabledBorder')),
        },
        focus: {
          border: getBorder(get('focusBorder')),
          boxShadow: getBoxShadow(
            `0px 0px 4px 0px ${changeColor(get('themeColor'), 0, 0, 40).rgba}`
          ),
        },
        active: {
          border: getBorder(get('activeBorder')),
        },
        hover: { border: getBorder(get('hoverBorder')) },
        normal: { border: getBorder(get('normalBorder')) },
      },
    };
    const outContainerTheme = deepMerge(
      defaultOutContainerTheme,
      getPartOfThemeProps('InputTagWrap')
    );
    return (
      <OutContainer
        themeProps={outContainerTheme}
        focus={focus}
        disabled={disabled}
        validateStatus={validateStatus}
        ref={cmp => (this.container = cmp)}
        onClick={this.onClick}
        tabIndex={0}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        {...addMouseEvent(this)}
      >
        <HiddenList>
          <List>{font}</List>
        </HiddenList>
        {result}
      </OutContainer>
    );
  }

  onQueryInput = (nextValue: any) => {
    const { newValue } = nextValue;
    const query = newValue ? newValue : '';
    this.setState({ query });
  };
  onFocus = () => {
    this.setState({ focus: true }, () => {
      const { onFocus } = this.props;
      onFocus && onFocus();
    });
  };
  onBlur = () => {
    this.setState({ focus: false }, () => {
      const { onBlur } = this.props;
      onBlur && onBlur();
    });
  };

  getIconTheme(themeName: string) {
    const { getPartOfThemeConfig, getPartOfThemeHocProps } = this.props;
    const colorName = themeName === 'ClearIcon' ? 'darkGreyColor' : 'themeColor';
    const IconTheme = getPartOfThemeConfig(themeName);
    const defaultIcon = {
      normal: {
        color: get('mediumGreyColor'),
        getCSS: () => {
          return `
          transition: all 0.3s
          `;
        },
      },
      hover: {
        color: get(colorName),
      },
      disabled: {
        color: get('disableTextColor'),
      },
    };

    const { theme, viewClass } = getPartOfThemeHocProps(colorName);
    return {
      viewClass,
      theme: deepMerge(
        {
          [viewClass]: { ...deepMerge(defaultIcon, IconTheme) },
        },
        theme
      ),
    };
  }

  getClearButton() {
    const {
      canClear,
      pullIconClass,
      clearIconClass,
      disabled,
      isShowClearButton,
      dispatchEvent,
    } = this.props;
    if (!isShowClearButton) {
      return null;
    }
    const { theme, viewClass } =
      this.isEmpty() || !canClear
        ? this.getIconTheme('SwitchIcon')
        : this.getIconTheme('ClearIcon');
    const Icon =
      this.isEmpty() || !canClear ? (
        <CommonIcon
          theme={theme}
          viewClass={viewClass}
          singleTheme
          disabled={disabled}
          iconClass={pullIconClass}
          {...dispatchEvent(['hover', 'disabled'], 'f2c')}
        />
      ) : (
        <CommonIcon
          theme={theme}
          viewClass={viewClass}
          singleTheme
          disabled={disabled}
          iconClass={clearIconClass}
          onClick={this.onClear}
          {...dispatchEvent(['hover', 'disabled'], 'f2c')}
        />
      );
    return Icon;
  }

  getPlaceholder() {
    const { placeholder, getPartOfThemeProps } = this.props;
    if (!placeholder || !this.isEmpty()) {
      return null;
    }
    return (
      <PlaceContainer themeProps={getPartOfThemeProps('Placeholder')}>{placeholder}</PlaceContainer>
    );
  }

  isEmpty(): boolean {
    if (this.isMutliple()) {
      const { items } = this.state;
      return items.length <= 0;
    }
    return this.getSingleValue() === '';
  }

  getSingleValue() {
    const { value = {} } = this.state;
    const { text = '' } = value;
    return text;
  }

  getFontWidth(text: string): number {
    return this.fontItem.current.getWidth(text);
  }

  onClick = (e: Object) => {
    const { onClick } = this.props;
    onClick && onClick(e);
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

  getInputTagMenuTheme = () => {
    const { getPartOfThemeConfig } = this.props;
    const { normal = {} } = getPartOfThemeConfig('InputTagWrap');
    const { width = 250 } = normal;
    const defaultMenuTheme = {
      Container: {
        normal: {
          width,
        },
      },
      MenuItem: {
        MenuItemWrap: {
          normal: {
            color: blackColor,
            height: 32,
          },
          hover: {
            color: themeColor,
          },
        },
      },
    };
    return this.mergeTheme('Menu', defaultMenuTheme);
  };

  getItems(query: string) {
    const { value } = this.state;
    const items = [];
    if (value) {
      const keys = this.getKeys(value);
      const valueLen = keys.length;

      for (let i = 0; i < valueLen; i++) {
        const key = keys[i];
        const { text } = value[key];
        if (query === '' || text.indexOf(query) != -1) {
          items.push({ value: key, text });
        }
      }
    }

    return (
      <Menu
        {...this.getInputTagMenuTheme()}
        data={items}
        step={30}
        renderSuffixItems={this.getIcon}
      />
    );
  }

  valueKeys: Array<string>;
  oldValue: ?Object;

  getKeys(value: Object): Array<string> {
    if (value != this.oldValue) {
      this.valueKeys = Object.keys(value);
      this.oldValue = value;
    }
    return this.valueKeys;
  }

  onClear = (e: Object) => {
    const { disabled, onClear } = this.props;
    if (disabled) {
      return;
    }
    onClear && onClear(e);
    this.onChange([], []);
    e.preventDefault();
    e.stopPropagation();
    if (this.isLimit()) {
      return;
    }
    this.setState({ value: {} }, () => {
      this.adaptiveItems(this.getOffSetWidth());
      this.count = 0;
    });
  };

  getIcon = (item: Object) => {
    const { [ValueField]: value } = item;
    return (
      <ClearMenuItemButton
        iconClass="lugia-icon-reminder_close"
        onClick={this.onDelItem.bind(this, value)}
        key={value}
      />
    );
  };

  onDelItem = (targetKey: string, e: Object) => {
    e.preventDefault();
    e.stopPropagation();
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    const { value } = this.state;
    if (!value || !value[targetKey]) {
      return;
    }
    this.count--;
    if (this.count < 0) {
      this.count = 0;
    }
    const keys = this.getKeys(value);
    const valueArray = [];
    const displayValueArray = [];
    const len = keys.length;
    for (let i = 0; i < len; i++) {
      const key = keys[i];
      if (key !== targetKey) {
        valueArray.push(key);
        displayValueArray.push(value[key].text);
      }
    }

    const triggerChange = () => {
      this.onChange(valueArray, displayValueArray);
    };

    triggerChange();
    if (this.isLimit()) {
      return;
    }

    delete value[targetKey];
    this.resetValueKeys();
    this.adaptiveItems(this.getOffSetWidth());
  };

  resetValueKeys() {
    this.oldValue = undefined;
  }

  onChange = (value: Array<string>, displayValue: Array<string>) => {
    const { onChange } = this.props;
    onChange && onChange({ value, displayValue });
  };

  componentDidMount() {
    const offSetWidth = this.getOffSetWidth();
    this.oldWidth = offSetWidth;
    this.adaptiveItems(offSetWidth);
  }

  componentDidUpdate() {
    const offSetWidth = this.getOffSetWidth();
    if (offSetWidth !== this.oldWidth) {
      this.oldWidth = offSetWidth;
      this.adaptiveItems(offSetWidth);
    }
  }

  getOffSetWidth() {
    if (this.isMutliple()) {
      return this.list.offsetWidth;
    }
    return 0;
  }

  getHeight() {
    const { getTheme } = this.props;

    const { height = DefaultHeight } = getTheme();
    return height;
  }

  getTagMargin() {
    const { getPartOfThemeConfig } = this.props;
    const { normal: { margin } = {} } = getPartOfThemeConfig('TagWrap');
    if (!margin) {
      // 加上各项默认的margin值
      return 5;
    }
    const { left, right } = margin;
    return toNumber(left, 0) + toNumber(right, 0);
  }

  getTagPadding() {
    const { getPartOfThemeConfig } = this.props;
    const { normal: { padding } = {} } = getPartOfThemeConfig('TagWrap');
    if (!padding) {
      return 10;
    }
    const { left, right } = padding;
    return toNumber(left, 0) + toNumber(right, 0);
  }

  getTagFontSize() {
    const { getPartOfThemeConfig } = this.props;
    const { normal: { font: { size } = {} } = {} } = getPartOfThemeConfig('TagWrap');
    return isNumber(size) ? size : fontSize;
  }

  getTagWidth() {
    const { getPartOfThemeConfig } = this.props;
    const { normal: { width } = {} } = getPartOfThemeConfig('TagWrap');
    if (!width || !isNumber(width)) {
      return undefined;
    }
    return width;
  }

  getMoreItemWidth() {
    const margin = this.getTagMargin();
    const width = this.getTagWidth();
    if (width) {
      return width + margin;
    }

    const padding = this.getTagPadding();
    const fontSize = this.getTagFontSize();
    return margin + padding + fontSize;
  }

  async adaptiveItems(listWidth: number): Promise<boolean> {
    const { disabled } = this.props;
    if (!this.isMutliple()) {
      return true;
    }
    const items = [];
    const { value } = this.state;
    if (value) {
      const moreItemWidth = this.getMoreItemWidth();
      listWidth -= moreItemWidth;
      let totalWidth = 0;

      const keys = this.getKeys(value);
      const valueLen = keys.length;

      for (let i = 0; i < valueLen; i++) {
        const key = keys[i];
        const theValue = value[key];

        if (!theValue) {
          return false;
        }
        const { text } = theValue;
        const fontWidth = await this.getFontWidth(text);

        totalWidth += fontWidth + this.getTagMargin();

        if (totalWidth > listWidth) {
          break;
        } else {
          items.push(
            <Item
              theme={this.getTagItemTheme()}
              disabled={disabled}
              key={key}
              onCloseClick={this.onDelItem.bind(this, key)}
            >
              {text}
            </Item>
          );
        }
      }

      this.needMoreItem = false;
      if (valueLen !== items.length) {
        this.needMoreItem = true;
      }

      if (this.needMoreItem) {
        items.push(this.getMoreItem());
      }
    }
    this.setState({ items });
    return true;
  }

  getMoreItem() {
    return (
      <MoreItem
        theme={this.getTagItemTheme()}
        themeProps={this.props.getPartOfThemeProps('TagWrap')}
        items={this.props.value}
        onClick={this.onMoreClick}
        key="more_item"
      />
    );
  }

  getTagItemTheme() {
    const { getPartOfThemeConfig } = this.props;
    const ItemThemeProps = {
      ItemTag: {
        TagWrap: getPartOfThemeConfig('TagWrap'),
        TagIcon: getPartOfThemeConfig('TagIcon'),
      },
    };
    return ItemThemeProps;
  }

  onMoreClick = (e: Object) => {
    this.setPopupVisible(true);
    e.preventDefault();
    e.stopPropagation();
  };

  setPopupVisible(...rest: any[]) {
    if (this.dropMenu) {
      this.dropMenu.setPopupVisible(...rest);
    }
  }

  onPopupVisibleChange = (visible: boolean) => {
    const { onPopupVisibleChange } = this.props;
    if (visible === true) {
      this.setState({ visible });
    }
    onPopupVisibleChange && onPopupVisibleChange(visible);
  };
}

const InputTagBox = ThemeHoc(InputTag, Widget.InputTag, { hover: true });
export const _InputTag_ = InputTag;

export default InputTagBox;
