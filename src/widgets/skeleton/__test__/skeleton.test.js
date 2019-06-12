/**
 *
 * create by szfeng
 *
 * @flow
 */
import React from 'react';
import Skeleton from '../';
import InnerSkeleton from '../skeleton';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Skeleton', () => {
  it('no paragraph,return how many paragraph', () => {
    const cmp = mount(<Skeleton />);
    expect(findParagraph(cmp).length).toBe(4);
  });

  it('no title ,return how many paragraph', () => {
    const cmp = mount(<Skeleton title={false} />);
    expect(findParagraph(cmp).length).toBe(3);
  });

  it('paragraph: {undefined} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={undefined} />);
    expect(findParagraph(cmp).length).toBe(4);
  });

  it('paragraph: {null} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={null} />);
    expect(findParagraph(cmp).length).toBe(4);
  });

  it('paragraph: {[]} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={[]} />);
    expect(findParagraph(cmp).length).toBe(4);
  });

  it('paragraph: {0} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={0} />);
    expect(findParagraph(cmp).length).toBe(4);
  });

  it('paragraph: {{}} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={{}} />);
    expect(findParagraph(cmp).length).toBe(4);
  });

  it('paragraph: {{a:1}} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={{ a: 1 }} />);
    expect(findParagraph(cmp).length).toBe(4);
  });

  it('paragraph: {{rows:1}} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={{ rows: 1 }} />);
    expect(findParagraph(cmp).length).toBe(2);
  });

  it('paragraph: {{rows:0}} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={{ rows: 0 }} />);
    expect(findParagraph(cmp).length).toBe(1);
  });

  it('paragraph: {{rows:ccc}} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={{ rows: 'ccc' }} />);
    expect(findParagraph(cmp).length).toBe(4);
  });

  it('paragraph: {{rows:undefined}} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={{ rows: undefined }} />);
    expect(findParagraph(cmp).length).toBe(4);
  });

  it('paragraph: {{rows:null}} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={{ rows: null }} />);
    expect(findParagraph(cmp).length).toBe(4);
  });

  it('paragraph: {{rows:[]}} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={{ rows: [] }} />);
    expect(findParagraph(cmp).length).toBe(4);
  });

  it('paragraph: {{rows:{}}} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={{ rows: {} }} />);
    expect(findParagraph(cmp).length).toBe(4);
  });

  it('isLastItem', () => {
    expect(InnerSkeleton.prototype.isLastItem(5, 2)).toBeFalsy();
    expect(InnerSkeleton.prototype.isLastItem(3, 2)).toBeTruthy();
    expect(InnerSkeleton.prototype.isLastItem(0, 0)).toBeFalsy();
  });

  function findParagraph(cmp: Object) {
    return cmp.find('ParagraphItem');
  }
});
