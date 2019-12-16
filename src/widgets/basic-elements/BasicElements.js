// @flow
/*
 * create by wangcuixia 2019/12/12
 *
 *
 * */
import React, { Component } from 'react';
import { Box } from './styled';
import getThemeProps from './themeConfig';
type TypeProps = { shape?: string, getPartOfThemeProps: Function };

export default class BasicElements extends Component<TypeProps, any> {
  render() {
    const themeProps = getThemeProps(this.props);
    return <Box themeProps={themeProps} />;
  }
}
BasicElements.defaultProps = {
  shape: 'square',
};
