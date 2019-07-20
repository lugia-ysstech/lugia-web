import React from 'react';
export function getMethod(keyConfig: Object[], e: Object): string[] {
  if (!keyConfig || !e) {
    return [];
  }
  return keyConfig.filter(matchKeyCode(e)).map(pickMethod);
}

export function matchKeyCode(target: Object) {
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

export function pickMethod(item: Object) {
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
export default (Target, keyConfig: Object[]) => {
  return React.forwardRef((props, ref) => {
    const onKeyDown = (e: Object) => {
      const methodNames = getMethod(keyConfig, e);
      methodNames.forEach(names => {
        names.forEach(name => {
          let cmp = ref.current;
          if (cmp) {
            if (cmp.getThemeTarget) {
              cmp = cmp.getThemeTarget();
            }
            cmp && cmp[name] && cmp[name]();
          }
        });
      });
    };
    return (
      <div onKeyDown={onKeyDown}>
        <Target ref={ref} {...props} />
      </div>
    );
  });
};
