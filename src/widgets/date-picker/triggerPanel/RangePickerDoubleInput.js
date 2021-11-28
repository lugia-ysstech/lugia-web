/**
 * @Author:cuixiawang
 * @Date:
 */
import React, { useEffect, useRef } from 'react';
import { RangeMiddleSpan } from '../styled/styledRangeInput';
import getThemeProps, { getRangeInputMiddleSymbolTheme } from '../themeConfig/themeConfig';
import DateInput from './singlePanelTrigger';
import { RangeSingle, WrapInner } from '../styled/doubleRangeStyled';
import { Box } from '../styled/styled';
import { getPlaceholder } from '../utils/getDerived';
import { TypeProps } from './rangePanelTrigger';
const startIndex = 0;
const endIndex = 1;

type Props = TypeProps & {
  doubleValid?: { validateStatus: string, help: string }[],
};
export default (props: Props) => {
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
    doubleValid = [],
    help,
    validateStatus,
    hiddenHelp,
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

  useEffect(() => {
    if (valueRef.current) {
      valueRef.current = [...value];
    }
  }, [value]);

  const newPlaceholder = getPlaceholder({ placeholder, mode });

  const { help: startHelp = help || '', validateStatus: startValidateStatus = validateStatus } =
    doubleValid[startIndex] || {};
  const { help: endHelp = help || '', validateStatus: endValidateStatus = validateStatus } =
    doubleValid[endIndex] || {};

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
            help={startHelp}
            validateStatus={startValidateStatus}
            hiddenHelp={hiddenHelp || (startHelp === '' && startValidateStatus === 'error')}
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
            help={endHelp}
            validateStatus={endValidateStatus}
            hiddenHelp={hiddenHelp || (endHelp === '' && endValidateStatus === 'error')}
          />
        </RangeSingle>
      </WrapInner>
    </Box>
  );
};
