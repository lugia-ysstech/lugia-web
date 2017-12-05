/**
 * 标签输入框
 * create by ligx
 *
 * @flow
 */

import * as React from 'react';
import styled from 'styled-components';
import '../css/sv.css';
import { InputBorderColor, InputBorderHoverColor, RadiusSize, } from '../css/input';
import { ItemMarginRight, } from './style';
import Item from './Item';
import Icon from '../icon';
import MoreItem from './MoreItem';
import FontItem from './FontItem';
import ThemeProvider from '../common/ThemeProvider';
import * as Widget from '../consts/Widget';
import Theme from '../theme';
import DropMenu from '../dropmenu';
import Menu from '../menu';
import Support from '../common/FormFieldWidgetSupport';
import PlaceContainer from '../common/PlaceContainer';

type InputTagProps = {
  placeholder?: string;
  getTheme: Function,
  onChange?: Function,
  onFocus?: Function,
  onBlur?: Function,
  value?: string,
  disabled: boolean,
  mutliple: boolean,
  displayValue?: string,
  defaultValue?: string,
  defaultDisplayValue?: string,
  onClick?: Function,
  onPopupVisibleChange?: Function,
};
const Clear = 'sv-icon-close-circled';
type InputTagState = {
  focus: boolean,
  items: Array<React.Node>,
  value: Object,
};
const widthFunc = (spanWidth: number) => (props: Object) => {
  const w = props.theme.width - spanWidth;
  return w ? `width: ${w}px;` : 'width: 100%;';
};
const width = widthFunc(0);
const disabled = props => {
  return props.disabled ? 'background: rgba(0,0,0,.05);' : '';
};
const Container = styled.div`
  ${width}
  ${disabled}
  display: inline-block;
  position: relative;
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
`;
const outContainerHeight = 28;
const focus = props => {
  return props.focus ? `border-color: ${InputBorderHoverColor};` : '';
};
const OutContainer = styled.div`
  border: solid 1px ${InputBorderColor};
  border-radius: ${RadiusSize};
  min-height: ${outContainerHeight}px;
  padding-bottom: 3px;
  ${focus}
  :hover {
    border-color: ${InputBorderHoverColor};
  }
`;
const IconButton: Object = styled(Icon)`
  top: 50%;
  right: 0px;
  position: absolute;
  margin-top: -8px;
  color: rgba(0,0,0,.25);
`;

IconButton.displayName = 'IconButtonName';
const marginLeft = 5;
const marginRight = 7;

const getContentWidth = (w: number) => {
  return w - marginRight - marginLeft;
};
const InnerContainer = styled.div `
  ${widthFunc(-getContentWidth(0))}
  height: 26px;
  margin-left: ${marginLeft}px;
  margin-right: ${marginRight}px;
  margin-bottom: -3px;
  position: relative;
  user-select: none;
`;
const SingleInnerContainer = InnerContainer.extend`
  padding: 5px;
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const InputTagTheme = styled(Theme)`
  display: block;
  min-height: ${outContainerHeight}px;
  height: ${outContainerHeight}px;
`;
const FocuInput = styled.input`
  position: absolute;
  left: -500px;
  width: 1px;
  height: 1px;
  padding: 0;
  border: none;
`;

class InputTag extends React.Component<InputTagProps, InputTagState> {
  static displayName = Widget.InputTag;
  static defaultProps = {
    getTheme: () => {
      return {};
    },
    mutliple: true,
    disabled: false,
  };

  container: Object;
  count: number;
  dropMenu: ?Object;
  fontItem: Object;
  list: Object;
  needMoreItem: boolean;
  oldWidth: number;

  isMutliple () {
    return this.props.mutliple;
  }

  constructor (props: InputTagProps) {
    super(props);
    this.count = 0;
    this.state = {
      focus: false,
      items: [],
      value: this.fetchValueObject(props),
    };
  }

  shouldComponentUpdate (nextPros: InputTagProps, nextState: InputTagState) {
    const { props, state, } = this;
    const isChange = state.items !== nextState.items ||
      props.value !== nextPros.value ||
      props.mutliple !== nextPros.mutliple ||
      props.disabled !== nextPros.disabled ||
      state.value !== nextState.value ||
      state.focus !== nextState.focus ||
      props.displayValue !== nextPros.displayValue;
    return isChange;
  }


  fetchValueObject (props: InputTagProps): Object {
    const result = {};
    const { value = [], displayValue = [], } = this.getValue(props);

    const isEmptyValue = !value || value.length === 0;
    if (this.isMutliple() === false) {
      if (isEmptyValue) {
        return {};
      }
      this.count = 1;
      return { text: displayValue ? displayValue : value, };
    }

    const valLen = value.length;
    for (let i = 0; i < valLen; i++) {
      const val = value[ i ];
      if (val !== '') {
        const displayVal = displayValue[ i ];
        result[ val ] = { text: displayVal ? displayVal : val, };
      }
    }
    this.count = valLen;
    return result;
  }

  getCount (): number {
    return this.count;
  }

  getValueObject (): Object {
    return this.state.value;
  }

  getValue (props: InputTagProps): { value: Array<string>, displayValue: Array<string> } {
    return Support.getCodeItemArray(props);
  }

  isLmit (): boolean {
    const { props, } = this;
    return !Support.isNotLimit(props);
  }

  componentWillReceiveProps (props: InputTagProps) {
    if (this.isLmit()) {
      if (props.value !== this.props.value) {
        this.setState({
          value: this.fetchValueObject(props),
        }, () => {
          this.adaptiveItems(this.getOffSetWidth());
        });
      }
    }
  }

  render () {
    const { props, state, } = this;
    let result;
    const clearButton = this.getClearButton();
    const placeholder = this.getPlaceholder();
    const config = { width: this.getWidth(), };
    const theme = {
      [Widget.DropMenu]: config,
      [Widget.Trigger]: config,
      [Widget.Icon]: { hoverColor: 'red', },
      [IconButton.displayName]: { hoverColor: 'rgba(0,0,0,.43)', },
    };
    const { focus, } = state;
    const { getTheme, disabled, } = props;
    if (!this.isMutliple()) {
      result = <Container className="sv"
                          disabled={disabled}
                          theme={getTheme()}
                          innerRef={cmp => this.container = cmp}
                          onClick={this.onClick}>
        <OutContainer focus={focus}>
          <SingleInnerContainer theme={props.getTheme()}>
            {placeholder}
            {this.getSingleValue()}
            {clearButton}
            <FocuInput/>
          </SingleInnerContainer>
        </OutContainer>
      </Container>;
    } else {

      const { items, } = state;
      const fillFontItem: Function = (cmp: Object): any => this.fontItem = cmp;

      result = (
        <Container className="sv"
                   disabled={disabled}
                   theme={props.getTheme()}
                   innerRef={cmp => this.container = cmp}
                   onClick={this.onClick}>
          <OutContainer focus={focus}>
            <InnerContainer theme={props.getTheme()}>
              <List innerRef={cmp => this.list = cmp}>
                <FontItem ref={fillFontItem}/>
                {items}
              </List>
              {placeholder}
              {clearButton}
              <FocuInput onFocus={this.onFocus} onBlur={this.onBlur}/>
            </InnerContainer>
          </OutContainer>
        </Container>
      );

      if (this.needMoreItem) {
        return <InputTagTheme config={theme}><DropMenu menus={this.getItems()}
                                                       onPopupVisibleChange={this.onPopupVisibleChange}
                                                       action={[]}
                                                       hideAction={['click',]}
                                                       ref={cmp => {
                                                         this.dropMenu = cmp;
                                                       }}>
          {result}
        </DropMenu></InputTagTheme>;
      }
    }

    return <InputTagTheme config={theme}>
      {result}
    </InputTagTheme>;
  }

  onFocus = () => {
    this.setState({ focus: true, }, () => {
      const { onFocus, } = this.props;
      onFocus && onFocus();
    });
  };
  onBlur = () => {

    this.setState({ focus: false, }, () => {
      const { onBlur, } = this.props;
      onBlur && onBlur();
    });
  };

  getClearButton () {
    if (this.isEmpty()) {
      return null;
    }
    return <IconButton iconClass={Clear} viewClass={IconButton.displayName}
                       onClick={this.onClear}></IconButton>;
  }


  getPlaceholder () {
    const { placeholder, } = this.props;
    if (!placeholder || !this.isEmpty()) {
      return null;
    }
    return <PlaceContainer>{placeholder}</PlaceContainer>;
  }

  isEmpty (): boolean {
    if (this.isMutliple()) {
      const { items, } = this.state;
      return items.length <= 0;
    }
    return this.getSingleValue() === '';

  }

  getSingleValue () {
    const { value = {}, } = this.state;
    const { text = '', } = value;
    return text;
  }

  getFontWidth (text: string): number {
    return this.fontItem.getWidth(text);
  }

  onClick = (e: Object) => {
    const { onClick, } = this.props;
    onClick && onClick(e);
  };

  getItems () {
    const { value, } = this.state;
    const items = [];
    if (value) {
      const keys = this.getKeys(value);
      const valueLen = keys.length;

      for (let i = 0; i < valueLen; i++) {
        const key = keys[ i ];
        const { text, } = value[ key ];
        items.push({ key, value: text, });
      }
    }

    return <Menu data={items} getPrefix={this.getIcon}>
    </Menu>;
  }

  valueKeys: Array<string>;
  oldValue: ?Object;

  getKeys (value: Object): Array<string> {
    if (value != this.oldValue) {
      this.valueKeys = Object.keys(value);
      this.oldValue = value;
    }
    return this.valueKeys;
  }

  onClear = (e: Object) => {
    const { disabled, } = this.props;
    if (disabled) {
      return;
    }
    this.setState({ value: {}, }, () => {
      this.adaptiveItems(this.getOffSetWidth());
      this.onChange([], []);
      this.count = 0;
    });
    e.preventDefault();
    e.stopPropagation();
  };

  getIcon = (item: Object) => {
    const { key, } = item;
    return <Icon iconClass="sv-icon-android-delete" onClick={this.onDelItem.bind(this, key)} key={key}/>;
  };

  onDelItem = (targetKey: string) => {
    const { disabled, } = this.props;
    if (disabled) {
      return;
    }
    const { value, } = this.state;
    if (!value || !value[ targetKey ]) {
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
      const key = keys[ i ];
      if (key !== targetKey) {
        valueArray.push(key);
        displayValueArray.push(value[ key ].text);
      }
    }

    const tirggetChagne = () => {
      this.onChange(valueArray, displayValueArray);
    };

    if (this.isLmit()) {
      tirggetChagne();
      return;
    }
    delete value[ targetKey ];
    this.resetValueKeys();
    tirggetChagne();
    this.adaptiveItems(this.getOffSetWidth());
  };

  resetValueKeys () {
    this.oldValue = undefined;
  }

  onChange = (value: Array<string>, displayValue: Array<string>) => {
    const { onChange, } = this.props;
    onChange && onChange({ value, displayValue, });
  };


  componentDidMount () {
    const offSetWidth = this.getOffSetWidth();
    this.oldWidth = offSetWidth;

    this.adaptiveItems(offSetWidth);
  }

  componentDidUpdate () {

    const offSetWidth = this.getOffSetWidth();
    if (offSetWidth !== this.oldWidth) {
      this.oldWidth = offSetWidth;
      this.adaptiveItems(offSetWidth);
    }
  }

  getOffSetWidth () {
    const { getTheme, } = this.props;
    const { width, } = getTheme();
    if (this.isMutliple()) {
      return (typeof width === 'number') ? getContentWidth(width) : this.list.offsetWidth;
    }
    return 0;
  }

  getWidth () {
    const { getTheme, } = this.props;
    const { width, } = getTheme();
    const offsetWidth = this.container ? this.container.offsetWidth : 0;
    return width ? width : offsetWidth;
  }

  async adaptiveItems (listWidth: number): Promise<boolean> {
    if (!this.isMutliple()) {
      return true;
    }
    const items = [];
    this.needMoreItem = false;
    const { value, } = this.state;
    if (value) {
      listWidth -= 36;
      let totalWidth = 0;
      const keys = this.getKeys(value);
      const valueLen = keys.length;
      for (let i = 0; i < valueLen; i++) {

        const key = keys[ i ];
        const { text, } = value[ key ];
        const fontWidth = await this.getFontWidth(text);
        totalWidth += fontWidth + ItemMarginRight;
        if (totalWidth >= listWidth) {
          break;
        }

        items.push(<Item key={key} onCloseClick={this.onDelItem.bind(this, key)}>{text}</Item>);
      }
      if (valueLen !== items.length) {
        this.needMoreItem = true;
      }

      if (this.needMoreItem) {
        items.push(this.getMoreItem());
      }
    }
    this.setState({ items, });
    return true;
  }

  getMoreItem () {
    return <MoreItem items={this.props.value} onClick={this.onMoreClick} key="sv_more_item"/>;
  }

  onMoreClick = (e: Object) => {
    this.setPopupVisible(true);
    e.preventDefault();
    e.stopPropagation();
  };

  setPopupVisible (visible: boolean) {
    if (this.dropMenu && this.dropMenu.getThemeTarget() && this.dropMenu.getThemeTarget().trigger) {
      this.dropMenu.getThemeTarget().trigger.getThemeTarget().setPopupVisible(visible);
    }
  }

  onPopupVisibleChange = (visible: boolean) => {
    const { onPopupVisibleChange, } = this.props;
    onPopupVisibleChange && onPopupVisibleChange(visible);
  }

}

const InputTagBox = ThemeProvider(InputTag, Widget.InputTag);
export const _InputTag_ = InputTag;

export default InputTagBox;
