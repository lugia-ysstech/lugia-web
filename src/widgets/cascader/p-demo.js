/**
 *
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Cascader from './index';
import styled from 'styled-components';
import Widget from '../consts/index';

const RowWrap = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: row;
`;

const RowWrapItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;
const H1 = styled.h1`
  text-align: center;
  background: #000;
  color: #fff;
  margin: 0 0 10px;
`;
const data = [
  {
    value: 'Lugia Design',
    text: 'Lugia Design',
    icons: {
      prefixIconClass: 'lugia-icon-financial_heart',
      prefixIconSrc: '',
      suffixIconClass: 'lugia-icon-financial_contacts',
      suffixIconSrc: '',
    },
  },
  {
    value: 'Lugia-mega',
    text: 'Lugia-mega',
  },
  {
    value: 'Lugia-mega1',
    text: 'Lugia-mega1',
  },
  {
    value: 'Lugia-mega2',
    text: 'Lugia-mega2',
  },
  {
    value: 'Lugia-mega3',
    text: 'Lugia-mega3',
  },
  {
    value: 'Lugia-mega4',
    text: 'Lugia-mega4',
  },
  {
    value: 'Lugia-mega5',
    text: 'Lugia-mega4=5',
  },
  {
    value: 'Lugia-mega6',
    text: 'Lugia-mega6',
  },
  {
    value: 'Lugia-mega7',
    text: 'Lugia-mega8',
  },
  {
    value: 'Components',
    text: 'Components',
    icons: {
      prefixIconClass: 'lugia-icon-financial_heart',
      suffixIconClass: 'lugia-icon-financial_contacts',
      suffixIconSrc: '',
    },
    children: [
      {
        value: 'General',
        text: 'General',
        children: [
          {
            value: 'Button',
            text: 'Button',
            icon: 'lugia-icon-financial_add_pic',
          },
          { value: 'Icon', text: 'Icon', icon: 'lugia-icon-financial_archive' },
        ],
      },

      {
        value: 'Layout',
        text: 'Layout',
        children: [{ value: 'Grid', text: 'Grid' }],
      },

      {
        value: 'Navigation',
        text: 'Navigation',
        children: [
          { value: 'Affix', text: 'Affix' },
          { value: 'Breadcrumb', text: 'Breadcrumb' },
          { value: 'Dropdown', text: 'Dropdown' },
          { value: 'Menu', text: 'Menu' },
          { value: 'Pagination', text: 'Pagination' },
          { value: 'Steps', text: 'Steps' },
        ],
      },

      {
        value: 'Data Entry',
        text: 'Data Entry',
        children: [
          { value: 'AutoComplete', text: 'AutoComplete' },
          { value: 'Cascader', text: 'Cascader' },
          { value: 'Checkbox', text: 'Checkbox' },
        ],
      },
    ],
  },
];

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedKeys: 'a6/a6-2/a6-2-1/suba1/suba2',
      data,
    };
  }
  render() {
    const { selectedKeys, data } = this.state;
    const config = {
      [Widget.Cascader]: {
        Container: {
          normal: {
            width: 250,
          },
        },
        Menu: {
          MenuItem: {
            MenuItemWrap: { normal: {} },
            TextContainer: { normal: {} },
            DesContainer: { normal: { height: 40 } },
          },
          SubMenu: {
            MenuItem: {
              MenuItemWrap: {},
              TextContainer: { normal: {} },
              DesContainer: { normal: { height: 40 } },
            },
          },
        },
      },
    };

    return [
      <H1>多级菜单 </H1>,
      <RowWrap>
        <RowWrapItem>
          <H1> size={'small'} 多级菜单 </H1>
          <Cascader
            pullIconClass={'lugia-icon-direction_down-square'}
            switchIconClass={{ iconClass: 'lugia-icon-direction_play_circle' }}
            clearIconClass={'lugia-icon-direction_logout'}
            autoHeight={true}
            size={'small'}
            theme={config}
            data={data}
            action={'hover'}
            separator={'/'}
            onClick={this.onClick}
            onChange={this.onChange}
            disabled={false}
            showAllLevels={false}
            placeholder={'请选择'}
            allowClear={true}
            onClear={this.onClear}
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1> size={'default'} 多级菜单 </H1>
          <Cascader
            value={['Lugia Design']}
            theme={config}
            size={'default'}
            data={data}
            action={'hover'}
            separator={'/'}
            onClick={this.onClick}
            onChange={this.onChange}
            disabled={false}
            showAllLevels={false}
            placeholder={'请选择'}
            allowClear={true}
            onClear={this.onClear}
          />
        </RowWrapItem>
        <RowWrapItem>
          <H1> size={'large'} 多级菜单 </H1>
          <Cascader
            theme={config}
            size={'large'}
            data={data}
            action={'hover'}
            separator={'/'}
            onClick={this.onClick}
            onChange={this.onChange}
            disabled={false}
            showAllLevels={false}
            placeholder={'请选择'}
            allowClear={true}
            onClear={this.onClear}
          />
        </RowWrapItem>
      </RowWrap>,
    ];
  }

  onClick = (e: Object, keys: Object) => {
    // const { selectedKeys } = keys;
    // this.setState({ selectedKeys });
  };
  onChange = (target: Object) => {};

  onClear = () => {
    this.setState({ selectedKeys: [] });
  };
}
