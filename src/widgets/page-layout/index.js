import ThemeHoc from '@lugia/theme-hoc';
import PageLayout from './PageLayout';
import PageLayoutWrap from './PageLayoutWrap';
import Widget from '../consts';

const target = ThemeHoc(PageLayout, Widget.PageLayout);
target.PageLayoutWrap = PageLayoutWrap;

export default target;
