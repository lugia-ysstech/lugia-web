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

type PropTypes = {
  accept?: string,
  multiple?: boolean,
  onChange?: Function,
  inputId: string,
  getChangeInfo: Function,
  getRegisterInput: Function,
  disabled?: boolean,
};

const Input = styled.input`
  width: 100%;
  display: none;
`;

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
    const { accept, multiple, inputId, disabled } = this.props;
    return (
      <Input
        innerRef={this.input}
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
