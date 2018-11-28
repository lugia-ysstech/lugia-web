import React from 'react';

export default Target =>
  class extends React.Component<any, any> {
    render() {
      const { props } = this;

      const onMouseEnter = (...rest) => {
          const { onMouseEnter } = this.props;
          onMouseEnter && onMouseEnter(...rest);
        },
        onMouseOut = (...rest) => {
          const { onMouseOut } = this.props;
          onMouseOut && onMouseOut(...rest);
        },
        onMouseDown = (...rest) => {
          const { onMouseDown } = this.props;
          onMouseDown && onMouseDown(...rest);
        },
        onMouseUp = (...rest) => {
          const { onMouseUp } = this.props;
          onMouseUp && onMouseUp(...rest);
        },
        onMouseOver = (...rest) => {
          const { onMouseOver } = this.props;
          onMouseOver && onMouseOver(...rest);
        };

      return (
        <Target
          {...props}
          ref={cmp => (this.svtarget = cmp)}
          onMouseOut={onMouseOut}
          onMouseEnter={onMouseEnter}
          onMouseOver={onMouseOver}
          onMouseUp={onMouseUp}
          onMouseDown={onMouseDown}
        />
      );
    }
  };
