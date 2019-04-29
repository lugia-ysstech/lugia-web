/**
 *
 * create by guorg
 *
 * @flow
 */
const createDesignInfo = require('@lugia/devtools-material').createDesignInfo;
const path = require('path');

const tartgetPath = path.join('D:\\workSpace\\lugia-web\\src\\widgets');
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
];

createDesignInfo(tartgetPath,'lugia',Invalid);
