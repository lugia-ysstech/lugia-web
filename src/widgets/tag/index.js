/**
 * 标签tag
 * create by szfeng
 *
 * @flow
 */

import React from 'react';
import '../css/sv.css';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import { TagContainer, ItemText, CloseButtonWrap, CloseButton } from '../css/tag';

type shapeType = 'basic' | 'round';
type styleType = 'customs' | 'primary' | 'basic' | 'presets';
type TagProps = {
  closeable?: boolean,
  children: any,
  onClick?: Function,
  onClose?: Function,
  shape: shapeType,
  getTheme: Function,
  type: styleType,
};

type TagState = {
  isClose: boolean,
};

class Tag extends React.Component<TagProps, TagState> {
  static displayName = Widget.Tag;
  static defaultProps = {
    getTheme: () => {
      return {};
    },
    closeable: true,
    shape: 'basic',
    type: 'customs',
  };
  constructor(props: TagProps) {
    super(props);
    this.state = {
      isClose: false,
    };
  }

  itemText: Object;
  render() {
    const { isClose } = this.state;
    const { type, getTheme, shape, closeable = true, children } = this.props;
    const Theme = getTheme();
    return (
      <TagContainer
        closeable={closeable}
        onClick={this.onClick}
        shape={shape}
        isClose={isClose}
        type={type}
        Theme={Theme}
      >
        <ItemText innerRef={cmp => (this.itemText = cmp)}>{children}</ItemText>
        {closeable ? (
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
    const { onClick } = this.props;
    onClick && onClick(e);
  };
}

export default ThemeProvider(Tag, Widget.Tag);
