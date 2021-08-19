import React from 'react';
import Pagination from '../index';

export default class PaginationDemo extends React.Component {
  onChange = pageNumber => {
    console.log(pageNumber);
  };
  render() {
    return <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange} />;
  }
}
