import React from 'react';
import Pagination from '../index';

export default class PaginationDemo extends React.Component {
  render() {
    return (
      <Pagination defaultCurrent={5} total={100} totalText={'共计100组数据'} showTotalData={true} />
    );
  }
}
