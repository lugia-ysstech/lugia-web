import * as React from 'react';
import DropMenuButton from './dropmenuButton';
import Theme from '../theme';
import Widget from '../consts/index';
import Button from '../button';
import styled from 'styled-components';
import DropMenu from './';
import Menu from '../menu';

const { MenuItem } = Menu;

const items = [];

for (let i = 0; i < 10; i++) {
  items.push(
    <MenuItem
      key={i}
      onClick={rest => {
        // console.info(rest);
      }}
    >
      {i}
    </MenuItem>
  );
}

const Box = styled.div`
  display: inline-block;
  margin: 30px;
`;

const H2 = styled.h2`
  margin: 30px;
  text-align: center;
`;

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      menu: (
        <Menu
          onClick={(...rest) => {
            // console.info('Menuclick', rest);
          }}
        >
          {items}
        </Menu>
      ),
    };
  }

  render() {
    const { menu } = this.state;
    const defaultView = {
      [Widget.DropMenu]: { width: 80 },
    };

    const view = {
      [Widget.DropMenuButton]: { width: 120, color: '#E01861' },
      [Widget.DropMenu]: { width: 100 },
    };
    return (
      <div>
        <H2>Default DropMenu.Button</H2>
        <Theme config={defaultView}>
          <Box>
            <DropMenu menus={menu} align={'bottom'} action={'hover'} hideAction={'hover'}>
              <DropMenu.Button onClick={this.onClick}>Hover</DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu} align={'bottomLeft'} action={'click'} hideAction={'click'}>
              <DropMenu.Button onClick={this.onClick} type="primary">
                Click
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu} align={'bottomRight'} action={'hover'} hideAction={'hover'}>
              <DropMenu.Button divided={false} onClick={this.onClick}>
                Hover me
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu} align={'bottomLeft'} action={'click'} hideAction={'click'}>
              <DropMenu.Button type="primary" divided={false} onClick={this.onClick}>
                Click me
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu} align={'bottomRight'} action={'hover'} hideAction={'hover'}>
              <DropMenu.Button type="basic" onClick={this.onClick}>
                Basic
              </DropMenu.Button>
            </DropMenu>
          </Box>
        </Theme>

        <H2>Colorful DropMenu.Button</H2>
        <Theme config={view}>
          <Box>
            <DropMenu menus={menu} align={'topLeft'}>
              <DropMenu.Button direction={'up'} onClick={this.onClick}>
                Click Right
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu} align={'topRight'} action={'hover'} hideAction={'hover'}>
              <DropMenu.Button direction={'up'} onClick={this.onClick} type="primary">
                Hover Right
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu} align={'bottom'} action={'click'} hideAction={'click'}>
              <DropMenu.Button divided={false} onClick={this.onClick}>
                Click me
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu} align={'bottomRight'} action={'hover'} hideAction={'hover'}>
              <DropMenu.Button type="primary" divided={false} onClick={this.onClick}>
                Hover me
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu} align={'top'} action={'click'} hideAction={'click'}>
              <DropMenu.Button type="basic" direction={'up'} onClick={this.onClick}>
                Click me
              </DropMenu.Button>
            </DropMenu>
          </Box>
        </Theme>

        <H2>Disabled DropMenu.Button</H2>
        <Theme config={view}>
          <Box>
            <DropMenu menus={menu} align={'topLeft'}>
              <DropMenu.Button disabled={true} direction={'up'} onClick={this.onClick}>
                Click Right
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu} align={'topRight'} action={'hover'} hideAction={'hover'}>
              <DropMenu.Button
                disabled={true}
                direction={'up'}
                onClick={this.onClick}
                type="primary"
              >
                Hover Right
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu} align={'bottom'} action={'click'} hideAction={'click'}>
              <DropMenu.Button disabled={true} divided={false} onClick={this.onClick}>
                Click me
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu} align={'bottomRight'} action={'hover'} hideAction={'hover'}>
              <DropMenu.Button
                disabled={true}
                type="primary"
                divided={false}
                onClick={this.onClick}
              >
                Hover me
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu} align={'bottom'} action={'click'} hideAction={'click'}>
              <DropMenu.Button disabled={true} type="basic" onClick={this.onClick}>
                Click me
              </DropMenu.Button>
            </DropMenu>
          </Box>
        </Theme>
      </div>
    );
  }

  onPopupVisibleChange = visible => {
    console.log(visible);
  };

  onClick = (...rest) => {
    // console.log('ClickLeftButton', rest);
  };
}
