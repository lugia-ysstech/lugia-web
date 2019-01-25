/*
 * by wangcuixia
 * @flow
 * */
import * as React from 'react';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import 'jest-styled-components';
import WeekDays from '../panel/week';
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
  function getnewWeeks(title: string, props: Object, params: Object, expValue: Array<string>) {
    it(`${title}`, () => {
      const target = mount(<WeekDays {...props} />);
      const newTarget = getTarget(target, 'WeekDays');
      const { firstWeekDay } = params;
      const { newWeeks } = newTarget.getnewWeeks(props, firstWeekDay);
      expect(newWeeks).toEqual(expValue);
    });
  }

  getnewWeeks('getnewWeeks 0', {}, { firstWeekDay: 0 }, ['日', '一', '二', '三', '四', '五', '六']);
  getnewWeeks('getnewWeeks 1', {}, { firstWeekDay: 0 }, ['日', '一', '二', '三', '四', '五', '六']);
  getnewWeeks('getnewWeeks 2', {}, { firstWeekDay: 1 }, ['一', '二', '三', '四', '五', '六', '日']);
  getnewWeeks('getnewWeeks 3', {}, { firstWeekDay: 2 }, ['二', '三', '四', '五', '六', '日', '一']);
  getnewWeeks('getnewWeeks 4', {}, { firstWeekDay: 3 }, ['三', '四', '五', '六', '日', '一', '二']);
  getnewWeeks('getnewWeeks 5', {}, { firstWeekDay: 4 }, ['四', '五', '六', '日', '一', '二', '三']);
  getnewWeeks('getnewWeeks 6', {}, { firstWeekDay: 5 }, ['五', '六', '日', '一', '二', '三', '四']);
  getnewWeeks('getnewWeeks 7', {}, { firstWeekDay: 6 }, ['六', '日', '一', '二', '三', '四', '五']);
  getnewWeeks('getnewWeeks 8', {}, { firstWeekDay: 7 }, ['日', '一', '二', '三', '四', '五', '六']);
  getnewWeeks('getnewWeeks 9', {}, { firstWeekDay: 8 }, ['一', '二', '三', '四', '五', '六', '日']);
  getnewWeeks('getnewWeeks 10', {}, { firstWeekDay: 9 }, [
    '二',
    '三',
    '四',
    '五',
    '六',
    '日',
    '一',
  ]);
  getnewWeeks('getnewWeeks 11', {}, { firstWeekDay: -1 }, [
    '六',
    '日',
    '一',
    '二',
    '三',
    '四',
    '五',
  ]);
  getnewWeeks('getnewWeeks 12', {}, { firstWeekDay: -2 }, [
    '五',
    '六',
    '日',
    '一',
    '二',
    '三',
    '四',
  ]);
  getnewWeeks('getnewWeeks en 13', { lang: 'en' }, { firstWeekDay: 0 }, [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]);

  getnewWeeks('getnewWeeks en 14', { lang: 'en' }, { firstWeekDay: 1 }, [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]);

  getnewWeeks('getnewWeeks en 15', { lang: 'en' }, { firstWeekDay: 2 }, [
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mon',
  ]);

  getnewWeeks('getnewWeeks en 16', { lang: 'en' }, { firstWeekDay: 3 }, [
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mon',
    'Tue',
  ]);

  getnewWeeks('getnewWeeks en 17', { lang: 'en' }, { firstWeekDay: 4 }, [
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
  ]);

  getnewWeeks('getnewWeeks en 18', { lang: 'en' }, { firstWeekDay: 5 }, [
    'Fri',
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
  ]);

  getnewWeeks('getnewWeeks en 19', { lang: 'en' }, { firstWeekDay: 6 }, [
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
  ]);

  getnewWeeks('getnewWeeks en 20', { lang: 'en' }, { firstWeekDay: 7 }, [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]);

  getnewWeeks('getnewWeeks en 21', { lang: 'en' }, { firstWeekDay: -1 }, [
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
  ]);
  //
  getnewWeeks('getnewWeeks en 22', { lang: 'en' }, { firstWeekDay: -2 }, [
    'Fri',
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
  ]);

  getnewWeeks('getnewWeeks en 23', { lang: 'en' }, { firstWeekDay: 0 }, [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]);
});
