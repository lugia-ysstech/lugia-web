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

const { MenuItem, } = Menu;
type ValuItem = {
  key: string,
  text: string,
}
type InputTagProps = {
  getTheme: Function,
  onChange?: Function,
  value?: string,
  displayValue?: string,
  defaultValue?: string,
  defaultDisplayValue?: string,
  onClick?: Function,
};
type InputTagState = {
  items: Array<React.Node>,
  value?: Object,
};
const widthFunc = (spanWidth: number) => (props: Object) => {
  const w = props.theme.width - spanWidth;
  return w ? `width: ${w}px;` : 'width: 100%;';
};
const width = widthFunc(0);
const Container = styled.div`
  ${width}
  display: inline-block;
  position: relative;
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
`;
const OutContainer = styled.div`
  border: solid 1px ${InputBorderColor};
  border-radius: ${RadiusSize};
  min-height: 28px;
  padding-bottom: 3px;

  :hover {
    border-color: ${InputBorderHoverColor};
  }
`;

const marginLeft = 5;
const marginRight = 7;
const separator = ',';

const getContentWidth = (w: number) => {
  return w - marginRight - marginLeft;
};
const InnerContainer = styled.div`
  ${widthFunc(getContentWidth(0))}
  height: 26px;
  margin-left: ${marginLeft}px;
  margin-right: ${marginRight}px;
  margin-bottom: -3px;
  position: relative;
  user-select: none;
`;
const PlaceContainer = styled.div`
  top: 50%;
  position: absolute;
  left: 0;
  right: 7px;
  margin-top: -10px;
  text-align: left;
  color: rgba(0, 0, 0, 0.25);
  line-height: 20px;
  max-width: 100%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

class InputTag extends React.Component<InputTagProps, InputTagState> {
  static displayName = Widget.InputTag;
  static defaultProps = {
    getTheme: () => {
      return {};
    },
  };

  container: Object;
  dropMenu: ?Object;
  displayValueArray: Array<string>;
  fontItem: Object;
  list: Object;
  needMoreItem: boolean;
  oldWidth: number;
  valueArray: Array<string>;


  constructor (props: InputTagProps) {
    super(props);
    this.state = {
      items: [],
      value: this.fetchValueObject(),
    };
  }

  shouldComponentUpdate (nextPros: InputTagProps, nextState: InputTagState) {
    const { props, state, } = this;
    return state.items !== nextState.items ||
      props.value !== nextPros.value ||
      props.displayValue !== nextPros.displayValue;
  }


  fetchValueObject (): Object {
    const result = {};
    const { value = '', displayValue = '', } = this.getValue();
    const valArray = value.split(separator);
    const displayValArray = displayValue.split(separator);
    const valLen = valArray.length;
    for (let i = 0; i < valLen; i++) {
      const val = valArray[ i ];
      if (val !== '') {
        const displayVal = displayValArray[ i ];
        result[ val ] = { text: displayVal ? displayVal : '', };
      }
    }
    return result;
  }

  getValue (): { value: string, displayValue: string } {
    const { props, } = this;
    if ('value' in props === true) {
      const { value = '', displayValue = '', } = props;
      return { value, displayValue, };
    }
    const { defaultValue: value = '', defaultDisplayValue: displayValue = '', } = props;
    return { value, displayValue, };
  }

  render () {
    const { items, } = this.state;
    const fillFontItem: Function = (cmp: Object): any => this.fontItem = cmp;
    const result = (
      <Container className="sv" theme={this.props.getTheme()} innerRef={cmp => this.container = cmp}
                 onClick={this.onClick}>
        <OutContainer>
          <InnerContainer theme={this.props.getTheme()}>
            <List innerRef={cmp => this.list = cmp}>
              <FontItem ref={fillFontItem}/>
              {items}
            </List>
          </InnerContainer>
        </OutContainer>
      </Container>
    );
    if (this.needMoreItem) {

      const config = { width: this.getWidth(), };
      const theme = {
        [Widget.DropMenu]: config,
        [Widget.Trigger]: config,
        [Widget.Icon]: { hoverColor: 'red', },
      };

      return <Theme config={theme}>
        <DropMenu menus={this.getItems()}
                  action={[]}
                  hideAction={['click',]}
                  ref={cmp => {
                    this.dropMenu = cmp;
                  }}>
          {result}
        </DropMenu>
      </Theme>;
    }
    return result;
  }

  getFontWidth (text: string): number {
    return this.fontItem.getWidth(text);
  }

  onClick = (e: Object) => {
    const { onClick, } = this.props;
    onClick && onClick(e);
  };

  getItems () {
    console.info('getITems');
    const { value, } = this.state;
    const items = [];
    if (value) {
      const keys = Object.keys(value);
      const valueLen = keys.length;

      for (let i = 0; i < valueLen; i++) {
        const key = keys[ i ];
        const { text, } = value[ key ];
        this.valueArray.push(key);
        this.displayValueArray.push(text);
        items.push({ key, value: text, });
      }
    }

    return <Menu data={items} getPrefix={this.getIcon}>
    </Menu>;
  }


  getIcon = (item: Object) => {
    const { key, } = item;
    return <Icon iconClass="sv-icon-android-delete" onClick={this.onDelItem.bind(this, key)} key={key}/>;
  };

  onDelItem = (key: string) => {
    const { value, } = this.state;
    if (value && value[ key ]) {
      delete value[ key ];
      this.setState({ value, }, async () => {
        await this.adaptiveItems(this.getOffSetWidth());
        this.onChange(this.valueArray.join(','), this.displayValueArray.join(','));
      });
    }
  };

  onChange = (value: string, displayValue: string) => {
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
    return width ? getContentWidth(width) : this.list.offsetWidth;
  }

  getWidth () {
    const { getTheme, } = this.props;
    const { width, } = getTheme();
    return width ? width : this.container.offsetWidth;
  }

  async adaptiveItems (listWidth: number): Promise<boolean> {
    const items = [];
    this.needMoreItem = false;
    const { value, } = this.state;
    this.valueArray = [];
    this.displayValueArray = [];
    if (value) {
      listWidth -= 20;
      let totalWidth = 0;
      const keys = Object.keys(value);
      const valueLen = keys.length;
      for (let i = 0; i < valueLen; i++) {

        const key = keys[ i ];
        const { text, } = value[ key ];
        const fontWidth = await this.getFontWidth(text);
        totalWidth += fontWidth + ItemMarginRight;
        if (totalWidth >= listWidth) {
          break;
        }
        this.valueArray.push(key);
        this.displayValueArray.push(text);

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

  onMoreClick = () => {
    if (this.dropMenu && this.dropMenu.target && this.dropMenu.target.trigger) {
      this.dropMenu.target.trigger.target.setPopupVisible(true);
    }
  };

}

const InputTagBox = ThemeProvider(InputTag, Widget.InputTag);
export const _InputTag_ = InputTag;

export default InputTagBox;
