import get from '../css/theme-common-dict';
export type MorePageType = 'default' | 'pre' | 'next';
export type AlignType = 'Left' | 'Right';
export type SizeType = 'small' | 'default' | 'large';
export type PaginationProps = {
  current?: number,
  defaultCurrent?: number,
  defaultPageSize?: number,
  hideOnSinglePage?: boolean,
  pageSize?: number,
  pageSizeOptions?: string[],
  showQuickJumper?: boolean,
  showTotalNumber?: boolean,
  showTotal?: (total: number, range: number) => void,
  simple?: boolean,
  total?: number,
  onChange?: (page: number, pageSize: number) => void,
  getPartOfThemeProps: Function,
  preIconClass?: string,
  nextIconClass?: string,
  preIconSrc?: string,
  nextIconSrc?: string,
  blockList?: string[],
  align?: AlignType,
  showTotalData?: boolean,
  size: SizeType,
  divided: boolean,
  quickJumperValue?: number,
  onQuickJumperInputKeyUp?: (event: KeyboardEvent) => void,
  onQuickJumperInputKeyDown?: (event: KeyboardEvent) => void,
  onQuickJumperInputKeyPress?: (event: KeyboardEvent) => void,
  onQuickJumperInputFocus?: (event: UIEvent) => void,
  onQuickJumperInputBlur?: (current: number, event: UIEvent) => void,
  onQuickJumperInputEnter?: (current: number, event: KeyboardEvent) => void,
};

export type PaginationState = {
  current: number,
  pageSize: number,
  showMorePageType: MorePageType,
};

function getSize(size: SizeType) {
  return size === 'small' ? 12 : 14;
}
function getIconSize(size: SizeType) {
  return size === 'small' ? get('xsFontSize') : get('sFontSize');
}
export function getThemeFontSize(themeMeta, themeProps, iconType?: boolean) {
  const { propsConfig: { size } = {} } = themeProps;
  const { fontSize, font: { size: innerFontSize } = {} } = themeMeta;
  const theSize = innerFontSize || fontSize || (iconType ? getIconSize(size) : getSize(size));
  return { fontSize: theSize };
}
export function getPaginationSize(size: SizeType) {
  return size === 'small'
    ? get('smallSize')
    : size === 'large'
    ? get('largeSize')
    : get('normalSize');
}
export function getPaginationItemStyle(themeMeta, themeProps) {
  const { width, height } = themeMeta;
  const { propsConfig: { size } = {} } = themeProps;
  const theHeight = height || getPaginationSize(size);
  return { width: width || getPaginationSize(size), height: theHeight, lineHeight: theHeight };
}
