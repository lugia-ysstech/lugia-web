import React from 'react';
import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Rate, {
  createArr,
  calcValue,
  InitValue,
  multipleValue,
  setHalf,
  setIconClass,
} from '../rate';
import Enzyme, { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

Enzyme.configure({ adapter: new Adapter() });

const { expect: exp } = chai;
describe('Rate Test', () => {
  const target = mount(<Rate />);
  it('css', () => {
    const target = <Rate />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('count=10', () => {
    const target = mount(<Rate count={10} />);
    expect(target.props().count).toEqual(10);
  });
  it('value=4', () => {
    const target = mount(<Rate value={4} />);
    expect(target.state().value).toEqual(4);
  });
  it('disabled=true', () => {
    const target = mount(<Rate disabled={true} />);
    expect(target.props().disabled).toEqual(true);
    expect(target.state().value).toEqual(0);
    findRate(target, 3).simulate('click', {}, 3);
    expect(target.state().value).toEqual(0);
  });
  it('allowHalf=true', () => {
    const target = mount(<Rate allowHalf={true} value={3.5} />);
    expect(target.props().allowHalf).toEqual(true);
    expect(target.state().value).toEqual(3.5);
  });
  it('allowHalf=false value=3.5 ->3', () => {
    const target = mount(<Rate allowHalf={false} value={3.5} />);
    expect(target.props().allowHalf).toEqual(false);
    expect(target.state().value).toEqual(3);
  });
  function checkCreateArr(num: number, index: number, allowHalf: boolean, expectation: Array) {
    it('Function createArr', () => {
      const res = createArr(num, index, allowHalf);
      expect(res).toEqual(expectation);
    });
  }
  checkCreateArr(5, 0, false, ['default', 'default', 'default', 'default', 'default']);
  checkCreateArr(5, 1, false, ['primary', 'default', 'default', 'default', 'default']);
  checkCreateArr(3, 1, false, ['primary', 'default', 'default']);
  checkCreateArr(0, 0, false, []);
  checkCreateArr(null, 0, false, ['default']);
  checkCreateArr(undefined, 0, false, ['default']);
  checkCreateArr('5', 0, false, ['default']);
  checkCreateArr(5, 2.5, true, ['primary', 'primary', 'half', 'default', 'default']);
  function checkCalcValue(val: number, allowHalf: boolean, expectation) {
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
  function checkInitValue(props: Object, expectation) {
    it('Function checkInitValue', () => {
      const res = InitValue(props);
      expect(res).toEqual(expectation);
    });
  }
  checkInitValue({ max: 5, count: 5, value: 2 }, 2);
  checkInitValue({ max: 10, count: 5, value: 2 }, 1);
  checkInitValue({ count: 5, value: 2 }, 2);
  checkInitValue({ value: 2 }, 2);
  checkInitValue({}, 0);
  checkInitValue({ max: 10, count: 5, value: 4 }, 2);
  function checkMultipleValue(val: number, props: Object, expectation) {
    it('Function multipleValue', () => {
      const res = multipleValue(val, props);
      expect(res).toEqual(expectation);
    });
  }
  checkMultipleValue(2, { max: 5, count: 5 }, 2);
  checkMultipleValue(2, { max: 10, count: 5 }, 4);
  checkMultipleValue(2, { count: 5 }, 2);
  checkMultipleValue(2, {}, 2);
  checkMultipleValue(2, { max: 15, count: 5 }, 6);
  function checkSetHalf(arr: Array<string>, value: number, Classify: boolean, expectation) {
    it('Function setHalf', () => {
      const res = setHalf(arr, value, Classify);
      expect(res).toEqual(expectation);
    });
  }
  checkSetHalf(['default', 'default', 'default', 'default', 'default'], 2, false, [
    'primary',
    'primary',
    'default',
    'default',
    'default',
  ]);
  checkSetHalf(['default', 'default', 'default', 'default', 'default'], 4, false, [
    'primary',
    'primary',
    'primary',
    'primary',
    'default',
  ]);
  checkSetHalf(['default', 'default', 'default', 'default', 'default'], 3.5, false, [
    'primary',
    'primary',
    'primary',
    'half',
    'default',
  ]);
  checkSetHalf(['default', 'default', 'default', 'default', 'default'], 2, true, [
    'danger',
    'danger',
    'default',
    'default',
    'default',
  ]);
  checkSetHalf(['default', 'default', 'default', 'default', 'default'], 4, true, [
    'amazed',
    'amazed',
    'amazed',
    'amazed',
    'default',
  ]);
  checkSetHalf(['default', 'default', 'default', 'default', 'default'], 3.5, true, [
    'amazed',
    'amazed',
    'amazed',
    'half',
    'default',
  ]);

  function checkSetIconClass(iconClass: Object, expectation) {
    it('Function setIconClass', () => {
      const res = setIconClass(iconClass);
      expect(res).toEqual(expectation);
    });
  }
  const IconArr = [
    {
      iconClass: {},
      excp: {
        default: 'lugia-icon-financial_star',
        primary: 'lugia-icon-financial_star',
        danger: 'lugia-icon-financial_star',
        amazed: 'lugia-icon-financial_star',
        half: 'lugia-icon-financial_star_o',
      },
    },
    {
      iconClass: { default: 'A' },
      excp: {
        default: 'A',
        primary: 'A',
        danger: 'A',
        amazed: 'A',
        half: 'A',
      },
    },
    {
      iconClass: {
        default: 'A',
        primary: 'B',
        danger: 'C',
        amazed: 'D',
        half: 'E',
      },
      excp: {
        default: 'A',
        primary: 'B',
        danger: 'C',
        amazed: 'D',
        half: 'E',
      },
    },
  ];
  IconArr.map((v, i) => {
    checkSetIconClass(v.iconClass, IconArr[i].excp);
  });
  function setValue(val: number, cou: array, current: number, hasClicked?: boolean, expectation) {
    it('Function setValue', () => {
      const res = target.instance().setValue(val, cou, current, hasClicked);
      expect(target.state().value).toEqual(expectation.value);
      expect(target.state().count).toEqual(expectation.count);
    });
  }
  setValue(1, ['primary', 'default', 'default'], 0, true, {
    value: 1,
    current: 0,
    count: ['primary', 'default', 'default'],
  });
  setValue(2, ['primary', 'primary', 'default'], 1, null, {
    value: 2,
    current: 1,
    count: ['primary', 'primary', 'default'],
  });

  function findRate(target, index) {
    return target.find('Ratespan').at(index);
  }

  it('Function:onClick limit value', async () => {
    let onClick = () => true;
    const changePromise = new Promise(res => {
      onClick = val => {
        res(val);
      };
    });
    const target = mount(<Rate value={4} onClick={onClick} />);

    target.setProps({ value: 1 });
    expect(target.state().value).toEqual(1);

    findRate(target, 2).simulate('click', {}, 2, false);
    expect(target.state().value).toEqual(1);
    expect(await changePromise).toBe(3);
  });
  it('Function:onClick limit value allowHalf', async () => {
    let onClick = () => true;
    const changePromise = new Promise(res => {
      onClick = val => {
        res(val);
      };
    });
    const target = mount(<Rate value={4} allowHalf={true} onClick={onClick} />);

    target.setProps({ value: 2 });
    expect(target.state().value).toEqual(2);

    findRate(target, 2).simulate('click', { pageX: 3 }, 2, true);
    expect(target.state().value).toEqual(2);
    expect(await changePromise).toBe(2.5);
  });
  it('Function:onClick unlimit value', async () => {
    let onClick = () => true;
    const changePromise = new Promise(res => {
      onClick = val => {
        res(val);
      };
    });
    const target = mount(<Rate onClick={onClick} />);

    findRate(target, 3).simulate('click', {}, 3, true);
    expect(target.state().value).toEqual(4);
    expect(await changePromise).toBe(4);
  });
  it('Function:onClick unlimit value allowHalf', async () => {
    let onClick = () => true;
    const changePromise = new Promise(res => {
      onClick = val => {
        res(val);
      };
    });
    const target = mount(<Rate allowHalf={true} onClick={onClick} />);

    findRate(target, 0).simulate('click', { pageX: 3 }, 0, true);
    expect(target.state().value).toEqual(0.5);
    findRate(target, 0).simulate('click', { pageX: 17 }, 0, true);
    expect(target.state().value).toEqual(1);
  });
  it('Function:onClick unlimit -> limit  value', async () => {
    let onClick = () => true;
    const changePromise = new Promise(res => {
      onClick = val => {
        res(val);
      };
    });
    const target = mount(<Rate onClick={onClick} />);

    findRate(target, 3).simulate('click', {}, 3);
    expect(target.state().value).toEqual(4);
    expect(await changePromise).toBe(4);

    target.setProps({ value: 2 });
    expect(target.state().value).toEqual(2);
  });
  it('Function:onClick unlimit -> limit  value', async () => {
    let onClick = () => true;
    const changePromise = new Promise(res => {
      onClick = val => {
        res(val);
      };
    });
    const target = mount(<Rate onClick={onClick} />);

    target.setProps({ value: 2 });
    expect(target.state().value).toEqual(2);
    findRate(target, 2).simulate('click', {}, 2);
    expect(target.state().value).toEqual(2);
    expect(await changePromise).toBe(3);
  });
  it('Check disabled Status', () => {
    const target = mount(<Rate disabled={true} />);
    expect(target.state().value).toEqual(0);
    findRate(target, 2).simulate('click', {}, 2);
    expect(target.state().value).toEqual(0);
  });
  it('Function:mouseMove limit ', async () => {
    const target = mount(<Rate value={4} />);
    const res = target.instance().mouseMove({ pageX: 10 }, 2);
    expect(target.state().value).toEqual(4);
  });
  it('Function:mouseMove unlimit value', async () => {
    const target = mount(<Rate />);
    const res = target.instance().mouseMove({ pageX: 10 }, 2);
    expect(target.state().value).toEqual(3);
  });
  it('Function:mouseMove unlimit ->limit ', async () => {
    const target = mount(<Rate />);
    target.instance().mouseMove({ pageX: 10 }, 2);
    expect(target.state().value).toEqual(3);
    target.setProps({ value: 2 });
    target.instance().mouseMove({ pageX: 10 }, 4);
    expect(target.state().value).toEqual(2);
  });
});
