//@flow

import * as React from 'react';
import 'jest-styled-components';
import Enzyme, { mount, render, } from 'enzyme';
import { createTestComponent, } from 'sv-test-utils';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import ThrottleScroller from '../ThrottleScroller';
import { mockObject, } from 'vx-mock';
import renderer from 'react-test-renderer';

import SVScroller from '../';


const { expect: exp, } = chai;

Enzyme.configure({ adapter: new Adapter(), });
describe('ThrottleScroller', function () {

  it('getTarget: target is data', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,];
    const Target = createTestComponent(ThrottleScroller(Menus, 20), target => {
      exp(target.getTarget()).to.be.equal(data);
    });
    mount(<Target data={data}/>);
  });
  it('getTarget: target is children', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const Item = (props: Object) => {
      return <div>{props.children}</div>;
    };
    const myItems = [<Item key="a">hello</Item>, <Item key="b">world</Item>,];
    const Target = createTestComponent(ThrottleScroller(Menus, 20), target => {
      exp(target.getTarget()).to.be.equal(myItems);
    });
    mount(<Target>{myItems}</Target>);
  });
  it('getTarget: target is null', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const Target = createTestComponent(ThrottleScroller(Menus, 20), target => {
      exp(target.getTarget()).to.be.eql([]);
    });
    mount(<Target></Target>);
  });

  it('isNeedScrolelr is false  data的数量为0', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const Target = createTestComponent(ThrottleScroller(Menus, 20), target => {
      const mock = mockObject.create(target);
      const getTarget = mock.mockFunction('getTarget');
      const canSeeCount = mock.mockFunction('canSeeCount');
      getTarget.returned([]);
      canSeeCount.returned(0);
      getTarget.returned([]);
      canSeeCount.returned(10);
      exp(target.isNeedScrolelr()).to.be.false;
      exp(target.isNeedScrolelr()).to.be.false;
    });
    mount(<Target></Target>);
  });
  it('isNeedScrolelr is false 可见的数大于总数', () => {
    const Menus = () => {
      return <div>1</div>;
    };

    const Target = createTestComponent(ThrottleScroller(Menus, 20), target => {
      const mock = mockObject.create(target);
      const getTarget = mock.mockFunction('getTarget');
      const canSeeCount = mock.mockFunction('canSeeCount');
      getTarget.returned([]);
      canSeeCount.returned(5);
      exp(target.isNeedScrolelr()).to.be.false;
    });
    mount(<Target></Target>);
  });
  it('isNeedScrolelr is true 可见的数小于总数', () => {
    const Menus = () => {
      return <div>1</div>;
    };

    const Target = createTestComponent(ThrottleScroller(Menus, 20), target => {
      const mock = mockObject.create(target);
      const getTarget = mock.mockFunction('getTarget');
      const canSeeCount = mock.mockFunction('canSeeCount');
      getTarget.returned([1, 2, 3, 4, 5, 6,]);
      canSeeCount.returned(5);
      exp(target.isNeedScrolelr()).to.be.true;
    });
    mount(<Target></Target>);
  });

  it('fetchViewSize', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const height = 500;
    const theme = () => ({ height, });
    const Target = createTestComponent(ThrottleScroller(Menus, 20), target => {
      exp(target.fetchViewSize()).to.be.equal(height);
    });
    mount(<Target getTheme={theme}></Target>);
  });
  it('fetchViewSize default', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const height = 250;
    const Target = createTestComponent(ThrottleScroller(Menus, 20), target => {
      exp(target.fetchViewSize()).to.be.equal(height);
    });
    mount(<Target></Target>);
  });
  it('getStart', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const height = 500;
    const theme = () => ({ height, });
    const canSee = height / 20;
    const menuItemHeight = 20;
    const Target = createTestComponent(ThrottleScroller(Menus, menuItemHeight), target => {

      exp(target.getStart({}, { start: 100, }), 'is state.start').to.be.equal(100);
      exp(target.getStart({ start: 1000, }, { start: 100, }), 'is props.start').to.be.equal(1000 - canSee + 1);

      exp(target.getStart({}, {}), 'is empty 0').to.be.equal(0);

    });
    mount(<Target getTheme={theme} data={{ length: 1000, }}></Target>);
  });

  it('fetchTotalSize', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const height = 500;
    const theme = () => ({ height, });
    const itemHeigth = 20;
    const Target = createTestComponent(ThrottleScroller(Menus, itemHeigth), target => {
      const mock = mockObject.create(target);
      const getTarget = mock.mockFunction('getTarget');
      const items = [1, 2, 3, 4, 54, 5,];
      getTarget.returned(items);
      exp(target.fetchTotalSize()).to.be.equal(itemHeigth * items.length);
    });
    mount(<Target getTheme={theme}></Target>);
  });


  it('canSeeCount', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const itemHeight = 20;
    const Target = createTestComponent(ThrottleScroller(Menus, itemHeight), target => {
      const mock = mockObject.create(target);
      const fetchViewSize = mock.mockFunction('fetchViewSize');
      fetchViewSize.returned(100);
      exp(target.canSeeCount()).to.be.equal(5);

      fetchViewSize.returned(0);
      exp(target.canSeeCount()).to.be.equal(0);

      fetchViewSize.returned(-100);
      exp(target.canSeeCount()).to.be.equal(0);

      fetchViewSize.returned(81);
      exp(target.canSeeCount()).to.be.equal(5);

      fetchViewSize.returned(70);
      exp(target.canSeeCount()).to.be.equal(4);

      fetchViewSize.returned(69);
      exp(target.canSeeCount()).to.be.equal(4);

    });
    mount(<Target></Target>);
  });
  it('canSeeCount itemHeight =0', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const Target = createTestComponent(ThrottleScroller(Menus, 0), target => {
      const mock = mockObject.create(target);
      const fetchViewSize = mock.mockFunction('fetchViewSize');
      fetchViewSize.returned(100);
      exp(target.canSeeCount()).to.be.equal(0);

      fetchViewSize.returned(0);
      exp(target.canSeeCount()).to.be.equal(0);

      fetchViewSize.returned(-100);
      exp(target.canSeeCount()).to.be.equal(0);

      fetchViewSize.returned(81);
      exp(target.canSeeCount()).to.be.equal(0);

      fetchViewSize.returned(70);
      exp(target.canSeeCount()).to.be.equal(0);

      fetchViewSize.returned(69);
      exp(target.canSeeCount()).to.be.equal(0);

    });
    mount(<Target></Target>);
  });
  it('canSeeCount itemHeight <0', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const Target = createTestComponent(ThrottleScroller(Menus, -100), target => {
      const mock = mockObject.create(target);
      const fetchViewSize = mock.mockFunction('fetchViewSize');
      fetchViewSize.returned(100);
      exp(target.canSeeCount()).to.be.equal(0);

      fetchViewSize.returned(0);
      exp(target.canSeeCount()).to.be.equal(0);

      fetchViewSize.returned(-100);
      exp(target.canSeeCount()).to.be.equal(0);

      fetchViewSize.returned(81);
      exp(target.canSeeCount()).to.be.equal(0);

      fetchViewSize.returned(70);
      exp(target.canSeeCount()).to.be.equal(0);

      fetchViewSize.returned(69);
      exp(target.canSeeCount()).to.be.equal(0);

    });
    mount(<Target></Target>);
  });
  it('fetchStart&End', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const itemHeight = 20;
    const Target = createTestComponent(ThrottleScroller(Menus, itemHeight), target => {
      const mock = mockObject.create(target);
      const canSeeCount = mock.mockFunction('canSeeCount');
      const getTarget = mock.mockFunction('getTarget');
      getTarget.returned([]);
      exp(target.fetchEnd(3)).to.be.equal(0);

      getTarget.forever([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,]);
      canSeeCount.returned(5);
      exp(target.fetchEnd(3)).to.be.equal(8);

      canSeeCount.returned(5);
      exp(target.fetchEnd(4)).to.be.equal(9);

      canSeeCount.returned(5);
      exp(target.fetchEnd(5)).to.be.equal(10);

      canSeeCount.returned(5);
      exp(target.fetchEnd(100)).to.be.equal(11);

      canSeeCount.returned(5);
      exp(target.fetchEnd(-1)).to.be.equal(5);

      canSeeCount.returned(0);
      exp(target.fetchEnd(5)).to.be.equal(5);
    });
    mount(<Target></Target>);
  });


  it('没有滚动条', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const Target = createTestComponent(ThrottleScroller(Menus, 20), target => {
      const mock = mockObject.create(target);
      mock.mockFunction('isNeedScrolelr').returned(false);
    });
    const cmp = mount(<Target></Target>);
    cmp.render();
    exp(cmp.html()).to.be.equal('<div>1</div>');
  });

  it('有滚动条 滚动条的属性是否正确 scroler.type is default y', () => {
    createExistScrollerCase();
  });

  it('有滚动条 滚动条的属性是否正确 scroler.type is x', () => {
    createExistScrollerCase('x');

  });

  function createExistScrollerCase (type: ?string) {
    const Menus = () => {
      return <div>1</div>;
    };
    let _this: Object = {};
    const throttleScroller = ThrottleScroller(Menus, 20);
    const viewSize = 101,
      totalSize = 102;
    const Target = createTestComponent(throttleScroller, target => {
      _this = target;
      const mock = mockObject.create(target);
      mock.mockFunction('fetchViewSize').forever(viewSize);
      mock.mockFunction('fetchTotalSize').returned(totalSize);
      mock.mockFunction('isNeedScrolelr').mock(() => {
        return true;
      });
    });
    let cmp = mount(<Target type={type}></Target>);

    exp(_this.scroller).to.be.undefined;

    cmp = cmp.setState({ start: 1, });
    exp(cmp.find(SVScroller).length).to.be.equal(1);
    exp(cmp.find(SVScroller).props().onChange).to.be.equal(_this.onScroller);
    exp(cmp.find(SVScroller).props()).to.be.eql({
      viewSize,
      totalSize,
      value: 0,
      type: type ? type : 'y',
      onChange: _this.onScroller,
      throttle: 100,
      step: 1,
    });
    exp(_this.scroller).to.be.not.null;

    // onWheel
    const scroller = {};
    const mock = mockObject.create(_this);
    const mockScroller = mockObject.create(scroller);
    mock.mockVar('scroller').forever(scroller);

    const mockFunction = mockScroller.mockFunction('onWheel');
    mockFunction.returned(true);
    const event = { target: 'ligx', };
    _this.onWheel(event);
    exp(mockFunction.getCallContext(0)).to.be.equal(scroller);
    exp(mockFunction.getCallArgs(0)).to.be.eql([event,]);
  }

  it('Target props & start & end', () => {

    const Menus = () => {
      return <div>1</div>;
    };
    const start = 100;
    const end = 100;

    let _this: Object = {};
    const itemH = 20;
    const throttleScroller = ThrottleScroller(Menus, itemH);
    const viewSize = 101,
      totalSize = 102;
    const Target = createTestComponent(throttleScroller, target => {
      _this = target;
      const mock = mockObject.create(target);
      mock.mockFunction('fetchViewSize').forever(viewSize);
      mock.mockFunction('fetchTotalSize').forever(totalSize);
      mock.mockFunction('fetchEnd').returned(end);

      mock.mockFunction('isNeedScrolelr').mock(() => {
        return true;
      });
    });
    const canSee = Math.floor(viewSize / itemH);
    let cmp = mount(<Target data={{ length: 1000, }}></Target>);

    cmp = cmp.setState({ start, });
    let menuProps = cmp.find(Menus).props();
    exp(menuProps.end).to.be.equal(end);
    exp(menuProps.start).to.be.equal(0);
    // 测试滚动
    _this.onScroller(100);
    cmp.setState({ start, });
    menuProps = cmp.find(Menus).props();
    exp(menuProps.start).to.be.equal(5);
    exp(menuProps.end).to.be.equal(5 + canSee + 1);
  });

  it('需要滚动条 HTML结构', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const itemH = 20;
    const Target = ThrottleScroller(Menus, itemH);
    const theme = () => ({ height: 50, width: 300, });
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9,];
    expect(renderer.create(<Target getTheme={theme}
                                   data={data}></Target>).toJSON()).toMatchSnapshot();
  });

  it('需要滚动条 HTML结构 theme is default data is 10 len', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const itemH = 20;
    const Target = ThrottleScroller(Menus, itemH);
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9,];
    expect(renderer.create(<Target data={data}></Target>).toJSON()).toMatchSnapshot();
  });
  it('需要滚动条 HTML结构 theme is default data is 100 len', () => {
    const Menus = () => {
      return <div>1</div>;
    };
    const itemH = 20;
    const Target = ThrottleScroller(Menus, itemH);
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push(i);
    }
    expect(renderer.create(<Target data={data}></Target>).toJSON()).toMatchSnapshot();
  });
  it('需要滚动条 HTML结构 children', () => {
    const Item = (props: Object) => {
      return <div>{props.title}</div>;
    };
    const items = [];
    for (let i = 0; i < 100; i++) {
      items.push(<Item key={`key${i}`} title={`title${i}`}/>);
    }
    const Menus = props => {
      return <div>{props.children}</div>;
    };

    const itemH = 20;
    const Target = ThrottleScroller(Menus, itemH);

    expect(renderer.create(<Target>{items}</Target>).toJSON()).toMatchSnapshot();
  });
});
