import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '../icon';
import Select from '../select';

const PagesEditWrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const PagesEditContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 30px;
  flex: 1;
`;

const BottomWrap = styled.div`
  width: 100%;
  height: 100px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

const CommonButton = styled.div`
  width: 180px;
  height: 32px;
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
  user-select: none;
`;

const SelectWrap = styled.div`
  width: 200px;
  margin-left: 30px;
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
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: transparent;
  }
  &:hover::-webkit-scrollbar-thumb {
    background: #c2c2c2;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #bdbdbd;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &:hover > div:nth-child(2) {
    opacity: 1;
  }
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

type PagesEditPanelProps = {
  isShowSelectModel: boolean,
  allHiddenInfo: Object,
  selectKey: string,
  selectData: Object[],
  onChange: Function,
  onClose: Function,
  onSelectKeyChange: Function,
};

type PagesEditPanelState = {
  allHiddenInfo: Object,
  isShowSelectModel: boolean,
  selectKey: string,
};

class PagesEditPanel extends Component<PagesEditPanelProps, PagesEditPanelState> {
  constructor(props) {
    super(props);
    const { isShowSelectModel = false, allHiddenInfo = {}, selectKey = '' } = props;
    this.state = {
      allHiddenInfo,
      isShowSelectModel,
      selectKey,
    };

    this.allHiddenInfo = JSON.parse(JSON.stringify(allHiddenInfo));
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

  getInfo = (allHiddenInfo: Object, selectKey: Object) => {
    const { hiddenInfo = {}, contentInfo = {} } = this.getSelectInfo(allHiddenInfo, selectKey);
    const contentKeys = this.getContentKeys(contentInfo);
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

  getSelectInfo = (allHiddenInfo: Object, selectKey: Object) => {
    const selectItem = allHiddenInfo[selectKey];
    if (selectItem) {
      return selectItem;
    }
    return {};
  };

  onClose = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };

  onClickShowTag = (targetId: string) => () => {
    const { allHiddenInfo = {}, selectKey = '' } = this.state;
    let newAllHiddenInfo = JSON.parse(JSON.stringify(allHiddenInfo));

    const selectInfo = this.getSelectInfo(newAllHiddenInfo, selectKey);
    const { hiddenInfo = {} } = selectInfo;
    selectInfo.hiddenInfo = { ...hiddenInfo, [targetId]: true };
    newAllHiddenInfo = { ...allHiddenInfo, [selectKey]: selectInfo };
    this.setState({
      allHiddenInfo: newAllHiddenInfo,
    });
  };

  getShowItemTags = (showKeys: string[]) => {
    if (showKeys.length === 0) {
      return null;
    }
    const { allHiddenInfo = {}, selectKey = '' } = this.state;
    const { contentInfo = {} } = this.getSelectInfo(allHiddenInfo, selectKey);

    return showKeys.map(id => {
      const { title = id } = contentInfo[id];
      return <ItemTag onClick={this.onClickShowTag(id)}>{title}</ItemTag>;
    });
  };

  onClickHiddenTag = (targetId: string) => () => {
    const { allHiddenInfo = {}, selectKey = '' } = this.state;
    let newAllHiddenInfo = JSON.parse(JSON.stringify(allHiddenInfo));
    const selectInfo = this.getSelectInfo(newAllHiddenInfo, selectKey);
    const { hiddenInfo = {} } = selectInfo;
    delete hiddenInfo[targetId];

    newAllHiddenInfo = { ...newAllHiddenInfo, [selectKey]: selectInfo };
    this.setState({
      allHiddenInfo: newAllHiddenInfo,
    });
  };

  getHiddenItemTags = (hiddenKeys: string[]) => {
    if (hiddenKeys.length === 0) {
      return null;
    }
    const { allHiddenInfo = {}, selectKey = '' } = this.state;
    const { contentInfo = {} } = this.getSelectInfo(allHiddenInfo, selectKey);

    return hiddenKeys.map(id => {
      const { title = id } = contentInfo[id];
      return <ItemTag onClick={this.onClickHiddenTag(id)}>{title}</ItemTag>;
    });
  };

  onChange = () => {
    const { onChange } = this.props;
    const { allHiddenInfo = {} } = this.state;
    onChange && onChange(allHiddenInfo);
  };

  onSelectKeyChange = obj => {
    const { newValue } = obj;
    this.setState({
      selectKey: newValue,
    });
    const { onSelectKeyChange } = this.props;
    onSelectKeyChange && onSelectKeyChange(newValue);
  };

  render() {
    const { allHiddenInfo = {}, isShowSelectModel = false, selectKey = '' } = this.state;
    const { selectData = [] } = this.props;
    const { showKeys = [], hiddenKeys = [] } = this.getInfo(allHiddenInfo, selectKey);

    return (
      <PagesEditWrap>
        <CloseEditIconWrap onClick={this.onClose}>
          <Icon iconClass={'lugia-icon-reminder_close'} />
        </CloseEditIconWrap>
        <PagesEditContainer>
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
        </PagesEditContainer>
        <BottomWrap>
          {isShowSelectModel ? (
            <SelectWrap>
              <Select
                data={selectData}
                value={selectKey}
                createPortal={false}
                valueField={'value'}
                displayField={'text'}
                isShowClearButton={false}
                onSelect={this.onSelectKeyChange}
              />
            </SelectWrap>
          ) : null}
          <OkButton onClick={this.onChange}>确定</OkButton>
        </BottomWrap>
      </PagesEditWrap>
    );
  }
}

export default PagesEditPanel;
