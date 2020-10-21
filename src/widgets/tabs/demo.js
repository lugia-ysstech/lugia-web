/**
 *
 * create by liangguodong
 *
 * @flow
 */
import * as React from 'react';
import Tabs from './';
import Tabpane from './tabpane';
import Widget from '../consts/index';
import Icon from '../icon';
import Button from '../button';
import Theme from '../theme/';

import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
import { css, StaticComponent } from '@lugia/theme-css-hoc';

const Description = StaticComponent({
  tag: 'div',
  className: 'Description',
  css: css`
    margin: 20px 0;
    font-weight: bold;
  `,
});

const FlexContainer = StaticComponent({
  tag: 'div',
  className: 'FlexContainer',
  css: css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  `,
});

const BlockContainer = StaticComponent({
  tag: 'div',
  className: 'BlockContainer',
  css: css`
    width: 50%;
    padding: 10px;
    border-right: 2px solid #ccc;
  `,
});

const CustomHome = StaticComponent({
  tag: 'div',
  className: 'CustomHome',
  css: css`
    width: 40px;
  `,
});

const CustomTitle = StaticComponent({
  tag: 'div',
  className: 'CustomTitle',
  css: css`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 120px;
  `,
});

const CustomContent = StaticComponent({
  tag: 'div',
  className: 'CustomContent',
  css: css`
    padding: 20px;
  `,
});
const TestContainer = StaticComponent({
  tag: 'div',
  className: 'TestContainer',
  css: css`
    width: 100px;
    height: 60px;
  `,
});
export const defaultData = [
  {
    title: 'Tab1',
    value: 'Tab1',
    content: 'content of Tab1',
  },
  {
    title: 'Tab2',
    value: 'Tab2',
    content: 'content of Tab2',
  },
  {
    title: 'Tab3',
    value: 'Tab3',
    content: 'content of Tab3',
  },
];
export const iconClassData = [
  {
    title: 'Tab1',
    value: 'Tab1',
    suffixIcon: 'lugia-icon-financial_archive',
    icon: 'lugia-icon-financial_archive',
    content: 'content of Tab1',
  },
  {
    title: 'Tab2',
    value: 'Tab2',
    icon: 'lugia-icon-financial_archive',
    content: 'content of Tab2',
    disabled: true,
  },
  {
    title: 'Tab3',
    value: 'Tab3',
    suffixIcon: 'lugia-icon-financial_archive',
    content: 'content of Tab3',
  },
];
export const disabledData = [
  {
    title: 'Tab1',
    content: 'content of Tab1',
  },
  {
    title: 'Tab2',
    content: 'content of Tab2',
    disabled: true,
  },
  {
    title: 'Tab3',
    content: 'content of Tab3',
  },
];
export const testThemeData = [
  {
    title: 'Tab1',
    content: 'content of Tab1',
  },
  {
    title: 'Tab2',
    content: 'content of Tab2',
    suffixIcon: 'lugia-icon-financial_archive',
    icon: 'lugia-icon-financial_archive',
  },
  {
    title: 'Tab3',
    content: 'content of Tab3',
    suffixIcon: 'lugia-icon-financial_archive',
    icon: 'lugia-icon-financial_archive',
    disabled: true,
  },
  {
    title: <Icon iconClass={'lugia-icon-financial_archive'} />,
    content: 'content of Tab4',
  },
  {
    title: 'Tab5',
    content: 'content of Tab5',
  },
  {
    title: 'Tab6',
    content: 'content of Tab6',
  },
  {
    title: 'Tab7',
    content: 'content of Tab7',
  },
];
export const iconElementData = [
  {
    title: 'Tab1',
    content: 'content of Tab1',
    suffixIcon: <Icon iconClass={'lugia-icon-financial_archive'} />,
  },
  {
    title: 'Tab2',
    content: 'content of Tab2',
  },
  {
    title: 'Tab3',
    content: 'content of Tab3',
  },
];

export const pageTypeData = [
  {
    title: 'Tab1',
    content: <div>1111111111</div>,
    value: '0',
  },
  {
    title: 'Tab2',
    content: (
      <div>
        <div>222222</div>
      </div>
    ),
    value: '1',
  },
  {
    value: '2',
    title: 'Tab3',
    content: (
      <div>
        <div>
          <div>33333</div>
        </div>
      </div>
    ),
  },
  {
    value: '3',
    title: 'Tab4',
    disabled: true,
    content: (
      <div>
        <div>
          <div>44444</div>
          <div>44444</div>
        </div>
      </div>
    ),
  },
  {
    value: '4',
    title: 'Tab5',
    content: 55555,
  },
  {
    value: '5',
    title: 'Tab6',
    content: 66666,
  },
  {
    value: '6',
    title: 'Tab7',
    content: 77777,
  },
  {
    value: '7',
    title: 'Tab8',
    content: 888888,
  },
  {
    value: '8',
    title: 'Tab9',
    content: 999999,
  },
  {
    value: '9',
    title: 'Tab10',
    content: 101010100101010100101,
  },
  {
    value: '10',
    title: 'Tab11',
    content: 11111111111111111111111111,
  },
  {
    value: '11',
    title: 'Tab12',
    content: 1212121212121212121212112212121,
  },
  {
    value: '12',
    title: 'Tab13',
    content: 13131313313131331313131313313331,
  },
  {
    value: '13',
    title: 'Tab14',
    content: 141414141444141414141414141,
  },
];
export const hasActivityValueData = [
  {
    title: 'Tab1',
    content: <div>1111111111</div>,
    value: '0',
  },
  {
    title: 'Tab2',
    content: (
      <div>
        <div>222222</div>
      </div>
    ),
    value: '1',
  },
  {
    value: '2',
    title: 'Tab3',
    content: (
      <div>
        <div>
          <div>33333</div>
        </div>
      </div>
    ),
  },
  {
    value: '3',
    title: 'Tab4',
    disabled: true,
    content: (
      <div>
        <div>
          <div>44444</div>
          <div>44444</div>
        </div>
      </div>
    ),
  },
  {
    value: '4',
    title: 'Tab5',
    content: 55555,
  },
  {
    value: '5',
    title: 'Tab6',
    content: 66666,
  },
  {
    value: '6',
    title: 'Tab7',
    content: 77777,
  },
  {
    value: '7',
    title: 'Tab8',
    content: 888888,
  },
];
export const children = [
  <Tabpane title={'1111'} content={'11111'} value={'0'} />,
  <Tabpane title={'2222'} content={<div>2222</div>} value={'1'} />,
  <Tabpane
    title={'3333'}
    content={
      <div>
        <div>
          <div>3333</div>
        </div>
      </div>
    }
    value={'2'}
  />,
  <Tabpane
    title={'4444'}
    content={
      <div>
        <div>
          <div>44444</div>
        </div>
      </div>
    }
    value={'3'}
  />,
  <Tabpane
    title={'555555'}
    content={
      <div>
        <div>
          <div>55555</div>
        </div>
      </div>
    }
    value={'4'}
  />,
  <Tabpane
    title={'666666'}
    content={
      <div>
        <div>
          <div>66666</div>
        </div>
      </div>
    }
    value={'5'}
  />,
];
export const longChildren = [
  <Tabpane title={'11111'} content={'这里是菜单啊~排骨，猪蹄，茴香小油条，豆腐，白菜，大萝卜'} />,
  <Tabpane title={'2222'} content={<div>22222222222222</div>} />,
  <Tabpane
    title={'3333'}
    content={
      <div>
        <div>
          <div>33333333</div>
        </div>
      </div>
    }
  />,
  <Tabpane
    title={'4444'}
    content={
      <div>
        <div>
          <div>44444</div>
        </div>
      </div>
    }
  />,
  <Tabpane
    title={'555555'}
    content={
      <div>
        <div>
          <div>55555</div>
        </div>
      </div>
    }
  />,
  <Tabpane
    title={'666666'}
    content={
      <div>
        <div>
          <div>66666</div>
        </div>
      </div>
    }
  />,
];
export const shortChildren = [
  <Tabpane
    title={'11111'}
    content={'这里是菜单啊~排骨，猪蹄，茴香小油条，豆腐，白菜，大萝卜'}
    icon={'lugia-icon-financial_archive'}
  />,
  <Tabpane title={'2222'} content={<div>22222222222222</div>} value={'1'} />,
  <Tabpane
    title={'3333'}
    content={
      <div>
        <div>
          <div>33333333</div>
        </div>
      </div>
    }
    value={'2'}
  />,
];
export const defaulttestDelayData = [
  {
    title: '猪蹄',
    content: (
      <div>
        {' '}
        <div>猪蹄啊啊啊啊</div> <div>猪蹄啊啊啊啊</div> <div>猪蹄啊啊啊啊</div>{' '}
        <div>猪蹄啊啊啊啊</div>{' '}
      </div>
    ),
    hideCloseBtn: true,
    icon: 'lugia-icon-financial_heart',
    suffixIcon: 'lugia-icon-financial_like',
  },
  { title: '排骨', content: '排骨啊啊啊啊' },
  { title: '鸡腿', content: '鸡腿啊啊啊啊' },
];
export const customData = [
  {
    content: 'content',
    icon: 'icon',
    key: '1',
    suffixIcon: 'suffixIcon',
    title: '待办事项',
  },
  {
    content: 'content',
    icon: 'icon',
    key: '2',
    suffixIcon: 'suffixIcon',
    title: '消息通知',
  },
  {
    content: 'content',
    icon: 'icon',
    key: '3',
    suffixIcon: 'suffixIcon',
    title: '我的收藏',
  },
  {
    content: 'content',
    icon: 'icon',
    key: '4',
    suffixIcon: 'suffixIcon',
    title: '资源下载',
  },
  {
    content: 'content',
    icon: 'icon',
    key: '5',
    suffixIcon: 'suffixIcon',
    title: '我的收藏',
  },
  {
    content: 'content',
    icon: 'icon',
    key: '6',
    suffixIcon: 'suffixIcon',
    title: '资源下载',
  },
];
export const fixBugTestData = [
  {
    title: '猪蹄',
    value: '猪蹄',
    content: (
      <div>
        {' '}
        <div>猪蹄啊啊啊啊</div> <div>猪蹄啊啊啊啊</div> <div>猪蹄啊啊啊啊</div>{' '}
        <div>猪蹄啊啊啊啊</div>{' '}
      </div>
    ),
    hideCloseBtn: true,
    icon: 'lugia-icon-financial_heart',
    suffixIcon: 'lugia-icon-financial_like',
  },
  { title: '排骨', value: '排骨', content: '排骨啊啊啊啊' },
  { title: '鸡腿', value: '鸡腿', content: '鸡腿啊啊啊啊' },
  { title: '午餐肉', value: '午餐肉', content: '午餐肉啊啊啊啊' },
  { title: '西红柿炖牛腩', value: '西红柿炖牛腩', content: '西红柿炖牛腩啊啊啊啊' },
  { title: '茄子', value: '茄子', content: '茄子啊啊啊啊' },
  { title: '玉米', value: '玉米', content: '玉米啊啊啊啊' },
  { title: '烤鱼', value: '烤鱼', content: '烤鱼啊啊啊啊' },
  { title: '牛蛙', value: '牛蛙', content: '牛蛙啊啊啊啊' },
  { title: '水煮肉', value: '水煮肉', content: '水煮肉啊啊啊啊' },
  { title: '春饼', value: '春饼', content: '春饼啊啊啊啊' },
];

const addItem = [
  { title: '虾滑', content: '虾滑啊啊啊啊' },
  { title: '萝卜', content: '萝卜啊啊啊啊' },
  { title: '小油条', content: '小油条啊啊啊啊' },
  { title: '肥牛', content: '肥牛啊啊啊啊' },
  { title: '肥羊', content: '肥羊啊啊啊啊' },
  { title: '地瓜', content: '地瓜啊啊啊啊' },
  { title: '香菇', content: '香菇啊啊啊啊' },
];

const defaultHome = [
  {
    title: (
      <CustomHome>
        {' '}
        <Icon iconClass={'lugia-icon-financial_home'} />
      </CustomHome>
    ),
    content: <div>content of Home</div>,
    value: '0',
  },
];

const getRandom = (limit: number) => {
  return Math.floor(Math.random() * limit);
};
const getData = () => {
  const defaultData = [];
  for (let i = 0; i < 6; i++) {
    const valueNumber = getRandom(100);
    const valueNumberAfter = getRandom(20);
    const title = `Tab${valueNumber}${valueNumberAfter}`;
    const item = {
      title: <CustomTitle>{title}</CustomTitle>,
      content: <CustomContent>Content of new {title}</CustomContent>,
      value: title,
    };
    defaultData.push(item);
  }
  return defaultHome.concat(defaultData);
};

const pageTypeTheme = {
  [Widget.Tabs]: {
    Container: {
      normal: {
        width: 560,
        height: 210,
      },
    },
  },
};

const contentTheme = {
  [Widget.Tabs]: {
    ContentBlock: {
      normal: {
        padding: {
          top: 20,
          bottom: 20,
        },
        background: {
          color: 'rgba(246,247,229,0.72)',
        },
      },
    },
  },
};
const containerContentTheme = {
  [Widget.Tabs]: {
    ContentBlock: {
      normal: {
        padding: {
          top: 20,
          bottom: 20,
        },
        height: 200,
        background: {
          color: 'rgb(252,211,248)',
        },
      },
    },
    Container: {
      normal: {
        height: 300,
        background: {
          color: 'rgb(251,246,219)',
        },
      },
    },
  },
};

const titleTheme = {
  [Widget.Tabs]: {
    TitleContainer: {
      normal: {
        background: {
          color: 'rgba(246,247,229,0.72)',
        },
      },
    },
    TabHeader: {
      DefaultTabPan: {
        normal: {
          color: 'orange',
          height: 48,
          width: 232,
          font: {
            family: '',
            size: 14,
            style: 'normal',
            weight: 'normal',
          },
          borderRadius: getBorderRadius(4),
          padding: {
            left: 20,
            right: 20,
          },
          textAlign: 'center',
        },
        disabled: {
          color: 'red',
        },
      },
      SelectTabPan: {
        normal: {
          color: '#9310ec',
          background: {
            color: '#d4ed96',
          },
          padding: {
            left: 40,
            right: 40,
          },
          borderRadius: getBorderRadius(10),
        },
      },
      DividerTheme: {
        normal: {
          background: {
            color: '#9310ec',
          },
        },
      },
      PrefixIcon: {
        normal: {
          color: '#1056ec',
        },
      },
      SelectPrefixIcon: {
        normal: {
          color: '#ec3510',
        },
      },
      SuffixIcon: {
        normal: {
          color: '#ec1064',
        },
      },
      SelectSuffixIcon: {
        normal: {
          color: '#4eec10',
        },
      },
      SelectLine: {
        normal: {
          background: {
            color: '#ecda10',
          },
        },
      },
    },
  },
};

const titleCenterTheme = {
  [Widget.Tabs]: {
    TitleContainer: {
      normal: {
        background: {
          color: '#f0eeb6',
        },
        textAlign: 'center',
      },
    },
  },
};

const titleRightTheme = {
  [Widget.Tabs]: {
    TitleContainer: {
      normal: {
        background: {
          color: '#f0eeb6',
        },
        textAlign: 'right',
      },
    },
  },
};

const tabsTheme = {
  [Widget.Tabs]: {
    Container: {
      normal: {
        width: 300,
        padding: {
          left: 40,
        },
        background: {
          color: '#e86da0',
        },
      },
    },
    BorderStyle: {
      normal: {
        background: {
          color: '#cd90ea',
        },
        width: 4,
      },
    },
    AddButton: {
      normal: {
        color: '#99ec85',
        font: {
          size: 20,
        },
      },
    },
    ArrowIcon: {
      normal: {
        color: '#99ec85',
        font: {
          size: 20,
        },
      },
    },
    TabHeader: {
      DeleteIcon: {
        normal: {
          color: '#99ec85',
          font: {
            size: 20,
          },
        },
      },
      SelectLine: {
        normal: {
          background: {
            color: '#ecda10',
          },
          height: 4,
        },
      },
    },
    ContentBlock: {
      normal: {
        boxShadow: { x: 0, y: 0, color: '#ffb69e', type: 'outset', blur: 2, spread: 3 },
        border: getBorder({ color: 'blue', width: 1, style: 'solid' }),
        borderRadius: getBorderRadius(20),
        textAlign: 'center',
      },
    },
  },
};

const customTheme = {
  [Widget.Tabs]: {
    TabHeader: {
      DefaultTabPan: {
        normal: {
          padding: {
            left: 0,
            right: 0,
          },
        },
      },
    },
  },
};

const customLeftTheme = {
  [Widget.Tabs]: {
    Container: {
      normal: {
        width: '100%',
        height: 280,
      },
    },

    TitleContainer: {
      normal: {
        width: '20%',
      },
    },

    TabHeader: {
      DefaultTabPan: {
        normal: {
          height: 70,
        },
      },
      SelectTabPan: {
        normal: {
          background: {
            color: '#4D68FF0A',
          },
        },
      },
    },
    ContentBlock: {
      normal: {
        background: {
          color: '#F8F9FA',
        },
      },
    },
  },
};

const tabpanTheme = {
  [Widget.Tabs]: {
    TabHeader: {
      DefaultTabPan: {
        normal: {
          // width: 120,
          // textAlign: 'left',
          padding: {
            left: 20,
            right: 20,
          },
        },
        disabled: {
          color: 'red',
        },
      },
    },
  },
};
const testHeader = {
  [Widget.Tabs]: {
    Container: {
      normal: {
        width: 151,
        height: 60,
      },
    },
  },
};

const typeList = ['line', 'card', 'window'];

type TabpaneProps = {};

type TabpaneState = {
  data: Array<Object>,
  dataWindow: Array<Object>,
  activityValue: string,
  abc: Array<Object>,
};

export default class TabsDemo extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: TabpaneProps, state: TabpaneState) {
    let data = pageTypeData;
    let dataWindow = pageTypeData;
    let activityValue = '';
    let nullActiveData = getData();
    let abc = [
      {
        title: (
          <div
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              width: '40px',
              whitespace: 'nowrap',
              textAlign: 'center',
            }}
          >
            home
          </div>
        ),
        value: '0',
        content: '111',
      },
      {
        title: (
          <div
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              width: '120px',
              whitespace: 'nowrap',
              textAlign: 'center',
            }}
          >
            tabs1
          </div>
        ),
        value: '1',
        content: '111',
      },
    ];
    if (state) {
      data = state.data;
      dataWindow = state.dataWindow;
      activityValue = state.activityValue;
      abc = state.abc;
      nullActiveData = state.nullActiveData;
    }
    return {
      testDelayData: defaulttestDelayData,
      data,
      dataWindow,
      activityValue,
      abc,
      nullActiveData,
    };
  }

  componentDidMount() {}

  onAddClick = targetData => () => {
    const data = this.state[targetData];
    const newData = [...data];
    const activeIndex = `Tab${data.length + 1}`;
    const item = this.getAddItem();
    newData.push(item);
    this.setState({ [targetData]: newData, activityValue: activeIndex });
  };

  onChange = (res: Object) => {
    console.log('res onChange', res);
    const { activityValue } = this.state;
    const { activityValue: newActivityValue } = res;
    if (newActivityValue === activityValue) {
      return;
    }
    this.setState({ activityValue: newActivityValue });
  };
  onDelete = (res: Object) => {
    console.log('res', res);
    const { dataWindow } = this.state;
    const { index } = res;
    const newDate = [...dataWindow];
    newDate.splice(index, 1);
    this.setState({ dataWindow: newDate });
  };
  onTabClick = (res: Object) => {
    console.log('onTabClick', res);
  };

  getAddItem = () => {
    const index = Math.floor(Math.random() * 5);
    return addItem[index];
  };
  onDeleteClick = (activityKey: string) => {
    console.log('activityKey', activityKey);
  };
  addTabPan = () => {
    const { abc } = this.state;
    const { title, content } = this.getAddItem();
    const value = `${abc.length}`;

    const newItem = {
      title: (
        <div
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: '120px',
            whitespace: 'nowrap',
            textAlign: 'center',
          }}
        >
          {title}
        </div>
      ),

      content,
      value,
    };
    abc.push(newItem);
    this.setState({ abc, abcActivityValue: value });
  };

  changeActiveValue = (value: string) => () => {
    this.setState({ activeValue: value });
  };

  changeData = () => {
    const { bugData = [] } = this.state;
    const newData = fixBugTestData[bugData.length];
    this.setState({ bugData: bugData.concat(newData), activeValue: newData.title });
  };

  render() {
    const {
      data: addItemPageTypeData,
      testDelayData,
      dataWindow,
      abc,
      abcActivityValue,
      activityValue,
      nullActiveData,
      activeValue = '猪蹄',
      bugData = [],
    } = this.state;

    return (
      <div>
        <FlexContainer>
          <BlockContainer>
            <Description>动态切换页签时跟随滚动</Description>

            <div style={{ margin: 20 }}>
              {fixBugTestData &&
                fixBugTestData.map(item => {
                  return <Button onClick={this.changeActiveValue(item.title)}>{item.title}</Button>;
                })}
            </div>
            <div style={{ width: 460 }}>
              <Tabs
                activeValue={activeValue}
                data={fixBugTestData}
                showDeleteBtn={true}
                hideContent={true}
                isShowArrowIcon={true}
                showDividerLine={true}
                pagedType={'single'}
              />
            </div>

            <div style={{ width: 460 }}>
              <Tabs
                activeValue={activeValue}
                data={fixBugTestData}
                showDeleteBtn={true}
                hideContent={true}
                isShowArrowIcon={true}
                showDividerLine={true}
                pagedType={'page'}
              />
            </div>
          </BlockContainer>

          <BlockContainer>
            <Description>动态添加页签时翻页箭头不正确出现demo</Description>
            <div style={{ margin: 20 }}>
              <Button onClick={this.changeData}>添加data</Button>
            </div>
            <FlexContainer>
              <div style={{ border: '1px solid red' }}>123</div>

              <div style={{ border: '1px solid blue' }}>
                <Tabs
                  activeValue={activeValue}
                  data={bugData}
                  showDeleteBtn={true}
                  hideContent={true}
                  isShowArrowIcon={true}
                  showDividerLine={true}
                  pagedType={'single'}
                />
              </div>
              <div style={{ border: '1px solid blue', width: '100%' }}>
                <Tabs
                  activeValue={activeValue}
                  data={bugData}
                  showDeleteBtn={true}
                  hideContent={true}
                  isShowArrowIcon={true}
                  showDividerLine={true}
                  pagedType={'single'}
                />
              </div>
            </FlexContainer>
          </BlockContainer>

          <BlockContainer>
            <Description>默认无属性Tabs</Description>
            <Tabs />
            <Description>默认无属性Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>默认无数据Tabs</Description>
            {typeList.map(item => {
              return <Tabs tabType={item} />;
            })}
            <Description>默认无数据Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>默认Tabs</Description>
            {typeList.map(item => {
              return <Tabs data={defaultData} tabType={item} />;
            })}
            <Description>默认Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>有IconClass的Tabs</Description>
            {typeList.map(item => {
              return <Tabs data={iconClassData} tabType={item} />;
            })}
            <Description>有IconClass的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>有iconElementData的Tabs</Description>
            {typeList.map(item => {
              return <Tabs data={iconElementData} tabType={item} />;
            })}
            <Description>有iconElementData的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>有disabled的Tabs</Description>
            {typeList.map(item => {
              return <Tabs data={disabledData} tabType={item} />;
            })}
            <Description>有disabled的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>受限的Tabs activeValue:Tab3</Description>
            {typeList.map(item => {
              return <Tabs data={defaultData} tabType={item} activeValue={'Tab3'} />;
            })}
            <Description>受限的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>受限的Tabs activityValue:Tab3</Description>
            {typeList.map(item => {
              return <Tabs data={defaultData} tabType={item} activityValue={''} />;
            })}
            <Description>受限的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>有分割线的Tabs showDividerLine: true </Description>
            {typeList.map(item => {
              return <Tabs data={dataWindow} tabType={item} showDividerLine />;
            })}

            <Description>有分割线的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>单项翻页的Tabs pagedType: single</Description>
            <Theme config={pageTypeTheme}>
              {typeList.map(item => {
                return <Tabs data={pageTypeData} tabType={item} pagedType={'single'} />;
              })}
            </Theme>
            <Description>单项翻页的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>单项翻页的Tabs pagedType: single tabPosition: left</Description>
            <Theme config={pageTypeTheme}>
              {typeList.map(item => {
                return (
                  <Tabs
                    data={pageTypeData}
                    tabType={item}
                    tabPosition={'left'}
                    pagedType={'single'}
                  />
                );
              })}
            </Theme>
            <Description>单项翻页的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>
              整页翻页的Tabs pagedType: page preIcon: lugia-icon-direction_verticle_left suffixIcon:
              lugia-icon-direction_verticle_right
            </Description>
            <Theme config={pageTypeTheme}>
              {typeList.map(item => {
                return (
                  <Tabs
                    data={pageTypeData}
                    pageArrowIcon={{
                      preIcon: 'lugia-icon-direction_verticle_left',
                      suffixIcon: 'lugia-icon-direction_verticle_right',
                    }}
                    tabType={item}
                    pagedType={'page'}
                  />
                );
              })}
            </Theme>
            <Description>整页翻页的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>
              整页翻页的Tabs pagedType: page preIcon: lugia-icon-direction_verticle_left suffixIcon:
              lugia-icon-direction_verticle_right tabPosition: left
            </Description>
            <Theme config={pageTypeTheme}>
              {typeList.map(item => {
                return (
                  <Tabs
                    data={pageTypeData}
                    pageArrowIcon={{
                      preIcon: 'lugia-icon-direction_verticle_left',
                      suffixIcon: 'lugia-icon-direction_verticle_right',
                    }}
                    tabType={item}
                    pagedType={'page'}
                    tabPosition={'left'}
                  />
                );
              })}
            </Theme>
            <Description>整页翻页的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>
              非受限 默认的可增加的Tabs showAddBtn: true onAddClick:this.onAddClick
            </Description>
            {typeList.map(item => {
              return <Tabs defaultData={testDelayData} tabType={item} showAddBtn />;
            })}

            <Description>非受限 默认的可增加的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>
              非受限 指定的可增加的Tabs showAddBtn: true onAddClick:this.onAddClick
            </Description>
            {typeList.map(item => {
              return (
                <Tabs
                  defaultData={testDelayData}
                  tabType={item}
                  showAddBtn
                  getAddItem={this.getAddItem}
                />
              );
            })}

            <Description>非受限 指定的可增加的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>
              受限 指定的可增加的Tabs addIcon：lugia-icon-financial_pin showAddBtn: true
              onAddClick:this.onAddClick
            </Description>
            {typeList.map(item => {
              return (
                <Tabs
                  data={addItemPageTypeData}
                  addIcon={'lugia-icon-reminder_plus_circle_o'}
                  tabType={item}
                  showAddBtn
                  onAddClick={this.onAddClick('data')}
                />
              );
            })}

            <Description>受限 指定的可增加的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>非受限 可删除的Tabs showDeleteBtn: true </Description>
            {typeList.map(item => {
              return <Tabs defaultData={addItemPageTypeData} tabType={item} showDeleteBtn />;
            })}

            <Description>非受限 可删除的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>
              受限 可删除的Tabs deleteIcon:lugia-icon-financial_sad showDeleteBtn: true
              onDelete:this.onDelete{' '}
            </Description>
            {typeList.map(item => {
              return (
                <Tabs
                  data={dataWindow}
                  deleteIcon={'lugia-icon-financial_sad'}
                  tabType={item}
                  showDeleteBtn
                  onDelete={this.onDelete}
                />
              );
            })}

            <Description>受限 可删除的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>隐藏页签的Tabs hideTabBar: true</Description>
            {typeList.map(item => {
              return <Tabs data={defaultData} tabType={item} hideTabBar />;
            })}
            <Description>隐藏页签的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>隐藏内容的Tabs hideContent: true isShowArrowIcon：false</Description>
            {typeList.map(item => {
              return <Tabs data={defaultData} tabType={item} hideContent isShowArrowIcon={false} />;
            })}

            <Description>隐藏内容的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>配置Content主题的Tabs isShowArrowIcon：false</Description>
            <Theme config={contentTheme}>
              {typeList.map(item => {
                return <Tabs data={defaultData} tabType={item} isShowArrowIcon={false} />;
              })}
            </Theme>
            <Description>配置Content主题的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>页签位于底部的Tabs ShowArrowIcon：false</Description>
            {typeList.map(item => {
              return (
                <Tabs
                  data={defaulttestDelayData}
                  tabType={item}
                  isShowArrowIcon={false}
                  tabPosition={'bottom'}
                />
              );
            })}
            <Description>页签位于底部的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>页签位于左侧的Tabs isShowArrowIcon：false</Description>
            {typeList.map(item => {
              return (
                <Tabs
                  data={defaulttestDelayData}
                  tabType={item}
                  isShowArrowIcon={false}
                  tabPosition={'left'}
                />
              );
            })}
            <Description>页签位于左侧的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>页签位于右侧的Tabs isShowArrowIcon：false</Description>
            {typeList.map(item => {
              return (
                <Tabs
                  data={defaulttestDelayData}
                  tabType={item}
                  isShowArrowIcon={false}
                  tabPosition={'right'}
                />
              );
            })}
            <Description>页签位于右侧的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>配置Title主题的Tabs showDividerLine：true</Description>
            <Theme config={titleTheme}>
              {typeList.map(item => {
                return <Tabs data={iconClassData} showDividerLine tabType={item} />;
              })}
            </Theme>
            <Description>配置Title主题的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>配置Title主题的Tabs 页签居中 </Description>
            <Theme config={titleCenterTheme}>
              {typeList.map(item => {
                return <Tabs data={iconClassData} showDividerLine tabType={item} />;
              })}
            </Theme>
            <Description>配置Title主题的Tabs 页签居中------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>配置Title主题的Tabs 页签居右 </Description>
            <Theme config={titleRightTheme}>
              {typeList.map(item => {
                return <Tabs data={iconClassData} showDividerLine tabType={item} />;
              })}
            </Theme>
            <Description>配置Title主题的Tabs 页签居右------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>配置主题的Tabs showAddBtn showDeleteBtn </Description>
            <Theme config={tabsTheme}>
              {typeList.map(item => {
                return <Tabs data={iconClassData} showAddBtn showDeleteBtn tabType={item} />;
              })}
            </Theme>
            <Description>配置主题的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>自定义页签 超出隐藏 </Description>
            {typeList.map(item => {
              return (
                <Tabs tabType={item}>
                  <Tabpane
                    title={
                      <div
                        style={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whitespace: 'nowrap',
                          width: '120px',
                        }}
                      >
                        这里是很长很长超过了宽度要隐藏的文本吧
                      </div>
                    }
                    content={'11111'}
                    value={'0'}
                    suffixIcon={'lugia-icon-direction_backward'}
                  />
                  <Tabpane title={'2222'} content={<div>2222</div>} value={'1'} />
                </Tabs>
              );
            })}
            <Description>自定义页签 超出隐藏------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>自定义主题的Tabs </Description>
            <Theme config={customTheme}>
              {typeList.map(item => {
                return <Tabs data={customData} tabType={item} />;
              })}
            </Theme>
            <Description>自定义主题的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>children用法的Tabs </Description>
            {typeList.map(item => {
              return (
                <Tabs tabType={item}>
                  <Tabpane
                    title={'11111'}
                    content={'这里是菜单啊~排骨，猪蹄，茴香小油条，豆腐，白菜，大萝卜'}
                    icon={'lugia-icon-financial_archive'}
                  />
                  <Tabpane title={'2222'} content={<div>22222222222222</div>} value={'1'} />
                  <Tabpane
                    title={'3333'}
                    content={
                      <div>
                        <div>
                          <div>33333333</div>
                        </div>
                      </div>
                    }
                    value={'2'}
                  />
                  ,
                </Tabs>
              );
            })}
            <Description>children用法的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description> activityValue:activityValue showDividerLine showAddBtn </Description>
            <Theme config={tabpanTheme}>
              {typeList.map(item => {
                return (
                  <Tabs
                    data={abc}
                    tabType={item}
                    activityValue={abcActivityValue}
                    showDividerLine
                    showAddBtn={true}
                  />
                );
              })}
            </Theme>
            <Description>------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>自定义首页的Tabs data getData()</Description>
            {typeList.map(item => {
              return <Tabs data={getData()} tabType={item} />;
            })}
            <Description>自定义首页的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>验证Content主题的Tabs data getData()</Description>
            <Theme config={containerContentTheme}>
              {typeList.map(item => {
                return <Tabs data={getData()} tabType={item} />;
              })}
            </Theme>
            <Description>验证Content主题的Tabs------------------------end</Description>
          </BlockContainer>

          <BlockContainer>
            <Description>验证activeValue 为'' 时，没有选中项</Description>
            {typeList.map(item => {
              return (
                <Tabs
                  data={nullActiveData}
                  activeValue={activityValue}
                  onChange={this.onChange}
                  tabType={item}
                />
              );
            })}
            <Description>
              验证activeValue 为'' 时，没有选中项------------------------end
            </Description>
          </BlockContainer>

          <BlockContainer>
            <Description>验证左侧Tabs，头部区域宽度设置 20% </Description>
            <Theme config={customLeftTheme}>
              <Tabs data={nullActiveData} tabPosition={'left'} />
            </Theme>

            <Description>验证左侧Tabs，头部区域宽度设置 20%------------------------end</Description>
          </BlockContainer>
        </FlexContainer>

        <br />
        <br />
        <p>测试 公共值</p>
        <Tabs data={testThemeData} showDeleteBtn={true} showAddBtn={true} />
        <Tabs tabType={'card'} data={testThemeData} showDeleteBtn={true} showAddBtn={true} />
        <Tabs tabType={'window'} data={testThemeData} showDeleteBtn={true} showAddBtn={true} />

        <p>测试 isShowArrowIcon属性</p>
        <br />
        <Theme
          config={{
            [Widget.Tabs]: {
              Container: { normal: { height: 60, width: 540 } },
              ContentBlock: { normal: { background: 'none' } },
              TabHeader: {
                DefaultTabPan: {
                  normal: {
                    color: '#737b89',
                    font: {
                      family: '',
                      size: 14,
                      style: 'normal',
                      weight: 'normal',
                    },
                    height: 58,
                    padding: { bottom: '', left: '', right: '', top: '' },
                    width: 132,
                  },
                },
                SelectTabPan: {
                  normal: {
                    color: '#0052db',
                    font: {
                      family: '',
                      size: 14,
                      style: 'normal',
                      weight: 'normal',
                    },
                  },
                },
              },
              WindowContainer: {
                normal: {
                  background: { color: '#F0F2F5' },
                  padding: { bottom: '2', left: '2', right: '', top: '2' },
                },
              },
            },
          }}
        >
          <Tabs
            viewClass="wbGmRn0"
            data={customData}
            defaultActivityValue=""
            forceRender=""
            pagedType={'single'}
            showAddBtn=""
            showDeleteBtn=""
            tabPosition={'top`'}
            tabType={'window'}
            isShowArrowIcon={false}
          />
        </Theme>
        <p>测试 hideTabBar</p>
        <br />
        <Tabs data={defaultData} activeValue={'Tab3'} hideTabBar={true} />
        <TestContainer>
          <Theme config={testHeader}>
            <Tabs data={defaultData} activeValue={'Tab1'} />
          </Theme>
        </TestContainer>
      </div>
    );
  }
}
