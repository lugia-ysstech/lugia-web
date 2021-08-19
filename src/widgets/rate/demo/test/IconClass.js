import React from 'react';
import Rate from '../../index';

export default class IconClass extends React.Component<any, any> {
  render() {
    return (
      <Rate
        classify={true}
        iconClass={{
          default: 'lugia-icon-financial_sad',
          danger: 'lugia-icon-financial_smile ',
          amazed: 'lugia-icon-financial_meh',
        }}
      />
    );
  }
}
