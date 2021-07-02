/*
 *create by LYQ
 *
 *2018-12-05
 *
 *@flow
 *
 */
import React from 'react';
import CSSComponent, { css } from '../theme/CSSProvider';
import { findDOMNode } from 'react-dom';
type PropTypes = {
  accept?: string,
  multiple?: boolean,
  onChange?: Function,
  inputId: string,
  getChangeInfo: Function,
  getRegisterInput: Function,
  disabled?: boolean,
  themeProps: Object,
  webkitdirectory?: boolean,
};

const Input = CSSComponent({
  tag: 'input',
  className: 'upload_Input',
  css: css`
    width: 100%;
    display: none;
  `,
});

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
    const { getRegisterInput, webkitdirectory } = this.props;
    getRegisterInput && getRegisterInput(findDOMNode(this.input));
    const element = this.input;
    if (webkitdirectory && element) {
      element.setAttribute('webkitdirectory', '');
    }
  }

  render() {
    const { accept, multiple, inputId, disabled, themeProps } = this.props;
    return (
      <Input
        themeProps={themeProps}
        ref={node => (this.input = node)}
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
    const files = e.target.files;
    if (files.length <= 0) return;
    const { getChangeInfo } = this.props;
    const folders = [];
    for (let i = 0; i < files.length; i++) {
      folders.push(files[i].webkitRelativePath);
    }
    getChangeInfo && getChangeInfo('choose', e, folders);
    this.input.type = 'text';
    this.input.type = 'file';
  };
}

export default FileInput;
