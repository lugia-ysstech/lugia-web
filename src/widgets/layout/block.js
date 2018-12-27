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

export const BlockContext: Object = React.createContext({});

export default class extends React.Component<BlockProps, BlockState> {
  order: number;

  render() {
    const { getTheme, children, enlarged = false, isContent = false } = this.props;
    return (
      <EnlargeContext.Consumer>
        {(context: Object) => {
          const { enlargeValue, enlarge, onClick, order, talkRoot } = context;
          if (order) {
            order.current = order.current + 1;
            this.order = order.current;
          }
          return (
            <BlockContext.Consumer>
              {(context: Object) => {
                talkRoot && talkRoot(context.father, this.order);

                return (
                  <BlockContext.Provider value={{ father: this.order }}>
                    <Block
                      theme={getTheme()}
                      isContent={isContent}
                      display={!(enlargeValue && !~enlargeValue.indexOf(this.order) && enlarge)}
                      enlarge={enlarge}
                    >
                      {children}
                      {enlarged ? (
                        <Enlarge order={this.order} onClick={() => onClick && onClick(this.order)}>
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
