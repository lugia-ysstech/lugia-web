/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import DropMenu from './';
import Menu from '../menu';
import Theme from '../theme';
import * as Widget from '../consts/index';

const { MenuItem, } = Menu;

const items = [];

for (let i = 0; i < 20; i++) {
  items.push(<MenuItem key={i}>{i}</MenuItem>);
}
let i = 0;
export default class extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
    this.state = { menu: null, };
  }

  render () {
    const { menu, } = this.state;
    return <div>
      <button onClick={this.onClick}>test</button>
      <Theme config={{ [Widget.DropMenu]: { width: 200, }, }}>
        <DropMenu menus={menu}>
          <input type="text"/>
        </DropMenu></Theme>
    </div>;
  }

  onClick = () => {

    this.setState({ menu: <Menu>{items.slice(i++)}</Menu>, });
  }
}

