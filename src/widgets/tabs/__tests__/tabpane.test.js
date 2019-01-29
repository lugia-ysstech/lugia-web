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
import Tabpane from '../tabpane';

Enzyme.configure({ adapter: new Adapter() });

describe('tabpaneDemo', () => {
  it('Component JSON', () => {
    const renders = renderer.create(<Tabpane />);
    expect(renders.toJSON()).toMatchSnapshot();
  });
  const getCmp = (target: any): Object => {
    return target
      .children()
      .at(0)
      .instance();
  };
  it('props activityKey', () => {
    const target = mount(<Tabpane activityKey={'2'} />);
    expect(getCmp(target).props.activityKey).toBe('2');
  });

  it('props isSelect', () => {
    const target = mount(<Tabpane isSelect={true} />);
    expect(getCmp(target).props.isSelect).toBe(true);
  });
  function testTitle(title: string, expTitle: string) {
    it('props title', () => {
      const target = mount(<Tabpane title={title} />);
      expect(
        target
          .find('div')
          .at(1)
          .text()
      ).toBe(expTitle);
    });
  }
  testTitle('1111', '1111');
  testTitle('1234', '1234');
  testTitle('tabs', 'tabs');
  testTitle('', '');
  it('props disabled true  ', () => {
    const target = mount(<Tabpane activityKey={'2'} disabled={true} />);
    expect(getCmp(target).props.disabled).toBe(true);
  });
  it('props disabled false', () => {
    const target = mount(<Tabpane activityKey={'2'} disabled={false} />);
    expect(getCmp(target).props.disabled).toBe(false);
  });
});
