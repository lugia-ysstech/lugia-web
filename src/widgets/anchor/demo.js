/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import Theme from '../theme';
import Widget from '../consts/index';
import Anchor from './index';

const { Link } = Anchor;
const DemoBox = styled.div`
  padding: 20px;
  margin-left: ${props => 120 + props.cur * 120}px;
  width: 209px;
  height: 203px;
`;

export default class DrawerDemo extends React.Component<any, any> {
  constructor() {
    super();
  }
  click = () => {
    const anchorElement = document.getElementById('anchor-link');
    if (anchorElement) {
      anchorElement.scrollIntoView();
    }
  };
  render() {
    return (
      <div>
        <DemoBox cur={0}>
          <Anchor slideType="circle">
            <Link title="anchor-link1" href="#anchor-link1" />
            <Link title="anchor-link2" href="#anchor-link2" />
            <Link title="anchor-link3" href="#anchor-link3">
              <Link title="anchor-link3.1" href="#anchor-link3.1" />
              <Link title="anchor-link3.2" href="#anchor-link3.2" />
            </Link>
            <Link title="anchor-link4" href="#anchor-link4" />
          </Anchor>
        </DemoBox>
        <DemoBox cur={1}>
          <Anchor slideType="line">
            <Link title="anchor-link1" href="#anchor-link1" />
            <Link title="anchor-link2" href="#anchor-link2" />
            <Link title="anchor-link3" href="#anchor-link3">
              <Link title="anchor-link3.1" href="#anchor-link3.1" />
              <Link title="anchor-link3.2" href="#anchor-link3.2" />
            </Link>
            <Link title="anchor-link4" href="#anchor-link4" />
          </Anchor>
        </DemoBox>
        <DemoBox cur={2}>
          <Anchor slideType="none" affix={false}>
            <Link title="anchor-link1" href="#anchor-link1" />
            <Link title="anchor-link2" href="#anchor-link2" />
            <Link title="anchor-link3" href="#anchor-link3">
              <Link title="anchor-link3.1" href="#anchor-link3.1" />
              <Link title="anchor-link3.2" href="#anchor-link3.2" />
            </Link>
            <Link title="anchor-link4" href="#anchor-link4" />
          </Anchor>
        </DemoBox>
        <div style={{ marginTop: '100px' }} id="anchor-link1" name="anchor-link1">
          anchor-link1
        </div>
        <div style={{ marginTop: '300px' }} id="anchor-link2" name="anchor-link2">
          anchor-link2
        </div>
        <div style={{ marginTop: '300px' }} id="anchor-link3" name="anchor-link3">
          anchor-link3
        </div>
        <div style={{ marginTop: '200px' }} id="anchor-link3.1" name="anchor-link3.1">
          anchor-link3.1
        </div>
        <div style={{ marginTop: '200px' }} id="anchor-link3.2" name="anchor-link3.2">
          anchor-link3.2
        </div>
        <div style={{ marginTop: '300px' }} id="anchor-link4" name="anchor-link4">
          anchor-link4
        </div>
      </div>
    );
  }
}
