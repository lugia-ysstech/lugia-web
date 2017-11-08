//@flow

import * as React from 'react';
import Menu from '../';
import 'jest-styled-components';

import Enzyme, { mount, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Scroller from '../index';

Enzyme.configure({ adapter: new Adapter(), });


describe('Menu', () => {


  it('HasScroller', () => {

    const config = {
      type: 'x',
      viewSize: 100,
      totalSize: 200,
      left: 100,
      value: 0,
      onChange: (...rest) => {
      },
    };
    mount(<div>
      <Scroller {...config} type="y"/>
    </div>);
  });
});
