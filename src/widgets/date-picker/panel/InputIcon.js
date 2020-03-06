import React from 'react';
import Icon from '../../icon';
import Suffix from './Suffix';

export default function getDateIcon(props) {
  const { suffix, prefix = 'lugia-icon-financial_date' } = props;

  const prefixIcon =
    !suffix && prefix && typeof prefix === 'string' ? <Icon iconClass={prefix} /> : <i />;

  return {
    suffixIcon: { suffix: <Suffix {...props} /> },
    prefixIcon: { prefix: prefixIcon },
  };
}
