//@flow

import * as React from 'react';
import Menu from '../';
import 'jest-styled-components';
import renderer from 'react-test-renderer';

import Enzyme, {  render, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ThrottleScroller from '../ThrottleScroller';

Enzyme.configure({ adapter: new Adapter(), });


describe('Menu', () => {


  it('HasScroller', () => {

    const ThrottleScrollerWraper = ThrottleScroller(() => {
      return <div>hello</div>;
    }, 50);
    expect(render(<ThrottleScrollerWraper data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,]}/>).html()
    ).toMatchSnapshot();
  });
});
