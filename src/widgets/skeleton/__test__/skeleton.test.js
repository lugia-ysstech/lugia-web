/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Skeleton from '../skeleton';
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
    expect(Skeleton.prototype.isLastItem(5, 2)).toBeFalsy();
    expect(Skeleton.prototype.isLastItem(3, 2)).toBeTruthy();
    expect(Skeleton.prototype.isLastItem(0, 0)).toBeFalsy();
  });

  it('getParagraphWidth', () => {
    expect(Skeleton.prototype.getParagraphWidth('500', 3)).toEqual({ 2: '500' });
    expect(Skeleton.prototype.getParagraphWidth(500, 3)).toEqual({ 2: 500 });
    expect(Skeleton.prototype.getParagraphWidth(undefined, 3)).toEqual({ 2: undefined });
    expect(Skeleton.prototype.getParagraphWidth(null, 3)).toEqual({ 2: null });
    expect(Skeleton.prototype.getParagraphWidth('', 3)).toEqual({ 2: '' });
    expect(Skeleton.prototype.getParagraphWidth({}, 3)).toEqual({ 2: {} });
    expect(Skeleton.prototype.getParagraphWidth([], 3)).toEqual({ 2: [] });

    expect(Skeleton.prototype.getParagraphWidth([200], 3)).toEqual([200]);
    expect(Skeleton.prototype.getParagraphWidth(['200', '300'], 3)).toEqual(['200', '300']);
    expect(Skeleton.prototype.getParagraphWidth(['200', '300', '400'], 3)).toEqual([
      '200',
      '300',
      '400',
    ]);
  });

  it('getParagraphCount', () => {
    expect(Skeleton.prototype.getParagraphCount(true)).toEqual(3);
    expect(Skeleton.prototype.getParagraphCount(false)).toEqual(3);
    expect(Skeleton.prototype.getParagraphCount(null)).toEqual(3);
    expect(Skeleton.prototype.getParagraphCount(undefined)).toEqual(3);
    expect(Skeleton.prototype.getParagraphCount('')).toEqual(3);
    expect(Skeleton.prototype.getParagraphCount([])).toEqual(3);
    expect(Skeleton.prototype.getParagraphCount({})).toEqual(3);
    expect(Skeleton.prototype.getParagraphCount('a')).toEqual(3);
    expect(Skeleton.prototype.getParagraphCount(5)).toEqual(3);
    expect(Skeleton.prototype.getParagraphCount('5')).toEqual(3);

    expect(Skeleton.prototype.getParagraphCount({ rows: 5 })).toEqual(5);
    expect(Skeleton.prototype.getParagraphCount({ rows: '5' })).toEqual(5);
    expect(Skeleton.prototype.getParagraphCount({ rows: 0 })).toEqual(0);
    expect(Skeleton.prototype.getParagraphCount({ rows: 'a' })).toEqual(3);
    expect(Skeleton.prototype.getParagraphCount({ rows: null })).toEqual(3);
    expect(Skeleton.prototype.getParagraphCount({ rows: undefined })).toEqual(3);
    expect(Skeleton.prototype.getParagraphCount({ rows: '' })).toEqual(3);
  });

  function findParagraph(cmp: Object) {
    return cmp.find('ParagraphItem');
  }
});
