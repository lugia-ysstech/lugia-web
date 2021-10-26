import React from 'react';
import { deepMerge } from '@lugia/object-utils';
import { defaultPaginationTheme, PaginationListItem, PaginationListItemText } from './pagination';

export default class PageItem extends React.Component<any> {
  paginationItemRef = React.createRef();
  paginationItemTextRef = React.createRef();
  state = {
    isOverflow: false,
  };

  getIsOverFlow() {
    if (this.paginationItemRef && this.paginationItemRef.current) {
      this.itemWidth = this.paginationItemRef.current.offsetWidth;
    }
    if (this.paginationItemTextRef && this.paginationItemTextRef.current) {
      this.itemTextWidth = this.paginationItemTextRef.current.offsetWidth;
    }
    return this.itemWidth && this.itemTextWidth && this.itemTextWidth >= this.itemWidth;
  }

  componentDidMount() {
    const isOverflow = this.getIsOverFlow();
    this.setState({ isOverflow });
  }

  render() {
    const {
      createEventChannel,
      getPartOfThemeProps,
      size,
      isSelected,
      index,
      pageNumber,
      changePage,
    } = this.props;
    const { isOverflow } = this.state;
    const channel = createEventChannel(['active', 'hover']);
    const theThemeProps = deepMerge(
      defaultPaginationTheme(),
      getPartOfThemeProps('PaginationListItem', {
        props: { size, isOverflow, pageNumber },
      })
    );
    theThemeProps.themeState.focus = isSelected;
    return (
      <PaginationListItem
        {...channel.provider}
        onClick={changePage && changePage(index)}
        themeProps={theThemeProps}
        ref={this.paginationItemRef}
      >
        <PaginationListItemText
          lugiaConsumers={channel.consumer}
          themeProps={theThemeProps}
          ref={this.paginationItemTextRef}
        >
          {pageNumber}
        </PaginationListItemText>
      </PaginationListItem>
    );
  }
}
