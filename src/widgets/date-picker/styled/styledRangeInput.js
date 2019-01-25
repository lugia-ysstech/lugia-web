import styled from 'styled-components';
import {
  getInputBorderHoverColor,
  getInputBorderColor,
  getBackground,
  FontSize,
} from '../../css/input';
import { getInputBorderRadius } from '../../common/ThemeUtils';
import { px2emcss } from '../../css/units';
export const em = px2emcss(FontSize);

export const RangeInputWrap = styled.div`
  font-size: ${FontSize}rem;
  display: inline-block;
  border: 1px solid ${props => getInputBorderColor(props)};
  ${getInputBorderRadius};
  width: ${props => em(props.width)};
  &:hover {
    border-color: ${props => getInputBorderHoverColor(props)};
  }

  &:focus-within {
    border-color: ${props => getInputBorderHoverColor(props)};
  }

  transition: all 0.3s;
`;
export const RangeInputInner = styled.span`
  & input {
    border: none;
    text-align: center;
  }

  & input:focus {
    border: none;
    box-shadow: none;
  }

  display: inline-block;
  ${props => getBackground(props)};
`;
export const RangeMiddleSpan = styled.span`
  display: inline-block;
  width: ${props => em(props.width)};
  text-align: center;
`;
