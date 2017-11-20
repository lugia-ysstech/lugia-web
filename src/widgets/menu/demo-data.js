/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Menu from './';
import Theme from '../theme';
import * as Widget from '../consts/Widget';

const items = [];
for (let i = 0; i < 30; i++) {
  items.push({ key: i, value: i, });
}
let i = 0;
export default class extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
    this.state = { items: [], };
  }

  render () {
    const { items = [], } = this.state;
    return <div>
      <button onClick={this.onClick}>test</button>
      <Theme config={{ [Widget.Menu]: { width: 200, height: 350, }, }}><Menu mutliple data={items}>

      </Menu></Theme>
    </div>;
  }

  onClick = () => {

    this.setState({ items: items.slice(i++), });
  }
}
