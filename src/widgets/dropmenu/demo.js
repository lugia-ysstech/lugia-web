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
import Widget from '../consts/index';
import styled from 'styled-components';
import { getBoxShadow, getBorder } from '@lugia/theme-utils/lib/index';

const Box = styled.div`
  display: inline-block;
  margin: 30px;
`;

const H2 = styled.div`
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-weight: 900;
  padding-left: 300px;
`;

const cascaderData = [
  { value: '参数设置一', text: '参数设置一' },
  {
    value: '参数设置二',
    text: '参数设置二',
    children: [
      { value: '二级信息1', text: '二级信息1' },
      { value: '二级信息2', text: '二级信息2' },
    ],
  },
  { value: '参数设置三', text: '参数设置三', disabled: true },
];

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
    // Menu: {
    //   MenuWrap: {
    //     normal: {
    //       width: 150,
    //       height: 500,
    //     },
    //   },
    // },
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
    const config = {
      [Widget.DropMenuButton]: {
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
      },
    };

    const view = {
      [Widget.DropMenuButton]: {
        Container: {
          normal: {
            width: 200,
            height: 80,
          },
        },

        Divided: {
          normal: {
            color: '#42da4a',
            width: 2,
          },
          hover: {
            color: 'blue',
          },
          active: {
            color: 'orange',
          },
          disabled: {
            color: '#000',
          },
        },

        TextContainer: {
          normal: {
            width: 50,
          },
          hover: {
            border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
          },
        },
      },
    };
    return (
      <div>
        <Box>
          <DropMenu text={'下拉菜单'} theme={theme} menus={menu}>
            <DropMenu.Button divided={true}>Click</DropMenu.Button>
          </DropMenu>
        </Box>

        {/*<Box>*/}
        {/*<DropMenu theme={theme}></DropMenu>*/}
        {/*</Box>*/}

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
        {/*<Box>*/}
        {/*<DropMenu menus={menu}>*/}
        {/*<DropMenu.Button theme={view} divided={true} disabled>*/}
        {/*Click*/}
        {/*</DropMenu.Button>*/}
        {/*</DropMenu>*/}
        {/*</Box>*/}

        {/*<Box>*/}
        {/*<DropMenu menus={menu}>*/}
        {/*<DropMenu.Button type={'primary'} divided={true} disabled>*/}
        {/*Click*/}
        {/*</DropMenu.Button>*/}
        {/*</DropMenu>*/}
        {/*</Box>*/}

        {/*<H2>不同样式的dropmenu</H2>*/}
        {/*<Box>*/}
        {/*<DropMenu menus={menu} autoHeight={true}>*/}
        {/*<DropMenu.Button type="basic" text="text">*/}
        {/*Click*/}
        {/*</DropMenu.Button>*/}
        {/*</DropMenu>*/}
        {/*</Box>*/}
        {/*<Box>*/}
        {/*<DropMenu menus={menu}>*/}
        {/*<DropMenu.Button>Hover</DropMenu.Button>*/}
        {/*</DropMenu>*/}
        {/*</Box>*/}
        {/*<Box>*/}
        {/*<DropMenu menus={menu}>*/}
        {/*<DropMenu.Button disabled>Hover</DropMenu.Button>*/}
        {/*</DropMenu>*/}
        {/*</Box>*/}
        {/*<Box>*/}
        {/*<DropMenu menus={menu}>*/}
        {/*<DropMenu.Button type="primary" divided={false}>*/}
        {/*Hover*/}
        {/*</DropMenu.Button>*/}
        {/*</DropMenu>*/}
        {/*</Box>*/}
      </div>
    );
  }
}
