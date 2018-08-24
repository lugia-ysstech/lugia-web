//@flow
import { getAttributeFromObject } from '../ObjectUtils';

const Object = {
  top: 1,
  left: 2,
  right: 3,
  bottom: 0,
};
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
});
