/*
 *   @flow
 */
import React from 'react';
import { DragPiece } from '../styled';
type TypeProps = {
  direction: string,
  onMouseDown?: Function,
  onMouseUp?: Function,
  onMouseMove?: Function,
};
export default class Piece extends React.Component<TypeProps, any> {
  constructor() {
    super();
    this.state = {
      top: false,
      right: false,
      bottom: false,
      left: false,
      topIsDown: false,
      rightIsDown: false,
      bottomIsDown: false,
      leftIsDown: false,
    };
  }

  onMouseDown = (e: Object) => {
    const { direction } = this.props;
    const newDirection = this.directionSign(direction);
    const { onMouseDown } = this.props;
    if (onMouseDown) {
      onMouseDown(e, direction, newDirection);
    }
  };
  onMouseMove = (e: Object) => {
    const { onMouseMove, direction } = this.props;
    if (onMouseMove) {
      onMouseMove(e, direction);
    }
  };
  onMouseUp = () => {
    const { onMouseUp, direction } = this.props;
    if (onMouseUp) {
      onMouseUp(direction);
    }
  };
  directionSign = (param: string) => {
    return `${param}Piece`;
  };
  addListener = () => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
  componentDidMount() {
    this.addListener();
  }

  render() {
    const { direction } = this.props;
    return <DragPiece direction={direction} onMouseDown={this.onMouseDown} />;
  }
}
