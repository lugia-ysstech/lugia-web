/**
 * create by szfeng
 *
 * @flow
 */
import Tag from './';
import Widget from '../consts/index';
import Theme from '../theme';
import styled from 'styled-components';
import React from 'react';

const Box = styled.div`
  display: inline-block;
  margin: 10px;
`;

export default class Demo extends React.Component<any, any> {
  render() {
    const config = {
      [Widget.Tag]: {
        color: '#ff5588',
      },
    };

    return (
      <div>
        <div>
          <Box>
            <Theme config={config}>
              <Tag type="customs" closeable={false} onClose={this.onClose}>
                customs
              </Tag>
            </Theme>
          </Box>

          <Box>
            <Theme config={config}>
              <Tag type="customs" shape={'round'} closeable={false} onClose={this.onClose}>
                customs
              </Tag>
            </Theme>
          </Box>

          <Box>
            <Tag type="customs" closeable={false} onClose={this.onClose}>
              标签
            </Tag>
          </Box>

          <Box>
            <Tag type="customs" onClose={this.onClose}>
              closeable
            </Tag>
          </Box>

          <Box>
            <Tag type="customs" shape={'round'} onClose={this.onClose}>
              closeable
            </Tag>
          </Box>
        </div>

        <div>
          <Box>
            <Theme config={config}>
              <Tag type="primary" closeable={false} onClose={this.onClose}>
                primary
              </Tag>
            </Theme>
          </Box>

          <Box>
            <Theme config={config}>
              <Tag type="primary" shape={'round'} closeable={false} onClose={this.onClose}>
                primary
              </Tag>
            </Theme>
          </Box>

          <Box>
            <Tag type="primary" closeable={false} onClose={this.onClose}>
              标签
            </Tag>
          </Box>

          <Box>
            <Tag type="primary" onClose={this.onClose}>
              closeable
            </Tag>
          </Box>

          <Box>
            <Tag type="primary" shape={'round'} onClose={this.onClose}>
              closeable
            </Tag>
          </Box>
        </div>

        <div>
          <Box>
            <Theme config={config}>
              <Tag type="basic" closeable={false} onClose={this.onClose}>
                basic
              </Tag>
            </Theme>
          </Box>

          <Box>
            <Theme config={config}>
              <Tag type="basic" shape={'round'} closeable={false} onClose={this.onClose}>
                basic
              </Tag>
            </Theme>
          </Box>

          <Box>
            <Tag type="basic" closeable={false} onClose={this.onClose}>
              标签
            </Tag>
          </Box>

          <Box>
            <Tag type="basic" onClose={this.onClose}>
              closeable
            </Tag>
          </Box>

          <Box>
            <Tag type="basic" shape={'round'} onClose={this.onClose}>
              closeable
            </Tag>
          </Box>
        </div>

        <div>
          <Box>
            <Theme config={config}>
              <Tag type="presets" closeable={false} onClose={this.onClose}>
                presets
              </Tag>
            </Theme>
          </Box>

          <Box>
            <Theme config={config}>
              <Tag type="presets" shape={'round'} closeable={false} onClose={this.onClose}>
                presets
              </Tag>
            </Theme>
          </Box>

          <Box>
            <Tag type="presets" closeable={false} onClose={this.onClose}>
              标签
            </Tag>
          </Box>

          <Box>
            <Tag type="presets" onClose={this.onClose}>
              closeable
            </Tag>
          </Box>

          <Box>
            <Tag type="presets" disabled shape={'round'} onClose={this.onClose}>
              closeable
            </Tag>
          </Box>
        </div>
      </div>
    );
  }

  onClose = () => {
    console.log('cc');
  };
}
