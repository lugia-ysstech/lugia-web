import React, { Component } from 'react';
import Icon from '../../icon';
import Theme from '../../theme';
import Widget from '../../consts/index';

class Suffix extends Component {
  state = {
    isEnter: false,
  };

  clearBtn = () => {
    const { onClear, clearButtonTheme } = this.props;
    return (
      <Theme
        config={{
          [Widget.Icon]: {
            Icon: {
              disabled: {
                color: '#ddd',
              },
              ...clearButtonTheme.themeConfig,
            },
          },
        }}
      >
        <Icon
          iconClass={'lugia-icon-reminder_close'}
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
