/**
 *
 * create by ligx
 *
 * @flow
 */
export function cacheOnlyFirstCall (targetFunc: Function) {

  let containerPos;


  return {
    func (...args: any) {
      if (containerPos) {
        return containerPos;
      }

      return containerPos = targetFunc(...args);
    },
    clearCache () {
      containerPos = undefined;
    },

  };
}

export function getElementPosition (e: Object) {

  let x = 0, y = 0;
  while ( e ) {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent;
  }
  return { x, y, };
}
