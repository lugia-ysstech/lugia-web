//@flow
import { getAttributeFromObject, getKeyfromIndex, getIndexfromKey } from '../ObjectUtils';

const Object = {
  top: 1,
  left: 2,
  right: 3,
  bottom: 0,
};
const data = [
  { key: '1111', index: 0 },
  { index: 1 },
  { key: '3333', index: 2 },
  { key: undefined, index: 3 },
];
describe('Object', () => {
  it('getAttributeFromObject has', () => {
    expect(getAttributeFromObject(Object, 'top', 0)).toEqual(1);
    expect(getAttributeFromObject(Object, 'left', 0)).toEqual(2);
    expect(getAttributeFromObject(Object, 'right', 0)).toEqual(3);
  });
  it('getAttributeFromObject error attr', () => {
    expect(getAttributeFromObject(Object, 'topleft', 0)).toEqual(0);
  });
  it('getAttributeFromObject any attr', () => {
    expect(getAttributeFromObject(Object, 'any', '123')).toEqual('123');
  });
  it('getAttributeFromObject  Object.attr  0', () => {
    expect(getAttributeFromObject(Object, 'bottom', '5')).toEqual(0);
  });

  it('getKeyfromIndex key 2 ', () => {
    expect(getKeyfromIndex(data, 0, 'key')).toEqual('1111');
  });
  it('getKeyfromIndex key 0 ', () => {
    expect(getKeyfromIndex(data, 2, 'key')).toEqual('3333');
  });
  it('getKeyfromIndex key is null ', () => {
    expect(getKeyfromIndex(data, 1, 'key')).toEqual('_key_1');
  });

  it('getIndexfromKey key 3333 ', () => {
    expect(getIndexfromKey(data, 'key', '3333')).toEqual(2);
  });
  it('getIndexfromKey key 1111 ', () => {
    expect(getIndexfromKey(data, 'key', '1111')).toEqual(0);
  });
});
