/**
 *
 * create by liangguodong on 2018/8/27
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import Widget from '../consts/index';
import type { AvatarShape, AvatarSize } from '../css/avatar';
import { DefaultHeight, LargeHeight, SmallHeight } from '../css/avatar';
import Icon from '../icon';
import ThemeHoc from '@lugia/theme-hoc';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import CSSComponent, { css } from '../theme/CSSProvider';
import { ObjectUtils } from '@lugia/type-utils';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
import { deepMerge } from '@lugia/object-utils';

const { px2remcss } = units;
const { borderColor } = colorsFunc();
const BaseAvatar = CSSComponent({
  tag: 'div',
  className: 'BaseAvatar',
  normal: {
    selectNames: [
      ['color'],
      ['width'],
      ['height'],
      ['background'],
      ['margin'],
      ['padding'],
      ['opacity'],
    ],
    defaultTheme: {
      color: 'rgba(0, 0, 0, 0.65)',
      background: {
        color: borderColor,
      },
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { width, height, background = {} } = themeMeta;
      const { size, src, icon, shape } = propsConfig;
      const { color: backgroundColor } = background;
      const theBackgroundColor = backgroundColor ? backgroundColor : src || icon ? '' : borderColor;
      const theSize =
        size === 'large' ? LargeHeight : size === 'small' ? SmallHeight : DefaultHeight;
      const theWidth = ObjectUtils.isNumber(width) ? width : theSize;
      const theHeight = ObjectUtils.isNumber(height) ? height : theSize;
      const theBorderRadius = shape === 'circle' ? '50%' : '10%';
      return `border-radius:${theBorderRadius};width :${px2remcss(theWidth)};height:${px2remcss(
        theHeight
      )}; line-height: ${px2remcss(theSize)};background-color:${theBackgroundColor};`;
    },
  },
  css: css`
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    position: relative;
  `,
});

const Name = CSSComponent({
  tag: 'span',
  className: 'AvatarName',
  normal: {
    selectNames: [['color'], ['width'], ['height'], ['fontSize']],
    defaultTheme: { color: 'white' },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { width, height } = themeMeta;
      const { size } = propsConfig;
      const theSize =
        size === 'large' ? LargeHeight : size === 'small' ? SmallHeight : DefaultHeight;
      const theWidth = ObjectUtils.isNumber(width) ? width : theSize;
      const theHeight = ObjectUtils.isNumber(height) ? height : theSize;
      return `width :${px2remcss(theWidth)};height:${px2remcss(theHeight)};`;
    },
  },
  css: css`
    user-select: none;
  `,
});
const Picture = CSSComponent({
  tag: 'img',
  className: 'AvatarPicture',
  normal: {
    selectNames: [['color'], ['width'], ['height']],
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { width, height } = themeMeta;
      const { size, shape } = propsConfig;
      const theSize =
        size === 'large' ? LargeHeight : size === 'small' ? SmallHeight : DefaultHeight;
      const theBorderRadius = shape === 'circle' ? '50%' : '10%';
      const theWidth = ObjectUtils.isNumber(width) ? width : theSize;
      const theHeight = ObjectUtils.isNumber(height) ? height : theSize;
      return `width :${px2remcss(theWidth)};height:${px2remcss(
        theHeight
      )};border-radius:${theBorderRadius};`;
    },
  },
  css: css`
    vertical-align: middle;
  `,
});

type AvatarProps = {
  viewClass?: string,
  shape?: AvatarShape,
  size?: AvatarSize,
  src?: string,
  icon?: string,
  name: string,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
};
type AvatarState = {};
class AvatarBox extends React.Component<AvatarProps, AvatarState> {
  static defaultProps = {
    viewClass: Widget.Avatar,
    shape: 'circle',
    size: 'default',
  };
  static displayName = Widget.Avatar;
  getChildren() {
    const { src, icon, name, size, shape } = this.props;
    const theThemeProps = this.props.getPartOfThemeProps('SrcAvatar', {
      props: {
        size,
        shape,
        src,
        icon,
      },
    });
    if (src !== undefined && src !== null) {
      return <Picture src={src} shape={shape} themeProps={theThemeProps} />;
    } else if (icon !== undefined && icon !== null) {
      const { theme: iconPropsTheme, viewClass } = this.props.getPartOfThemeHocProps('IconAvatar');
      const newTheme = deepMerge(
        {
          [viewClass]: {
            normal: {
              getCSS() {
                return ` display: inline-block;
                         text-align: center;
                         text-transform: none;
                         vertical-align: middle !important;`;
              },
              getThemeMeta(themeMeta, themeProps) {
                const { propsConfig } = themeProps;
                const { size } = propsConfig;
                const theFontSize = size === 'large' ? 22 : size === 'small' ? 12 : 18;
                return {
                  fontSize: theFontSize,
                };
              },
            },
          },
        },
        iconPropsTheme
      );
      return (
        <Icon
          viewClass={viewClass}
          theme={newTheme}
          propsConfig={{ size, shape, src, icon }}
          size={size}
          iconClass={icon}
          shape={shape}
        />
      );
    }
    let finalName = name + '';
    finalName = finalName.length > 5 ? finalName.substr(0, 5) : finalName;
    const nameThemeProps = this.props.getPartOfThemeProps('FontAvatar', {
      props: {
        size,
        shape,
        src,
        icon,
      },
    });

    return (
      <Name size={size} themeProps={nameThemeProps}>
        {finalName}
      </Name>
    );
  }
  getAvatar() {
    const { props } = this;
    const { themeProps, size, shape, src, icon } = props;
    const thePropsTheme = deepMerge(
      this.props.getPartOfThemeProps('AvatarContainer', {
        props: {
          size,
          shape,
          src,
          icon,
        },
      }),
      themeProps
    );

    return (
      <BaseAvatar {...props} themeProps={thePropsTheme}>
        {this.getChildren()}
      </BaseAvatar>
    );
  }
  render() {
    return this.getAvatar();
  }
}
const Avatar = ThemeHoc(KeyBoardEventAdaptor(AvatarBox), Widget.Avatar);
export default Avatar;
