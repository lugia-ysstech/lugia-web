/**
 * Transfer
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import styled from 'styled-components';

const FontSize = 1.2;
const em = px2emcss(FontSize);

export type GroupProps = {
  getTheme: Function,
  data: Object[],
  showSearch?: boolean,
  value?: string[],
  defaultValue?: string[],
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {},
  onCancelItemClick?: (newValue: string[], newDisplayValue: string[]) => {},
  onDirectionClick?: (nextValue: string[], direction: 'left' | 'right', moveKeys: string[]) => {},
  sourceSelectedKeys?: string[],
  targetSelectedKeys?: string[],
  defaultSourceSelectedKeys?: string[],
  defaultTargetSelectedKeys?: string[],
  filterOption?: (inputValue: string, option: Object) => {},
  type?: 'tree' | 'panel',
  displayField?: string,
  valueField?: string,
};
export type GroupState = {
  inputValue: string,
  sourceSelectedKeys: string[],
  targetSelectedKeys: string[],
  sourceData: Object[],
  targetData: Object[],
  value: string[],
  sourceKeys: string[],
  mapData: Object,
  sourceSearchData: Object[],
  targetSearchData: Object[],
  sourceCheckKeys: string[],
  targetCheckKeys: string[],
  treeData: Object[],
  cancelItem: Object[],
  displayValue: string[],
  enableKeys: string[],
};
export const TransFerWrap = styled.div`
  box-sizing: border-box;
  font-size: ${FontSize}rem;
  position: relative;
`;
export const OperationBtn = styled.span`
  display: inline-block;
  padding: ${em(8)};
  position: relative;
  vertical-align: middle;

  & > button {
    margin-bottom: ${em(10)};
  }
`;
export const BtnText = styled.span`
  font-size: ${em(16)};
  line-height: ${px2emcss(1.6)(12)};
`;
