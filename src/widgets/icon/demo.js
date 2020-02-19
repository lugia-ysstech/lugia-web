/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Icon from './';
import Theme from '../theme';
import Widget from '../consts/index';
import '../common/shirm';
import iconData from '../css/font/lugia-iconConfig';
export default () => {
  const getIcon = iconClassArray => {
    let iconClass = '';
    const iconArray = iconClassArray.map(({ iconClass: v }) => {
      iconClass = v;
      return iconClass ? <Icon iconClass={iconClass} /> : null;
    });
    return iconArray;
  };
  const view = {
    [Widget.Icon]: {
      Icon: {
        normal: {
          margin: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
          },
          fontSize: 20,
        },
        hover: {
          color: '#4d63ff',
          fontSize: 30,
        },
      },
    },
  };
  return <Theme config={view}>{getIcon(iconData)}</Theme>;
};
