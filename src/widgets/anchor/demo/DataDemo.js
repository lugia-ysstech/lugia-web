import React from 'react';
import Anchor from '../index';
import styled from 'styled-components';

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
    const linkData = [
      {
        title: 'anchor-link1',
        href: '#anchor-link1',
      },
      {
        title: 'anchor-link2',
        href: '#anchor-link2',
      },
      {
        title: 'anchor-link3',
        href: '#anchor-link3',
        children: [
          {
            title: 'anchor-link3.1',
            href: '#anchor-link3.1',
          },
          {
            title: 'anchor-link3.2',
            href: '#anchor-link3.2',
          },
        ],
      },
      {
        title: 'anchor-link4',
        href: '#anchor-link4',
      },
    ];
    return (
      <div>
        <DemoBox cur={0}>
          <Anchor slideType="circle" data={linkData} />
          <div style={{ marginTop: '100px' }} id="anchor-link1" name="anchor-link1">
            anchor-link1
          </div>
        </DemoBox>
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
