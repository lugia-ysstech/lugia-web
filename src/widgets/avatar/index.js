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
const { lightGreyColor } = colorsFunc();
const isLargeSize = size => {
  return size === 'large';
};
const isSmallSize = size => {
  return size === 'small';
};
const isImgType = type => {
  return type === 'img';
};

const getDefaultSize = size => {
  return isLargeSize(size) ? LargeHeight : isSmallSize(size) ? SmallHeight : DefaultHeight;
};
const getSize = (size, defaultSize) => {
  return size ? size : defaultSize;
};

const AvatarWrapper = CSSComponent({
  tag: 'div',
  className: 'AvatarWrapper',
  normal: {
    selectNames: [['width'], ['height'], ['lineHeight']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { size },
      } = themeProps;
      const { height } = themeMeta;
      const theHeight = getSize(height, getDefaultSize(size));
      return {
        height: theHeight,
        lineHeight: theHeight,
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
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
    ],
    defaultTheme: {
      color: 'rgba(0, 0, 0, 0.65)',
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { size, shape },
      } = themeProps;
      const theBorderRadius = shape === 'circle' ? '50%' : '10%';
      return `border-radius:${theBorderRadius};
      line-height: ${px2remcss(getDefaultSize(size))};
      min-width: ${px2remcss(24)};
      min-height: ${px2remcss(24)};
      `;
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { size, type },
      } = themeProps;
      const { width, height, background = {} } = themeMeta;
      const theBackgroundColor =
        background && background.color
          ? background.color
          : isImgType(type)
          ? 'transparent'
          : lightGreyColor;
      const theSize = getDefaultSize(size);
      const newSize = (size, defaultSize) => {
        return size ? size : isImgType(type) ? '' : defaultSize;
      };
      const theWidth = newSize(width, theSize);
      const theHeight = newSize(height, theSize);

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
    vertical-align: middle;
  `,
});

const Name = CSSComponent({
  tag: 'span',
  className: 'AvatarName',
  normal: {
    selectNames: [['color'], ['width'], ['height'], ['fontSize']],
    defaultTheme: { color: 'white' },
    getCSS(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { size },
      } = themeProps;
      const { width, height } = themeMeta;
      const theWidth = getSize(width, getDefaultSize(size));
      const theHeight = getSize(height, getDefaultSize(size));

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
    selectNames: [['borderRadius']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { shape },
      } = themeProps;
      const { borderRadius } = themeMeta;
      const theBorderRadius = borderRadius ? borderRadius : shape === 'circle' ? '50%' : '10%';
      return {
        borderRadius: getBorderRadius(theBorderRadius),
      };
    },
  },
  css: css`
    width: 100%;
    height: 100%;
  `,
});
const ImageContainer = CSSComponent({
  tag: 'div',
  className: 'AvatarImageContainer',
  normal: {
    selectNames: [['width'], ['height']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { width, height } = themeMeta;
      const theWidth = getSize(width, 24);
      const theHeight = getSize(height, 24);
      return {
        width: theWidth,
        height: theHeight,
      };
    },
  },
  css: css`
    min-width: ${px2remcss(24)};
    min-height: ${px2remcss(24)};
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
    const theThemeProps = deepMerge(
      this.props.getPartOfThemeProps('SrcAvatar', {
        props: {
          size,
          shape,
        },
      }),
      this.props.getPartOfThemeProps('Container')
    );
    if (isImgType(type)) {
      return (
        <ImageContainer themeProps={theThemeProps}>
          <Picture alt={''} src={src} themeProps={theThemeProps} />
        </ImageContainer>
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
                const theFontSize = isLargeSize(size) ? 22 : isSmallSize(size) ? 12 : 18;
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
  render() {
    const { props } = this;
    const { size, shape, type, onClick } = props;
    const thePropsTheme = this.props.getPartOfThemeProps('Container', {
      props: {
        size,
        shape,
        type,
      },
    });
    return (
      <BaseAvatar onClick={onClick} themeProps={thePropsTheme}>
        {this.getChildren()}
      </BaseAvatar>
    );
  }
}
const Avatar = ThemeHoc(KeyBoardEventAdaptor(AvatarBox), Widget.Avatar, {
  hover: true,
  active: true,
});
export default Avatar;
