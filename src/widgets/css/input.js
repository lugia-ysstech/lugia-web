/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
export const getInputBorderColor = (props: Object) => {
  const { validateStatus = Sucess } = props;

  const color = isSucess(validateStatus) ? '#d9d9d9' : '#FF3030';
  return color;
};
const Sucess = 'sucess';

function isSucess (validateStatus) {
  return validateStatus === Sucess;
}

export const getInputBorderHoverColor = (props: Object) => {
  const { validateStatus = Sucess } = props;
  return isSucess(validateStatus) ? '#49a9ee' : '#FF3030';
};

export const getFocusShadow = (props: Object) => {
  const { validateStatus = Sucess } = props;

  const color = isSucess(validateStatus) ? 'rgba(16, 142, 233, 0.2)' : 'rgba(255, 48, 48, 0.2)';

  return 'box-shadow: 0 0 0 2px ' + color;
};
export const RadiusSize = '4px';
export const Height = 22;
export const Padding = 2;
export const DefaultHelp = '验证出错';
