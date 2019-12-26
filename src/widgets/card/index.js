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
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
import { deepMerge } from '@lugia/object-utils';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';

const { px2remcss } = units;
const { darkGreyColor, lightGreyColor, defaultColor, themeColor, superLightColor } = colorsFunc();

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
      const {
        propsConfig: { imageOrientation, type },
      } = themeProps;
      const textAlign = type === 'avatar' && !isHorizontal(imageOrientation) ? 'center' : '';
      const flexDirection = !isHorizontal(imageOrientation) ? 'column' : 'row';
      return `
        text-align:${textAlign};
        flex-direction:${flexDirection};`;
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { type },
      } = themeProps;
      if (type === 'transparent') {
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
    min-width: ${px2remcss(50)};
    min-height: ${px2remcss(20)};
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
    getCSS(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { imageOrientation, type },
      } = themeProps;
      const vCard = !isHorizontal(imageOrientation);
      const textAlign = type === 'avatar' && vCard ? 'center' : '';
      const flexDirection = vCard ? 'column' : 'row';
      return `text-align:${textAlign};flex-direction:${flexDirection};`;
    },
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
    getCSS(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { imageOrientation, type },
      } = themeProps;
      const vCard = !isHorizontal(imageOrientation);
      const textAlign = type === 'avatar' && vCard ? 'center' : '';
      const flexDirection = vCard ? 'column' : 'row';
      return `text-align:${textAlign};flex-direction:${flexDirection};`;
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
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { imageOrientation, type } = propsConfig;
      const vCard = !isHorizontal(imageOrientation);
      const textAlign = type === 'avatar' && vCard ? 'center' : '';
      const flexDirection = vCard ? 'column' : 'row';
      return `text-align:${textAlign};flex-direction:${flexDirection};`;
    },
    defaultTheme: {
      fontSize: 16,
      width: '100%',
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
      ['height'],
      ['background'],
      ['padding'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
    ],
    defaultTheme: {
      padding: {
        top: 10,
      },
      borderRadius: {
        topLeft: 5,
        topRight: 5,
      },
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
      border: {
        bottom: {
          style: 'solid',
          width: 1,
          color: superLightColor,
        },
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
    const { type, imageOrientation } = this.props;
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
    resultTheme = deepMerge(
      resultTheme,
      this.props.getPartOfThemeProps('Container', { props: { type, imageOrientation } })
    );
    const { operation, title, description, content, children } = this.props;
    const hasChildren = operation || title || description || content || children;
    return (
      <CardOutContainer themeProps={resultTheme} type={type} imageOrientation={imageOrientation}>
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
    const { title, type, getPartOfThemeProps } = this.props;
    const TitleCmp = this.getDetails('title');
    if (title && type === 'tip') {
      return (
        <TitleHeadContainer themeProps={getPartOfThemeProps('CardTitleHeadContainer')}>
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
    if (showTipBottomLine) {
      return <TitleBottomLine themeProps={this.props.getPartOfThemeProps('CardTipBottomLine')} />;
    }
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

  getPaddingByType(type: string, position: string, imageOrientation: ImageOrientation) {
    let left = 0;
    let top = 0;
    if (type === 'avatar' && !isHorizontal(imageOrientation)) {
      left = 0;
    } else if (type === 'tip') {
      switch (position) {
        case 'description':
          left = 16;
          break;
        case 'title':
        default:
          left = 10;
          break;
      }
    } else {
      left = 10;
    }
    switch (position) {
      case 'content':
        top = 16;
        break;
      case 'description':
        top = 14;
        break;
      case 'title':
        top = 13;
        break;
      default:
        top = 0;
        break;
    }
    return {
      padding: {
        left,
        top,
        right: 10,
      },
    };
  }

  getThemeNormalConfig(normalConfig: Object) {
    return { themeConfig: { normal: normalConfig } };
  }

  getDetails(information: string): React.Node | null {
    const { operation, title, description, content, children, type, imageOrientation } = this.props;
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
          this.props.getPartOfThemeProps('CardTitle', { props: { type } })
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
