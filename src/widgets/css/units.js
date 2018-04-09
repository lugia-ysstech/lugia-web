/**
 *
 * create by ligx
 *
 * @flow
 */
type UnitType = 'px' | 'rem' | '%' | 'em';


class Unit extends Number {
  value: number;
  type: UnitType;
  constructor (value: number, type: UnitType) {
    super(value);
    this.value = value;
    this.type = type;
  }

  toString () {
    return `${Number(this.value)}${this.type}`;
  }
}


export function px (value: number): any {
  return new Unit(value, 'px');
}

export function rem (value: number): any {
  return new Unit(value, 'rem');
}

export function em (value: number): any {
  return new Unit(value, 'em');
}

export function percent (value: number): any {
  return new Unit(value, '%');
}
