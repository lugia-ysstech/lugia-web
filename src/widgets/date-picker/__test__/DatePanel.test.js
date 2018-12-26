import * as React from 'react';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import DatePicker from '../index';
const { RangePicker } = DatePicker;
const { expect: exp } = chai;
const moment = require('moment');
Enzyme.configure({ adapter: new Adapter() });
describe('default', () => {
  function getTarget(target, component) {
    const newTarget = target
      .find(component)
      .at(0)
      .instance();
    return newTarget;
  }
  function getPanelDateStartAndEnd(title: string, params: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      const target = mount(<RangePicker />);
      const newTarget = getTarget(target, 'Dates');
      const { dates, format } = params;
      const obj = newTarget.getPanelDateStartAndEnd(dates, format);
      for (const i in expValue) {
        expect(obj[i]).toBe(expValue[i]);
      }
    });
  }
  getPanelDateStartAndEnd(
    'getPanelDateStartAndEnd',
    {
      dates: [
        '2015-02-01',
        '2015-02-02',
        '2015-02-03',
        '2015-02-04',
        '2015-02-05',
        '2015-02-06',
        '2015-02-07',
        '2015-02-08',
        '2015-02-09',
        '2015-02-10',
        '2015-02-11',
        '2015-02-12',
        '2015-02-13',
        '2015-02-14',
        '2015-02-15',
        '2015-02-16',
        '2015-02-17',
        '2015-02-18',
        '2015-02-19',
        '2015-02-20',
        '2015-02-21',
        '2015-02-22',
        '2015-02-23',
        '2015-02-24',
        '2015-02-25',
        '2015-02-26',
        '2015-02-27',
        '2015-02-28',
        '2015-03-01',
        '2015-03-02',
        '2015-03-03',
        '2015-03-04',
        '2015-03-05',
        '2015-03-06',
        '2015-03-07',
        '2015-03-08',
        '2015-03-09',
        '2015-03-10',
        '2015-03-11',
        '2015-03-12',
        '2015-03-13',
        '2015-03-14',
      ],
      format: 'YYYY-MM-DD',
    },
    { panelFistDate: '2015-01-31', panellastDate: '2015-03-15' }
  );
  getPanelDateStartAndEnd(
    'getPanelDateStartAndEnd',
    {
      dates: [
        '2018-04-29',
        '2018-04-30',
        '2018-05-01',
        '2018-05-02',
        '2018-05-03',
        '2018-05-04',
        '2018-05-05',
        '2018-05-06',
        '2018-05-07',
        '2018-05-08',
        '2018-05-09',
        '2018-05-10',
        '2018-05-11',
        '2018-05-12',
        '2018-05-13',
        '2018-05-14',
        '2018-05-15',
        '2018-05-16',
        '2018-05-17',
        '2018-05-18',
        '2018-05-19',
        '2018-05-20',
        '2018-05-21',
        '2018-05-22',
        '2018-05-23',
        '2018-05-24',
        '2018-05-25',
        '2018-05-26',
        '2018-05-27',
        '2018-05-28',
        '2018-05-29',
        '2018-05-30',
        '2018-05-31',
        '2018-06-01',
        '2018-06-02',
        '2018-06-03',
        '2018-06-04',
        '2018-06-05',
        '2018-06-06',
        '2018-06-07',
        '2018-06-08',
        '2018-06-09',
      ],
      format: 'YYYY-MM-DD',
    },
    { panelFistDate: '2018-04-28', panellastDate: '2018-06-10' }
  );
  getPanelDateStartAndEnd(
    'getPanelDateStartAndEnd',
    {
      dates: [
        '2018-05-27',
        '2018-05-28',
        '2018-05-29',
        '2018-05-30',
        '2018-05-31',
        '2018-06-01',
        '2018-06-02',
        '2018-06-03',
        '2018-06-04',
        '2018-06-05',
        '2018-06-06',
        '2018-06-07',
        '2018-06-08',
        '2018-06-09',
        '2018-06-10',
        '2018-06-11',
        '2018-06-12',
        '2018-06-13',
        '2018-06-14',
        '2018-06-15',
        '2018-06-16',
        '2018-06-17',
        '2018-06-18',
        '2018-06-19',
        '2018-06-20',
        '2018-06-21',
        '2018-06-22',
        '2018-06-23',
        '2018-06-24',
        '2018-06-25',
        '2018-06-26',
        '2018-06-27',
        '2018-06-28',
        '2018-06-29',
        '2018-06-30',
        '2018-07-01',
        '2018-07-02',
        '2018-07-03',
        '2018-07-04',
        '2018-07-05',
        '2018-07-06',
        '2018-07-07',
      ],
      format: 'YYYY-MM-DD',
    },
    { panelFistDate: '2018-05-26', panellastDate: '2018-07-08' }
  );

  function getIndexInValue(title: string, props: Object, params: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      const target = mount(<RangePicker {...props} />);
      const newTarget = getTarget(target, 'Dates');
      target
        .find('Range')
        .at(0)
        .instance()
        .onFocus();
      const { format } = newTarget;
      const { value } = params;
      const moments = moment(value, format);
      target
        .find('Date')
        .at(0)
        .instance()
        .getFreshPicker({ moments });
      const dateIndex = newTarget.getIndexInValue(value);
      const { index } = expValue;
      expect(dateIndex).toBe(index);
    });
  }
  getIndexInValue('getIndexInValue 0', {}, { value: '2015-01-02' }, { index: 6 });
  getIndexInValue('getIndexInValue 1', { firstWeekDay: 1 }, { value: '2015-01-02' }, { index: 5 });
  getIndexInValue('getIndexInValue 2', { firstWeekDay: 2 }, { value: '2015-01-02' }, { index: 4 });
  getIndexInValue('getIndexInValue 3', { firstWeekDay: 3 }, { value: '2015-01-02' }, { index: 3 });
  getIndexInValue('getIndexInValue 4', { firstWeekDay: 4 }, { value: '2015-01-02' }, { index: 2 });
  getIndexInValue('getIndexInValue 5', { firstWeekDay: 5 }, { value: '2015-01-02' }, { index: 8 });
  getIndexInValue('getIndexInValue 6', { firstWeekDay: 6 }, { value: '2015-01-02' }, { index: 7 });
  getIndexInValue('getIndexInValue 7', { firstWeekDay: 7 }, { value: '2015-01-02' }, { index: 6 });

  function getIndexInRange(title: string, props: Object, expValue: Object) {
    it(`onChange ${title}`, async () => {
      const target = mount(<RangePicker {...props} />);
      const newTarget = getTarget(target, 'Dates');
      const range = target
        .find('RangeInput')
        .at(0)
        .instance();
      range.onFocus();
      const { value } = range.state;
      newTarget.getIndexInRange(value);

      let expVal = expValue[0];
      if (newTarget.props.index === 1) {
        expVal = expValue[1];
      }
      for (const i in expVal) {
        expect(newTarget.state[i]).toEqual(expVal[i]);
      }
    });
  }
  getIndexInRange('getIndexInRange 1', { defaultValue: ['2018-12-13', '2018-12-28'] }, [
    {
      choseDayIndex: [19, 34],
      rangeChoseIndex: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      rangeStartIndex: 19,
      rangeEndIndex: 34,
    },
  ]);
  getIndexInRange('getIndexInRange 2', { defaultValue: ['2015-01-02', '2015-02-03'] }, [
    {
      choseDayIndex: 6,
      rangeChoseIndex: [
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
        32,
        33,
        34,
        35,
      ],
      rangeStartIndex: 6,
      rangeEndIndex: 35,
    },
    { choseDayIndex: [3], rangeChoseIndex: [1, 2, 3], rangeStartIndex: 1, rangeEndIndex: 3 },
  ]);
  getIndexInRange('getIndexInRange 1', { defaultValue: ['2024-02-10', '2024-02-24'] }, [
    {
      choseDayIndex: [14, 28],
      rangeChoseIndex: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
      rangeStartIndex: 14,
      rangeEndIndex: 28,
    },
  ]);
});
