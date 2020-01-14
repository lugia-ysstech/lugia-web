import * as React from 'react';
import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import 'jest-styled-components';
import Date from '../panel/Date';
import { getDerived } from '../utils/getDerived';
import Theme from '../../theme/index';
import Widgets from '../../consts/index';
const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });
describe('default', () => {
  function getTarget(target, component) {
    const newTarget = target
      .find(component)
      .at(0)
      .instance();
    return newTarget;
  }
  const defaultTheme = {
    themeConfig: {},
    themeState: {},
    propsConfig: {},
  };
  function getDaysInMonth(
    title: string,
    props: Object,
    type: string,
    funName: string,
    expVal: Object
  ) {
    it(`getDaysInMonth ${title}`, () => {
      const nextProps = getDerived(props);
      let changeHeadValue = '';
      const changeHead = (value: string) => {
        changeHeadValue = value;
      };
      const target = mount(
        <Date themeProps={{ ...defaultTheme }} panelStates={nextProps} changeHead={changeHead} />
      );
      const newTarget = getTarget(target, 'Date');
      newTarget.getDaysInMonth(type, funName)();
      expect(changeHeadValue).toBe(expVal.newValue);
    });
  }
  getDaysInMonth(
    'click month add',
    {
      value: '2018-10-01',
      format: 'YYYY-MM-DD',
      mode: 'date',
      firstWeekDay: 0,
      valueIsValid: true,
      hasOldValue: true,
    },
    'month',
    'add',
    {
      newValue: '2018-11-01',
    }
  );
  getDaysInMonth(
    'click month subtract',
    {
      value: '2018-10-01',
      format: 'YYYY-MM-DD',
      mode: 'date',
      firstWeekDay: 0,
      valueIsValid: true,
      hasOldValue: true,
    },
    'month',
    'subtract',
    {
      newValue: '2018-09-01',
    }
  );
  getDaysInMonth(
    'click year add',
    {
      value: '2018-10-01',
      format: 'YYYY-MM-DD',
      mode: 'date',
      firstWeekDay: 0,
      valueIsValid: true,
      hasOldValue: true,
    },
    'year',
    'add',
    {
      newValue: '2019-10-01',
    }
  );
  getDaysInMonth(
    'click year subtract',
    {
      value: '2018-10-01',
      format: 'YYYY-MM-DD',
      mode: 'date',
      firstWeekDay: 0,
      valueIsValid: true,
      hasOldValue: true,
    },
    'year',
    'subtract',
    {
      newValue: '2017-10-01',
    }
  );
  function onDateChange(title: string, props: Object, params: string, expValue: Object) {
    it(`DatePicker ${title}`, () => {
      const nextProps = getDerived(props);
      let onChangeValue = '';
      const onChange = (obj: string) => {
        onChangeValue = obj;
      };
      const target = mount(
        <Date themeProps={{ ...defaultTheme }} panelStates={nextProps} onChange={onChange} />
      );
      const newTarget = getTarget(target, 'Dates');
      const { index, child } = params;
      newTarget.onDateChange(index, child)();
      expect(onChangeValue.newValue).toBe(expValue.newValue);
    });
  }
  const onDateChangeDays = [
    30,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ];
  for (let i = 0; i < 1; i++) {
    onDateChange(
      `onDateChange index ${i} child ${onDateChangeDays[i]}`,
      {
        value: '2018-10-01',
        format: 'YYYY-MM-DD',
        mode: 'date',
        firstWeekDay: 0,
        valueIsValid: true,
        hasOldValue: true,
      },
      { index: i, child: onDateChangeDays[i] },
      { newValue: '2018-09-30' }
    );
  }
  for (let i = 1; i < 32; i++) {
    let item = onDateChangeDays[i];
    if (onDateChangeDays[i].toString().length === 1) {
      item = '0' + onDateChangeDays[i];
    }
    onDateChange(
      `onDateChange index ${i} child ${onDateChangeDays[i]}`,
      {
        value: '2018-10-01',
        format: 'YYYY-MM-DD',
        mode: 'date',
        firstWeekDay: 0,
        valueIsValid: true,
        hasOldValue: true,
      },
      { index: i, child: onDateChangeDays[i] },
      { newValue: `2018-10-${item}` }
    );
  }
  for (let i = 32; i < 42; i++) {
    let item = onDateChangeDays[i];
    if (onDateChangeDays[i].toString().length === 1) {
      item = '0' + onDateChangeDays[i];
    }
    onDateChange(
      `onDateChange index ${i} child ${onDateChangeDays[i]}`,
      {
        value: '2018-10-01',
        format: 'YYYY-MM-DD',
        mode: 'date',
        firstWeekDay: 0,
        valueIsValid: true,
        hasOldValue: true,
      },
      { index: i, child: onDateChangeDays[i] },
      { newValue: `2018-11-${item}` }
    );
  }
  function changeGetMode(title: string, props: Object, params, expValue?: Object) {
    it(`DatePicker ${title}`, () => {
      const nextProps = getDerived(props);
      let getModeValue = '';
      const getMode = (obj: string) => {
        getModeValue = obj;
      };
      const target = mount(
        <Date themeProps={{ ...defaultTheme }} panelStates={nextProps} getMode={getMode} />
      );
      const newTarget = getTarget(target, 'Date');
      newTarget.getMode(params.mode, params.from);
      for (const i in expValue) {
        expect(getModeValue[i]).toBe(expValue[i]);
      }
    });
  }
  changeGetMode(
    'getMode year',
    {
      value: '2018-10-01',
      format: 'YYYY-MM-DD',
      mode: 'date',
      firstWeekDay: 0,
      valueIsValid: true,
      hasOldValue: true,
    },
    { mode: 'year', from: 'date' },
    { mode: 'year', from: 'date' }
  );
  changeGetMode(
    'getMode getMode month',
    {
      value: '2018-10-01',
      format: 'YYYY-MM-DD',
      mode: 'date',
      firstWeekDay: 0,
      valueIsValid: true,
      hasOldValue: true,
    },
    { mode: 'month', from: 'date' },
    { mode: 'month', from: 'date' }
  );
  changeGetMode(
    'getMode getMode month',
    {
      value: '2018-10-01',
      format: 'YYYY-MM-DD',
      mode: 'date',
      firstWeekDay: 0,
      valueIsValid: true,
      hasOldValue: true,
    },
    { mode: 'week', from: 'date' },
    { mode: 'week', from: 'date' }
  );

  // //onMouseOver
  function onMouseWeeks(
    title: string,
    props: Object,
    params: Object,
    expValue?: Object,
    funcName?: string
  ) {
    it(`WeeksPicker ${title}`, () => {
      const nextProps = getDerived(props);
      const target = mount(<Date themeProps={{ ...defaultTheme }} panelStates={nextProps} />);
      const newTarget = getTarget(target, 'Date');
      const { index, child } = params;
      newTarget.onMouseOver(index, child);
      if (funcName === 'onMouseOut') {
        newTarget.onMouseOut();
      }
      const { weekHoverStart, weekHoverEnd } = newTarget.state;
      expect(weekHoverStart).toBe(expValue.weekHoverStart);
      expect(weekHoverEnd).toBe(expValue.weekHoverEnd);
    });
  }
  onMouseWeeks(
    'onMouseOver Function',
    { value: '2018-02' },
    { index: 14, child: 14 },
    { weekHoverStart: 15, weekHoverEnd: 21 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { value: '2018-02' },
    { index: 10, child: 10 },
    { weekHoverStart: 8, weekHoverEnd: 14 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { value: '2018-10' },
    { index: 0, child: 25 },
    { weekHoverStart: 1, weekHoverEnd: 7 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { value: '2018-05' },
    { index: 35, child: 4 },
    { weekHoverStart: 36, weekHoverEnd: 42 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { value: '2018-05', firstWeekDay: 1 },
    { index: 7, child: 5 },
    { weekHoverStart: 8, weekHoverEnd: 14 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { value: '2018-05', firstWeekDay: 2 },
    { index: 7, child: 6 },
    { weekHoverStart: 8, weekHoverEnd: 14 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { value: '2018-05', firstWeekDay: 2 },
    { index: 14, child: 13 },
    { weekHoverStart: 15, weekHoverEnd: 21 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { value: '2018-05', firstWeekDay: 3 },
    { index: 14, child: 14 },
    { weekHoverStart: 15, weekHoverEnd: 21 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { value: '2018-05', firstWeekDay: 4 },
    { index: 0, child: 1 },
    { weekHoverStart: 1, weekHoverEnd: 7 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { value: '2018-05', firstWeekDay: 5 },
    { index: 14, child: 9 },
    { weekHoverStart: 15, weekHoverEnd: 21 }
  );
  onMouseWeeks(
    'onMouseOver Function',
    { value: '2018-05', firstWeekDay: 6 },
    { index: 0, child: 30 },
    { weekHoverStart: 1, weekHoverEnd: 7 }
  );
  onMouseWeeks(
    'onMouseOut Function',
    { value: '2018-05', firstWeekDay: 6 },
    { index: 0, child: 30 },
    { weekHoverStart: '', weekHoverEnd: '' },
    'onMouseOut'
  );
});
