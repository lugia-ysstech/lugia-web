/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Tag from '../';
import Widget from '../../consts/index';
import Theme from '../../theme';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const config = {
  [Widget.Tag]: {
    color: 'ff5588',
  },
};

describe('Tag', () => {
  it('default: type = basic', () => {
    const target = renderer.create(<Tag type={'basic'} />).toJSON();
    expect(target).toMatchSnapshot();
  });

  it('default: type = basic, shape = round', () => {
    const target = renderer.create(<Tag type={'basic'} shape={'round'} />).toJSON();
    expect(target).toMatchSnapshot();
  });

  it('Theme: type= basic, shape= round', () => {
    const target = renderer
      .create(
        <Theme config={config}>
          <Tag type={'basic'} shape={'round'} />
        </Theme>
      )
      .toJSON();
    expect(target).toMatchSnapshot();
  });

  it('Theme: type= basic, closable=false shape= round', () => {
    const target = renderer
      .create(
        <Theme config={config}>
          <Tag type={'basic'} closable={false} shape={'round'} />
        </Theme>
      )
      .toJSON();
    expect(target).toMatchSnapshot();
  });

  it('default: type = customs', () => {
    const target = renderer.create(<Tag type={'customs'} />).toJSON();
    expect(target).toMatchSnapshot();
  });

  it('default: type = customs, shape = round', () => {
    const target = renderer.create(<Tag type={'customs'} shape={'round'} />).toJSON();
    expect(target).toMatchSnapshot();
  });

  it('Theme: type= customs, shape= round', () => {
    const target = renderer
      .create(
        <Theme config={config}>
          <Tag type={'customs'} shape={'round'} />
        </Theme>
      )
      .toJSON();
    expect(target).toMatchSnapshot();
  });

  it('Theme: type= customs, closable=false shape= round', () => {
    const target = renderer
      .create(
        <Theme config={config}>
          <Tag type={'customs'} closable={false} shape={'round'} />
        </Theme>
      )
      .toJSON();
    expect(target).toMatchSnapshot();
  });

  it('default: type = primary', () => {
    const target = renderer.create(<Tag type={'primary'} />).toJSON();
    expect(target).toMatchSnapshot();
  });

  it('default: type = primary, shape = round', () => {
    const target = renderer.create(<Tag type={'primary'} shape={'round'} />).toJSON();
    expect(target).toMatchSnapshot();
  });

  it('Theme: type= primary, shape= round', () => {
    const target = renderer
      .create(
        <Theme config={config}>
          <Tag type={'primary'} shape={'round'} />
        </Theme>
      )
      .toJSON();
    expect(target).toMatchSnapshot();
  });

  it('Theme: type= primary, closable=false shape= round', () => {
    const target = renderer
      .create(
        <Theme config={config}>
          <Tag type={'primary'} closable={false} shape={'round'} />
        </Theme>
      )
      .toJSON();
    expect(target).toMatchSnapshot();
  });

  it('default: type = presets', () => {
    const target = renderer.create(<Tag type={'presets'} />).toJSON();
    expect(target).toMatchSnapshot();
  });

  it('default: type = presets, shape = round', () => {
    const target = renderer.create(<Tag type={'presets'} shape={'round'} />).toJSON();
    expect(target).toMatchSnapshot();
  });

  it('Theme: type= presets, shape= round', () => {
    const target = renderer
      .create(
        <Theme config={config}>
          <Tag type={'presets'} shape={'round'} />
        </Theme>
      )
      .toJSON();
    expect(target).toMatchSnapshot();
  });

  it('Theme: type= presets, closable=false shape= round', () => {
    const target = renderer
      .create(
        <Theme config={config}>
          <Tag type={'presets'} closable={false} shape={'round'} />
        </Theme>
      )
      .toJSON();
    expect(target).toMatchSnapshot();
  });

  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push(i);
  }
});
