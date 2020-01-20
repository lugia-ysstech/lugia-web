/**
 *
 * create by szfeng
 *
 * @flow
 */
import React from 'react';

import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Target from '../index';
import Carousel, { isHasStart, getInitStart } from '../carousel.js';
import renderer from 'react-test-renderer';
import { delay } from '@lugia/react-test-utils';

Enzyme.configure({ adapter: new Adapter() });

describe('Carousel', () => {
  it('getItemWrap switchType : horizontal', () => {
    const item = 'hello world';
    const result = mount(<Target />)
      .children()
      .instance()
      .getItemWrap({
        switchType: 'horizontal',
        start: 0,
        index: 1,
        width: 50,
        height: 50,
        item,
        animationTime: 500,
      });

    expect(renderer.create(<div>{result}</div>).toJSON()).toMatchSnapshot();
  });

  it('getItemWrap switchType : vertical', () => {
    const item = 'hello world';
    const result = mount(<Target />)
      .children()
      .instance()
      .getItemWrap({
        switchType: 'vertical',
        start: 0,
        index: 1,
        width: 50,
        height: 50,
        item,
        animationTime: 500,
      });

    expect(renderer.create(<div>{result}</div>).toJSON()).toMatchSnapshot();
  });

  it('getItemWrap switchType : fade', () => {
    const item = 'hello world';
    const result = mount(<Target />)
      .children()
      .instance()
      .getItemWrap({
        switchType: 'fade',
        start: 0,
        index: 1,
        width: 50,
        height: 50,
        item,
        animationTime: 500,
      });

    expect(renderer.create(<div>{result}</div>).toJSON()).toMatchSnapshot();
  });

  it('isHasStart ', () => {
    expect(isHasStart({ start: 0 })).toBeTruthy();
    expect(isHasStart({})).toBeFalsy();
  });

  it('getInitStart ', () => {
    const children = ['知行合一', '拙能胜巧', '有求皆苦', '无欲则刚'];
    expect(getInitStart({}, 0)).toBe(0);
    expect(getInitStart({ children }, 1)).toBe(1);
    expect(getInitStart({ children }, -1)).toBe(0);
    expect(getInitStart({ children }, 5)).toBe(0);
    expect(getInitStart({ children }, 4)).toBe(4);
  });

  it('getAnimationTime ', () => {
    expect(Carousel.prototype.getAnimationTime({ animationTime: 1000 })).toBe(1000);
    expect(Carousel.prototype.getAnimationTime({ animationTime: 100 })).toBe(200);
    expect(Carousel.prototype.getAnimationTime({ animationTime: 200000 })).toBe(100000);
    expect(Carousel.prototype.getAnimationTime({ animationTime: 0 })).toBe(200);
    expect(Carousel.prototype.getAnimationTime({ animationTime: undefined })).toBe(500);
  });

  it('getPreStart ', () => {
    expect(Carousel.prototype.getPreStart('pre', 1, 4)).toEqual({ preStart: 1, newStart: 0 });
    expect(Carousel.prototype.getPreStart('pre', 0, 4)).toEqual({ preStart: 4, newStart: 3 });
    expect(Carousel.prototype.getPreStart('pre', 3, 4)).toEqual({ preStart: 3, newStart: 2 });

    expect(Carousel.prototype.getPreStart('next', 0, 4)).toEqual({ preStart: 0, newStart: 1 });
    expect(Carousel.prototype.getPreStart('next', 1, 4)).toEqual({ preStart: 1, newStart: 2 });
    expect(Carousel.prototype.getPreStart('next', 3, 4)).toEqual({ preStart: 3, newStart: 4 });
    expect(Carousel.prototype.getPreStart('next', 4, 4)).toEqual({ preStart: 0, newStart: 1 });
  });

  it('is Has SwitchButton,indicatorType : default ', () => {
    const cmp = mount(
      <Target>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Target>
    );
    expect(findPreButton(cmp).length).toBe(1);
    expect(findNextButton(cmp).length).toBe(1);
  });

  it('is Has SwitchButton,indicatorType : outside ', () => {
    const cmp = mount(
      <Target switchType={'outside'}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Target>
    );
    expect(findPreButton(cmp).length).toBe(1);
    expect(findNextButton(cmp).length).toBe(1);
  });

  it('is Has SwitchButton,indicatorType : vertical ', () => {
    const cmp = mount(
      <Target indicatorType={'vertical'}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Target>
    );

    expect(findPreButton(cmp).length).toBe(0);
    expect(findNextButton(cmp).length).toBe(0);
  });

  it('how many indicator,childrne : 0 ', () => {
    const cmp = mount(<Target />);
    expect(findIndicatorContainer(cmp).length).toBe(0);
  });

  it('how many indicator,children : 3 ', () => {
    const cmp = mount(
      <Target>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Target>
    );
    expect(findIndicatorContainer(cmp).length).toBe(3);
  });

  it('how many indicator,children : 3 ', () => {
    const cmp = mount(
      <Target defaultStart={0}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Target>
    );
    expect(findIndicatorContainer(cmp).length).toBe(3);
  });

  it('how many indicator,children : 0 ', () => {
    const cmp = mount(<Target defaultStart={0} />);
    expect(findIndicatorContainer(cmp).length).toBe(0);
  });

  it('hover indicator defaultStart = 0 , this indicator props checked', async () => {
    const cmp = mount(
      <Target defaultStart={0}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Target>
    );
    expect(findIndicatorContainer(cmp).length).toBe(4);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeTruthy();
    hoverIndicator(cmp, 2);
    await delay(1000);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeFalsy();
    expect(getIndicatorIndex(cmp, 2).props().checked).toBeTruthy();
  });

  it('hover indicator defaultStart = 4 , this indicator props checked', async () => {
    const cmp = mount(
      <Target defaultStart={4}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Target>
    );
    expect(findIndicatorContainer(cmp).length).toBe(4);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeTruthy();
    clickIndicator(cmp, 1);
    await delay(1000);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeTruthy();
    expect(getIndicatorIndex(cmp, 1).props().checked).toBeFalsy();

    hoverIndicator(cmp, 2);
    await delay(1000);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeFalsy();
    expect(getIndicatorIndex(cmp, 2).props().checked).toBeTruthy();
  });

  it('click indicator  defaultStart = 0, this indicator props checked', async () => {
    const cmp = mount(
      <Target action={'click'} defaultStart={0}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Target>
    );
    expect(findIndicatorContainer(cmp).length).toBe(4);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeTruthy();

    hoverIndicator(cmp, 1);
    await delay(1000);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeTruthy();
    expect(getIndicatorIndex(cmp, 1).props().checked).toBeFalsy();

    clickIndicator(cmp, 2);
    await delay(1000);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeFalsy();
    expect(getIndicatorIndex(cmp, 2).props().checked).toBeTruthy();
  });

  it('click indicator  defaultStart = 4, this indicator props checked', async () => {
    const cmp = mount(
      <Target action={'click'} defaultStart={4}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Target>
    );
    expect(findIndicatorContainer(cmp).length).toBe(4);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeTruthy();
    clickIndicator(cmp, 2);
    await delay(1000);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeFalsy();
    expect(getIndicatorIndex(cmp, 2).props().checked).toBeTruthy();
  });

  it('click PreButton  defaultStart = 0, this indicator props checked', async () => {
    const cmp = mount(
      <Target defaultStart={0}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Target>
    );
    expect(findIndicatorContainer(cmp).length).toBe(4);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeTruthy();
    clickPreButton(cmp);
    await delay(1000);
    expect(getIndicatorIndex(cmp, 3).props().checked).toBeTruthy();

    await delay(1000);
    clickPreButton(cmp);
    await delay(1000);
    expect(getIndicatorIndex(cmp, 2).props().checked).toBeTruthy();
  });

  it('click NextButton  defaultStart = 0, this indicator props checked', async () => {
    const cmp = mount(
      <Target defaultStart={0}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Target>
    );
    expect(findIndicatorContainer(cmp).length).toBe(4);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeTruthy();
    clickNextButton(cmp);
    await delay(1000);
    expect(getIndicatorIndex(cmp, 1).props().checked).toBeTruthy();

    await delay(1000);
    clickNextButton(cmp);
    await delay(1000);
    expect(getIndicatorIndex(cmp, 2).props().checked).toBeTruthy();
  });

  it('double click NextButton defaultStart = 3, , this indicator props checked', async () => {
    const cmp = mount(
      <Target defaultStart={3}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Target>
    );
    expect(findIndicatorContainer(cmp).length).toBe(4);
    expect(getIndicatorIndex(cmp, 3).props().checked).toBeTruthy();
    clickNextButton(cmp);
    await delay(1000);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeTruthy();

    await delay(1000);
    clickNextButton(cmp);
    clickNextButton(cmp);
    await delay(1000);
    expect(getIndicatorIndex(cmp, 1).props().checked).toBeTruthy();
  });

  it('handleAutoPlay', async () => {
    const cmp = mount(
      <Target defaultStart={0} autoPlay delay={200} animationTime={200}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Target>
    );
    expect(findIndicatorContainer(cmp).length).toBe(4);
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeTruthy();
    expect(getIndicatorIndex(cmp, 1).props().checked).toBeFalsy();
    expect(getIndicatorIndex(cmp, 2).props().checked).toBeFalsy();
    expect(getIndicatorIndex(cmp, 3).props().checked).toBeFalsy();

    await delay(250);
    cmp.update();
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeFalsy();
    expect(getIndicatorIndex(cmp, 1).props().checked).toBeTruthy();
    expect(getIndicatorIndex(cmp, 2).props().checked).toBeFalsy();
    expect(getIndicatorIndex(cmp, 3).props().checked).toBeFalsy();

    await delay(1000);
    cmp.update();
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeFalsy();
    expect(getIndicatorIndex(cmp, 1).props().checked).toBeFalsy();
    expect(getIndicatorIndex(cmp, 2).props().checked).toBeTruthy;
    expect(getIndicatorIndex(cmp, 3).props().checked).toBeFalsy();

    await delay(1000);
    cmp.update();
    expect(getIndicatorIndex(cmp, 0).props().checked).toBeFalsy();
    expect(getIndicatorIndex(cmp, 1).props().checked).toBeFalsy();
    expect(getIndicatorIndex(cmp, 2).props().checked).toBeFalsy;
    expect(getIndicatorIndex(cmp, 3).props().checked).toBeTruthy();
  });

  function findPreButton(cmp: Object) {
    return cmp.find('PreButton');
  }

  function findNextButton(cmp: Object) {
    return cmp.find('NextButton');
  }

  function findIndicatorContainer(cmp: Object) {
    return cmp.find('IndicatorContainer');
  }

  function findIndicator(cmp: Object) {
    return cmp.find('indicator');
  }

  function getIndicatorIndex(cmp: Object, index: number) {
    return findIndicator(cmp).at(index);
  }

  function getIndicatorIndexWrap(cmp: Object, index: number) {
    return findIndicatorContainer(cmp).at(index);
  }

  function clickIndicator(cmp: Object, index: number) {
    getIndicatorIndex(cmp, index).simulate('click');
  }

  function hoverIndicator(cmp: Object, index: number) {
    getIndicatorIndexWrap(cmp, index).simulate('mouseEnter');
  }

  function clickPreButton(cmp: Object) {
    findPreButton(cmp)
      .at(0)
      .simulate('click');
  }

  function clickNextButton(cmp: Object) {
    findNextButton(cmp)
      .at(0)
      .simulate('click');
  }
});
