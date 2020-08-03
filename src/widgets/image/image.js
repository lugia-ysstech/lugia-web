import ThemeProvider from '../theme-provider';
import type { ImageTypeProps } from '../css/image';
import { ImageContainer } from '../css/image';
import * as React from 'react';

import Widget from '../consts';

class Image extends React.Component<ImageTypeProps> {
  render() {
    const { title, src, height, width, isBackground = false, children, disabled, alt } = this.props;

    const themeProps = this.props.getPartOfThemeProps('Container', {
      props: { isBackground, src, height, width },
    });
    return isBackground === true ? (
      <ImageContainer themeProps={themeProps} disabled={disabled}>
        {children}
      </ImageContainer>
    ) : (
      <img src={src} alt={alt} title={title} height={height} width={width} />
    );
  }
}

export default ThemeProvider(Image, Widget.Image);
