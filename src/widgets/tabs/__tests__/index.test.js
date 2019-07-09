/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Wrapper from '../demo';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tabs, { hasTargetInProps, getDefaultData } from '../tabs';
import { hasActivityValueData, defaultData, shortChildren, longChildren } from '../demo';
import { isVertical } from '../utils';
import Widget from '../../consts';

const { mockObject, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');

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
    // const renders = renderer.create(<Wrapper />);
    // expect(renders.toJSON()).toMatchSnapshot();
  });
  const getCmp = (target: any): Object => {
    return (
      target
        .children()
        // .at(0)
        // .children()
        // .at(0)
        .instance()
    );
    // return target.state() ;
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

  // function testOnTabClick(component: any, expIndex: number, expActicityValue: string) {
  //   it('props onTabClick', () => {
  //     const target = mount(component);
  //     let onClick = () => true;
  //     const changePromise = new Promise(res => {
  //       onClick = newValue => {
  //         res(newValue);
  //       };
  //     });
  //     // const type = isVertical(component.props.tabPosition) ? 'Tabpane' : 'hTabpane';
  //     const type = 'Tabpane';
  //     const tabpane = target.find(type);
  //     tabpane.at(expIndex).simulate('click');
  //     // expect(tabpane.at(expIndex)).toBe(expActicityValue);
  //     expect(getCmp(target).state.activityValue).toBe(expActicityValue);
  //     // expect(target.state().value).toEqual(1);
  //     // expect(await changePromise).toBe(3);
  //   });
  // }
  // testOnTabClick(createTabs(), 0, 0);
  // testOnTabClick(createTabs(), 1, 1);
  // testOnTabClick(createTabs(), 2, 2);
  // testOnTabClick(createTabs(), 3, 3);
  // testOnTabClick(createTabs({ data: hasActivityValueData, tabType: 'card' }), 2, 2);
  // testOnTabClick(createTabs({ data: hasActivityValueData, tabType: 'window' }), 2, 2);
  // testOnTabClick(
  //   createTabs({ data: hasActivityValueData, tabType: 'line', tabPosition: 'left' }),
  //   1,
  //   1
  // );
  // testOnTabClick(
  //   createTabs({ data: hasActivityValueData, tabType: 'line', tabPosition: 'right' }),
  //   2,
  //   2
  // );
  // testOnTabClick(
  //   createTabs({ data: hasActivityValueData, tabType: 'line', tabPosition: 'top' }),
  //   3,
  //   3
  // );

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

  //
  // it('props onNextClick pagedType: page ', async () => {
  //   let onNextClick;
  //   const promise = new Promise(resolve => {
  //     onNextClick = e => {
  //       resolve();
  //     };
  //   });
  //   const target = mount(
  //     <Tabs
  //       data={hasActivityValueData}
  //       onNextClick={onNextClick}
  //       pagedType={'page'}
  //       tabType="card"
  //       getPartOfThemeHocProps={getPartOfThemeProps}
  //       getPartOfThemeProps={getPartOfThemeProps}
  //       themeProps={themeProps}
  //     />
  //   );
  //   target
  //     .find('page')
  //     .at(1)
  //     .simulate('click');
  //
  //   getCmp(target.children()).setState({ currentPage: 1 });
  //   await promise;
  //   expect(getCmp(target.children()).state.currentPage).toBe(1);
  // });
  //
  // it('props onPreClick pagedType: page ', async () => {
  //   let onPreClick;
  //   const promise = new Promise(resolve => {
  //     onPreClick = e => {
  //       resolve();
  //     };
  //   });
  //   const target = mount(
  //     <Tabs
  //       data={hasActivityValueData}
  //       onPreClick={onPreClick}
  //       pagedType={'page'}
  //       tabType="card"
  //       getPartOfThemeHocProps={getPartOfThemeProps}
  //       getPartOfThemeProps={getPartOfThemeProps}
  //       themeProps={themeProps}
  //     />
  //   );
  //   target
  //     .find('page')
  //     .at(0)
  //     .simulate('click');
  //   target
  //     .find('page')
  //     .at(1)
  //     .simulate('click');
  //   getCmp(target.children()).setState({ currentPage: 1 });
  //   await promise;
  //   expect(getCmp(target.children()).state.currentPage).toBe(1);
  // });

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

  //

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

  // it('props 非受限 data 默认addClick ', async () => {
  //   let onAddClick;
  //   const promise = new Promise(resolve => {
  //     onAddClick = e => {
  //       resolve();
  //     };
  //   });
  //   let onDeleteClick;
  //   const deleteClick = new Promise(resolve => {
  //     onDeleteClick = e => {
  //       resolve();
  //     };
  //   });
  //   const defaultAddItem = {
  //     activityValue: 'newTab1',
  //     content: 'content of new tab 1',
  //     title: 'new tab 1',
  //   };
  //   const target = mount(
  //     <Tabs
  //       tabType="card"
  //       onAddClick={onAddClick}
  //       onDeleteClick={onDeleteClick}
  //       getPartOfThemeHocProps={getPartOfThemeProps}
  //       getPartOfThemeProps={getPartOfThemeProps}
  //       themeProps={themeProps}
  //     />
  //   );
  //   expect(getCmp(target).state.data).toEqual([]);
  //   target.find('addIcon').simulate('click');
  //   await promise;
  //   expect(getCmp(target).state.data).toEqual([defaultAddItem]);
  //   target
  //     .find('deleteIcon')
  //     .at(0)
  //     .simulate('click');
  //   await deleteClick;
  //   expect(getCmp(target).state.data).toEqual([]);
  // });
  // it('props 非受限 data add Item', async () => {
  //   let onAddClick;
  //   const promise = new Promise(resolve => {
  //     onAddClick = e => {
  //       resolve();
  //     };
  //   });
  //   let onDeleteClick;
  //   const deleteClick = new Promise(resolve => {
  //     onDeleteClick = e => {
  //       resolve();
  //     };
  //   });
  //   const firstItem = {
  //     activityValue: 'newTab1',
  //     content: 'content of new tab 1',
  //     title: 'new tab 1',
  //   };
  //   const target = mount(
  //     <Tabs
  //       tabType="card"
  //       onAddClick={onAddClick}
  //       onDeleteClick={onDeleteClick}
  //       defaultData={[]}
  //       getPartOfThemeHocProps={getPartOfThemeProps}
  //       getPartOfThemeProps={getPartOfThemeProps}
  //       themeProps={themeProps}
  //     />
  //   );
  //   expect(getCmp(target).state.data).toEqual([]);
  //   target.find('addIcon').simulate('click', { firstItem });
  //   await promise;
  //   expect(getCmp(target).state.data).toEqual([firstItem]);
  //   target
  //     .find('deleteIcon')
  //     .at(0)
  //     .simulate('click', { activityValue: 'newTab1' });
  //   await deleteClick;
  //   expect(getCmp(target).state.data).toEqual([]);
  // });
  // it('props 非受限 data 逐次 add 逐次 delete ', async () => {
  //   let onAddClick;
  //   const promise = new Promise(resolve => {
  //     onAddClick = e => {
  //       resolve();
  //     };
  //   });
  //   let onDeleteClick;
  //   const deleteClick = new Promise(resolve => {
  //     onDeleteClick = e => {
  //       resolve();
  //     };
  //   });
  //   const firstItem = {
  //     activityValue: 'newTab1',
  //     content: 'content of new tab 1',
  //     title: 'new tab 1',
  //   };
  //   const secondItem = {
  //     activityValue: 'newTab2',
  //     content: 'content of new tab 2',
  //     title: 'new tab 2',
  //   };
  //   const target = mount(
  //     <Tabs
  //       tabType="card"
  //       onAddClick={onAddClick}
  //       onDeleteClick={onDeleteClick}
  //       defaultData={[]}
  //       getPartOfThemeHocProps={getPartOfThemeProps}
  //       getPartOfThemeProps={getPartOfThemeProps}
  //       themeProps={themeProps}
  //     />
  //   );
  //   expect(getCmp(target).state.data).toEqual([]);
  //   target.find('addIcon').simulate('click', { firstItem });
  //   await promise;
  //   expect(getCmp(target).state.data).toEqual([firstItem]);
  //   target.find('addIcon').simulate('click', { secondItem });
  //   await promise;
  //   expect(getCmp(target).state.data).toEqual([firstItem, secondItem]);
  //   target
  //     .find('deleteIcon')
  //     .at(0)
  //     .simulate('click', { activityValue: 'newTab1' });
  //   await deleteClick;
  //   expect(getCmp(target).state.data).toEqual([secondItem]);
  //   target
  //     .find('deleteIcon')
  //     .at(0)
  //     .simulate('click', { activityValue: 'newTab2' });
  //   await deleteClick;
  //   expect(getCmp(target).state.data).toEqual([]);
  // });
  // it('props 非受限 data  分别delete ', async () => {
  //   let onAddClick;
  //   const promise = new Promise(resolve => {
  //     onAddClick = e => {
  //       resolve();
  //     };
  //   });
  //   let onDeleteClick;
  //   const deleteClick = new Promise(resolve => {
  //     onDeleteClick = e => {
  //       resolve();
  //     };
  //   });
  //   const firstItem = {
  //     activityValue: 'newTab1',
  //     content: 'content of new tab 1',
  //     title: 'new tab 1',
  //   };
  //   const secondItem = {
  //     activityValue: 'newTab2',
  //     content: 'content of new tab 2',
  //     title: 'new tab 2',
  //   };
  //   const target = mount(
  //     <Tabs
  //       tabType="card"
  //       onAddClick={onAddClick}
  //       onDeleteClick={onDeleteClick}
  //       defaultData={[]}
  //       getPartOfThemeHocProps={getPartOfThemeProps}
  //       getPartOfThemeProps={getPartOfThemeProps}
  //       themeProps={themeProps}
  //     />
  //   );
  //   expect(getCmp(target).state.data).toEqual([]);
  //   target.find('addIcon').simulate('click', { firstItem });
  //   await promise;
  //   expect(getCmp(target).state.data).toEqual([firstItem]);
  //   target.find('addIcon').simulate('click', { secondItem });
  //   await promise;
  //   expect(getCmp(target).state.data).toEqual([firstItem, secondItem]);
  //   target
  //     .find('deleteIcon')
  //     .at(1)
  //     .simulate('click', { activityValue: 'newTab2' });
  //   await deleteClick;
  //   expect(getCmp(target).state.data).toEqual([firstItem]);
  //   target
  //     .find('deleteIcon')
  //     .at(0)
  //     .simulate('click', { activityValue: 'newTab1' });
  //   await deleteClick;
  //   expect(getCmp(target).state.data).toEqual([]);
  // });
});
