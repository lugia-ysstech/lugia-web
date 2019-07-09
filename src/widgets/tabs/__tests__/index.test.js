/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tabs, { hasTargetInProps, getDefaultData } from '../tabs';
import { hasActivityValueData, defaultData, shortChildren, longChildren } from '../demo';

Enzyme.configure({ adapter: new Adapter() });

describe('tabsDemo', () => {
  const themeProps = { themeConfig: {}, themeState: {} };
  const getPartOfThemeProps = () => true;
  const createTabs = (obj?: Object): any => {
    const config = obj
      ? obj
      : { activityValue: 0, tabType: 'line', tabPosition: 'bottom', data: hasActivityValueData };
    return (
      <Tabs
        {...config}
        getPartOfThemeHocProps={getPartOfThemeProps}
        getPartOfThemeProps={getPartOfThemeProps}
        themeProps={themeProps}
      />
    );
  };
  it('Component JSON', () => {
    const target = (
      <Tabs
        getPartOfThemeProps={getPartOfThemeProps}
        getPartOfThemeHocProps={getPartOfThemeProps}
        themeProps={themeProps}
      />
    );
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  const getCmp = (target: any): Object => {
    return target.children().instance();
  };

  it('props hasTargetInProps', () => {
    expect(hasTargetInProps('data', { data: [1, 2, 3] })).toBe(true);
    expect(hasTargetInProps('children', { children: [1, 2, 3] })).toBe(true);
    expect(hasTargetInProps('ops', { ops: 'sdfsdf' })).toBe(true);
    expect(hasTargetInProps('ads', { ops: 'sdfsdf' })).toBe(false);
  });

  it('props defaultActivityValue', () => {
    const target = mount(createTabs({ defaultActivityValue: 2, data: hasActivityValueData }));
    const { activityValue } = getCmp(target).state;
    expect(activityValue).toBe(2);
  });
  it('props activityValue', () => {
    const target = mount(createTabs({ activityValue: 2, data: hasActivityValueData }));
    const { activityValue } = getCmp(target).state;
    expect(activityValue).toBe(2);
  });
  it('props defaultData', () => {
    const target = mount(createTabs({ defaultData }));
    const { data } = getCmp(target).state;
    expect(data).toEqual(data);
  });
  it('props data', () => {
    const target = mount(createTabs({ data: hasActivityValueData, tabPosition: 'left' }));
    const { data } = getCmp(target).state;
    expect(data).toEqual(hasActivityValueData);
  });
  it('props data && defaultData', () => {
    const target = mount(createTabs({ data: hasActivityValueData, defaultData }));
    const { data } = getCmp(target).state;
    expect(data).toEqual(hasActivityValueData);
  });
  it('props data []', () => {
    const target = mount(createTabs({ data: [] }));
    const { data } = getCmp(target).state;
    expect(data).toEqual([]);
  });
  it('props children shortChildren', () => {
    const target = mount(createTabs({ children: shortChildren }));
    const { activityValue } = getCmp(target).state;
    expect(activityValue).toBe(0);
  });
  it('props children longChildren', () => {
    const target = mount(createTabs({ children: longChildren }));
    const { activityValue } = getCmp(target).state;
    expect(activityValue).toBe(0);
  });
  it('props children&&data', () => {
    const target = mount(createTabs({ data: hasActivityValueData, children: shortChildren }));
    const { activityValue } = getCmp(target).state;
    expect(activityValue).toBe(0);
  });

  function testActivityValue(component: any, expActicityValue: string) {
    it('props activityValue', () => {
      const target = mount(component);
      const type = 'Tabpane';
      const tabpane = target.find(type);
      tabpane.at(2).simulate('click');
      expect(getCmp(target).state.activityValue).toBe(expActicityValue);
    });
  }
  testActivityValue(createTabs({ data: hasActivityValueData, activityValue: '1' }), '1');
  testActivityValue(createTabs({ data: hasActivityValueData, activityValue: '3' }), '3');

  it('props onAddClick 非受限', async () => {
    const target = mount(
      <Tabs
        tabType="card"
        getPartOfThemeHocProps={getPartOfThemeProps}
        getPartOfThemeProps={getPartOfThemeProps}
        themeProps={themeProps}
      />
    );
    expect(getCmp(target).state.data).toEqual([
      { title: 'Tab1', content: 'Tab1 content' },
      { title: 'Tab2', content: 'Tab2 content' },
      { title: 'Tab3', content: 'Tab3 content' },
    ]);
    target
      .children()
      .instance()
      .onAddClick();
    expect(getCmp(target).state.data).toEqual([
      { title: 'Tab1', content: 'Tab1 content' },
      { title: 'Tab2', content: 'Tab2 content' },
      { title: 'Tab3', content: 'Tab3 content' },
      { title: 'Tab4', content: 'Tab4 Content' },
    ]);
  });

  it('props onAddClick 受限', async () => {
    const target = mount(createTabs());
    expect(getCmp(target).state.data).toEqual(hasActivityValueData);
    target
      .children()
      .instance()
      .onAddClick();
    expect(getCmp(target).state.data).toEqual(hasActivityValueData);
  });

  it('props onDelete 非受限', async () => {
    const target = mount(
      <Tabs
        tabType="card"
        getPartOfThemeHocProps={getPartOfThemeProps}
        getPartOfThemeProps={getPartOfThemeProps}
        themeProps={themeProps}
      />
    );
    expect(getCmp(target).state.data).toEqual([
      { title: 'Tab1', content: 'Tab1 content' },
      { title: 'Tab2', content: 'Tab2 content' },
      { title: 'Tab3', content: 'Tab3 content' },
    ]);
    target
      .children()
      .instance()
      .onDelete(1);
    expect(getCmp(target).state.data).toEqual([
      { title: 'Tab1', content: 'Tab1 content' },
      { title: 'Tab3', content: 'Tab3 content' },
    ]);
  });

  it('props onDelete 受限', async () => {
    const target = mount(createTabs());
    expect(getCmp(target).state.data).toEqual(hasActivityValueData);
    target
      .children()
      .instance()
      .onDelete(2);
    expect(getCmp(target).state.data).toEqual(hasActivityValueData);
  });

  it('props onChange 非受限', async () => {
    const target = mount(
      <Tabs
        tabType="card"
        getPartOfThemeHocProps={getPartOfThemeProps}
        getPartOfThemeProps={getPartOfThemeProps}
        themeProps={themeProps}
      />
    );
    expect(getCmp(target).state.activityValue).toEqual(0);
    target
      .children()
      .instance()
      .onChange(1);
    expect(getCmp(target).state.activityValue).toEqual(1);
  });

  it('props onChange 受限', async () => {
    const target = mount(createTabs());
    expect(getCmp(target).state.activityValue).toEqual(0);
    target
      .children()
      .instance()
      .onChange(2);
    expect(getCmp(target).state.activityValue).toEqual(0);
  });

  it('props onAddClick 非受限', async () => {
    const target = mount(
      <Tabs
        tabType="card"
        getPartOfThemeHocProps={getPartOfThemeProps}
        getPartOfThemeProps={getPartOfThemeProps}
        themeProps={themeProps}
      />
    );

    expect(getCmp(target).state.data).toEqual(getDefaultData({}));
    expect(getCmp(target).state.activityValue).toEqual(0);
    target
      .children()
      .instance()
      .onAddClick();
    expect(getCmp(target).state.data).toEqual([
      { title: 'Tab1', content: 'Tab1 content' },
      { title: 'Tab2', content: 'Tab2 content' },
      { title: 'Tab3', content: 'Tab3 content' },
      { title: 'Tab4', content: 'Tab4 Content' },
    ]);
    expect(getCmp(target).state.activityValue).toEqual(3);
  });

  it('props onAddClick 受限', async () => {
    const target = mount(createTabs());
    expect(getCmp(target).state.data).toEqual(hasActivityValueData);
    expect(getCmp(target).state.activityValue).toEqual(0);
    target
      .children()
      .instance()
      .onAddClick();
    expect(getCmp(target).state.data).toEqual(hasActivityValueData);
    expect(getCmp(target).state.activityValue).toEqual(0);
  });

  it('props 受限 data', async () => {
    const target = mount(
      <Tabs
        data={hasActivityValueData}
        getPartOfThemeHocProps={getPartOfThemeProps}
        getPartOfThemeProps={getPartOfThemeProps}
        themeProps={themeProps}
      />
    );
    expect(getCmp(target).state.data).toEqual(hasActivityValueData);
    getCmp(target).setState({ data: [] });
    expect(getCmp(target).state.data).toEqual(hasActivityValueData);
    target.setProps({ data: [] });
    expect(getCmp(target).state.data).toEqual([]);
    target.setProps({ data: hasActivityValueData });
    expect(getCmp(target).state.data).toEqual(hasActivityValueData);
  });
});
