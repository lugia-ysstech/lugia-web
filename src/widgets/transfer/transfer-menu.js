/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import Menu from '../menu';
import Input from '../input';
import Theme from '../theme';
import SearchIcon from '../icon/SearchIcon';
import type { TransferMenuProps, TransferMenuState } from '../css/transfer-menu';

export default class TransferMenu extends React.Component<TransferMenuProps, TransferMenuState> {
  constructor(props: TransferMenuProps) {
    super(props);
    const { data = [] } = props;
  }
  render() {
    return <Menu />;
  }
}
