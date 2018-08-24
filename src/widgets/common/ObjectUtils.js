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
