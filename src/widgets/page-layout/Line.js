import React, { Component } from 'react';
import styled from 'styled-components';
import { defaultMargin, typeType } from './utils';

const CommonFlexLine = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;

  &:hover {
    background: #4d63ff;
  }
`;

const FlexRowLine = styled(CommonFlexLine)`
  height: ${defaultMargin}px;
  cursor: s-resize;
`;

const FlexColLine = styled(CommonFlexLine)`
  width: ${defaultMargin}px;
  cursor: w-resize;
`;

type LineProps = {
  type: typeType,
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
