/**
 *
 * create by ligx
 *@flow
 */
import type { QueryType } from '@lugia/lugia-web';
import { ObjectUtils } from '@lugia/type-utils';

function isMatch(val: string, queryArray: Array<string>, match: Function): boolean {
  for (let i = 0; i < queryArray.length; i++) {
    const oneQuery = queryArray[i];
    if (!oneQuery || oneQuery === '') {
      continue;
    }
    if (match(val, oneQuery)) {
      return true;
    }
  }
  return false;
}

export function toMatchFromType(val: ?string, query: Array<string>, type: QueryType): boolean {
  if (val === undefined || val === null) {
    return false;
  }

  if (!query || query === '') {
    return false;
  }

  val += '';

  switch (type) {
    case 'start': {
      return isMatch(val, query, (val: string, query: string) => {
        return val.startsWith(query);
      });
    }

    case 'end': {
      return isMatch(val, query, (val: string, query: string) => {
        return val.endsWith(query);
      });
    }

    case 'include': {
      return isMatch(val, query, (val: string, query: string) => {
        return !!~val.indexOf(query);
      });
    }

    case 'eql': {
      return isMatch(val, query, (val: string, query: string) => {
        return val === query;
      });
    }
    default:
      return false;
  }
}

export function getDefault(str: any, defaultValue: string = ''): string {
  if (str === 0) {
    return '0';
  }

  if (str === '') {
    return str;
  }

  str = str ? str : defaultValue;

  return str.toString();
}

const repaceSepator = path => getDefault(path, '').replace(/^\//, '');

export function getHrefs(paths: string[]): string[] {
  const result = [];
  paths &&
    paths.map(repaceSepator).reduce((pre, cur) => {
      const sep = '/';
      const next = getDefault(cur) === '' ? pre : pre + sep + getDefault(cur);
      result.push(next);
      return next;
    }, '');
  return result;
}

export function replaceStr(target: string, param: Object = {}): string {
  target = getDefault(target);
  if (!target) {
    return '';
  }
  if (!param) {
    return target;
  }
  Object.keys(param).forEach(key => {
    target = target.replace(`:${key}`, param[key]);
  });
  return target;
}

export function getString(str: string): any {
  if (str === 0) {
    return '0';
  }
  if (ObjectUtils.isString(str)) {
    return str;
  }
  return str && str.toString ? str.toString() : '';
}
