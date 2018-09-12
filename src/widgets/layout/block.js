/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import type { BlockProps, BlockState } from '../css/block';
import { Block, Enlarge, IconWrap } from '../css/block';
import { EnlargeContext } from './layout';

export default class extends React.Component<BlockProps, BlockState> {
  render() {
    const { getTheme, children, value, enlarged = false } = this.props;
    return (
      <EnlargeContext.Consumer>
        {(context: Object) => {
          const { enlargeValue, enlarge, onClick } = context;
          if (enlargeValue && value !== enlargeValue && enlarge) {
            return null;
          }
          return (
            <Block theme={getTheme()}>
              {children}
              {enlarged ? (
                <Enlarge onClick={() => onClick && onClick(value)}>
                  <IconWrap
                    iconClass={
                      context.enlarge
                        ? 'lugia-icon-direction_shrink'
                        : 'lugia-icon-direction_arrows_alt'
                    }
                  />
                </Enlarge>
              ) : null}
            </Block>
          );
        }}
      </EnlargeContext.Consumer>
    );
  }
}
