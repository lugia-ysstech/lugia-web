/**
 *
 * create by szfeng
 *
 * @flow
 */

import Empty from './empty';
import ThemeProvider from '../theme-provider';
import Widget from '../consts';

export default ThemeProvider(Empty, Widget.Empty, { hover: true, active: true, focus: true });
