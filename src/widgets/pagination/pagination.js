/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import React from 'react';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';
import './style/lugia-pagination.css';
import type { MorePageType, PaginationProps, PaginationState } from '../css/pagination';
import Select from '../select';
import Input from '../input';
import Icon from '../icon';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import ThemeHoc from '../theme-provider';
import { getBorder, getBorderRadius } from '@lugia/theme-utils';
import { deepMerge } from '@lugia/object-utils';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
const { px2remcss } = units;

export const {
  themeColor,
  mediumGreyColor,
  darkGreyColor,
  blackColor,
  lightGreyColor,
  defaultColor,
} = colorsFunc();

const PaginationList = CSSComponent({
  tag: 'ul',
  className: 'PaginationList',
  normal: {
    selectNames: [['width'], ['height']],
    defaultTheme: {
      width: '100%',
    },
  },
  css: css`
    list-style: none;
    user-select: none;
  `,
});
const PaginationMoreItem = CSSComponent({
  tag: 'li',
  className: 'PaginationMoreItem',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize'], ['width'], ['height'], ['cursor']],
    defaultTheme: {
      color: lightGreyColor,
      width: 36,
      height: 36,
      cursor: 'pointer',
    },
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize']],
  },
  css: css`
    line-height: ${px2remcss(36)};
    text-align: center;
    list-style: none;
    float: left;
    margin-right: ${px2remcss(8)};
  `,
  option: { hover: true, active: true },
});
const PaginationListItem = CSSComponent({
  extend: PaginationMoreItem,
  className: 'PaginationListItem',
  normal: {
    selectNames: [['width'], ['height'], ['cursor'], ['border'], ['borderRadius']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { isSelected } = propsConfig;
      if (isSelected)
        return {
          border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
        };
    },
    defaultTheme: {
      border: getBorder({ color: lightGreyColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius(4),
      cursor: 'pointer',
      background: { color: defaultColor },
    },
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize'], ['border'], ['borderRadius']],
    defaultTheme: {
      border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
    },
  },
  option: { hover: true, active: true },
});

const PaginationListItemText = CSSComponent({
  tag: 'a',
  className: 'PaginationListItemText',
  normal: {
    selectNames: [['fontSize'], ['font'], ['color'], ['cursor'], ['opacity']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { isSelected } = propsConfig;
      if (isSelected) {
        return {
          color: themeColor,
        };
      }
      return {
        color: lightGreyColor,
      };
    },
    defaultTheme: {
      color: lightGreyColor,
      width: 36,
      height: 36,
    },
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize']],
    defaultTheme: {
      color: themeColor,
    },
  },
  option: { hover: true },
});
const PaginationListContainer = CSSComponent({
  tag: 'div',
  className: 'PaginationListContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['cursor'],
      ['padding'],
      ['opacity'],
      ['margin'],
    ],
  },
  css: css`
    display: block;
  `,
});

function computePage(pageSize: number, sPageSize: number, total: number) {
  const thePageSize = pageSize ? pageSize : sPageSize;
  return Math.floor((total - 1) / thePageSize) + 1;
}

class Pagination extends React.Component<PaginationProps, PaginationState> {
  static displayName = 'Pagination';
  static defaultProps = {
    defaultCurrent: 1,
    defaultPageSize: 10,
  };

  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(props: PaginationProps, state: PaginationState) {
    let theCurrent = state ? state.current : props.defaultCurrent;
    let thePageSize = state ? state.pageSize : props.defaultPageSize;
    if ('current' in props) {
      theCurrent = props.current;
    }
    if ('pageSize' in props && props.pageSize !== state.pageSize) {
      thePageSize = props.current;
      const newCurrent = computePage(props.pageSize, state.pageSize, props.total);
      theCurrent = theCurrent > newCurrent ? newCurrent : theCurrent;
    }
    return {
      current: theCurrent,
      pageSize: thePageSize,
    };
  }

  getPaginationList() {
    return (
      <PaginationList themeProps={this.props.getPartOfThemeProps('PaginationContainer')}>
        {this.getArrow('pre')}
        {this.getPageList()}
        {this.getArrow('next')}
      </PaginationList>
    );
  }

  getPageList() {
    const { total } = this.props;
    const { current, pageSize } = this.state;

    const totalPages = computePage(0, pageSize, total);
    const pageList = [];
    const pageBufferSize = 2;
    if (totalPages <= 5 + pageBufferSize * 2) {
      for (let i = 1; i <= totalPages; i++) {
        const isSelected = current === i;
        pageList.push(this.getItems(i, isSelected, i));
      }
    } else {
      const firstPage = this.getItems(0, false, 1);
      const lastPage = this.getItems(totalPages, false, totalPages);

      let left = Math.max(1, current - pageBufferSize);
      let right = Math.min(current + pageBufferSize, totalPages);

      if (current - 1 <= pageBufferSize) {
        right = 1 + pageBufferSize * 2;
      }

      if (totalPages - current <= pageBufferSize) {
        left = totalPages - pageBufferSize * 2;
      }

      for (let i = left; i <= right; i++) {
        const isSelected = current === i;
        pageList.push(this.getItems(i, isSelected, i));
      }

      if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
        pageList.unshift(this.getPaginationOmit('pre'));
      }

      if (totalPages - current >= pageBufferSize * 2 && current !== totalPages - 2) {
        pageList.push(this.getPaginationOmit('next'));
      }

      if (left !== 1) {
        pageList.unshift(firstPage);
      }
      if (right !== totalPages) {
        pageList.push(lastPage);
      }
    }

    return pageList;
  }

  getItems(index: number, isSelected: boolean, title: number) {
    const channel = this.props.createEventChannel(['active', 'hover']);
    return (
      <PaginationListItem
        {...channel.provider}
        onClick={this.clickItem(index)}
        themeProps={this.props.getPartOfThemeProps('PaginationListItem', {
          props: {
            isSelected,
          },
        })}
        title={title}
      >
        <PaginationListItemText
          lugiaConsumers={channel.consumer}
          themeProps={this.props.getPartOfThemeProps('PaginationInnerText', {
            props: {
              isSelected,
            },
          })}
        >
          {title}
        </PaginationListItemText>
      </PaginationListItem>
    );
  }

  getPaginationOmit(type: MorePageType) {
    const channel = this.props.createEventChannel(['active', 'hover']);
    const { theme: IconThemeProps, viewClass: IconViewClass } = this.props.getPartOfThemeHocProps(
      'MorePageIcon'
    );

    const iconTheme = deepMerge(
      {
        [IconViewClass]: {
          normal: {
            color: lightGreyColor,
            cursor: 'pointer',
            padding: 11,
          },
          hover: {
            color: themeColor,
            cursor: 'pointer',
          },
        },
      },
      IconThemeProps
    );
    const { showMorePageType = 'default' } = this.state;
    const preMore = type === 'pre';
    const nextMore = type === 'next';
    const showPreMore = showMorePageType === 'pre';
    const showNextMore = showMorePageType === 'next';
    const text = preMore ? '向前五页' : '向后五页';
    const morePageIcon =
      showPreMore && preMore
        ? 'lugia-icon-direction_double_right'
        : showNextMore && nextMore
        ? 'lugia-icon-direction_double_left'
        : 'lugia-icon-financial_omit';
    return (
      <PaginationMoreItem
        {...channel.provider}
        themeProps={this.props.getPartOfThemeProps('PaginationListItem')}
        title={text}
        onClick={this.changePageSize(type)}
        onMouseEnter={this.onMouseEnter(type)}
        onMouseLeave={this.onMouseLeave}
      >
        <Icon
          lugiaConsumers={channel.consumer}
          theme={iconTheme}
          viewClass={IconViewClass}
          iconClass={morePageIcon}
          singleTheme
        />
      </PaginationMoreItem>
    );
  }

  getPageSelect() {
    const { pageSizeOptions = [10, 20, 30, 50], showSizeChanger } = this.props;
    if (!showSizeChanger) {
      return null;
    }
    const optionsList = [];
    const unit = '条/页';
    for (let i = 0; i < pageSizeOptions.length; i++) {
      optionsList.push({
        value: pageSizeOptions[i] + unit,
        label: pageSizeOptions[i] + unit,
      });
    }
    const { theme, viewClass } = this.props.getPartOfThemeHocProps('PaginationPageSizeSelect');
    const selectTheme = deepMerge(
      {
        [viewClass]: {
          Menu: {
            MenuWrap: {
              normal: {
                width: 100,
                height: 100,
              },
            },
            MenuItem: {
              SelectedMenuItemWrap: {
                normal: {
                  height: 80,
                  color: defaultColor,
                },
              },
            },
          },
          InputTag: {
            InputTagWrap: {
              normal: {
                width: 80,
                height: 36,
                padding: {
                  left: 5,
                  right: 5,
                },
                color: darkGreyColor,
              },
            },
            TagWrap: {
              normal: {
                width: 100,
                height: 40,
                margin: {
                  left: 10,
                  right: 5,
                },
              },
            },
          },
        },
      },
      theme
    );
    return (
      <Select
        canClear={false}
        theme={selectTheme}
        viewClass={viewClass}
        data={optionsList}
        displayField={'label'}
        defaultValue={optionsList[0].label}
        onChange={this.handleChangePageSize}
      />
    );
  }

  clickItem = (page: number) => () => {
    this.handleChangePage(page);
  };
  getQuickJumper() {
    const { showQuickJumper } = this.props;

    if (!showQuickJumper) {
      return null;
    }
    const { viewClass, theme } = this.props.getPartOfThemeHocProps('QuickJumpInput');
    const InnerInputTheme = deepMerge(
      {
        [viewClass]: {
          Input: {
            normal: {
              width: 60,
              height: 36,
            },
          },
        },
      },
      theme
    );
    return (
      <div>
        <span>跳至</span>
        <Input theme={InnerInputTheme} viewClass={viewClass} onEnter={this.enterPage} />
        <span>页</span>;
      </div>
    );
  }
  enterPage = (e: Object) => {
    if (e && e.target && e.target.value) {
      this.handleChangePage(Number(e.target.value));
    }
  };

  handleChangePage = (page: number) => {
    const { disabled, total } = this.props;
    const { pageSize } = this.state;
    let thePage = page;
    if (!disabled) {
      const currentPage = computePage(pageSize, pageSize, total);
      if (thePage > currentPage) {
        thePage = currentPage;
      }
      this.setState({
        current: thePage,
      });
    }
    const { onChange } = this.props;
    onChange && onChange({ current: thePage, pageSize });
  };

  handleChangePageSize = (obj: Object) => {
    const { onShowSizeChange } = this.props;
    const { current, pageSize } = this.state;
    const { newValue } = obj;
    const unit = '条/页';
    const start = newValue.indexOf(unit);
    const thePageSize = Number(newValue.substring(0, start));
    if (pageSize !== thePageSize) {
      this.setState({ pageSize: thePageSize });
    }
    onShowSizeChange && onShowSizeChange(current, thePageSize);
  };

  changePage = (page: number) => () => {
    this.handleChangePage(page);
  };

  goPrePage = () => {
    const { current } = this.state;
    return Math.max(1, current - 5);
  };

  goNextPage = () => {
    const { current, pageSize } = this.state;
    const { total } = this.props;
    return Math.min(computePage(0, pageSize, total), current + 5);
  };

  changePageSize = (type: MorePageType) => () => {
    const pageSize = type === 'pre' ? this.goPrePage() : this.goNextPage();
    this.changePage(pageSize)();
  };

  showTotal() {
    const { showTotal, total } = this.props;
    const { current, pageSize } = this.state;
    const range = [
      total === 0 ? 0 : (current - 1) * pageSize + 1,
      current * pageSize > total ? total : current * pageSize,
    ];
    showTotal && showTotal(total, range);
  }

  onMouseLeave = () => {
    this.setState({ showMorePageType: 'default' });
  };

  onMouseEnter = (type: MorePageType) => () => {
    const { disabled } = this.props;
    if (!disabled) {
      this.setState({ showMorePageType: type });
    }
  };

  getArrow(type: MorePageType) {
    const { hideOnSinglePage } = this.props;
    if (hideOnSinglePage) {
      return null;
    }

    const { total } = this.props;
    const { current, pageSize } = this.state;

    const min = current === 1 && type === 'pre';
    const max = current === total && type === 'next';
    let page = current;
    if (!min && !max) {
      page =
        type === 'pre'
          ? current - 1
          : current < computePage(0, pageSize, total)
          ? current + 1
          : current;
    }

    return (
      <PaginationListItem
        themeProps={this.props.getPartOfThemeProps('PaginationListItem')}
        onClick={this.changePage(page)}
      >
        {this.getArrowIcon(type)}
      </PaginationListItem>
    );
  }

  checkArrowChange(type: MorePageType) {
    const { total } = this.props;
    const { current, pageSize } = this.state;

    const min = current === 1 && type === 'pre';
    const max = current === total && type === 'next';
    let page = current;
    if (!min && !max) {
      page =
        type === 'pre'
          ? current - 1
          : current <= computePage(0, pageSize, total)
          ? current + 1
          : current;
    }
    return page;
  }

  getArrowIcon(type: MorePageType) {
    const preIcon = 'lugia-icon-direction_Left';
    const nextIcon = 'lugia-icon-direction_right';
    const iconClass = type === 'pre' ? preIcon : nextIcon;

    const { theme: IconThemeProps, viewClass: IconViewClass } = this.props.getPartOfThemeHocProps(
      'ChangePageIcon'
    );

    const iconTheme = deepMerge(
      {
        [IconViewClass]: {
          normal: {
            color: lightGreyColor,
            cursor: 'pointer',
            padding: 11,
          },
          hover: {
            color: themeColor,
            cursor: 'pointer',
          },
        },
      },
      IconThemeProps
    );

    return (
      <Icon
        iconClass={iconClass}
        theme={iconTheme}
        viewClass={IconViewClass}
        onClick={this.simpleArrowClick(type)}
        singleTheme
      />
    );
  }
  simpleArrowClick = (type: MorePageType) => () => {
    const page = this.checkArrowChange(type);
    this.changePage(page)();
  };

  render() {
    const { simple } = this.props;
    if (simple) {
      const { current, pageSize } = this.state;
      const { total } = this.props;
      const totalPage = computePage(0, pageSize, total);
      const { viewClass, theme } = this.props.getPartOfThemeHocProps('SimplePaginationInput');
      const InnerInputTheme = deepMerge(
        {
          [viewClass]: {
            Input: {
              normal: {
                width: 50,
                height: 30,
              },
            },
          },
        },
        theme
      );
      return (
        <PaginationListContainer themeProps={this.props.getPartOfThemeProps('PaginationContainer')}>
          {this.getArrowIcon('pre')}
          <Input value={current} theme={InnerInputTheme} viewClass={viewClass} />
          <span>/ {totalPage}</span>
          {this.getArrowIcon('next')}
        </PaginationListContainer>
      );
    }
    return (
      <PaginationListContainer themeProps={this.props.getPartOfThemeProps('PaginationContainer')}>
        {this.getPaginationList()}
        {this.getPageSelect()}
        {this.getQuickJumper()}
      </PaginationListContainer>
    );
  }
}
export default ThemeHoc(Pagination, 'Pagination', { hover: true, active: true });
