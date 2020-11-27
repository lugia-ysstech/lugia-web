/**
 * @flow
 * @Description:
 * @author cuixia wang
 * @date 2020-11-26
 */
export default function getYearRange(value: number, step: number) {
  const endYear = Math.ceil(value / step) * step;
  const startYear = endYear - (step - 1);
  return { startYear, endYear };
}
export function getYearsRange(value: number, step: number) {
  const newStep = step * step;
  const endYear = Math.ceil(value / newStep) * newStep;
  const startYear = endYear - (newStep - 1);
  return { startYear, endYear };
}
