import * as React from 'react';
import Alert from '../index';

export default class AlertDemo extends React.Component {
  render() {
    return (
      <div>
        <Alert message="Alert-info" closable />
        <br />
        <Alert type="success" message="Alert-success" closable />
      </div>
    );
  }
}
