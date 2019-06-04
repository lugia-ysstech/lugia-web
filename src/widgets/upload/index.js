/*
 *create by LYQ
 *
 *2018-12-03
 *
 *@flow
 *
 */
import Upload from './upload';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';

export default ThemeProvider(Upload, Widget.Upload, {
  hover: true,
  actived: false,
  disabled: true,
});
