import React from 'react';
import styled from 'styled-components';
const MockDemo = styled.div`
  height: 200px;
  width: 300px;
  background: red;
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: 200;
`;
export default class Com extends React.Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      isUp: true,
      isDown: false,
    };
    this.isDown = true;
  }
  mouseDown = e => {
    if (!this.isDown) {
      return;
    }
    this.setMoveState(true);
  };
  mouseMove = e => {
    const { isDown, isUp } = this.state;
    if (!isDown) {
      return;
    }
    if (isUp) {
      return;
    }
    setTimeout(() => {
      const { clientX: x, clientY: y } = e;
      this.setState({ x, y });
    }, 20);
  };
  onMouseUp = e => {
    this.setMoveState(false);
  };
  setMoveState = action => {
    this.setState({ isDown: action, isUp: !action });
  };
  closeEvent = () => {
    this.isDown = false;
  };
  openEvent = () => {
    this.isDown = true;
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.mouseDown);
    document.removeEventListener('mousedove', this.mouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.mouseDown);
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }
  render() {
    const { x, y } = this.state;
    return (
      <MockDemo x={x} y={y}>
        dsadsafdsd
      </MockDemo>
    );
  }
}
