import React from 'react';
import Upload from '../index';

class UploadDemo extends React.Component<any, any> {
  constructor(props: Object) {
    super(props);
  }

  render() {
    const defaultProps = {
      inputId: 'defaultUpload',
      url: '/upload',
      multiple: true,
    };

    return (
      <div>
        <Upload {...defaultProps} />
      </div>
    );
  }
}

export default UploadDemo;
