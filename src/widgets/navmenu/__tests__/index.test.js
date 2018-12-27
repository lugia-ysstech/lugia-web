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
import NavMenu from '../navmenu';
import renderer from 'react-test-renderer';
import Widget from '../../consts/index';

const data = [
  { value: 'Lugia Design of React', text: 'Lugia Design of React' },
  { value: '快速上手', text: '快速上手' },
  { value: '项目实战', text: '项目实战' },
  { value: '在Lugia-mega中使用', text: '在Lugia-mega中使用' },
  {
    value: 'Components',
    text: 'Components',
    children: [
      {
        value: 'General',
        text: 'General',
        describe: true,
        children: [
          { value: 'Button 按钮', text: 'Button 按钮' },
          { value: 'Icon 图标', text: 'Icon 图标' },
        ],
      },

      {
        value: 'Layout',
        text: 'Layout',
        describe: true,
        children: [
          { value: 'Grid 栅格', text: 'Grid 栅格' },
          { value: 'Layout 布局', text: 'Layout 布局' },
        ],
      },

      {
        value: 'Navigation',
        text: 'Navigation',
        describe: true,
        children: [
          { value: 'Affix 固钉', text: 'Affix 固钉' },
          { value: 'Breadcrumb 面包屑', text: 'Breadcrumb 面包屑' },
          { value: 'Dropdown 下拉菜单', text: 'Dropdown 下拉菜单' },
          { value: 'Menu 导航菜单', text: 'Menu 导航菜单' },
          { value: 'Pagination 分页', text: 'Pagination 分页' },
          { value: 'Steps 步骤条', text: 'Steps 步骤条' },
        ],
      },

      {
        value: 'Data Entry',
        text: 'Data Entry',
        describe: true,
        children: [
          { value: 'AutoComplete 自动完成', text: 'AutoComplete 自动完成' },
          { value: 'Cascader 级联选择', text: 'Cascader 级联选择' },
          { value: 'Checkbox 多选框', text: 'Checkbox 多选框' },
          { value: 'DatePicker 日期选择框', text: 'DatePicker 日期选择框' },
          { value: 'Form 表单', text: 'Form 表单' },
          { value: 'Input 输入框', text: 'Input 输入框' },
        ],
      },
    ],
  },
];

Enzyme.configure({ adapter: new Adapter() });

describe('NavMenu', () => {
  it(' mode inline,inlineType=ellipse', () => {
    const cmp = (
      <Target data={data} mode={'inline'} inlineExpandAll={true} inlineType={'ellipse'} />
    );
    expect(renderer.create(cmp).toJSON()).toMatchSnapshot();
  });

  it(' mode inline,inlineType=ellipse,theme=dark', () => {
    const cmp = (
      <Target
        data={data}
        mode={'inline'}
        theme={'dark'}
        inlineExpandAll={true}
        inlineType={'ellipse'}
      />
    );
    expect(renderer.create(cmp).toJSON()).toMatchSnapshot();
  });

  it('mode=inline,inlineType=primary ', () => {
    const cmp = (
      <Target data={data} mode={'inline'} inlineExpandAll={true} inlineType={'primary'} />
    );
    expect(renderer.create(cmp).toJSON()).toMatchSnapshot();
  });

  it('mode=inline,inlineType=primary,theme=dark ', () => {
    const cmp = (
      <Target
        data={data}
        mode={'inline'}
        theme={'dark'}
        inlineExpandAll={true}
        inlineType={'primary'}
      />
    );
    expect(renderer.create(cmp).toJSON()).toMatchSnapshot();
  });

  it(' mode=vertical ', () => {
    const cmp = <Target data={data} mode={'vertical'} />;
    expect(renderer.create(cmp).toJSON()).toMatchSnapshot();
  });

  it('inlineExpandAll: false', () => {
    const cmp = mount(
      <Target data={data} mode={'inline'} inlineExpandAll={false} inlineType={'primary'} />
    );
    expect(findTreeItem(cmp).length).toBe(5);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, []);
    clickTreeItem(cmp, 1);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [1]);

    clickTreeItem(cmp, 4);
    expect(findTreeItem(cmp).length).toBe(9);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [1]);
  });

  it('inlineExpandAll: true', () => {
    const cmp = mount(
      <Target data={data} mode={'inline'} inlineExpandAll={true} inlineType={'primary'} />
    );
    expect(findTreeItem(cmp).length).toBe(25);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, []);
    clickTreeItem(cmp, 1);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [1]);

    clickTreeItem(cmp, 4);
    expect(findTreeItem(cmp).length).toBe(5);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [1]);

    clickTreeItem(cmp, 4);
    expect(findTreeItem(cmp).length).toBe(25);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [1]);

    clickTreeItem(cmp, 5);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [1]);

    clickTreeItem(cmp, 6);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [6]);
  });

  it('受限 value', () => {
    const cmp = mount(
      <Target
        data={data}
        value={['项目实战']}
        mode={'inline'}
        inlineExpandAll={true}
        inlineType={'primary'}
      />
    );
    expect(findTreeItem(cmp).length).toBe(25);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [2]);
    clickTreeItem(cmp, 3);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [2]);

    clickTreeItem(cmp, 4);
    expect(findTreeItem(cmp).length).toBe(5);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [2]);
  });

  class LimitDemo extends React.Component<Object, Object> {
    constructor(props) {
      super(props);
      this.state = { value: ['项目实战'] };
    }

    render() {
      return (
        <Target
          inlineType={'ellipse'}
          mode={'inline'}
          data={data}
          separator={'/'}
          value={this.state.value}
          inlineExpandAll={true}
          onSelect={this.onSelect}
        />
      );
    }

    onSelect = target => {
      this.setState({ value: target.value });
    };
  }

  it('受限 value, onSelect setState', () => {
    const cmp = mount(<LimitDemo />);
    expect(findTreeItem(cmp).length).toBe(25);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [2]);
    clickTreeItem(cmp, 3);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [3]);

    clickTreeItem(cmp, 4);
    expect(findTreeItem(cmp).length).toBe(5);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [3]);

    clickTreeItem(cmp, 4);
    expect(findTreeItem(cmp).length).toBe(25);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [3]);

    clickTreeItem(cmp, 5);
    expect(findTreeItem(cmp).length).toBe(25);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [3]);

    clickTreeItem(cmp, 6);
    expect(findTreeItem(cmp).length).toBe(25);
    treeItemPropsSelected(cmp, findTreeItem(cmp).length, [6]);
  });

  function findTreeItem(cmp: Object) {
    return cmp.find('titleSpan');
  }

  function clickTreeItem(cmp: Object, index: number) {
    findTreeItem(cmp)
      .at(index)
      .simulate('click');
  }

  function treeItemPropsSelected(cmp: Object, allCount: number, checkedData: number[]) {
    for (let i = 0; i < allCount; i++) {
      if (checkedData.includes(i)) {
        expect(
          findTreeItem(cmp)
            .at(i)
            .prop('selected')
        ).toBe(true);
      } else {
        expect(
          findTreeItem(cmp)
            .at(i)
            .prop('selected')
        ).toBe(false);
      }
    }
  }

  function findMenu(cmp: Object) {
    return cmp.find(Widget.Menu);
  }
});
