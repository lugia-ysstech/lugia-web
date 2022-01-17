/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import classNames from 'classnames';
import Table from './index';
import Theme from '../theme';
import Widget from '../consts/index';
import Input from '../input';
import Button from '../button';
import sortData from './data.json';
import virtualData from './mockBigData_100000.json';
import column, { mockVirtualColumns } from './demoColumns';
import Icon from '../icon';

const { ColumnGroup, Column } = Table;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // width: 100,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    // width: 200,
    key: 'address',
  },
  {
    title: 'Operations',
    dataIndex: '',
    // width: 100,
    key: 'operations',
    render: () => <a href="#">Delete</a>,
  },
];
const fixColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // width: 100,
    fixed: 'left',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    // width: 200,
    key: 'address',
  },
  {
    title: 'Operations',
    dataIndex: '',
    // width: 100,
    key: 'operations',
    render: () => <a href="#">Delete</a>,
    fixed: 'right',
  },
];
const sortColumns = [
  {
    title: <div style={{ textAlign: 'left' }}>name</div>,
    dataIndex: 'name',
    key: 'name',
    // width: 100,
  },
  {
    title: <div style={{ textAlign: 'center' }}>age</div>,
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
    align: 'right',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    // width: 200,
    key: 'address',
  },
  {
    title: 'Operations',
    dataIndex: '',
    // width: 100,
    key: 'operations',
    render: () => <a href="#">Delete</a>,
  },
];

const data = [
  { name: 'Jack', age: 28, address: 'some where', key: '1' },
  { name: 'Rose', age: 36, address: 'some where', key: '2' },
  { name: 'Rook', age: 22, address: 'some where', key: '3' },
  { name: 'Lise', age: 33, address: 'some where', key: '4' },
  { name: 'Lise', age: 33, address: 'some where', key: '5' },
  { name: 'Lise', age: 33, address: 'some where', key: '6' },
  { name: 'Lise', age: 33, address: 'some where', key: '7' },
  { name: 'asdasda', age: 33, address: 'some where', key: '8' },
  { name: 'asdasda', age: 33, address: 'some where', key: '9' },
  { name: 'asdasda', age: 33, address: 'some where', key: '10' },
];
const columnsStyle = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    style: {
      background: '#e98010',
      fontSize: '10px',
      color: 'white',
      fontStyle: 'italic',
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
    style: {
      background: '#e91055',
      fontSize: '10px',
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
  {
    title: 'Operations',
    dataIndex: '',
    key: 'operations',
  },
];
const dataStyle = [
  { name: 'Jack', age: 28, address: 'some where', key: '1' },
  { name: 'Rose', age: 36, address: 'some where', key: '2' },
  { name: 'Uzi', age: 36, address: 'some where', key: '3' },
  { name: 'ClearLove', age: 36, address: 'some where', key: '4' },
  { name: 'Rookie', age: 36, address: 'some where', key: '5' },
  { name: 'TheShy', age: 36, address: 'some where', key: '6' },
];

const treeColumnsStyle = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
    style: {
      background: '#10e992',
      marginLeft: '10px',
    },
    width: '12%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    style: {
      background: '#e9a110',
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
const treeData = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
const childrenData = [
  {
    key: 10000,
    id: 10000,
    parentId: -1,
    icon: 'lugia-icon-financial_editor',
    name: '系统管理系统管理系统管理系统管理系统管理系统管理系统管理',
    spread: false,
    path: '/systemManage',
    keepAlive: '0',
    permission: '',
    type: '0',
    label: '系统管理',
    sort: 9999,
    isShowMenu: true,
  },
  {
    key: 20000,
    id: 20000,
    parentId: -1,
    hasChildren: true,
    children: [
      {
        key: 21000,
        id: 21000,
        parentId: 20000,
        hasChildren: true,
        children: [
          {
            key: 21010,
            id: 21010,
            parentId: 21000,
            hasChildren: true,
            children: [
              {
                key: 21020,
                id: 21020,
                parentId: 21010,
                hasChildren: false,
                children: [],
                icon: 'icon-yonghuguanli',
                name: '命名分类新增命名分类新增命名分类新增',
                spread: false,
                path: '/dataStandard/standardTypeEdit',
                keepAlive: '0',
                permission: '',
                type: '1',
                label: '命名分类新增',
                sort: 2,
                isShowMenu: false,
              },
              {
                key: 21040,
                id: 21040,
                parentId: 21010,
                hasChildren: false,
                children: [],
                icon: 'icon-yonghuguanli',
                name: '命名分类编辑',
                spread: false,
                path: '/dataStandard/standardNameEdit',
                keepAlive: '0',
                permission: '',
                type: '1',
                label: '命名分类编辑',
                sort: 4,
                isShowMenu: false,
              },
            ],
            icon: 'lugia-icon-financial_editor',
            name: '命名分类',
            spread: false,
            path: '/dataStandard/standardType',
            keepAlive: '0',
            permission: '',
            type: '0',
            label: '命名分类',
            sort: 1,
            isShowMenu: true,
          },
          {
            key: 21030,
            id: 21030,
            parentId: 21000,
            hasChildren: true,
            children: [],
            icon: 'lugia-icon-financial_editor',
            name: '数据命名',
            spread: false,
            path: '/dataStandard/standardName',
            keepAlive: '0',
            permission: '',
            type: '0',
            label: '数据命名',
            sort: 3,
            isShowMenu: true,
          },
        ],
        icon: 'lugia-icon-financial_editor',
        name: '命名标准',
        spread: false,
        path: '/',
        keepAlive: '0',
        permission: '',
        type: '0',
        label: '命名标准',
        sort: 1,
        isShowMenu: true,
      },
      {
        key: 22000,
        id: 22000,
        parentId: 20000,
        hasChildren: true,
        children: [
          {
            key: 22010,
            id: 22010,
            parentId: 22000,
            hasChildren: true,
            children: [
              {
                key: 22020,
                id: 22020,
                parentId: 22010,
                hasChildren: false,
                children: [],
                icon: 'icon-yonghuguanli',
                name: '数据字典编辑',
                spread: false,
                path: '/dataStandard/dicttypeEdit',
                keepAlive: '0',
                permission: '',
                type: '1',
                label: '数据字典编辑',
                sort: 2,
                isShowMenu: false,
              },
            ],
            icon: 'lugia-icon-financial_editor',
            name: '数据字典',
            spread: false,
            path: '/dataStandard/dicttype',
            keepAlive: '0',
            permission: '',
            type: '0',
            label: '数据字典',
            sort: 1,
            isShowMenu: true,
          },
          {
            key: 22030,
            id: 22030,
            parentId: 22000,
            hasChildren: true,
            children: [
              {
                key: 22040,
                id: 22040,
                parentId: 22030,
                hasChildren: false,
                children: [],
                icon: 'icon-yonghuguanli',
                name: '数据字典项编辑',
                spread: false,
                path: '/dataStandard/dictoptionsEdit',
                keepAlive: '0',
                permission: '',
                type: '1',
                label: '数据字典项编辑',
                sort: 4,
                isShowMenu: false,
              },
            ],
            icon: 'lugia-icon-financial_editor',
            name: '数据字典项',
            spread: false,
            path: '/dataStandard/dictoptions',
            keepAlive: '0',
            permission: '',
            type: '0',
            label: '数据字典项',
            sort: 3,
            isShowMenu: true,
          },
        ],
        icon: 'lugia-icon-financial_editor',
        name: '数据代码',
        spread: false,
        path: '/dataCode',
        keepAlive: '0',
        permission: '',
        type: '0',
        label: '数据代码',
        sort: 2,
        isShowMenu: true,
      },
      {
        key: 23000,
        id: 23000,
        parentId: 20000,
        hasChildren: true,
        children: [
          {
            key: 23010,
            id: 23010,
            parentId: 23000,
            hasChildren: true,
            children: [
              {
                key: 23020,
                id: 23020,
                parentId: 23010,
                hasChildren: false,
                children: [],
                icon: 'icon-yonghuguanli',
                name: '文档类型编辑',
                spread: false,
                path: '/dataStandard/docTypeAddOrEdit',
                keepAlive: '0',
                permission: '',
                type: '1',
                label: '文档类型编辑',
                sort: 2,
                isShowMenu: false,
              },
            ],
            icon: 'lugia-icon-financial_editor',
            name: '文档类型',
            spread: false,
            path: '/dataStandard/docType',
            keepAlive: '0',
            permission: '',
            type: '0',
            label: '文档类型',
            sort: 1,
            isShowMenu: true,
          },
          {
            key: 23030,
            id: 23030,
            parentId: 23000,
            hasChildren: true,
            children: [
              {
                key: 23040,
                id: 23040,
                parentId: 23030,
                hasChildren: false,
                children: [],
                icon: 'icon-yonghuguanli',
                name: '文档信息编辑',
                spread: false,
                path: '/dataStandard/docInfoAddOrEdit',
                keepAlive: '0',
                permission: '',
                type: '1',
                label: '文档信息编辑',
                sort: 4,
                isShowMenu: false,
              },
            ],
            icon: 'lugia-icon-financial_editor',
            name: '文档信息',
            spread: false,
            path: '/dataStandard/docInfo',
            keepAlive: '0',
            permission: '',
            type: '0',
            label: '文档信息',
            sort: 3,
            isShowMenu: true,
          },
        ],
        icon: 'lugia-icon-financial_editor',
        name: '标准文档',
        spread: false,
        path: '/standardDoc',
        keepAlive: '0',
        permission: '',
        type: '0',
        label: '标准文档',
        sort: 3,
        isShowMenu: true,
      },
      {
        key: 24000,
        id: 24000,
        parentId: 20000,
        hasChildren: true,
        children: [
          {
            key: 24020,
            id: 24020,
            parentId: 24000,
            hasChildren: false,
            children: [],
            icon: 'icon-yonghuguanli',
            name: '业务术语编辑',
            spread: false,
            path: '/dataStandard/bizTermAddOrEdit',
            keepAlive: '0',
            permission: '',
            type: '1',
            label: '业务术语编辑',
            sort: 2,
            isShowMenu: false,
          },
        ],
        icon: 'lugia-icon-financial_editor',
        name: '业务术语',
        spread: false,
        path: '/dataStandard/bizTerm',
        keepAlive: '0',
        permission: '',
        type: '0',
        label: '业务术语',
        sort: 4,
        isShowMenu: true,
      },
    ],
    icon: 'lugia-icon-financial_editor',
    name: '数据标准',
    spread: false,
    path: '/datastandard',
    keepAlive: '0',
    permission: '',
    type: '0',
    label: '数据标准',
    sort: 1,
    isShowMenu: true,
  },
  {
    key: 30000,
    id: 30000,
    parentId: -1,
    hasChildren: true,
    children: [
      {
        key: 31000,
        id: 31000,
        parentId: 30000,
        hasChildren: true,
        children: [
          {
            key: 31010,
            id: 31010,
            parentId: 31000,
            hasChildren: false,
            children: [],
            icon: 'lugia-icon-financial_editor',
            name: '校验规则编辑',
            spread: false,
            path: '/dataQuality/validateRuleEdit',
            keepAlive: '0',
            permission: '',
            type: '1',
            label: '校验规则编辑',
            sort: 1,
            isShowMenu: false,
          },
        ],
        icon: 'lugia-icon-financial_editor',
        name: '校验规则',
        spread: false,
        path: '/dataQuality/validateRule',
        keepAlive: '0',
        permission: '',
        type: '0',
        label: '校验规则',
        sort: 1,
        isShowMenu: true,
      },
      {
        key: 32000,
        id: 32000,
        parentId: 30000,
        hasChildren: true,
        children: [
          {
            key: 32010,
            id: 32010,
            parentId: 32000,
            hasChildren: false,
            children: [],
            icon: 'lugia-icon-financial_editor',
            name: '模板校验编辑',
            spread: false,
            path: '/dataQuality/validateTempEdit',
            keepAlive: '0',
            permission: '',
            type: '1',
            label: '模板校验编辑',
            sort: 1,
            isShowMenu: false,
          },
        ],
        icon: 'lugia-icon-financial_editor',
        name: '校验模板',
        spread: false,
        path: '/dataQuality/validateTemp',
        keepAlive: '0',
        permission: '',
        type: '0',
        label: '校验模板',
        sort: 2,
        isShowMenu: true,
      },
      {
        key: 33000,
        id: 33000,
        parentId: 30000,
        hasChildren: true,
        children: [
          {
            key: 33100,
            id: 33100,
            parentId: 33000,
            hasChildren: true,
            children: [
              {
                key: 33110,
                id: 33110,
                parentId: 33100,
                hasChildren: false,
                children: [],
                icon: 'lugia-icon-financial_editor',
                name: '校验结果明细',
                spread: false,
                path: '/dataQuality/reportResult',
                keepAlive: '0',
                permission: '',
                type: '1',
                label: '校验结果明细',
                sort: 1,
                isShowMenu: false,
              },
            ],
            icon: 'lugia-icon-financial_editor',
            name: '质量报告明细',
            spread: false,
            path: '/dataQuality/qualityReport',
            keepAlive: '0',
            permission: '',
            type: '1',
            label: '质量报告明细',
            sort: 1,
            isShowMenu: false,
          },
        ],
        icon: 'lugia-icon-financial_editor',
        name: '质量报告',
        spread: false,
        path: '/dataQuality/qualityReports',
        keepAlive: '0',
        permission: '',
        type: '0',
        label: '质量报告',
        sort: 3,
        isShowMenu: true,
      },
    ],
    icon: 'lugia-icon-financial_editor',
    name: '数据质量',
    spread: false,
    path: '/dataQuality',
    keepAlive: '0',
    permission: '',
    type: '0',
    label: '数据质量',
    sort: 11,
    isShowMenu: true,
  },
];

const treeTable = [
  {
    batch_date: '2020-04-23',
    batch_seq_no: '001',
    batch_type: 'TABLE',
    src_sys_cd: 'SAKILA',
    table_id: 'SAKILA.SAKILA.ADDRESS',
    src_tbl_en_name: 'ADDRESS',
    src_tbl_type_cd: '0',
    optdate: '2020-04-23T16:00:00.000+0000',
    ext_start_date: null,
    extract_status: '9',
    row_count: 0,
    ext_time: '',
    ext_start_time: '',
    del_flag: '0',
  },
  {
    batch_date: '2020-04-23',
    batch_seq_no: '001',
    batch_type: 'TABLE',
    src_sys_cd: 'SAKILA',
    table_id: 'SAKILA.SAKILA.CATEGORY',
    src_tbl_en_name: 'CATEGORY',
    src_tbl_type_cd: '0',
    optdate: '2020-04-23T16:00:00.000+0000',
    ext_start_date: null,
    extract_status: '9',
    row_count: 0,
    ext_time: '',
    ext_start_time: '',
    del_flag: '0',
  },
  {
    batch_date: '2020-04-23',
    batch_seq_no: '001',
    batch_type: 'TABLE',
    src_sys_cd: 'SAKILA',
    table_id: 'SAKILA.SAKILA.CITY',
    src_tbl_en_name: 'CITY',
    src_tbl_type_cd: '0',
    optdate: '2020-04-23T16:00:00.000+0000',
    ext_start_date: null,
    extract_status: '9',
    row_count: 0,
    ext_time: '',
    ext_start_time: '',
    del_flag: '0',
  },
  {
    batch_date: '2020-04-23',
    batch_seq_no: '001',
    batch_type: 'TABLE',
    src_sys_cd: 'SAKILA',
    table_id: 'SAKILA.SAKILA.COUNTRY',
    src_tbl_en_name: 'COUNTRY',
    src_tbl_type_cd: '0',
    optdate: '2020-04-23T16:00:00.000+0000',
    ext_start_date: null,
    extract_status: '9',
    row_count: 0,
    ext_time: '',
    ext_start_time: '',
    del_flag: '0',
  },
  {
    batch_date: '2020-04-23',
    batch_seq_no: '001',
    batch_type: 'TABLE',
    src_sys_cd: 'SAKILA',
    table_id: 'SAKILA.SAKILA.CUSTOMER',
    src_tbl_en_name: 'CUSTOMER',
    src_tbl_type_cd: '0',
    optdate: '2020-04-23T16:00:00.000+0000',
    ext_start_date: null,
    extract_status: '9',
    row_count: 0,
    ext_time: '',
    ext_start_time: '',
    del_flag: '0',
  },
];

const Data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const treeColumns = [
  {
    title: '系统标识',
    dataIndex: 'src_sys_cd',
    key: 'src_sys_cd',
  },
  {
    title: '批次号',
    dataIndex: 'batch_seq_no',
    key: 'batch_seq_no',
  },
  {
    title: '抽取状态',
    dataIndex: 'extract_status',
    key: 'extract_status',
  },
  {
    title: '系统名称',
    dataIndex: 'src_sys_cn_name',
    key: 'src_sys_cn_name',
  },
  {
    title: '批次日期',
    dataIndex: 'batch_date',
    key: 'batch_date',
  },
];

const columnsDom = [
  { title: '表格标题', dataIndex: 'title', key: 'title', width: 200, align: 'center', mark: 1 },
  {
    title: '编辑表头数据',
    dataIndex: 'columns',
    key: 'columns',
    width: 200,
    align: 'center',
    mark: 2,
    columns: [
      { title: '列名(英文)', dataIndex: 'key', key: 'key', width: 200, mark: 1 },
      { title: '列名显示文本', dataIndex: 'title', key: 'title', width: 200, mark: 2 },
    ],
  },
  {
    title: '编辑表体数据',
    dataIndex: 'data',
    key: 'data',
    width: 200,
    align: 'center',
    mark: 3,
  },
];

const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    key: 'num',
    align: 'left',
    ellipsis: 'true',
    width: '160',
  },
  {
    title: '日期',
    dataIndex: 'co',
    key: 'co',
    align: 'left',
    ellipsis: 'true',
    width: '160',
  },
  {
    title: '总资产净值',
    dataIndex: 'co1',
    key: 'co1',
    align: 'left',
    ellipsis: 'true',
    width: '160',
  },
  {
    title: '总资产比例(%)',
    dataIndex: 'co2',
    key: 'co2',
    align: 'left',
    ellipsis: 'true',
    width: '160',
  },
  {
    title: '总资产收益额',
    dataIndex: 'co3',
    key: 'co3',
    align: 'left',
    ellipsis: 'true',
    width: '160',
  },
  {
    title: '总资产收益率(%)',
    dataIndex: 'co4',
    key: 'co4',
    align: 'left',
    ellipsis: 'true',
    width: '160',
  },
];

const data2 = [
  {
    co1: '2665453256421.11',
    co3: '33131313135454.45',
    num: '1',
    co2: '100.00',
    co4: '393',
    co: '20180101',
  },
  {
    co1: '2665453256421.12',
    co3: '33131313135454.45',
    num: '2',
    co2: '100.00',
    co4: '839',
    co: '20180102',
  },
  {
    co1: '2665453256421.13',
    co3: '33131313135454.35',
    num: '3',
    co2: '100.00',
    co4: '482',
    co: '20180103',
  },
  {
    co1: '2665453256421.14',
    co3: '33131313135454.35',
    num: '4',
    co2: '100.00',
    co4: '493',
    co: '20180104',
  },
  {
    co1: '100266521.21',
    co3: '33131313135454.34',
    num: '5',
    co2: '20.00',
    co4: '282',
    co: '20180105',
  },
  {
    co1: '2002421.21',
    co3: '4231313135454.34',
    num: '6',
    co2: '14.21',
    co4: '493',
    co: '20180106',
  },
  {
    co1: '2665453256421.21',
    co3: '331315454.34',
    num: '7',
    co2: '45.01',
    co4: '282',
    co: '20180107',
  },
  {
    co1: '1003256421.21',
    co3: '1013135454.34',
    num: '8',
    co2: '45.02',
    co4: '933',
    co: '20180108',
  },
  {
    co1: '2665450421.21',
    co3: '135454.34',
    num: '9',
    co2: '100.00',
    co4: '383',
    co: '20180109',
  },
  {
    co1: '2665453256421.22',
    co3: '33131313135454.34',
    num: '10',
    co2: '100.00',
    co4: '282',
    co: '20180110',
  },
  {
    co1: '2665453256421.22',
    co3: '33131313135454.34',
    num: '11',
    co2: '100.00',
    co4: '483',
    co: '20180111',
  },
  {
    co1: '2665453256421.22',
    co3: '33131313135454.34',
    num: '12',
    co2: '100.00',
    co4: '484',
    co: '20180112',
  },
  {
    co1: '2665453256421.22',
    co3: '33131313135454.34',
    num: '13',
    co2: '100.00',
    co4: '238',
    co: '20180113',
  },
  {
    co1: '2665453256421.14',
    co3: '33131313135454.35',
    num: '4',
    co2: '100.00',
    co4: '493',
    co: '20180104',
  },
  {
    co1: '2665453256421.14',
    co3: '33131313135454.35',
    num: '15',
    co2: '100.00',
    co4: '273',
    co: '20180104',
  },
];

function SortDemo() {
  const rowSorter = (column, sortType) => {
    const newColumn = column;
    const dataIndex = column.dataIndex;
    if (sortType) {
      newColumn.sorter =
        sortType === 'string'
          ? (a, b) => a[dataIndex].localeCompare(b[dataIndex])
          : (a, b) => a[dataIndex] - b[dataIndex];
    }
    return newColumn;
  };

  const newColumn = column.map(item => {
    const { titleAlign, sortType } = item;
    if (titleAlign) {
      item.title = <div style={{ textAlign: titleAlign }}>{item.title}</div>;
    }

    return rowSorter(item, sortType);
  });

  return (
    <Table
      data={sortData}
      columns={newColumn}
      scroll={{
        x: 3040,
        y: 500,
      }}
    />
  );
}

class OldDemo extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      selectRowKeys: ['1'],
      updateData: data,
      treeTable: undefined,
      testData: [],
      newTreeData: [],
    };
  }
  update = () => {
    const data = [];
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
      data.push({ name: 'Rose' + i, age: 36, address: 'some where', key: '2' });
    }
    this.setState({ updateData: data });
  };

  selectChange = (selectRowKeys: string, records: Object) => {
    console.log('selectRowKeys', selectRowKeys);
    console.log('records', records);
    this.setState({
      selectRowKeys,
    });
  };

  componentDidMount() {
    const promise = new Promise(res => {
      setTimeout(() => {
        res(treeTable);
      }, 2000);
    });
    promise.then(data => {
      data.forEach(item => {
        item.children = [];
      });
      this.setState({ treeTable: data });
    });
  }
  onHandleChange(sorter) {
    console.log('param', sorter);
  }

  onClick = () => {
    this.setState({ testData: data });
  };
  render() {
    console.log('this.state', this.state.selectRowKeys);
    const dataDom = [
      {
        title: <Input value={'title'} />,
        columns: <Button>eeee</Button>,
        data: <Button>eee22</Button>,
      },
    ];
    const config = {
      [Widget.Table]: {
        Container: {
          normal: {
            width: 500,
            height: 200,
            background: {
              color: 'red',
            },
          },
        },
      },
    };
    const configSmall = {
      [Widget.Table]: {
        Container: {
          normal: {
            width: 500,
            height: 100,
            background: {
              color: 'red',
            },
          },
        },
      },
    };
    const configDefault = {
      [Widget.Table]: {
        Container: {
          normal: {
            width: 500,
            height: 352,
            background: {
              color: 'red',
            },
          },
        },
      },
    };

    const configLarge = {
      [Widget.Table]: {
        Container: {
          normal: {
            width: 500,
            height: 440,
            background: {
              color: 'red',
            },
          },
        },
      },
    };
    const { updateData, treeTable, isTable, testData, newTreeData } = this.state;

    const onExpand = (expand, record) => {
      console.log(expand, record);
    };
    const iconTheme = {
      [Widget.Table]: {
        Container: {
          normal: {
            background: {
              color: '#108ee9',
            },
          },
        },
        ExpandIcon: {
          normal: {
            color: 'red',
          },
        },
        CollapseIcon: {
          normal: {
            color: 'orange',
          },
        },
      },
    };
    const onClick = () => {
      this.setState({ newTreeData: treeData });
    };

    const columnsFixed = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        ellipsis: true,
        width: 150,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Operations',
        dataIndex: '',
        key: 'operations',
        render: () => <a href="#">Delete</a>,
      },
    ];
    return (
      <div style={{ padding: '20px' }}>
        <br />
        <h1>解决 树型table columns为fixed 且 ellipsis ：true时，文字会换行 问题</h1>
        <Table
          columns={columnsFixed}
          data={childrenData}
          expandIcon={'lugia-icon-direction_caret_right'}
          collapseIcon={'lugia-icon-direction_caret_down'}
          indentSize={'30'}
        />

        <div style={{ padding: '20px' }}>
          <h1>添加max-height</h1>
          <Table
            data={data2}
            columns={tableColumns}
            theme={{
              [Widget.Table]: {
                Container: {
                  normal: {
                    maxHeight: 224,
                    height: 400,
                  },
                },
              },
            }}
          />
        </div>
        <div style={{ padding: '20px' }}>
          <h1>解决data数据为空时 表的内容渲染了颜色问题</h1>
          <Table columns={columnsStyle} data={[]} />
        </div>

        <div style={{ padding: '20px' }}>
          <h1>解决异步加载时树组件无法展开问题</h1>
          <button onClick={onClick}>点击加载data数据</button>
          <Table
            columns={columns}
            data={newTreeData}
            expandedRowRender={record => <div>{record.name}</div>}
            defaultExpandAllRows
          />
        </div>

        <div style={{ padding: '20px' }}>
          <h1>修改每一列的颜色</h1>
          <Table
            columns={columnsStyle}
            data={dataStyle}
            expandedRowRender={record => (
              <div style={{ marginLeft: -8, width: 100 }}>{record.name}</div>
            )}
            collapseIcon={'lugia-icon-direction_up_circle'}
            expandIcon={'lugia-icon-direction_down_circle'}
            expandedRowStyle={{
              background: '#108ee9',
            }}
          />
        </div>

        <div style={{ padding: '20px' }}>
          <h1>带主题的修改每一列的颜色</h1>
          <Theme config={iconTheme}>
            <Table columns={columnsStyle} data={dataStyle} />
          </Theme>
        </div>

        <div style={{ padding: '20px' }}>
          <h1>树形结果修改颜色</h1>
          <Table
            columns={treeColumnsStyle}
            data={treeData}
            collapseIcon={'lugia-icon-direction_up_circle'}
            expandIcon={'lugia-icon-direction_down_circle'}
          />
        </div>

        <div style={{ padding: '20px' }}>
          <h1>修改展开图标 传字符串</h1>
          <Table
            columns={columns}
            data={updateData}
            expandedRowRender={record => <p>{record.name}</p>}
            onExpand={onExpand}
            expandIcon={() => <Icon iconClass={'lugia-icon-direction_arrow_down'} />}
            collapseIcon={() => <Icon iconClass={'lugia-icon-direction_arrow_up'} />}
          />
        </div>

        <div style={{ padding: '20px' }}>
          <h1>修改展开图标 传函数</h1>
          <Theme config={iconTheme}>
            <Table
              columns={columns}
              data={updateData}
              expandedRowRender={record => <p>{record.name}</p>}
              onExpand={onExpand}
              expandIcon={'lugia-icon-direction_caret_up'}
              collapseIcon={'lugia-icon-direction_caret_down'}
            />
          </Theme>
        </div>

        <h1>tree-table 模拟异步获取数据</h1>
        <div style={{ display: 'flex' }}>
          <Table
            theme={configSmall}
            rowKey={'table_id'}
            useFixedHeader
            columns={treeColumns}
            data={treeTable}
          />
        </div>
        <h1>表格size</h1>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '1' }}>
            <h3>size=small</h3>
            <Table
              theme={configSmall}
              useFixedHeader
              columns={columns}
              data={updateData}
              size={'small'}
            />
            <button onClick={this.update}>动态改数据条数</button>
          </div>
          <div style={{ flex: '1' }}>
            <h3>size=default</h3>
            <Theme config={configDefault}>
              <Table useFixedHeader columns={columns} data={updateData} />
            </Theme>
          </div>
          <div style={{ flex: '1' }}>
            <h3>size=large</h3>
            <Theme config={configLarge}>
              <Table useFixedHeader columns={columns} data={data} size={'large'} />
            </Theme>
          </div>
        </div>
        <h1>边框表格</h1>
        <Theme config={config}>
          <Table useFixedHeader columns={columns} data={data} />
        </Theme>
        <Theme config={config}>
          <Table columns={columns} data={data} />
        </Theme>
        <br />
        <h1>边框表格</h1>
        <Table
          columns={columns}
          data={data}
          selectOptions={{
            onChange: this.selectChange,
            selectRowKeys: this.state.selectRowKeys,
            setCheckboxProps(record) {
              return { disabled: record.name === 'Jack' };
            },
            width: 60,
          }}
          expandedRowRender={record => <p>{record.name}</p>}
          expandIconAsCell
        />
        <br />
        <h1>多选表格</h1>
        <Table
          columns={columns}
          data={childrenData}
          selectOptions={{
            onChange: this.selectChange,
            selectRowKeys: this.state.selectRowKeys,
            setCheckboxProps(record) {
              return { disabled: record.name === 'Jack' };
            },
            width: 60,
          }}
          expandIconAsCell
        />
        <br />
        <h1>边框表格</h1>
        <Table
          columns={columns}
          data={data}
          scroll={{
            y: 200,
          }}
          useFixedHeader
          selectOptions={{
            onChange: this.selectChange,
            selectRowKeys: this.state.selectRowKeys,
            setCheckboxProps(record) {
              return { disabled: record.name === 'Jack' };
            },
            width: 60,
          }}
          expandedRowRender={record => <p>{record.name}</p>}
        />
        <br />
        <h1>斑马纹表格</h1>
        <Table
          columns={columns}
          data={data}
          tableStyle="zebraStripe"
          selectOptions={{ onChange: this.selectChange }}
        />
        <br />
        <h1>线性分割表格</h1>
        <Table columns={columns} data={data} tableStyle="linear" />
        <br />
        <h1>表格合并</h1>
        <Table data={Data} tableStyle="linear">
          <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={tags => (
              <span>
                {tags.map(tag => (
                  <span>{tag}</span>
                ))}
              </span>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <span>
                <a href="">Invite {record.lastName}</a>
                <a href="">Delete</a>
              </span>
            )}
          />
        </Table>
        <br />
        <h1>排序表格</h1>
        <Table
          columns={sortColumns}
          data={data}
          onChange={this.onHandleChange}
          tableStyle="linear"
        />
        <div style={{ padding: '20px' }}>
          <Button onClick={this.changeTAble}>点击动态渲染包含dom的table</Button>
          {isTable ? <Table columns={columnsDom} data={dataDom} /> : <div>ddd</div>}
        </div>
        <h1>固定列和固定头</h1>
        <Table
          columns={fixColumns}
          data={data}
          scroll={{
            y: 200,
            x: 1500,
          }}
          useFixedHeader
        />
        <h1>设置表格行的类名</h1>
        <Table
          columns={fixColumns}
          data={data}
          rowClassName={(record, index) => {
            if (index === 0) {
              return 'row-class-name';
            }
          }}
        />
        <h1>bug</h1>
        <Table
          columns={sortColumns}
          data={testData}
          onChange={this.onHandleChange}
          tableStyle="linear"
        />
        <button onClick={this.onClick}>设置值</button>
        <Table
          columns={tableColumns}
          data={data2}
          onChange={this.onHandleChange}
          tableStyle="linear"
        />
      </div>
    );
  }
  changeTAble = () => {
    this.setState({ isTable: true });
  };
}

const renderVirtualGrid = ({ columnIndex, rowIndex, style }) => {
  return (
    <div
      className={classNames('virtual-table-cell', {
        'virtual-table-cell-last': columnIndex === mockVirtualColumns.length - 1,
      })}
      style={{ ...style, lineHeight: '32px', borderBottom: '1px solid #e8e8e8' }}
    >
      {virtualData[rowIndex][mockVirtualColumns[columnIndex].dataIndex]}
    </div>
  );
};

function VirtualDemo() {
  return (
    <div style={{ padding: 20 }}>
      <h1>100000条数据表格</h1>
      <Table
        data={virtualData}
        columns={mockVirtualColumns}
        scroll={{
          x: 1500,
          y: 300,
        }}
        virtualModel={true}
        virtualBoundary={2000}
        virtualRowHeight={32}
        virtualGridStyle={{
          borderRight: '1px solid #e8e8e8',
          borderBottom: '1px solid #e8e8e8',
          lineHeight: '32px',
        }}
        renderVirtualGrid={renderVirtualGrid}
      />
    </div>
  );
}

export default () => {
  return (
    <div>
      <SortDemo />
      <OldDemo />
      <VirtualDemo />
    </div>
  );
};
