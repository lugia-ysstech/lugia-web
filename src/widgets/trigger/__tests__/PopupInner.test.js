//@flow
import React from 'react';
import chai from 'chai';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import PopupInner from '../PopupInner';
import ContentBox from '../ContentBox';
import Enzyme,{ mount}  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
const { expect: exp } = chai;

describe('ContentBox', () => {

  it('default visible: false, children: 1', () => {
    const contentBox = renderer.create(<PopupInner><span>a</span></PopupInner>).toJSON();
    expect(contentBox).toMatchSnapshot();
  });
  it('default visible: true, children: 1', () => {
    const contentBox = renderer.create(<PopupInner visible><span>a</span></PopupInner>).toJSON();
    expect(contentBox).toMatchSnapshot();
  });

  it('default visible:false, children: 2', () => {
    const contentBox = renderer.create(<PopupInner><span>a</span><span>b</span></PopupInner>).toJSON();
    expect(contentBox).toMatchSnapshot();
  });

  it('default visible: true, children: 2', () => {
    const contentBox = renderer.create(<PopupInner visible><span>a</span><span>b</span></PopupInner>).toJSON();
    expect(contentBox).toMatchSnapshot();
  });

  it('onMouseEnter', async () => {
    let onMouseEnter;
    const triggerEvent = new Promise(resolve => {
      onMouseEnter = () => {
        resolve(true);
      };
    });
    const target = mount(<PopupInner onMouseEnter={onMouseEnter}><span>a</span><span>b</span></PopupInner>);
    target.find('div').first().simulate('mouseEnter');
    exp(await triggerEvent).to.be.true;
  });
  it('onMouseLeave', async () => {
    let onMouseLeave;
    const triggerEvent = new Promise(resolve => {
      onMouseLeave = () => {
        resolve(true);
      };
    });
    const target = mount(<PopupInner onMouseLeave={onMouseLeave}><span>a</span><span>b</span></PopupInner>);
    target.find('div').first().simulate('mouseLeave');
    exp(await triggerEvent).to.be.true;
  });

});
