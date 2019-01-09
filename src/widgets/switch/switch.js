/*
 *
 * by wangcuixia
 * @flow
 *2018/7/9
 * */
import * as React from 'react';
import Icon from '../icon/index';
import { SwitchWrapper, SwitchText, SwitchCircle } from './styled';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '../consts/KeyCode';
import { DisplayField } from '../consts/props';

type TypeProps = {
  value?: boolean,
  defaultValue?: boolean,
  data?: Object,
  isInverse?: boolean,
  size?: string,
  disabled?: boolean,
  loading?: boolean,
  data?: Object,
  autoFocus?: boolean,
  onChange?: any,
  displayFiled?: string,
};
type TypeState = {
  isMouseDown?: boolean,
  items?: Array<Object>,
  value?: boolean,
  displayFiled?: string,
  text?: string,
};
const TAB_INDEX = 0;
const NO_TAB_INDEX = -1;
function getItem(value, items) {
  const item = value ? items[0] : items[1];
  return item;
}
class Switch extends React.Component<TypeProps, TypeState> {
  switchNode: any;
  constructor() {
    super();
    this.switchNode = React.createRef();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { defaultValue = false, data, displayFiled = DisplayField } = nextProps;
    const hasValueProps = 'value' in nextProps;
    let { value } = nextProps;
    value = hasValueProps ? value : preState ? preState.value : defaultValue;
    const empty = { text: '' };
    let items = [empty, empty];
    if (Array.isArray(data)) {
      const datas = [...data];
      const { length } = datas;
      if (length !== 0) {
        if (!datas[0]) {
          datas[0] = empty;
        }
        if (!datas[1]) {
          datas[1] = empty;
        }
        items = datas;
      }
    }
    const text = getItem(value, items)[displayFiled];
    if (!preState) {
      return {
        isMouseDown: false,
        value,
        text,
        items,
      };
    }
    return {
      text,
      value,
      items,
    };
  }
  mousedown = () => {
    this.setState({
      isMouseDown: true,
    });
  };
  mouseup = (event?: any) => {
    this.setState({
      isMouseDown: false,
    });
    console.log(this.state.value);
    this.updateChecked(event, !this.state.value);
  };
  updateChecked(event?: any, value?: boolean): void {
    if (this.state.value === value) {
      return;
    }
    this.setState(
      {
        value,
      },
      function() {
        const { onChange } = this.props;
        if (onChange) {
          let { value, items } = this.state;
          if ('value' in this.props) {
            value = !value;
          }
          const newItem = getItem(value, items);
          const oldItem = getItem(!value, items);
          const opens = {
            newValue: value,
            oldValue: !value,
            newItem,
            oldItem,
            event,
          };
          onChange(opens);
        }
      }
    );
  }
  handleKeyDown = (event: SyntheticKeyboardEvent<EventTarget>): void => {
    const { value } = this.state;
    const key = event.keyCode;
    if (key === LEFT_ARROW) this.updateChecked(event, false);
    if (key === RIGHT_ARROW) this.updateChecked(event, true);
    if (key === SPACE || key === ENTER) this.updateChecked(event, !value);
  };
  focus(): void {
    if (this.switchNode.current) {
      this.switchNode.current.focus();
    }
  }

  blur(): void {
    if (this.switchNode.current) {
      this.switchNode.current.blur();
    }
  }
  componentDidMount() {
    const { autoFocus, disabled } = this.props;
    if (autoFocus && !disabled) {
      this.focus();
    }
  }
  render() {
    const { isMouseDown, value, text } = this.state;
    const { isInverse, size, disabled, loading } = this.props;
    const isabled = !disabled && !loading;
    const switchTabIndex = disabled ? NO_TAB_INDEX : TAB_INDEX;
    const config = {
      isMouseDown,
      value,
      size,
      disabled,
      loading,
      isInverse,
    };
    //console.log(text);
    return (
      <SwitchWrapper
        onMouseDown={isabled ? this.mousedown : null}
        onMouseUp={isabled ? this.mouseup : null}
        onKeyDown={isabled ? this.handleKeyDown : null}
        innerRef={this.switchNode}
        tabIndex={switchTabIndex}
        {...config}
      >
        <SwitchText {...config}>{text}</SwitchText>
        <SwitchCircle {...config}>
          {loading ? <Icon iconClass="lugia-icon-financial_loading_o" /> : ''}
        </SwitchCircle>
      </SwitchWrapper>
    );
  }
}
export default Switch;
