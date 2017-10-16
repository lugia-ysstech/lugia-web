/**
 * 用来策略字体的组件
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import { hidden, } from './css.css';
import Dropmenu from '../dropmenu';
import Theme from '../theme';
import * as Widget from '../consts/Widget';
import { ItemContainer, ItemText, } from './ItemTag';
import Menu from '../menu';

const { MenuItem, } = Menu;


export default class  extends React.Component<any, any> {
  render () {

    return (
      <Theme config={{ [Widget.DropMenu]: { width: 200, }, }}>
        <Dropmenu menus={this.getItems()}>
          <span>
            <ItemContainer>
              <ItemText>...</ItemText>
            </ItemContainer>
           </span>
        </Dropmenu>
      </Theme>
    );
  }

  getItems () {
    const { items, } = this.props;
    const result = [];
    if (items) {
      const valueLen = items.length;
      for (let i = 0; i < valueLen; i++) {
        const text = items[ i ];
        console.info(text);
        result.push(<MenuItem key={text}>{text}</MenuItem>);
      }
    }

    return <Menu>
      {result}
    </Menu>;
  }
}
