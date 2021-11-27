import React, { Component } from 'react';
import Icon from '../../icon';
import Theme from '../../theme';
import Widget from '../../consts/index';
import CSSComponent from '@lugia/theme-css-hoc';

const IconWrap = CSSComponent({
  tag: 'div',
  className: 'IconWrap',
  normal: {
    selectNames: [],
    getStyle(themeMeta) {
      const { font: { size } = {}, fontSize } = themeMeta;
      const iconSize = size || fontSize;
      return { width: iconSize, height: iconSize };
    },
  },
  hover: { selectNames: [] },
  active: { selectNames: [] },
  focus: { selectNames: [] },
  disabled: { selectNames: [] },
  css: `
      display: flex;
  `,
});

class Suffix extends Component {
  state = {
    isEnter: false,
  };

  clearBtn = () => {
    const { onClear, clearButtonTheme, clearIcon = 'lugia-icon-reminder_close' } = this.props;
    const { themeConfig: { normal = {} } = {} } = clearButtonTheme;
    const { margin, padding } = normal;
    if (margin) {
      delete normal.margin;
    }
    if (padding) {
      delete normal.padding;
    }
    return (
      <Theme
        config={{
          [Widget.Icon]: {
            Icon: {
              ...clearButtonTheme.themeConfig,
            },
          },
        }}
      >
        <Icon
          iconClass={clearIcon}
          onClick={e => {
            onClear(e);
          }}
        />
      </Theme>
    );
  };

  onMouseEnter = () => {
    this.setState({ isEnter: true });
  };
  onMouseLeave = () => {
    this.setState({ isEnter: false });
  };
  render() {
    const { suffix, value, canClear, clearButtonTheme } = this.props;
    const { isEnter } = this.state;
    return (
      <React.Fragment>
        {suffix && typeof suffix === 'string' ? (
          <IconWrap
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            themeProps={clearButtonTheme}
          >
            {isEnter && canClear ? this.clearBtn() : <Icon iconClass={suffix} />}
          </IconWrap>
        ) : value && canClear ? (
          <IconWrap themeProps={clearButtonTheme}>{this.clearBtn()}</IconWrap>
        ) : (
          <IconWrap themeProps={clearButtonTheme}>
            <i />
          </IconWrap>
        )}
      </React.Fragment>
    );
  }
}

export default Suffix;
