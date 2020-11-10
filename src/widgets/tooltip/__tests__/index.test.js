//@flow
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';
import Tooltip from '../';
import { TestDemo } from '../demo';
import { createTestComponent } from '@lugia/react-test-utils';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

const { expect: exp } = chai;

describe('Tooltip', () => {
  it('getDirection', () => {
    const Target = createTestComponent(Tooltip, target => {
      exp(target.getThemeTarget().getDirection('left')).to.be.equal('right');
      exp(target.getThemeTarget().getDirection('leftTop')).to.be.equal('right');
      exp(target.getThemeTarget().getDirection('leftBottom')).to.be.equal('right');

      exp(target.getThemeTarget().getDirection('right')).to.be.equal('left');
      exp(target.getThemeTarget().getDirection('rightTop')).to.be.equal('left');
      exp(target.getThemeTarget().getDirection('rightBottom')).to.be.equal('left');

      exp(target.getThemeTarget().getDirection('top')).to.be.equal('bottom');
      exp(target.getThemeTarget().getDirection('topLeft')).to.be.equal('bottom');
      exp(target.getThemeTarget().getDirection('topRight')).to.be.equal('bottom');

      exp(target.getThemeTarget().getDirection('bottom')).to.be.equal('top');
      exp(target.getThemeTarget().getDirection('bottomLeft')).to.be.equal('top');
      exp(target.getThemeTarget().getDirection('bottomRight')).to.be.equal('top');
    });
    mount(
      <Target>
        <button />
      </Target>
    );
  });

  it('Snapshot JSON', () => {
    global.svtest = true;
    const component = mount(<TestDemo />);
    ReactDOM.createPortal = node => node;
    component.find('TestDiv').simulate('click');
    expect(renderer.create(component).toJSON()).toMatchSnapshot();
    global.svtest = false;
  });
});
