/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import CSSComponent, { css } from '../theme/CSSProvider';
import ThemeHoc from '../theme-provider';
import Widget from '../consts';

const LugiadContainer = CSSComponent({
  tag: 'div',
  className: 'CardOutContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['boxShadow'],
      ['overflow'],
      ['border'],
      ['borderRadius'],
      ['margin'],
      ['padding'],
      ['opacity'],
    ],
    defaultTheme: {
      background: {
        color: 'white',
      },
    },
  },
  hover: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['boxShadow'], ['opacity']],
  },
  clicked: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['boxShadow'], ['opacity']],
  },
  css: css`
    position: relative;
    display: flex;
  `,
  option: { hover: true },
});

class Lugiad extends React.Component<any> {
  render() {
    const { props } = this;
    return (
      <LugiadContainer themeProps={props.getPartOfThemeProps('Container')}>
        {props.content}
      </LugiadContainer>
    );
  }
}
export default ThemeHoc(Lugiad, Widget.Lugiad, { hover: true, active: true });
