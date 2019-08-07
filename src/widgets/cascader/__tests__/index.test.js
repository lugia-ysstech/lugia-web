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
import Cascader from '../cascader';
import Widget from '../../consts/index';

const data = [
  {
    text: '一级菜单1',
    value: 'a1',
    disabled: false,
  },
  { text: '一级菜单2', value: 'a2', disabled: false },
  { text: '一级菜单3', value: 'a3', disabled: false },
  {
    text: '一级菜单4',
    value: 'a4',
    disabled: false,
    children: [
      {
        text: '次级菜单4-1',
        value: 'a4-1',
        children: [{ text: '三级菜单4-1-1', value: 'a4-1-1' }],
      },
    ],
  },
  { text: '一级菜单5', value: 'a5', disabled: true },
  {
    text: '一级菜单6',
    value: 'a6',
    disabled: true,
    children: [
      { text: '次级菜单6-1', value: 'a6-1' },
      {
        text: '次级菜单6-2',
        value: 'a6-2',
      },
    ],
  },
  { text: '一级菜单7', value: 'a7', disabled: true },
  { text: '一级菜单8', value: 'a8', disabled: false },
  { text: '一级菜单9', value: 'a9', disabled: true },
  { text: '一级菜单10', value: 'a10', disabled: false },
];

Enzyme.configure({ adapter: new Adapter() });

describe('Cascader', () => {
  it('no data', () => {
    const cmp = mount(<Target />);
    clickInputTag(cmp);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(0);
    expect(findEmpty(cmp).length).toBe(1);
  });

  it('data: null', () => {
    const cmp = mount(<Target data={null} />);
    clickInputTag(cmp);

    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(0);
    expect(findEmpty(cmp).length).toBe(1);
  });

  it('非受限, action: click', () => {
    const cmp = mount(<Target action={'click'} data={data} />);
    clickInputTag(cmp);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, []);
    expect(inputTagDisplayValue(cmp)).toEqual([]);

    clickMenuItem(cmp, 0);
    menuItemPropsChecked(cmp, 8, [0]);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单1']);

    clickMenuItem(cmp, 1);
    menuItemPropsChecked(cmp, 8, [1]);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单2']);

    clickMenuItem(cmp, 3);
    expect(findMenu(cmp).length).toBe(2);
    expect(findMenuItem(cmp).length).toBe(9);
    menuItemPropsChecked(cmp, 8, [3]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单4']);

    clickMenuItem(cmp, 8);
    expect(findMenu(cmp).length).toBe(3);
    expect(findMenuItem(cmp).length).toBe(10);
    menuItemPropsChecked(cmp, 8, [3, 8]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单4|次级菜单4-1']);

    clickMenuItem(cmp, 9);
    expect(findMenu(cmp).length).toBe(3);
    expect(findMenuItem(cmp).length).toBe(10);
    menuItemPropsChecked(cmp, 8, [3, 8, 9]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单4|次级菜单4-1|三级菜单4-1-1']);
  });

  it('非受限, action: hover', () => {
    const cmp = mount(<Target data={data} action={'hover'} />);
    clickInputTag(cmp);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, []);
    expect(inputTagDisplayValue(cmp)).toEqual([]);

    hoverMenuItem(cmp, 0);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, []);
    expect(inputTagDisplayValue(cmp)).toEqual([]);

    hoverMenuItem(cmp, 1);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, []);
    expect(inputTagDisplayValue(cmp)).toEqual([]);

    hoverMenuItem(cmp, 3);
    expect(findMenu(cmp).length).toBe(2);
    expect(findMenuItem(cmp).length).toBe(9);
    menuItemPropsChecked(cmp, 8, []);
    expect(inputTagDisplayValue(cmp)).toEqual([]);

    hoverMenuItem(cmp, 8);
    expect(findMenu(cmp).length).toBe(3);
    expect(findMenuItem(cmp).length).toBe(10);
    menuItemPropsChecked(cmp, 8, []);
    expect(inputTagDisplayValue(cmp)).toEqual([]);

    hoverMenuItem(cmp, 9);
    expect(findMenu(cmp).length).toBe(3);
    expect(findMenuItem(cmp).length).toBe(10);
    menuItemPropsChecked(cmp, 8, []);
    expect(inputTagDisplayValue(cmp)).toEqual([]);

    clickMenuItem(cmp, 9);
    expect(findMenu(cmp).length).toBe(3);
    expect(findMenuItem(cmp).length).toBe(10);
    menuItemPropsChecked(cmp, 8, [3, 8, 9]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单4|次级菜单4-1|三级菜单4-1-1']);
  });

  it('非受限,hover after click, separator:  / ', () => {
    const cmp = mount(<Target data={data} separator={'/'} action={'hover'} />);
    clickInputTag(cmp);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, []);
    expect(inputTagDisplayValue(cmp)).toEqual([]);

    hoverMenuItem(cmp, 0);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, []);
    expect(inputTagDisplayValue(cmp)).toEqual([]);

    clickMenuItem(cmp, 0);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, [0]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单1']);

    hoverMenuItem(cmp, 1);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, [0]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单1']);

    clickMenuItem(cmp, 1);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, [1]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单2']);

    hoverMenuItem(cmp, 3);
    expect(findMenu(cmp).length).toBe(2);
    expect(findMenuItem(cmp).length).toBe(9);
    menuItemPropsChecked(cmp, 8, [1]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单2']);

    clickMenuItem(cmp, 3);
    expect(findMenu(cmp).length).toBe(2);
    expect(findMenuItem(cmp).length).toBe(9);
    menuItemPropsChecked(cmp, 8, [3]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单4']);

    hoverMenuItem(cmp, 8);
    expect(findMenu(cmp).length).toBe(3);
    expect(findMenuItem(cmp).length).toBe(10);
    menuItemPropsChecked(cmp, 8, [3]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单4']);

    clickMenuItem(cmp, 8);
    expect(findMenu(cmp).length).toBe(3);
    expect(findMenuItem(cmp).length).toBe(10);
    menuItemPropsChecked(cmp, 8, [3, 8]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单4/次级菜单4-1']);

    hoverMenuItem(cmp, 9);
    expect(findMenu(cmp).length).toBe(3);
    expect(findMenuItem(cmp).length).toBe(10);
    menuItemPropsChecked(cmp, 8, [3, 8]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单4/次级菜单4-1']);

    clickMenuItem(cmp, 9);
    expect(findMenu(cmp).length).toBe(3);
    expect(findMenuItem(cmp).length).toBe(10);
    menuItemPropsChecked(cmp, 8, [3, 8, 9]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单4/次级菜单4-1/三级菜单4-1-1']);
  });

  it('非受限, action: hover, click disabled item', () => {
    const cmp = mount(<Target action={'click'} data={data} />);
    clickInputTag(cmp);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, []);
    expect(inputTagDisplayValue(cmp)).toEqual([]);

    hoverMenuItem(cmp, 0);
    menuItemPropsChecked(cmp, 8, []);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    expect(inputTagDisplayValue(cmp)).toEqual([]);

    clickMenuItem(cmp, 0);
    menuItemPropsChecked(cmp, 8, [0]);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单1']);

    hoverMenuItem(cmp, 5);
    menuItemPropsChecked(cmp, 8, [0]);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单1']);

    clickMenuItem(cmp, 5);
    menuItemPropsChecked(cmp, 8, [0]);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单1']);
  });

  it('非受限,只显示最后一项 ,hover after click, showAllLevels: false', () => {
    const cmp = mount(
      <Target data={data} showAllLevels={false} separator={'/'} action={'hover'} />
    );
    clickInputTag(cmp);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, []);
    expect(inputTagDisplayValue(cmp)).toEqual([]);

    hoverMenuItem(cmp, 0);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, []);
    expect(inputTagDisplayValue(cmp)).toEqual([]);

    clickMenuItem(cmp, 0);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, [0]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单1']);

    hoverMenuItem(cmp, 1);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, [0]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单1']);

    clickMenuItem(cmp, 1);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, [1]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单2']);

    hoverMenuItem(cmp, 3);
    expect(findMenu(cmp).length).toBe(2);
    expect(findMenuItem(cmp).length).toBe(9);
    menuItemPropsChecked(cmp, 8, [1]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单2']);

    clickMenuItem(cmp, 3);
    expect(findMenu(cmp).length).toBe(2);
    expect(findMenuItem(cmp).length).toBe(9);
    menuItemPropsChecked(cmp, 8, [3]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单2']);

    hoverMenuItem(cmp, 8);
    expect(findMenu(cmp).length).toBe(3);
    expect(findMenuItem(cmp).length).toBe(10);
    menuItemPropsChecked(cmp, 8, [3]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单2']);

    clickMenuItem(cmp, 8);
    expect(findMenu(cmp).length).toBe(3);
    expect(findMenuItem(cmp).length).toBe(10);
    menuItemPropsChecked(cmp, 8, [3, 8]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单2']);

    hoverMenuItem(cmp, 9);
    expect(findMenu(cmp).length).toBe(3);
    expect(findMenuItem(cmp).length).toBe(10);
    menuItemPropsChecked(cmp, 8, [3, 8]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单2']);

    clickMenuItem(cmp, 9);
    expect(findMenu(cmp).length).toBe(3);
    expect(findMenuItem(cmp).length).toBe(10);
    menuItemPropsChecked(cmp, 8, [3, 8, 9]);
    expect(inputTagDisplayValue(cmp)).toEqual(['三级菜单4-1-1']);

    hoverMenuItem(cmp, 1);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, [3]);
    expect(inputTagDisplayValue(cmp)).toEqual(['三级菜单4-1-1']);

    clickMenuItem(cmp, 1);
    expect(findMenu(cmp).length).toBe(1);
    expect(findMenuItem(cmp).length).toBe(8);
    menuItemPropsChecked(cmp, 8, [1]);
    expect(inputTagDisplayValue(cmp)).toEqual(['一级菜单2']);
  });

  function menuItemPropsChecked(cmp: Object, allCount: number, checkedData: number[]) {
    for (let i = 0; i < allCount; i++) {
      if (checkedData.includes(i)) {
        expect(
          findMenuItem(cmp)
            .at(i)
            .prop('checked')
        ).toBe(true);
      } else {
        expect(
          findMenuItem(cmp)
            .at(i)
            .prop('checked')
        ).toBe(false);
      }
    }
  }

  function inputTagDisplayValue(cmp: Object) {
    return findInputTag(cmp)
      .at(0)
      .prop('displayValue');
  }

  function findMenuItem(cmp: Object) {
    return cmp.find(Widget.MenuItem);
  }

  function findEmpty(cmp: Object) {
    return cmp.find(Widget.Empty);
  }

  function findMenu(cmp: Object) {
    return cmp.find(Widget.Menu);
  }

  function findInputTag(cmp: Object) {
    return cmp.find(Widget.InputTag);
  }

  function clickInputTag(cmp: Object) {
    return findInputTag(cmp)
      .at(0)
      .simulate('click');
  }

  function clickMenuItem(cmp: Object, index: number) {
    findMenuItem(cmp)
      .at(index)
      .simulate('click');
  }

  function hoverMenuItem(cmp: Object, index: number) {
    findMenuItem(cmp)
      .at(index)
      .simulate('mouseEnter');
  }
});
