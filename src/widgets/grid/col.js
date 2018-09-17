/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import type { ColProps, ColState } from '../css/col';
import { ColWrap } from '../css/col';
import MouseEventAdaptor from '../common/MouseEventAdaptor';

export default ThemeProvider(
  MouseEventAdaptor(
    class extends React.Component<ColProps, ColState> {
      render() {
        const { children, span = 1, offset, push, pull, order, gutter } = this.props;
        const propsSizeData: Object = this.handlePropsData();
        return (
          <ColWrap
            span={propsSizeData.span || span}
            offset={propsSizeData.offset || offset}
            push={propsSizeData.push || push}
            pull={propsSizeData.pull || pull}
            order={propsSizeData.order || order}
            gutter={gutter}
            onMouseOut={this.props.onMouseOut}
            onMouseEnter={this.props.onMouseEnter}
            onMouseOver={this.props.onMouseOver}
          >
            {children}
          </ColWrap>
        );
      }

      handlePropsData = (): Object => {
        const { props } = this;

        const { scrrenSize } = props;
        if (scrrenSize) {
          const prop = props[scrrenSize];
          if (typeof prop === 'number') {
            return { span: prop };
          } else if (typeof prop === 'object') {
            return prop;
          }
        }

        return {};
      };
    }
  ),
  Widget.Col
);
