import React, { useState } from 'react';
import Modal from '../index';
import Widgets from '../../consts/index';
import Theme from '../../theme';

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
  return (
    <Theme config={modalPositionConfig}>
      <Modal
        visible={visible}
        title="这是标题！"
        onOk={() => setVisible(true)}
        onCancel={() => setVisible(false)}
      >
        这是内容！
      </Modal>
    </Theme>
  );
};
