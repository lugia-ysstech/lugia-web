import React from 'react';
import Anchor from '../index';
import Widget from '../../consts';
import { getBorder } from '@lugia/theme-utils';
import Theme from '../../theme';
import styled from 'styled-components';

const { Link } = Anchor;
const DemoBox = styled.div`
  display: inline-block;
  padding: 20px;
  margin-left: ${props => 120 + props.cur * 100}px;
  width: 210px;
  height: 200px;
`;

export default class ThemeAnchorDemo extends React.Component<any, any> {
  constructor() {
    super();
  }
  click = () => {
    const anchorElement = document.getElementById('anchor-link');
    if (anchorElement) {
      anchorElement.scrollIntoView();
    }
  };

  handleLinkClick = (e, href) => {
    if (href) {
      const name = href.slice(1);
      const anchorElement = document.getElementById(name);
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  };
  render() {
    const config = {
      [Widget.Anchor]: {
        Container: {
          normal: {
            width: 200,
            border: {
              left: {
                color: 'red',
              },
            },
          },
        },
        Indicator: {
          normal: {
            background: {
              color: 'transparent',
            },
            border: getBorder({
              width: 1,
              color: 'blue',
              style: 'solid',
            }),
          },
        },
      },
    };

    return (
      <div>
        <DemoBox cur={0}>
          <Theme config={config}>
            <Anchor slideType="circle" useHref={false} onClick={this.handleLinkClick}>
              <Link title="anchor-link1" href="#anchor-link1" />
              <Link title="anchor-link2" href="#anchor-link2" />
              <Link title="anchor-link3" href="#anchor-link3" />
            </Anchor>
          </Theme>
        </DemoBox>
        <DemoBox cur={1}>
          <Anchor slideType="line">
            <Link title="anchor-link1" href="#anchor-link1" />
            <Link title="anchor-link2" href="#anchor-link2" />
            <Link title="anchor-link3" href="#anchor-link3" />
          </Anchor>
        </DemoBox>
        <DemoBox cur={2}>
          <Anchor slideType="circle">
            <Link title="anchor-link1" href="#anchor-link1" />
            <Link title="anchor-link2" href="#anchor-link2" />
            <Link title="anchor-link3" href="#anchor-link3" />
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
      </div>
    );
  }
}
