/**
 * create by szfeng
 *
 * @flow
 */
import Tag from './';
import CommonIcon from '../icon';
import Widget from '../consts/index';
import Theme from '../theme';
import React from 'react';

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
          <Theme config={config}>
            <Tag type="customs" closeable={false} onClose={this.onClose}>
              customs
            </Tag>
          </Theme>

          <Theme config={config}>
            <Tag type="customs" shape={'round'} closeable={false} onClose={this.onClose}>
              customs
            </Tag>
          </Theme>

          <Tag type="customs" closeable={false} onClose={this.onClose}>
            标签
          </Tag>

          <Tag type="customs" onClose={this.onClose}>
            closeable
          </Tag>

          <Tag type="customs" shape={'round'} onClose={this.onClose}>
            closeable
          </Tag>
        </div>

        <div>
          <Theme config={config}>
            <Tag type="primary" closeable={false} onClose={this.onClose}>
              primary
            </Tag>
          </Theme>

          <Theme config={config}>
            <Tag type="primary" shape={'round'} closeable={false} onClose={this.onClose}>
              primary
            </Tag>
          </Theme>

          <Tag type="primary" closeable={false} onClose={this.onClose}>
            标签
          </Tag>

          <Tag type="primary" onClose={this.onClose}>
            closeable
          </Tag>

          <Tag type="primary" shape={'round'} onClose={this.onClose}>
            closeable
          </Tag>
        </div>

        <div>
          <Theme config={config}>
            <Tag type="basic" closeable={false} onClose={this.onClose}>
              basic
            </Tag>
          </Theme>

          <Theme config={config}>
            <Tag type="basic" shape={'round'} closeable={false} onClose={this.onClose}>
              basic
            </Tag>
          </Theme>

          <Tag type="basic" closeable={false} onClose={this.onClose}>
            标签
          </Tag>

          <Tag type="basic" onClose={this.onClose}>
            closeable
          </Tag>

          <Tag type="basic" shape={'round'} onClose={this.onClose}>
            closeable
          </Tag>
        </div>

        <div>
          <Theme config={config}>
            <Tag type="presets" closeable={false} onClose={this.onClose}>
              presets
            </Tag>
          </Theme>

          <Theme config={config}>
            <Tag type="presets" shape={'round'} closeable={false} onClose={this.onClose}>
              presets
            </Tag>
          </Theme>

          <Tag type="presets" closeable={false} onClose={this.onClose}>
            标签
          </Tag>

          <Tag type="presets" onClose={this.onClose}>
            closeable
          </Tag>

          <Tag type="presets" disabled shape={'round'} onClose={this.onClose}>
            closeable
          </Tag>
        </div>
      </div>
    );
  }

  onClose = () => {
    console.log('cc');
  };
}
