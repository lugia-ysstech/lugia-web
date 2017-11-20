//@flow
import React from 'react';
import InputTag, { _InputTag_, } from '../';
import chai from 'chai';
import 'jest-styled-components';
import Enzyme, { mount, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Theme from '../../theme';
import { createTestComponent, delay, } from 'sv-test-utils';
import * as Widgets from '../../consts/Widget';

const { mockFunction, mockObject, VerifyOrder, VerifyOrderConfig, } = require('vx-mock');

Enzyme.configure({ adapter: new Adapter(), });

const { expect: exp, } = chai;

describe('InputTag', () => {
  const displayValue = '常,乐,我,净';
  const value = '1,2,3';

  class InputTagTest extends React.Component<any, any> {
    inputtag: any;

    render () {
      return <Theme config={{ [Widgets.InputTag]: { width: 300, }, }} {...this.props}>
        <InputTag value={value}
                  ref={cmp => this.inputtag = cmp}
                  displayValue={displayValue}/></Theme>;
    }
  }

  it('展现值&实际值 宽度够容纳所有的3个结点', async () => {
    const mockInputTagPrototye = mockObject.create(_InputTag_.prototype);
    const funcMock = mockInputTagPrototye.mockFunction('getFontWidth');
    funcMock.forever(5);


    const cmp = mount(<InputTagTest/>);
    await delay(100, () => {
      cmp.instance().forceUpdate();
      cmp.update();
      const tagItems = cmp.find(Widgets.InputTagItem);
      exp(tagItems.length).to.be.equal(4);
      exp(tagItems.at(1).text()).to.be.equal('常');
      exp(tagItems.at(2).text()).to.be.equal('乐');
      exp(tagItems.at(3).text()).to.be.equal('我');
      exp(cmp.find(Widgets.FontItem).at(0).getDOMNode() == tagItems.at(0).getDOMNode()).to.be.true;
      exp(cmp.find(Widgets.FontItem).length).to.be.equal(1);
    });
    mockInputTagPrototye.resetAll();
  });
  it('展现值&实际值 3个一个结点也容不下', async () => {
    const mockInputTagPrototye = mockObject.create(_InputTag_.prototype);
    const funcMock = mockInputTagPrototye.mockFunction('getFontWidth');
    funcMock.forever(1000);

    const cmp = mount(<InputTagTest/>);
    await delay(100, () => {
      cmp.instance().forceUpdate();
      cmp.update();
      const tagItems = cmp.find(Widgets.InputTagItem);
      exp(tagItems.length).to.be.equal(2);
      exp(cmp.find(Widgets.FontItem).length).to.be.equal(1);
      exp(cmp.find(Widgets.FontItem).at(0).getDOMNode() == tagItems.at(0).getDOMNode()).to.be.true;
      exp(cmp.find(Widgets.MoreInputTagItem).length).to.be.equal(1);
      exp(cmp.find(Widgets.MoreInputTagItem).at(0).getDOMNode() == tagItems.at(1).getDOMNode()).to.be.true;
    });
    mockInputTagPrototye.resetAll();
  });
  it('展现值&实际值 3个只能容纳一个', async () => {
    const mockInputTagPrototye = mockObject.create(_InputTag_.prototype);
    const funcMock = mockInputTagPrototye.mockFunction('getFontWidth');
    let i = 0;
    const val = [5, 1000, 1000,];
    funcMock.mock(() => {
      return val[ i++ ];
    });

    const cmp = mount(<InputTagTest/>);
    await delay(100, () => {
      cmp.instance().forceUpdate();
      cmp.update();
      const tagItems = cmp.find(Widgets.InputTagItem);
      exp(tagItems.length).to.be.equal(3);
      exp(cmp.find(Widgets.FontItem).length).to.be.equal(1);
      exp(cmp.find(Widgets.MoreInputTagItem).length).to.be.equal(1);
      exp(cmp.find(Widgets.FontItem).at(0).getDOMNode() == tagItems.at(0).getDOMNode()).to.be.true;
      exp(tagItems.at(1).text()).to.be.equal('常');
      exp(cmp.find(Widgets.MoreInputTagItem).at(0).getDOMNode() == tagItems.at(2).getDOMNode()).to.be.true;
    });
    mockInputTagPrototye.resetAll();
  });

});
