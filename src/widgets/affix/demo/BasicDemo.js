import * as React from 'react';
import Affix from '../index';
import Button from '../../button';

export default class BasicDemo extends React.Component {
  render() {
    return (
      <div>
        <Affix offsetTop={20}>
          <Button type="primary">Affix top</Button>
        </Affix>
        <br />
        <Affix offsetBottom={20}>
          <Button type="primary">Affix bottom</Button>
        </Affix>
      </div>
    );
  }
}
