/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Skeleton from './skeleton';
import Widget from '../consts';
export default ThemeProvider(Skeleton, Widget.Skeleton);
