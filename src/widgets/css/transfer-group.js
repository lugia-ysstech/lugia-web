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

export type GroupProps = {
  getTheme: Function,
  data: Object[],
  showSearch?: boolean,
  disabled?: boolean,
  targetKeys?: string[],
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {},
  onDirectionClick?: (
    nextTargetKeys: string[],
    direction: 'left' | 'right',
    moveKeys: string[]
  ) => {},
  onSourceSelect?: (key: string, item: Object) => {},
  onTargetSelect?: (key: string, item: Object) => {},
  sourceSelectedKeys?: string[],
  targetSelectedKeys?: string[],
  defaultSourceSelectedKeys?: string[],
  defaultTargetSelectedKeys?: string[],
};
export type GroupState = {
  inputValue: string,
  sourceSelectedKeys: string[],
  targetSelectedKeys: string[],
  sourceData: string[],
  targetData: string[],
  targetKeys: string[],
  sourceKeys: string[],
  mapData: Object,
};
type CSSProps = {
  isWrap?: boolean,
  theme: ThemeType,
};
const { borderColor, blackColor, lightGreyColor } = colorsFunc();

export const TransFerWrap = styled.div`
  box-sizing: border-box;
  font-size: ${FontSize}rem;
`;
export const OperationBtn = styled.div`
  display: inline-block;
  padding: ${em(8)};

  & > button {
    margin-bottom: ${em(10)};
  }
`;
export const BtnText = styled.span`
  font-size: ${em(16)};
  line-height: ${px2emcss(1.6)(12)};
`;
