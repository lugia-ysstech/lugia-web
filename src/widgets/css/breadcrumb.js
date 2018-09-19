import colorsFunc from '../css/stateColor';
import { px2emcss } from './units';
import styled from 'styled-components';
export const { themeColor, mediumGreyColor, darkGreyColor, blackColor } = colorsFunc();
const em = px2emcss(1.2);

export const DefaultColor = mediumGreyColor;
export const HoverDefaultColor = blackColor;
export const FontWeight = 500;
export const FontSize = em(14);
export const separatorMarginLeft = em(10);
export const separatorMarginRight = em(10);

function getColor(props: BreadcrumbItemProps) {
  const { isLastItem } = props;
  return `color: ${isLastItem ? HoverDefaultColor : DefaultColor}`;
}

export const CommonSpan = styled.span`
  font-weight: ${FontWeight};
  font-size: ${FontSize};
`;

export const SeparatorSpan = CommonSpan.extend`
  margin-left: ${separatorMarginLeft};
  margin-right: ${separatorMarginRight};
  color: ${DefaultColor};
`;

export const ALink = styled.a`
  ${getColor};
  font-weight: ${FontWeight};
  font-size: ${FontSize};
  text-decoration: none;
  &:hover {
    color: ${HoverDefaultColor};
  }
`;
