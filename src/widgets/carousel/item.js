import React, { ReactNode } from 'react';
import { ItemWrap } from '../css/carousel';

type CarouselItemProps = {
  themeProps: object,
  children: ReactNode,
};

const CarouselItem = (props: { themeProps: object, children: ReactNode }) => {
  const { children, themeProps } = props;
  return <ItemWrap themeProps={themeProps}>{children}</ItemWrap>;
};

function areEqual(preProps: CarouselItemProps, nextProps: CarouselItemProps) {
  const { themeProps } = preProps;
  const { themeProps: nextThemeProps } = nextProps;
  return !(JSON.stringify(themeProps) !== JSON.stringify(nextThemeProps));
}
export default React.memo(CarouselItem, areEqual);
