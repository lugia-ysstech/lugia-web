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
      const targetKeyCode = target.keyCode;
      const targetAltKey = !!target.altKey;
      const targetShiftKey = !!target.shiftKey;
      const targetCtrlKey = !!target.ctrlKey;
      return item => {
        const { keyCode = false, altKey = false, shiftKey = false, ctrlKey = false } = item;
        return (
          keyCode === targetKeyCode &&
          altKey === targetAltKey &&
          shiftKey === targetShiftKey &&
          ctrlKey === targetCtrlKey
        );
      };
    }

    pickMethod(item: Object) {
      const { method = [] } = item;
      if (!method) {
        return [];
      }
      const trim = str => str.toString().trim();
      const result = Array.isArray(method) ? method : [method];

      return result
        .filter(item => {
          return item !== null && item !== undefined && trim(item) !== '';
        })
        .map(trim);
    }
  };
