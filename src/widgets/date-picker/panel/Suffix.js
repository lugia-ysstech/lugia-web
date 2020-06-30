import React, { Component } from 'react';
import Icon from '../../icon';
import Theme from '../../theme';
import Widget from '../../consts/index';

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
    const { suffix, value } = this.props;
    const { isEnter } = this.state;
    return (
      <React.Fragment>
        {suffix && typeof suffix === 'string' ? (
          <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            {isEnter ? (
              <span>{this.clearBtn()}</span>
            ) : (
              <span>
                <Icon iconClass={suffix} />
              </span>
            )}
          </div>
        ) : value ? (
          this.clearBtn()
        ) : (
          <i />
        )}
      </React.Fragment>
    );
  }
}

export default Suffix;
