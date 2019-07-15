/**
 * create by szfeng
 *
 * @flow
 */
import Breadcrumb from './breadcrumb';
import Widget from '../consts/index';
import ThemeHoc from '@lugia/theme-hoc';
import BreadcrumbItem from './breadcrumbItem';

const Result = ThemeHoc(Breadcrumb, Widget.Breadcrumb, { hover: true });
Result.Item = BreadcrumbItem;

export default Result;
