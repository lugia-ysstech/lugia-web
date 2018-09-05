/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import Widget from '../consts';
import Theme from '../theme';
import Layout from '../layout';

const { Header, Content, Footer, Aside } = Layout;

const header = (
  <div style={{ height: '60px', lineHeight: '60px', textAlign: 'center', background: '#684fff' }}>
    Header
  </div>
);
const content = (
  <div
    style={{
      height: '200px',
      lineHeight: '200px',
      textAlign: 'center',
      background: '#0F89FF',
    }}
  >
    Content
  </div>
);
const footer = (
  <div
    style={{
      height: '60px',
      lineHeight: '60px',
      textAlign: 'center',
      background: '#0f13ff',
    }}
  >
    Footer
  </div>
);
const aside = (
  <div
    style={{
      height: '200px',
      lineHeight: '200px',
      width: '200px',
      textAlign: 'center',
      background: '#11b4ff',
    }}
  >
    Aside
  </div>
);

export const LayoutDemo = () => {
  const layoutView = {
    [Widget.Layout]: {
      width: 200,
      margin: {
        top: 20,
        bottom: 30,
        left: 50,
        right: 40,
      },
    },
    [Widget.Header]: {
      margin: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
    },
    [Widget.Footer]: {
      margin: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
    },
    [Widget.Content]: {
      margin: {
        top: 20,
        bottom: 20,
        left: 10,
        right: 10,
      },
    },
  };
  return (
    <div>
      <p>default flex-direction: column;</p>
      <Layout>
        <Header>{header}</Header>
        <Content>{content}</Content>
        <Footer>{footer}</Footer>
      </Layout>
      <p>flex-direction: row;</p>
      <Layout>
        <Header>{header}</Header>
        <Layout direction="row">
          <Aside>{aside}</Aside>
          <Content>{content}</Content>
        </Layout>
        <Footer>{footer}</Footer>
      </Layout>
      <p>flex-direction: row;</p>
      <Layout>
        <Header>{header}</Header>
        <Layout direction="row">
          <Content>{content}</Content>
          <Aside>{aside}</Aside>
        </Layout>
        <Footer>{footer}</Footer>
      </Layout>
      <p>flex-direction: row;</p>
      <Layout>
        <Header>{header}</Header>
        <Layout direction="row">
          <Content>{content}</Content>
          <Aside>{aside}</Aside>
        </Layout>
        <Footer>{footer}</Footer>
      </Layout>
      <p>flex-direction: row;</p>
      <Layout direction="row">
        <Aside>
          <div
            style={{
              height: '320px',
              lineHeight: '200px',
              width: '200px',
              textAlign: 'center',
              background: '#11b4ff',
            }}
          >
            Aside
          </div>
        </Aside>
        <Layout isWrap={true}>
          <Header>{header}</Header>
          <Content>{content}</Content>
          <Footer>{footer}</Footer>
        </Layout>
      </Layout>
      <p>flex-direction: row;</p>
      <Layout direction="row">
        <Aside>
          <div
            style={{
              height: '320px',
              lineHeight: '200px',
              width: '200px',
              textAlign: 'center',
              background: '#11b4ff',
            }}
          >
            Aside
          </div>
        </Aside>
        <Layout isWrap={true}>
          <Header>{header}</Header>
          <Content>{content}</Content>
          <Footer>{footer}</Footer>
        </Layout>
        <Aside>
          <div
            style={{
              height: '320px',
              lineHeight: '200px',
              width: '200px',
              textAlign: 'center',
              background: '#11b4ff',
            }}
          >
            Aside
          </div>
        </Aside>
      </Layout>

      <p>theme</p>
      <Theme config={layoutView}>
        <Layout direction="row">
          <Header>
            <div style={{ textAlign: 'center', background: '#684fff' }}>Header</div>
          </Header>
          <Content>
            <div style={{ textAlign: 'center', background: '#0F89FF' }}>Content</div>
          </Content>
          <Footer>
            <div style={{ textAlign: 'center', background: '#0f13ff' }}>Footer</div>
          </Footer>
        </Layout>
      </Theme>
    </div>
  );
};
