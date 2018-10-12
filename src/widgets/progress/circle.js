/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import styled from 'styled-components';
import { handlePercent } from '../css/progress-line';

export default class extends React.Component<any, any> {
  render() {
    const { percent = 0 } = this.props;
    return (
      <div>
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r="60" strokeWidth="8" stroke="#f2f2f2" fill="none" />
          <circle
            cx="65"
            cy="65"
            r="60"
            strokeWidth="8"
            stroke={handlePercent(percent) ? '#684fff' : '#f2f2f2'}
            fill="none"
            transform="matrix(0,-1,1,0,0,130)"
            strokeLinecap="round"
            strokeDasharray={`${(handlePercent(percent) / 100) * 378} 378`}
            style={{ transition: 'all .3s' }}
          />
          <text x="65" y="75" textAnchor="middle" fontSize="24px" lengthAdjust="spacingAndGlyphs">
            40
          </text>
        </svg>
      </div>
    );
  }
}
