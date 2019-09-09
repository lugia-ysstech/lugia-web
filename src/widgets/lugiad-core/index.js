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

function themeHandle(id, context, dTh) {
  if (context) {
    return context.getLayout(id).theme || {};
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

const lugiaDCore = {
  bindHandleEvent,
  themeHandle,
  getData,
};

export default lugiaDCore;
