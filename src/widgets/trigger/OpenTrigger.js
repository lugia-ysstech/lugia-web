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
  popupVisible?: boolean,
};
export default function OpenTrigger(props: TypeProps) {
  const { alwaysOpen } = props;
  const newPopupVisible = alwaysOpen ? { popupVisible: true } : {};
  return <Trigger {...props} {...newPopupVisible} alwaysOpen={alwaysOpen} />;
}
