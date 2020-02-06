/**
 * 标签tag
 * create by szfeng
 *
 * @flow
 */

import React from 'react';
import Widget from '../consts/index';
import ThemeHoc from '@lugia/theme-hoc';
import Icon from '../icon';
import { deepMerge } from '@lugia/object-utils';
import { TagWrap, OptionalWrap, ItemText, CloseButtonWrap, FlexBox } from '../css/tag';

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
  text: String,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
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

  render() {
    const { isClose, checked } = this.state;
    const { getPartOfThemeProps, type, shape, closable = false } = this.props;

    const params = {
      shape,
      type,
      isClose,
      closable,
      checked,
    };

    const themeProps =
      type === 'optional' && checked
        ? getPartOfThemeProps('CheckedTagWrap', { props: params })
        : getPartOfThemeProps('TagWrap', { props: params });

    const value = this.getValue();
    return type === 'optional' ? (
      <OptionalWrap onClick={this.onClick} themeProps={themeProps}>
        <FlexBox>
          <ItemText themeProps={themeProps} ref={cmp => (this.itemText = cmp)} type={type}>
            {value}
          </ItemText>
        </FlexBox>
      </OptionalWrap>
    ) : (
      <TagWrap onClick={this.onClick} themeProps={themeProps}>
        <FlexBox>
          <ItemText themeProps={themeProps} ref={cmp => (this.itemText = cmp)} type={type}>
            {value}
          </ItemText>

          {closable ? (
            <Icon
              {...this.getCloseTheme('CloseButton')}
              singleTheme
              iconClass="lugia-icon-reminder_close"
              onClick={this.onCloseClick.bind(this)}
            />
          ) : null}
        </FlexBox>
      </TagWrap>
    );
  }

  getValue = () => {
    const { text, children } = this.props;
    if (text) {
      return text.toString();
    }
    if (children) {
      return children;
    }
    return 'Tag';
  };

  getCloseTheme = (target: string) => {
    const { getPartOfThemeHocProps } = this.props;
    const { viewClass, theme } = getPartOfThemeHocProps(target);
    const { normal = {}, hover = {} } = theme[viewClass];
    normal.margin = {};
    normal.padding = {};
    hover.margin = {};
    const iconTheme = deepMerge(
      {
        [viewClass]: {
          normal: {
            font: { size: 16 },
            margin: {
              left: 5,
            },
          },
        },
      },
      theme
    );

    return {
      viewClass,
      theme: iconTheme,
    };
  };

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
