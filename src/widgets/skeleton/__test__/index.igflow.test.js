import Skeleton from '../skeleton';
import 'jest-styled-components';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Skeleton', () => {
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
