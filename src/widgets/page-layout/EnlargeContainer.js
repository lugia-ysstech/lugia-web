import React, { Component } from 'react';
import Icon from '../icon';
import styled, { keyframes } from 'styled-components';

const openAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const EnlargeWrap = styled.div`
  width: 0;
  height: 0;
  background: #000;
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 10000;
  position: fixed;
  left: 0;
  top: 0;
  animation: ${props => (props.visible ? openAnimation : null)} 0.2s ease-in-out;
`;

const ContentWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseIconWrap = styled.div`
  width: 20px;
  height: 20px;
  background: #fff;
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 2px;
`;

type EnlargeContainerProps = {};

type EnlargeContainerState = {
  visible: boolean,
  content: React.Node | null,
};

class EnlargeContainer extends Component<EnlargeContainerProps, EnlargeContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      content: null,
    };
    const { wrapId = '' } = props;
    this.containerId = `${wrapId}-enlarge-container`;
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.onKeyPress);
  }

  onKeyPress = (event: Object) => {
    const { visible = false } = this.state;
    if (!visible) {
      return;
    }
    if (event.key === 'Escape') {
      this.onClose();
    }
  };

  setVisible = (visible: boolean, content: any) => {
    this.setState(
      {
        visible,
        content,
      },
      () => {
        const node = document.getElementById(this.containerId);
        this.cloneNode = node;
        node.parentNode.removeChild(node);

        node.style.left = '0px';
        node.style.top = '0px';
        node.style.width = '100vw';
        node.style.height = '100vh';
        document.body.appendChild(node);
      }
    );
  };

  onClose = () => {
    document.body.removeChild(this.cloneNode);
    const { wrapId } = this.props;
    const wrapNode = document.getElementById(wrapId);
    wrapNode.appendChild(this.cloneNode);
    this.cloneNode = null;
    this.setState({
      visible: false,
      content: null,
    });
  };

  render() {
    const { content, visible = false } = this.state;

    return visible ? (
      <EnlargeWrap id={this.containerId} visible={visible}>
        <ContentWrap>{content}</ContentWrap>
        <CloseIconWrap onClick={this.onClose}>
          <Icon iconClass={'lugia-icon-reminder_close'} />
        </CloseIconWrap>
      </EnlargeWrap>
    ) : null;
  }
}

export default EnlargeContainer;
