import React, { Component } from 'react';
import styled from 'styled-components';

const DEFAULTMARGIN = 6;

const FlexRowLine = styled.div`
  width: 100%;
  height: ${DEFAULTMARGIN}px;
  cursor: s-resize;
  background: #fff;
`;

const FlexColLine = styled.div`
  width: ${DEFAULTMARGIN}px;
  height: 100%;
  cursor: w-resize;
  background: #fff;
`;

class Line extends Component {
  onMouseDown = event => {
    const { onMouseDown } = this.props;
    onMouseDown && onMouseDown(event);
  };

  render() {
    const { type = 'col' } = this.props;
    const FlexLine = type === 'row' ? FlexRowLine : FlexColLine;
    return <FlexLine onMouseDown={this.onMouseDown} />;
  }
}

export default Line;
