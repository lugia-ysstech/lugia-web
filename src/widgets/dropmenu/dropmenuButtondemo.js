import * as React from 'react';
import DropMenuButton from './dropmenuButton';
import Theme from '../theme';
import Widget from '../consts/index';
import styled from 'styled-components';
import DropMenu from './';
import Menu from '../menu';

const { MenuItem } = Menu;

const items = [];

for (let i = 0; i < 10; i++) {
  items.push(<MenuItem key={i}>{i}</MenuItem>);
}

const Box = styled.div`
  display: inline-block;
  margin: 50px;
`;

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { menu: items };
  }

  render() {
    const { menu } = this.state;
    const view = {
      [Widget.DropMenuButton]: { width: 180 },
      [Widget.DropMenu]: { width: 160 },
    };
    return (
      <div>
        <Theme config={view}>
          {/* <h3>Type: default ; Divided: default; => Top Hover</h3> */}
          <Box>
            <DropMenu menus={menu} align={'top'} action={['hover']} hideAction={['hover']}>
              <DropMenuButton onClick={this.onClick}>Hover Right</DropMenuButton>
            </DropMenu>
          </Box>

          {/* <h3>Type: default => Divided: default;TopLeft Click</h3> */}
          <Box>
            <DropMenu menus={menu} align={'topLeft'}>
              <DropMenuButton onClick={this.onClick}>Click Right</DropMenuButton>
            </DropMenu>
          </Box>

          {/* <h3>Type: primary ;Divided: default; TopRight Hover</h3> */}
          <Box>
            <DropMenu menus={menu} align={'topRight'} action={['hover']} hideAction={['hover']}>
              <DropMenuButton onClick={this.onClick} type="primary">
                Hover Right
              </DropMenuButton>
            </DropMenu>
          </Box>

          {/* <h3>Type: default ;Divided: false; bottom Hover</h3> */}
          <Box>
            <DropMenu menus={menu} align={'bottom'} action={['hover']} hideAction={['hover']}>
              <DropMenuButton divided={false} onClick={this.onClick}>
                Hover me
              </DropMenuButton>
            </DropMenu>
          </Box>

          {/* <h3>Type: default ;Divided: false; bottomLeft Click</h3> */}
          <Box>
            <DropMenu menus={menu} align={'bottomLeft'} action={['click']} hideAction={['click']}>
              <DropMenuButton type="primary" divided={false} onClick={this.onClick}>
                參數設置
              </DropMenuButton>
            </DropMenu>
          </Box>

          {/* <h3>Type: basic ; bottomRight Click</h3> */}
          <Box>
            <DropMenu menus={menu} align={'bottomRight'} action={['hover']} hideAction={['hover']}>
              <DropMenuButton type="basic" onClick={this.onClick}>
                Hover me
              </DropMenuButton>
            </DropMenu>
          </Box>
        </Theme>
      </div>
    );
  }

  onClick = (...rest) => {
    console.log('ClickLeftButton', rest);
  };
}
