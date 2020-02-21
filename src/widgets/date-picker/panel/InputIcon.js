import React from 'react';
import Icon from '../../icon';
import styled from 'styled-components';
import Theme from '../../theme';
import Widget from '../../consts/index';
const IconWrap = styled.div`
  &:hover {
    & > span:first-child {
      display: none;
    }

    & > span :last-child {
      display: block;
    }
  }
  & > span:last-child {
    display: none;
  }
`;

export default function getDateIcon(props) {
  const { suffix, prefix = 'lugia-icon-financial_date', onClear, value, clearButtonTheme } = props;
  const clearBtn = (
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
  const suffixIcon =
    suffix && typeof suffix === 'string' ? (
      <IconWrap>
        <span>
          <Icon iconClass={suffix} />
        </span>
        <span>{clearBtn}</span>
      </IconWrap>
    ) : value ? (
      clearBtn
    ) : (
      <i />
    );

  const prefixIcon =
    !suffix && prefix && typeof prefix === 'string' ? <Icon iconClass={prefix} /> : <i />;

  return {
    suffixIcon: { suffix: suffixIcon },
    prefixIcon: { prefix: prefixIcon },
  };
}
