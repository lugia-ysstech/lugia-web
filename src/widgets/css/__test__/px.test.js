/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';
import { em, percent, px, rem, } from '../units';

const { expect: exp, } = chai;


describe('Button', () => {
  beforeEach(() => {
  });

  function createTestCase (pack: Function, unit: string) {
    const height = px(100);
    exp(String(pack(height + 5))).to.be.eql('105' + unit);
    exp(String(pack(height - 5))).to.be.eql('95' + unit);
    exp(String(pack(height * 5))).to.be.eql('500' + unit);
    exp(String(pack(height / 5))).to.be.eql('20' + unit);
    exp(`${pack(100)}`).to.be.eql('100' + unit);
    exp(String(pack(100))).to.be.eql('100' + unit);
  }

  it('px', () => {
    createTestCase(px, 'px');
  });
  it('em', () => {
    createTestCase(em, 'em');
  });
  it('rem', () => {
    createTestCase(rem, 'rem');
  });
  it('percent', () => {
    createTestCase(percent, '%');
  });
});
