/**
 *
 * create by guorg
 *
 * @flow
 */
const createDesignInfo = require('@lugia/devtools-material').createDesignInfo;
const path = require('path');
const ensureFileSync = require('fs-extra').ensureFileSync;
const writeFileSync = require('fs-extra').writeFileSync;

const tartgetPath = path.join(__dirname, '../src/widgets');
const Invalid = [
  'align',
  'code-box',
  'check-button',
  'common',
  'consts',
  'css',
  'inputtag',
  'page-loading',
  'screen-shot',
  'scroller',
  'theme',
  'theme-provider',
  'trigger',
  'utils',
  'empty',
  'message',
  'notification',
  'design-responsive',
  'affix',
  'anchor',
  'drawer',
  'grid',
  'layout',
  'modal',
  'back-top',
  'popover',
  'popconfirm',
  'tooltip',
  'collapse'
];

const loadStr = "import { load } from './css/theme-common-dict.js';\n" + 'export { load };';

async function createDesignInfoFile() {
  const designInfoStr = await createDesignInfo(tartgetPath, Invalid, { outFile: 'string' });
  const designInfoPath = path.join(tartgetPath, 'designInfo.js');
  ensureFileSync(designInfoPath);
  writeFileSync(designInfoPath, designInfoStr + loadStr);
}

createDesignInfoFile();
