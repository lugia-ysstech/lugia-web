/**
 *
 * create by szfeng
 *
 */

import * as React from 'react';
import Select from './index';
import Widget from '../consts/index';
import styled from 'styled-components';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';

const H2 = styled.h2`
  padding: 20px;
`;

const Box = styled.div`
  padding-bottom: 500px;
`;

const data = (function(t) {
  const res = [];
  for (let i = 0; i < t; i++) {
    res.push({ value: `key-${i}`, label: `txt${i}` });
  }
  return res;
})(10);

const newView = {
  [Widget.Select]: {
    Container: {
      normal: {
        width: 600,
        height: 80,
      },
    },
  },
};

const config = {
  [Widget.Select]: {
    Container: {
      normal: {
        width: 600,
        height: 300,
      },
    },
    Menu: {
      MenuWrap: {
        normal: {
          width: 400,
          height: 330,
          // opacity: 0.7,
          background: {
            color: '#ccc',
          },
          padding: {
            left: 10,
            // top: 30,
            right: 30,
            bottom: 30,
          },
          margin: {
            top: 20,
          },
          border: getBorder({ color: '#ff3366', width: 1, style: 'solid' }),
          borderRadius: getBorderRadius(20),
          boxShadow: getBoxShadow('2px 2px 2px 4px #ff3366'),
        },
        hover: {
          background: {
            color: '#ff66cc',
          },
          // opacity: 1,
          border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
          borderRadius: getBorderRadius(20),
          boxShadow: getBoxShadow('2px 2px 2px 4px #ff66cc'),
        },
      },
      MenuItem: {
        MenuItemWrap: {
          normal: {
            height: 40,
            background: { color: '#ff99cc' },
            color: '#cc00cc',
            // border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(20),
            padding: {
              left: 60,
              top: 0,
            },
            font: {
              size: 16,
            },
          },
          hover: {
            color: '#fff',
            background: {
              color: '#660066',
            },
            opacity: 0.9,
            font: {
              fontWeight: 900,
            },
            // border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(20),
          },

          active: {
            color: '#4d63ff',
            background: {
              color: 'ff0099',
            },
            opacity: 0.9,
            font: {
              fontWeight: 900,
            },
            // border: getBorder({ color: '#660033', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(60),
          },

          disabled: {
            background: { color: '#ff99cc' },
            color: 'red',
            borderRadius: getBorderRadius(60),
            opacity: 0.7,
            padding: {
              left: 30,
              top: 0,
            },
            font: {
              size: 26,
            },
          },
        },

        SelectedMenuItemWrap: {
          normal: {
            height: 80,
            background: { color: '#cc00ff' },
            color: '#fff',
            // border: getBorder({ color: '#660033', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(80),
            padding: {
              left: 30,
            },
            font: {
              size: 20,
            },
          },
          hover: {
            color: '#4d63ff',
            background: {
              color: '#ffffcc',
            },
            opacity: 1,
            font: {
              fontWeight: 900,
            },
            // border: getBorder({ color: '#336699', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(60),
          },

          active: {
            color: '#cc0000',
            background: {
              color: 'ff9900',
            },
            opacity: 1,
            font: {
              fontWeight: 900,
            },
            // border: getBorder({ color: '#000033', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(0),
          },
        },
      },
    },
    InputTag: {
      InputTagWrap: {
        normal: {
          width: 600,
          height: 60,
          color: '#4d63ff',
          font: { size: 20 },
          background: { color: '#eee' },
          boxShadow: getBoxShadow('2px 2px 2px 4px #ff66cc'),
          border: getBorder({ color: '#000033', width: 1, style: 'solid' }),
          borderRadius: getBorderRadius(20),
          // opacity: 0.1,
          margin: {
            top: 40,
            left: 100,
          },
          padding: {
            left: '20',
            right: '30',
          },
        },
        hover: {
          boxShadow: '2px 2px 5px #4d63ff',
          color: '#4d63ff',
          borderRadius: getBorderRadius(10),
        },
      },
      TagWrap: {
        normal: {
          width: 100,
          height: 40,
          margin: {
            left: 10,
            right: 5,
          },
          background: {
            color: 'pink',
          },
          padding: {
            left: 10,
            right: 10,
          },

          // border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }, { radius: 10 }),
        },
        hover: {
          background: { color: 'orange' },
        },
      },
      TagIcon: {
        normal: {
          font: { fontSize: 14, color: '#999' },
        },
        hover: {
          color: '#4d63ff',
        },
      },
      SwitchIcon: {
        normal: {
          // color: '#ddd',
          font: { fontSize: 30 },
          opacity: 0.1,
        },
        hover: { color: 'red', opacity: 1 },
      },
      Menu: {
        MenuWrap: {
          normal: {
            width: 400,
            height: 330,
            // opacity: 0.7,
            background: {
              color: '#ccc',
            },
            padding: {
              left: 10,
              // top: 30,
              right: 30,
              bottom: 30,
            },
            margin: {
              top: 20,
            },
            border: getBorder({ color: '#ff3366', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(20),
            boxShadow: getBoxShadow('2px 2px 2px 4px #ff3366'),
          },
          hover: {
            background: {
              color: '#ff66cc',
            },
            // opacity: 1,
            border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(20),
            boxShadow: getBoxShadow('2px 2px 2px 4px #ff66cc'),
          },
        },
        MenuItem: {
          MenuItemWrap: {
            normal: {
              height: 40,
              background: { color: '#ff99cc' },
              color: '#cc00cc',
              // border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(20),
              padding: {
                left: 60,
                top: 0,
              },
              font: {
                size: 16,
              },
            },
            hover: {
              color: '#fff',
              background: {
                color: '#660066',
              },
              opacity: 0.9,
              font: {
                fontWeight: 900,
              },
              // border: getBorder({ color: '#ff66cc', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(20),
            },

            active: {
              color: '#4d63ff',
              background: {
                color: 'ff0099',
              },
              opacity: 0.9,
              font: {
                fontWeight: 900,
              },
              // border: getBorder({ color: '#660033', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(60),
            },
          },
        },
      },
    },
  },
};

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null,
      value: ['key-a'],
    };
  }

  render() {
    const { value, displayValue } = this.state;

    return (
      <Box>
        <H2>single</H2>
        <Select
          theme={config}
          createPortal
          data={data}
          displayField={'label'}
          mutliple
          value={value}
          displayValue={value}
          throttle={1000}
          onQuery={this.onQuery}
          canSearch
          onChange={this.handleChange}
          onTrigger={this.onTrigger}
          onQuery={this.handleQuery}
          onSelect={this.handleSelect}
        />

        <H2>single search</H2>
        <Select canSearch canClear={false} displayField={'label'} data={data} />

        <Select canSearch displayField={'label'} disabled data={data} />

        <H2>single canInput</H2>
        <Select canSearch canInput displayField={'label'} data={data} />

        <H2>非受限 mutliple</H2>
        <Select data={data} displayField={'label'} mutliple limitCount={5} />

        <H2>非受限 mutliple DefaultValue</H2>
        <Select
          theme={newView}
          mutliple
          defaultValue={['key-0', 'key-1']}
          defaultDisplayValue={['txt0', 'txt1']}
          displayField={'label'}
          limitCount={5}
          data={data}
          onSelect={this.onSelect}
          onChange={this.onChange}
        />

        <H2>受限 mutliple canInput</H2>
        <Select
          value={value}
          displayValue={[]}
          mutliple
          canSearch
          limitCount={3}
          canInput
          displayField={'label'}
          data={data}
          onQuery={this.onQuery}
          onChange={this.onChange}
        />
      </Box>
    );
  }

  handleChange = obj => {
    console.log('obj', obj);
  };

  onTrigger = () => {
    console.log('visible');
  };

  handleQuery = value => {
    console.log('query', value);
  };

  handleSelect = obj => {
    console.log('handleSelect', obj);
  };

  onChange = obj => {
    const { value, displayValue } = obj;
    this.setState({ value, displayValue });
  };

  onSelect = obj => {};

  onQuery = value => {
    console.log(value);
  };

  onChangeNoDisplayValue = obj => {
    const { value, displayValue } = obj;

    this.setState({
      value,
      displayValue,
    });
  };
}
