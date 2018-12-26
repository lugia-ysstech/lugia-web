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
  function getnewWeeks(title: string, props: Object, expValue: Array<string>) {
    it(`${title}`, () => {
      const target = mount(<WeekDays {...props} />);
      const newTarget = getTarget(target, 'WeekDays');
      const { newWeeks } = newTarget.getnewWeeks(props);
      expect(newWeeks).toEqual(expValue);
    });
  }

  getnewWeeks('getnewWeeks 0', {}, ['日', '一', '二', '三', '四', '五', '六']);
  getnewWeeks('getnewWeeks 1', { firstWeekDay: 0 }, ['日', '一', '二', '三', '四', '五', '六']);
  getnewWeeks('getnewWeeks 2', { firstWeekDay: 1 }, ['一', '二', '三', '四', '五', '六', '日']);
  getnewWeeks('getnewWeeks 3', { firstWeekDay: 2 }, ['二', '三', '四', '五', '六', '日', '一']);
  getnewWeeks('getnewWeeks 4', { firstWeekDay: 3 }, ['三', '四', '五', '六', '日', '一', '二']);
  getnewWeeks('getnewWeeks 5', { firstWeekDay: 4 }, ['四', '五', '六', '日', '一', '二', '三']);
  getnewWeeks('getnewWeeks 6', { firstWeekDay: 5 }, ['五', '六', '日', '一', '二', '三', '四']);
  getnewWeeks('getnewWeeks 7', { firstWeekDay: 6 }, ['六', '日', '一', '二', '三', '四', '五']);
  getnewWeeks('getnewWeeks 8', { firstWeekDay: 7 }, ['日', '一', '二', '三', '四', '五', '六']);
  getnewWeeks('getnewWeeks 9', { firstWeekDay: 8 }, ['日', '一', '二', '三', '四', '五', '六']);
  getnewWeeks('getnewWeeks 10', { firstWeekDay: 9 }, ['日', '一', '二', '三', '四', '五', '六']);
  getnewWeeks('getnewWeeks 11', { firstWeekDay: -1 }, ['日', '一', '二', '三', '四', '五', '六']);
  getnewWeeks('getnewWeeks 12', { firstWeekDay: -2 }, ['日', '一', '二', '三', '四', '五', '六']);
  getnewWeeks('getnewWeeks en 13', { firstWeekDay: 0, lang: 'en' }, [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]);
  getnewWeeks('getnewWeeks en 14', { firstWeekDay: 1, lang: 'en' }, [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]);
  getnewWeeks('getnewWeeks en 15', { firstWeekDay: 2, lang: 'en' }, [
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mon',
  ]);
  getnewWeeks('getnewWeeks en 16', { firstWeekDay: 3, lang: 'en' }, [
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mon',
    'Tue',
  ]);
  getnewWeeks('getnewWeeks en 17', { firstWeekDay: 4, lang: 'en' }, [
    'Thu',
    'Fri',
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
  ]);
  getnewWeeks('getnewWeeks en 18', { firstWeekDay: 5, lang: 'en' }, [
    'Fri',
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
  ]);
  getnewWeeks('getnewWeeks en 19', { firstWeekDay: 6, lang: 'en' }, [
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
  ]);
  getnewWeeks('getnewWeeks en 20', { firstWeekDay: 7, lang: 'en' }, [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]);
  getnewWeeks('getnewWeeks en 21', { firstWeekDay: -1, lang: 'en' }, [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]);
  getnewWeeks('getnewWeeks en 22', { firstWeekDay: -2, lang: 'en' }, [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]);
  getnewWeeks('getnewWeeks en 23', { lang: 'en' }, [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]);
});
