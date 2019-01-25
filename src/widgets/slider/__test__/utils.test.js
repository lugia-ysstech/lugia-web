import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import 'jest-styled-components';
import { getChangeValue } from '../utils';
const { expect: exp } = chai;
Enzyme.configure({ adapter: new Adapter() });
describe('default', () => {
  function testgetChangeValue(title: string, params: Object, expValue: Array<number>) {
    it(`utils ${title}`, () => {
      const { value, min, max } = params;
      const changeValue = getChangeValue(value, min, max);
      expect(changeValue).toEqual(expValue);
    });
  }
  testgetChangeValue('value 10 min 0 max 30', { value: [10], min: 0, max: 30 }, [10]);
  testgetChangeValue('value -1 min 0 max 30', { value: [0], min: 0, max: 30 }, [0]);
  testgetChangeValue('value 0 min 0 max 30', { value: [-1], min: 0, max: 30 }, [0]);
  testgetChangeValue('value 0 min 0 max 30', { value: [-2], min: 0, max: 30 }, [0]);
  testgetChangeValue('value 40 min 0 max 30', { value: [40], min: 0, max: 30 }, [30]);
  testgetChangeValue('value 40 min 0 max 30', { value: [50], min: 0, max: 30 }, [30]);
});
