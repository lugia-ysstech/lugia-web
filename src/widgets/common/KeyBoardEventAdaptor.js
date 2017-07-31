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
    onKeyDown = (event: KeyboardEvent) => {
      const { onKeyDown, } = props;
      onKeyDown && onKeyDown(event);

    };

  return <Target {...props}
                 onKeyUp={onKeyUp}
                 onKeyPress={onKeyPress}
                 onKeyDown={onKeyDown}/>;

};
