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

export const BlockContext = React.createContext({});

export default class extends React.Component<BlockProps, BlockState> {
  level: number;

  render() {
    const { getTheme, children, enlarged = false } = this.props;
    return (
      <EnlargeContext.Consumer>
        {(context: Object) => {
          const { enlargeValue, enlarge, onClick, level, talkRoot } = context;
          if (this.level === undefined) {
            level.cur = level.cur + 1;
            this.level = level.cur;
          }
          if (enlargeValue && !~enlargeValue.indexOf(this.level) && enlarge) {
            return null;
          }
          return (
            <BlockContext.Consumer>
              {(context: Object) => {
                talkRoot(context.father, this.level);
                return (
                  <BlockContext.Provider value={{ father: this.level }}>
                    <Block theme={getTheme()}>
                      {children}
                      {enlarged ? (
                        <Enlarge onClick={() => onClick && onClick(this.level)}>
                          <IconWrap
                            iconClass={
                              enlarge
                                ? 'lugia-icon-direction_shrink'
                                : 'lugia-icon-direction_arrows_alt'
                            }
                          />
                        </Enlarge>
                      ) : null}
                    </Block>
                  </BlockContext.Provider>
                );
              }}
            </BlockContext.Consumer>
          );
        }}
      </EnlargeContext.Consumer>
    );
  }
}
