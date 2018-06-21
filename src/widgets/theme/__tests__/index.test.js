//@flow

import * as React from 'react';
import chai from 'chai';
import Theme from '../';

import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';

const { expect: exp } = chai;

describe('Theme', () => {
  it('Theme', () => {
    class TestComponent extends React.Component<any> {
      render() {
        return (
          <div>
            {JSON.stringify(this.context.config)}
            {this.props.children}
          </div>
        );
      }
    }

    TestComponent.contextTypes = {
      config: PropTypes.object,
    };
    const config = { ligx: { value: '正念' } };
    const cmp = renderer.create(
      <Theme config={config}>
        <TestComponent>hello everyone</TestComponent>
      </Theme>
    );
    expect(cmp).toMatchSnapshot();
  });
});
