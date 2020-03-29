//@flow
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import { deepMerge } from '@lugia/object-utils';
import type { TableProps } from './tableCss';
import { Container, LugiaTable, customBlock, Tr, Td, NoData, TBody, THead } from './tableCss';
import Widget from '../consts';

class Table extends React.Component<TableProps, Object> {
  defaultProps = {
    tableSize: 'middle',
    tableStyle: 'linear',
  };

  render() {
    const { data = [], columns = [], title, footer, showHeader = true, tableSize } = this.props;
    const containerTheme = this.props.getPartOfThemeProps('Container');
    const titleTheme = this.props.getPartOfThemeProps('Title');
    const footerTheme = this.props.getPartOfThemeProps('Footer');
    const tableTheme = this.props.getPartOfThemeProps('TableTheme');
    const emptyDataTheme = this.props.getPartOfThemeProps('EmptyData', { props: { tableSize } });
    return (
      <Container themeProps={containerTheme} tabIndex={10}>
        {title ? <customBlock themeProps={titleTheme}>{title}</customBlock> : null}
        <LugiaTable themeProps={tableTheme}>
          <THead>{showHeader && this.getColumns(columns)}</THead>

          <TBody>{this.getData(data)}</TBody>
        </LugiaTable>
        {data.length === 0 && <NoData themeProps={emptyDataTheme}>暂无数据</NoData>}
        {footer ? <customBlock themeProps={footerTheme}>{footer}</customBlock> : null}
      </Container>
    );
  }

  getColumns = columns => {
    const { tableSize = 'middle', tableStyle = 'linear' } = this.props;
    const trTheme = this.props.getPartOfThemeProps('Tr', { props: { tableStyle } });

    return (
      <Tr themeProps={trTheme}>
        {columns.map((item: Object) => {
          const { title, width, align = 'center', ellipsis } = item;
          const tdTheme = this.props.getPartOfThemeProps('Td', {
            props: { align, ellipsis, tableSize, tableStyle },
          });
          return <Td themeProps={this.getTdThemeWithWidth(tdTheme, width)}>{title}</Td>;
        })}
      </Tr>
    );
  };

  getData = data => {
    const { columns = [], tableSize = 'middle', tableStyle = 'linear' } = this.props;
    const trTheme = this.props.getPartOfThemeProps('Tr', { props: { tableStyle } });
    return data.map((item, index) => {
      return (
        <Tr themeProps={trTheme}>
          {columns.map(column => {
            const { dataIndex, render, align, ellipsis, width } = column;

            const tdTheme = this.props.getPartOfThemeProps('Td', {
              props: { align, ellipsis, tableSize, tableStyle },
            });
            return (
              <Td themeProps={this.getTdThemeWithWidth(tdTheme, width)}>
                {render ? render(item[dataIndex], item, index) : item[dataIndex]}
              </Td>
            );
          })}
        </Tr>
      );
    });
  };

  getTdThemeWithWidth = (theme: Object, width) => {
    const tdTheme = {
      themeConfig: {
        normal: {
          width,
        },
      },
    };
    return deepMerge(theme, tdTheme);
  };
}

export default ThemeProvider(Table, Widget.Table);
