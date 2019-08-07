/*
 *@flow
 *
 */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {
  calcValue,
  getClass,
  getClassNames,
  getIconClass,
  multipleValue,
  getMultiple,
} from '../rate';
import Rate from '../index';
import Enzyme, { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

const { mockObject, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');

Enzyme.configure({ adapter: new Adapter() });

describe('Rate Test', () => {
  const themeProps = { themeConfig: {}, themeState: {}, onLugia: () => true };
  const getPartOfThemeProps = () => true;
  const getCmp = (target: any): Object => {
    return target.children().instance();
  };

  it('css', () => {
    const target = (
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
      />
    );
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });

  it('count=10', () => {
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        count={10}
      />
    );
    expect(target.props().count).toEqual(10);
  });

  it('value=4', () => {
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        value={4}
      />
    );
    expect(getCmp(target).state.value).toEqual(4);
  });

  it('disabled=true', () => {
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        disabled={true}
      />
    );
    expect(getCmp(target).props.disabled).toEqual(true);
    expect(getCmp(target).state.value).toEqual(0);
    findRate(target, 3).simulate('click', {}, 3);
    expect(getCmp(target).state.value).toEqual(0);
  });

  it('allowHalf=true', () => {
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        allowHalf={true}
        value={3.5}
      />
    );
    expect(getCmp(target).props.allowHalf).toEqual(true);
    expect(getCmp(target).state.value).toEqual(3.5);
  });

  it('allowHalf=false value=3.5 ->3', () => {
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        allowHalf={false}
        value={3.5}
      />
    );
    expect(getCmp(target).props.allowHalf).toEqual(false);
    expect(getCmp(target).state.value).toEqual(3);
  });

  function checkInitValue(props: Object, expectation) {
    it('Function checkInitValue', () => {
      const res = multipleValue(props);
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
      const res = multipleValue(props, val);
      expect(res).toEqual(expectation);
    });
  }

  checkMultipleValue(2, { max: 5, count: 5 }, 2);
  checkMultipleValue(2, { max: 10, count: 5 }, 4);
  checkMultipleValue(2, { count: 5 }, 2);
  checkMultipleValue(2, {}, 2);
  checkMultipleValue(2, { max: 15, count: 5 }, 6);

  function checkGetMultiple(props: Object, expectation) {
    it('Function getMultiple', () => {
      const res = getMultiple(props);
      expect(res).toEqual(expectation);
    });
  }
  checkGetMultiple({ max: 10 }, 2);
  checkGetMultiple({}, 1);
  checkGetMultiple({ max: 10, count: 5 }, 2);
  checkGetMultiple({ max: 30, count: 10 }, 3);

  function checkSetHalf(arr: Array<string>, value: number, Classify: boolean, expectation) {
    it('Function getClassNames', () => {
      const res = getClassNames(arr, value, Classify);
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

  function checkGetIconClass(iconClass: Object, expectation) {
    it('Function getIconClass', () => {
      const res = getIconClass(iconClass);
      expect(res).toEqual(expectation);
    });
  }

  const iconArr = [
    {
      iconClass: {},
      excp: {
        default: 'lugia-icon-financial_star',
        primary: 'lugia-icon-financial_star',
        danger: 'lugia-icon-financial_star',
        amazed: 'lugia-icon-financial_star',
        half: 'lugia-icon-finacial_half_star',
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
  iconArr.map((v, i) => {
    checkGetIconClass(v.iconClass, iconArr[i].excp);
  });

  function setValue(setValObj, expectation) {
    it('Function setValue', () => {
      const target = mount(
        <Rate
          getPartOfThemeProps={getPartOfThemeProps}
          getPartOfThemeHocProps={getPartOfThemeProps}
          themeProps={themeProps}
        />
      );
      getCmp(target).setValue(setValObj);
      expect(getCmp(target).state.value).toEqual(expectation.value);
      expect(getCmp(target).state.iconTypeArray).toEqual(expectation.iconTypeArray);
      expect(getCmp(target).state.starNum).toEqual(expectation.starNum);
    });
  }

  setValue(
    { value: 1, starNum: 1, iconTypeArray: ['primary', 'default', 'default'], current: 0 },
    {
      value: 1,
      starNum: 1,
      current: 0,
      iconTypeArray: ['primary', 'default', 'default'],
    }
  );

  setValue(
    { value: 2, starNum: 2, iconTypeArray: ['primary', 'primary', 'default'], current: 1 },
    {
      value: 2,
      starNum: 2,
      current: 1,
      iconTypeArray: ['primary', 'primary', 'default'],
    }
  );
  //
  function findRate(target, index) {
    return target.find('sv_rate_Ratespan').at(index);
  }

  it('Function:onClick limit value', async () => {
    let onClick = () => true;
    const changePromise = new Promise(res => {
      onClick = (e, { newValue, oldValue }) => {
        res(newValue);
      };
    });
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        value={4}
        onClick={onClick}
      />
    );

    target.setProps({ value: 1 });
    expect(getCmp(target).state.value).toEqual(1);

    findRate(target, 2).simulate('click', {}, 2, false);
    expect(getCmp(target).state.value).toEqual(1);
    expect(await changePromise).toBe(3);
  });

  it('Function:onClick limit value allowHalf', async () => {
    let onClick = () => true;
    const changePromise = new Promise(res => {
      onClick = (e, { newValue, oldValue }) => {
        res(newValue);
      };
    });
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        value={4}
        allowHalf={true}
        onClick={onClick}
      />
    );
    const order = VerifyOrder.create();
    const mockGetOffset = mockObject.create(
      getCmp(target),
      VerifyOrderConfig.create('offset', order)
    );
    const getOffset = mockGetOffset.mockFunction('getOffset');
    getOffset.forever({ offsetLeft: 76, offsetWidth: 18 });

    findRate(target, 2).simulate('click', { pageX: 80 }, 2, true);
    expect(getCmp(target).state.value).toEqual(4);
    expect(await changePromise).toBe(2.5);

    target.setProps({ value: 2 });
    expect(getCmp(target).state.value).toEqual(2);

    findRate(target, 2).simulate('click', { pageX: 80 }, 2, true);
    expect(getCmp(target).state.value).toEqual(2);
    expect(await changePromise).toBe(2.5);
  });

  it('Function:onClick unlimit value', async () => {
    let onClick = () => true;
    const changePromise = new Promise(res => {
      onClick = (e, { newValue, oldValue }) => {
        res(newValue);
      };
    });
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        onClick={onClick}
      />
    );

    findRate(target, 3).simulate('click', {}, 3, true);
    expect(getCmp(target).state.value).toEqual(4);
    expect(await changePromise).toBe(4);
  });

  it('Function:onClick unlimit value allowHalf', async () => {
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        allowHalf={true}
      />
    );

    const order = VerifyOrder.create();
    const mockGetOffset = mockObject.create(
      getCmp(target),
      VerifyOrderConfig.create('offset', order)
    );
    const getOffset = mockGetOffset.mockFunction('getOffset');
    getOffset.forever({ offsetLeft: 76, offsetWidth: 18 });

    findRate(target, 2).simulate('click', { pageX: 80 }, 2, true);
    expect(getCmp(target).state.value).toEqual(2.5);

    findRate(target, 0).simulate('click', { pageX: 13 }, 0, true);
    expect(getCmp(target).state.value).toEqual(0.5);
  });

  it('Function:onClick unlimit -> limit  value', async () => {
    let onClick = () => true;
    const changePromise = new Promise(res => {
      onClick = (e, { newValue, oldValue }) => {
        res(newValue);
      };
    });
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        onClick={onClick}
      />
    );

    findRate(target, 3).simulate('click', {}, 3);
    expect(getCmp(target).state.value).toEqual(4);
    expect(await changePromise).toBe(4);

    target.setProps({ value: 2 });
    expect(getCmp(target).state.value).toEqual(2);
  });

  it('Function:onClick unlimit -> limit  value', async () => {
    let onClick = () => true;
    const changePromise = new Promise(res => {
      onClick = (e, { newValue, oldValue }) => {
        res(newValue);
      };
    });
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        onClick={onClick}
      />
    );

    target.setProps({ value: 2 });
    expect(getCmp(target).state.value).toEqual(2);
    findRate(target, 2).simulate('click', {}, 2);
    expect(getCmp(target).state.value).toEqual(2);
    expect(await changePromise).toBe(3);
  });

  it('Check disabled Status', () => {
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        disabled={true}
      />
    );
    expect(getCmp(target).state.value).toEqual(0);
    findRate(target, 2).simulate('click', {}, 2);
    expect(getCmp(target).state.value).toEqual(0);
  });

  it('Function:onMouseMove limit ', async () => {
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        value={4}
      />
    );
    getCmp(target).onMouseMove({ pageX: 10 }, 2);
    expect(getCmp(target).state.value).toEqual(4);
  });

  it('Function:onMouseMoveOrClick unlimit value', async () => {
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
      />
    );
    getCmp(target).onMouseMove({ pageX: 10 }, 2);
    expect(getCmp(target).state.value).toEqual(3);
  });

  it('Function:onMouseMoveOrClick unlimit ->limit ', async () => {
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
      />
    );
    getCmp(target).onMouseMove({ pageX: 10 }, 2);
    expect(getCmp(target).state.value).toEqual(3);
    target.setProps({ value: 2 });
    getCmp(target).onMouseMove({ pageX: 10 }, 4);
    expect(getCmp(target).state.value).toEqual(2);
  });

  it('Function:mouseLeave lilmit', async () => {
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        value={4}
      />
    );
    getCmp(target).mouseLeave({});
    expect(getCmp(target).state.value).toEqual(4);
    expect(getCmp(target).state.starNum).toEqual(4);
  });
  it('Function:mouseLeave unlilmit', async () => {
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
      />
    );
    getCmp(target).mouseLeave({});
    expect(getCmp(target).state.value).toEqual(0);
    expect(getCmp(target).state.starNum).toEqual(0);
  });

  it('Function:mouseLeave onClick unlimit value', async () => {
    let onClick = () => true;
    const changePromise = new Promise(res => {
      onClick = (e, { newValue, oldValue }) => {
        res(newValue);
      };
    });
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        onClick={onClick}
      />
    );

    findRate(target, 3).simulate('click', {}, 3, true);
    expect(getCmp(target).state.value).toEqual(4);
    expect(await changePromise).toBe(4);
    getCmp(target).mouseLeave({});
    expect(getCmp(target).state.value).toEqual(4);
  });

  it('Function:mouseLeave onClick limit value', async () => {
    let onClick = () => true;
    const changePromise = new Promise(res => {
      onClick = (e, { newValue, oldValue }) => {
        res(newValue);
      };
    });
    const target = mount(
      <Rate
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
        value={5}
        onClick={onClick}
      />
    );
    findRate(target, 3).simulate('click', {}, 3, true);
    expect(getCmp(target).state.value).toEqual(5);
    expect(await changePromise).toBe(4);
    getCmp(target).mouseLeave({});
    expect(getCmp(target).state.value).toEqual(5);
  });
  it('getClass', () => {
    expect(getClass(100, 1000, false)).toBe('primary');
    expect(getClass(100, 100, true)).toBe('primary');
    expect(getClass(100, 200, true)).toBe('danger');
    expect(getClass(200, 100, true)).toBe('amazed');
  });
  it('calcValue', () => {
    expect(calcValue(100, false)).toEqual(100);
    expect(calcValue(5.5, false)).toEqual(5);
    expect(calcValue(5.5, true)).toEqual(5.5);
    expect(calcValue(3.2, true)).toEqual(3);
    expect(calcValue(3.7, true)).toEqual(3.5);
  });
});
