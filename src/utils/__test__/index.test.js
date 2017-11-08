//@flow
import React from 'react';
import chai from 'chai';
import { cacheOnlyFirstCall, getElementPosition, } from '../';

const { expect: exp, } = chai;

describe('utils', () => {

  it('cacheOnlyFirstCall', () => {
    let callCount = 0;

    function add (a, b) {
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

    exp(getElementPosition({
      offsetTop: 5,
      offsetLeft: 5,
    })).to.be.eql({ x: 5, y: 5, });

    exp(getElementPosition({
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
    })).to.be.eql({ x: 2 + 1 + 0, y: 5 + 4 + 3, });
  });

});
