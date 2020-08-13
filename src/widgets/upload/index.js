/*
 *create by LYQ
 *
 *2018-12-03
 *
 *@flow
 *
 */
import Upload from './upload';
import Widget from '../consts/index';
import ThemeHoc from '@lugia/theme-hoc';
import ValidateHoc from '../input/validateHoc';

export default ThemeHoc(ValidateHoc(Upload), Widget.Upload, {
  hover: true,
  active: false,
});
