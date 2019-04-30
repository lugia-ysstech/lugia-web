/**
 * 标签tag
 * create by szfeng
 *
 * @flow
 */

import React from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import { TagContainer, ItemText, CloseButtonWrap, CloseButton } from '../css/tag';

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
    const { type, getTheme, shape, closable = false, children } = this.props;
    const Theme = getTheme();
    return (
      <TagContainer
        closable={closable}
        checked={checked}
        onClick={this.onClick}
        shape={shape}
        isClose={isClose}
        type={type}
        Theme={Theme}
      >
        <ItemText ref={cmp => (this.itemText = cmp)} type={type}>
          {children}
        </ItemText>
        {closable ? (
          <CloseButtonWrap>
            <CloseButton
              iconClass="lugia-icon-reminder_close"
              onClick={this.onCloseClick.bind(this)}
            />
          </CloseButtonWrap>
        ) : null}
      </TagContainer>
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

export default ThemeProvider(Tag, Widget.Tag);
