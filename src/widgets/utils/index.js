/**
 *
 * create by ligx
 *
 * @flow
 */
export function cacheOnlyFirstCall(targetFunc: Function) {
  let containerPos;

  return {
    func(...args: any) {
      if (containerPos) {
        return containerPos;
      }

      return (containerPos = targetFunc(...args));
    },
    clearCache() {
      containerPos = undefined;
    },
  };
}

export function splitStr(str: string, sepator: string = ','): Array<string> {
  if (!str || str.trim().length === 0) {
    return [];
  }
  return str.split(sepator);
}

export function getElementPosition(e: Object) {
  let x = 0,
    y = 0;
  while (e) {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent;
  }
  return { x, y };
}

export function deleteValue(target: Array<any>, value: any): void {
  if (!target || target.length === 0) {
    return;
  }
  const index = target.indexOf(value);
  if (index === -1) {
    return;
  }

  target.splice(index, 1);
}

export function adjustValue(value: any, per: any) {
  value = value - 0;
  per = per - 0;
  const ys = value % per;
  if (ys !== 0) {
    return value - ys + per;
  }
  return value;
}

export function fixControlledValue(value: any) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

//TODO: grg 增加测试用例。
export function createExistMap(items: string[]): { [key: string]: boolean } {
  return items.reduce((exist: Object, key: string) => {
    exist[key] = true;
    return exist;
  }, {});
}
