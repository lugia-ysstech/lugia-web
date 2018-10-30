/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import type { IconConProps, IconConState } from '../css/component-iconwrap';
import { IconInfo, Icons } from '../css/component-iconwrap';

export default class extends React.Component<IconConProps, IconConState> {
  render() {
    const { iconType, content } = this.props;
    return [
      <Icons iconClass={IconInfo[iconType].class} iconType={iconType} />,
      <span>{content}</span>,
    ];
  }
}
