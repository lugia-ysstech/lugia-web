import React, { Component } from 'react';
import Icon from '../icon';
import styled, { keyframes } from 'styled-components';
import PagesEditPanel from './PagesEditPanel';

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
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 99999;
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
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 16px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 2px;
`;

class EnlargeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      content: null,
      isPage: false,
    };
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.onKeyPress);
  }

  getContentKeys = (contentInfo: Object) => {
    const contentKeys = [];
    for (const key in contentInfo) {
      if (contentInfo[key]) {
        contentKeys.push(key);
      }
    }
    return contentKeys;
  };

  onKeyPress = (event: Object) => {
    const { visible = false, content = null } = this.state;
    if (event.key === 'F9') {
      if (visible) {
        this.onClose();
      } else {
        const { contentInfo = {}, hiddenInfo = {}, titleInfo = {} } = this.props;
        const contentKeys = this.getContentKeys(contentInfo);
        if (!content && contentKeys.length !== 0) {
          this.setState({
            visible: true,
            isPage: false,
            content: (
              <PagesEditPanel
                onClose={this.onClose}
                contentKeys={contentKeys}
                hiddenInfo={hiddenInfo}
                titleInfo={titleInfo}
                onChange={this.onHiddenInfoChange}
              />
            ),
          });
        }
      }
      return;
    }
    if (!visible) {
      return;
    }
    if (event.key === 'Escape') {
      this.onClose();
    }
  };

  onHiddenInfoChange = (hiddenInfo: Object) => {
    const { onHiddenInfoChange } = this.props;
    onHiddenInfoChange && onHiddenInfoChange(hiddenInfo);
    setTimeout(() => {
      this.setState({
        visible: false,
        content: null,
      });
    }, 100);
  };

  setVisible = (visible: boolean, content: any, id: string) => {
    this.setState({
      visible,
      content,
      isPage: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      content: null,
      isPage: false,
    });
  };

  render() {
    const { content, visible = false, isPage = false } = this.state;

    return visible ? (
      <EnlargeWrap visible={visible}>
        <ContentWrap>{content}</ContentWrap>
        {isPage ? (
          <CloseIconWrap onClick={this.onClose}>
            <Icon iconClass={'lugia-icon-logo_codepen'} />
          </CloseIconWrap>
        ) : null}
      </EnlargeWrap>
    ) : null;
  }
}

export default EnlargeContainer;
