import * as React from 'react';
import Affix from '../index';
import Button from '../../button';

export default class BasicDemo extends React.Component {
  render() {
    return (
      <div>
        <div
          style={{ width: '200px', height: '200px', overflowY: 'scroll' }}
          ref={node => (this.EleRef = node)}
        >
          <div style={{ height: '400px' }}>
            <div style={{ width: '20px', height: '100px' }} />
            <Affix offsetTop={20} target={() => this.EleRef}>
              <Button type="primary">target top</Button>
            </Affix>
          </div>
        </div>
      </div>
    );
  }
}
