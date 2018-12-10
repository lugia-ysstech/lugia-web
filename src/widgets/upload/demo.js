/*
 *create by LYQ
 *
 *2018-12-03
 *
 *@flow
 *
 */
import React from 'react';
import Upload from './index';
import Theme from '../theme';
import Widget from '../consts/index';
import styled from 'styled-components';

class UploadDemo extends React.Component<any, any> {
  constructor(props: Object) {
    super(props);
    this.state = {};
  }
  render() {
    const defaultProps = {
      listType: 'default',
      inputId: 'upload',
      multiple: true,
      onChange: e => {
        console.log('cbk', e);
      },
    };
    const defaultProps1 = {
      listType: 'button',
      inputId: 'upload1',
    };
    const defaultProps2 = {
      listType: 'both',
      inputId: 'upload2',
    };
    const defaultProps3 = {
      listType: 'picture',
      inputId: 'upload3',
      size: 'large',
    };
    const defaultProps4 = {
      listType: 'picture',
      inputId: 'upload4',
    };
    const defaultProps5 = {
      listType: 'picture',
      inputId: 'upload5',
      size: 'small',
    };
    const defaultProps6 = {
      listType: 'area',
      inputId: 'upload6',
    };

    return (
      <div>
        <Upload {...defaultProps} />
        {/*<Upload {...defaultProps1} />*/}
        {/*<Upload {...defaultProps2} />*/}
        {/*<Upload {...defaultProps3} />*/}
        {/*<Upload {...defaultProps4} />*/}
        {/*<Upload {...defaultProps5} />*/}
        {/*<Upload {...defaultProps6} />*/}
      </div>
    );
  }
  setStateValue = (target: string, val: number) => {
    this.setState({
      [target]: val,
    });
  };
}
export default UploadDemo;
