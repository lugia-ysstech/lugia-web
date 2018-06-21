//@flow
import Support from '../FormFieldWidgetSupport';

import chai from 'chai';

const { expect: exp } = chai;
const {
  getValue,
  getInitValueArray,
  getInitValue,
  getCodeItem,
  getCodeItemArray,
  toArray,
} = Support;

describe('FormFieldWidgetSupport.js', () => {
  it('getValue: value is  props.value', () => {
    const propsValue = '无名天地之母';
    const stateValue = '有名万物之始';
    const props = { value: propsValue };
    const state = { value: stateValue };
    exp(getValue(props, state)).to.be.equal(propsValue);
  });
  it('getValue: value is  state.value', () => {
    const stateValue = '有名万物之始';
    const state = { value: stateValue };
    exp(getValue({}, state)).to.be.equal(stateValue);
  });

  it('getInitValueArray', () => {
    exp(getInitValueArray({ defaultValue: '1000' })).to.be.eql(['1000']);
    exp(getInitValueArray({ defaultValue: 1 })).to.be.eql([1]);
    exp(getInitValueArray({ defaultValue: ['1000', '1'] })).to.be.eql(['1000', '1']);
    exp(getInitValueArray({ defaultValue: ['1000', '1'], value: ['1000'] })).to.be.eql(['1000']);
    exp(getInitValueArray({})).to.be.eql([]);
  });

  it('getInitValue', () => {
    exp(getInitValue({ defaultValue: '1000' })).to.be.eql('1000');
    exp(getInitValue({ defaultValue: 'a' })).to.be.eql('a');
    exp(getInitValue({ defaultValue: 'b', value: 'c' })).to.be.eql('c');
    exp(getInitValue({})).to.be.eql('');
  });

  it('getCodeItem', () => {
    exp(
      getCodeItem({
        value: 'value',
        defaultValue: 'defaultValue',
        defaultDisplayValue: 'defaultDisplayValue',
        displayValue: 'displayValue',
      })
    ).to.be.eql({
      displayValue: 'displayValue',
      value: 'value',
    });
    exp(
      getCodeItem({
        value: 'value',
        displayValue: 'displayValue',
      })
    ).to.be.eql({
      displayValue: 'displayValue',
      value: 'value',
    });

    exp(
      getCodeItem({
        defaultValue: 'defaultValue',
        defaultDisplayValue: 'defaultDisplayValue',
        displayValue: 'displayValue',
      })
    ).to.be.eql({
      displayValue: 'displayValue',
      value: 'defaultValue',
    });

    exp(
      getCodeItem({
        defaultValue: 'defaultValue',
        defaultDisplayValue: 'defaultDisplayValue',
      })
    ).to.be.eql({
      displayValue: 'defaultDisplayValue',
      value: 'defaultValue',
    });

    exp(getCodeItem({})).to.be.eql({ displayValue: '', value: '' });
  });

  it('getCodeItemArray', () => {
    exp(
      getCodeItemArray({
        value: 'value',
        defaultValue: 'defaultValue',
        defaultDisplayValue: 'defaultDisplayValue',
        displayValue: 'displayValue',
      })
    ).to.be.eql({
      displayValue: ['displayValue'],
      value: ['value'],
    });
    exp(
      getCodeItemArray({
        value: 'value',
        displayValue: 'displayValue',
      })
    ).to.be.eql({
      displayValue: ['displayValue'],
      value: ['value'],
    });

    exp(
      getCodeItemArray({
        defaultValue: 'defaultValue',
        defaultDisplayValue: 'defaultDisplayValue',
        displayValue: 'displayValue',
      })
    ).to.be.eql({
      displayValue: ['displayValue'],
      value: ['defaultValue'],
    });

    exp(
      getCodeItemArray({
        defaultValue: 'defaultValue',
        defaultDisplayValue: 'defaultDisplayValue',
      })
    ).to.be.eql({
      displayValue: ['defaultDisplayValue'],
      value: ['defaultValue'],
    });

    exp(getCodeItemArray({})).to.be.eql({ displayValue: [], value: [] });
  });
  it('toArray', () => {
    exp(toArray('1')).to.be.eql(['1']);
    exp(toArray(1)).to.be.eql([1]);
    exp(toArray()).to.be.eql([]);
    exp(toArray(null)).to.be.eql([]);
    exp(toArray(0)).to.be.eql([0]);
  });
});
