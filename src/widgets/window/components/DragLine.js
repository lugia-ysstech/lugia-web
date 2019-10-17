/*
 *   @flow
 */
import React from 'react';
import { DragLIne } from '../styled';
type TypeProps = {
  direction: string,
  onMouseDown?: Function,
  onMouseUp?: Function,
  onMouseMove?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
};
export default class Line extends React.Component<TypeProps, any> {
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
  onMouseEnterArea = () => {
    const { direction } = this.props;
    const isDown = this.isDown();
    if (isDown) {
      return;
    }
    this.setState({ [direction]: true });
    const { onMouseEnter } = this.props;
    if (onMouseEnter) {
      onMouseEnter();
    }
  };
  onMouseLeaveArea = () => {
    const { direction } = this.props;
    const isDown = this.isDown();
    if (isDown) {
      return;
    }
    this.setState({ [direction]: false });
    const { onMouseLeave } = this.props;
    if (onMouseLeave) {
      onMouseLeave();
    }
  };
  onMouseDown = (e: Object) => {
    const { direction } = this.props;
    const key = this.isDownKey(direction);
    this.setState({ [key]: true });

    const { onMouseDown } = this.props;
    const newDirection = direction;
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
    this.resetState();
  };
  resetState = () => {
    this.setState({
      top: false,
      right: false,
      bottom: false,
      left: false,
      topIsDown: false,
      rightIsDown: false,
      bottomIsDown: false,
      leftIsDown: false,
    });
  };
  isDownKey = (param: string) => {
    return `${param}IsDown`;
  };
  isDown = () => {
    const { topIsDown, rightIsDown, bottomIsDown, leftIsDown } = this.state;
    return topIsDown || rightIsDown || bottomIsDown || leftIsDown;
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
    const { [direction]: stateDirection } = this.state;
    return (
      <DragLIne
        direction={stateDirection}
        position={direction}
        onMouseEnter={this.onMouseEnterArea}
        onMouseLeave={this.onMouseLeaveArea}
        onMouseDown={this.onMouseDown}
      />
    );
  }
}
