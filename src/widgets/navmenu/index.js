/**
 * create by szfeng
 *
 * @flow
 */
import ThemeHoc from '@lugia/theme-hoc';
import NavMenu from './navmenu';
import Widget from '../consts';
export default ThemeHoc(NavMenu, Widget.NavMenu, { hover: true });
