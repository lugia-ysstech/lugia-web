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
type StateTypes = {
  folders: Array<string>,
};
const Input = CSSComponent({
  tag: 'input',
  className: 'upload_Input',
  css: css`
    width: 100%;
    display: none;
  `,
});

class FileInput extends React.Component<PropTypes, StateTypes> {
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
    this.state = {
      folders: [],
    };
  }
  onHandleChange = (e: Object) => {
    const filesNameArray = [];
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      filesNameArray.push(files[i].webkitRelativePath);
    }
    this.setState({
      folders: filesNameArray,
    });
  };
  componentDidMount() {
    const { getRegisterInput, webkitdirectory } = this.props;
    getRegisterInput && getRegisterInput(findDOMNode(this.input));
    const element = this.input;
    if (webkitdirectory && element) {
      element.setAttribute('webkitdirectory', '');
      element.addEventListener('change', this.onHandleChange);
    }
  }
  componentWillUnmount() {
    if (this.input) {
      this.input.removeEventListener('change', this.onHandleChange);
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
    if (e.target.files.length <= 0) return;
    const { getChangeInfo } = this.props;
    const { folders } = this.state;
    getChangeInfo && getChangeInfo('choose', e, folders);
  };
}

export default FileInput;
