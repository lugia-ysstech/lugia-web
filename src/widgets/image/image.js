import ThemeProvider from '../theme-provider';
import type { ImageTypeProps } from '../css/image';
import { ImageContainer, BackgroundImgContainer } from '../css/image';
import * as React from 'react';

import Widget from '../consts';

class Image extends React.Component<ImageTypeProps> {
  render() {
    const { title, src, isBackground = false, children, alt } = this.props;

    const themeProps = this.props.getPartOfThemeProps('Container', {
      props: { isBackground, src },
    });
    return isBackground ? (
      <BackgroundImgContainer title={title} themeProps={themeProps}>
        {children}
      </BackgroundImgContainer>
    ) : (
      <ImageContainer src={src} alt={alt} title={title} themeProps={themeProps} />
    );
  }
}

export default ThemeProvider(Image, Widget.Image);
