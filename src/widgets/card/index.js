/**
 *
 * create by liangguodong on 2018/11/29
 *
 * @flow
 */
import * as React from 'react';
import Widget from '../consts/index';
import Avatar from '../avatar';

import type { CardProps, CardState } from '../css/card';
import { ObjectUtils } from '@lugia/type-utils';
import CSSComponent, { css } from '../theme/CSSProvider';
import ThemeHoc from '../theme-provider/index';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
import { deepMerge } from '@lugia/object-utils';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';

const { px2remcss } = units;
const { darkGreyColor, lightGreyColor, defaultColor, themeColor } = colorsFunc();
const CardOutContainer = CSSComponent({
  tag: 'div',
  className: 'CardOutContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['boxShadow'],
      ['border'],
      ['borderRadius'],
      ['margin'],
      ['padding'],
      ['opacity'],
    ],
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { imageOrientation, type } = propsConfig;
      const textAlign = type === 'avatar' && imageOrientation === 'vertical' ? 'center' : '';
      const flexDirection = imageOrientation === 'vertical' ? 'column' : 'row';
      return `
        text-align:${textAlign};
        flex-direction:${flexDirection};`;
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { type } = propsConfig;
      if (type === 'transparent ') {
        return {};
      }
      return {
        background: {
          color: defaultColor,
        },
        border: getBorder({ color: lightGreyColor, width: 1, style: 'solid' }),
        borderRadius: getBorderRadius(5),
        boxShadow: getBoxShadow('0 0 6 rgba(0, 0, 50, 0.1)'),
      };
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
const Content = CSSComponent({
  tag: 'div',
  className: 'cardContent',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['boxShadow'],
      ['border'],
      ['borderRadius'],
      ['margin'],
      ['padding'],
      ['opacity'],
      ['color'],
    ],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { width, height } = themeMeta;
      const { propsConfig } = themeProps;
      const { type, imageOrientation } = propsConfig;
      const paddingBottom = 12;
      const paddingTop = 16;
      const paddingLeft =
        type === 'tip'
          ? 30
          : (type === 'avatar' && imageOrientation === 'vertical') || type === 'combo'
          ? 0
          : 10;

      const theWidth = width ? width - paddingLeft : '';
      const theHeight = height ? height - paddingTop - paddingBottom : '';
      return {
        width: theWidth,
        height: theHeight,
        padding: { left: paddingLeft, right: paddingLeft, top: paddingTop },
      };
    },
    defaultTheme: {
      width: '100%',
    },
  },
  css: css`
    font-size: 1.2rem;
    display: inline-block;
  `,
});
const Image = ThemeHoc(
  CSSComponent({
    tag: 'img',
    className: 'cardImage',
    normal: {
      selectNames: [
        ['width'],
        ['height'],
        ['background'],
        ['border'],
        ['borderRadius'],
        ['margin'],
        ['padding'],
        ['boxShadow'],
        ['opacity'],
      ],
    },
    css: css`
      width: ${px2remcss(120)};
      height: ${px2remcss(112)};
    `,
  }),
  'cardImage'
);
const ImageContainer = CSSComponent({
  tag: 'div',
  className: 'CardImageContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['margin'],
      ['padding'],
      ['boxShadow'],
      ['opacity'],
    ],
    getCSS(themeMeta: Object, themeProps: Object) {
      const { width, height } = themeMeta;
      const { propsConfig } = themeProps;
      const { imageOrientation } = propsConfig;
      const theWidth = ObjectUtils.isNumber(width)
        ? px2remcss(width)
        : imageOrientation === 'horizontal'
        ? px2remcss(120)
        : '100%';
      const theHeight = ObjectUtils.isNumber(height)
        ? px2remcss(height)
        : imageOrientation === 'horizontal'
        ? '100%'
        : px2remcss(112);
      const display = imageOrientation === 'horizontal' ? 'inline-block' : 'block';
      return `width :${theWidth};height:${theHeight};display :${display};`;
    },
  },
  css: css`
    position: relative;
  `,
});

const AvatarContainer = CSSComponent({
  tag: 'div',
  className: 'CardAvatarContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['margin'],
      ['padding'],
      ['boxShadow'],
      ['opacity'],
    ],
    getCSS(themeMeta: Object, themeProps: Object) {
      const { width, height } = themeMeta;
      const { propsConfig } = themeProps;
      const { imageOrientation } = propsConfig;
      const theWidth = ObjectUtils.isNumber(width)
        ? px2remcss(width)
        : imageOrientation === 'horizontal'
        ? px2remcss(120)
        : '100%';
      const theHeight = ObjectUtils.isNumber(height)
        ? px2remcss(height)
        : imageOrientation === 'horizontal'
        ? '100%'
        : px2remcss(112);
      const display = imageOrientation === 'horizontal' ? 'inline-block' : 'block';
      return `width :${theWidth};height:${theHeight};display :${display};`;
    },
  },
  css: css`
    position: relative;
    text-align: center;
  `,
});

const BaseText = CSSComponent({
  tag: 'div',
  className: 'CardBaseText',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['margin'],
      ['padding'],
      ['boxShadow'],
      ['opacity'],
    ],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { imageOrientation, type } = propsConfig;
      const padding =
        type === 'tip'
          ? 30
          : (type === 'avatar' && imageOrientation === 'vertical') || type === 'combo'
          ? 0
          : 10;
      return {
        padding: {
          left: padding,
          right: padding,
        },
      };
    },
  },
  css: css`
    text-align: inherit;
  `,
});
const Title = CSSComponent({
  extend: BaseText,
  className: 'CardTitle',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['color'],
      ['font'],
      ['background'],
      ['margin'],
      ['padding'],
      ['fontSize'],
    ],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { font } = themeMeta;
      const { propsConfig } = themeProps;
      const { type } = propsConfig;
      const weight = font && font.weight ? font.weight : type === 'tip' ? 700 : 500;
      const left = type === 'tip' ? 0 : 10;

      return {
        font: {
          weight,
        },
        padding: {
          top: 4,
          right: 10,
          left,
        },
      };
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { imageOrientation, type } = propsConfig;
      const textAlign = type === 'avatar' && imageOrientation === 'vertical' ? 'center' : '';
      const flexDirection = imageOrientation === 'vertical' ? 'column' : 'row';
      return `text-align:${textAlign};flex-direction:${flexDirection};`;
    },
    defaultTheme: {
      fontSize: 16,
    },
  },
  css: css`
    display: inline-block;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
  `,
});
const TitleTipContainer = CSSComponent({
  tag: 'div',
  className: 'CardTitleTipLineContainer',
  normal: {
    selectNames: [['height']],
  },
  css: css`
    display: inline-block;
  `,
});
const TitleTipLine = CSSComponent({
  tag: 'div',
  className: 'CardTitleTipLine',
  normal: {
    selectNames: [['width'], ['height'], ['background']],
    defaultTheme: {
      height: 20,
      width: 5,
      background: {
        color: themeColor,
      },
    },
  },
  css: css`
    left: ${px2remcss(-14)};
    position: relative;
    display: inline-block;
    border-radius: ${px2remcss(5)};
  `,
});
const Description = CSSComponent({
  extend: BaseText,
  className: 'cardDescription',
  normal: {
    selectNames: [['width'], ['height'], ['color'], ['font'], ['fontSize'], ['padding']],
    defaultTheme: {
      fontSize: 14,
      color: darkGreyColor,
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { type } = propsConfig;
      const paddingLeft = type === 'tip' ? 5 : 10;
      return {
        padding: { left: paddingLeft, right: 10, top: 14 },
      };
    },
  },
});
const Operation = CSSComponent({
  tag: 'div',
  className: 'CardOperation',
  normal: {
    selectNames: [['width'], ['height'], ['color'], ['font'], ['position']],
    defaultTheme: {
      font: {
        weight: 400,
        size: 14,
      },
      position: {
        right: 20,
        top: 16,
      },
    },
  },
});

class Card extends React.Component<CardProps, CardState> {
  static defaultProps = {
    type: 'simple',
    imageOrientation: 'horizontal',
  };

  constructor(props: CardProps) {
    super(props);
  }
  static getDerivedStateFromProps(nextProps, prevState) {}

  render() {
    const { type, imageOrientation, content } = this.props;
    let resultTheme;
    switch (type) {
      case 'avatar':
        const avatarWidth = imageOrientation === 'horizontal' ? 320 : 150;
        const avatarHeight = imageOrientation === 'horizontal' ? 116 : 190;
        const avatarThemeProps = {
          themeConfig: { normal: { width: avatarWidth, height: avatarHeight } },
        };
        resultTheme = avatarThemeProps;
        break;
      case 'image':
        const imageWidth = imageOrientation === 'horizontal' ? 320 : 200;
        const imageHeight = imageOrientation === 'horizontal' ? 112 : 230;
        const imageThemeProps = {
          themeConfig: { normal: { width: imageWidth, height: imageHeight } },
        };
        resultTheme = imageThemeProps;
        break;
      case 'combo':
      case 'simple':
      default:
        const simpleThemeProps = { themeConfig: { normal: { width: 350, height: 130 } } };
        resultTheme = simpleThemeProps;
        break;
    }
    resultTheme = deepMerge(
      resultTheme,
      this.props.getPartOfThemeProps('Container', { props: { type, imageOrientation } })
    );

    return (
      <CardOutContainer themeProps={resultTheme} type={type} imageOrientation={imageOrientation}>
        {this.getDetails('operation')}
        {this.getImageContainer()}
        {this.getInnerContent()}
      </CardOutContainer>
    );
  }

  getInnerContent() {
    const { type, imageOrientation, content } = this.props;
    const cardContentTheme = this.props.getPartOfThemeProps('CardContent', {
      props: {
        type,
        imageOrientation,
      },
    });
    if (type !== 'transparent') {
      return (
        <Content
          themeProps={cardContentTheme}
          imageOrientation={imageOrientation}
          type={type}
          content={content}
        >
          {this.getTitleTipContainer()}
          {this.getDetails('description')}
          {this.getContent()}
        </Content>
      );
    }
  }

  getTitleTipContainer() {
    const { title } = this.props;
    if (title) {
      return (
        <TitleTipContainer themeProps={this.props.getPartOfThemeProps('CardTitleTipLine')}>
          {this.getTitleTipLine()}
          {this.getDetails('title')}
        </TitleTipContainer>
      );
    }
    return null;
  }

  getTitleTipLine() {
    const { type } = this.props;
    return type === 'tip' ? (
      <TitleTipLine themeProps={this.props.getPartOfThemeProps('CardTitleTipLine')} />
    ) : null;
  }

  getImageContainer() {
    const { type, imageOrientation } = this.props;

    const avatarContainerThemeProps = this.props.getPartOfThemeProps('CardAvatarContainer', {
      props: {
        imageOrientation,
      },
    });
    const imageContainerThemeProps = this.props.getPartOfThemeProps('CardImageContainer', {
      props: {
        imageOrientation,
      },
    });

    if (type === 'avatar')
      return (
        <AvatarContainer themeProps={avatarContainerThemeProps} imageOrientation={imageOrientation}>
          {this.getAvatar()}
        </AvatarContainer>
      );
    if (type === 'image')
      return (
        <ImageContainer themeProps={imageContainerThemeProps} imageOrientation={imageOrientation}>
          {this.getImage()}
        </ImageContainer>
      );
    return null;
  }
  getDetails(information: string): React.Node | null {
    const { operation, title, description, content, children, type } = this.props;
    const hasNoContent = !(content && children);
    switch (information) {
      case 'operation':
        const operationThemeProps = this.props.getPartOfThemeProps('CardOperation');
        return hasNoContent && operation ? (
          <Operation themeProps={operationThemeProps}>{operation}</Operation>
        ) : null;
      case 'title':
        const titleThemeProps = this.props.getPartOfThemeProps('CardTitle', { props: { type } });
        return title ? (
          <Title type={type} themeProps={titleThemeProps}>
            {title}
          </Title>
        ) : null;
      case 'description':
        const descriptionThemeProps = this.props.getPartOfThemeProps('CardDescription', {
          props: { type },
        });
        return hasNoContent && description ? (
          <Description themeProps={descriptionThemeProps}>{description} </Description>
        ) : null;
      default:
        return null;
    }
  }
  getContent(): React.Node | null {
    const { content, children } = this.props;
    return content ? content : children ? children : null;
  }
  getImage() {
    const { image } = this.props;
    const { theme, viewClass } = this.props.getPartOfThemeHocProps('CardImage');
    if (ObjectUtils.isString(image)) {
      return <Image viewClass={viewClass} theme={theme} src={image} />;
    }
    return image;
  }
  getAvatar() {
    const { avatar, imageOrientation } = this.props;
    const { theme: avatarTheme, viewClass } = this.props.getPartOfThemeHocProps('CardAvatar');

    const newTheme = deepMerge(
      {
        [viewClass]: {
          SrcAvatar: {
            normal: {
              getCSS() {
                return `
                        background-color: transparent;`;
              },
              getThemeMeta(themeMeta: Object, themeProps: Object) {
                const { propsConfig } = themeProps;
                const { imageOrientation } = propsConfig;
                const left = imageOrientation === 'horizontal' ? 20 : 0;
                return {
                  margin: {
                    left,
                  },
                };
              },
            },
          },
        },
      },
      avatarTheme
    );

    if (ObjectUtils.isString(avatar)) {
      return (
        <Avatar
          type="img"
          viewClass={viewClass}
          theme={newTheme}
          shape={'circle'}
          propsConfig={{ imageOrientation }}
          src={avatar}
        />
      );
    }
    return avatar;
  }
}
export default ThemeHoc(Card, Widget.Card, { hover: true, active: true });
