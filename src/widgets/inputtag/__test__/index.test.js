//@flow
import React from 'react';
import InputTag from '../';
import chai from 'chai';
import 'jest-styled-components';
import Enzyme, { mount, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Theme from '../../theme';
import { createTestComponent, } from 'sv-test-utils';
import * as Widgets from '../../consts/Widget';

const { mockFunction, mockObject, VerifyOrder, VerifyOrderConfig, } = require('vx-mock');

Enzyme.configure({ adapter: new Adapter(), });

const { expect: exp, } = chai;

describe('InputTag', () => {

  it('展现值&实际值', () => {
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

    const Target = createTestComponent(InputTagTest, target => {
      const mock = mockObject.create(target.inputtag.target);
      target.inputtag.target.getFontWidth('11').then(v => console.info(v));
      // console.info(target.inputtag.target.getFontWidth('11'));
      mock.mockFunction('getFontWidth').forever(5);
    });

    const cmp = mount(<Target/>);
    cmp.setProps({ hello: 1, });
    cmp.instance().forceUpdate();
    cmp.update();
    exp(cmp.find(Widgets.InputTagItem).length).to.be.equal(3);
  });
});
