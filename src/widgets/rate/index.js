/*
 *create by LYQ
 *
 *2018-11-21
 *
 *@flow
 *
 */
import Rate from './rate';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';

export default ThemeProvider(Rate, Widget.Rate, { hover: true, active: false });
