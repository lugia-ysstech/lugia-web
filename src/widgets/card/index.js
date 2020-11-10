/**
 *
 * create by liangguodong on 2018/11/29
 *
 * @flow
 */
import * as React from 'react';
import Widget from '../consts/index';
import Avatar from '../avatar';

import type { CardProps, CardState, ImageOrientation } from '../css/card';
import { ObjectUtils } from '@lugia/type-utils';
import CSSComponent, { css, StaticComponent } from '../theme/CSSProvider';
import ThemeHoc from '../theme-provider/index';
import { units } from '@lugia/css';
import { deepMerge } from '@lugia/object-utils';
import { getBorderRadius } from '@lugia/theme-utils';
import { blackColor } from '../css/inputtag';
import get from '../css/theme-common-dict';
const { px2remcss } = units;
const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const borderRadiusValue = '$lugia-dict.@lugia/lugia-web.borderRadiusValue';
const paddingToText = '$lugia-dict.@lugia/lugia-web.paddingToText';

const checkSizeIsNumber = size => {
  let theSize = size;
  if (ObjectUtils.isNumber(size)) {
    theSize = px2remcss(size);
  }
  return theSize;
};
const getDefaultSize = (size, defaultSize) => {
  return size ? checkSizeIsNumber(size) : defaultSize;
};

const isHorizontal = (imageOrientation: ImageOrientation = 'horizontal') => {
  return imageOrientation === 'horizontal';
};
const getPositionCSS = (position: boolean) => {
  const positionCSS = position ? 'position:absolute;z-index:4000;' : '';
  return positionCSS;
};

const ResponsiveContainer = StaticComponent({
  tag: 'div',
  className: 'ResponsiveContainer',
  css: css`
    width: 100%;
    overflow: auto;
  `,
});

const CardOutContainer = CSSComponent({
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
    getCSS(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { imageOrientation, type, minHeight },
      } = themeProps;
      const textAlign = type === 'avatar' && !isHorizontal(imageOrientation) ? 'center' : '';
      const flexDirection = !isHorizontal(imageOrientation) ? 'column' : 'row';
      const theHeight = minHeight ? checkSizeIsNumber(minHeight) : px2remcss(20);
      return `
        min-height:${theHeight};
        text-align:${textAlign};
        flex-direction:${flexDirection};`;
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { type },
      } = themeProps;
      if (type === 'transparent' || type === 'responsive') {
        return {
          background: { color: 'transparent' },
          boxShadow: 'none',
        };
      }
      return {
        borderRadius: getBorderRadius(borderRadiusValue),
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
    min-width: ${px2remcss(50)};
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
      const theWidth = width ? width : '';
      const theHeight = height ? height : '';
      return {
        width: theWidth,
        height: theHeight,
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
const DefaultChildren = StaticComponent({
  tag: 'div',
  className: 'cardDefaultChildren',
  css: css`
    width: ${px2remcss(50)};
    height: ${px2remcss(20)};
  `,
});
const Image = ThemeHoc(
  CSSComponent({
    tag: 'img',
    className: 'cardImage',
    normal: {
      selectNames: [
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
        const {
          propsConfig: { imageOrientation },
        } = themeProps;
        const theWidth = getDefaultSize(width, '100%');
        const theHeight = getDefaultSize(height, '100%');
        const display = isHorizontal(imageOrientation) ? 'inline-block' : 'block';
        return `width :${theWidth};height:${theHeight};display:${display};
        max-width:100%;
        max-height:100%;
        `;
      },
    },
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
      const {
        propsConfig: { imageOrientation },
      } = themeProps;
      const hCard = isHorizontal(imageOrientation);
      const defaultWidth = hCard ? px2remcss(120) : '100%';
      const defaultHeight = hCard ? '100%' : px2remcss(112);
      const theWidth = getDefaultSize(width, defaultWidth);
      const theHeight = getDefaultSize(height, defaultHeight);
      const display = hCard ? 'inline-block' : 'block';
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
    defaultTheme: {
      padding: {
        top: 28,
      },
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { width, height } = themeMeta;
      const {
        propsConfig: { imageOrientation },
      } = themeProps;
      const hCard = isHorizontal(imageOrientation);
      const defaultWidth = hCard ? px2remcss(120) : '100%';
      const defaultHeight = hCard ? '100%' : px2remcss(112);
      const theWidth = getDefaultSize(width, defaultWidth);
      const theHeight = getDefaultSize(height, defaultHeight);
      const display = hCard ? 'inline-block' : 'block';
      return `width :${theWidth};height:${theHeight};display :${display};`;
    },
  },
  css: css`
    position: relative;
    text-align: center;
  `,
});

const TitleContainer = CSSComponent({
  tag: 'div',
  className: 'TipTitleContainer',
  normal: {
    selectNames: [['width'], ['height']],
    defaultTheme: {
      fontSize: 16,
      width: '100%',
    },
  },
});
const TextContainer = CSSComponent({
  extend: TitleContainer,
  className: 'TextContainer',
  normal: {
    selectNames: [['width'], ['height'], ['padding']],
    width: '100%',
    getCSS(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { imageOrientation, type, __lugiad__header__absolute__ },
      } = themeProps;
      const vCard = !isHorizontal(imageOrientation);
      const textAlign = type === 'avatar' && vCard ? 'center' : '';
      const flexDirection = vCard ? 'column' : 'row';
      const positionCSS = getPositionCSS(__lugiad__header__absolute__);
      return `text-align:${textAlign};flex-direction:${flexDirection};${positionCSS}`;
    },
    defaultTheme: {
      height: 'fit-content',
    },
  },
});

const Title = CSSComponent({
  tag: 'div',
  className: 'CardTipTitle',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { font } = themeMeta;
      const {
        propsConfig: { type },
      } = themeProps;
      const weight = font && font.weight ? font.weight : type === 'tip' ? 700 : 500;
      return {
        font: {
          weight,
        },
      };
    },
    defaultTheme: {
      fontSize: 16,
      width: '100%',
      color: blackColor,
    },
  },
  css: css`
    display: inline-block;
    flex: 1;
  `,
});

const TitleHeadContainer = CSSComponent({
  tag: 'div',
  className: 'CardTitleTipLineContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['padding'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
    ],
    defaultTheme: {
      width: '100%',
      borderRadius: {
        topLeft: 5,
        topRight: 5,
      },
      padding: {
        top: 10,
      },
    },
    getCSS(themeMeta, themeProps) {
      const {
        propsConfig: { __lugiad__header__absolute__ },
      } = themeProps;
      const positionCSS = getPositionCSS(__lugiad__header__absolute__);
      return `${positionCSS}`;
    },
  },
  css: css`
    display: flex;
    flex-direction: column;
  `,
});
const TitleTipContainer = StaticComponent({
  tag: 'div',
  className: 'CardTitleTipContainer',
  css: css`
    width: 100%;
    display: inline-flex;
    flex: 1;
    align-items: center;
  `,
});
const TitleTipLine = CSSComponent({
  tag: 'div',
  className: 'CardTitleTipLine',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['lineHeight'],
      ['margin', 'left'],
      ['margin', 'right'],
    ],
    defaultTheme: {
      height: 20,
      width: 5,
      background: {
        color: themeColor,
      },
      borderRadius: getBorderRadius(5),
      margin: {
        left: 5,
        right: 10,
      },
    },
  },
});
const TitleBottomLine = CSSComponent({
  tag: 'div',
  className: 'CardTipBottomLine',
  normal: {
    selectNames: [['width'], ['border', 'bottom'], ['margin']],
    defaultTheme: {
      height: 1,
      width: '100%',
      margin: {
        top: 10,
      },
    },
    getCSS(themeMeta, themeProps) {
      const { border: { bottom: { width } = {} } = {} } = themeMeta;
      return `height:${px2remcss(width)}`;
    },
  },
});
const Description = CSSComponent({
  tag: 'div',
  className: 'cardDescription',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize'], ['background']],
    defaultTheme: {
      fontSize: 14,
      color: darkGreyColor,
    },
  },
  css: css`
    text-align: inherit;
  `,
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
    showTipBottomLine: false,
  };

  constructor(props: CardProps) {
    super(props);
  }
  static getDerivedStateFromProps(nextProps, prevState) {}

  render() {
    const { type, imageOrientation, minHeight } = this.props;
    let resultTheme;
    const hCard = isHorizontal(imageOrientation);
    switch (type) {
      case 'avatar':
        const avatarWidth = hCard ? 320 : 150;
        const avatarHeight = hCard ? 116 : 190;
        const avatarThemeProps = {
          themeConfig: { normal: { width: avatarWidth, height: avatarHeight } },
        };
        resultTheme = avatarThemeProps;
        break;
      case 'image':
        const imageWidth = hCard ? 320 : 200;
        const imageHeight = hCard ? 112 : 230;
        const imageThemeProps = {
          themeConfig: { normal: { width: imageWidth, height: imageHeight } },
        };
        resultTheme = imageThemeProps;
        break;
      case 'combo':
      case 'simple':
      default:
        break;
    }
    const defaultTheme = {
      themeConfig: { normal: { boxShadow: get('normalBoxShadow') } },
    };
    resultTheme = deepMerge(
      defaultTheme,
      resultTheme,
      this.props.getPartOfThemeProps('Container', { props: { type, imageOrientation, minHeight } })
    );
    const { operation, title, description, content, children } = this.props;
    const hasChildren = operation || title || description || content || children;
    if (type === 'transparent') {
      return (
        <CardOutContainer
          themeProps={this.props.getPartOfThemeProps('Container', {
            props: { type },
          })}
        >
          {children}
        </CardOutContainer>
      );
    }
    if (type === 'responsive') {
      return (
        <CardOutContainer
          themeProps={this.props.getPartOfThemeProps('Container', {
            props: { type },
          })}
        >
          <ResponsiveContainer>{children}</ResponsiveContainer>
        </CardOutContainer>
      );
    }
    return (
      <CardOutContainer themeProps={resultTheme}>
        {hasChildren ? (
          [this.getDetails('operation'), this.getImageContainer(), this.getInnerContent()]
        ) : (
          <DefaultChildren />
        )}
      </CardOutContainer>
    );
  }

  getInnerContent() {
    const { type, imageOrientation, content } = this.props;

    const cardContentTheme = this.props.getPartOfThemeProps('CardContent', {
      props: { type },
    });

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

  getTitleTipContainer() {
    const { title, type, getPartOfThemeProps, __lugiad__header__absolute__ } = this.props;
    const TitleCmp = this.getDetails('title');
    if (title && type === 'tip') {
      return (
        <TitleHeadContainer
          themeProps={getPartOfThemeProps('CardTitleHeadContainer', {
            props: { __lugiad__header__absolute__ },
          })}
        >
          <TitleTipContainer>
            <TitleTipLine themeProps={getPartOfThemeProps('CardTitleTipLine')} />
            {TitleCmp}
          </TitleTipContainer>
          {this.getTitleBottomLine()}
        </TitleHeadContainer>
      );
    }
    return TitleCmp;
  }

  getTitleBottomLine() {
    const { showTipBottomLine } = this.props;
    const defaultTheme = () => ({
      themeConfig: {
        normal: {
          border: {
            bottom: {
              style: 'solid',
              width: 1,
              color: get('borderColor'),
            },
          },
        },
      },
    });
    if (showTipBottomLine) {
      return (
        <TitleBottomLine
          themeProps={deepMerge(
            defaultTheme(),
            this.props.getPartOfThemeProps('CardTipBottomLine')
          )}
        />
      );
    }
  }

  getImageContainer() {
    const { type, imageOrientation } = this.props;

    const avatarContainerThemeProps = this.props.getPartOfThemeProps('CardAvatar', {
      props: {
        imageOrientation,
      },
    });
    const imageContainerThemeProps = this.props.getPartOfThemeProps('CardImage', {
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

  getPaddingByType(type: string, position: string, imageOrientation: ImageOrientation) {
    let left = 0;
    let top = 0;
    let bottom = 0;

    if (type === 'tip') {
      switch (position) {
        case 'description':
          left = 16;
          break;
        case 'title':
        default:
          left = paddingToText;
          break;
      }
    } else {
      left = 12;
    }
    switch (position) {
      case 'content':
        top = 16;
        bottom = 10;
        break;
      case 'description':
        top = 14;
        bottom = 10;
        break;
      case 'title':
        top = 14;
        break;
      default:
        top = 0;
        break;
    }
    return {
      padding: {
        left,
        top,
        right: 12,
        bottom,
      },
    };
  }

  getThemeNormalConfig(normalConfig: Object) {
    return { themeConfig: { normal: normalConfig } };
  }

  getDetails(information: string): React.Node | null {
    const {
      operation,
      title,
      description,
      content,
      children,
      type,
      imageOrientation,
      __lugiad__header__absolute__,
    } = this.props;
    const hasNoContent = !(content && children);

    switch (information) {
      case 'operation':
        const operationThemeProps = this.props.getPartOfThemeProps('CardOperation');
        return hasNoContent && operation ? (
          <Operation themeProps={operationThemeProps}>{operation}</Operation>
        ) : null;
      case 'title':
        const titleThemeProps = deepMerge(
          this.getThemeNormalConfig(this.getPaddingByType(type, 'title', imageOrientation)),
          this.props.getPartOfThemeProps('CardTitle', {
            props: { type, __lugiad__header__absolute__ },
          })
        );
        return title ? this.getTitle(titleThemeProps) : null;
      case 'description':
        const descriptionThemeProps = deepMerge(
          this.getThemeNormalConfig(this.getPaddingByType(type, 'description', imageOrientation)),
          this.props.getPartOfThemeProps('CardDescription', {
            props: { type },
          })
        );
        return description ? (
          <TextContainer themeProps={descriptionThemeProps}>
            <Description themeProps={descriptionThemeProps}>{description} </Description>
          </TextContainer>
        ) : null;
      default:
        return null;
    }
  }

  getTitle(titleThemeProps) {
    const { title, type } = this.props;
    const TitleCmp = <Title themeProps={titleThemeProps}>{title}</Title>;
    if (type === 'tip') {
      return <TitleContainer themeProps={titleThemeProps}>{TitleCmp}</TitleContainer>;
    }
    return <TextContainer themeProps={titleThemeProps}>{TitleCmp}</TextContainer>;
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
                return 'background-color: transparent;';
              },
              getThemeMeta(themeMeta: Object, themeProps: Object) {
                const { propsConfig } = themeProps;
                const { imageOrientation } = propsConfig;
                const left = isHorizontal(imageOrientation) ? 20 : 0;
                return {
                  width: 60,
                  height: 60,
                  margin: {
                    left,
                    top: 10,
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
