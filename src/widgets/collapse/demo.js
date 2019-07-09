/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
import Theme from '../theme';
import Widget from '../consts';
import Panel from './panel';
import Collapse from './collapse';

const Wrapper = styled.div`
  width: 900px;
  margin: 0 auto;
  padding: 50px;
  border: 1px solid #e8e8e8;
`;

const view = {
  [Widget.Panel]: {
    width: 500,
    color: '#56f43e',
    backgroundColor: '#e6f7ff',
    margin: 50,
    borderSize: {
      top: 0,
      right: 0,
      bottom: 1,
      left: 0,
    },
  },
};
const heightView = {
  [Widget.Panel]: {
    height: 100,
  },
};
const spaceHeightView = {
  [Widget.Panel]: {
    height: 46,
  },
};
const wrapView = {
  [Widget.Collapse]: {
    width: 500,
    margin: 20,
  },
  [Widget.Panel]: {
    borderSize: 0,
  },
};

export const PanelDemo = class extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      open: true,
    };
  }
  handleClick = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  };
  render() {
    const { open } = this.state;
    const view = {
      [Widget.Panel]: {
        PanelHeader: {
          normal: {
            width: 400,
            height: 80,
            borderRadius: getBorderRadius(10),
            background: { color: 'pink' },
            opacity: 1,
            border: getBorder({ width: 2, style: 'solid', color: 'yellow' }),
            boxShadow: getBoxShadow('1px 2px 2px 2px #e8e8e8'),
            padding: { top: 10, right: 10, bottom: 10, left: 30 },
          },
          hover: {
            borderRadius: getBorderRadius(10),
            background: { color: 'yellow' },
            opacity: 0.8,
            border: getBorder({ width: 2, style: 'solid', color: 'pink' }),
            boxShadow: getBoxShadow('1px 2px 2px 2px #e8e8e8'),
          },
          disabled: {
            borderRadius: getBorderRadius(10),
            background: { color: 'orange' },
            opacity: 0.8,
            border: getBorder({ width: 2, style: 'solid', color: 'green' }),
            boxShadow: getBoxShadow('1px 2px 2px 2px #e8e8e8'),
          },
        },
        PanelHeaderText: {
          normal: {
            color: 'green',
            font: { size: 16, weight: 300 },
          },
          hover: {
            color: 'pink',
          },
          disabled: {
            color: 'yellow',
          },
        },
        PanelHeaderIcon: {
          normal: {
            color: 'green',
            fontsSze: 16,
          },
          hover: {
            color: 'pink',
          },
          disabled: {
            color: 'yellow',
          },
        },
      },
    };
    return (
      <div>
        <Wrapper>
          {/*<Panel value="1" title="LUGIA" />*/}
          {/*<br />*/}
          {/*<Panel value="2" open={open} onClick={this.handleClick} title="lugia">*/}
          {/*<div>PanelContent...</div>*/}
          {/*<div>PanelContent...</div>*/}
          {/*</Panel>*/}
          {/*<br />*/}
          {/*<Panel value="3" title="LUGIA" disabled>*/}
          {/*<div>PanelContent...</div>*/}
          {/*<div>PanelContent...</div>*/}
          {/*</Panel>*/}
          {/*<br />*/}
          {/*<Panel title="LUGIA" disabled open>*/}
          {/*<div>PanelContent...</div>*/}
          {/*<div>PanelContent...</div>*/}
          {/*</Panel>*/}
          {/*<br />*/}
          {/*<Panel value="4" showArrow={false} title="LUGIA">*/}
          {/*<div>PanelContent...</div>*/}
          {/*<div>PanelContent...</div>*/}
          {/*</Panel>*/}
          {/*<br />*/}
          <Theme config={view}>
            <Panel value="4" showArrow={false} title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
          </Theme>
          <br />
          <Theme config={view}>
            <Panel value="5" title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
          </Theme>
          <br />
          <Theme config={view}>
            <Panel disabled value="5" title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
          </Theme>
          <br />
          {/*<Theme config={heightView}>*/}
          {/*<Panel title="LUGIA">*/}
          {/*<div>PanelContent...</div>*/}
          {/*<div>PanelContent...</div>*/}
          {/*</Panel>*/}
          {/*</Theme>*/}
          {/*<br />*/}
          {/*<Theme config={heightView}>*/}
          {/*<Panel title="LUGIA" open>*/}
          {/*<div>PanelContent...</div>*/}
          {/*<div>PanelContent...</div>*/}
          {/*</Panel>*/}
          {/*</Theme>*/}
          {/*<br />*/}
          {/*<Theme config={spaceHeightView}>*/}
          {/*<Panel title="LUGIA" open>*/}
          {/*<div>PanelContent...</div>*/}
          {/*<div>PanelContent...</div>*/}
          {/*</Panel>*/}
          {/*</Theme>*/}
        </Wrapper>
      </div>
    );
  }
};
export const CollapseDemo = class extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      activeValue: '1',
      defaultActiveValue: '1',
    };
  }
  handleChangeActiveValue = (obj: Object) => {
    console.info(obj.newValue);
    this.setState({
      activeValue: obj.newValue,
    });
  };
  handleChangeDefaultActiveValue = (obj: Object) => {
    console.info(obj.newValue);
  };
  render() {
    const { activeValue, defaultActiveValue } = this.state;
    const data = [
      {
        value: '1',
        title: 'LUGIA',
        children: 'PanelContent...',
      },
      {
        value: '2',
        title: 'LUGIA',
        children: 'PanelContent...',
      },
    ];
    const view = {
      [Widget.Collapse]: {
        Wrap: {
          normal: {
            width: 500,
            height: 500,
            background: { color: 'orange' },
            border: getBorder({ color: 'green', width: 2, style: 'solid' }),
            opacity: 1,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            },
            padding: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            },
          },
        },
      },
    };
    return (
      <div>
        <Wrapper>
          <p>defaultActiveValue={'1'}</p>
          <Theme config={view}>
            <Collapse defaultActiveValue={defaultActiveValue}>
              <Panel value="1" title="LUGIA">
                <div>PanelContent...</div>
                <div>PanelContent...</div>
              </Panel>
              <Panel value="2" title="LUGIA">
                <div>PanelContent...</div>
                <div>PanelContent...</div>
              </Panel>
            </Collapse>
          </Theme>
          <br />
          <p>defaultActiveValue={'1'}</p>
          <Collapse defaultActiveValue={defaultActiveValue}>
            <Panel value="1" title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
            <Panel value="2" title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
          </Collapse>
          <br />
          <p>activeValue={'1'}</p>
          <Collapse activeValue={'1'}>
            <Panel value="1" title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
            <Panel value="2" title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
          </Collapse>
          <br />
          <p>activeValue={'this.state.activeValue'}</p>
          <Collapse activeValue={activeValue} onChange={this.handleChangeActiveValue}>
            <Panel value="1" title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
            <Panel value="2" title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
          </Collapse>
          <br />
          <p>accordion</p>
          <Collapse defaultActiveValue={defaultActiveValue} accordion>
            <Panel value="1" title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
            <Panel value="2" title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
            <Panel value="3" title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
            <Panel value="4" title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
          </Collapse>
          <br />
          <Theme config={wrapView}>
            <Collapse activeValue={activeValue} onChange={this.handleChangeActiveValue}>
              <Panel value="1" title="LUGIA">
                <div>PanelContent...</div>
                <div>PanelContent...</div>
              </Panel>
              <Panel value="2" title="LUGIA">
                <div>PanelContent...</div>
                <div>PanelContent...</div>
              </Panel>
            </Collapse>
          </Theme>
          <br />
          <p>data</p>
          <Collapse defaultActiveValue={defaultActiveValue} data={data} />
          <p>collapse nest</p>
          <Collapse defaultActiveValue={defaultActiveValue}>
            <Panel value="1" title="LUGIA">
              <Collapse defaultActiveValue={defaultActiveValue}>
                <Panel value="1" title="LUGIA">
                  <div>PanelContent...</div>
                  <div>PanelContent...</div>
                </Panel>
                <Panel value="2" title="LUGIA">
                  <div>PanelContent...</div>
                  <div>PanelContent...</div>
                </Panel>
              </Collapse>
            </Panel>
            <Panel value="2" title="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
          </Collapse>
        </Wrapper>
      </div>
    );
  }
};
