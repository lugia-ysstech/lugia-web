import * as React from 'react';
import Slider from '../index';
import Wrapper from '../demo';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import { async } from 'rxjs/internal/scheduler/async';
import Theme from '../../theme/index';
import Widgets from '../../consts/index';
const { expect: exp } = chai;
Enzyme.configure({ adapter: new Adapter() });
describe('default', () => {
  it('Wrapper', () => {
    const target = <Slider />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  function getTarget(target) {
    return target
      .children()
      .at(0)
      .instance();
  }
  function getThemeTarget(target) {
    return target
      .children()
      .at(0)
      .children()
      .at(0)
      .children()
      .at(0)
      .instance();
  }
  it('css', () => {
    const target = mount(
      <Theme
        config={{
          [Widgets.SliderButton]: { color: '#333' },
          [Widgets.Slider]: { color: '#f22735', width: 300 },
        }}
      >
        <Slider rangeH={4} rangeW={100} />
      </Theme>
    );
    expect(getThemeTarget(target).style.rangeW).toBe(300);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });

  it('defaultValue', () => {
    const target = mount(<Slider defaultValue={10} />);
    expect(getTarget(target).state.value).toEqual([10]);
  });
  it('value={23}', () => {
    const target = mount(<Slider defaultValue={10} value={23} tips />);
    expect(getTarget(target).state.value).toEqual([23]);
  });
  it('disabled', () => {
    const target = mount(<Slider value={2} maxValue={30} disabled />);
    expect(getTarget(target).state.value).toEqual([2]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('minValue maxValue', () => {
    const target = mount(<Slider maxValue={40} minValue={10} />);
    expect(getTarget(target).state.minValue).toBe(10);
    expect(getTarget(target).state.maxValue).toBe(40);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('defaultValue number defaultValue<minValue defaultValue=minValue', () => {
    const target = mount(<Slider minValue={10} defaultValue={-1} />);
    expect(getTarget(target).state.minValue).toBe(10);
    expect(getTarget(target).state.value).toEqual([10]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('defaultValue number defaultValue>maxValue defaultValue=maxValue', () => {
    const target = mount(<Slider maxValue={40} defaultValue={50} />);
    expect(getTarget(target).state.maxValue).toBe(40);
    expect(getTarget(target).state.value).toEqual([40]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('defaultValue Array length==1 defaultValue<minValue defaultValue=minValue', () => {
    const target = mount(<Slider minValue={0} defaultValue={[-1]} />);
    expect(getTarget(target).state.minValue).toBe(0);
    expect(getTarget(target).state.value).toEqual([0]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('defaultValue Array length==1 defaultValue>maxValue defaultValue=maxValue', () => {
    const target = mount(<Slider maxValue={40} defaultValue={[50]} />);
    expect(getTarget(target).state.maxValue).toBe(40);
    expect(getTarget(target).state.value).toEqual([40]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('defaultValue Array length==2 defaultValue[0]< minValue', () => {
    const target = mount(<Slider minValue={10} defaultValue={[-1, 10]} />);
    expect(getTarget(target).state.minValue).toBe(10);
    expect(getTarget(target).state.value).toEqual([10, 10]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('defaultValue Array length==2 defaultValue[1]<minValue defaultValue=minValue', () => {
    const target = mount(<Slider minValue={10} defaultValue={[10, -1]} />);
    expect(getTarget(target).state.minValue).toBe(10);
    expect(getTarget(target).state.value).toEqual([10, 10]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('defaultValue Array length==2 defaultValue[0]>maxValue defaultValue[0]=maxValue', () => {
    const target = mount(<Slider maxValue={40} defaultValue={[50, 20]} />);
    expect(getTarget(target).state.maxValue).toBe(40);
    expect(getTarget(target).state.value).toEqual([40, 20]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('defaultValue Array length==2 defaultValue[1]>maxValue defaultValue[1]=maxValue', () => {
    const target = mount(<Slider maxValue={40} defaultValue={[10, 50]} />);
    expect(getTarget(target).state.maxValue).toBe(40);
    expect(getTarget(target).state.value).toEqual([10, 40]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });

  it('离散值 marks={} length==1 has maxValue minValue', () => {
    const marks = {
      10: {
        text: '10℃',
        style: {
          color: 'blue',
        },
      },
      20: {
        text: '20℃',
        style: {
          color: 'pink',
        },
      },
      40: {
        text: '40℃',
        style: {
          color: 'red',
        },
      },
    };
    const target = mount(<Slider maxValue={25} defaultValue={5} minValue={0} marks={marks} />);
    expect(getTarget(target).state.maxValue).toBe(25);
    expect(getTarget(target).state.minValue).toBe(0);
    expect(getTarget(target).state.value).toEqual([5]);
    expect(getTarget(target).state.marksKeys).toEqual([0, 10, 20, 25]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('离散值 marks={} length==2 has maxValue minValue', () => {
    const marks = {
      10: {
        text: '10℃',
        style: {
          color: 'blue',
        },
      },
      20: {
        text: '20℃',
        style: {
          color: 'pink',
        },
      },
      40: {
        text: '40℃',
        style: {
          color: 'red',
        },
      },
    };
    const target = mount(
      <Slider maxValue={25} defaultValue={[10, 20]} minValue={0} marks={marks} />
    );
    expect(getTarget(target).state.maxValue).toBe(25);
    expect(getTarget(target).state.minValue).toBe(0);
    expect(getTarget(target).state.value).toEqual([10, 20]);
    expect(getTarget(target).state.marksKeys).toEqual([0, 10, 20, 25]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('离散值 marks={} no maxValue minValue', () => {
    const marks = {
      10: {
        text: '10℃',
        style: {
          color: 'blue',
        },
      },
      20: {
        text: '20℃',
        style: {
          color: 'pink',
        },
      },
      40: {
        text: '40℃',
        style: {
          color: 'red',
        },
      },
    };
    const target = mount(<Slider defaultValue={5} marks={marks} />);
    expect(getTarget(target).state.maxValue).toBe(40);
    expect(getTarget(target).state.minValue).toBe(10);
    expect(getTarget(target).state.value).toEqual([10]);
    expect(getTarget(target).state.marksKeys).toEqual([10, 20, 40]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('离散值 marks={}  publicMove', () => {
    const marks = {
      10: {
        text: '10℃',
        style: {
          color: 'blue',
        },
      },
      20: {
        text: '20℃',
        style: {
          color: 'pink',
        },
      },
      40: {
        text: '40℃',
        style: {
          color: 'red',
        },
      },
    };
    const target = mount(<Slider maxValue={25} defaultValue={5} minValue={15} marks={marks} />);
    // publicMove
    getTarget(target).setState({ offsetLeft: 70 });
    getTarget(target).publicmove(186, 101, 0);
    expect(getTarget(target).state.value).toEqual([20]);
    getTarget(target).publicmove(130, 102, 0);
    expect(getTarget(target).state.value).toEqual([15]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Function publicmove 横向 单滑块', async () => {
    const target = mount(<Slider minValue={0} defaultValue={0} maxValue={30} />);
    //横向slider
    // 单滑块
    getTarget(target).setState({ offsetLeft: 70 });
    getTarget(target).publicmove(106, 104, 0); // pageX,pageY,index(滑块的index)
    expect(getTarget(target).state.value).toEqual([3.6]);
    getTarget(target).publicmove(53, 103, 0);
    expect(getTarget(target).state.value).toEqual([0]);
    getTarget(target).publicmove(40, 103, 0); //pageX 小于最左边的临界值 ，value为minValue
    expect(getTarget(target).state.value).toEqual([0]);
    getTarget(target).publicmove(370, 105, 0);
    expect(getTarget(target).state.value).toEqual([30]);
    getTarget(target).publicmove(393, 103, 0); //pageX 大于最右边的临界值 ，value为maxValue
    expect(getTarget(target).state.value).toEqual([30]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Function publicmove 横向 双滑块', async () => {
    const target = mount(<Slider minValue={0} defaultValue={[0, 20]} maxValue={30} />);
    //横向slider
    //双滑块
    getTarget(target).setState({ offsetLeft: 70 });
    getTarget(target).publicmove(232, 422, 1);
    expect(getTarget(target).state.value).toEqual([0, 16.2]);
    getTarget(target).publicmove(118, 425, 0);
    expect(getTarget(target).state.value).toEqual([4.8, 16.2]);
    getTarget(target).publicmove(397, 418, 1); //pageX 小于最左边的临界值 ，value为minValue
    expect(getTarget(target).state.value).toEqual([4.8, 30]);
    getTarget(target).publicmove(37, 417, 0); //pageX 大于最右边的临界值 ，value为maxValue
    expect(getTarget(target).state.value).toEqual([0, 30]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Function publicmove 纵向 单滑块', async () => {
    const target = mount(<Slider defaultValue={10} vertical />);
    getTarget(target).setState({ offsetTop: 124 });
    getTarget(target).publicmove(99, 323, 0); // pageX,pageY,index(滑块的index)
    expect(getTarget(target).state.value).toEqual([10.1]);
    getTarget(target).publicmove(97, 424, 0);
    expect(getTarget(target).state.value).toEqual([0]);
    getTarget(target).publicmove(97, 429, 0); //pageY 小于最下的临界值 ，value为minValue
    expect(getTarget(target).state.value).toEqual([0]);
    getTarget(target).publicmove(103, 124, 0);
    expect(getTarget(target).state.value).toEqual([30]);
    getTarget(target).publicmove(97, 120, 0); //pageY 大于最上的临界值 ，value为maxValue
    expect(getTarget(target).state.value).toEqual([30]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Function publicmove 纵向 双滑块', async () => {
    const target = mount(<Slider defaultValue={[10, 20]} tips vertical />);
    getTarget(target).setState({ offsetTop: 124 });
    getTarget(target).publicmove(254, 338, 0);
    expect(getTarget(target).state.value).toEqual([8.6, 20]);
    getTarget(target).publicmove(256, 188, 1);
    expect(getTarget(target).state.value).toEqual([8.6, 23.6]);
    getTarget(target).publicmove(256, 424, 0); //pageY 小于最下的临界值 ，value为minValue
    expect(getTarget(target).state.value).toEqual([0, 23.6]);
    getTarget(target).publicmove(256, 430, 0);
    expect(getTarget(target).state.value).toEqual([0, 23.6]);
    getTarget(target).publicmove(256, 124, 1); //pageY 大于最上边的临界值 ，value为maxValue
    expect(getTarget(target).state.value).toEqual([0, 30]);
    getTarget(target).publicmove(256, 120, 1); //pageY 大于最上边的临界值 ，value为maxValue
    expect(getTarget(target).state.value).toEqual([0, 30]);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Function getMoveState 横向 单滑块', async () => {
    const target = mount(<Slider minValue={0} defaultValue={0} maxValue={30} />);
    //横向slider
    // 单滑块
    getTarget(target).setState({ offsetLeft: 70 });
    const { moveValue } = getTarget(target).getMoveState(149, 103, 0);
    expect(moveValue).toBe(7.9);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Function getMoveState 横向 双滑块', async () => {
    const target = mount(<Slider minValue={0} defaultValue={[5, 10]} maxValue={30} />);
    //横向slider
    // 单滑块
    getTarget(target).setState({ offsetLeft: 70 });
    const { moveValue } = getTarget(target).getMoveState(220, 101, 1);
    expect(moveValue).toBe(15);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Function getMoveState 纵向 单滑块', async () => {
    const target = mount(<Slider vertical />);
    getTarget(target).setState({ offsetTop: 94 });
    const { moveValue } = getTarget(target).getMoveState(73, 281, 0);
    expect(moveValue).toBe(11.3);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Function getMoveState 纵向 双滑块', async () => {
    const target = mount(<Slider vertical />);
    getTarget(target).setState({ offsetTop: 94 });
    const { moveValue } = getTarget(target).getMoveState(71, 146, 1);
    expect(moveValue).toBe(24.8);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Function getNewIndex  单滑块', async () => {
    const target = mount(<Slider defaultValue={0} />);
    getTarget(target).setState({ offsetLeft: 70 });
    const { index } = getTarget(target).getNewIndex(139, 105);
    expect(index).toBe(0);
    getTarget(target).setState({ offsetLeft: 94, vertical: true });
    expect(index).toBe(0);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Function getNewIndex  双滑块', async () => {
    const target = mount(<Slider defaultValue={[5, 10]} />);
    getTarget(target).setState({ offsetLeft: 70 });
    const firstIndex = getTarget(target).getNewIndex(101, 104).index;
    expect(firstIndex).toBe(0);
    const secondIndex = getTarget(target).getNewIndex(199, 104).index;
    expect(secondIndex).toBe(1);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  function getMarkValue(
    title: string,
    props: Object,
    offset: Object,
    event: Array<number>,
    expectValue: number
  ) {
    it(`Function getMarkValue ${title}`, async () => {
      const target = mount(<Slider {...props} />);
      const { marksKeys } = getTarget(target).state;
      getTarget(target).setState(offset);
      const moveValue = getTarget(target).getMoveState(...event).moveValue;
      const markValue = getTarget(target).getMarkValue(marksKeys, moveValue).markValue;
      expect(markValue).toBe(expectValue);
      expect(renderer.create(target).toJSON()).toMatchSnapshot();
    });
  }
  const getMarkValueMarks = {
    10: {
      text: '10℃',
      style: {
        color: 'blue',
      },
    },
    20: {
      text: '20℃',
      style: {
        color: 'pink',
      },
    },
    40: {
      text: '40℃',
      style: {
        color: 'red',
      },
    },
  };
  getMarkValue(
    'marks 横向，单滑块',
    { marks: getMarkValueMarks },
    { offsetLeft: 70 },
    [156, 904],
    20
  );
  getMarkValue(
    'marks 横向，单滑块',
    { marks: getMarkValueMarks },
    { offsetLeft: 70 },
    [340, 904],
    40
  );
  getMarkValue(
    'marks 横向，单滑块',
    { marks: getMarkValueMarks },
    { offsetLeft: 70 },
    [93, 904],
    10
  );
  getMarkValue(
    'marks 横向，双滑块',
    { marks: getMarkValueMarks, minValue: 0, maxValue: 25, defaultValue: [10, 20] },
    { offsetLeft: 410 },
    [457, 743],
    0
  );
  getMarkValue(
    'marks 横向，双滑块',
    { marks: getMarkValueMarks, minValue: 0, maxValue: 25, defaultValue: [10, 20] },
    { offsetLeft: 410 },
    [692, 744],
    25
  );
  getMarkValue(
    'marks 横向，双滑块',
    { marks: getMarkValueMarks, minValue: 0, maxValue: 25, defaultValue: [10, 20] },
    { offsetLeft: 410 },
    [619, 741],
    20
  );
  getMarkValue(
    'marks vetical，单滑块',
    { vertical: true, marks: getMarkValueMarks, minValue: 0, maxValue: 50, defaultValue: 10 },
    { offsetTop: 603 },
    [576, 823],
    10
  );
  getMarkValue(
    'marks vetical，单滑块',
    { vertical: true, marks: getMarkValueMarks, minValue: 0, maxValue: 50, defaultValue: 10 },
    { offsetTop: 603 },
    [576, 674],
    40
  );
  getMarkValue(
    'marks vetical，单滑块',
    { vertical: true, marks: getMarkValueMarks, minValue: 0, maxValue: 50, defaultValue: 10 },
    { offsetTop: 603 },
    [576, 595],
    50
  );
  getMarkValue(
    'marks vetical，双滑块',
    { vertical: true, marks: getMarkValueMarks, minValue: 0, maxValue: 50, defaultValue: [10, 20] },
    { offsetTop: 603 },
    [712, 882],
    0
  );
  getMarkValue(
    'marks vetical，双滑块',
    { vertical: true, marks: getMarkValueMarks, minValue: 0, maxValue: 50, defaultValue: [10, 20] },
    { offsetTop: 603 },
    [712, 619],
    50
  );
  getMarkValue(
    'marks vetical，双滑块',
    { vertical: true, marks: getMarkValueMarks, minValue: 0, maxValue: 50, defaultValue: [10, 20] },
    { offsetTop: 603 },
    [712, 795],
    20
  );

  function getMoveValue(
    title?: string,
    props: Object,
    enterValue: Array<number>,
    expectVal: Array<number>
  ) {
    it(`Function getMoveValue ${title}`, async () => {
      const target = mount(<Slider {...props} />);
      const { btnWidth } = target.props();
      let curVal, expVal;
      enterValue.forEach(currentVal => {
        curVal = currentVal;
      });
      expectVal.forEach(val => {
        expVal = val;
      });
      const { btnMove } = getTarget(target).getMoveValue(curVal, btnWidth);
      expect(btnMove).toBe(expVal);
      expect(renderer.create(target).toJSON()).toMatchSnapshot();
    });
  }
  getMoveValue(
    '横向 单滑块 默认状态',
    { defaultValue: 5, btnWidth: 20 },
    [5],
    [13.333333333333334]
  );
  getMoveValue('横向 单滑块 点击', { defaultValue: 5, btnWidth: 20 }, [9.5], [28.333333333333332]);
  getMoveValue('横向 单滑块 再点击', { defaultValue: 5, btnWidth: 20 }, [19], [60]);
  getMoveValue(
    '横向 双滑块 默认',
    { defaultValue: [5, 10], btnWidth: 20 },
    [5, 10],
    [13.333333333333334, 30]
  );
  getMoveValue(
    '横向 双滑块 点击',
    { defaultValue: [5, 10], btnWidth: 20 },
    [5, 14.2],
    [13.333333333333334, 44]
  );
  getMoveValue('横向 双滑块 再点击', { defaultValue: [5, 10], btnWidth: 20 }, [7, 14.2], [20, 44]);
  getMoveValue(
    '纵向 单滑块 默认状态',
    { defaultValue: 0, btnWidth: 20, vertical: true },
    [0],
    [-3.3333333333333335]
  );
  getMoveValue(
    '纵向 单滑块 默认状态',
    { defaultValue: 0, btnWidth: 20, vertical: true },
    [0],
    [-3.3333333333333335]
  );
  getMoveValue(
    '纵向 单滑块 点击',
    { defaultValue: 0, btnWidth: 20, vertical: true },
    [11.6],
    [35.333333333333336]
  );
  getMoveValue(
    '纵向 单滑块 再点击',
    { defaultValue: 0, btnWidth: 20, vertical: true },
    [11.6],
    [35.333333333333336]
  );
  getMoveValue(
    '纵向 双滑块 默认',
    { defaultValue: [10, 20], btnWidth: 20, vertical: true },
    [10, 20],
    [30, 63.33333333333333]
  );
  getMoveValue(
    '纵向 双滑块 点击',
    { defaultValue: [10, 20], btnWidth: 20, vertical: true },
    [10, 24.3],
    [30, 77.66666666666667]
  );
  getMoveValue(
    '纵向 双滑块 再点击',
    { defaultValue: [10, 20], btnWidth: 20, vertical: true },
    [5.6, 24.3],
    [15.333333333333332, 77.66666666666667]
  );
  it('Function mouseenter', async () => {
    const target = mount(<Slider defaultValue={[0, 20]} tips />);
    getTarget(target).setState({ offsetLeft: 70 });
    getTarget(target).mouseenter(0)();
    expect(getTarget(target).state.index).toBe(0);
    getTarget(target).mouseenter(1)();
    expect(getTarget(target).state.index).toBe(1);
    expect(getTarget(target).state.isInBall).toBe(true);
    expect(getTarget(target).state.changeBackground).toBe(true);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('Function mouseleave', async () => {
    const target = mount(<Slider defaultValue={[0, 20]} tips />);
    getTarget(target).setState({ offsetLeft: 70 });
    getTarget(target).mouseleave();
    expect(getTarget(target).state.isInBall).toBe(false);
    expect(getTarget(target).state.changeBackground).toBe(false);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  function onChange(title: string, props: Object, offset: Object, event: Object, expectValue: any) {
    it(`Function onchange ${title}`, async () => {
      const { disabled, value } = props;
      let Result = {};
      const onChange = jest.fn(function(object) {
        Result = object;
        delete Result.event;
      });
      const target = mount(<Slider {...props} tips onChange={onChange} />);
      getTarget(target).setState(offset);
      if (!disabled && !value) {
        getTarget(target).mousedown(event);
        getTarget(target).mouseup();
        expect(Result).toEqual(expectValue);
        expect(onChange.mock.calls.length).toBe(1);
      }
      if (disabled && value) {
        expect(getTarget(target).mousedown).toEqual(null);
        getTarget(target).mouseup();
        expect(onChange.mock.calls.length).toBe(0);
      }
      expect(renderer.create(target).toJSON()).toMatchSnapshot();
    });
  }
  onChange(
    '横向 normal length=1',
    { minValue: 0, maxValue: 30, defaultValue: 0 },
    { offsetLeft: 70 },
    { pageX: 156, pageY: 103 },
    { oldValue: 0, newValue: 8.6 }
  );
  onChange(
    '横向 normal length=2',
    { minValue: 0, maxValue: 30, defaultValue: [5, 10] },
    { offsetLeft: 70 },
    { pageX: 207, pageY: 103 },
    { oldValue: [5, 10], newValue: [5, 13.7] }
  );
  onChange(
    '横向 disabled',
    { minValue: 0, maxValue: 30, defaultValue: 0, disabled: true },
    { offsetLeft: 70 },
    {},
    {}
  );
  onChange(
    '横向 disabled length=2',
    { minValue: 0, maxValue: 30, defaultValue: [5, 10], disabled: true },
    { offsetLeft: 70 },
    {},
    {}
  );
  onChange(
    '横向 value',
    { minValue: 0, maxValue: 30, defaultValue: 0, value: 2 },
    { offsetLeft: 70 },
    { pageX: 156, pageY: 103 },
    { oldValue: 2, newValue: 2 }
  );
  onChange(
    '横向 value length=2',
    { minValue: 0, maxValue: 30, defaultValue: [5, 10], value: [5, 15] },
    { offsetLeft: 70 },
    { pageX: 207, pageY: 103 },
    {}
  );
  const marks = {
    10: {
      text: '10℃',
      style: {
        color: 'blue',
      },
    },
    20: {
      text: '20℃',
      style: {
        color: 'pink',
      },
    },
    40: {
      text: '40℃',
      style: {
        color: 'red',
      },
    },
  };
  onChange(
    '横向 marks length=1',
    { maxValue: 25, defaultValue: 10, minValue: 0, marks },
    { offsetLeft: 70 },
    { pageX: 292, pageY: 106 },
    {
      oldValue: 10,
      newValue: 20,
      oldItem: { text: '10℃', style: { color: 'blue' } },
      newItem: { style: { color: 'pink' }, text: '20℃' },
    }
  );
  onChange(
    '横向 marks length=1 disabled',
    { maxValue: 25, defaultValue: 5, minValue: 15, marks, disabled: true },
    { offsetLeft: 70 },
    { pageX: 163, pageY: 104 },
    {}
  );
  onChange(
    '横向 marks length=1 value',
    { maxValue: 25, defaultValue: 5, minValue: 15, marks, value: 15 },
    { offsetLeft: 70 },
    { pageX: 163, pageY: 104 },
    { oldValue: 15, newValue: 15, oldItem: '15', newItem: '15' }
  );
  onChange(
    '横向 marks length=2',
    { maxValue: 25, defaultValue: [15, 20], minValue: 15, marks },
    { offsetLeft: 70 },
    { pageX: 332, pageY: 104 },
    {
      oldValue: [15, 20],
      newValue: [15, 25],
      oldItem: ['15', { text: '20℃', style: { color: 'pink' } }],
      newItem: ['15', '25'],
    }
  );
  onChange(
    '横向 marks length=2 disabled',
    { maxValue: 25, defaultValue: [15, 20], minValue: 15, marks, disabled: true },
    { offsetLeft: 70 },
    { pageX: 332, pageY: 104 },
    {}
  );
  onChange(
    '横向 marks length=2 value',
    { maxValue: 25, defaultValue: [15, 20], minValue: 15, marks, value: [15, 20] },
    { offsetLeft: 70 },
    { pageX: 332, pageY: 104 },
    {
      oldValue: [15, 20],
      newValue: [15, 20],
      oldItem: ['15', { text: '20℃', style: { color: 'pink' } }],
      newItem: ['15', { text: '20℃', style: { color: 'pink' } }],
    }
  );
  onChange(
    '纵向 normal length=1',
    { minValue: 0, maxValue: 30, defaultValue: 0, vertical: true },
    { offsetTop: 603 },
    { pageX: 100, pageY: 815 },
    { oldValue: 0, newValue: 8.8 }
  );
  onChange(
    '纵向 normal length=1',
    { minValue: 0, maxValue: 30, defaultValue: 0, vertical: true },
    { offsetTop: 603 },
    { pageX: 104, pageY: 780 },
    { oldValue: 0, newValue: 12.3 }
  );
  onChange(
    '纵向 normal length=2',
    { minValue: 0, maxValue: 30, defaultValue: [10, 20], vertical: true },
    { offsetTop: 603 },
    { pageX: 422, pageY: 661 },
    { oldValue: [10, 20], newValue: [10, 24.2] }
  );
  onChange(
    '纵向 normal length=2',
    { minValue: 0, maxValue: 30, defaultValue: [10, 20], vertical: true },
    { offsetTop: 603 },
    { pageX: 422, pageY: 849 },
    { oldValue: [10, 20], newValue: [5.4, 20] }
  );
  onChange(
    '纵向 disabled',
    { minValue: 0, maxValue: 30, defaultValue: 0, disabled: true, vertical: true },
    { offsetTop: 603 },
    {},
    {}
  );
  onChange(
    '纵向 value length==1',
    { minValue: 0, maxValue: 30, defaultValue: 0, value: 10, vertical: true },
    { offsetTop: 603 },
    { pageX: 270, pageY: 751 },
    {}
  );
  onChange(
    '纵向 value length==1',
    { minValue: 0, maxValue: 30, defaultValue: 0, value: 10, vertical: true },
    { offsetTop: 603 },
    { pageX: 268, pageY: 839 },
    {}
  );
  onChange(
    '纵向 value length==2',
    { minValue: 0, maxValue: 30, defaultValue: 0, value: [10, 20], vertical: true },
    { offsetTop: 603 },
    { pageX: 776, pageY: 831 },
    {}
  );
  onChange(
    '纵向 value length==2',
    { minValue: 0, maxValue: 30, defaultValue: 0, value: [10, 20], vertical: true },
    { offsetTop: 603 },
    { pageX: 778, pageY: 655 },
    {}
  );
  onChange(
    '纵向 marks length=1',
    { maxValue: 50, defaultValue: 10, minValue: 0, marks, vertical: true },
    { offsetTop: 603 },
    { pageX: 980, pageY: 796 },
    {
      oldValue: 10,
      newValue: 20,
      oldItem: { text: '10℃', style: { color: 'blue' } },
      newItem: { style: { color: 'pink' }, text: '20℃' },
    }
  );
  onChange(
    '纵向 marks length=1',
    { maxValue: 50, defaultValue: 10, minValue: 0, marks, vertical: true },
    { offsetTop: 603 },
    { pageX: 979, pageY: 855 },
    {
      oldValue: 10,
      newValue: 10,
      oldItem: { text: '10℃', style: { color: 'blue' } },
      newItem: { text: '10℃', style: { color: 'blue' } },
    }
  );
  onChange(
    '纵向 marks length=1',
    { maxValue: 50, defaultValue: 10, minValue: 0, marks, vertical: true },
    { offsetTop: 603 },
    { pageX: 980, pageY: 613 },
    {
      oldValue: 10,
      newValue: 50,
      oldItem: { text: '10℃', style: { color: 'blue' } },
      newItem: '50',
    }
  );
  onChange(
    '纵向 marks length=2',
    { maxValue: 50, defaultValue: [10, 20], minValue: 0, marks, vertical: true },
    { offsetTop: 603 },
    { pageX: 1116, pageY: 679 },
    {
      oldValue: [10, 20],
      newValue: [10, 40],
      oldItem: [
        { text: '10℃', style: { color: 'blue' } },
        { style: { color: 'pink' }, text: '20℃' },
      ],
      newItem: [
        { text: '10℃', style: { color: 'blue' } },
        { style: { color: 'red' }, text: '40℃' },
      ],
    }
  );
  onChange(
    '纵向 marks length=2',
    { maxValue: 50, defaultValue: [10, 20], minValue: 0, marks, vertical: true },
    { offsetTop: 603 },
    { pageX: 1116, pageY: 877 },
    {
      oldValue: [10, 20],
      newValue: [0, 20],
      oldItem: [
        { text: '10℃', style: { color: 'blue' } },
        { style: { color: 'pink' }, text: '20℃' },
      ],
      newItem: ['0', { style: { color: 'pink' }, text: '20℃' }],
    }
  );
});
