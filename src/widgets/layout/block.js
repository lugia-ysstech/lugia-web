/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import type { BlockProps, BlockState } from '../css/block';
import { Block } from '../css/block';
import { EnlargeContext } from './layout';
import Icon from '../icon';

export default class extends React.Component<BlockProps, BlockState> {
  render() {
    const { getTheme, children, value, enlarged = false } = this.props;
    return (
      <EnlargeContext.Consumer>
        {context => {
          if (context.enlargeValue && context.enlarge) {
            if (value === context.enlargeValue) {
              return (
                <Block theme={getTheme()}>
                  {children}
                  <div
                    onClick={() => context.onClick(value)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#e8e8e8',
                      cursor: 'pointer',
                    }}
                  >
                    <Icon iconClass="lugia-icon-direction_shrink" />
                  </div>
                </Block>
              );
            }
            return null;
          }
          return (
            <Block key={new Date()} theme={getTheme()}>
              {children}
              {enlarged ? (
                <div
                  onClick={() => context.onClick(value)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#e8e8e8',
                    cursor: 'pointer',
                  }}
                >
                  <Icon iconClass="lugia-icon-direction_arrows_alt" />
                </div>
              ) : null}
            </Block>
          );
        }}
      </EnlargeContext.Consumer>
    );
  }
  handleEnlargeClick = () => {
    const { onClick, value } = this.props;
    onClick && onClick(value);
  };
}
