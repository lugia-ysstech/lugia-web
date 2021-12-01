/**
 *
 * create by grg on 2021/11/30
 *
 * @flow
 */
import React, { useState, useRef } from 'react';
import Menu from '../menu';
import Widget from '../consts';
import Icon from '../icon';
import Trigger from '../trigger';

const themeConfig = {
  [Widget.Menu]: {
    Container: {
      normal: {
        width: 136,
      },
    },
  },
};

export default function FixedMenu(props) {
  const { fixedData = [], onFixed, iconClass, tableId } = props;
  const [selectedKeys, setSelectedKeys] = useState([]);

  const triggerRef = useRef();

  function handleFixed(e, { selectedKeys: currentSelectedKeys }, item) {
    setSelectedKeys(currentSelectedKeys);
    onFixed && onFixed(currentSelectedKeys[0]);
    if (
      triggerRef.current &&
      triggerRef.current.getThemeTarget &&
      triggerRef.current.getThemeTarget() &&
      triggerRef.current.getThemeTarget().setPopupVisible
    ) {
      triggerRef.current.getThemeTarget().setPopupVisible(false);
    }
  }

  const onPopupVisibleChange = (visible: boolean) => {
    if (!visible) {
      setSelectedKeys([]);
    }
  };

  return (
    <Trigger
      ref={triggerRef}
      action={'click'}
      align={'bottomLeft'}
      popup={
        <Menu
          theme={themeConfig}
          checkedCSS={'background'}
          data={fixedData}
          onClick={handleFixed}
          selectedKeys={selectedKeys}
        />
      }
      offsetY={10}
      onPopupVisibleChange={onPopupVisibleChange}
      popupContainerId={tableId}
    >
      <Icon iconClass={iconClass} />
    </Trigger>
  );
}
