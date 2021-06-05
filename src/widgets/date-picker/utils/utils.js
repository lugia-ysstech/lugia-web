export const getTheme = (props: Object) => {
  const { getTheme } = props;
  const theme = getTheme();
  return { ...theme };
};

export function tansValueFromStringToArray(props) {
  const filterParmas = { defaultValue: 'defaultValue', value: 'value', placeholder: 'placeholder' };
  const newProps = {};
  for (const i in props) {
    newProps[i] = props[i];
    if (i == filterParmas[i]) {
      newProps[i] = [props[i]];
    }
  }
  return newProps;
}
export function getNewStepProps(props: Object) {
  const { step } = props;
  return typeof step === 'number' && !isNaN(step) && step > 0 ? step : 12;
}
