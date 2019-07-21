/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Menu from '../menu';
import Widget from '../consts/index';
import Trigger from '../trigger';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import InputTag from '../inputtag';
import { getTreeData } from '../menu/utils';
import { deepMerge } from '@lugia/object-utils';
import { DisplayField, ValueField } from '../consts/props';
import {
  isHasValue,
  getValue,
  getInitExpandedPath,
  getInitInputValue,
  getInputValue,
} from './utils';

const CascaderContainer = CSSComponent({
  tag: 'div',
  className: 'CascaderContainer',
  normal: {
    selectNames: [['width'], ['height'], ['margin']],
  },
  hover: {
    selectNames: [],
  },

  css: css`
    display: inline-block;
    position: relative;
  `,
});

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
  disabled: boolean,
  displayField: string,
  valueField: string,
  createPortal?: boolean,
  showAllLevels?: boolean,
  allowClear?: boolean,
  menuWidth: number,
};
type CascaderState = {
  popupVisible: boolean,
  value: string[],
  expandedPath: string[],
  inputValue: string[],
  treeData: Array<Object>,
  selectedKeys: string[],
  getPartOfThemeProps: Function,
};

const DefaultMenuWidth = 150;

export default class Cascader extends React.Component<CascaderProps, CascaderState> {
  static defaultProps = {
    offsetY: 5,
    offsetX: 2,
    disabled: false,
    getTheme: () => {},
    showAllLevels: true,
    displayField: DisplayField,
    valueField: ValueField,
    allowClear: true,
    createPortal: false,
    menuWidth: DefaultMenuWidth,
  };

  checked: boolean;
  mouseInTarget: boolean;
  menu: Object;
  trigger: Object;

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
    const { getTheme, placeholder, offsetY, disabled, createPortal, getPartOfThemeProps } = props;
    const theme = getTheme();
    return (
      <CascaderContainer
        themeProps={getPartOfThemeProps(Widget.InputTag)}
        onMouseEnter={this.onMouseEnterContainer}
        onMouseLeave={this.onMouseLeaveContainer}
      >
        <Trigger
          ref={cmp => {
            this.trigger = cmp;
          }}
          align={'bottomLeft'}
          offsetY={offsetY}
          popupVisible={popupVisible}
          popup={this.getMenu(theme)}
          createPortal={createPortal}
          lazy={false}
        >
          <InputTag
            {...this.props.getPartOfThemeHocProps('InputTag')}
            onClick={this.handleClickInputTag}
            value={inputValue}
            displayValue={inputValue}
            mutliple={false}
            placeholder={placeholder}
            disabled={disabled}
            onClear={this.onClear}
          />
        </Trigger>
      </CascaderContainer>
    );
  }

  setPopupVisible(...rest: any[]) {
    this.trigger && this.trigger.setPopupVisible(...rest);
  }

  setPopupVisibleInner(popupVisible: boolean, otherTarget?: Object = {}) {
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
    this.setPopupVisibleInner(!checked);
  }

  getMenu = (theme: Object) => {
    const { data, action, separator, offsetX, valueField, displayField } = this.props;
    const { popupVisible, expandedPath, selectedKeys } = this.state;

    return (
      <Menu
        {...this.getMenuTheme()}
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
    );
  };

  mergeTheme = (target: string, defaultTheme: Object) => {
    const { viewClass, theme } = this.props.getPartOfThemeHocProps(target);

    const themeHoc = deepMerge(
      {
        [viewClass]: { ...defaultTheme },
      },
      theme
    );

    const newTheme = {
      viewClass,
      theme: themeHoc,
    };
    return newTheme;
  };

  getMenuTheme = () => {
    const { getPartOfThemeConfig } = this.props;
    const { InputTagWrap = {} } = getPartOfThemeConfig('InputTag');
    const { normal = {} } = InputTagWrap;
    const { width = 250 } = normal;
    const defaultMenuTheme = {
      MenuWrap: {
        normal: {
          width,
        },
      },
    };
    return this.mergeTheme('Menu', defaultMenuTheme);
  };

  getInputtagTheme = () => {
    const { getPartOfThemeConfig } = this.props;
    const config = {
      [Widget.InputTag]: getPartOfThemeConfig(Widget.InputTag),
    };
    return config;
  };

  handleIsInMenu = (isInMenuRange: boolean) => {
    const { checked, mouseInTarget } = this;
    if (mouseInTarget) {
      return;
    }
    if (!isInMenuRange && checked) {
      this.setPopupVisibleInner(false, { expandedPath: this.state.value });
    }
  };

  onClick = (event: Object, keys: Object, item: Object) => {
    const { selectedKeys } = keys;

    let inputValueState = {};
    if (!item || !item.children || item.children.length === 0) {
      this.setPopupVisibleInner(false);

      const { showAllLevels } = this.props;
      if (showAllLevels === false) {
        inputValueState = { inputValue: selectedKeys };
      }
    }

    this.setState({ value: selectedKeys, expandedPath: selectedKeys, ...inputValueState });

    const { onClick } = this.props;
    const obj = this.getExposeTarget(event, selectedKeys, item);
    onClick && onClick(obj);
  };

  getExposeTarget = (event: Object, selectedKeys: string[], item: Object) => {
    const obj = {};
    obj.event = event;
    obj.selectedKeys = selectedKeys;
    obj.item = item;
    return obj;
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

    this.setPopupVisibleInner(false, { expandedPath: [], value: [], inputValue: [] });
  };

  onChange = (target: Object) => {
    const { selectedKeys } = target;
    const { onChange } = this.props;
    onChange && onChange(selectedKeys);
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
      this.menu.current.innerMenu.current.getThemeTarget().scrollerTarget.current.forceAlign();
    }
  }
}
