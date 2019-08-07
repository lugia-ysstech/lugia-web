/**
 * create by szfeng
 *
 * @flow
 */

import Widget from '../consts/index';
import ThemeHoc from '@lugia/theme-hoc';
import Carousel from './carousel';

export default ThemeHoc(Carousel, Widget.Carousel, { hover: true });
