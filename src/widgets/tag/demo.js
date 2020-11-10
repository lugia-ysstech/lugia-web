/**
 * create by szfeng
 *
 * @flow
 */
import Tag from './';
import Widget from '../consts/index';
import styled from 'styled-components';
import React from 'react';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
import Theme from '../theme';

const Box = styled.div`
  display: inline-block;
  margin: 10px;
`;

const data = [];
for (let i = 10; i < 20; i++) {
  data.push(i);
}

const commonConfig = {
  [Widget.Tag]: {
    Container: {
      normal: {
        width: 300,
        height: 60,
        color: '#000',
        opacity: 1,
        boxShadow: getBoxShadow('2px 2px 5px #4d63ff'),
        border: getBorder({ color: '#ddd', width: 1, style: 'solid' }),
        borderRadius: getBorderRadius(20),
        background: { color: '#ddd' },
        cursor: 'grab',
        font: {
          size: 22,
          fontWeight: 100,
        },
        margin: {
          top: 20,
          left: 30,
        },
        padding: {
          left: 30,
          right: 30,
        },
      },
      hover: {
        color: '#fff',
        opacity: 0.7,
        boxShadow: getBoxShadow('2px 2px 5px #8d030f'),
        background: { color: '#ff0000' },
        border: getBorder({ color: '#ff0000', width: 1, style: 'solid' }),
        borderRadius: getBorderRadius(4),
      },
    },
    CloseButton: {
      normal: {
        color: 'red',
        font: {
          size: 20,
        },
        margin: {
          left: 20,
        },
      },
      hover: {
        color: '#4d63ff',
      },
    },
  },
};

const optionalConfig = {
  [Widget.Tag]: {
    Container: {
      normal: {
        width: 300,
        height: 60,
        color: '#000',
        opacity: 1,
        boxShadow: getBoxShadow('2px 2px 5px #4d63ff'),
        border: getBorder({ color: '#ddd', width: 1, style: 'solid' }),
        borderRadius: getBorderRadius(4),
        background: { color: '#ddd' },
        cursor: 'grab',
        font: {
          size: 22,
          fontWeight: 100,
        },
        margin: {
          top: 10,
          left: 10,
        },
        padding: {
          left: 10,
          right: 10,
        },
      },
      hover: {
        color: '#00cc99',
        opacity: 0.7,
        boxShadow: getBoxShadow('2px 2px 5px #8d030f'),
        background: { color: '#ffccff' },
        border: getBorder({ color: '#ff0000', width: 1, style: 'solid' }),
        borderRadius: getBorderRadius(4),
      },
      active: {
        color: '#fff',
        border: getBorder({ color: '#ff0000', width: 1, style: 'solid' }),
        background: { color: '#d35a24' },
        borderRadius: getBorderRadius(60),
      },
    },

    CheckedTagWrap: {
      normal: {
        width: 300,
        height: 60,
        color: '#7fe0c0',
        opacity: 1,
        boxShadow: getBoxShadow('2px 2px 5px #4d63ff'),
        border: getBorder({ color: '#ffff00', width: 1, style: 'solid' }),
        borderRadius: getBorderRadius(40),
        background: { color: '#4d63ff' },
        font: {
          size: 22,
          fontWeight: 100,
        },
        margin: {
          top: 10,
          left: 10,
        },
        padding: {
          left: 10,
          right: 10,
        },
      },
      hover: {
        color: '#32da9f',
        opacity: 0.7,
        boxShadow: getBoxShadow('2px 2px 5px #8d030f'),
        background: { color: '#ffff00' },
        border: getBorder({ color: '#ff0000', width: 1, style: 'solid' }),
        borderRadius: getBorderRadius(4),
      },
      active: {
        color: '#fff',
        background: { color: '#993424' },
        border: getBorder({ color: '#ff0000', width: 1, style: 'solid' }),
        borderRadius: getBorderRadius(60),
      },
    },
  },
};

export class LimitCase extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { data };
  }

  render() {
    // return this.getTag();
    return <div />;
  }

  onClose(item: string, e: Object) {
    const { data } = this.state;
    const index = data.indexOf(item);
    data.splice(index, 1);
    this.setState({ data });
  }

  getTag = () => {
    const { data } = this.state;
    return data.map((item, index) => {
      return (
        <Tag key={item} closable onClose={this.onClose.bind(this, item)}>
          {item}
        </Tag>
      );
    });
  };

  onClick = (e: Object) => {};
}
class TagDemo extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { data };
  }
  render() {
    return this.getTag();
  }

  getTag = () => {
    const { data } = this.state;
    return data.map((item, index) => {
      return (
        <Tag key={item} onClose={this.onClose.bind(this, item)} closable>
          {item}
        </Tag>
      );
    });
  };

  onClose(item, e) {
    const { data } = this.state;
    const index = data.indexOf(item);
    data.splice(index, 1);
    this.setState({ data });
  }
}
export class NormalCase extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { data };
  }

  onClick = (e: Object) => {
    // console.log('eeeeee', e);
  };

  render() {
    return (
      <div>
        <h1>Optional</h1>
        <div>
          <h2>默认样式</h2>
          <Box>
            <Tag
              // theme={optionalConfig}
              type="optional"
              onClick={this.onClick}
              onClose={this.onClose}
            >
              Optional
            </Tag>
          </Box>

          <Box>
            <Tag
              // theme={optionalConfig}
              type="optional"
              onClick={this.onClick}
              onClose={this.onClose}
              prefixIcon={'lugia-icon-logo_twitter'}
              suffixIcon={'lugia-icon-logo_gitlab'}
            >
              Optional
            </Tag>
          </Box>

          <h2>主题配置</h2>
          <Box>
            <Tag
              theme={optionalConfig}
              type="optional"
              onClick={this.onClick}
              onClose={this.onClose}
            >
              Optional
            </Tag>
          </Box>
        </div>

        <h1>Customs</h1>
        <div>
          <h2>默认样式</h2>

          <Box>
            <Tag
              // theme={commonConfig}
              type="customs"
              onClick={this.onClick}
              closable
              onClose={this.onClose}
              shape={'round'}
            >
              customs
            </Tag>
          </Box>

          <Box>
            <Tag
              // theme={commonConfig}
              type="customs"
              onClick={this.onClick}
              closable={false}
              onClose={this.onClose}
              shape={'round'}
            >
              customs
            </Tag>
          </Box>

          <Box>
            <Tag
              // theme={commonConfig}
              type="customs"
              onClick={this.onClick}
              closable={false}
              onClose={this.onClose}
              shape={'basic'}
            >
              customs
            </Tag>
          </Box>

          <Box>
            <Tag
              // theme={commonConfig}
              type="customs"
              onClick={this.onClick}
              closable={false}
              onClose={this.onClose}
              shape={'basic'}
              prefixIcon={'lugia-icon-logo_twitter'}
              suffixIcon={'lugia-icon-logo_gitlab'}
            >
              customs
            </Tag>
          </Box>

          <h2>更换图标的默认样式</h2>
          <div>
            <Box>
              <Tag
                onClick={this.onClick}
                closable
                onClose={this.onClose}
                closeIcon="lugia-icon-reminder_close_circle_o"
              >
                customs
              </Tag>
            </Box>

            <Box>
              <Tag
                onClick={this.onClick}
                closable
                onClose={this.onClose}
                closeIcon="lugia-icon-reminder_close_circle_o"
                prefixIcon={'lugia-icon-logo_twitter'}
                suffixIcon={'lugia-icon-logo_gitlab'}
              >
                customs
              </Tag>
            </Box>
          </div>
          <h2>主题配置</h2>

          <Box>
            <Tag
              theme={commonConfig}
              type="customs"
              onClick={this.onClick}
              closable
              onClose={this.onClose}
              shape={'round'}
            >
              customs
            </Tag>
          </Box>

          <Box>
            <Tag
              theme={commonConfig}
              type="customs"
              onClick={this.onClick}
              closable={false}
              onClose={this.onClose}
              shape={'round'}
            >
              customs
            </Tag>
          </Box>
        </div>

        <h1>primary</h1>
        <div>
          <h2>默认样式</h2>

          <Box>
            <Tag type="primary" onClose={this.onClose}>
              标签
            </Tag>
          </Box>

          <Box>
            <Tag type="primary" onClose={this.onClose}>
              closable
            </Tag>
          </Box>

          <Box>
            <Tag type="primary" shape={'round'} onClose={this.onClose}>
              closable
            </Tag>
          </Box>

          <Box>
            <Tag
              type="primary"
              shape={'round'}
              onClose={this.onClose}
              prefixIcon={'lugia-icon-logo_twitter'}
              suffixIcon={'lugia-icon-logo_gitlab'}
            >
              closable
            </Tag>
          </Box>

          <h2>主题配置</h2>
          <Box>
            <Tag theme={commonConfig} type="primary" closable onClose={this.onClose}>
              标签
            </Tag>
          </Box>

          <Box>
            <Tag
              theme={commonConfig}
              type="primary"
              shape={'round'}
              closable={false}
              onClose={this.onClose}
            >
              primary
            </Tag>
          </Box>
        </div>

        <h1>basic</h1>
        <div>
          <h2>默认样式</h2>
          <Box>
            <Tag type="basic" closable onClose={this.onClose}>
              标签
            </Tag>
          </Box>

          <Box>
            <Tag type="basic" onClose={this.onClose}>
              closable
            </Tag>
          </Box>

          <Box>
            <Tag type="basic" shape={'round'} onClose={this.onClose}>
              closable
            </Tag>
          </Box>

          <Box>
            <Tag
              type="basic"
              shape={'round'}
              onClose={this.onClose}
              prefixIcon={'lugia-icon-logo_twitter'}
              suffixIcon={'lugia-icon-logo_gitlab'}
            >
              closable
            </Tag>
          </Box>

          <h2>主题配置</h2>

          <Box>
            <Tag theme={commonConfig} type="basic" closable onClose={this.onClose}>
              basic
            </Tag>
          </Box>

          <Box>
            <Tag
              theme={commonConfig}
              type="basic"
              shape={'round'}
              closable={false}
              onClose={this.onClose}
            >
              basic
            </Tag>
          </Box>
        </div>

        <h1>presets</h1>
        <div>
          <h2>默认样式</h2>
          <Box>
            <Tag type="presets" closable={true} onClose={this.onClose}>
              标签
            </Tag>
          </Box>

          <Box>
            <Tag type="presets" onClose={this.onClose}>
              closable
            </Tag>
          </Box>

          <Box>
            <Tag
              type="presets"
              disabled
              shape={'round'}
              onClick={this.onClick}
              onClose={this.onClose}
            >
              closable
            </Tag>
          </Box>

          <Box>
            <Tag
              type="presets"
              disabled
              shape={'round'}
              onClick={this.onClick}
              onClose={this.onClose}
              prefixIcon={'lugia-icon-logo_twitter'}
              suffixIcon={'lugia-icon-logo_gitlab'}
            >
              closable
            </Tag>
          </Box>

          <h2>主题配置</h2>

          <Box>
            <Tag closable={true} theme={commonConfig} type="presets" onClose={this.onClose}>
              presets
            </Tag>
          </Box>

          <Box>
            <Tag
              theme={commonConfig}
              type="presets"
              shape={'round'}
              closable={false}
              onClose={this.onClose}
            >
              presets
            </Tag>
          </Box>
        </div>

        <h1>添加前后图标</h1>
        <div>
          <h2>默认样式</h2>
          <Box>
            <Tag prefixIcon={'lugia-icon-logo_twitter'} suffixIcon={'lugia-icon-logo_gitlab'} />
          </Box>

          <h2>主题配置</h2>
          <div>
            <Box>
              <Theme
                config={{
                  [Widget.Tag]: {
                    Container: {
                      normal: {
                        color: 'orange',
                        padding: {
                          left: 30,
                          right: 30,
                        },
                        background: { color: 'gray' },
                      },
                    },
                    PrefixIcon: {
                      normal: {
                        margin: {
                          right: 30,
                        },
                        color: 'yellow',
                      },
                    },
                    SuffixIcon: {
                      normal: {
                        margin: {
                          left: 30,
                        },
                        color: 'yellow',
                      },
                    },
                  },
                }}
              >
                <Tag prefixIcon={'lugia-icon-logo_twitter'} suffixIcon={'lugia-icon-logo_gitlab'} />
              </Theme>
            </Box>
          </div>
        </div>
      </div>
    );
  }

  onClose(item: string, e: Object) {}
}

export default () => {
  return [<LimitCase />, <NormalCase />, <TagDemo />];
};
