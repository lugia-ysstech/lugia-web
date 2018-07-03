/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
export const getInputBorderColor = (props: Object) => {
  const { validateStatus = Success } = props;

  const color = isSuccess(validateStatus) ? '#e8e8e8' : '#f22735';
  return color;
};
const Success = 'success';

function isSuccess (validateStatus) {
  return validateStatus === Success;
}

export const getInputBorderHoverColor = (props: Object) => {
  const { validateStatus = Success } = props;
  return isSuccess(validateStatus) ? '#cccccc' : '#f22735';
};

export const getFocusShadow = (props: Object) => {
  const { validateStatus = Success } = props;
  const color = isSuccess(validateStatus) ? 'rgba(104, 79, 255, 0.2)' : 'rgba(248, 172, 48, 0.2)';
  return 'box-shadow: 0 0 6px ' + color;
};

export const RadiusSize = '4px';
export const Height = 22;
export const LargeHeight = 38;
export const SmallHeight = 28;
export const DefaultHeight = 32;
export const Padding = 2;
export const DefaultHelp = '验证出错';
