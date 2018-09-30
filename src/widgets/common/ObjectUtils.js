/**
 *
 * create by liangguodong on 2018/8/24
 *
 * @flow
 */

export function getAttributeFromObject(object: Object, attribute: string, defaultValue: any) {
  const attributeValue =
    object && object[attribute] !== undefined ? object[attribute] : defaultValue;
  return attributeValue;
}

export const getKeyfromIndex = (data: Array<Object>, index: number, expKey: string): string => {
  let newKey = '';
  data.map((v, i) => {
    if (i === index) {
      newKey = v[expKey] !== null && v[expKey] !== undefined ? v[expKey] : '_key_' + i;
    }
  });
  return newKey;
};
export const getIndexfromKey = (data: Array<Object>, key: string, keyValue: string): number => {
  let index = -1;
  data.find((v, i) => {
    if (v[key] === keyValue) {
      index = i;
    }
  });
  return index;
};
