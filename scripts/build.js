/**
 *
 * create by grg on 2020/6/30
 *
 * @flow
 */
const compileComponent = require('@lugia/devtools-widgets');
const inValidComponent = require('../src/widgets/invalidComponent.json');

const commonInvalid = ['common', 'consts', 'css', 'utils', 'static'];
const componentInvalid = [...commonInvalid, ...inValidComponent];
const hideInTollPanelComponents = {
  message: 'message',
  anchor: 'index',
  notification: 'notification',
  popover: 'index',
  tooltip: 'index',
  popconfirm: 'index',
  'back-top': 'index',
};
const themeInvalid = [...commonInvalid];

const extendCode = "import { load } from './css/theme-common-dict.js';\n" + 'export { load };';

compileComponent({
  externals: [],
  importModules: [],
  componentInvalid,
  hideInTollPanelComponents,
  themeInvalid,
  extendCode,
});
