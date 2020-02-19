import React from 'react';
import symbolSvg from '../css/font/lugia-symbol-icon.symbol.svg';
export default function Svg(props) {
  const { iconClass = 'lugia-symbol-icon-symbol_autohotkey' } = props;
  return (
    <svg className="icon" ariaHidden="true" viewBox="0 0 48 48">
      <use href={`${symbolSvg}#${iconClass}`} />
    </svg>
  );
}
