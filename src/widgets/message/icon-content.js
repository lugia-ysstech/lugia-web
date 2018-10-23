/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { Icons } from '../css/component-iconwrap';
import type { IconConProps, IconConState } from '../css/component-iconwrap';
import { IconInfo } from '../css/component-iconwrap';

export default class extends React.Component<IconConProps, IconConState> {
  render() {
    const { iconType, content } = this.props;
    return (
      <div>
        <Icons iconClass={IconInfo[iconType].class} iconType={iconType} />
        <span>{content}</span>
      </div>
    );
  }
}
