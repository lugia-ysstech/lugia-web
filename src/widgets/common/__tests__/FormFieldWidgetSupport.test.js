//@flow
import Support from '../FormFieldWidgetSupport';

import chai from 'chai';

const { expect: exp, } = chai;
const { getValue, } = Support;

describe('FormFieldWidgetSupport.js', () => {
  it('getValue: value  ', () => {
    const value = 'ligx';
    exp(getValue({ value, })).to.be.equal(value);
  });

  it('getValue: defaultValue  ', () => {
    const defaultValue = 'kxy';
    exp(getValue({ defaultValue, })).to.be.equal(defaultValue);
  });
  it('getValue: value & defaultValue ', () => {
    const value = 'ligx';
    const defaultValue = 'kxy';
    exp(getValue({ defaultValue, value, })).to.be.equal(value);
  });

  it('getValue: value: undefined  & defaultValue ', () => {
    const value = undefined;
    const defaultValue = 'kxy';
    exp(getValue({ defaultValue, value, })).to.be.equal('');
  });

  it('getValue: value: undefined  & defaultValue ', () => {
    exp(getValue({})).to.be.equal('');
  });

});
