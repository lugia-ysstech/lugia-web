import React, { Component } from 'react';
import PagesEditPanel from './PagesEditPanel';

type PageLayoutWrapProps = {};

type PageLayoutWrapState = {
  visible: boolean,
  allHiddenInfo: Object,
  isShowSelectModel: boolean,
  selectData: Object[],
  selectKey: string,
};

class PageLayoutWrap extends Component<PageLayoutWrapProps, PageLayoutWrapState> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      allHiddenInfo: {},
      isShowSelectModel: false,
      selectData: [],
      selectKey: '',
    };
    this.initHiddenInfo = {};
    this.initHiddenInfoChangeEvents = {};
  }

  componentDidMount() {
    const keys = Object.keys(this.initHiddenInfo);
    const isShowSelectModel = keys.length > 1;
    let selectData = [];
    if (isShowSelectModel) {
      selectData = this.getSelectData(keys, this.initHiddenInfo);
    }

    const selectKey = keys[0];
    this.setState({
      allHiddenInfo: this.initHiddenInfo,
      isShowSelectModel,
      selectData,
      selectKey,
    });
    this.selectKey = selectKey;
    document.body.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.onKeyPress);
  }

  getSelectData = (keys, initHiddenInfo) => {
    const selectData = [];
    keys.forEach(key => {
      const item = initHiddenInfo[key];
      const { title = '' } = item || {};
      const target = {
        value: key,
        text: title,
      };
      selectData.push(target);
    });
    return selectData;
  };

  onClose = () => {
    this.setState({
      visible: false,
      selectKey: this.selectKey,
    });
  };

  open = () => {
    this.setState({
      visible: true,
      allHiddenInfo: this.initHiddenInfo,
    });
  };

  onKeyPress = (event: Object) => {
    const { visible = false } = this.state;
    if (event.key === 'F9') {
      if (visible) {
        this.onClose();
      } else {
        this.open();
      }
    }
  };

  getChildProps = () => {
    return {
      __initHiddenInfo__: this.initHiddenInfo,
      __initHiddenInfoChangeEvents__: this.initHiddenInfoChangeEvents,
    };
  };

  getCloneChildren = (children: Object) => {
    return React.Children.map(children, child => {
      return React.cloneElement(child, this.getChildProps());
    });
  };

  onSelectKeyChange = (selectKey: string) => {
    this.selectKey = selectKey;
  };

  onAllHiddenInfoChange = newAllHiddenInfo => {
    const { allHiddenInfo = {} } = this.state;
    if (JSON.stringify(allHiddenInfo) !== JSON.stringify(newAllHiddenInfo)) {
      for (const key in newAllHiddenInfo) {
        const item = allHiddenInfo[key];
        const newItem = newAllHiddenInfo[key];
        if (JSON.stringify(item) !== JSON.stringify(newItem)) {
          const { hiddenInfo = {}, title } = newItem;
          const onHiddenInfoChange = this.initHiddenInfoChangeEvents[key];
          onHiddenInfoChange && onHiddenInfoChange({ title, hiddenInfo });
        }
      }
    }

    setTimeout(() => {
      this.onClose();
    }, 300);
  };

  render() {
    const {
      visible = false,
      allHiddenInfo = {},
      isShowSelectModel = false,
      selectData = [],
      selectKey = '',
    } = this.state;

    const { children } = this.props;
    return !children ? null : (
      <React.Fragment>
        {this.getCloneChildren(children)}
        {visible ? (
          <PagesEditPanel
            isShowSelectModel={isShowSelectModel}
            allHiddenInfo={allHiddenInfo}
            selectKey={selectKey}
            selectData={selectData}
            onChange={this.onAllHiddenInfoChange}
            onClose={this.onClose}
            onSelectKeyChange={this.onSelectKeyChange}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default PageLayoutWrap;
