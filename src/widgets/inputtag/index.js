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
import {
  FontSize,
  lightGreyColor,
  Container,
  OutContainer,
  InnerContainer,
  SingleInnerContainer,
  Prefix,
  IconWrap,
  CommonIcon,
  FlexResBox,
  List,
  HiddenList,
  FocuInput,
  InputTagTheme,
} from '../css/inputtag';
import ErrorTip from '../tooltip/ErrorTip';
import { px2remcss } from '../css/units';

const ClearMenuItemButton: Object = styled(Icon)`
  top: 50%;
  right: ${px2remcss(FontSize)};
  position: absolute;
  transform: translateY(-50%);
  color: ${lightGreyColor};
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
  displayValue?: string,
  defaultValue?: string,
  defaultDisplayValue?: string,
  onClick?: Function,
  onClear?: Function,
  onPopupVisibleChange?: Function,
  prefix?: any,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
};
const Clear = 'lugia-icon-reminder_close';
const Pull = 'lugia-icon-direction_down';
type InputTagState = {
  focus: boolean,
  items: Array<React.Node>,
  value: Object,
  query: string,
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
    return this.props.mutliple;
  }

  constructor(props: InputTagProps) {
    super(props);
    this.count = 0;
    this.state = {
      focus: false,
      items: [],
      query: '',
      value: this.fetchValueObject(props),
    };
    this.fontItem = React.createRef();
  }

  shouldComponentUpdate(nextPros: InputTagProps, nextState: InputTagState) {
    const { props, state } = this;
    const isChange =
      state.items !== nextState.items ||
      props.value !== nextPros.value ||
      props.svThemVersion !== nextPros.svThemVersion ||
      props.mutliple !== nextPros.mutliple ||
      props.validateStatus !== nextPros.validateStatus ||
      props.help !== nextPros.help ||
      props.disabled !== nextPros.disabled ||
      (this.needMoreItem && state.query !== nextState.query) ||
      state.value !== nextState.value ||
      state.focus !== nextState.focus ||
      props.displayValue !== nextPros.displayValue;
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
    const { getTheme, disabled, validateStatus, prefix, getPartOfThemeProps } = props;

    const themeProps = getPartOfThemeProps('InputTagWrap');
    if (!this.isMutliple()) {
      result = this.generateOutter(
        <Container
          themeProps={themeProps}
          disabled={disabled}
          theme={getTheme()}
          ref={cmp => (this.container = cmp)}
          onClick={this.onClick}
        >
          <OutContainer
            themeProps={themeProps}
            focus={focus}
            disabled={disabled}
            validateStatus={validateStatus}
          >
            <SingleInnerContainer themeProps={themeProps} disabled={disabled}>
              <FlexResBox themeProps={themeProps}>
                {prefix ? <Prefix>{prefix}</Prefix> : null}
                {placeholder}
                {this.getSingleValue()}
                <FocuInput themeProps={themeProps} />
              </FlexResBox>
              {clearButton}
            </SingleInnerContainer>
          </OutContainer>
        </Container>
      );
    } else {
      const { items } = state;
      result = this.generateOutter(
        <Container
          themeProps={themeProps}
          disabled={disabled}
          ref={cmp => (this.container = cmp)}
          onClick={this.onClick}
        >
          <OutContainer
            themeProps={themeProps}
            focus={focus}
            disabled={disabled}
            validateStatus={validateStatus}
          >
            <InnerContainer themeProps={themeProps}>
              <FlexResBox themeProps={themeProps}>
                <List themeProps={themeProps} ref={cmp => (this.list = cmp)}>
                  {items}
                </List>
                {placeholder}
                <FocuInput themeProps={themeProps} onFocus={this.onFocus} onBlur={this.onBlur} />
              </FlexResBox>
              {clearButton}
            </InnerContainer>
          </OutContainer>
        </Container>
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
          >
            {result}
          </DropMenu>
        );
      }
    }

    return (
      <InputTagTheme themeProps={themeProps}>
        <HiddenList themeProps={themeProps}>
          <List themeProps={themeProps}>{font}</List>
        </HiddenList>
        {result}
      </InputTagTheme>
    );
  }

  generateOutter(cmp: any) {
    const { props } = this;
    const { validateStatus } = props;
    if (validateStatus === 'success') {
      return cmp;
    }
    const { help } = props;
    return (
      <ErrorTip
        title={help}
        action={['click']}
        placement="right"
        ref={cmp => {
          this.errorTip = cmp;
        }}
      >
        {cmp}
      </ErrorTip>
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

  getClearButton() {
    const themeProps = this.props.getPartOfThemeProps('SwitchIcon');
    const Icon = this.isEmpty() ? (
      <CommonIcon themeProps={themeProps} iconClass={Pull} />
    ) : (
      <CommonIcon themeProps={themeProps} iconClass={Clear} onClick={this.onClear} />
    );
    return <IconWrap themeProps={themeProps}>{Icon}</IconWrap>;
  }

  getPlaceholder() {
    const { placeholder } = this.props;
    if (!placeholder || !this.isEmpty()) {
      return null;
    }
    return <PlaceContainer>{placeholder}</PlaceContainer>;
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
      MenuWrap: {
        normal: {
          width,
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
      <Menu {...this.getInputTagMenuTheme()} data={items} step={30} getSuffix={this.getIcon} />
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
    const { normal = {} } = getPartOfThemeConfig('TagWrap');
    const { margin } = normal;
    if (!margin) {
      return 5;
    }
    // 此处有bug，因为margin中设置类似{left: '20'}时生效，但是如果{left: 'a'}不能转成数字的字符串
    // 此时四个方向的margin都不能生效，但是还是会加起来
    const { left, right } = margin;
    return toNumber(left, 0) + toNumber(right, 0);
  }

  getTagPadding() {
    const { getPartOfThemeConfig } = this.props;
    const { normal = {} } = getPartOfThemeConfig('TagWrap');
    const { padding } = normal;
    if (!padding) {
      return 10;
    }
    // 此处有bug，同margin
    const { left, right } = padding;
    return toNumber(left, 0) + toNumber(right, 0);
  }

  getTagFontSize() {
    const { getPartOfThemeConfig } = this.props;
    const { normal = {} } = getPartOfThemeConfig('TagWrap');
    const { font = {} } = normal;
    const { size = FontSize } = font;
    return isNumber(size) ? size : FontSize;
  }

  getTagWidth() {
    const { getPartOfThemeConfig } = this.props;
    const { normal = {} } = getPartOfThemeConfig('TagWrap');
    const { width } = normal;
    if (!width || !isNumber(width)) {
      return undefined;
    }
    return width;
  }

  getMoreItemWidth() {
    const margin = this.getTagMargin();
    const width = this.getTagWidth();
    // offsetWidth 多了 3px，所以为了不引起bug，先加5px
    if (width) {
      return width + margin + 5;
    }

    const padding = this.getTagPadding();
    const fontSize = this.getTagFontSize();
    return margin + padding + fontSize + 5;
  }

  async adaptiveItems(listWidth: number): Promise<boolean> {
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

  setPopupVisible(visible: boolean) {
    if (this.dropMenu && this.dropMenu.getThemeTarget() && this.dropMenu.getThemeTarget().trigger) {
      this.dropMenu
        .getThemeTarget()
        .trigger.getThemeTarget()
        .setPopupVisible(visible);
    }
  }

  onPopupVisibleChange = (visible: boolean) => {
    const { onPopupVisibleChange } = this.props;
    if (visible === true) {
      this.setState({ query: '' });
    }
    onPopupVisibleChange && onPopupVisibleChange(visible);
  };
}

const InputTagBox = ThemeHoc(InputTag, Widget.InputTag, { hover: true });
export const _InputTag_ = InputTag;

export default InputTagBox;
