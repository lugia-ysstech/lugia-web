/**
 *
 * create by ligx
 *
 * @flow
 */
export function getCanSeeCount(viewHeight: number, menuItemHeight: number): number {
  return Math.ceil(getCanSeeCountRealy(viewHeight, menuItemHeight));
}
export function getCanSeeCountRealy(viewHeight: number, menuItemHeight: number): number {
  if (viewHeight <= 0 || menuItemHeight <= 0) {
    return 0;
  }
  return viewHeight / menuItemHeight;
}
