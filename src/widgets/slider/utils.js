export function getChangeValue(changeValue, minValue, maxValue) {
  if (changeValue) {
    const newValue = [...changeValue];
    newValue.forEach((item, index) => {
      if (item < minValue) {
        newValue[index] = minValue;
      }
      if (item > maxValue) {
        newValue[index] = maxValue;
      }
    });
    return newValue;
  }
}
