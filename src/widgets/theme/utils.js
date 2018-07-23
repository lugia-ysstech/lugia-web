/**
 *
 * create by ligx
 *
 * @flow
 */
export default (svThemeConfigTree: Object, contextConfig: Object, propsConfig: Object): Object => {
  function getKeys(obj) {
    return obj ? Object.keys(obj) : [];
  }

  const allKeys = new Set([
    ...getKeys(svThemeConfigTree),
    ...getKeys(contextConfig),
    ...getKeys(propsConfig),
  ]);

  function getObject(obj, key) {
    return obj ? obj[key] : {};
  }

  const result = {};
  allKeys.forEach(key => {
    result[key] = Object.assign(
      {},
      getObject(svThemeConfigTree, key),
      getObject(contextConfig, key),
      getObject(propsConfig, key)
    );
  });
  return result;
};
