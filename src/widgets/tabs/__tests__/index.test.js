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
import Tabs from '../tabs';
import { hasActivityKeyData, defaultData, shortChildren, longChildren } from '../demo';
import { isVertical } from '../utils';
import Widgets from '../../consts';
import Theme from '../../theme/';
Enzyme.configure({ adapter: new Adapter() });

describe('tabsDemo', () => {
  const createTabs = (obj?: Object): any => {
    const config = obj ? obj : { tabType: 'line', tabPosition: 'bottom', data: hasActivityKeyData };
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
    const target = mount(createTabs({ defaultActivityKey: '2', data: hasActivityKeyData }));
    const { activityKey } = getCmp(target).state;
    expect(activityKey).toBe('2');
  });
  it('props activityKey', () => {
    const target = mount(createTabs({ activityKey: '2', data: hasActivityKeyData }));
    const { activityKey } = getCmp(target).state;
    expect(activityKey).toBe('2');
  });
  it('props defaultData', () => {
    const target = mount(createTabs({ defaultData }));
    const { data } = getCmp(target).state;
    expect(data).toBe(data);
  });
  it('props data', () => {
    const target = mount(createTabs({ data: hasActivityKeyData, tabPosition: 'left' }));
    const { data } = getCmp(target).state;
    expect(data).toBe(data);
  });
  it('props data && defaultData', () => {
    const target = mount(createTabs({ data: hasActivityKeyData, defaultData }));
    const { data } = getCmp(target).state;
    expect(data).toBe(data);
  });
  it('props data []', () => {
    const target = mount(createTabs({ data: [] }));
    const { data } = getCmp(target).state;
    expect(data).toEqual([]);
  });
  it('props children shortChildren', () => {
    const target = mount(createTabs({ children: shortChildren }));
    const { activityKey } = getCmp(target).state;
    expect(activityKey).toBe('_key_0');
  });
  it('props children longChildren', () => {
    const target = mount(createTabs({ children: longChildren }));
    const { activityKey } = getCmp(target).state;
    expect(activityKey).toBe('_key_0');
  });
  it('props children&&data', () => {
    const target = mount(createTabs({ data: hasActivityKeyData, children: shortChildren }));
    const { activityKey } = getCmp(target).state;
    expect(activityKey).toBe('0');
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
  testOnTabClick(createTabs(), 0, '0');
  testOnTabClick(createTabs(), 1, '1');
  testOnTabClick(createTabs(), 2, '2');
  testOnTabClick(createTabs(), 3, '3');
  testOnTabClick(createTabs({ data: hasActivityKeyData, tabType: 'card' }), 2, '2');
  testOnTabClick(createTabs({ data: hasActivityKeyData, tabType: 'window' }), 2, '2');
  testOnTabClick(
    createTabs({ data: hasActivityKeyData, tabType: 'line', tabPosition: 'left' }),
    1,
    '1'
  );
  testOnTabClick(
    createTabs({ data: hasActivityKeyData, tabType: 'line', tabPosition: 'right' }),
    2,
    '2'
  );
  testOnTabClick(
    createTabs({ data: hasActivityKeyData, tabType: 'line', tabPosition: 'top' }),
    3,
    '3'
  );

  function testActivityKey(component: any, expActicityKey: string) {
    it('props activityKey', () => {
      const target = mount(component);
      const type = isVertical(component.props.tabPosition) ? 'yTabpane' : 'hTabpane';
      const tabpane = target.find(type);
      tabpane.at(2).simulate('click');
      expect(getCmp(target).state.activityKey).toBe(expActicityKey);
    });
  }
  testActivityKey(createTabs({ data: hasActivityKeyData, activityKey: '1' }), '1');
  testActivityKey(createTabs({ data: hasActivityKeyData, activityKey: '3' }), '3');

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
    const target = mount(<Tabs data={hasActivityKeyData} tabType="card" onAddClick={onAddClick} />);
    target.find('addIcon').simulate('click', { add });
    expect(await promise).toBe(add);
  });

  const onDeleteClick = () => {};
  it('props onDeleteClick', async () => {
    let onDeleteClick;
    const promise = new Promise(resolve => {
      onDeleteClick = e => {
        resolve();
      };
    });
    const target = mount(
      <Tabs data={hasActivityKeyData} onDeleteClick={onDeleteClick} tabType="card" />
    );
    const { data, children } = getCmp(target).props;
    target
      .find('deleteIcon')
      .at(2)
      .simulate('click');
    const newData = [...hasActivityKeyData];
    newData.splice(2, 1);
    target.setProps({ data: newData });
    expect(getCmp(target).props.data).toEqual(newData);
  });

  it('props onNextClick pagedType: page ', async () => {
    let onNextClick;
    const promise = new Promise(resolve => {
      onNextClick = e => {
        resolve();
      };
    });
    const target = mount(
      <Theme config={{ [Widgets.Tabs]: { width: 500 } }}>
        <Tabs
          data={hasActivityKeyData}
          onNextClick={onNextClick}
          pagedType={'page'}
          tabType="card"
        />
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
        <Tabs data={hasActivityKeyData} onPreClick={onPreClick} pagedType={'page'} tabType="card" />
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
    const target = mount(<Tabs data={hasActivityKeyData} activityKey="5" onChange={onChange} />);
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
    const target = mount(<Tabs data={hasActivityKeyData} onChange={onChange} />);
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
    const target = mount(<Tabs data={hasActivityKeyData} onChange={onChange} />);
    const type = isVertical(target.props.tabPosition) ? 'yTabpane' : 'hTabpane';
    const tabpane = target.find(type);
    getCmp(target).setState({ activityKey: '5' });
    expect(getCmp(target).state.activityKey).toBe('5');
    tabpane.at(3).simulate('click');
    await promise;
    expect(getCmp(target).state.activityKey).toBe('3');
  });
  it('props 受限 data', async () => {
    const target = mount(<Tabs data={hasActivityKeyData} />);
    expect(getCmp(target).state.data).toEqual(hasActivityKeyData);
    getCmp(target).setState({ data: [] });
    expect(getCmp(target).state.data).toEqual(hasActivityKeyData);
    target.setProps({ data: [] });
    expect(getCmp(target).state.data).toEqual([]);
    target.setProps({ data: hasActivityKeyData });
    expect(getCmp(target).state.data).toEqual(hasActivityKeyData);
  });
  it('props 非受限 data 默认addClick ', async () => {
    let onAddClick;
    const promise = new Promise(resolve => {
      onAddClick = e => {
        resolve();
      };
    });
    let onDeleteClick;
    const deleteClick = new Promise(resolve => {
      onDeleteClick = e => {
        resolve();
      };
    });
    const defaultAddItem = {
      activityKey: 'newTab1',
      content: 'content of new tab 1',
      title: 'new tab 1',
    };
    const target = mount(
      <Tabs tabType="card" onAddClick={onAddClick} onDeleteClick={onDeleteClick} />
    );
    expect(getCmp(target).state.data).toEqual([]);
    target.find('addIcon').simulate('click');
    await promise;
    expect(getCmp(target).state.data).toEqual([defaultAddItem]);
    target
      .find('deleteIcon')
      .at(0)
      .simulate('click');
    await deleteClick;
    expect(getCmp(target).state.data).toEqual([]);
  });
  it('props 非受限 data add Item', async () => {
    let onAddClick;
    const promise = new Promise(resolve => {
      onAddClick = e => {
        resolve();
      };
    });
    let onDeleteClick;
    const deleteClick = new Promise(resolve => {
      onDeleteClick = e => {
        resolve();
      };
    });
    const firstItem = {
      activityKey: 'newTab1',
      content: 'content of new tab 1',
      title: 'new tab 1',
    };
    const target = mount(
      <Tabs tabType="card" onAddClick={onAddClick} onDeleteClick={onDeleteClick} />
    );
    expect(getCmp(target).state.data).toEqual([]);
    target.find('addIcon').simulate('click', { firstItem });
    await promise;
    expect(getCmp(target).state.data).toEqual([firstItem]);
    target
      .find('deleteIcon')
      .at(0)
      .simulate('click', { activityKey: 'newTab1' });
    await deleteClick;
    expect(getCmp(target).state.data).toEqual([]);
  });
  it('props 非受限 data 逐次 add 逐次 delete ', async () => {
    let onAddClick;
    const promise = new Promise(resolve => {
      onAddClick = e => {
        resolve();
      };
    });
    let onDeleteClick;
    const deleteClick = new Promise(resolve => {
      onDeleteClick = e => {
        resolve();
      };
    });
    const firstItem = {
      activityKey: 'newTab1',
      content: 'content of new tab 1',
      title: 'new tab 1',
    };
    const secondItem = {
      activityKey: 'newTab2',
      content: 'content of new tab 2',
      title: 'new tab 2',
    };
    const target = mount(
      <Tabs tabType="card" onAddClick={onAddClick} onDeleteClick={onDeleteClick} />
    );
    expect(getCmp(target).state.data).toEqual([]);
    target.find('addIcon').simulate('click', { firstItem });
    await promise;
    expect(getCmp(target).state.data).toEqual([firstItem]);
    target.find('addIcon').simulate('click', { secondItem });
    await promise;
    expect(getCmp(target).state.data).toEqual([firstItem, secondItem]);
    target
      .find('deleteIcon')
      .at(0)
      .simulate('click', { activityKey: 'newTab1' });
    await deleteClick;
    expect(getCmp(target).state.data).toEqual([secondItem]);
    target
      .find('deleteIcon')
      .at(0)
      .simulate('click', { activityKey: 'newTab2' });
    await deleteClick;
    expect(getCmp(target).state.data).toEqual([]);
  });
  it('props 非受限 data  分别delete ', async () => {
    let onAddClick;
    const promise = new Promise(resolve => {
      onAddClick = e => {
        resolve();
      };
    });
    let onDeleteClick;
    const deleteClick = new Promise(resolve => {
      onDeleteClick = e => {
        resolve();
      };
    });
    const firstItem = {
      activityKey: 'newTab1',
      content: 'content of new tab 1',
      title: 'new tab 1',
    };
    const secondItem = {
      activityKey: 'newTab2',
      content: 'content of new tab 2',
      title: 'new tab 2',
    };
    const target = mount(
      <Tabs tabType="card" onAddClick={onAddClick} onDeleteClick={onDeleteClick} />
    );
    expect(getCmp(target).state.data).toEqual([]);
    target.find('addIcon').simulate('click', { firstItem });
    await promise;
    expect(getCmp(target).state.data).toEqual([firstItem]);
    target.find('addIcon').simulate('click', { secondItem });
    await promise;
    expect(getCmp(target).state.data).toEqual([firstItem, secondItem]);
    target
      .find('deleteIcon')
      .at(1)
      .simulate('click', { activityKey: 'newTab2' });
    await deleteClick;
    expect(getCmp(target).state.data).toEqual([firstItem]);
    target
      .find('deleteIcon')
      .at(0)
      .simulate('click', { activityKey: 'newTab1' });
    await deleteClick;
    expect(getCmp(target).state.data).toEqual([]);
  });
});
