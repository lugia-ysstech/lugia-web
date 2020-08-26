/***
 * @flow
 * create by szfeng
 */

import React, { Component } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 80%;
  height: 900px;
  margin: 10px auto;
  background: #d9d9d9;
  box-sizing: border-box;
`;

const RowFlexWrap = styled.div`
  width: 100%;
  display: flex;
  height: ${props => props.height};
  border: 2px solid #fff;
`;

const ColFlexWrap = styled.div`
  width: ${props => props.width};
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid #fff;
`;

class PageLayout extends Component {
  getFlexWrap = (type: 'row' | 'col') => {
    return type === 'row' ? RowFlexWrap : ColFlexWrap;
  };

  getPageLayoutComponent = (data: Object = []): null | React.Node => {
    if (data.length === 0) {
      return null;
    }
    return data.map((item: Object): React.Node => {
      const { id = '', type = 'row', size = {}, children = [] } = item;
      const { width = '100%', height = '100%' } = size;
      const FlexWrap = this.getFlexWrap(type);
      return (
        <FlexWrap id={id} width={width} height={height}>
          {children.length === 0 ? null : this.getPageLayoutComponent(children)}
        </FlexWrap>
      );
    });
  };

  render() {
    const { data = [] } = this.props;
    return <Wrap>{this.getPageLayoutComponent(data)}</Wrap>;
  }
}

export default PageLayout;
