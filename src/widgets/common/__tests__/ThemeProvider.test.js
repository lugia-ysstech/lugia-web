//@flow

import * as React from 'react';
import chai from 'chai';
import ThemeProvider from '../ThemeProvider';
import Theme from '../../theme/index';

import renderer from 'react-test-renderer';

const { expect: exp, } = chai;

describe('ThemeProvider', () => {

  it('ThemeProvider', () => {

    const TestComponent = ThemeProvider(class  extends React.Component<any> {
      render () {
        return <div>{JSON.stringify(this.props.getTheme())}{this.props.children}</div>;
      }
    }, 'ligx');

    const config = { ligx: { value: '正念', }, };
    const cmp = renderer.create(<Theme config={config}><TestComponent>hello everyone</TestComponent></Theme>);
    expect(cmp).toMatchSnapshot();
  });


});
