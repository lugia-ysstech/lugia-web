/**
 *
 * create by liangguodong on 2018/11/29
 *
 * @flow
 */
import type { ThemeType } from '@lugia/lugia-web';
import { ObjectUtils } from '@lugia/type-utils';

export type CardType = 'simple' | 'avatar' | 'image' | 'combo' | 'tip';
export type ImageOrientation = 'horizontal' | 'vertical';
export type CardProps = {
  viewClass: string,
  description: React.Node,
  title: React.Node,
  operation: React.Node,
  image: React.Node,
  avatar: React.Node,
  content: React.Node,
  children?: React.Node,
  getTheme: Function,
  getThemeByDisplayName: Function,
  type: CardType,
  imageOrientation: ImageOrientation,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  getPartOfThemeConfig: Function,
  showTipLine?: boolean,
};
export type CardState = {};
