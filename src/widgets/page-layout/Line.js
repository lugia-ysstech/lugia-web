import React, { Component } from 'react';
import styled from 'styled-components';

const DEFAULTMARGIN = 4;

const CommonFlexLine = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;

  &:hover {
    background: #4d63ff;
  }
`;

const FlexRowLine = styled(CommonFlexLine)`
  height: ${DEFAULTMARGIN}px;
  cursor: s-resize;
`;

const FlexColLine = styled(CommonFlexLine)`
  width: ${DEFAULTMARGIN}px;
  cursor: w-resize;
`;

type LineProps = {
  type: 'col' | 'row',
  onMouseDown: Function,
};

type LineState = {};

class Line extends Component<LineProps, LineState> {
  onMouseDown = event => {
    const { onMouseDown } = this.props;
    onMouseDown && onMouseDown(event);
  };

  render() {
    const { type = 'col' } = this.props;
    return type === 'row' ? (
      <FlexRowLine type={'row'} onMouseDown={this.onMouseDown} />
    ) : (
      <FlexColLine type={'col'} onMouseDown={this.onMouseDown} />
    );
  }
}

export default Line;
