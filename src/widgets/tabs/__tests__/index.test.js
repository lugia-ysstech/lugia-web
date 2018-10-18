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
import Tabs from '../index';
import { data, strangeData } from '../demo';
import { isVertical } from '../utils';
import Widgets from '../../consts';
import Theme from '../../theme/';
Enzyme.configure({ adapter: new Adapter() });

describe('tabsDemo', () => {
  const createTabs = (obj?: Object): any => {
    const config = obj ? obj : { tabType: 'line', tabPosition: 'bottom', data };
    return <Tabs {...config} />;
  };
  it('Component JSON', () => {
    const renders = renderer.create(<Wrapper />);
    expect(renders.toJSON()).toMatchSnapshot();
  });
  const getCmp = (target: any): Object => {
    return target
      .children()
      .at(0)
      .children()
      .at(0)
      .instance();
  };

  it('props defaultActivityKey', () => {
    const target = mount(createTabs({ defaultActivityKey: '2', data }));
    const { activityKey } = getCmp(target).state;
    expect(activityKey).toBe('2');
  });
  it('props activityKey', () => {
    const target = mount(createTabs({ defaultActivityKey: '2', activityKey: '1', data }));
    const { activityKey } = getCmp(target).state;
    expect(activityKey).toBe('1');
  });

  function testOnTabClick(component: any, expIndex: number, expActicityKey: string) {
    it('props onTabClick', () => {
      const target = mount(component);
      const type = isVertical(component.props.tabPosition) ? 'yTabpane' : 'hTabpane';
      const tabpane = target.find(type);
      tabpane.at(expIndex).simulate('click');
      expect(getCmp(target).state.activityKey).toBe(expActicityKey);
    });
  }
  testOnTabClick(createTabs(), 0, '_key_0');
  testOnTabClick(createTabs(), 1, '1');
  testOnTabClick(createTabs(), 2, '_key_2');
  testOnTabClick(createTabs(), 3, '_key_3');
  testOnTabClick(createTabs({ data, tabType: 'card' }), 2, '_key_2');
  testOnTabClick(createTabs({ data, tabType: 'window' }), 2, '_key_2');
  testOnTabClick(createTabs({ data, tabType: 'line', tabPosition: 'left' }), 1, '1');
  testOnTabClick(createTabs({ data, tabType: 'line', tabPosition: 'right' }), 2, '_key_2');
  testOnTabClick(createTabs({ data, tabType: 'line', tabPosition: 'top' }), 3, '_key_3');

  function testActivityKey(component: any, expActicityKey: string) {
    it('props activityKey', () => {
      const target = mount(component);
      const type = isVertical(component.props.tabPosition) ? 'yTabpane' : 'hTabpane';
      const tabpane = target.find(type);
      tabpane.at(2).simulate('click');
      expect(getCmp(target).state.activityKey).toBe(expActicityKey);
    });
  }
  testActivityKey(createTabs({ data, activityKey: '1' }), '1');
  testActivityKey(createTabs({ data, activityKey: '3' }), '3');

  it('props onAddClick', async () => {
    let onAddClick;
    const promise = new Promise(resolve => {
      onAddClick = e => {
        resolve(add);
      };
    });
    const add = {
      title: 'new tabs',
      content: 'new tabs content',
    };
    const target = mount(<Tabs data={strangeData} tabType="card" onAddClick={onAddClick} />);
    target.find('addIcon').simulate('click', { add });
    expect(await promise).toBe(add);
  });

  const onDeleteClick = () => {};
  function testDeleteClick(component: any) {
    it('props onDeleteClick', () => {
      const target = mount(component);
      const { data, children } = getCmp(target).props;
      const length = data ? data.length : children ? children.length : 0;
      target
        .find('deleteIcon')
        .at(1)
        .simulate('click');
      expect(getCmp(target).state.data.length).toBe(length - 1);
    });
  }
  testDeleteClick(createTabs({ data: strangeData, onDeleteClick, tabType: 'card' }));
  testDeleteClick(createTabs({ data: strangeData, onDeleteClick, tabType: 'window' }));

  it('props onNextClick pagedType: page ', async () => {
    let onNextClick;
    const promise = new Promise(resolve => {
      onNextClick = e => {
        resolve();
      };
    });
    const target = mount(
      <Theme config={{ [Widgets.Tabs]: { width: 500 } }}>
        <Tabs data={strangeData} onNextClick={onNextClick} pagedType={'page'} tabType="card" />
      </Theme>
    );
    target
      .find('page')
      .at(1)
      .simulate('click');

    getCmp(target.children()).setState({ currentPage: 1 });
    await promise;
    expect(getCmp(target.children()).state.currentPage).toBe(1);
  });

  it('props onPreClick pagedType: page ', async () => {
    let onPreClick;
    const promise = new Promise(resolve => {
      onPreClick = e => {
        resolve();
      };
    });
    const target = mount(
      <Theme config={{ [Widgets.Tabs]: { width: 500 } }}>
        <Tabs data={strangeData} onPreClick={onPreClick} pagedType={'page'} tabType="card" />
      </Theme>
    );
    target
      .find('page')
      .at(0)
      .simulate('click');
    target
      .find('page')
      .at(1)
      .simulate('click');
    getCmp(target.children()).setState({ currentPage: 1 });
    await promise;
    expect(getCmp(target.children()).state.currentPage).toBe(1);
  });

  const onChange = () => {};
  it('props onChange limit activityKey="5" ', async () => {
    let onChange;
    const promise = new Promise(resolve => {
      onChange = e => {
        resolve(e);
      };
    });
    const target = mount(<Tabs data={strangeData} activityKey="5" onChange={onChange} />);
    const type = isVertical(target.props.tabPosition) ? 'yTabpane' : 'hTabpane';
    const tabpane = target.find(type);
    expect(getCmp(target).state.activityKey).toBe('5');
    tabpane.at(3).simulate('click');
    await promise;
    expect(getCmp(target).state.activityKey).toBe('5');
  });

  it('props onChange activityKey=state.activityKey', async () => {
    let onChange;
    const promise = new Promise(resolve => {
      onChange = e => {
        resolve(e);
      };
    });
    const target = mount(<Tabs data={strangeData} onChange={onChange} />);
    const type = isVertical(target.props.tabPosition) ? 'yTabpane' : 'hTabpane';
    const tabpane = target.find(type);
    tabpane.at(5).simulate('click');
    await promise;
    expect(getCmp(target).state.activityKey).toBe('5');
  });

  it('props onChange activityKey!=state.activityKey', async () => {
    let onChange;
    const promise = new Promise(resolve => {
      onChange = e => {
        resolve(e);
      };
    });
    const target = mount(<Tabs data={strangeData} onChange={onChange} />);
    const type = isVertical(target.props.tabPosition) ? 'yTabpane' : 'hTabpane';
    const tabpane = target.find(type);
    getCmp(target).setState({ activityKey: '5' });
    expect(getCmp(target).state.activityKey).toBe('5');
    tabpane.at(3).simulate('click');
    await promise;
    expect(getCmp(target).state.activityKey).toBe('_key_3');
  });
});
