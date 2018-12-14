/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Menu from '../menu';
import Theme from '../theme';
import Widget from '../consts/index';
import styled from 'styled-components';
import Trigger from '../trigger';
import InputTag from '../inputtag';
import { getTreeData } from '../menu/utils';
import { DisplayField, ValueField } from '../consts/props';
import {
  isHasValue,
  getValue,
  getInitExpandedPath,
  getInitInputValue,
  getInputValue,
} from './utils';
const CascaderContainer = styled.div`
  display: inline-block;
  position: relative;
`;

type CascaderProps = {
  getTheme: Function,
  offsetY: number,
  offsetX: number,
  action?: string,
  placeholder?: string,
  data?: Object[],
  onClick?: Function,
  onClear?: Function,
  onChange?: Function,
  separator?: string,
  value: string[],
  displayValue?: string[],
  defaultValue?: string[],
  selectedKeys: string[],
  disabled: boolean,
  displayField: string,
  valueField: string,
  popupVisible?: boolean,
  showAllLevels?: boolean,
  allowClear?: boolean,
};
type CascaderState = {
  popupVisible: boolean,
  value: string[],
  expandedPath: string[],
  inputValue: string[],
  treeData: Array<Object>,
  selectedKeys: string[],
};

export default class Cascader extends React.Component<CascaderProps, CascaderState> {
  static defaultProps = {
    offsetY: 5,
    offsetX: 2,
    disabled: false,
    popupVisible: false,
    getTheme: () => {},
    showAllLevels: true,
    displayField: DisplayField,
    valueField: ValueField,
    allowClear: true,
  };

  checked: boolean;
  mouseInTarget: boolean;
  menu: Object;

  constructor(props: CascaderProps) {
    super(props);
    this.state = {
      popupVisible: false,
      value: getValue(props, null),
      expandedPath: getInitExpandedPath(props),
      selectedKeys: getInitExpandedPath(props),
      inputValue: getInitInputValue(props),
      treeData: getTreeData(props),
    };
    this.menu = React.createRef();
  }

  static getDerivedStateFromProps(props: CascaderProps, state: CascaderState) {
    if (!state) {
      return {};
    }

    return {
      value: getValue(props, state),
      selectedKeys: state.value,
      expandedPath: state.expandedPath,
      inputValue: getInputValue(props, state),
    };
  }

  render() {
    const { props, state } = this;
    const { popupVisible, inputValue } = state;
    const { getTheme, placeholder, offsetY, disabled } = props;
    const theme = getTheme();
    const { width = 200 } = theme;
    return (
      <CascaderContainer
        onMouseEnter={this.onMouseEnterContainer}
        onMouseLeave={this.onMouseLeaveContainer}
      >
        <Theme config={{ [Widget.InputTag]: { width } }}>
          <Trigger
            align={'bottomLeft'}
            offsetY={offsetY}
            popupVisible={popupVisible}
            popup={this.getMenu(theme)}
            createPortal
          >
            <InputTag
              onClick={this.handleClickInputTag}
              value={inputValue}
              displayValue={inputValue}
              mutliple={false}
              placeholder={placeholder}
              disabled={disabled}
              onClear={this.onClear}
            />
          </Trigger>
        </Theme>
      </CascaderContainer>
    );
  }

  setPopupVisible(popupVisible: boolean, otherTarget?: Object = {}) {
    this.checked = popupVisible;
    this.setState({ popupVisible, ...otherTarget });
  }

  handleClickInputTag = () => {
    const { props } = this;
    const { disabled } = props;
    if (disabled) {
      return;
    }

    const { checked } = this;
    this.changeCheckedAndSetVisible(checked);
  };

  changeCheckedAndSetVisible(checked: boolean) {
    this.setPopupVisible(!checked);
  }

  getMenu = (theme: Object) => {
    const { data, action, separator, offsetX, valueField, displayField } = this.props;
    const { popupVisible, expandedPath, selectedKeys } = this.state;
    const { menuWidth = 150 } = theme;

    return (
      <Theme config={{ [Widget.Menu]: { width: menuWidth } }}>
        <Menu
          mutliple={false}
          ref={this.menu}
          action={action}
          popupVisible={popupVisible}
          onChange={this.onChange}
          handleIsInMenu={this.handleIsInMenu}
          data={data}
          displayField={displayField}
          valueField={valueField}
          onClick={this.onClick}
          separator={separator}
          selectedKeys={selectedKeys}
          expandedPath={expandedPath}
          offsetX={offsetX}
          offsetY={0}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onExpandPathChange={this.onExpandPathChange}
        />
      </Theme>
    );
  };

  handleIsInMenu = (isInMenuRange: boolean) => {
    const { checked, mouseInTarget } = this;
    if (mouseInTarget) {
      return;
    }
    if (!isInMenuRange && checked) {
      this.setPopupVisible(false, { expandedPath: this.state.value });
    }
  };

  onClick = (event: Object, keys: Object, item: Object) => {
    const { selectedKeys } = keys;

    let inputValueState = {};
    if (!item || !item.children || item.children.length === 0) {
      this.setPopupVisible(false);

      const { showAllLevels } = this.props;
      if (showAllLevels === false) {
        inputValueState = { inputValue: selectedKeys };
      }
    }

    this.setState({ value: selectedKeys, expandedPath: selectedKeys, ...inputValueState });

    const { onClick } = this.props;
    onClick && onClick(event, keys, item);
  };

  onMouseEnter = (event: Object, expandedPath: string[]) => {
    this.enterTarget();
  };

  onExpandPathChange = (expandedPath: string[]) => {
    const { action } = this.props;
    if (action !== 'hover') {
      return;
    }

    this.setState({ expandedPath });
  };

  onMouseLeave = () => {
    this.leaveTarget();
  };

  onClear = (e: Object) => {
    const { onClear, allowClear } = this.props;

    onClear && onClear(e);
    if (!allowClear || isHasValue(this.props)) {
      return;
    }

    this.setPopupVisible(false, { expandedPath: [], value: [], inputValue: [] });
  };

  onChange = (target: Object) => {
    const { onChange } = this.props;
    onChange && onChange(target);
  };

  onMouseEnterContainer = () => {
    this.enterTarget();
  };

  onMouseLeaveContainer = () => {
    this.leaveTarget();
  };

  enterTarget() {
    this.mouseInTarget = true;
  }

  leaveTarget() {
    this.mouseInTarget = false;
  }

  componentDidUpdate() {
    if (this.menu && this.menu.current) {
      this.menu.current.getThemeTarget().scrollerTarget.forceAlign();
    }
  }
}
