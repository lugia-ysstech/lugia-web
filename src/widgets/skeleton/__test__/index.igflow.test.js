import Skeleton from '../skeleton';
import 'jest-styled-components';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Skeleton', () => {
  // 错误用例
  // it('getParagraphWidth', () => {
  //   expect(Skeleton.prototype.getParagraphWidth('500', 3)).toEqual({ 2: '500' });
  //   expect(Skeleton.prototype.getParagraphWidth(500, 3)).toEqual({ 2: 500 });
  //   expect(Skeleton.prototype.getParagraphWidth(undefined, 3)).toEqual({ 2: undefined });
  //   expect(Skeleton.prototype.getParagraphWidth(null, 3)).toEqual({ 2: null });
  //   expect(Skeleton.prototype.getParagraphWidth('', 3)).toEqual({ 2: '' });
  //   expect(Skeleton.prototype.getParagraphWidth({}, 3)).toEqual({ 2: {} });
  //   expect(Skeleton.prototype.getParagraphWidth([], 3)).toEqual({ 2: [] });

  //   expect(Skeleton.prototype.getParagraphWidth([200], 3)).toEqual([200]);
  //   expect(Skeleton.prototype.getParagraphWidth(['200', '300'], 3)).toEqual(['200', '300']);
  //   expect(Skeleton.prototype.getParagraphWidth(['200', '300', '400'], 3)).toEqual([
  //     '200',
  //     '300',
  //     '400',
  //   ]);
  // });

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
});
