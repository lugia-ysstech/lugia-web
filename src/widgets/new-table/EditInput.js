/**
 *
 * create by LYQ
 *
 * @flow
 */
import React from 'react';
import Theme from '../theme';
import Input from '../input';
import Widget from '../consts/index';
import { getBorder, getBorderRadius } from '@lugia/theme-utils';
import type { KeyBoardEventListenerHandle } from '@lugia/lugia-web';
import { findDOMNode } from 'react-dom';

type PropsType = {
  value: any,
  autoFocus: boolean,
  listener: KeyBoardEventListenerHandle,
};
type StateType = {
  value: any,
};

const doStopPropagation = (e: any) => {
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    if (typeof window !== 'undefined') {
      window.event.cancelBubble = true;
    }
  }
};

export default class EditInput extends React.Component<PropsType, StateType> {
  keyDownHandler: Object;

  static getDerivedStateFromProps(defProps: PropsType, state: StateType) {
    const { value } = defProps;
    return {
      value: state && 'value' in state ? state.value : value,
    };
  }

  componentDidMount() {
    this.keyDownHandler = (e: Object) => {
      const { key } = e;
      doStopPropagation(e);
      if (key === 'Enter') {
        this.handleInputBlur();
      }
    };
    const inputEl = findDOMNode(this.input.getThemeTarget());
    inputEl.addEventListener('keydown', this.keyDownHandler);
  }

  handleInputChange = (event: Object) => {
    let newValue;
    if (event) {
      const { newValue: eValue } = event;
      newValue = eValue;
    }
    this.setState({ value: newValue });
  };

  handleInputBlur = () => {
    const { value: oldValue, listener } = this.props;
    const { value } = this.state;
    listener.emit('quitEdit', { oldValue, newValue: value });
  };

  render() {
    const InputStyle = {
      [Widget.Input]: {
        Container: {
          normal: {
            width: '100%',
            height: '100%',
            border: getBorder({ color: 'transparent', style: 'solid', width: 0 }),
            borderRadius: getBorderRadius(0),
            padding: {
              left: 10,
              right: 10,
            },
          },
        },
      },
    };
    const { value } = this.state;
    const { autoFocus } = this.props;
    return (
      <Theme config={InputStyle}>
        <Input
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          value={value}
          autoFocus={autoFocus}
          canClear={false}
          ref={el => (this.input = el)}
        />
      </Theme>
    );
  }

  componentWillUnmount() {
    const inputEl = findDOMNode(this.input.getThemeTarget());
    inputEl.removeEventListener('keydown', this.keyDownHandler);
  }
}
