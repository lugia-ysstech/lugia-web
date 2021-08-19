import React from 'react';
import Pagination from '../index';

export default class PaginationDemo extends React.Component {
  render() {
    return <Pagination simple defaultCurrent={2} total={50} />;
  }
}
