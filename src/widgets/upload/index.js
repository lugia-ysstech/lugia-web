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
import MouseEventAdaptor from '../common/MouseEventAdaptor';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';

export default ThemeHoc(
  ValidateHoc(MouseEventAdaptor(KeyBoardEventAdaptor(Upload))),
  Widget.Upload,
  {
    hover: true,
    active: false,
  }
);
