import { MenuItemHeight } from './menu';
import colorsFunc from '../css/stateColor';
import styled from 'styled-components';
import { px2emcss } from './units';

const em = px2emcss(1.2);
const { disableColor, mediumGreyColor } = colorsFunc();

export const OldValueItem = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: ${em(MenuItemHeight)};
  line-height: ${em(MenuItemHeight)};
  background: ${disableColor};
  color: ${mediumGreyColor};
  font-size: ${em(14)};
  position: relative;
  cursor: pointer;
  overflow: hidden;
`;
OldValueItem.displayName = 'oldValueItem';

export const CommonSpan = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const TimeIcon = styled(CommonSpan)`
  margin-right: ${em(10)};
  font-size: ${em(12)};
  left: ${em(10)};
`;

export const OldValueTitle = styled(CommonSpan)`
  left: ${em(25)};
  padding: 0 ${em(5)};
`;
OldValueTitle.displayName = 'oldValueTitleSpan';

export const EmptyBox = styled.div`
  height: 0;
`;
EmptyBox.displayName = 'emptyBox';
