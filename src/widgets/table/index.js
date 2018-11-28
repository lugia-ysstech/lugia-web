/**
 *
 * create by guorg
 *
 * @flow
 */
import Table from './table';
import RcTable from 'rc-table';

const { ColumnGroup, Column } = RcTable;

Table.ColumnGroup = ColumnGroup;
Table.Column = Column;

export default Table;
