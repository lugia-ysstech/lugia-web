/**
 *
 * create by szfeng
 *
 * @flow
 */

import Widget from '../consts/index';
import Cascader from './cascader';
import ThemeHoc from '@lugia/theme-hoc';

export default ThemeHoc(Cascader, Widget.Cascader, { hover: true });
