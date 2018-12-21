//@flow
import React from 'react';
import chai from 'chai';
import {
  adjustValue,
  cacheOnlyFirstCall,
  deleteValue,
  getElementPosition,
  splitStr,
  fixControlledValue,
  createExistMap,
} from '../';

const { expect: exp } = chai;

describe('utils', () => {
  it('cacheOnlyFirstCall', () => {
    let callCount = 0;

    function add(a, b) {
      callCount++;
      return a + b;
    }

    const a = 5,
      b = 6;
    const target = cacheOnlyFirstCall(add);
    const expResult = add(a, b);
    exp(target.func(5, 6)).to.be.equal(expResult);
    exp(target.func(5, 6)).to.be.equal(expResult);
    exp(target.func(5, 6)).to.be.equal(expResult);
    exp(target.func(5, 6)).to.be.equal(expResult);
    exp(target.func(5, 6)).to.be.equal(expResult);
    exp(target.func(5, 6)).to.be.equal(expResult);
    exp(callCount).to.be.equal(2);
  });
  it('getElementPosition', () => {
    exp(
      getElementPosition({
        offsetTop: 5,
        offsetLeft: 5,
      })
    ).to.be.eql({ x: 5, y: 5 });

    exp(
      getElementPosition({
        offsetTop: 5,
        offsetLeft: 2,
        offsetParent: {
          offsetTop: 4,
          offsetLeft: 1,
          offsetParent: {
            offsetTop: 3,
            offsetLeft: 0,
          },
        },
      })
    ).to.be.eql({ x: 2 + 1 + 0, y: 5 + 4 + 3 });
  });

  it('splitStr', () => {
    exp(splitStr('')).to.be.eql([]);
    exp(splitStr('1,2')).to.be.eql(['1', '2']);
    exp(splitStr('1#2', '#')).to.be.eql(['1', '2']);
  });

  it('deleteValue value is not empty', () => {
    createDeletValueCase([1, 2, 3], [2, 3], 1);
    createDeletValueCase([1, 2, 3], [1, 3], 2);
    createDeletValueCase([1, 2, 3], [1, 2], 3);
  });

  function createDeletValueCase(target, expResult, value) {
    deleteValue(target, value);
    exp(target).to.be.eql(expResult);
  }

  it('deleteValue value is  empty', () => {
    const target = [];
    deleteValue(target, 100);
    exp(target).to.be.eql(target);

    deleteValue(target, 1);
    exp(target).to.be.eql(target);
  });
  it('adjustValue', () => {
    exp(adjustValue(0, 3)).to.be.equal(0);
    exp(adjustValue(3, 3)).to.be.equal(3);
    exp(adjustValue(4, 3)).to.be.equal(6);
    exp(adjustValue(10, 3)).to.be.equal(12);
    exp(adjustValue(11, 3)).to.be.equal(12);
    exp(adjustValue(12, 3)).to.be.equal(12);

    exp(adjustValue('0', 3)).to.be.equal(0);
    exp(adjustValue('3', 3)).to.be.equal(3);
    exp(adjustValue('4', 3)).to.be.equal(6);
    exp(adjustValue('10', 3)).to.be.equal(12);
    exp(adjustValue('11', '3')).to.be.equal(12);
    exp(adjustValue('12', 3)).to.be.equal(12);
  });
  it('fixControlledValue', () => {
    exp(fixControlledValue(0)).to.be.equal(0);
    exp(fixControlledValue(5)).to.be.equal(5);
    exp(fixControlledValue('')).to.be.equal('');
    exp(fixControlledValue(null)).to.be.equal('');
    exp(fixControlledValue(undefined)).to.be.equal('');
    exp(fixControlledValue('string')).to.be.equal('string');
    exp(fixControlledValue(true)).to.be.equal(true);
    exp(fixControlledValue(false)).to.be.equal(false);
  });
  it('createExistMap', () => {
    expect(createExistMap(['a', 'b', 'c'])).toEqual({ a: true, b: true, c: true });
    expect(createExistMap([])).toEqual({});
    expect(createExistMap(undefined)).toEqual({});
  });
});
