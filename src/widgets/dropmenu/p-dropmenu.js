/**
 *
 * @flow
 */
import * as React from 'react';
import DropMenu from './';
import Menu from '../menu';
import Widget from '../consts/index';
import styled from 'styled-components';

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

const data = [];
const dataIco = [
  'lugia-icon-financial_file_unknown',
  'lugia-icon-financial_archive',
  'lugia-icon-financial_Back_file',
  'lugia-icon-financial_export',
  'lugia-icon-financial_excle',
  'lugia-icon-financial_jpg',
  'lugia-icon-financial_markdown',
  'lugia-icon-financial_save',
  'lugia-icon-financial_QR_code',
  'lugia-icon-financial_release',
];

for (let i = 0; i < 6; i++) {
  const title = '选项' + i;
  const index = Math.floor(Math.random() * 10);
  console.log(index);
  data.push({ value: title, text: title, icon: dataIco[index] });
}
console.log('data', data);
const view = {
  [Widget.DropMenu]: {
    Container: {
      normal: {
        width: 130,
      },
    },
  },
};

const view1 = {
  [Widget.DropMenu]: {
    Container: {
      normal: {
        width: 150,
      },
    },
  },
};

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return [
      <H1> DropMenu divided=false </H1>,
      <RowWrap>
        <RowWrapItem>
          <H1>
            size={'small'} divided={'false'}
          </H1>
          <DropMenu
            theme={view}
            data={data}
            text={'下拉菜单'}
            divided={false}
            size="small"
            disabled
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
          <br />
          <DropMenu
            theme={view}
            text={'下拉菜单'}
            divided={false}
            type="primary"
            size="small"
            disabled
            data={data}
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
          <br />
          <DropMenu
            theme={view}
            text={'下拉菜单'}
            divided={false}
            type="basic"
            size="small"
            data={data}
            disabled
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
        </RowWrapItem>
        <RowWrapItem>
          <H1>
            size={'default'} divided={'false'}
          </H1>
          <DropMenu
            theme={view}
            text={'下拉菜单'}
            divided={false}
            data={data}
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
          <br />
          <DropMenu
            theme={view}
            text={'下拉菜单'}
            divided={false}
            data={data}
            type="primary"
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
          <br />
          <DropMenu
            theme={view}
            text={'下拉菜单'}
            divided={false}
            data={data}
            type="basic"
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
        </RowWrapItem>
        <RowWrapItem>
          <H1>
            size={'large'} divided={'false'}
          </H1>
          <DropMenu
            theme={view}
            text={'下拉菜单'}
            divided={false}
            data={data}
            size="large"
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
          <br />
          <DropMenu
            theme={view}
            text={'下拉菜单'}
            divided={false}
            data={data}
            type="primary"
            size="large"
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
          <br />
          <DropMenu
            theme={view}
            text={'下拉菜单'}
            divided={false}
            data={data}
            type="basic"
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
        </RowWrapItem>
      </RowWrap>,
      <H1> DropMenu divided=true </H1>,
      <RowWrap>
        <RowWrapItem>
          <H1>
            size={'small'} divided={'true'}
          </H1>
          <DropMenu
            theme={view1}
            data={data}
            text={'下拉菜单'}
            divided={true}
            size="small"
            disabled
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
          <br />
          <DropMenu
            theme={view1}
            text={'下拉菜单'}
            divided={true}
            type="primary"
            size="small"
            data={data}
            disabled
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
        </RowWrapItem>
        <RowWrapItem>
          <H1>
            size={'default'} divided={'true'}
          </H1>
          <DropMenu
            text={'下拉菜单'}
            theme={view1}
            divided={true}
            data={data}
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
          <br />
          <DropMenu
            text={'下拉菜单'}
            theme={view1}
            divided={true}
            data={data}
            type="primary"
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
        </RowWrapItem>
        <RowWrapItem>
          <H1>
            size={'large'} divided={'true'}
          </H1>
          <DropMenu
            theme={view1}
            text={'下拉菜单'}
            divided={true}
            data={data}
            size="large"
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
          <br />
          <DropMenu
            theme={view1}
            text={'下拉菜单'}
            divided={true}
            data={data}
            type="primary"
            size="large"
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
            }}
          ></DropMenu>
        </RowWrapItem>
      </RowWrap>,
    ];
  }
}
