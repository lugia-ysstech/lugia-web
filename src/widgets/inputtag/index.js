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
import MoreItem from './MoreItem';
import FontItem from './FontItem';
import ThemeProvider from '../common/ThemeProvider';
import * as Widget from '../consts/Widget';
import Theme from '../theme';
import DropMenu from '../dropmenu';
import Menu from '../menu';

const { MenuItem, } = Menu;

type InputTagProps = {
  getTheme: Function,
  value?: Array<string>,
};
type InputTagState = {
  items: Array<React.Node>,
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
    };
  }

  render () {
    const { items, } = this.state;
    const fillFontItem: Function = (cmp: Object): any => this.fontItem = cmp;

    const result = (
      <Container className="sv" theme={this.props.getTheme()} innerRef={cmp => this.container = cmp}>
        <OutContainer>
          <InnerContainer theme={this.props.getTheme()}>
            {/*<PlaceContainer>气你输入</PlaceContainer>*/}
            <List innerRef={cmp => this.list = cmp}>
              <FontItem ref={fillFontItem}/>
              {items}
            </List>
          </InnerContainer>
        </OutContainer>
      </Container>
    );
    if (this.needMoreItem) {
      return <Theme config={{ [Widget.DropMenu]: { width: this.getWidth(), }, }}>
        <DropMenu menus={this.getItems()}
                  action={[]}
                  hideAction={['click',]}
                  ref={cmp => {
                    console.info('kk', cmp);
                    this.dropMenu = cmp;
                  }}>
          {result}
        </DropMenu>
      </Theme>;
    }
    return result;
  }

  getItems () {
    const { value, } = this.props;
    const items = [];
    if (value) {
      const valueLen = value.length;
      for (let i = 0; i < valueLen; i++) {
        const text = value[ i ];
        items.push(<MenuItem key={text}>{text}</MenuItem>);
      }
    }

    return <Menu>
      {items}
    </Menu>;
  }

  oldWidth: number;

  componentDidMount () {
    const offSetWidth = this.getOffSetWidth();
    this.oldWidth = offSetWidth;
    this.adaptiveItems(offSetWidth);
  }

  componentDidUpdate () {

    if (this.getOffSetWidth() !== this.oldWidth) {
      this.adaptiveItems(this.list.offsetWidth);
      this.oldWidth = this.list.offsetWidth;
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
    listWidth -= 20;
    const { value, } = this.props;
    const items = [];
    let totalWidth = 0;
    this.needMoreItem = false;
    if (value) {
      const valueLen = value.length;
      for (let i = 0; i < valueLen; i++) {
        const text = value[ i ];
        totalWidth += await this.fontItem.getWidth(text) + ItemMarginRight;
        if (totalWidth >= listWidth) {
          break;
        }
        items.push(<Item key={`k${i}`}>{text}</Item>);
      }
      if (valueLen !== items.length) {
        this.needMoreItem = true;
      }
    }
    if (this.needMoreItem) {
      items.push(this.getMoreItem());
    }

    this.setState({ items, });
    return true;
  }

  getMoreItem () {
    return <MoreItem items={this.props.value} onClick={this.onMoreClick}/>;
  }

  onMoreClick = () => {
    if (this.dropMenu && this.dropMenu.target && this.dropMenu.target.trigger) {
      this.dropMenu.target.trigger.setPopupVisible(true);
      console.info('hello');
    }
  };

}

const InputTagBox = ThemeProvider(InputTag, Widget.InputTag);
export default InputTagBox;
