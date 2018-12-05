/*
 *create by LYQ
 *
 *2018-12-05
 *
 *@flow
 *
 */
import React from 'react';
import Icon from '../icon';
import styled, { keyframes } from 'styled-components';
import Widget from '../consts/index';
import { getElement } from './getelement';

const Li = styled.li`
  height: 36px;
  line-height: 36px;
  border-bottom: 1px dashed #e8e8e8;
  &:hover {
    background: #f2f2f2;
  }
`;

type listProps = {
  isShow: boolean,
  list: Array<Object>,
};

class List extends React.Component<listProps, any> {
  static defaultProps = {
    disabled: false,
    list: [
      { fileName: 'wenjian1111jpg', status: 'success' },
      { fileName: 'wenjian2222.rmvb', status: 'loading' },
      { fileName: 'wenjian333.doc', status: 'fail' },
    ],
    getTheme: () => {
      return {};
    },
  };

  componentDidMount() {}
  static getDerivedStateFromProps(defProps: listProps, current: Object) {
    if (!current) {
      return {
        count: 0,
        hasClick: false,
        status: 'default',
      };
    }
    return {
      status: 'status' in current ? current.status : 'default',
      starNum: 'starNum' in current ? current.starNum : 0,
      current: 'current' in current ? current.current : -1,
      hasClick: 'hasClick' in current ? current.hasClick : false,
    };
  }
  render() {
    return (
      <ul style={{ width: '100%' }}>
        <Li>文件111111111111</Li>
        <Li>文件2222222222</Li>
        <Li>文件3333333333333</Li>
      </ul>
    );
  }
}

export default List;
