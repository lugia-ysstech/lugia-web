/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';
import './style/lugia-pagination.css';
import type { PaginationProps, PaginationState } from '../css/pagination';
import Select from 'rc-select';

export default class extends React.Component<PaginationProps, PaginationState> {
  static displayName = 'Pagination';

  render() {
    const { total = 1 } = this.props;
    return <RcPagination {...this.props} total={total} selectComponentClass={Select} />;
  }
}
