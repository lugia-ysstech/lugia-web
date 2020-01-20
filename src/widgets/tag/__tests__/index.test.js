/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import chai from 'chai';
import Tag from '../';
import Widget from '../../consts/index';
import Theme from '../../theme';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { delay } from '@lugia/react-test-utils';
Enzyme.configure({ adapter: new Adapter() });

const { expect: exp } = chai;

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
  class TagDemo extends React.Component<any, any> {
    constructor(props) {
      super(props);
      this.state = { data };
    }
    render() {
      return this.getTag();
    }

    getTag = () => {
      const { data } = this.state;
      return data.map((item, index) => {
        return (
          <Tag key={item} onClose={this.onClose.bind(this, item)} closable>
            {item}
          </Tag>
        );
      });
    };

    onClose(item, e) {
      const { data } = this.state;
      const index = data.indexOf(item);
      data.splice(index, 1);
      this.setState({ data });
    }
  }

  it('click and close', async () => {
    const cmp = mount(<TagDemo />);
    expect(findCloseButton(cmp).length).toEqual(10);
    clickCloseButton(cmp, 1);
    await delay(500);
    cmp.update();
    expect(findCloseButton(cmp).length).toEqual(10);
  });

  function findCloseButton(cmp: Object) {
    return cmp.find('CloseButtonWrap');
  }

  function clickCloseButton(cmp: Object, index: number) {
    findCloseButton(cmp)
      .at(index)
      .simulate('click');
  }
});
