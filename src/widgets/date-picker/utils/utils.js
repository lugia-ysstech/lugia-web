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
