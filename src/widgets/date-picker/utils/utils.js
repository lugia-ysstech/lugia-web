export const getformatSymbol = (value: string) => {
  const { length } = value;
  const symbolCont = [];
  const numberIndex = [];
  for (let i = 0; i < length; i++) {
    const numberValue = parseInt(value[i]);
    if (isNaN(numberValue)) {
      symbolCont.push(value[i]);
    } else {
      numberIndex.push(i);
    }
  }
  return {
    symbolCont,
    numberIndex,
  };
};
export const getTheme = (props: Object) => {
  const { getTheme } = props;
  const theme = getTheme();
  return { ...theme };
};
export function getNewProps(props: Object): Object {
  const filterParmas = { defaultVaule: 'defaultValue', value: 'value' };
  const newProps = {};
  for (const i in props) {
    if (i !== filterParmas[i]) {
      newProps[i] = props[i];
    }
  }
  return newProps;
}
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
