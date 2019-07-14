/**
 * create by szfeng
 *
 * @flow
 */
import ThemeProvider from '../theme-provider';
import ThemeHoc from '@lugia/theme-hoc';
import NavMenu from './navmenu';
import Widget from '../consts';
// export default ThemeProvider(NavMenu, Widget.NavMenu);
export default ThemeHoc(NavMenu, Widget.NavMenu, { hover: true });
