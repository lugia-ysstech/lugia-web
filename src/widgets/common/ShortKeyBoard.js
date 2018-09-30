import React from 'react';

export default (Target, keyConfig: Object[]) =>
  class extends React.Component<any, any> {
    target: Object;

    constructor(props) {
      super(props);
      this.target = React.createRef();
    }

    render() {
      const { props } = this;

      return (
        <div onKeyDown={this.onKeyDown}>
          <Target ref={this.target} {...props} />
        </div>
      );
    }

    onKeyDown = (e: Object) => {
      const methodNames = this.getMethod(keyConfig, e);
      methodNames.forEach(names => {
        names.forEach(name => {
          const cmp = this.target.current;
          cmp[name] && cmp[name]();
        });
      });
    };

    getMethod(keyConfig: Object[], e: Object): string[] {
      if (!keyConfig || !e) {
        return [];
      }
      return keyConfig.filter(this.matchKeyCode(e)).map(this.pickMethod);
    }

    matchKeyCode(target: Object) {
      return item => {
        const { keyCode = false, altKey = false, shiftKey = false, ctrlKey = false } = item;
        return (
          keyCode === target.keyCode &&
          altKey === target.altKey &&
          shiftKey === target.shiftKey &&
          ctrlKey === target.ctrlKey
        );
      };
    }

    pickMethod(item: Object) {
      return item.method;
    }
  };
