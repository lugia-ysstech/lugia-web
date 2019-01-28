export function getChangeValue(changeValue, minValue, maxValue) {
  if (changeValue) {
    const newValue = [...changeValue];
    newValue.forEach((item, index) => {
      let val = item;
      if (item < minValue) {
        val = minValue;
      }
      if (item > maxValue) {
        val = maxValue;
      }
      console.log(changeValue);
      newValue[index] = val;
    });
    return newValue;
  }
}
