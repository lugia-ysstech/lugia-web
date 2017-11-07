//@flow
import Support from '../FormFieldWidgetSupport';

import chai from 'chai';

const { expect: exp, } = chai;
const { getValue, } = Support;

describe('FormFieldWidgetSupport.js', () => {
  it('getValue: value is  props.value', () => {
    const propsValue = '无名天地之母';
    const stateValue = '有名万物之始';
    const props = { value: propsValue, };
    const state = { value: stateValue, };
    exp(getValue(props, state)).to.be.equal(propsValue);
  });
  it('getValue: value is  state.value', () => {
    const stateValue = '有名万物之始';
    const state = { value: stateValue, };
    exp(getValue({}, state)).to.be.equal(stateValue);
  });


});
