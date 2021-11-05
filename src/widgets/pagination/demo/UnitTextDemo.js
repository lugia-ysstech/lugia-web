import React from 'react';
import Pagination from '../index';

export default class PaginationDemo extends React.Component {
  render() {
    return (
      <Pagination
        paginationUnitText={'组/页'}
        defaultCurrent={5}
        total={100}
        blockList={['Page', 'PageSize']}
      />
    );
  }
}
