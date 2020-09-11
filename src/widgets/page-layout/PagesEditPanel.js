import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '../icon';

const PagesEditWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 30px;
`;

const CommonButton = styled.div`
  width: 180px;
  height: 40px;
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  cursor: pointer;
`;

const OkButton = styled(CommonButton)`
  color: #fff;
  right: 250px;
  background: #4d63ff;
`;

const ResetButton = styled(CommonButton)`
  right: 30px;
  border: 1px solid #666;
`;

const CloseEditIconWrap = styled.div`
  width: 22px;
  height: 22px;
  font-size: 22px;
  position: absolute;
  right: 20px;
  top: 10px;
  user-select: none;
  cursor: pointer;
`;

const ItemContainer = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
`;

const ContainerLine = styled.div`
  width: 2px;
  height: 100%;
  background: #e8e8e8;
`;

const ItemTitle = styled.div`
  height: 80px;
  width: 100%;
  padding: 0 20px;
  font-size: 20px;
  font-weight: 800;
  & > span {
    font-size: 12px;
    color: #50575d;
  }
`;

const ItemsWrap = styled.div`
  flex: 1;
  padding: 0 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ItemTag = styled.div`
  width: 80%;
  height: 60px;
  background: #fff;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin: 10px 0;
  transition: all 0.3s;
  box-shadow: 0 0 10px #e8e8e8;
  &:hover {
    box-shadow: 0 0 10px #4d63ff;
  }
`;

class PagesEditPanel extends Component {
  constructor(props) {
    super(props);
    const { hiddenInfo = {}, contentKeys = [] } = props;
    const { showKeys = [], hiddenKeys = [] } = this.getKeys(contentKeys, hiddenInfo);
    this.state = {
      showKeys,
      hiddenKeys,
    };
    this.initShowKeys = showKeys;
    this.initHiddenKeys = hiddenKeys;
  }

  getKeys = (contentKeys: Object, hiddenInfo: Object) => {
    const showKeys = [];
    const hiddenKeys = [];
    contentKeys.forEach(id => {
      if (hiddenInfo[id]) {
        hiddenKeys.push(id);
      } else {
        showKeys.push(id);
      }
    });
    return {
      showKeys,
      hiddenKeys,
    };
  };

  onClose = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };

  onClickShowTag = (targetId: string) => () => {
    const { showKeys = [], hiddenKeys = [] } = this.state;
    const newShowKeys = showKeys.filter(id => id !== targetId);
    const newHiddenKeys = [...hiddenKeys];
    newHiddenKeys.unshift(targetId);

    this.setState({
      showKeys: newShowKeys,
      hiddenKeys: newHiddenKeys,
    });
  };

  getShowItemTags = (showKeys: string[]) => {
    if (showKeys.length === 0) {
      return null;
    }
    const { titleInfo = {} } = this.props;
    return showKeys.map(id => {
      const title = titleInfo[id] ? titleInfo[id] : id;
      return <ItemTag onClick={this.onClickShowTag(id)}>{title}</ItemTag>;
    });
  };

  onClickHiddenTag = (targetId: string) => () => {
    const { showKeys = [], hiddenKeys = [] } = this.state;
    const newHiddenKeys = hiddenKeys.filter(id => id !== targetId);
    const newShowKeys = [...showKeys];
    newShowKeys.unshift(targetId);
    this.setState({
      showKeys: newShowKeys,
      hiddenKeys: newHiddenKeys,
    });
  };

  getHiddenItemTags = (hiddenKeys: string[]) => {
    if (hiddenKeys.length === 0) {
      return null;
    }
    const { titleInfo = {} } = this.props;

    return hiddenKeys.map(id => {
      const title = titleInfo[id] ? titleInfo[id] : id;
      return <ItemTag onClick={this.onClickHiddenTag(id)}>{title}</ItemTag>;
    });
  };

  onChange = () => {
    const { onChange } = this.props;
    const { showKeys = [], hiddenKeys = [] } = this.state;
    const hiddenInfo = {};
    if (hiddenKeys.length !== 0) {
      hiddenKeys.forEach(id => {
        hiddenInfo[id] = true;
      });
    }
    onChange && onChange(hiddenInfo);
  };

  onReset = () => {
    this.setState({
      showKeys: this.initShowKeys,
      hiddenKeys: this.initHiddenKeys,
    });
  };

  render() {
    const { showKeys = [], hiddenKeys = [] } = this.state;
    return (
      <PagesEditWrap>
        <CloseEditIconWrap onClick={this.onClose}>
          <Icon iconClass={'lugia-icon-reminder_close'} />
        </CloseEditIconWrap>
        <ItemContainer>
          <ItemTitle>
            <p>页面显示区域</p>
            <span>Interface area</span>
          </ItemTitle>
          <ItemsWrap>{this.getShowItemTags(showKeys)}</ItemsWrap>
        </ItemContainer>
        <ContainerLine />
        <ItemContainer>
          <ItemTitle>
            <p>隐藏区域</p>
            <span>Hidden area</span>
          </ItemTitle>
          <ItemsWrap>{this.getHiddenItemTags(hiddenKeys)}</ItemsWrap>
        </ItemContainer>
        <OkButton onClick={this.onChange}>确定</OkButton>
        <ResetButton onClick={this.onReset}>重置</ResetButton>
      </PagesEditWrap>
    );
  }
}

export default PagesEditPanel;
