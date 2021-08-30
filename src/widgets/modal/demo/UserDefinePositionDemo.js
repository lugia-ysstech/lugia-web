import React, { useState } from 'react';
import Modal from '../index';
import Widgets from '../../consts/index';
import Theme from '../../theme';
import Button from '../../button';

export default () => {
  const [visible, setVisible] = useState(false);
  const modalPositionConfig = {
    [Widgets.Modal]: {
      Container: {
        normal: {
          position: {
            left: 100,
            top: 100,
          },
        },
      },
    },
  };
  const showModal = () => setVisible(true);
  return (
    <Theme config={modalPositionConfig}>
      {' '}
      <Button onClick={showModal}>自定义位置</Button>
      <Modal
        visible={visible}
        title="这是标题！"
        onOk={showModal}
        onCancel={() => setVisible(false)}
      >
        这是内容！
      </Modal>
    </Theme>
  );
};
