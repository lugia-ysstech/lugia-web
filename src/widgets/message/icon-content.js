/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { deepMerge } from '@lugia/object-utils';
import colorsFunc from '../css/stateColor';
import styled, { css, keyframes } from 'styled-components';
import Icon from '../icon';
import type { IconConProps, IconConState } from '../css/component-iconwrap';
import {
  IconInfo,
  MessageText,
  MessageTextWrap,
  getLoadingIconStyle,
} from '../css/component-iconwrap';
import { px2remcss } from '../css/units';

export default class extends React.Component<IconConProps, IconConState> {
  getIconTheme = () => {
    const {
      iconTheme: { viewClass, theme },
      iconType,
    } = this.props;
    const defaultTheme = {
      [viewClass]: {
        normal: {
          color: IconInfo[iconType].color,
          font: { size: 16 },
          cursor: 'default',
          getCSS() {
            return css`
              position: relative;
              top: ${px2remcss(3)};
              margin-right: ${px2remcss(10)};
              ${getLoadingIconStyle({ iconType })};
            `;
          },
        },
      },
    };

    const iconTheme = deepMerge(defaultTheme, theme);

    return {
      viewClass,
      theme: iconTheme,
    };
  };

  render() {
    const { iconType, content, textTheme, height } = this.props;
    return (
      <MessageTextWrap height={height}>
        <Icon iconClass={IconInfo[iconType].class} {...this.getIconTheme()} singleTheme />
        <MessageText themeProps={textTheme}>{content}</MessageText>
      </MessageTextWrap>
    );
  }
}
