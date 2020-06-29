/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import Table from './index';
import Theme from '../theme';
import Widget from '../consts/index';

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
const sortColumns = [
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
    sorter: (a, b) => a.age - b.age,
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

const childrenData = [
  {
    key: 10000,
    id: 10000,
    parentId: -1,
    hasChildren: true,
    children: [
      {
        key: 11000,
        id: 11000,
        parentId: 10000,
        hasChildren: true,
        children: [
          {
            key: 11040,
            id: 11040,
            parentId: 11000,
            hasChildren: false,
            children: [],
            icon: 'lugia-icon-financial_editor',
            name: '用户管理编辑',
            spread: false,
            path: '/systemManage/userManage/userManageEdit',
            keepAlive: '0',
            permission: '',
            type: '1',
            label: '用户管理编辑',
            sort: 1,
            isShowMenu: false,
          },
          {
            key: 11050,
            id: 11050,
            parentId: 11000,
            hasChildren: false,
            children: [],
            icon: 'lugia-icon-financial_editor',
            name: '用户授权',
            spread: false,
            path: '/systemManage/userManage/userManageRoleAuth',
            keepAlive: '0',
            permission: '',
            type: '1',
            label: '用户授权',
            sort: 1,
            isShowMenu: false,
          },
        ],
        icon: 'lugia-icon-financial_editor',
        name: '用户管理',
        spread: false,
        path: '/systemManage/userManage',
        keepAlive: '0',
        permission: '',
        type: '0',
        label: '用户管理',
        sort: 1,
        isShowMenu: true,
      },
      {
        key: 12000,
        id: 12000,
        parentId: 10000,
        hasChildren: true,
        children: [
          {
            key: 12050,
            id: 12050,
            parentId: 12000,
            hasChildren: false,
            children: [],
            icon: 'icon-caidanguanli',
            name: '菜单管理编辑',
            spread: false,
            path: '/systemManage/menuManage/menuEdit',
            keepAlive: '0',
            permission: '',
            type: '1',
            label: '菜单管理编辑',
            sort: 2,
            isShowMenu: false,
          },
        ],
        icon: 'lugia-icon-financial_editor',
        name: '菜单管理',
        spread: false,
        path: '/systemManage/menuManage',
        keepAlive: '0',
        permission: '',
        type: '0',
        label: '菜单管理',
        sort: 5,
        isShowMenu: true,
      },
      {
        key: 13000,
        id: 13000,
        parentId: 10000,
        hasChildren: true,
        children: [
          {
            key: 13040,
            id: 13040,
            parentId: 13000,
            hasChildren: false,
            children: [],
            icon: 'icon-jiaoseguanli',
            name: '角色管理编辑',
            spread: false,
            path: '/systemManage/roleManage/roleManageEdit',
            keepAlive: '0',
            permission: '',
            type: '1',
            label: '角色管理编辑',
            sort: 1,
            isShowMenu: false,
          },
          {
            key: 13050,
            id: 13050,
            parentId: 13000,
            hasChildren: false,
            children: [],
            icon: 'icon-jiaoseguanli',
            name: '角色授权',
            spread: false,
            path: '/systemManage/roleManage/roleAuth',
            keepAlive: '0',
            permission: '',
            type: '1',
            label: '角色授权',
            sort: 1,
            isShowMenu: false,
          },
        ],
        icon: 'lugia-icon-financial_editor',
        name: '角色管理',
        spread: false,
        path: '/systemManage/roleManage',
        keepAlive: '0',
        permission: '',
        type: '0',
        label: '角色管理',
        sort: 3,
        isShowMenu: true,
      },
      {
        key: 14000,
        id: 14000,
        parentId: 10000,
        hasChildren: true,
        children: [
          {
            key: 14040,
            id: 14040,
            parentId: 14000,
            hasChildren: false,
            children: [],
            icon: 'icon-shouji',
            name: '终端管理编辑',
            spread: false,
            path: '/systemManage/clientManage/clientUpdate',
            keepAlive: '0',
            permission: '',
            type: '1',
            label: '终端管理编辑',
            sort: 4,
            isShowMenu: false,
          },
        ],
        icon: 'lugia-icon-financial_editor',
        name: '终端管理',
        spread: false,
        path: '/systemManage/clientManage',
        keepAlive: '0',
        permission: '',
        type: '0',
        label: '终端管理',
        sort: 4,
        isShowMenu: true,
      },
    ],
    icon: 'lugia-icon-financial_editor',
    name: '系统管理',
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
                name: '命名分类新增',
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
            hasChildren: false,
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

export default class ModalDemo extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      selectRowKeys: ['1'],
      updateData: data,
      treeTable: undefined,
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
  render() {
    console.log('this.state', this.state.selectRowKeys);
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
    const { updateData, treeTable } = this.state;

    return (
      <div style={{ padding: '20px' }}>
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
                <a href="javascript:;">Invite {record.lastName}</a>
                <a href="javascript:;">Delete</a>
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
      </div>
    );
  }
}
