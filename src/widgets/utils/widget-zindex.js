/**
 *
 * create by grg on 2020/6/30
 *
 * @flow
 */
const defaultIndex = 4000;
let zIndex = defaultIndex,
  initIndex;

function setInitIndex(index: number): void {
  if (!index) {
    return;
  }
  initIndex = index;
  zIndex = index;
}

function addIndex() {
  zIndex++;
}

function getIndex() {
  const index = zIndex;
  addIndex();
  return index;
}

function resetIndex() {
  zIndex = initIndex || defaultIndex;
}

export { setInitIndex, addIndex, getIndex, resetIndex };
