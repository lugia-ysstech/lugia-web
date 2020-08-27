import designInfo, { load } from '../src/widgets/designInfo.js';
import { version } from '../package.json';

function getComponentPropsArr(props, componentTypes) {
  const componentPropsKeys = props && Object.keys(props);
  const TypesKeys = componentTypes;
  const arr = [];
  componentPropsKeys.forEach(i => {
    if (props) {
      const item = props[i];
      if (TypesKeys && TypesKeys[item.type]) {
        item.type = TypesKeys[item.type];
      }
      if (item.meta) {
        const itemMeta = item.meta;
        if (Array.isArray(itemMeta) && itemMeta.length > 0) {
          let metaItemType = '';
          let metaItemIndex = '';
          itemMeta.forEach((metaItem, index) => {
            const { type } = metaItem;
            if (TypesKeys && TypesKeys[type]) {
              metaItemType = TypesKeys[type];
              metaItemIndex = index;
            }
          });
          if (metaItemIndex !== '') {
            item.meta[metaItemIndex].type = metaItemType;
          }
        }
      }
      const list = {
        name: i,
        ...item,
      };
      arr.push(list);
    }
  });
  return arr;
}

const componentMetas = [];
const componentTargets = {};

designInfo.forEach(item => {
  const componentMeta = item.meta;
  const componentScreenshot = item.screenshot;
  const componentModuleName = componentMeta.moduleName || '@lugia/lugia-web';
  const componentTarget = item.target;
  const componentProps = componentMeta.props;
  const componentEvents = componentMeta.events;
  const componentTypes = componentMeta.type;
  const designInfoMeta = componentMeta.designInfo;
  const theme = componentMeta.theme;
  const defaultTheme = componentMeta.defaultTheme;
  const aliasName = componentMeta.aliasName;
  const tag = componentMeta.tag;
  const componentPropsArr = componentProps
    ? getComponentPropsArr(componentProps, componentTypes)
    : componentProps;
  const componentEventsArr = componentEvents
    ? getComponentPropsArr(componentEvents)
    : componentEvents;
  const {
    hidden,
    empty,
    category,
    desc,
    widgetName,
    viewClassName,
    title,
    type,
    childrenWidget,
    hideInTollPanel,
  } = componentMeta;
  const key = componentModuleName + '/' + (aliasName || widgetName);
  const id = key + '/' + version;
  const metaList = {
    metaType: 'component',
    id,
    hidden: hidden || empty || hideInTollPanel,
    categories: category,
    description: desc,
    title,
    tag,
    widgetName,
    viewClassName,
    aliasName,
    theme,
    defaultTheme,
    designInfo: designInfoMeta,
    moduleName: componentModuleName,
    screenshot: componentScreenshot,
    events: componentEventsArr,
    props: componentPropsArr,
    childrenWidget,
    type,
  };

  componentMetas.push(metaList);
  componentTargets[key] = componentTarget;
});

export default {
  moduleName: '@lugia/lugia-web',
  metas: componentMetas,
  targets: componentTargets,
  load,
  version,
};
