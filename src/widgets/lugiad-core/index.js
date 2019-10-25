/**
 *
 * create by guorg
 *
 * @flow
 */
function bindHandleEvent(e) {
  if (!e) {
    return;
  }

  if (e.newValue || e.newValue === 0) {
    return e.newValue;
  }

  if (e.value || e.value === 0) {
    return e.value;
  }

  if (e.target && (e.target.value || e.target.value === 0)) {
    return e.target.value;
  }
}

function themeHandle(id, context, dTh, useSmart) {
  let cmpTheme = {};
  if (context) {
    const contextTheme = { ...context.getLayout(id).theme };
    cmpTheme = { ...contextTheme };
  } else {
    cmpTheme = { ...dTh };
  }

  if (useSmart && cmpTheme.Container && cmpTheme.Container.normal) {
    cmpTheme.Container.normal.width = '100%';
  }
  return cmpTheme || {};
}

function getData(state, propsName, modelName, fieldName) {
  if (!modelName) {
    return {};
  }
  const paths = fieldName.split('.');
  const data = modelName.getState().getIn(paths);
  return {
    [propsName]: typeof data !== 'object' ? data : data ? (data.toJS ? data.toJS() : data) : null,
  };
}
type PointType = 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
type Point = [number, number];

const pointType2GetCSS: {
  [key: PointType]: (point: Point) => Object,
} = {
  leftTop: (point: Point) => {
    const [x, y] = point;
    return { left: `${x}%`, top: `${y}%`, right: '', bottom: '' };
  },
  leftBottom: (point: Point) => {
    const [x, y] = point;
    return { left: `${x}%`, bottom: `${y}%`, right: '', top: '' };
  },
  rightTop: (point: Point) => {
    const [x, y] = point;
    return { right: `${x}%`, top: `${y}%`, left: '', bottom: '' };
  },
  rightBottom: (point: Point) => {
    const [x, y] = point;
    return { right: `${x}%`, bottom: `${y}%`, left: '', top: '' };
  },
};

const lugiaDCore = {
  bindHandleEvent,
  themeHandle,
  getData,
  pointType2GetCSS,
};

export default lugiaDCore;
