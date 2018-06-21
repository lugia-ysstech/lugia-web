import React from 'react';

export default Target =>
  class extends React.Component<any, any> {
    render() {
      const { props } = this;

      const onKeyUp = (event: KeyboardEvent) => {
          const { onKeyUp } = props;
          onKeyUp && onKeyUp(event);
        },
        onKeyPress = (event: KeyboardEvent) => {
          const { onKeyPress } = props;
          onKeyPress && onKeyPress(event);
        },
        onKeyDown = (event: UIEvent) => {
          const { onKeyDown } = props;
          onKeyDown && onKeyDown(event);
        },
        onFocus = (event: KeyboardEvent) => {
          const { onFocus } = props;
          onFocus && onFocus(event);
        },
        onEnter = (event: KeyboardEvent) => {
          const { onEnter } = props;
          onEnter && onEnter(event);
        },
        onBlur = (event: KeyboardEvent) => {
          const { onBlur } = props;
          onBlur && onBlur(event);
        };
      return (
        <Target
          {...props}
          ref={cmp => (this.svtarget = cmp)}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
      );
    }
  };
