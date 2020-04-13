/**
 *
 * create by ligx
 *
 * @flow
 */
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import get from '../css/theme-common-dict';

const PlaceContainer = CSSComponent({
  tag: 'div',
  className: 'placeContainer',
  normal: {
    selectNames: [['color'], ['fontSize'], ['font'], ['padding']],
  },
  css: css`
    top: 50%;
    position: absolute;
    padding-left: 5px;
    left: 1px;
    right: 7px;
    margin-top: -10px;
    text-align: left;
    color: ${get('lightGreyColor')};
    line-height: 20px;
    max-width: 100%;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
});

export default PlaceContainer;
