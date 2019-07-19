import Adapter from 'enzyme-adapter-react-16';
import { createIconTypeArray, calcValue } from '../rate';
import Enzyme from 'enzyme';
import 'jest-styled-components';

Enzyme.configure({ adapter: new Adapter() });
describe('Rate igflow Test', () => {
  function checkCreateArr(
    num: ?number | string,
    index: number,
    isallowHalf: boolean,
    expectation: Array<string>
  ) {
    const condition = {
      starNum: index,
      allowHalf: isallowHalf,
    };
    it('Function createIconTypeArray', () => {
      const res = createIconTypeArray(num, condition);
      expect(res).toEqual(expectation);
    });
  }
  checkCreateArr(5, 0, false, ['default', 'default', 'default', 'default', 'default']);
  checkCreateArr(5, 1, false, ['primary', 'default', 'default', 'default', 'default']);
  checkCreateArr(3, 1, false, ['primary', 'default', 'default']);
  checkCreateArr(0, 0, false, []);
  checkCreateArr(null, 0, false, []);
  checkCreateArr(undefined, 0, false, []);
  checkCreateArr('5', 0, false, ['default', 'default', 'default', 'default', 'default']);
  checkCreateArr(5, 2.5, true, ['primary', 'primary', 'half', 'default', 'default']);

  function checkCalcValue(val: ?number, allowHalf: boolean, expectation) {
    it('Function calcValue', () => {
      const res = calcValue(val, allowHalf);
      expect(res).toEqual(expectation);
    });
  }

  checkCalcValue(3.2, false, 3);
  checkCalcValue(3.7, true, 3.5);
  checkCalcValue(4, false, 4);
  checkCalcValue(1.2, false, 1);
  checkCalcValue(0, false, 0);
  checkCalcValue(0, false, 0);
  checkCalcValue(null, false, 0);
});
