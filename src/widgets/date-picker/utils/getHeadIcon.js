/**
 * @flow
 * @Description:
 * @author cuixia wang
 * @date 2020-07-03
 */
export function getHeadIconClass(props: Object) {
  const { headSwitchIconLevelOne, headSwitchIconLevelTwo } = props;
  const { left: singleL, right: singleR } = headSwitchIconLevelOne || {};
  const { left: doubleL, right: doubleR } = headSwitchIconLevelTwo || {};
  return {
    singleLeftIconClass: singleL || 'lugia-icon-direction_Left',
    singleRightIconClass: singleR || 'lugia-icon-direction_right',
    doubleLeftIconClass: doubleL || 'lugia-icon-direction_double_right',
    doubleRightIconClass: doubleR || 'lugia-icon-direction_double_left',
  };
}
