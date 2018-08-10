import * as React from 'react';
import Slider from '../slider';
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
const { mockFunction, mockObject, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');
describe('default', () => {
  it('Wrapper', () => {
    const target = <Slider />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('css', () => {
    const target = mount(
      // <Slider background={'#f22735'} btnWidth={16} btnHeight={16} rangeH={4} rangeW={100} />
      <Theme
        config={{
          [Widgets.SliderButton]: { color: '#333' },
          [Widgets.Slider]: { color: '#f22735' },
        }}
      >
        <Slider rangeH={4} rangeW={100} />
      </Theme>
    );
    console.log(target.props());
    expect(target.props().background).toBe('#f22735');
    expect(target.props().btnWidth).toBe(16);
    expect(target.props().btnHeight).toBe(16);
    expect(target.props().rangeH).toBe(4);
    expect(target.props().rangeW).toBe(100);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('defaultValue', () => {
    const target = mount(<Slider defaultValue={10} />);
    expect(target.state().value).toEqual([10]);
  });
  it('value={23}', () => {
    const Target = mount(<Slider defaultValue={10} value={23} tips />);
    Target.find('Button')
      .at(0)
      .simulate('mousedown');
    expect(Target.state().value).toEqual([23]);
  });
  it('disabled', () => {
    const target = mount(<Slider value={2} maxValue={30} disabled />);
    target
      .find('Button')
      .at(0)
      .simulate('mousedown');
    expect(target.state().value).toEqual([2]);
  });
  it('minValue maxValue', () => {
    const target = mount(<Slider maxValue={40} minValue={10} />);
    expect(target.state().minValue).toBe(10);
    expect(target.state().maxValue).toBe(40);
  });
  it('defaultValue number defaultValue<minValue defaultValue=minValue', () => {
    const target = mount(<Slider minValue={10} defaultValue={-1} />);
    expect(target.state().minValue).toBe(10);
    expect(target.state().value).toEqual([10]);
  });
  it('defaultValue number defaultValue>maxValue defaultValue=maxValue', () => {
    const target = mount(<Slider maxValue={40} defaultValue={50} />);
    expect(target.state().maxValue).toBe(40);
    expect(target.state().value).toEqual([40]);
  });
  it('defaultValue Array length==1 defaultValue<minValue defaultValue=minValue', () => {
    const target = mount(<Slider minValue={0} defaultValue={[-1]} />);
    expect(target.state().minValue).toBe(0);
    expect(target.state().value).toEqual([0]);
  });
  it('defaultValue Array length==1 defaultValue>maxValue defaultValue=maxValue', () => {
    const target = mount(<Slider maxValue={40} defaultValue={[50]} />);
    expect(target.state().maxValue).toBe(40);
    expect(target.state().value).toEqual([40]);
  });
  it('defaultValue Array length==2 defaultValue[0]< minValue', () => {
    const target = mount(<Slider minValue={10} defaultValue={[-1, 10]} />);
    expect(target.state().minValue).toBe(10);
    expect(target.state().value).toEqual([10, 10]);
  });
  it('defaultValue Array length==2 defaultValue[1]<minValue defaultValue=minValue', () => {
    const target = mount(<Slider minValue={10} defaultValue={[10, -1]} />);
    expect(target.state().minValue).toBe(10);
    expect(target.state().value).toEqual([10, 10]);
  });
  it('defaultValue Array length==2 defaultValue[0]>maxValue defaultValue[0]=maxValue', () => {
    const target = mount(<Slider maxValue={40} defaultValue={[50, 20]} />);
    expect(target.state().maxValue).toBe(40);
    expect(target.state().value).toEqual([40, 20]);
  });
  it('defaultValue Array length==2 defaultValue[1]>maxValue defaultValue[1]=maxValue', () => {
    const target = mount(<Slider maxValue={40} defaultValue={[10, 50]} />);
    expect(target.state().maxValue).toBe(40);
    expect(target.state().value).toEqual([10, 40]);
  });

  it('离散值 marks={} has maxValue minValue', () => {
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
    expect(target.state().maxValue).toBe(25);
    expect(target.state().minValue).toBe(0);
    expect(target.state().value).toEqual([5]);
    expect(target.state().marks).toEqual({
      0: '0',
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
      25: '25',
    });
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
    expect(target.state().maxValue).toBe(40);
    expect(target.state().minValue).toBe(10);
    expect(target.state().value).toEqual([10]);
  });
  it('离散值 marks={} has maxValue minValue', () => {
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
    expect(target.state().maxValue).toBe(25);
    expect(target.state().minValue).toBe(15);
    expect(target.state().value).toEqual([15]);
    expect(target.state().marks).toEqual({
      15: '15',
      20: {
        text: '20℃',
        style: {
          color: 'pink',
        },
      },
      25: '25',
    });
    // publicMove
    target.instance().setState({ offsetLeft: 70 });
    target.instance().publicmove(186, 101, 0);
    expect(target.state().value).toEqual([20]);
    target.instance().publicmove(130, 102, 0);
    expect(target.state().value).toEqual([15]);
  });
  it('Function publicmove 横向 单滑块', async () => {
    const target = mount(<Slider minValue={0} defaultValue={0} maxValue={30} />);
    //横向slider
    // 单滑块
    target.instance().setState({ offsetLeft: 70 });
    target.instance().publicmove(106, 104, 0); // pageX,pageY,index(滑块的index)
    expect(target.state().value).toEqual([3.6]);
    target.instance().publicmove(53, 103, 0);
    expect(target.state().value).toEqual([0]);
    target.instance().publicmove(40, 103, 0); //pageX 小于最左边的临界值 ，value为minValue
    expect(target.state().value).toEqual([0]);
    target.instance().publicmove(370, 105, 0);
    expect(target.state().value).toEqual([30]);
    target.instance().publicmove(393, 103, 0); //pageX 大于最右边的临界值 ，value为maxValue
    expect(target.state().value).toEqual([30]);
  });
  it('Function publicmove 横向 双滑块', async () => {
    const target = mount(<Slider minValue={0} defaultValue={[0, 20]} maxValue={30} />);
    //横向slider
    //双滑块
    target.instance().setState({ offsetLeft: 70 });
    target.instance().publicmove(232, 422, 1);
    expect(target.state().value).toEqual([0, 16.2]);
    target.instance().publicmove(118, 425, 0);
    expect(target.state().value).toEqual([4.8, 16.2]);
    target.instance().publicmove(397, 418, 1); //pageX 小于最左边的临界值 ，value为minValue
    expect(target.state().value).toEqual([4.8, 30]);
    target.instance().publicmove(37, 417, 0); //pageX 大于最右边的临界值 ，value为maxValue
    expect(target.state().value).toEqual([0, 30]);
  });
  it('Function publicmove 纵向 单滑块', async () => {
    const target = mount(<Slider defaultValue={10} vertical />);
    target.instance().setState({ offsetTop: 124 });
    target.instance().publicmove(99, 323, 0); // pageX,pageY,index(滑块的index)
    expect(target.state().value).toEqual([10.1]);
    target.instance().publicmove(97, 424, 0);
    expect(target.state().value).toEqual([0]);
    target.instance().publicmove(97, 429, 0); //pageY 小于最下的临界值 ，value为minValue
    expect(target.state().value).toEqual([0]);
    target.instance().publicmove(103, 124, 0);
    expect(target.state().value).toEqual([30]);
    target.instance().publicmove(97, 120, 0); //pageY 大于最上的临界值 ，value为maxValue
    expect(target.state().value).toEqual([30]);
  });
  it('Function publicmove 纵向 双滑块', async () => {
    const target = mount(<Slider defaultValue={[10, 20]} tips vertical />);
    target.instance().setState({ offsetTop: 124 });
    target.instance().publicmove(254, 338, 0);
    expect(target.state().value).toEqual([8.6, 20]);
    target.instance().publicmove(256, 188, 1);
    expect(target.state().value).toEqual([8.6, 23.6]);
    target.instance().publicmove(256, 424, 0); //pageY 小于最下的临界值 ，value为minValue
    expect(target.state().value).toEqual([0, 23.6]);
    target.instance().publicmove(256, 430, 0);
    expect(target.state().value).toEqual([0, 23.6]);
    target.instance().publicmove(256, 124, 1); //pageY 大于最上边的临界值 ，value为maxValue
    expect(target.state().value).toEqual([0, 30]);
    target.instance().publicmove(256, 120, 1); //pageY 大于最上边的临界值 ，value为maxValue
    expect(target.state().value).toEqual([0, 30]);
  });
  it('Function getMoveState 横向 单滑块', async () => {
    const target = mount(<Slider minValue={0} defaultValue={0} maxValue={30} />);
    //横向slider
    // 单滑块
    target.instance().setState({ offsetLeft: 70 });
    const { diffX, moveValue, offsetRight } = target.instance().getMoveState(149, 103, 0);
    expect(diffX).toBe(26.333333333333332);
    expect(moveValue).toBe(7.9);
    expect(offsetRight).toBe(370);
  });
  it('Function getMoveState 横向 双滑块', async () => {
    const target = mount(<Slider minValue={0} defaultValue={[5, 10]} maxValue={30} />);
    //横向slider
    // 单滑块
    target.instance().setState({ offsetLeft: 70 });
    const { diffX, moveValue, offsetRight } = target.instance().getMoveState(220, 101, 1);
    expect(diffX).toBe(50);
    expect(moveValue).toBe(15);
    expect(offsetRight).toBe(370);
  });
  it('Function getMoveState 纵向 单滑块', async () => {
    const target = mount(<Slider vertical />);
    target.instance().setState({ offsetTop: 94 });
    const { diffY, moveValue, offsetBottom } = target.instance().getMoveState(73, 281, 0);
    expect(diffY).toBe(62.33333333333333);
    expect(moveValue).toBe(11.3);
    expect(offsetBottom).toBe(394);
  });
  it('Function getMoveState 纵向 双滑块', async () => {
    const target = mount(<Slider vertical />);
    target.instance().setState({ offsetTop: 94 });
    const { diffY, moveValue, offsetBottom } = target.instance().getMoveState(71, 146, 1);
    expect(diffY).toBe(17.333333333333336);
    expect(moveValue).toBe(24.8);
    expect(offsetBottom).toBe(394);
  });
  it('Function getNewIndex  单滑块', async () => {
    const target = mount(<Slider defaultValue={0} />);
    target.instance().setState({ offsetLeft: 70 });
    const { index } = target.instance().getNewIndex(139, 105);
    expect(index).toBe(0);
    target.instance().setState({ offsetLeft: 94, vertical: true });
    expect(index).toBe(0);
  });
  it('Function getNewIndex  双滑块', async () => {
    const target = mount(<Slider defaultValue={[5, 10]} />);
    target.instance().setState({ offsetLeft: 70 });
    const firstIndex = target.instance().getNewIndex(101, 104).index;
    expect(firstIndex).toBe(0);
    const secondIndex = target.instance().getNewIndex(199, 104).index;
    expect(secondIndex).toBe(1);
  });

  it('Function getMarkValue', async () => {
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
    const marksKeys = [10, 20, 40];
    const target = mount(<Slider marks={marks} />);
    target.instance().setState({ offsetLeft: 70 });
    const { markValue } = target.instance().getMarkValue(marksKeys, 17);
    expect(markValue).toBe(20);
  });
  it('Function getMoveValue', async () => {
    const target = mount(<Slider defaultValue={5} />);
    target.instance().setState({ offsetLeft: 70 });
    const { btnMove } = target.instance().getMoveValue(5, 20);
    expect(btnMove).toBe(13.333333333333334);
  });
  it('Function mouseenter', async () => {
    const target = mount(<Slider defaultValue={[0, 20]} tips />);
    target.instance().setState({ offsetLeft: 70 });
    target.instance().mouseenter(0);
    expect(target.state().index).toBe(0);
    target.instance().mouseenter(1);
    expect(target.state().index).toBe(1);
    expect(target.state().isMouseEnter).toBe(true);
    expect(target.state().changeBackground).toBe(true);
  });
  it('Function mouseleave', async () => {
    const target = mount(<Slider defaultValue={[0, 20]} tips />);
    target.instance().setState({ offsetLeft: 70 });
    target.instance().mouseleave();
    expect(target.state().isMouseEnter).toBe(false);
    expect(target.state().changeBackground).toBe(false);
  });
  function onChange(title: string, props: Object, event: Array<number>, expectValue: any) {
    it(`Function onchange ${title}`, async () => {
      const { disabled } = props;
      let Result = {};
      const onChange = jest.fn(function(object) {
        Result = object;
        delete Result.event;
      });
      const target = mount(<Slider {...props} tips onChange={onChange} />);
      target.instance().setState({ offsetLeft: 70 });
      target.instance().mousedownFun(...event);
      target.instance().mouseup();
      if (!disabled) {
        expect(Result).toEqual(expectValue);
        expect(onChange.mock.calls.length).toBe(1);
      }
      if (disabled) {
        expect(onChange.mock.calls.length).toBe(0);
      }
    });
  }
  onChange(
    'onchange normal length=1',
    { minValue: 0, maxValue: 30, defaultValue: 0 },
    [156, 103, 0],
    { oldValue: 0, newValue: 8.6 }
  );
  onChange(
    'onchange normal length=2',
    { minValue: 0, maxValue: 30, defaultValue: [5, 10] },
    [207, 103, 1],
    { oldValue: [5, 10], newValue: [5, 13.7] }
  );
  onChange(
    'onchange disabled',
    { minValue: 0, maxValue: 30, defaultValue: 0, disabled: true },
    [156, 103, 0],
    {}
  );
  onChange(
    'onchange disabled length=2',
    { minValue: 0, maxValue: 30, defaultValue: [5, 10], disabled: true },
    [207, 103, 1],
    {}
  );
  onChange(
    'onchange value',
    { minValue: 0, maxValue: 30, defaultValue: 0, value: 2 },
    [156, 103, 0],
    { oldValue: 2, newValue: 2 }
  );
  onChange(
    'onchange value length=2',
    { minValue: 0, maxValue: 30, defaultValue: [5, 10], value: [5, 15] },
    [207, 103, 1],
    { oldValue: [5, 15], newValue: [5, 15] }
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
    'onchange marks length=1',
    { maxValue: 25, defaultValue: 5, minValue: 15, marks },
    [163, 104, 0],
    {
      oldValue: 15,
      newValue: 20,
      oldItem: '15',
      newItem: { style: { color: 'pink' }, text: '20℃' },
    }
  );
  onChange(
    'onchange marks length=1 disabled',
    { maxValue: 25, defaultValue: 5, minValue: 15, marks, disabled: true },
    [163, 104, 0],
    {}
  );
  onChange(
    'onchange marks length=1 value',
    { maxValue: 25, defaultValue: 5, minValue: 15, marks, value: 15 },
    [163, 104, 0],
    { oldValue: 15, newValue: 15, oldItem: '15', newItem: '15' }
  );
  onChange(
    'onchange marks length=2',
    { maxValue: 25, defaultValue: [15, 20], minValue: 15, marks },
    [332, 104, 1],
    {
      oldValue: [15, 20],
      newValue: [15, 25],
      oldItem: ['15', { text: '20℃', style: { color: 'pink' } }],
      newItem: ['15', '25'],
    }
  );
  onChange(
    'onchange marks length=2 disabled',
    { maxValue: 25, defaultValue: [15, 20], minValue: 15, marks, disabled: true },
    [332, 104, 1],
    {}
  );
  onChange(
    'onchange marks length=2 value',
    { maxValue: 25, defaultValue: [15, 20], minValue: 15, marks, value: [15, 20] },
    [332, 104, 1],
    {
      oldValue: [15, 20],
      newValue: [15, 20],
      oldItem: ['15', { text: '20℃', style: { color: 'pink' } }],
      newItem: ['15', { text: '20℃', style: { color: 'pink' } }],
    }
  );
});
