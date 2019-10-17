/*
 *   @flow
 */
import React from 'react';
import Container from './components/Container';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';

export default ThemeProvider(Container, Widget.Window);
