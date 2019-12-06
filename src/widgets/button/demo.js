/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Button from './index';
import styled from 'styled-components';
import Theme from '../theme';
import Widget from '../consts';
import { getBorder, getBorderRadius } from '@lugia/theme-utils';

const Wrapper = styled.div`
  float: left;
  margin-right: 50px;
`;

export default () => {
  const config = {
    [Widget.Button]: {
      Container: {
        normal: {
          width: 100,
          height: 50,
          padding: 9,
          margin: 10,
          background: { color: 'orange' },
          border: getBorder({ width: 2, style: 'solid', color: 'green' }),
          borderRadius: getBorderRadius(10),
        },
        hover: {
          background: { color: 'yellow' },
          border: getBorder({ width: 2, style: 'solid', color: 'red' }),
        },
        active: {
          background: { color: 'red' },
          border: getBorder({ width: 2, style: 'solid', color: 'yellow' }),
        },
        disabled: {
          background: { color: 'green' },
          border: getBorder({ width: 2, style: 'solid', color: 'pink' }),
        },
        focus: {
          background: { color: 'pink' },
          border: getBorder({ width: 2, style: 'solid', color: 'green' }),
        },
      },
      ButtonText: {
        normal: {
          color: 'black',
          font: { size: 16, weight: 500 },
        },
        hover: {
          color: 'blue',
          font: { size: 16, weight: 500 },
        },
        active: {
          color: 'orange',
          font: { size: 16, weight: 500 },
        },
        disabled: {
          color: 'orange',
          font: { size: 16, weight: 500 },
        },
        focus: {
          color: 'green',
          font: { size: 16, weight: 500 },
        },
      },
      ButtonIcon: {
        normal: {
          color: 'black',
          font: { size: 16, weight: 500 },
        },
        hover: {
          color: 'blue',
          font: { size: 16, weight: 500 },
        },
        active: {
          color: 'orange',
          font: { size: 16, weight: 500 },
        },
        disabled: {
          color: 'orange',
          font: { size: 16, weight: 500 },
        },
        focus: {
          color: 'green',
          font: { size: 16, weight: 500 },
        },
      },
    },
  };
  return (
    <React.Fragment>
      <div style={{ overflow: 'hidden' }}>
        <Wrapper>
          <p>type</p>
          <p>default</p>
          <Button>hello</Button>
          <p>Primary</p>
          <Button type="primary">Primary</Button>
          <p>Success</p>
          <Button type="success">Success</Button>
          <p>Warning</p>
          <Button type="warning">Warning</Button>
          <p>Danger</p>
          <Button type="danger">Danger</Button>
        </Wrapper>
        <Wrapper>
          <p>plain</p>
          <p>default</p>
          <Button shape="round" plain>
            hello
          </Button>
          <p>primary</p>
          <Button type="primary" shape="round" plain>
            Primary
          </Button>
          <p>success</p>
          <Button type="success" shape="round" plain>
            Success
          </Button>
          <p>warning</p>
          <Button type="warning" shape="round" plain>
            primary
          </Button>
          <p>danger</p>
          <Button type="danger" shape="round" plain>
            Danger
          </Button>
        </Wrapper>
        <Wrapper>
          <p>size</p>
          <p>default</p>
          <Button>Default</Button>
          <p>large</p>
          <Button type="primary" size="large">
            Primary
          </Button>
          <p>small</p>
          <Button type="warning" size="small">
            Warning
          </Button>
        </Wrapper>
        <Wrapper>
          <p>disabled</p>
          <p>default</p>
          <Button disabled>Default</Button>
          <p>primary</p>
          <Button type="primary" disabled>
            Primary
          </Button>
          <p>success</p>
          <Button type="success" disabled>
            Success
          </Button>
          <p>warning</p>
          <Button type="warning" disabled>
            warning
          </Button>
          <p>danger</p>
          <Button type="danger" disabled>
            danger
          </Button>
        </Wrapper>
        <Wrapper>
          <p>plain disabled</p>
          <p>default</p>
          <Button plain disabled>
            default
          </Button>
          <p>primary</p>
          <Button type="primary" plain disabled>
            primary
          </Button>
          <p>success</p>
          <Button type="success" plain disabled>
            success
          </Button>
          <p>warning</p>
          <Button type="warning" plain disabled>
            warning
          </Button>
          <p>danger</p>
          <Button type="danger" plain disabled>
            danger
          </Button>
        </Wrapper>
        <Wrapper>
          <p>circle</p>
          <Button circle plain />
          <br />
          <Button circle size="large" type="primary" />
          <br />
          <Button circle size="small" />
          <p>loading</p>
          <Button loading>loading</Button>
          <p>loading</p>
          <Button loading={{ delay: 3000 }}>loading</Button>
          <p>icon Button</p>
          <Button icon="lugia-icon-direction_logout">Button</Button>
          <p>icon Button</p>
          <Theme config={config}>
            <Button icon="lugia-icon-financial_global">Button</Button>
          </Theme>
          <Theme config={config}>
            <Button disabled icon="lugia-icon-financial_global">
              Button
            </Button>
          </Theme>
        </Wrapper>

        {/*<Theme config={view}>*/}
        {/*<Button viewClass="register">Button</Button>*/}
        {/*</Theme>*/}
      </div>
      <br />
      <div style={{ width: '500px' }}>
        <Button block>hello</Button>
        <p>Primary</p>
        <Button type="primary" block>
          Primary
        </Button>
        <p>Success</p>
        <Button type="success" block>
          Success
        </Button>
        <p>Warning</p>
        <Button type="warning" block>
          Warning
        </Button>
        <p>Danger</p>
        <Button type="danger" block>
          Danger
        </Button>
        <p>success</p>
        <Button type="success" shape="round" plain block>
          Success
        </Button>
        <p>warning</p>
        <Button type="warning" shape="round" plain block>
          primary
        </Button>
        <p>large</p>
        <Button type="primary" size="large" block>
          Primary
        </Button>
        <p>small</p>
        <Button type="warning" size="small" block>
          Warning
        </Button>
        <p>loading</p>
        <Button loading block>
          loading
        </Button>
        <p>loading</p>
        <Button loading={{ delay: 3000 }} block>
          loading
        </Button>
        <p>icon Button</p>
        <Button icon="lugia-icon-direction_logout" block>
          Button
        </Button>
      </div>
      <div>
        <p>inline</p>
        <Button>hello</Button>
        <Button type="primary">Primary</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="danger">Danger</Button>
      </div>
    </React.Fragment>
  );
};
