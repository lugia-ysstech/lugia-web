/**
 *
 * create by ZhangBoPing
 *
 * create date: 2018/04/09
 *
 * @flow
 */
import * as React from 'react';
import Widget from '../consts/index';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '../consts/KeyCode';
import { SwitchWrapper, SwitchInner } from './styled';

/* props type */
export type SwitchProps = {
  autoFocus?: boolean,
  prefixCls?: string,
  size?: 'small' | 'default',
  className?: string,
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: (checked: boolean) => any,
  checkedChildren?: string | React.Node,
  unCheckedChildren?: string | React.Node,
  disabled?: boolean,
  loading?: boolean,
};

/* state type */
export type SwitchState = {
  checked: boolean,
  disabled: boolean,
};

/* Class */
class Switch extends React.Component<SwitchProps, SwitchState> {
  el: any;

  static displayName = `_${Widget.Switch}`;

  constructor(props: SwitchProps) {
    super(props);

    const { defaultChecked = false, disabled = false, checked = defaultChecked } = this.props;
    this.state = {
      checked,
      disabled,
    };
  }

  toggle = (): void => {
    this.updateChecked(!this.state.checked);
  };

  updateChecked(checked: boolean): void {
    if (this.state.disabled) {
      return;
    }

    this.setState({
      checked,
    });
  }

  handleKeyDown = (event: SyntheticKeyboardEvent<EventTarget>): void => {
    const key = event.keyCode;

    if (key === LEFT_ARROW) this.updateChecked(false);
    if (key === RIGHT_ARROW) this.updateChecked(true);
    if (key === SPACE || key === ENTER) this.toggle();
  };

  focus(): void {
    if (this.el) {
      this.el.focus();
    }
  }

  blur(): void {
    if (this.el) {
      this.el.blur();
    }
  }

  cacheNode = (node: HTMLSpanElement): void => {
    this.el = node;
  };

  componentDidMount() {
    const { autoFocus, disabled } = this.props;
    if (autoFocus && !disabled) {
      this.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.onChange) {
      this.props.onChange(this.state.checked);
    }
  }

  componentWillUnmount() {
    this.el = null;
  }

  render() {
    const {
      checkedChildren = '',
      unCheckedChildren = '',
      size = 'default',
      loading,
      ...otherProps
    } = this.props;
    const { checked, disabled } = this.state;
    const TAB_INDEX = 0;
    const NO_TAB_INDEX = -1;

    const switchTabIndex = disabled ? NO_TAB_INDEX : TAB_INDEX;

    return (
      <SwitchWrapper
        isChecked={checked}
        isDisabled={disabled}
        size={size}
        loading={loading}
        tabIndex={switchTabIndex}
        onClick={this.toggle}
        onKeyDown={this.handleKeyDown}
        innerRef={this.cacheNode}
        {...otherProps}
      >
        <SwitchInner isChecked={checked} size={size}>
          {checked ? checkedChildren : unCheckedChildren}
        </SwitchInner>
      </SwitchWrapper>
    );
  }
}

export default Switch;
