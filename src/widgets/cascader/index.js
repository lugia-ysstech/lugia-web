/**
 *
 * create by szfeng
 *
 * @flow
 */

import Widget from '../consts/index';
import Cascader from './cascader';
import ThemeHoc from '@lugia/theme-hoc';
import ValidateHoc from '../input/validateHoc';

export default ThemeHoc(ValidateHoc(Cascader), Widget.Cascader, { hover: true });
