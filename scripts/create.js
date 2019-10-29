/**
 *
 * create by guorg
 *
 * @flow
 */
const createDesignInfo = require('@lugia/devtools-material').createDesignInfo;
const path = require('path');

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

createDesignInfo(tartgetPath, Invalid);
