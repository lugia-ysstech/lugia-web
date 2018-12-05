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
  inputValu: string | string[],
};
type CascaderState = {
  popupVisible: boolean,
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

  checked: boolean;
  mouseInTarget: boolean;
  menu: Object;

  constructor(props: CascaderProps) {
    super(props);
    const { popupVisible } = props;
    this.state = {
      popupVisible: popupVisible ? popupVisible : false,
      value: props.value ? props.value : [],
      expandedPath: props.value ? props.value : [],
    };
    this.menu = React.createRef();
  }

  render() {
    const { props, state } = this;
    const { popupVisible, value } = state;
    const { getTheme, placeholder, offsetY, disabled, inputValue = value } = props;
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
            onPopupVisibleChange={this.onPopupVisibleChange}
          >
            <InputTag
              onClick={this.handleClickInputTag}
              value={inputValue}
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
    const { checked } = this;
    const { disabled } = this.props;

    if (disabled) {
      return;
    }
    const { popupVisible } = this.state;
    if (popupVisible) {
      return;
    }
    if (checked) {
      this.checked = false;
      return;
    }
    this.checked = true;
    this.setState({ popupVisible: true });
  };

  getMenu = (theme: Object) => {
    const { data, action, separator, offsetX, valueField, displayField } = this.props;
    const { popupVisible, expandedPath, value } = this.state;
    const { menuWidth = 150 } = theme;
    console.info('king', value, 'separator', separator, 'popupVisible', popupVisible);
    return (
      <Theme config={{ [Widget.Menu]: { width: menuWidth } }}>
        <Menu
          mutliple={false}
          ref={this.menu}
          // action={action}
          popupVisible={popupVisible}
          // onChange={this.onChange}
          // handleIsInMenu={this.handleIsInMenu}
          data={data}
          // displayField={displayField}
          // valueField={valueField}
          onClick={this.onClick}
          separator={separator}
          selectedKeys={value}
          expandedPath={value}
          // offsetX={offsetX}
          offsetY={0}
          // onClear={this.onClear}
          // onMouseEnter={this.onMouseEnter}
        />
      </Theme>
    );
  };

  handleIsInMenu = popupVisible => {
    const { checked } = this;
    const { mouseInTarget } = this;
    if (!popupVisible) {
      if (checked && !mouseInTarget) {
        this.checked = false;
      }
      this.setState({ popupVisible });
    }
  };

  onClick = (event, keys, item) => {
    const { selectedKeys } = keys;
    // const { children } = item;
    // if (!children) {
    //   this.setState({ popupVisible: false });
    // }
    // console.log('selectedKeys', selectedKeys);
    this.setState({ value: selectedKeys });
    const { onClick } = this.props;
    console.log('cascader', selectedKeys);
    onClick && onClick(event, keys, item);
  };

  onMouseEnter = (expandedPath: strting[]) => {
    // this.setState({ expandedPath });
    // console.log('expandedPath+++++++++++', expandedPath);
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
    // console.log('onPopupVisibleChange');
  };

  onMouseEnterContainer = () => {
    this.mouseInTarget = true;
  };

  onMouseLeaveContainer = () => {
    this.mouseInTarget = false;
  };

  componentDidUpdate() {
    if (this.menu) {
      this.menu.current.getThemeTarget().scrollerTarget.forceAlign();
    }

    console.info('king cascader didupdate');
  }
}

export default ThemeProvider(Cascader, Widget.Cascader);
