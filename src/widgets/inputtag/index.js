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
  value?: string,
  displayValue?: string,
  defaultValue?: Object,
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
  list: Object;
  container: Object;
  dropMenu: ?Object;
  fontItem: Object;
  static displayName = Widget.InputTag;
  static defaultProps = {
    getTheme: () => {
      return {};
    },
  };

  constructor (props: InputTagProps) {
    super(props);
    this.state = {
      items: [],
      value: this.fetchValueObject(),
    };
  }

  fetchValueObject (): Object {
    const result = {};
    const { value = '', displayValue = '', } = this.props;
    const valArray = value.split(',');
    const valLen = valArray.length;
    const displayValArray = displayValue.split(',');
    for (let i = 0; i < valLen; i++) {
      const val = valArray[ i ];
      if (val !== '') {
        const displayVal = displayValArray[ i ];
        result[ val ] = { text: displayVal ? displayVal : '', };
      }
    }
    return result;
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

      const theme = {
        [Widget.DropMenu]: { width: this.getWidth(), },
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
    const theme = {
      [Widget.Icon]: { hoverColor: 'red', },
    };
    const { value, } = this.state;
    const items = [];
    if (value) {
      const keys = Object.keys(value);
      const valueLen = keys.length;
      for (let i = 0; i < valueLen; i++) {
        const key = keys[ i ];
        const { text, } = value[ key ];
        items.push(<Theme config={theme} key={key}>
            <MenuItem key={key}>
              <Icon iconClass="sv-icon-android-delete" onClick={this.onDelItem.bind(this, key)} key={key}/>
              {text}
            </MenuItem>
          </Theme>
        );
      }
    }

    return <Menu>
      {items}
    </Menu>;
  }

  onDelItem = (key: string) => {
    const { value, } = this.state;
    if (value && value[ key ]) {
      delete value[ key ];
      this.setState({ value, }, () => {
        this.adaptiveItems(this.getOffSetWidth());
      });
    }
  };

  oldWidth: number;

  componentDidMount () {
    const offSetWidth = this.getOffSetWidth();
    this.oldWidth = offSetWidth;
    this.adaptiveItems(offSetWidth);
  }

  componentDidUpdate () {

    const offSetWidth = this.getOffSetWidth();
    if (offSetWidth !== this.oldWidth) {
      this.adaptiveItems(offSetWidth);
      this.oldWidth = offSetWidth;
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

  needMoreItem: boolean;

  async adaptiveItems (listWidth: number): Promise<boolean> {
    const items = [];
    this.needMoreItem = false;
    const { value, } = this.state;
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
      this.dropMenu.target.trigger.setPopupVisible(true);
    }
  };

}

const InputTagBox = ThemeProvider(InputTag, Widget.InputTag);
export const _InputTag_ = InputTag;

export default InputTagBox;
