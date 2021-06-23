/**
 * @flow
 *
 * created by szfeng
 */

import React, { Component } from 'react';
import PageLayoutCom from './index';
import styled from 'styled-components';
import Widget from '../consts/index';

const PageLayoutWrap = PageLayoutCom.PageLayoutWrap;

const Wrap = styled.div`
  width: 100%;
  padding: 20px;
`;

const PageLayoutContainer = styled.div`
  height: 1000px;
  width: 100%;
  background: #000;
`;

const Button = styled.div`
  width: 200px;
  height: 50px;
  line-height: 50px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  color: #fff;
  background: #4d63ff;
  text-align: center;
  margin: 10px;
`;

const LineMargin = styled.div`
  width: 100%;
  height: 20px;
  background: #000;
  margin: 20px 0;
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

const pageContent = {
  0: <Page1Content>页面一内容</Page1Content>,
  1: <Page2Content>页面二内容</Page2Content>,
  2: <Page3Content>页面二内容</Page3Content>,
  3: <Page4Content>页面四内容</Page4Content>,
  4: <Page5Content>页面五内容</Page5Content>,
};

const data1 = [
  {
    id: 'c-spacing-0',
    spacing: true,
    type: 'row',
    numberHeight: 20,
  },
  {
    id: 'c-spacing-1',
    spacing: true,
    type: 'row',
    numberHeight: 20,
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
        numberWidth: 20,
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
            id: 'com1C1C1-spacing-1',
            spacing: true,
            type: 'row',
            fatherId: 'com1C1',
            path: 'com1/com1C1',
            numberHeight: 10,
          },
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
            id: 'com1C1C1-spacing-2',
            spacing: true,
            type: 'row',
            fatherId: 'com1C1',
            path: 'com1/com1C1',
            numberHeight: 10,
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
            id: 'com1C1C1-spacing-3',
            spacing: true,
            type: 'row',
            fatherId: 'com1C1',
            path: 'com1/com1C1',
            numberHeight: 10,
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
          {
            id: 'com1C1C1-spacing-4',
            spacing: true,
            type: 'row',
            fatherId: 'com1C1',
            path: 'com1/com1C1',
            numberHeight: 10,
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
            id: 'com1C2C1-spacing-1',
            spacing: true,
            type: 'row',
            fatherId: 'com1C2',
            path: 'com1/com1C2',
            numberHeight: 20,
          },

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
    numberHeight: 20,
  },

  {
    id: 'com2',
    type: 'row',
    size: { width: '100%', height: '20%' },
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
        numberWidth: 20,
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
    id: 'c-spacing-5',
    spacing: true,
    type: 'row',
    numberHeight: 20,
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
    id: 'com5',
    type: 'row',
    size: { width: '100%', height: '10%' },
  },
  {
    id: 'c-spacing-6',
    spacing: true,
    type: 'row',
    numberHeight: 20,
  },
  {
    id: 'com6',
    type: 'row',
    size: { width: '100%', height: '10%' },
  },
  {
    id: 'c-spacing-7',
    spacing: true,
    type: 'row',
    numberHeight: 20,
  },
];

const data2 = [
  {
    id: 'zom1',
    type: 'row',
    size: { width: '100%', height: '40%' },
    children: [
      {
        id: 'zom1C1',
        type: 'col',
        fatherId: 'zom1',
        path: 'zom1',
        size: {
          width: '70%',
          height: '100%',
        },
      },
      {
        id: 'zom1C2',
        type: 'col',
        fatherId: 'zom1',
        path: 'zom1',
        size: {
          width: '30%',
          height: '100%',
        },
      },
    ],
  },
  {
    id: 'zom2',
    type: 'row',
    size: { width: '100%', height: '40%' },
    children: [
      {
        id: 'zom2C1',
        type: 'col',
        fatherId: 'zom2',
        path: 'zom2',
        size: {
          width: '30%',
          height: '100%',
        },
      },
      {
        id: 'zom2C2',
        type: 'col',
        fatherId: 'zom2',
        path: 'zom2',
        size: {
          width: '70%',
          height: '100%',
        },
      },
    ],
  },
  {
    id: 'zom3',
    type: 'row',
    size: { width: '100%', height: '20%' },
    children: [],
  },
];

const config = {
  [Widget.PageLayout]: {
    Container: {
      normal: {
        width: 1200,
        height: '100%',
      },
    },
  },
};

const contentInfo1 = {
  com1C1C1: { component: <Page1Content>页面一内容</Page1Content>, title: '页面1' },
  com1C1C4: { component: <Page2Content>页面com1C1C4内容</Page2Content>, title: '页面com1C1C4' },
  com1C1C5: { component: <Page2Content>页面com1C1C5内容</Page2Content>, title: '页面com1C1C5' },
  com2C1: { component: <Page3Content>页面三内容</Page3Content>, title: '页面3' },
  com2C2: { component: <Page2Content>页面二内容</Page2Content>, title: '页面2' },
  com2C3: { component: <Page4Content>页面四内容</Page4Content>, title: '页面4' },
  com3: { component: <Page4Content>页面五内容</Page4Content>, title: '页面5' },
  com5: { component: <Page1Content>页面com5内容</Page1Content>, title: '页面com5' },
};

const contentInfo2 = {
  zom1C1: { component: <Page3Content>页面三内容</Page3Content>, title: '页面三' },
  zom3: { component: <Page4Content>页面四内容</Page4Content>, title: '页面四' },
  zom2C2: { component: <Page2Content>页面二内容</Page2Content>, title: '页面二' },
};

const hiddenInfo1 = {
  // com1C1C1: true,
  com2C3: true,
  com2C1: true,
  com2C2: true,
};

const hiddenInfo2 = {
  zom2C2: true,
};

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1,
      sizeInfo: {},
      data2,
      contentInfo1,
      contentInfo2,
      hiddenInfo1,
      hiddenInfo2,
    };
  }

  onChange1 = data1 => {
    this.setState({ data1 });
    console.log('onChange', data1);
  };

  onChange2 = data2 => {
    this.setState({ data2 });
  };

  onContentInfoChange1 = contentInfo1 => {
    this.setState({ contentInfo1 });
  };

  onContentInfoChange2 = contentInfo2 => {
    this.setState({ contentInfo2 });
  };

  onHiddenInfoChange1 = target => {
    const { hiddenInfo = {} } = target;
    this.setState({
      hiddenInfo1: hiddenInfo,
    });
    console.log('onHiddenInfoChange 1', target);
  };

  onHiddenInfoChange2 = target => {
    const { hiddenInfo = {} } = target;
    this.setState({
      hiddenInfo2: hiddenInfo,
    });
    console.log('onHiddenInfoChange 2', target);
  };

  onChangeSizeInfo = () => {
    this.setState({
      sizeInfo: {
        com1C1: 0,
      },
    });
  };

  onInitSizeInfo = () => {
    this.setState({
      sizeInfo: {},
    });
  };

  render() {
    const {
      data1 = [],
      data2 = [],
      sizeInfo,
      contentInfo1 = {},
      contentInfo2 = {},
      hiddenInfo1 = {},
      hiddenInfo2 = {},
    } = this.state;

    return (
      <Wrap>
        <Button onClick={this.onChangeSizeInfo}>改变sizeInfo</Button>
        <Button onClick={this.onInitSizeInfo}>重置sizeInfo</Button>

        <PageLayoutWrap>
          <PageLayoutContainer>
            <PageLayoutCom
              theme={config}
              data={data1}
              drag
              enlarge
              sizeInfo={sizeInfo}
              fixedHeight={false}
              title={'模块一'}
              hiddenInfo={hiddenInfo1}
              contentInfo={contentInfo1}
              onChange={this.onChange1}
              // __lugiad__header__absolute__
              onHiddenInfoChange={this.onHiddenInfoChange1}
              onContentInfoChange={this.onContentInfoChange1}
            />
          </PageLayoutContainer>

          {'a '}
          <LineMargin />
          <PageLayoutContainer>
            <PageLayoutCom
              theme={config}
              data={data2}
              title={'模块二'}
              hiddenInfo={hiddenInfo2}
              contentInfo={contentInfo2}
              onChange={this.onChange2}
              onHiddenInfoChange={this.onHiddenInfoChange2}
              onContentInfoChange={this.onContentInfoChange2}
            />
          </PageLayoutContainer>
        </PageLayoutWrap>
      </Wrap>
    );
  }
}

export default Demo;
