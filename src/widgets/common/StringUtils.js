/**
 *
 * create by ligx
 *@flow
 */
import type { QueryType } from '@lugia/lugia-web';

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
