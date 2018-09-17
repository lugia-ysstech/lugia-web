/**
 *
 * create by guorg
 *
 * @flow
 */
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import Layout from './layout';
import Block from './block';
import Content from './content';
import Aside from './aside';

const Header = ThemeProvider(Block, Widget.Header);
const Contents = ThemeProvider(Content, Widget.Content);
const Footer = ThemeProvider(Block, Widget.Footer);

Layout.Header = Header;
Layout.Content = Contents;
Layout.Footer = Footer;
Layout.Aside = Aside;

export default Layout;
