/*
 *
 * by wangcuixia
 * @flow
 *2018/7/9
 * */
import * as React from 'react';
import Icon from '../icon/index';
import { SwitchContainer, SwitchWrapper, SwitchText, SwitchCircle } from './styled';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '../consts/KeyCode';
import { DisplayField } from '../consts/props';
import { getThemeProps } from './styledConfig';
import { findDOMNode } from 'react-dom';
import Widgets from '../consts/index';
import Theme from '../theme/index';

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
  getPartOfThemeProps: Function,
};
type TypeState = {
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
  static displayName = 'SwitchComponent';

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

  mouseup = (event?: any) => {
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
    const { disabled, loading } = this.props;
    if (disabled || loading) {
      return;
    }
    const { value } = this.state;
    const key = event.keyCode;
    if (key === LEFT_ARROW) this.updateChecked(event, false);
    if (key === RIGHT_ARROW) this.updateChecked(event, true);
    if (key === SPACE || key === ENTER) this.updateChecked(event, !value);
  };

  focus(): void {
    const switchNode = findDOMNode(this.switchNode.current);
    if (switchNode && switchNode.focus) {
      switchNode.focus();
    }
  }

  blur(): void {
    const switchNode = findDOMNode(this.switchNode.current);
    if (switchNode) {
      switchNode.blur();
    }
  }
  componentDidMount() {
    const { autoFocus, disabled, loading } = this.props;
    if (autoFocus && !disabled && !loading) {
      this.focus();
    }
  }
  render() {
    const { value, text } = this.state;
    const { disabled, loading } = this.props;
    const isabled = !disabled && !loading;
    const switchTabIndex = disabled ? NO_TAB_INDEX : TAB_INDEX;
    const { switchThemeProps, childrenThemeProps, SwitchContainerThemeProps } = getThemeProps(
      this.props,
      value
    );
    const {
      themeConfig: {
        disabled: { background: switchBackground },
      },
    } = switchThemeProps;
    const {
      themeConfig: {
        disabled: { width: circleWidth, height: circleHeight },
      },
    } = childrenThemeProps;
    return (
      <SwitchContainer themeProps={SwitchContainerThemeProps}>
        <SwitchWrapper
          onMouseUp={isabled ? this.mouseup : null}
          onKeyDown={isabled ? this.handleKeyDown : null}
          ref={this.switchNode}
          tabIndex={switchTabIndex}
          themeProps={switchThemeProps}
        >
          <SwitchText themeProps={switchThemeProps}>
            {typeof text === 'string' ? <i>{text}</i> : text}
          </SwitchText>
          <SwitchCircle themeProps={childrenThemeProps}>
            <Theme
              config={{
                [Widgets.Icon]: {
                  normal: {
                    color: switchBackground.backgroundColor,
                    fontSize: Math.min(circleWidth, circleHeight) - 4,
                  },
                },
              }}
            >
              {loading ? <Icon iconClass="lugia-icon-financial_loading_o" /> : ''}
            </Theme>
          </SwitchCircle>
        </SwitchWrapper>
      </SwitchContainer>
    );
  }
}
export default Switch;
