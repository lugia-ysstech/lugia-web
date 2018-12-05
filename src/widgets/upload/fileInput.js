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

type propTypes = {
  accept: string,
  multiple: boolean,
  onChange: Function,
  inputId: string,
};

const Input = styled.input`
  width: 100%;
  display: none;
`;

class FileInput extends React.Component<propTypes, any> {
  input: any;
  static defaultProps = {
    accept: '*',
    multiple: false,
    onChange: () => {},
    inputId: 'upload',
  };
  constructor(props: Object) {
    super(props);
    this.input = React.createRef();
  }

  render() {
    const { accept, onChange, multiple, inputId } = this.props;

    return (
      <Input
        innerRef={this.input}
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        id={inputId}
        type="file"
      />
    );
  }
}

export default FileInput;
