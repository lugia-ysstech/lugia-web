/**
 *
 * create by grg on 2020/6/30
 *
 * @flow
 */
const compileComponent = require('@lugia/devtools-widgets');

const commonInvalid = ['common', 'consts', 'css', 'utils', 'static'];
const componentInvalid = [
  ...commonInvalid,
  'align',
  'code-box',
  'check-button',
  'inputtag',
  'page-loading',
  'screen-shot',
  'scroller',
  'theme',
  'theme-provider',
  'trigger',
  'empty',
  'design-responsive',
  'affix',
  'grid',
  'layout',
  'new-table',
];
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
