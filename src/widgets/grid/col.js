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
import { responsiveArray } from './row';

export default ThemeProvider(
  MouseEventAdaptor(
    class extends React.Component<ColProps, ColState> {
      render() {
        const { children, span = 1, offset, push, pull, order, gutter, equable } = this.props;
        const propsSizeData: Object = this.handlePropsData();
        const width = 100 / equable;
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
            width={width}
          >
            {children}
          </ColWrap>
        );
      }

      handlePropsData = (): Object => {
        const { props } = this;
        const { scrrenSize } = props;
        if (scrrenSize) {
          const prop = this.getPropsScrrenSpan();
          if (typeof prop === 'number') {
            return { span: prop };
          } else if (typeof prop === 'object') {
            return prop;
          }
        }

        return {};
      };

      getPropsScrrenSpan = () => {
        const { props } = this;
        const { scrrenSize, span = 0 } = props;

        const propsScrrenSize = props[scrrenSize];
        if (propsScrrenSize) {
          return propsScrrenSize;
        }
        const index = responsiveArray.indexOf(scrrenSize);
        const responsiveLength = responsiveArray.length;
        if (index === responsiveLength - 1) {
          return props[responsiveArray[index]] || span;
        }
        for (let i = index + 1; i < responsiveLength; i++) {
          const propsScrSize = props[responsiveArray[i]];
          if (propsScrSize) {
            return propsScrSize;
          }
        }

        return span;
      };
    }
  ),
  Widget.Col
);
