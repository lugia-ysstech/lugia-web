const state = {
  z: 0,
  x: 90,
  y: 90,
  id: -1,
  index: -1,
  zIndexArr: [],
};

export function getZ(id) {
  state.z += 1;
  state.x += 10;
  state.y += 10;
  state.index += 1;
  if (!id) {
    state.id += 1;
  } else {
    state.id = id;
  }

  state.zIndexArr.push(state.z);
  function upDateZFn(index, z = state.z) {
    state.z = z;
    state.zIndexArr[index] = z;
  }

  return {
    ...state,
    upDateZFn,
  };
}

const floatTimes = [];
export function changeFloatTimes(id, isFloat) {
  floatTimes.push({ id, isFloat });
  function changeFloat(id, isFloat) {
    const item = floatTimes.find(({ id: i }) => i === id);
    item.isFloat = isFloat;
    const hasFloat = floatTimes.some(({ isFloat }) => isFloat);
    return hasFloat;
  }
  return { changeFloat };
}
