/**
 *
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import DropMenu from './';
import Menu from '../menu';
import Widget from '../consts/index';
import styled from 'styled-components';

const Box = styled.div`
  display: inline-block;
  margin: 30px;
`;

const data = [];

for (let i = 0; i < 10; i++) {
  const title = '选项' + i;
  data.push({ value: title, text: title });
}

const theme = {
  [Widget.DropMenu]: {
    Container: {
      normal: {
        width: 500,
      },
    },
    DropMenuButton: {
      Container: {
        normal: {
          width: 200,
          height: 50,
          background: {
            color: '#24a42f',
          },
        },
        hover: {
          background: {
            color: 'red',
          },
        },
        disabled: {
          background: {
            color: 'orange',
          },
        },
      },
      PullIcon: {
        normal: {
          color: 'orange',
          font: {
            size: 16,
          },
        },
      },
    },
  },
};

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      menu: <Menu data={data} />,
    };
  }

  render() {
    const { menu } = this.state;

    return (
      <div>
        <Box>
          <DropMenu text={'下拉菜单'} theme={theme} menus={menu}>
            <DropMenu.Button divided={true}>Click</DropMenu.Button>
          </DropMenu>
        </Box>

        <Box>
          <DropMenu menus={menu}>
            <DropMenu.Button divided={true}>Click</DropMenu.Button>
          </DropMenu>
        </Box>

        <Box>
          <DropMenu menus={menu}>
            <DropMenu.Button divided={true}>Click</DropMenu.Button>
          </DropMenu>
        </Box>
        <Box>
          <DropMenu menus={menu}>
            <DropMenu.Button type={'primary'} divided={true}>
              Click
            </DropMenu.Button>
          </DropMenu>
        </Box>
      </div>
    );
  }
}
