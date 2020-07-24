/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Navmenu from './';
import Widget from '../consts/index';
import styled from 'styled-components';
import Icon from '../icon';
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
    value: 'Lugia Design of React',
    text: 'Lugia Design of React',
    icon: 'lugia-icon-financial_add_pic',
    des: '2234234',
    disabled: true,
  },
  {
    value: 'Lugia-mobile',
    text: 'Lugia-mobile',
    icon: 'lugia-icon-financial_add_pic',
    des: '2234234',
  },
  {
    value: 'Components',
    text: 'Components',
    icon: 'lugia-icon-financial_add_pic',
    des: '2234234',
    children: [
      {
        value: 'General',
        text: 'General',
        des: '2234234',
      },

      {
        value: 'Layout',
        text: 'Layout',
        des: '2234234',
        disabled: true,
      },

      {
        value: 'Navigation',
        text: 'Navigation',
        icon: 'lugia-icon-financial_add_pic',
        des: '2234234',
        children: [
          { value: 'Affix', text: 'Affix', des: '2234234' },
          { value: 'tag', text: 'tag', des: '2234234' },
        ],
      },
    ],
  },
];

const horizontalData = [
  {
    value: 'Lugia Design of React',
    text: 'Lugia Design of React',
    icon: 'lugia-icon-financial_add_pic',
  },
  {
    value: 'Lugia-web',
    text: 'Lugia-web',
    icon: 'lugia-icon-financial_columns',
  },
  { value: 'Lugia-mobile', text: 'Lugia-mobile' },
  {
    value: 'Components',
    text: 'Components',
    icon: 'lugia-icon-financial_add_pic',
    children: [
      {
        value: 'General',
        text: 'General',
        disabled: true,
        children: [
          {
            value: 'Button',
            text: 'Button',
            icon: 'lugia-icon-financial_add_pic',
          },
          {
            value: 'Icon',
            text: 'Icon',
            icon: 'lugia-icon-financial_archive',
          },
        ],
      },
      {
        value: 'Layout',
        text: 'Layout',
        icon: 'lugia-icon-financial_add_pic',
        disabled: true,
        children: [{ value: 'Grid', text: 'Grid' }],
      },

      {
        value: 'Navigation',
        text: 'Navigation',
        describe: true,
        children: [{ value: 'Affix', text: 'Affix' }, { value: 'tag', text: 'tag' }],
      },

      {
        value: 'Data Entry',
        text: 'Data Entry',
        children: [{ value: 'rate', text: 'rate' }, { value: 'Cascader', text: 'Cascader' }],
      },
    ],
  },
];

const menuTheme = {
  [Widget.NavMenu]: {
    Tree: {
      TreeItem: {
        TreeItemWrap: {
          normal: {
            background: { color: '#fff' },
          },
        },
        SelectedTreeItemWrap: {
          normal: {
            background: { color: 'pink' },
          },
        },

        SelectedText: {
          normal: {
            background: { color: 'none' },
          },
        },
      },
    },
  },
};

const menuTheme1 = {
  [Widget.NavMenu]: {
    Tabs: {
      Container: {
        normal: {
          width: 900,
          height: 90,
          boxShadow: {
            color: '#cc1e1e',
            x: 2,
            y: 2,
            blur: 3,
            spread: 3,
            type: 'outset',
          },
          border: {
            top: {
              width: 3,
              color: '#3c19eb',
              style: 'solid',
            },
            right: {
              width: 3,
              color: '#3c19eb',
              style: 'solid',
            },
            bottom: {
              width: 3,
              color: '#3c19eb',
              style: 'solid',
            },
            left: {
              width: 3,
              color: '#3c19eb',
              style: 'solid',
            },
            all: {
              width: 3,
              style: 'solid',
              color: '#3c19eb',
            },
          },
        },
      },
    },
  },
};

const verticalMenuTheme = {
  [Widget.NavMenu]: {
    Menu: {
      MenuItem: {
        SwitchIcon: {
          normal: {
            font: {
              weight: '',
              style: '',
              size: '',
            },
            color: '#df0d0d',
            lineHeight: '',
          },
        },
      },
    },
  },
};

const primaryMenuTheme = {
  lugia_widget_NavMenu: {
    Tree: {
      TreeItem: {
        SubTreeWrap: {
          normal: {
            background: {
              color: 'blue',
            },
          },
        },
      },
      Container: {
        normal: {
          background: {
            color: '#e61111',
          },
        },
      },
    },
  },
};

export default class LimitDemo extends React.Component<Object, Object> {
  all: boolean;
  constructor(props) {
    super(props);
    this.state = {
      value: ['Affix 固钉'],
      activityValue: '项目实战',
      height: 500,
      primaryMenuTheme: {
        lugia_widget_NavMenu: {
          Tree: {
            TreeItem: {
              SubTreeWrap: {
                normal: {
                  background: {
                    color: 'red',
                  },
                },
              },
            },
          },
        },
      },
    };
  }

  tabsOnChange = (target: Object) => {
    const { newValue } = target;
    this.setState({ activityValue: newValue });
  };

  render() {
    return [
      <H1>垂直菜单 </H1>,
      <RowWrap>
        <RowWrapItem>
          <H1> themeStyle：light 垂直菜单 </H1>
          <Navmenu
            data={data}
            theme={verticalMenuTheme}
            mode={'vertical'}
            isShowAuxiliaryText
            switchIconClass={{ iconClass: 'lugia-icon-direction_down_circle_new' }}
          />
          ,
        </RowWrapItem>
        <RowWrapItem>
          <H1> themeStyle：dark 垂直菜单 </H1>
          <Navmenu data={data} mode={'vertical'} themeStyle={'dark'} />
        </RowWrapItem>
      </RowWrap>,
      <H1>水平菜单 </H1>,
      <RowWrap>
        <RowWrapItem>
          <H1> themeStyle：light </H1>
          <Navmenu
            theme={menuTheme1}
            data={horizontalData}
            mode={'horizontal'}
            switchIconClass={{ iconClass: 'lugia-icon-direction_down_circle_new' }}
          />
          ,
        </RowWrapItem>
        <RowWrapItem>
          <H1> themeStyle：dark </H1>
          <Navmenu data={horizontalData} mode={'horizontal'} themeStyle={'dark'} />
        </RowWrapItem>
      </RowWrap>,
      <H1>侧栏导航 Primary 风格 </H1>,
      <RowWrap>
        <RowWrapItem>
          <H1> themeStyle：light </H1>
          <button
            onClick={() => {
              this.setState({ primaryMenuTheme: { ...primaryMenuTheme } });
            }}
          >
            xxx
          </button>
          <Navmenu
            indentDistance={26}
            data={data}
            parentIsHighlight={false}
            theme={this.state.primaryMenuTheme}
            selectLinePosition="left"
          />
          ,
        </RowWrapItem>
        <RowWrapItem>
          <H1> themeStyle：dark </H1>
          <Navmenu
            data={data}
            parentIsHighlight={false}
            themeStyle={'dark'}
            theme={primaryMenuTheme}
            selectLinePosition="right"
          />
        </RowWrapItem>
      </RowWrap>,
      <H1>侧栏导航 Ellipse 风格 </H1>,
      <RowWrap>
        <RowWrapItem>
          <H1> themeStyle：light </H1>
          <Navmenu parentIsHighlight={false} theme={menuTheme} data={data} inlineType={'ellipse'} />
          ,
        </RowWrapItem>
        <RowWrapItem>
          <H1> themeStyle：dark </H1>
          <Navmenu data={data} themeStyle={'dark'} inlineType={'ellipse'} />
        </RowWrapItem>
      </RowWrap>,
    ];
  }
}
