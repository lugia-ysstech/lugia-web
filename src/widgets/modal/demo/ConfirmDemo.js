import React from 'react';
import Modal from '../index';
import Button from '../../button/index';

export default class ModalDemo extends React.Component {
  render() {
    return (
      <Button onClick={() => Modal.confirm({ title: 'confirm', content: 'this is confirm text!' })}>
        confirm
      </Button>
    );
  }
}
