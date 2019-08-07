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
  testgetChangeValue('value 5 min 0 max 30', { value: [5], min: 0, max: 30 }, [5]);
  testgetChangeValue('value 10 min 0 max 30', { value: [10], min: 0, max: 30 }, [10]);
  testgetChangeValue('value 15 min 0 max 30', { value: [15], min: 0, max: 30 }, [15]);
  testgetChangeValue('value 20 min 0 max 30', { value: [20], min: 0, max: 30 }, [20]);
  testgetChangeValue('value [0,5] min 0 max 30', { value: [0, 5], min: 0, max: 30 }, [0, 5]);
  testgetChangeValue('value [0,10] min 0 max 30', { value: [0, 10], min: 0, max: 30 }, [0, 10]);
  testgetChangeValue('value [0,15] min 0 max 30', { value: [0, 15], min: 0, max: 30 }, [0, 15]);
  testgetChangeValue('value [0,20] min 0 max 30', { value: [0, 20], min: 0, max: 30 }, [0, 20]);
  testgetChangeValue('value [0,25] min 0 max 30', { value: [0, 25], min: 0, max: 30 }, [0, 25]);
  testgetChangeValue('value [0,30] min 0 max 30', { value: [0, 30], min: 0, max: 30 }, [0, 30]);
  testgetChangeValue('value [0,35] min 0 max 30', { value: [0, 35], min: 0, max: 30 }, [0, 30]);
  testgetChangeValue('value [0,40] min 0 max 30', { value: [0, 40], min: 0, max: 30 }, [0, 30]);
});
