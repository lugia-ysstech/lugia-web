/**
 * @flow
 *
 * created by szfeng
 */

import React, { Component } from 'react';
import Index from './index';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 20px;
  background: #eee;
`;

const LineMargin = styled.div`
  width: 100%;
  height: 20px;
  background: #eee;
`;

const PagesButtonContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 20px;
`;

const CommonPage = styled.div`
  width: 300px;
  height: 150px;
  padding: 20px;
  margin: 20px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  box-shadow: 0 0 10px #ccc;
  &:hover {
    box-shadow: 0 0 10px #4d63ff;
  }
`;

const CommonPageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Page1Content = styled(CommonPageContent)`
  background: rgba(46, 27, 94);
  color: #fff;
`;

const Page2Content = styled(CommonPageContent)`
  background: orangered;
  color: #fff;
`;

const Page3Content = styled(CommonPageContent)`
  background: skyblue;
  color: #fff;
`;

const Page4Content = styled(CommonPageContent)`
  background: cadetblue;
  color: #fff;
`;

const Page5Content = styled(CommonPageContent)`
  background: palevioletred;
  color: #fff;
`;

const PageLayoutWrap = styled.div`
  flex: 2;
  height: 100%;
`;

const pageContent = {
  0: <Page1Content>页面一内容</Page1Content>,
  1: <Page2Content>页面二内容</Page2Content>,
  2: <Page3Content>页面二内容</Page3Content>,
  3: <Page4Content>页面四内容</Page4Content>,
  4: <Page5Content>页面五内容</Page5Content>,
};

const contentInfo = {
  com1C1C1: <Page1Content>页面一内容</Page1Content>,
  com1C2C1: <Page2Content>页面二内容</Page2Content>,
  com2C1: <Page3Content>页面三内容</Page3Content>,
  com3: <Page4Content>页面四内容</Page4Content>,
};

const data = [
  {
    id: 'c-spacing-0',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
  {
    id: 'c-spacing-1',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
  {
    id: 'com1',
    type: 'row',
    size: { width: '100%', height: '40%' },
    children: [
      {
        id: 'com1-spacing-1',
        spacing: true,
        type: 'col',
        fatherId: 'com1',
        path: 'com1',
        numWidth: 50,
      },
      {
        id: 'com1C1',
        type: 'col',
        fatherId: 'com1',
        path: 'com1',
        size: {
          width: '30%',
          height: '100%',
        },
        children: [
          {
            id: 'com1C1C1',
            type: 'row',
            fatherId: 'com1C1',
            path: 'com1/com1C1',
            size: {
              width: '100%',
              height: '20%',
            },
          },
          {
            id: 'com1C1C2',
            type: 'row',
            fatherId: 'com1C1',
            path: 'com1/com1C1',
            size: {
              width: '100%',
              height: '20%',
            },
          },
          {
            id: 'com1C1C3',
            type: 'row',
            fatherId: 'com1C1',
            path: 'com1/com1C1',
            size: {
              width: '100%',
              height: '20%',
            },
          },
          {
            id: 'com1C1C4',
            type: 'row',
            fatherId: 'com1C1',
            path: 'com1/com1C1',
            size: {
              width: '100%',
              height: '20%',
            },
          },
          {
            id: 'com1C1C5',
            type: 'row',
            fatherId: 'com1C1',
            path: 'com1/com1C1',
            size: {
              width: '100%',
              height: '20%',
            },
          },
        ],
      },

      {
        id: 'com1C2',
        type: 'col',
        fatherId: 'com1',
        path: 'com1',
        size: {
          width: '70%',
          height: '100%',
        },
        children: [
          {
            id: 'com1C2C1',
            type: 'row',
            fatherId: 'com1C2',
            path: 'com1/com1C2',
            size: {
              width: '100%',
              height: '30%',
            },
          },

          {
            id: 'com1C2C2',
            type: 'row',
            fatherId: 'com1C2',
            path: 'com1/com1C2',
            size: {
              width: '100%',
              height: '70%',
            },
            children: [
              {
                id: 'com1C2C2C1',
                type: 'col',
                fatherId: 'com1C2C2',
                path: 'com1/com1C2/com1C2C2',
                size: {
                  width: '40%',
                  height: '100%',
                },
              },
              {
                id: 'com1C2C2C2',
                type: 'col',
                fatherId: 'com1C2C2',
                path: 'com1/com1C2/com1C2C2',
                size: {
                  width: '60%',
                  height: '100%',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c-spacing-2',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },

  {
    id: 'com2',
    type: 'row',
    size: { width: '100%', height: '40%' },
    children: [
      {
        id: 'com2C1',
        type: 'col',
        fatherId: 'com2',
        path: 'com2',
        size: {
          width: '20%',
          height: '100%',
        },
      },
      {
        id: 'spacing2-1',
        spacing: true,
        type: 'col',
        fatherId: 'com2',
        path: 'com2',
        numWidth: 50,
      },
      {
        id: 'com2C2',
        type: 'col',
        fatherId: 'com2',
        path: 'com2',
        size: {
          width: '40%',
          height: '100%',
        },
      },
      {
        id: 'com2C3',
        type: 'col',
        fatherId: 'com2',
        path: 'com2',
        size: {
          width: '40%',
          height: '100%',
        },
      },
    ],
  },

  {
    id: 'c-spacing-3',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
  {
    id: 'c-spacing-4',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
  {
    id: 'c-spacing-5',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },

  {
    id: 'com3',
    type: 'row',
    size: { width: '100%', height: '10%' },
  },
  {
    id: 'com4',
    type: 'row',
    size: { width: '100%', height: '10%' },
  },
  {
    id: 'c-spacing-6',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
  {
    id: 'c-spacing-7',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
];

const data2 = [
  {
    id: 'zoom1',
    type: 'row',
    size: {
      width: '100%',
      height: '100%',
    },
    children: [
      {
        id: 'zoom1C1',
        type: 'col',
        fatherId: 'zoom1',
        path: 'zoom1',
        size: { width: ' 20%', height: '100%' },
        children: [
          {
            id: 'zoom1C1C1',
            type: 'row',
            fatherId: 'zoom1C1',
            path: 'zoom1/zoom1C1',
            size: { width: '100%', height: '30%' },
          },
          {
            id: 'zoom1C1C2',
            type: 'row',
            fatherId: 'zoom1C1',
            path: 'zoom1/zoom1C1',
            size: { width: '100%', height: '40%' },
          },
          {
            id: 'zoom1C1C3',
            type: 'row',
            fatherId: 'zoom1C1',
            path: 'zoom1/zoom1C1',
            size: { width: '100%', height: '30%' },
          },
        ],
      },
      {
        id: 'zoom1C2',
        type: 'col',
        fatherId: 'zoom1',
        path: 'zoom1',
        size: { width: '40%', height: '100%' },
        children: [
          {
            id: 'zoom1C2C1',
            type: 'row',
            fatherId: 'zoom1C2',
            path: 'zoom1/zoom1C2',
            size: { width: '100%', height: '50%' },
          },
          {
            id: 'zoom1C2C2',
            type: 'row',
            fatherId: 'zoom1C2',
            path: 'zoom1/zoom1C2',
            size: { width: '100%', height: '30%' },
          },
          {
            id: 'zoom1C2C3',
            type: 'row',
            fatherId: 'zoom1C2',
            path: 'zoom1/zoom1C2',
            size: { width: '100%', height: '20%' },
          },
        ],
      },
      {
        id: 'zoom1C3',
        type: 'col',
        fatherId: 'zoom1',
        path: 'zoom1',
        size: { width: '40%', height: '100%' },
        children: [
          {
            id: 'zoom1C3C1',
            type: 'row',
            fatherId: 'zoom1C3',
            path: 'zoom1/zoom1C3',
            size: { width: '100%', height: '40%' },
            children: [
              {
                id: 'zoom1C3C1C1',
                type: 'col',
                fatherId: 'zoom1C3C1',
                path: 'zoom1/zoom1C3/zoom1C3C1',
                size: { width: '30%', height: '100%' },
              },
              {
                id: 'zoom1C3C1C2',
                type: 'col',
                fatherId: 'zoom1C3C1',
                path: 'zoom1/zoom1C3/zoom1C3C1',
                size: { width: '70%', height: '100%' },
              },
            ],
          },
          {
            id: 'zoom1C3C2',
            type: 'row',
            fatherId: 'zoom1C3',
            path: 'zoom1/zoom1C3',
            size: { width: '100%', height: '30%' },
          },
          {
            id: 'zoom1C3C3',
            type: 'row',
            fatherId: 'zoom1C3',
            path: 'zoom1/zoom1C3',
            size: { width: '100%', height: '30%' },
            children: [
              {
                id: 'zoom1C3C3C1',
                type: 'col',
                fatherId: 'zoom1C3C3',
                path: 'zoom1/zoom1C3/zoom1C3C3',
                size: { width: '60%', height: '100%' },
              },
              {
                id: 'zoom1C3C3C2',
                type: 'col',
                fatherId: 'zoom1C3C3',
                path: 'zoom1/zoom1C3/zoom1C3C3',
                size: { width: '40%', height: '100%' },
              },
            ],
          },
        ],
      },
    ],
  },
];

const data3 = [
  {
    id: 'c-spacing-0',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
  {
    id: 'c-spacing-1',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
  {
    id: 'c-com1',
    type: 'row',
    size: { width: '100%', height: '40%' },
  },
  {
    id: 'c-spacing-2',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
  {
    id: 'c-com2',
    type: 'row',
    size: { width: '100%', height: '40%' },
  },
  {
    id: 'c-spacing-3',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
  {
    id: 'c-spacing-4',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
  {
    id: 'c-spacing-5',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
  {
    id: 'c-com3',
    type: 'row',
    size: { width: '100%', height: '10%' },
  },
  {
    id: 'c-com4',
    type: 'row',
    size: { width: '100%', height: '10%' },
  },
  {
    id: 'c-spacing-6',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
  {
    id: 'c-spacing-7',
    spacing: true,
    type: 'row',
    numHeight: 50,
  },
];

const data4 = [
  {
    id: 'data4-com1',
    type: 'row',
    size: { width: '100%', height: '40%' },
    children: [
      {
        id: 'com2C1',
        type: 'col',
        fatherId: 'data4-com1',
        path: 'data4-com1',
        size: {
          width: '20%',
          height: '100%',
        },
      },
      {
        id: 'spacing2-3',
        spacing: true,
        type: 'col',
        fatherId: 'data4-com1',
        path: 'data4-com1',
        numWidth: 50,
      },
      {
        id: 'com2C2',
        type: 'col',
        fatherId: 'data4-com1',
        path: 'data4-com1',
        size: {
          width: '40%',
          height: '100%',
        },
      },
      {
        id: 'com2C3',
        type: 'col',
        fatherId: 'data4-com1',
        path: 'data4-com1',
        size: {
          width: '40%',
          height: '100%',
        },
      },
    ],
  },
];

const data5 = [
  {
    id: 'com1',
    type: 'row',
    size: { width: '100%', height: '40%' },
    children: [
      {
        id: 'com1-spacing-1',
        spacing: true,
        type: 'col',
        fatherId: 'com1',
        path: 'com1',
        numWidth: 50,
      },
      {
        id: 'com1C1',
        type: 'col',
        fatherId: 'com1',
        path: 'com1',
        size: {
          width: '50%',
          height: '100%',
        },
      },

      {
        id: 'com1C2',
        type: 'col',
        fatherId: 'com1',
        path: 'com1',
        size: {
          width: '50%',
          height: '100%',
        },
      },
    ],
  },
];

class Demo extends Component {
  onChange = data => {
    console.log('onChange', data);
  };

  onPageMouseDown = index => () => {
    console.log('onPageMouseDown', index);
  };

  getImagePages = () => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <CommonPage onMouseDown={this.onPageMouseDown(i)} onMouseUp={this.onMouseUp}>
          页面{i}
        </CommonPage>
      );
    }
    return arr;
  };

  render() {
    return (
      <Wrap>
        <PagesButtonContainer>{this.getImagePages()}</PagesButtonContainer>
        <PageLayoutWrap>
          {/*<Index data={data3} />*/}
          {/*<Index data={data4} contentInfo={{ com2C2: <Page1Content>页面一内容</Page1Content> }} />*/}
          {/*<Index data={data2} onChange={this.onChange} />*/}
          {/*<Index data={data5} />*/}
          <Index
            data={data}
            onChange={this.onChange}
            contentInfo={contentInfo}
            // hiddenInfo={{ com1C1C1: true }}
            hiddenInfo={{}}
            titleInfo={{ com1C1C1: '导航菜单页面' }}
          />
          <LineMargin />
        </PageLayoutWrap>
      </Wrap>
    );
  }
}

export default Demo;
