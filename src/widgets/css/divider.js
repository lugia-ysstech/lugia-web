/**
 * create by liangguodong on 2018/8/24
 *
 * @flow
 */

export type DividerType = 'horizontal' | 'vertical';
export type DividerPosition = 'left' | 'right';
export type DividerProps = {
  viewClass: string,
  dashed: boolean,
  position?: DividerPosition,
  type: DividerType,
  content?: string,
  getPartOfThemeProps: Function,
  themeProps: Object,
  block?: boolean,
};
