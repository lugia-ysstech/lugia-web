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
import CommonIcon from '../icon';
import { TagContainer, ItemText, CloseButton } from '../css/tag';

type TagProps = {
  closeable?: boolean,
  children: any,
  onClick?: Function,
  onCloseClick?: Function,
  shape: string,
  getTheme: Function,
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
    shape: 'basic',
    type: 'customs',
  };
  constructor(props: TagProps) {
    super(props);
    this.state = {
      isClose: false,
    };
  }

  render() {
    const { isClose } = this.state;
    const { type, className, getTheme, shape, closeable = true } = this.props;
    const Theme = getTheme();
    return (
      <TagContainer
        className={className}
        closeable={closeable}
        onClick={this.onClick}
        shape={shape}
        isClose={isClose}
        type={type}
        Theme={Theme}
      >
        <ItemText innerRef={cmp => (this.itemText = cmp)}>{this.props.children}</ItemText>
        {closeable ? (
          <CloseButton>
            <CommonIcon
              iconClass="lugia-icon-reminder_close"
              onClick={this.onCloseClick.bind(this)}
            />
          </CloseButton>
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
      onClose && onClose();
    }, 150);
  }

  onClick = () => {
    const { onClick } = this.props;
    onClick && onClick();
  };
}

export default ThemeProvider(Tag, Widget.Tag);
