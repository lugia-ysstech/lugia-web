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
import CSSComponent, { css, getBorderRadius } from '../theme/CSSProvider';
import { ObjectUtils } from '@lugia/type-utils';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
import { deepMerge } from '@lugia/object-utils';

const { px2remcss } = units;
const { borderColor } = colorsFunc();

const AvatarWrapper = CSSComponent({
  tag: 'div',
  className: 'AvatarWrapper',
  normal: {
    selectNames: [['width'], ['height']],
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { height } = themeMeta;
      const { size } = propsConfig;
      const theSize = height
        ? height
        : size === 'large'
        ? LargeHeight
        : size === 'small'
        ? SmallHeight
        : DefaultHeight;
      return `
      line-height: ${px2remcss(theSize)};`;
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { height } = themeMeta;
      const { size } = propsConfig;
      const theSize =
        size === 'large' ? LargeHeight : size === 'small' ? SmallHeight : DefaultHeight;
      const theHeight = height ? height : theSize;
      return {
        height: theHeight,
      };
    },
  },
  css: css`
    text-align: center;
  `,
});
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
      ['boxShadow'],
    ],
    defaultTheme: {
      color: 'rgba(0, 0, 0, 0.65)',
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { size, shape } = propsConfig;
      const theSize =
        size === 'large' ? LargeHeight : size === 'small' ? SmallHeight : DefaultHeight;
      const theBorderRadius = shape === 'circle' ? '50%' : '10%';
      return `border-radius:${theBorderRadius};
      line-height: ${px2remcss(theSize)};`;
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { width, height, background = {} } = themeMeta;
      const { size, type } = propsConfig;
      const theBackgroundColor = background && background.color ? background.color : borderColor;
      const theSize =
        size === 'large' ? LargeHeight : size === 'small' ? SmallHeight : DefaultHeight;
      const theWidth = width ? width : type === 'img' ? '' : theSize;
      const theHeight = height ? height : type === 'img' ? '' : theSize;
      return {
        width: theWidth,
        height: theHeight,
        background: {
          color: theBackgroundColor,
        },
      };
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
    selectNames: [['color'], ['width'], ['height'], ['padding'], ['borderRadius']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { width, height } = themeMeta;
      const { shape } = propsConfig;
      const theBorderRadius = shape === 'circle' ? '50%' : '10%';
      const theWidth = width ? width : '100%';
      const theHeight = height ? height : '100%';
      return {
        width: theWidth,
        height: theHeight,
        borderRadius: getBorderRadius(theBorderRadius),
      };
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
  type: AvatarType,
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
    type: 'text',
  };
  static displayName = Widget.Avatar;
  getChildren() {
    const { src, icon, name, size, shape, type } = this.props;
    const theThemeProps = this.props.getPartOfThemeProps('SrcAvatar', {
      props: {
        size,
        shape,
      },
    });
    if (type === 'img') {
      return (
        <span>
          <Picture alt={''} src={src} themeProps={theThemeProps} />
        </span>
      );
    } else if (type === 'icon') {
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
                return { fontSize: theFontSize };
              },
            },
          },
        },
        iconPropsTheme
      );
      const thePropsTheme = this.props.getPartOfThemeProps('Container', {
        props: {
          size,
          shape,
          src,
        },
      });
      return (
        <AvatarWrapper themeProps={thePropsTheme}>
          <Icon
            singleTheme
            viewClass={viewClass}
            theme={newTheme}
            propsConfig={{ size, shape, src, icon }}
            size={size}
            iconClass={icon}
            shape={shape}
          />
        </AvatarWrapper>
      );
    }
    let finalName = name + '';
    finalName = finalName.length > 5 ? finalName.substr(0, 5) : finalName;
    const nameThemeProps = this.props.getPartOfThemeProps('FontAvatar', {
      props: {
        size,
      },
    });
    const thePropsTheme = this.props.getPartOfThemeProps('Container', {
      props: {
        size,
        shape,
        src,
      },
    });
    return (
      <AvatarWrapper themeProps={thePropsTheme}>
        <Name size={size} themeProps={nameThemeProps}>
          {finalName}
        </Name>
      </AvatarWrapper>
    );
  }
  getAvatar() {
    const { props } = this;
    const { size, shape, type } = props;
    const thePropsTheme = this.props.getPartOfThemeProps('Container', {
      props: {
        size,
        shape,
        type,
      },
    });

    return <BaseAvatar themeProps={thePropsTheme}>{this.getChildren()}</BaseAvatar>;
  }
  render() {
    return this.getAvatar();
  }
}
const Avatar = ThemeHoc(KeyBoardEventAdaptor(AvatarBox), Widget.Avatar);
export default Avatar;
