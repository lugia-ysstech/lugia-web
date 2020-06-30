/**
 *
 * create by grg on 2020/6/30
 *
 * @flow
 */
const defaultIndex = 4000;
let zIndex = defaultIndex;
let initIndex;

function setInitIndex(index: number): void {
  if (!index && index !== 0) {
    return;
  }
  initIndex = index;
  zIndex = index;
}

function getIndex() {
  const index = zIndex;
  zIndex++;
  return index;
}

function resetIndex() {
  if (!initIndex && initIndex !== 0) {
    zIndex = defaultIndex;
  } else {
    zIndex = initIndex;
  }
}

export { setInitIndex, getIndex, resetIndex };
