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
import { getBorderRadius, getBorder, getBoxShadow } from '@lugia/theme-utils';

const Box = styled.div`
  margin: 30px;
`;

const data = [];

for (let i = 0; i < 10; i++) {
  const title = '选项' + i;
  data.push({ value: title, text: title });
}

const theme = {
  [Widget.DropMenu]: {
    PreIcon: {
      normal: {
        // color: 'red',
        fontSize: 30,
      },
      hover: {
        fontSize: 30,
      },
      active: {
        fontSize: 20,
      },
    },
    SuffixIcon: {
      normal: {
        color: '#FF3E96',
        fontSize: 30,
      },
      hover: {
        color: 'blue',
        fontSize: 20,
      },
      active: {
        color: 'orange',
      },
    },
    Container: {
      normal: {
        width: 400,
        height: 50,
        color: 'orange',
        // font: {
        //   size: 30,
        // },
        // lineHeight: 80,
        // color: 'orange',
        fontSize: 30,
        background: {
          color: '#fff',
        },
        border: getBorder({ color: 'blue', width: 1, style: 'dashed' }),
        borderRadius: getBorderRadius(20),
        boxShadow: getBoxShadow('2 2 20 red'),
      },
      hover: {
        background: {
          // color: 'red',
          color: 'yellow',
        },
      },
      disabled: {
        color: 'red',
        background: {
          color: 'orange',
        },
      },
    },

    Divided: {
      normal: {
        width: 10,
        height: 10,
        color: 'red',
      },
      hover: {
        width: 20,
        color: 'orange',
      },
    },
    TextContainer: {
      normal: {
        // color: 'red',
        font: {
          size: 30,
        },
      },
      hover: {
        color: 'red',
      },
    },
    SwitchIconContainer: {
      normal: {
        background: {
          color: 'orange',
        },
      },
    },
    SwitchIcon: {
      normal: {
        // color: 'red',
        font: {
          size: 30,
        },
      },
      hover: {
        color: 'blue',
        fontSize: 20,
      },
    },
  },
};

const view = {
  [Widget.DropMenu]: {
    Container: {
      normal: {
        width: 300,
        height: 50,
        margin: { left: 20 },
        borderRadius: getBorderRadius(50),
        boxShadow: getBoxShadow('2 2 20 red'),
        opacity: 0.9,
      },
    },
    Divided: {
      normal: {
        width: 10,
        height: 10,
        color: 'red',
      },
      hover: {
        width: 20,
        height: 30,
        color: 'orange',
      },
      active: {
        height: 5,
        color: 'purple',
      },
    },

    PreIcon: {
      normal: {
        fontSize: 30,
      },
      hover: {
        fontSize: 20,
      },
      active: {
        fontSize: 10,
      },
    },
    SuffixIcon: {
      normal: {
        color: '#FF3E96',
        fontSize: 30,
      },
      hover: {
        color: 'blue',
        fontSize: 20,
      },
      active: {
        color: 'orange',
        fontSize: 10,
      },
    },

    TextContainer: {
      normal: {
        width: 500,
        color: 'yellow',
        fontSize: 30,
        background: {
          color: 'purple',
        },
        border: getBorder({ color: 'red', width: 1, style: 'solid' }),
      },
      hover: {
        color: 'purple',
        fontSize: 20,

        background: {
          color: 'yellow',
        },
        border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
      },
      active: {
        color: 'orange',
        fontSize: 10,

        background: {
          color: 'yellow',
        },
        border: getBorder({ color: 'purple', width: 1, style: 'solid' }),
      },
    },

    SwitchIcon: {
      normal: {
        color: 'red',
        font: {
          size: 20,
        },
      },
      hover: {
        color: 'blue',
        fontSize: 20,
      },
    },

    SwitchIconContainer: {
      normal: {
        width: 500,
        color: 'yellow',
        fontSize: 30,
        background: {
          color: 'purple',
        },
        border: getBorder({ color: 'red', width: 1, style: 'solid' }),
      },
      hover: {
        color: 'purple',
        fontSize: 20,

        background: {
          color: 'yellow',
        },
        border: getBorder({ color: 'orange', width: 1, style: 'solid' }),
      },
      active: {
        color: 'orange',
        fontSize: 10,

        background: {
          color: 'yellow',
        },
        border: getBorder({ color: 'purple', width: 1, style: 'solid' }),
      },
    },
  },
};

const imgs =
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576747148829&di=c2df606b85d4b91d73f803d058413703&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F12%2F45%2F9056aa3e4cb4e9c.jpg';
export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      menu: <Menu data={data} />,
    };
  }

  onClick = () => {
    console.log('onClick');
  };

  _onClick = () => {
    console.log('_onClick');
  };
  render() {
    const { menu } = this.state;

    return (
      <div>
        <Box>
          <DropMenu
            text={'下拉菜单'}
            divided={true}
            onClick={this.onClick}
            _onClick={this._onClick}
            theme={view}
            // disabled
            menus={menu}
            icons={{
              prefixIconClass: 'lugia-icon-direction_backward',
              suffixIconClass: 'lugia-icon-direction_play_circle',
              prefixIconSrc: imgs,
            }}
          ></DropMenu>
        </Box>

        <Box>
          <DropMenu
            text={'下拉菜单'}
            divided={true}
            // disabled
          ></DropMenu>
        </Box>

        <Box>
          <DropMenu text={'下拉菜单'} divided={true} theme={view} disabled></DropMenu>
        </Box>

        <Box>
          <DropMenu text={'下拉菜单'} divided={true} type={'primary'}></DropMenu>
        </Box>

        <Box>
          <DropMenu text={'下拉菜单'} type={'primary'} divided={true} disabled></DropMenu>
        </Box>

        <div>
          <h1>无分割线 下拉菜单</h1>
          <Box>
            <DropMenu
              text={'下拉菜单'}
              divided={false}
              theme={theme}
              // disabled
              menus={menu}
              icons={{
                prefixIconClass: 'lugia-icon-direction_backward',
                suffixIconClass: 'lugia-icon-financial_heart',
                prefixIconSrc: imgs,
              }}
              // switchIconClass={imgs}
            ></DropMenu>
          </Box>
          <Box>
            <DropMenu menus={menu}>
              <DropMenu.Button
                icons={{
                  prefixIconClass: 'lugia-icon-direction_backward',
                  suffixIconClass: 'lugia-icon-direction_play_circle',
                }}
                divided={false}
                // disabled
              >
                Clickg
              </DropMenu.Button>
            </DropMenu>
          </Box>
          <Box>
            <DropMenu menus={menu}>
              <DropMenu.Button
                type={'primary'}
                icons={{
                  prefixIconClass: 'lugia-icon-direction_backward',
                  suffixIconClass: 'lugia-icon-direction_play_circle',
                }}
                divided={false}
                // disabled
              >
                Clickg
              </DropMenu.Button>
            </DropMenu>
          </Box>
          <Box>
            <DropMenu menus={menu}>
              <DropMenu.Button
                type={'primary'}
                icons={{
                  prefixIconClass: 'lugia-icon-direction_backward',
                  suffixIconClass: 'lugia-icon-direction_play_circle',
                }}
                divided={false}
                disabled
              >
                Clickg
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu}>
              <DropMenu.Button
                type={'custom'}
                icons={{
                  prefixIconClass: 'lugia-icon-direction_backward',
                  suffixIconClass: 'lugia-icon-direction_right_aligned',
                }}
                disabled
                divided={false}
              >
                Clggg
              </DropMenu.Button>
            </DropMenu>
          </Box>

          <Box>
            <DropMenu menus={menu}>
              <DropMenu.Button
                type={'basic'}
                icons={{
                  prefixIconClass: 'lugia-icon-direction_backward',
                  suffixIconClass: 'lugia-icon-direction_right_aligned',
                }}
                disabled
                divided={false}
              >
                Clggg
              </DropMenu.Button>
            </DropMenu>
          </Box>
        </div>
      </div>
    );
  }
}
