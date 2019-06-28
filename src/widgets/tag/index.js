/**
 * 标签tag
 * create by szfeng
 *
 * @flow
 */

import React from 'react';
import Widget from '../consts/index';
import ThemeHoc from '@lugia/theme-hoc';
import { TagWrap, OptionalWrap, ItemText, CloseButtonWrap, CloseButton } from '../css/tag';
import { deepMerge } from '@lugia/object-utils';

type shapeType = 'basic' | 'round';
type styleType = 'customs' | 'primary' | 'basic' | 'presets' | 'optional';
type TagProps = {
  closable?: boolean,
  checked: boolean,
  children: any,
  onClick?: Function,
  onClose?: Function,
  shape: shapeType,
  getTheme: Function,
  type: styleType,
  themeProps: Object,
};

type TagState = {
  isClose: boolean,
  checked: boolean,
};

const getChecked = (props: TagProps, state: any) => {
  const isCheckedInProps = 'checked' in props;
  if (isCheckedInProps) {
    return props.checked;
  }

  return state ? state.checked : false;
};

class Tag extends React.Component<TagProps, TagState> {
  static displayName = Widget.Tag;
  static defaultProps = {
    getTheme: () => {
      return {};
    },
    closable: false,
    shape: 'basic',
    type: 'customs',
  };
  constructor(props: TagProps) {
    super(props);

    this.state = {
      isClose: false,
      checked: getChecked(props, null),
    };
  }

  static getDerivedStateFromProps(props: TagProps, state: TagState) {
    if (!state) {
      return {};
    }

    return {
      checked: getChecked(props, state),
    };
  }

  itemText: Object;

  mergeTheme(theme: Object, viewClass: string, params: Object) {
    theme[viewClass] = deepMerge(theme[viewClass], { propsConfig: params });
  }

  render() {
    const { isClose, checked } = this.state;
    const {
      getPartOfThemeProps,
      type,
      shape,
      closable = false,
      children,
      getPartOfThemeHocProps,
    } = this.props;
    const TagThemeProps = getPartOfThemeProps('Tag');
    const CloseThemeProps = getPartOfThemeProps('CloseButton');

    const themeHoc =
      type === 'optional' && checked
        ? getPartOfThemeHocProps('CheckedTagWrap')
        : getPartOfThemeHocProps('TagWrap');
    const { theme, viewClass } = themeHoc;
    this.mergeTheme(theme, viewClass, {
      shape,
      type,
      isClose,
      closable,
      checked,
    });

    return type === 'optional' ? (
      <OptionalWrap onClick={this.onClick} theme={theme} viewClass={viewClass}>
        <ItemText themeProps={TagThemeProps} ref={cmp => (this.itemText = cmp)} type={type}>
          {children}
        </ItemText>
      </OptionalWrap>
    ) : (
      <TagWrap onClick={this.onClick} theme={theme} viewClass={viewClass}>
        <ItemText themeProps={TagThemeProps} ref={cmp => (this.itemText = cmp)} type={type}>
          {children}
        </ItemText>
        {closable ? (
          <CloseButtonWrap themeProps={CloseThemeProps}>
            <CloseButton
              themeProps={CloseThemeProps}
              iconClass="lugia-icon-reminder_close"
              onClick={this.onCloseClick.bind(this)}
            />
          </CloseButtonWrap>
        ) : null}
      </TagWrap>
    );
  }

  onCloseClick(e) {
    e.stopPropagation();
    this.setState({
      isClose: true,
    });
    const { onClose } = this.props;
    setTimeout(() => {
      onClose && onClose(e);
    }, 150);
  }

  onClick = (e: Object) => {
    const { checked } = this.state;
    this.setState({ checked: !checked });
    const { onClick } = this.props;
    onClick && onClick(e, !checked);
  };
}

export default ThemeHoc(Tag, Widget.Tag, { hover: true, active: true });
