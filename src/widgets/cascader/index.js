/**
 *
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
import ThemeProvider from '../theme-provider';

const CascaderContainer = styled.div`
  display: inline-block;
  position: relative;
`;

type CascaderProps = {
  getTheme?: Function,
  offsetY: number,
  offsetX: number,
  action?: string,
  placeholder?: string,
  data?: Object[],
  onClick?: Function,
  separator?: string,
  value: string[] | string,
  selectedKeys: string[],
  disabled: boolean,
  displayField: string,
  valueField: string,
  popupVisible?: boolean,
};
type CascaderState = {
  popupVisible: boolean,
  checked: boolean,
  mouseInTarget: boolean,
  value: [] | string[],
};

class Cascader extends React.Component<CascaderProps, CascaderState> {
  static defaultProps = {
    offsetY: 0,
    offsetX: 0,
    disabled: false,
    popupVisible: false,
    getTheme: () => {
      return {};
    },
  };
  constructor(props: CascaderProps) {
    super(props);
    const { popupVisible } = props;
    this.state = {
      popupVisible: popupVisible ? popupVisible : false,
      checked: false,
      mouseInTarget: false,
      value: props.value ? props.value : [],
    };
  }

  render() {
    const { props, state } = this;
    const { popupVisible, value } = state;
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
            onPopupVisibleChange={this.onPopupVisibleChange}
          >
            <InputTag
              onClick={this.handleClickInputTag}
              value={value}
              displayValue={value}
              mutliple={false}
              placeholder={placeholder}
              disabled={disabled}
            />
          </Trigger>
        </Theme>
      </CascaderContainer>
    );
  }

  handleClickInputTag = () => {
    const { checked, mouseInTarget } = this.state;
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    console.log('checked', checked);
    if (checked) {
      this.setState({ checked: false });
      return;
    }

    this.setState({ popupVisible: true, checked: true });
  };

  getMenu = (theme: Object) => {
    const { data, action, selectedKeys, separator, offsetX, valueField, displayField } = this.props;
    const { popupVisible } = this.state;
    const { menuWidth = 150 } = theme;
    return (
      <Theme config={{ [Widget.Menu]: { width: menuWidth } }}>
        <Menu
          mutliple={false}
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
          offsetX={offsetX}
          offsetY={0}
          onClear={this.onClear}
        />
      </Theme>
    );
  };

  handleIsInMenu = popupVisible => {
    const { checked, mouseInTarget } = this.state;
    if (!popupVisible) {
      if (checked && !mouseInTarget) {
        this.setState({ popupVisible, checked: false });
      }
      this.setState({ popupVisible });
    }
  };

  onClick = (event, keys, item) => {
    const { selectedKeys } = keys;
    const { children } = item;
    if (!children) {
      this.setState({ popupVisible: false });
    }
    this.setState({ value: selectedKeys });
    const { onClick } = this.props;
    onClick && onClick(event, keys, item);
  };

  onClear = (e: Object) => {
    const { onClear } = this.props;
    onClear && onClear(e);
  };

  onChange = (target: Object) => {
    const { onChange } = this.props;
    onChange && onChange(target);
  };

  onPopupVisibleChange = () => {
    console.log('onPopupVisibleChange');
  };

  onMouseEnterContainer = () => {
    this.setState({ mouseInTarget: true });
  };

  onMouseLeaveContainer = () => {
    this.setState({ mouseInTarget: false });
  };
}

export default ThemeProvider(Cascader, Widget.Cascader);
