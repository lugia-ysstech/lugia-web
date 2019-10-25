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
  if (context) {
    const contextTheme = context.getLayout(id).theme;
    const theme = useSmart ? { ...contextTheme, width: '100%' } : contextTheme;
    return theme || {};
  }
  return dTh || {};
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
    return { left: `${x}px`, top: `${y}px`, right: '', bottom: '' };
  },
  leftBottom: (point: Point) => {
    const [x, y] = point;
    return { left: `${x}px`, bottom: `${y}px`, right: '', top: '' };
  },
  rightTop: (point: Point) => {
    const [x, y] = point;
    return { right: `${x}px`, top: `${y}px`, left: '', bottom: '' };
  },
  rightBottom: (point: Point) => {
    const [x, y] = point;
    return { right: `${x}px`, bottom: `${y}px`, left: '', top: '' };
  },
};

const lugiaDCore = {
  bindHandleEvent,
  themeHandle,
  getData,
  pointType2GetCSS,
};

export default lugiaDCore;
