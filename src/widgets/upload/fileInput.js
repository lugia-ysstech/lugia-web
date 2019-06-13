/*
 *create by LYQ
 *
 *2018-12-05
 *
 *@flow
 *
 */
import React from 'react';
import styled from 'styled-components';
import CSSComponent, { css } from '../theme/CSSProvider';
import ThemeHoc from '@lugia/theme-hoc';

type PropTypes = {
  accept?: string,
  multiple?: boolean,
  onChange?: Function,
  inputId: string,
  getChangeInfo: Function,
  getRegisterInput: Function,
  disabled?: boolean,
  themeProps: Object,
};

const Input = ThemeHoc(
  CSSComponent({
    tag: 'input',
    className: 'upload_Input',
    css: css`
      width: 100%;
      display: none;
    `,
  }),
  'Input',
  { hover: true, actived: false }
);

class FileInput extends React.Component<PropTypes, any> {
  input: any;
  static defaultProps = {
    accept: '*',
    multiple: false,
    onChange: () => true,
    inputId: 'upload',
    disabled: false,
  };

  constructor(props: Object) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount() {
    const { getRegisterInput } = this.props;
    getRegisterInput(this.input);
  }

  render() {
    const { accept, multiple, inputId, disabled, themeProps } = this.props;
    return (
      <Input
        themeProps={themeProps}
        ref={this.input}
        accept={accept}
        multiple={multiple}
        onChange={this.handleChange}
        id={inputId}
        disabled={disabled}
        type="file"
      />
    );
  }

  handleChange = (e: Object) => {
    if (e.target.files.length <= 0) return;
    const { getChangeInfo } = this.props;
    getChangeInfo && getChangeInfo('choose', e);
  };
}

export default FileInput;
