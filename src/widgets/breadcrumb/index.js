/**
 * create by szfeng
 *
 * @flow
 */
import Breadcrumb from './breadcrumb';
import Widget from '../consts/index';
import ThemeHoc from '@lugia/theme-hoc';
import BreadcrumbItem from './breadcrumbItem';

const Result = ThemeHoc(Breadcrumb, Widget.Breadcrumb, { hover: false, actived: false });
Result.Item = BreadcrumbItem;

export default Result;
