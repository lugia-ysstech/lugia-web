/**
 * @Author:cuixiawang
 * @Date:
 */
import React, { useRef } from 'react';
import { RangeMiddleSpan } from '../styled/styledRangeInput';
import getThemeProps, { getRangeInputMiddleSymbolTheme } from '../themeConfig/themeConfig';
import DateInput from './singlePanelTrigger';
import { RangeSingle, WrapInner } from '../styled/doubleRangeStyled';
import { Box } from '../styled/styled';
import { getPlaceholder } from '../utils/getDerived';
import { TypeProps } from './rangePanelTrigger';
const startIndex = 0;
const endIndex = 1;
export default (props: TypeProps) => {
  const {
    middleSymbol = '~',
    disabled,
    disabledEndTime,
    disabledStartTime,
    size,
    getPartOfThemeProps,
    type,
    mode,
    value,
    defaultValue = ['', ''],
    placeholder,
    onChange,
  } = props;
  const middleSymbolTheme = getRangeInputMiddleSymbolTheme({ size, getPartOfThemeProps, type });
  const containerTheme = getThemeProps({ getPartOfThemeProps, mode }, 'Container');
  const hasValue = 'value' in props && Array.isArray(value);
  const startValue = hasValue ? { value: value[startIndex] } : {};
  const endValue = hasValue ? { value: value[endIndex] } : {};
  const { value: startVal = '' } = startValue;
  const { value: endVal = '' } = endValue;

  const valueRef = useRef([startVal, endVal]);
  const oldValueRef = useRef([startVal, endVal]);

  const onDateChange = (valueIndex: 0 | 1) => (param: { newValue: string, oldValue: string }) => {
    const { newValue, oldValue } = param;
    const { current: valueRefCurrent } = valueRef;
    const { current: oldValueRefCurrent } = oldValueRef;

    if (valueRefCurrent) {
      valueRef.current[valueIndex] = newValue;
    }
    if (oldValueRefCurrent) {
      oldValueRef.current = [...valueRef.current];
      oldValueRef.current[valueIndex] = oldValue;
    }

    onChange && onChange({ newValue: [...valueRef.current], oldValue: [...oldValueRef.current] });
  };
  const newPlaceholder = getPlaceholder({ placeholder, mode });

  return (
    <Box themeProps={containerTheme}>
      <WrapInner>
        <RangeSingle>
          <DateInput
            {...props}
            {...startValue}
            onChange={onDateChange(startIndex)}
            mode={'date'}
            disabled={disabled || disabledStartTime}
            defaultValue={defaultValue[startIndex]}
            placeholder={newPlaceholder[startIndex]}
          />
        </RangeSingle>
        <RangeMiddleSpan themeProps={middleSymbolTheme}>{middleSymbol}</RangeMiddleSpan>
        <RangeSingle>
          <DateInput
            {...props}
            {...endValue}
            onChange={onDateChange(endIndex)}
            mode={'date'}
            disabled={disabled || disabledEndTime}
            defaultValue={defaultValue[endIndex]}
            placeholder={newPlaceholder[endIndex]}
          />
        </RangeSingle>
      </WrapInner>
    </Box>
  );
};
