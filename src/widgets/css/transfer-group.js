/**
 * Transfer
 * create by guorg
 * @flow
 */
import CSSComponent from '@lugia/theme-css-hoc';
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
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
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
// export const TransFerWrap = styled.div`
//   box-sizing: border-box;
//   font-size: ${FontSize}rem;
//   position: relative;
// `;
export const TransFerWrap = CSSComponent({
  className: 'TransFerWrap',
  tag: 'div',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['margin'],
      ['padding'],
      ['background'],
      ['border'],
      ['borderRadius'],
    ],
  },
});

export const OperationBtn = styled.span`
  display: inline-block;
  padding: ${em(8)};
  position: relative;
  vertical-align: middle;

  & > button {
    margin-bottom: ${em(10)};
    padding-left: ${em(12)};
    padding-right: ${em(14)};
  }
`;
