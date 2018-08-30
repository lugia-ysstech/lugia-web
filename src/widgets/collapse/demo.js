/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
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
    color: '#e6f7ff',
    margin: 20,
    width: 500,
  },
};

export const PanelDemo = class extends React.Component<any, any> {
  render() {
    const style = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
    };
    return (
      <div>
        <Wrapper>
          <Panel value="1" header="LUGIA">
            <div>PanelContent...</div>
            <div>PanelContent...</div>
          </Panel>
          <br />
          <Panel value="2" open header="lugia">
            <div>PanelContent...</div>
            <div>PanelContent...</div>
          </Panel>
          <br />
          <Panel value="3" header="LUGIA" disabled>
            <div>PanelContent...</div>
            <div>PanelContent...</div>
          </Panel>
          <br />
          <Panel value="4" style={style} header="LUGIA">
            <div>PanelContent...</div>
            <div>PanelContent...</div>
          </Panel>
          <br />
          <Theme config={view}>
            <Panel value="5" header="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
          </Theme>
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
    return (
      <div>
        <Wrapper>
          <Collapse activeValue={activeValue} onChange={this.handleChangeActiveValue}>
            <Panel value="1" header="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
            <Panel value="2" header="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
          </Collapse>
          <br />
          <Collapse
            defaultActiveValue={defaultActiveValue}
            onChange={this.handleChangeDefaultActiveValue}
          >
            <Panel value="1" header="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
            <Panel value="2" header="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
          </Collapse>
          <br />
          <Collapse defaultActiveValue={defaultActiveValue} accordion>
            <Panel value="1" header="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
            <Panel value="2" header="LUGIA">
              <div>PanelContent...</div>
              <div>PanelContent...</div>
            </Panel>
          </Collapse>
          <br />
        </Wrapper>
      </div>
    );
  }
};
