import React from 'react';

export default Target => props => {
  const onKeyUp = (event: KeyboardEvent) => {
      const { onKeyUp, } = props;
      onKeyUp && onKeyUp(event);
    },
    onKeyPress = (event: KeyboardEvent) => {
      const { onKeyPress, } = props;
      onKeyPress && onKeyPress(event);
    },
    onKeyDown = (event: UIEvent) => {
      const { onKeyDown, } = props;
      onKeyDown && onKeyDown(event);
    },
    onFocus = (event: KeyboardEvent) => {
      const { onFocus, } = props;
      onFocus && onFocus(event);

    },
    onBlur = (event: KeyboardEvent) => {
      const { onBlur, } = props;
      onBlur && onBlur(event);

    };

  return <Target {...props}
                 onFocus={onFocus}
                 onKeyUp={onKeyUp}
                 onKeyPress={onKeyPress}
                 onBlur={onBlur}
                 onKeyDown={onKeyDown}/>;

};
