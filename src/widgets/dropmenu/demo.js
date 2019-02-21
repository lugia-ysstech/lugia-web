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

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      menu: <Menu data={data} />,
    };
  }

  render() {
    const { menu } = this.state;
    const defaultView = {
      [Widget.DropMenuButton]: { width: 120 },
      [Widget.DropMenu]: { width: 80, height: 180 },
    };

    const cascaderMenu = <Menu data={cascaderData} action={'hover'} />;
    const cascaderView = {
      [Widget.DropMenuButton]: { width: 150 },
      [Widget.DropMenu]: { width: 130, height: 180 },
    };
    return (
      <div>
        <H2>不同样式的dropmenu</H2>
        <Theme config={defaultView}>
          <Box>
            <DropMenu menus={menu} autoHeight={true}>
              <DropMenu.Button type="basic">Click me</DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu}>
              <DropMenu.Button divided={false}>Click me</DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu action={'hover'} menus={menu}>
              <DropMenu.Button>Hover arrow</DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu action={'hover'} menus={menu}>
              <DropMenu.Button type="primary" divided={false}>
                Hover me
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu}>
              <DropMenu.Button type="primary">Click arrow</DropMenu.Button>
            </DropMenu>
          </Box>
        </Theme>

        <H2>从不同方向展开</H2>
        <Theme config={defaultView}>
          <Box>
            <DropMenu menus={menu} align={'bottomLeft'}>
              <DropMenu.Button divided={false}>Click me</DropMenu.Button>
            </DropMenu>
          </Box>
          <Box>
            <DropMenu menus={menu} align={'bottom'}>
              <DropMenu.Button divided={false}>Click me</DropMenu.Button>
            </DropMenu>
          </Box>
          <Box>
            <DropMenu menus={menu} align={'bottomRight'}>
              <DropMenu.Button divided={false}>Click me</DropMenu.Button>
            </DropMenu>
          </Box>
          <div>
            <Box />
          </div>

          <Box>
            <DropMenu menus={menu} align={'topLeft'} action={'hover'}>
              <DropMenu.Button direction={'up'} divided={false}>
                Hover me
              </DropMenu.Button>
            </DropMenu>
          </Box>
          <Box>
            <DropMenu menus={menu} align={'top'} action={'hover'}>
              <DropMenu.Button direction={'up'} divided={false}>
                Hover me
              </DropMenu.Button>
            </DropMenu>
          </Box>
          <Box>
            <DropMenu menus={menu} align={'topRight'} action={'hover'}>
              <DropMenu.Button direction={'up'} divided={false}>
                Hover me
              </DropMenu.Button>
            </DropMenu>
          </Box>
        </Theme>

        <H2>多级菜单</H2>
        <Theme config={cascaderView}>
          <Box>
            <DropMenu menus={cascaderMenu} action={'click'} popupVisible={this.state.popupVisible}>
              <DropMenu.Button type="basic">Basic</DropMenu.Button>
            </DropMenu>
          </Box>
        </Theme>
      </div>
    );
  }
}
