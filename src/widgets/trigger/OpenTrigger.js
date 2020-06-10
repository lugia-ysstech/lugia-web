/**
 * @flow
 * @Description:
 * @author cuixia wang
 * @date 2020-06-10
 */
import React from 'react';
import Trigger from './index';
type TypeProps = {
  alwaysOpen?: boolean,
  liquidLayout?: boolean,
};
export default function OpenTrigger(props: TypeProps) {
  const { alwaysOpen, liquidLayout } = props;
  const newPopupVisible = alwaysOpen ? { popupVisible: true } : {};
  const newCreatePortal = liquidLayout ? { createPortal: false } : {};
  return <Trigger {...props} {...newPopupVisible} {...newCreatePortal} />;
}
