/**
 * 标签输入框
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Widget from '../consts/index';
import ThemeHoc from '@lugia/theme-hoc';

import { ItemContainer, ItemText, CloseButtonWrap, ItemWrap, CloseButton } from '../css/inputtag';

type ItemProps = {
  className?: string,
  closeable?: boolean,
  children: any,
  onClick?: Function,
  onCloseClick?: Function,
};

type ItemState = {};
class ItemTag extends React.Component<ItemProps, ItemState> {
  list: Object;
  item: ?HTMLElement;
  width: number;
  static displayName = Widget.InputTagItem;
  render() {
    const {
      className,
      closeable = true,
      onClick,
      onCloseClick,
      getPartOfThemeHocProps,
      getPartOfThemeProps,
    } = this.props;

    const TagWrapThemeProps = getPartOfThemeProps('TagWrap');
    const { theme, viewClass } = getPartOfThemeHocProps('TagWrap');
    const { theme: IconTheme, viewClass: IconViewClass } = getPartOfThemeHocProps('TagIcon');
    return (
      <ItemWrap themeProps={TagWrapThemeProps}>
        <ItemContainer
          innerRef={c => (this.item = c)}
          theme={theme}
          viewClass={viewClass}
          className={className}
          closeable={closeable}
          onClick={onClick}
        >
          <ItemText themeProps={TagWrapThemeProps}>{this.props.children}</ItemText>
          {closeable ? (
            <CloseButtonWrap theme={IconTheme} viewClass={IconViewClass}>
              <CloseButton
                themeProps={TagWrapThemeProps}
                iconClass="lugia-icon-reminder_close_circle"
                onClick={onCloseClick}
              />
            </CloseButtonWrap>
          ) : null}
        </ItemContainer>
      </ItemWrap>
    );
  }

  componentDidMount() {
    this.updateWidth();
  }

  componentDidUpdate() {
    this.updateWidth();
  }

  updateWidth() {
    if (this.item) {
      this.width = this.item.offsetWidth;
    }
  }

  getWidth(): number {
    return this.width;
  }
}
export default ThemeHoc(ItemTag, 'ItemTag', { hover: true, active: false });
