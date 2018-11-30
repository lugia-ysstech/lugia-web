/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Skeleton from '../index';
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

  it('paragraph: {false} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={false} />);
    expect(findParagraph(cmp).length).toBe(1);
  });

  it('paragraph: {true} ,return how many paragraph', () => {
    const cmp = mount(<Skeleton paragraph={true} />);
    expect(findParagraph(cmp).length).toBe(4);
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

  // it('titleWidth: 100 ,return how many paragraph', () => {
  //   const cmp = mount(<Skeleton titleWidth={100} />);
  //   expect(findParagraph(cmp).length).toBe(4);
  //   expect(findTitle).toBe(100);
  // });

  function findParagraph(cmp: Object) {
    return cmp.find('ParagraphItem');
  }

  function findTitle(cmp: Object) {
    return findParagraph(cmp)[0].props();
  }
});
