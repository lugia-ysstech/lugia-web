/**
 * Transfer
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import styled from 'styled-components';
import colorsFunc from '../css/stateColor';

const FontSize = 1.2;
const em = px2emcss(FontSize);

export type TransferProps = {
  getTheme: Function,
  data?: Object[],
  selectedKeys?: string[],
  showSearch?: boolean,
  onSelect: Function,
  onSearch: (inputValue: string) => {},
  onCancelItemClick: Function,
  onCheckAll: Function,
  canCheckKeys: string[],
  cancelItem?: Object[],
  needCancelBox?: boolean,
  type: 'panel' | 'tree',
  direction: 'left' | 'right',
  blackList?: string[],
  whiteList?: string[],
  title: string,
  displayField: string,
  valueField: string,
};
export type TransferState = {
  inputValue: string,
};
type CSSProps = {
  isWrap?: boolean,
  theme: ThemeType,
  disabled: boolean,
};
const { borderColor, blackColor, lightGreyColor } = colorsFunc();
export const TransFer = styled.div`
  border: 1px solid ${borderColor};
  display: inline-block;
  font-size: ${FontSize}rem;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
`;
export const Check = styled.div`
  background: #f8f8f8;
  padding: ${em(10)};
  border-bottom: 1px solid #e8e8e8;
  position: relative;
`;
export const CheckText = styled.span`
  position: absolute;
  right: ${em(10)};
  line-height: 2;
`;

export const MenuWrap = styled.div`
  padding-left: ${em(2)};
`;
const getNoDataHeight = (props: CSSProps) => {
  const { direction } = props;
  if (direction === 'left') {
    return px2emcss(1.4)(310);
  }
  return px2emcss(1.4)(250);
};
export const NoData = styled.div`
  font-size: ${em(14)};
  height: ${getNoDataHeight};
  color: #ccc;
  text-align: center;
`;
export const CancelBox = styled.div`
  height: ${em(60)};
  padding: ${em(5)} ${em(10)};
  width: ${em(255)};
  border-top: 1px solid #e8e8e8;
`;
export const CancelBoxItem = styled.span`
  display: inline-block;
  padding: ${em(3)};
`;
