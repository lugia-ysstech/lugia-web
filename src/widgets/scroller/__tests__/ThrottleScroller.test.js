//@flow

import * as React from 'react';
import 'jest-styled-components';
import Enzyme, { mount, render, } from 'enzyme';
import { createTestComponent, delay, } from 'sv-test-utils';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import ThrottleScroller from '../ThrottleScroller';
import { mockObject, } from 'vx-mock';

const { expect: exp, } = chai;

Enzyme.configure({ adapter: new Adapter(), });


describe('ThrottleScroller', function () {


  it('props: data & children is null', () => {
    const Menus = () => {
      return <div></div>;
    };
    const Target = createTestComponent(ThrottleScroller(Menus, 20), target => {
    });
    const cmp = mount(<Target/>);
    exp(cmp.find(Menus).props().start).to.be.equal(0);
    exp(cmp.find(Menus).props().end).to.be.equal(0);
  });

  it('props.data length is 0', () => {
    const Menus = () => {
      return <div></div>;
    };
    const Target = createTestComponent(ThrottleScroller(Menus, 20), target => {
    });
    const cmp = mount(<Target data={[]}/>);
    exp(cmp.find(Menus).props().start).to.be.equal(0);
    exp(cmp.find(Menus).props().end).to.be.equal(0);
  });
  it('props.children', () => {
    const Menus = () => {
      return <div></div>;
    };
    const Target = createTestComponent(ThrottleScroller(Menus, 20), target => {
    });
    const cmp = mount(<Target></Target>);
    exp(cmp.find(Menus).props().start).to.be.equal(0);
    exp(cmp.find(Menus).props().end).to.be.equal(0);
  });


  it('fetchViewHeigh defaultHeight', () => {
    const Menus = () => {
      return <div></div>;
    };
    const Target = createTestComponent(ThrottleScroller(Menus, 20), target => {
      exp(target.fetchViewHeigh()).to.be.eql(250);
    });
    mount(<Target/>);
  });

  it('fetchViewHeigh computeCanSeeMenuItemCount', () => {
    const Menus = () => {
      return <div></div>;
    };
    const Target = createTestComponent(ThrottleScroller(Menus, 15), target => {
      exp(target.fetchViewHeigh()).to.be.eql(250);
      exp(target.computeCanSeeMenuItemCount()).to.be.eql(17);
    });
    mount(<Target/>);
  });

  it('fetchViewHeigh computeItems dataIsEmpty', () => {
    createThrottleScrollerTestComponent(target => {
      exp(target.computeItems([], 0)).to.be.eql({ totalSize: 0, needScroller: false, start: 0, end: 0, });
      exp(target.computeItems([], 1)).to.be.eql({ totalSize: 0, needScroller: false, start: 0, end: 0, });
      exp(target.computeItems([], 2)).to.be.eql({ totalSize: 0, needScroller: false, start: 0, end: 0, });

    });
  });
  it('fetchViewHeigh computeItems start is zero', () => {
    createThrottleScrollerTestComponent(target => {
      exp(target.computeItems([1, 2, 3, 4,], -1)).to.be.eql({ totalSize: 0, needScroller: false, start: 0, end: 0, });

    });
  });
  it('fetchViewHeigh computeItems 需要滚动条 start参数正确', () => {
    createThrottleScrollerTestComponent(target => {
      const mock = mockObject.create(target);
      const mockCanSeeMenuItemCount = mock.mockFunction('computeCanSeeMenuItemCount');


      mockCanSeeMenuItemCount.returned(2);
      const datas = [1, 2, 3, 4,];
      const startForZero = target.computeItems(datas, 0);
      exp(startForZero).to.be.eql({ totalSize: 60, needScroller: true, start: 0, end: 2, });
    });
  });
  it('fetchViewHeigh computeItems 不需要滚动条', () => {
    createThrottleScrollerTestComponent(target => {
      const mock = mockObject.create(target);
      const mockCanSeeMenuItemCount = mock.mockFunction('computeCanSeeMenuItemCount');


      mockCanSeeMenuItemCount.returned(100);
      const datas = [1, 2, 3, 4,];
      const startForZero = target.computeItems(datas, 0);
      exp(startForZero).to.be.eql({ totalSize: 0, needScroller: false, start: 0, end: 0, });

    });
  });

  function createThrottleScrollerTestComponent (callback) {
    const Menus = () => {
      return <div></div>;
    };
    const menuItemHeight = 15;
    const Target = createTestComponent(ThrottleScroller(Menus, menuItemHeight), target => {
      callback(target);
    });
    mount(<Target/>);
  }


  it('fetchViewHeigh height: 50', () => {
    const Menus = () => {
      return <div></div>;
    };
    const height = 50;
    const ThroleScroller = ThrottleScroller(Menus, 20);
    const getTheme = () => {
      return { height, };
    };

    class Scroller extends React.Component<any, any> {
      target: Object;

      render () {
        const getTarget: Function = (cmp: Object) => {
          this.target = cmp;
        };

        return <ThroleScroller ref={getTarget} getTheme={getTheme}/>;
      }

      fetchViewHeigh () {
        return this.target.fetchViewHeigh();
      }
    }

    const Target = createTestComponent(Scroller, target => {
      exp(target.fetchViewHeigh()).to.be.eql(50);
    });
    mount(<Target/>);
  });
});
