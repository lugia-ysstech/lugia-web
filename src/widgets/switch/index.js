/**
 *
 * create by wangcuixia
 *
 * create date: 2018/04/09
 *
 * @flow
 */
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import Switch from './switch';
import DelayHoc from '../common/DelayHoc';

export default ThemeProvider(DelayHoc(Switch), Widget.Switch, { hover: true, active: true });
