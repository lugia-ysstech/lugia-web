//@flow

import * as React from 'react';
import 'jest-styled-components';
import Enzyme, { mount, render, } from 'enzyme';
import renderer from 'react-test-renderer';
import { createTestComponent, } from 'sv-test-utils';
import Adapter from 'enzyme-adapter-react-16';
import Scroller from '../index';
import chai from 'chai';

const { expect: exp, } = chai;

Enzyme.configure({ adapter: new Adapter(), });


describe('Scroller', function () {


  it('props defaultValue: 0 & 50 type: x & y', () => {


    const config = {
      viewSize: 300,
      totalSize: 1000,
      left: 100,
      defaultValue: 0,
    };
    expect(renderer.create(<Scroller {...config} type="x"/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Scroller {...config} type="y"/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Scroller {...config} type="x" defaultValue={50}/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Scroller {...config} type="y" defaultValue={50}/>).toJSON()).toMatchSnapshot();
  });
  it('props value: 0 & 50 type: x & y', () => {
    const config = {
      viewSize: 300,
      totalSize: 1000,
      left: 100,
      value: 0,
    };
    expect(renderer.create(<Scroller {...config} type="x"/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Scroller {...config} type="x"/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Scroller {...config} type="y"/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Scroller {...config} type="x" value={50}/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Scroller {...config} type="y" value={50}/>).toJSON()).toMatchSnapshot();
  });

  it('props value: 50 eql defaultValue: 50', () => {
    const config = {
      viewSize: 300,
      totalSize: 1000,
      left: 100,
    };
    const valueCmp = renderer.create(<Scroller {...config} type="x" value={50}/>);
    const defaultValueCmp = renderer.create(<Scroller {...config} type="x" defaultValue={50}/>);
    exp(JSON.stringify(valueCmp.toJSON())).to.be.eql(JSON.stringify(defaultValueCmp.toJSON()));
  });

  it('value2pos & pos2value', () => {
    const config = {
      type: 'x',
      viewSize: 100,
      totalSize: 200,
      value: 50,
    };
    const Target = createTestComponent(Scroller, scroller => {

      exp(scroller.value2pos(0), 'pos 0 value 0').to.be.equal(0);
      exp(scroller.pos2value(0)).to.be.equal(0);

      // 等式恒等
      for (let i = 0; i < 100; i++) {
        const pos = scroller.value2pos(i);
        exp(scroller.pos2value(pos)).to.be.equal(i);
      }

      exp(scroller.value2pos(10)).to.be.equal(5);
      exp(scroller.pos2value(5)).to.be.equal(10);
    });
    mount(<Target {...config}/>);
  });


  it('getPX', () => {
    const config = {
      type: 'x',
      viewSize: 100,
      totalSize: 200,
      value: 50,
    };
    const Target = createTestComponent(Scroller, scroller => {
      exp(scroller.pos2value(25)).to.be.equal(50);
      exp(scroller.pos2value(50)).to.be.equal(100);
      exp(scroller.value2pos(50)).to.be.equal(25);

      exp(scroller.getPX(5)).to.be.equal('5px');
      exp(scroller.getPX(10)).to.be.equal('10px');
    });
    mount(<Target {...config}/>);
  });

  it('props type: x, value: 50  & onChange limit cannot scroller  ', async () => {

    let config;
    const onChange = new Promise(resolve => {
      config = {
        type: 'x',
        viewSize: 100,
        totalSize: 200,
        value: 50,
        onChange (v) {
          resolve(v);
        },
      };
    });
    const cmp = mount(<Scroller {...config}/>);
    const dom = cmp.find('div');
    const sliderBar = dom.at(1);
    exp(sliderBar.props().style.left).to.be.eql('25px');

    const scroller = dom.at(0);
    scroller.simulate('mouseup', { clientX: 50, });

    exp(sliderBar.props().style.left).to.be.eql('25px');
    exp(await onChange).to.be.equal(100);
  });

  it('props type: y, value: 50  & onChange limit cannot scroller  ', async () => {

    let config;
    const onChange = new Promise(resolve => {
      config = {
        type: 'y',
        viewSize: 100,
        totalSize: 200,
        value: 50,
        onChange (v) {
          resolve(v);
        },
      };
    });
    const cmp = mount(<Scroller {...config}/>);
    const dom = cmp.find('div');
    const sliderBar = dom.at(1);
    exp(sliderBar.props().style.top).to.be.eql('25px');

    const scroller = dom.at(0);
    scroller.simulate('mouseup', { clientY: 50, });

    exp(sliderBar.props().style.top).to.be.eql('25px');
    exp(await onChange).to.be.equal(100);
  });
  it('props type: y, bar.mousedown & scroller.mousemove ', async () => {

    let config;
    const onChange = new Promise(resolve => {
      config = {
        type: 'y',
        viewSize: 100,
        totalSize: 200,
        onChange (v) {
          resolve(v);
        },
      };
    });
    const cmp = mount(<Scroller {...config}/>);
    const dom = cmp.find('div');
    const sliderBar = dom.at(1);
    const scroller = dom.at(0);
    exp(sliderBar.props().style.top).to.be.eql('0px');

    sliderBar.simulate('mousedown', { clientY: 100, });
    scroller.simulate('mousemove', { clientY: 100, });
    exp(sliderBar.getDOMNode().style.top).to.be.eql('50px');
    exp(await onChange).to.be.equal(100);

  });
  it('props type: y, bar mousedown & mouseup ', async () => {

    let config;
    const onChange = new Promise(resolve => {
      config = {
        type: 'y',
        viewSize: 100,
        totalSize: 200,
        onChange (v) {
          resolve(v);
        },
      };
    });
    const cmp = mount(<Scroller {...config}/>);
    const dom = cmp.find('div');
    const sliderBar = dom.at(1);
    exp(sliderBar.props().style.top).to.be.eql('0px');
    exp(sliderBar.getDOMNode().style.top).to.be.eql('0px');

    sliderBar.simulate('mousedown', { clientY: 100, });
    sliderBar.simulate('mouseup', { target: '', clientY: 100, });
    exp(sliderBar.getDOMNode().style.top).to.be.eql('0px');
  });
  it('props type: y, bar.mousedown & bar.mouseup & mousemove', async () => {

    const config = {
      type: 'y',
      viewSize: 100,
      totalSize: 200,
      onChange (v) {
      },
    };
    const cmp = mount(<Scroller {...config}/>);
    const dom = cmp.find('div');
    const sliderBar = dom.at(1);
    const scroller = dom.at(0);
    exp(sliderBar.props().style.top).to.be.eql('0px');
    exp(sliderBar.getDOMNode().style.top).to.be.eql('0px');

    sliderBar.simulate('mousedown', { clientY: 100, });
    sliderBar.simulate('mouseup', { target: '', clientY: 100, });
    scroller.simulate('mousemove', { clientY: 100, });
    exp(sliderBar.getDOMNode().style.top).to.be.eql('0px');
  });

  it('props type: y, bar.mousedown & scroller.mousemove', async () => {

    const config = {
      type: 'y',
      viewSize: 100,
      totalSize: 200,
      onChange (v) {
      },
    };
    const cmp = mount(<Scroller {...config}/>);
    const dom = cmp.find('div');
    const sliderBar = dom.at(1);
    const scroller = dom.at(0);
    exp(sliderBar.props().style.top).to.be.eql('0px');
    exp(sliderBar.getDOMNode().style.top).to.be.eql('0px');

    sliderBar.simulate('mousedown', { clientY: 100, });
    scroller.simulate('mouseup', { clientY: 100, });
    exp(sliderBar.getDOMNode().style.top).to.be.eql('0px');
  });


  it('props type: y, only mousemove ', async () => {

    const config = {
      type: 'y',
      viewSize: 100,
      totalSize: 200,

    };
    const cmp = mount(<Scroller {...config}/>);
    const dom = cmp.find('div');
    const sliderBar = dom.at(1);
    const scroller = dom.at(0);
    exp(sliderBar.props().style.top).to.be.eql('0px');
    scroller.simulate('mousemove', { clientY: 100, });
    exp(sliderBar.getDOMNode().style.top).to.be.eql('0px');
  });

  it('props defaultValue: 50 & onChange not limit bar.mousedown bar.mouseup scroller.mouseup', async () => {
    let config;
    const onChange = new Promise(resolve => {
        config = {
          type: 'x',
          viewSize: 100,
          totalSize: 200,
          defaultValue: 50,
          onChange: v => {
            resolve(v);
          },
        };
      }
    );
    const cmp = mount(<Scroller {...config}/>);

    const dom = cmp.find('div');
    const sliderBar = dom.at(1);
    exp(sliderBar.props().style.left).to.be.eql('25px');

    sliderBar.simulate('mousedown', { clientX: 100, });
    sliderBar.simulate('mouseup', { clientX: 100, });
    const scroller = dom.at(0);
    scroller.simulate('mouseup', { clientX: 50, });

    exp(sliderBar.getDOMNode().style.left).to.be.eql('50px');
    exp(await onChange).to.be.equal(100);

  });


  it('getDirection', () => {
    exp(Scroller.prototype.getDirection(1)).to.be.equal('up');
    exp(Scroller.prototype.getDirection(-1)).to.be.equal('down');
    exp(Scroller.prototype.getDirection(-2)).to.be.equal('down');
    exp(Scroller.prototype.getDirection(0)).to.be.equal('none');
  });


  it('getSliderBarSize', () => {

    exp(Scroller.prototype.getSliderBarSize({ viewSize: 100, totalSize: 50, })).to.be.equal(0);
    exp(Scroller.prototype.getSliderBarSize({ viewSize: 100, totalSize: 100, })).to.be.equal(0);
    exp(Scroller.prototype.getSliderBarSize({ viewSize: 100, totalSize: 1000, })).to.be.equal(10);
    exp(Scroller.prototype.getSliderBarSize({ viewSize: 100, totalSize: 200, })).to.be.equal(50);
    exp(Scroller.prototype.getSliderBarSize({ viewSize: 100, totalSize: 300, })).to.be.equal(33);
    exp(Scroller.prototype.getSliderBarSize({ viewSize: 100, totalSize: 500, })).to.be.equal(20);

  });

  it('getMoveStep', () => {
    const step = 1;
    exp(Scroller.prototype.getMoveStep('none', step)).to.be.equal(step);
    exp(Scroller.prototype.getMoveStep('down', step)).to.be.equal(step);
    exp(Scroller.prototype.getMoveStep('up', step)).to.be.equal(-step);
  });
  it('setProps', async () => {

    const value = 50;
    const
      config = {
        type: 'x',
        viewSize: 100,
        totalSize: 200,
      };
    const cmp = mount(<Scroller {...config}/>);
    exp(cmp.state().sliderSize).to.be.equal(50);
    exp(cmp.state().value).to.be.equal(0);

    cmp.setProps({ type: 'x', viewSize: 100, totalSize: 100, defaultValue: value, });
    exp(cmp.state().sliderSize).to.be.equal(0);
    exp(cmp.state().value).to.be.equal(50);

  });
  it('updateStepInfo', async () => {

    const viewSize = 100;
    const totalSize = 200;
    const
      config = {
        type: 'x',
        viewSize,
        totalSize,
      };
    const Target = createTestComponent(Scroller, (target: Object) => {
      exp(target.step).to.be.equal(1);
      exp(target.fastStep).to.be.equal(50);
      exp(target.maxValue).to.be.equal(100);
    });
    mount(<Target {...config}/>);
  });

  it('props: type is error', async () => {

    const viewSize = 100;
    const totalSize = 200;
    const
      config = {
        type: 'x',
        viewSize,
        totalSize,
      };
    config[ 'type' + '' ] = 'adsfads';

    expect(renderer.create(<Scroller {...config}/>).toJSON()).toMatchSnapshot();
  });

})
;
