/**
 * 标签输入框
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Widget from '../consts/index';
import ThemeHoc from '@lugia/theme-hoc';
import Icon from '../icon';
import { deepMerge } from '@lugia/object-utils';
import { ItemContainer, ItemText, ItemWrap, FontSize } from '../css/inputtag';
import colorsFunc from '../css/stateColor';
export const { mediumGreyColor } = colorsFunc();

type ItemProps = {
  className?: string,
  closeable?: boolean,
  children: any,
  onClick?: Function,
  onCloseClick?: Function,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
};

type ItemState = {};
class ItemTag extends React.Component<ItemProps, ItemState> {
  list: Object;
  item: ?HTMLElement;
  width: number;
  static displayName = Widget.InputTagItem;
  render() {
    const { className, closeable = true, onClick, onCloseClick, getPartOfThemeProps } = this.props;
    const TagWrapThemeProps = getPartOfThemeProps('TagWrap');
    return (
      <ItemWrap>
        <ItemContainer
          ref={c => (this.item = c)}
          themeProps={TagWrapThemeProps}
          className={className}
          closeable={closeable}
          onClick={onClick}
        >
          <ItemText themeProps={TagWrapThemeProps}>{this.props.children}</ItemText>
          {closeable ? (
            <Icon
              iconClass="lugia-icon-reminder_close_circle"
              {...this.getIconTheme()}
              singleTheme
              onClick={onCloseClick}
            />
          ) : null}
        </ItemContainer>
      </ItemWrap>
    );
  }

  getIconTheme() {
    const { viewClass, theme } = this.props.getPartOfThemeHocProps('TagIcon');
    const defaultIconTheme = {
      normal: {
        color: mediumGreyColor,
        font: {
          size: FontSize,
        },
        getCSS: () => {
          return `
          transition: all 0.3s
          `;
        },
      },
    };

    return {
      viewClass,
      theme: deepMerge(
        {
          [viewClass]: { ...defaultIconTheme },
        },
        theme
      ),
    };
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
