/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import React from 'react';
import type { MorePageType, PaginationProps, PaginationState } from '../css/pagination';
import { getThemeFontSize, getPaginationItemStyle } from '../css/pagination';
import Select from '../select';
import Input from '../input';
import Icon from '../icon';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import ThemeHoc from '../theme-provider';
import { getBorder, getBorderRadius } from '@lugia/theme-utils';
import { deepMerge } from '@lugia/object-utils';
import Widget from '../consts';
import { ObjectUtils } from '@lugia/type-utils';
import { checkNumber } from '../common/Math';
import get from '../css/theme-common-dict';

const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const lightGreyColor = '$lugia-dict.@lugia/lugia-web.lightGreyColor';
const borderRadius = '$lugia-dict.@lugia/lugia-web.borderRadiusValue';
const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';

const getOrderCSS = props => {
  const { order, align } = props;
  const theOrder = order ? order : align === 'Right' ? '' : 5;
  return `order: ${theOrder};`;
};

const PaginationList = CSSComponent({
  tag: 'ul',
  className: 'PaginationList',
  normal: {
    selectNames: [['margin']],
    getThemeMeta(themeMeta, themeProps) {
      const {
        propsConfig: { isLast },
      } = themeProps;
      const theMargin = isLast ? 0 : 16;
      return {
        margin: {
          right: theMargin,
        },
      };
    },
  },
  css: css`
    list-style: none;
    user-select: none;
  `,
});

const BlockUnit = StaticComponent({
  tag: 'div',
  className: 'PaginationBlockUnit',
  css: css`
    ${props => getOrderCSS(props)};
  `,
});
const PaginationTextContainer = CSSComponent({
  tag: 'div',
  className: 'PaginationTextContainer',
  normal: {
    selectNames: [['margin']],
    getThemeMeta(themeMeta, themeProps) {
      const {
        propsConfig: { isLast },
      } = themeProps;
      const theMargin = isLast ? 0 : 16;
      return {
        margin: {
          right: theMargin,
        },
      };
    },
  },
  css: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
});
const PaginationMoreItem = CSSComponent({
  tag: 'li',
  className: 'PaginationMoreItem',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['cursor'],
      ['lineHeight'],
      ['margin'],
      ['borderRadius'],
      ['background'],
    ],
    defaultTheme: {
      color: lightGreyColor,
      cursor: 'pointer',
      margin: {
        right: 8,
      },
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const sizeCSS = getPaginationItemStyle(themeMeta, themeProps);
      return {
        ...sizeCSS,
      };
    },
  },
  hover: {
    selectNames: [['cursor'], ['lineHeight'], ['margin']],
  },
  css: css`
    list-style: none;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  option: { hover: true, active: true },
});
const PaginationBaseText = CSSComponent({
  tag: 'span',
  className: 'PaginationBaseText',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize'], ['cursor'], ['margin']],
    defaultTheme: {
      color: darkGreyColor,
    },
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig: { simple } = {} } = themeProps;
      const fontSizeCSS = getThemeFontSize(themeMeta, themeProps);
      const marginCSS = simple
        ? {
            margin: {
              right: 10,
            },
          }
        : {};
      return {
        ...fontSizeCSS,
        ...marginCSS,
      };
    },
  },
});
const PaginationTextDivider = CSSComponent({
  extend: PaginationBaseText,
  className: 'PaginationTextDivider',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize'], ['cursor']],
    defaultTheme: {
      margin: {
        right: get('paddingToText'),
      },
    },
  },
});
const PaginationListItem = CSSComponent({
  extend: PaginationMoreItem,
  className: 'PaginationListItem',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['cursor'],
      ['border'],
      ['borderRadius'],
      ['opacity'],
      ['background'],
      ['boxShadow'],
      ['margin'],
    ],
    defaultTheme: {
      cursor: 'pointer',
      background: { color: 'white' },
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const sizeCSS = getPaginationItemStyle(themeMeta, themeProps);
      return {
        ...sizeCSS,
      };
    },
  },
  hover: {
    selectNames: [
      ['cursor'],
      ['border'],
      ['borderRadius'],
      ['opacity'],
      ['background'],
      ['boxShadow'],
    ],
  },
  focus: {
    selectNames: [
      ['cursor'],
      ['border'],
      ['borderRadius'],
      ['opacity'],
      ['background'],
      ['boxShadow'],
    ],
    defaultTheme: {
      background: {
        color: themeColor,
      },
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { height } = themeMeta;
      return {
        lineHeight: height,
      };
    },
  },
  css: css`
    text-align: center;
    list-style: none;
    float: left;
  `,
});

const PaginationArrowIconContainer = CSSComponent({
  extend: PaginationListItem,
  className: 'PaginationArrowIconContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['cursor'],
      ['border'],
      ['borderRadius'],
      ['padding'],
      ['margin'],
      ['lineHeight'],
      ['opacity'],
      ['background'],
      ['boxShadow'],
    ],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { type },
      } = themeProps;
      const sizeCSS = getPaginationItemStyle(themeMeta, themeProps);
      const right = type === 'next' ? 0 : 8;
      return {
        ...sizeCSS,
        margin: { right },
      };
    },
  },
  hover: {
    selectNames: [
      ['cursor'],
      ['border'],
      ['borderRadius'],
      ['opacity'],
      ['background'],
      ['boxShadow'],
    ],
  },
  disabled: {
    selectNames: [
      ['cursor'],
      ['border'],
      ['borderRadius'],
      ['opacity'],
      ['background'],
      ['boxShadow'],
    ],
    defaultTheme: {
      cursor: 'not-allowed',
    },
  },
  option: { hover: true, active: true },
});

const PaginationListItemText = CSSComponent({
  tag: 'a',
  className: 'PaginationListItemText',
  normal: {
    selectNames: [['fontSize'], ['font'], ['color'], ['cursor'], ['opacity']],
    defaultTheme: {
      color: darkGreyColor,
    },
    getThemeMeta(themeMeta, themeProps) {
      return getThemeFontSize(themeMeta, themeProps);
    },
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize']],
  },
  focus: {
    selectNames: [['fontSize'], ['font'], ['color']],
    defaultTheme: {
      color: defaultColor,
    },
  },
  disabled: {
    selectNames: [['fontSize'], ['font'], ['color']],
    defaultTheme: {
      color: disableTextColor,
    },
  },
  option: { hover: true, focus: true },
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
    defaultTheme: {
      width: '100%',
    },
  },
  css: css`
    display: flex;
    align-items: center;
  `,
});

const Blank = StaticComponent({
  tag: 'div',
  className: 'PaginationBlank',
  css: css`
    margin: auto;
    ${props => getOrderCSS(props)};
  `,
});

function computePage(pageSize: number, sPageSize: number, total: number) {
  if (!total || !ObjectUtils.isNumber(total)) {
    return 1;
  }
  const thePageSize = pageSize ? pageSize : sPageSize;
  return Math.floor((total - 1) / thePageSize) + 1;
}
const defaultPaginationTheme = () => ({
  themeConfig: {
    normal: {
      border: getBorder(get('normalBorder')),
      borderRadius: getBorderRadius(borderRadius),
    },
    hover: {
      border: getBorder(get('hoverBorder')),
    },
    focus: {
      border: getBorder(get('focusBorder')),
    },
    disabled: {
      border: getBorder(get('disabledBorder')),
    },
  },
});

class Pagination extends React.Component<PaginationProps, PaginationState> {
  static displayName = Widget.Pagination;
  static defaultProps = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    size: 'default',
  };

  static getDerivedStateFromProps(props: PaginationProps, state: PaginationState) {
    const statePageSize = state ? state.pageSize : 0;
    const propsPageSize = props.pageSize && props.pageSize !== '' ? props.pageSize : 0;
    const propsCurrent = props.current;

    let theCurrent = state ? state.current : props.defaultCurrent;
    let thePageSize = state ? statePageSize : props.defaultPageSize;
    if ('current' in props) {
      theCurrent = propsCurrent;
    }
    if ('pageSize' in props && propsPageSize && propsPageSize !== statePageSize) {
      thePageSize = propsPageSize;
      const newCurrent = computePage(propsPageSize, statePageSize, props.total);
      theCurrent = theCurrent > newCurrent ? newCurrent : theCurrent;
    }
    return {
      current: theCurrent,
      pageSize: thePageSize,
    };
  }

  getPaginationList(isLast: boolean) {
    const { getPartOfThemeProps } = this.props;

    return (
      <PaginationList
        themeProps={getPartOfThemeProps('PaginationListContainer', { props: { isLast } })}
      >
        {this.getArrow('pre')}
        {this.getPageList()}
        {this.getArrow('next')}
      </PaginationList>
    );
  }
  getPrePage(current, pageBufferSize, pageList) {
    if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
      pageList.unshift(this.getPaginationOmit('pre'));
    }
    return pageList;
  }

  getNextPage(totalPages, current, pageBufferSize, pageList) {
    if (totalPages - current >= pageBufferSize * 2 && current !== totalPages - 2) {
      pageList.push(this.getPaginationOmit('next'));
    }
    return pageList;
  }

  checkFirstPage(left, pageList, firstPage) {
    if (left !== 1) {
      pageList.unshift(firstPage);
    }
    return pageList;
  }
  checkLastPage(right, totalPages, lastPage, pageList) {
    if (right !== totalPages) {
      pageList.push(lastPage);
    }
    return pageList;
  }

  getPageList() {
    const { total } = this.props;
    const { current, pageSize } = this.state;

    const totalPages = computePage(0, pageSize, total);
    let pageList = [];
    const pageBufferSize = 2;
    if (totalPages <= 5 + pageBufferSize * 2) {
      for (let i = 1; i <= totalPages; i++) {
        const isSelected = current === i;
        pageList.push(this.getItems(i, isSelected, i));
      }
    } else {
      const firstPage = this.getItems(0, false, 1);
      const lastPage = this.getItems(totalPages, false, totalPages);
      const left = this.getLeftPage(totalPages);
      const right = this.getRightPage(totalPages);

      for (let i = left; i <= right; i++) {
        const isSelected = current === i;
        pageList.push(this.getItems(i, isSelected, i));
      }
      pageList = this.getPrePage(current, pageBufferSize, pageList);
      pageList = this.getNextPage(totalPages, current, pageBufferSize, pageList);
      pageList = this.checkFirstPage(left, pageList, firstPage);
      pageList = this.checkLastPage(right, totalPages, lastPage, pageList);
    }

    return pageList;
  }

  getRightPage(totalPages: number) {
    const { current } = this.state;
    const pageBufferSize = 2;
    let right = Math.min(current + pageBufferSize, totalPages);
    if (current - 1 <= pageBufferSize) {
      right = 1 + pageBufferSize * 2;
    }
    return right;
  }

  getLeftPage(totalPages: number) {
    const { current } = this.state;
    const pageBufferSize = 2;
    let left = Math.max(1, current - pageBufferSize);
    if (totalPages - current <= pageBufferSize) {
      left = totalPages - pageBufferSize * 2;
    }
    return left;
  }

  getItems(index: number, isSelected: boolean, pageNumber: number) {
    const { createEventChannel, getPartOfThemeProps, size } = this.props;
    const channel = createEventChannel(['active', 'hover']);
    const theThemeProps = deepMerge(
      defaultPaginationTheme(),
      getPartOfThemeProps('PaginationListItem', {
        props: { size },
      })
    );
    theThemeProps.themeState.focus = isSelected;
    return (
      <PaginationListItem
        {...channel.provider}
        onClick={this.changePage(index)}
        themeProps={theThemeProps}
      >
        <PaginationListItemText lugiaConsumers={channel.consumer} themeProps={theThemeProps}>
          {pageNumber}
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
            color: mediumGreyColor,
            cursor: 'pointer',
            getThemeMeta(themeMeta, themeProps) {
              return getThemeFontSize(themeProps, themeMeta, true);
            },
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
    const { size, getPartOfThemeProps } = this.props;
    return (
      <PaginationMoreItem
        {...channel.provider}
        themeProps={getPartOfThemeProps('PaginationListItem', { props: { size } })}
        title={text}
        onClick={this.changePageSize(type)}
        onMouseEnter={this.onMouseEnter(type)}
        onMouseLeave={this.onMouseLeave}
      >
        <Icon
          propsConfig={{ size }}
          lugiaConsumers={channel.consumer}
          theme={iconTheme}
          viewClass={IconViewClass}
          iconClass={morePageIcon}
          singleTheme
        />
      </PaginationMoreItem>
    );
  }

  getPageSelect(isLast: boolean) {
    const { getPartOfThemeHocProps, divided } = this.props;
    const { theme, viewClass } = getPartOfThemeHocProps('PaginationPageSizeSelect');
    const theMargin = isLast ? 0 : 16;
    const selectTheme = deepMerge(
      {
        [viewClass]: {
          Menu: { MenuWrap: { normal: { width: 90 } } },
          Container: {
            normal: {
              width: 90,
              padding: { left: 5, right: 5 },
              margin: { right: theMargin },
            },
          },
          TextContent: {
            normal: {
              color: darkGreyColor,
            },
          },
        },
      },
      theme
    );
    const { pageSizeOptions = [10, 20, 30, 50], defaultPageSize, pageSize, size } = this.props;
    const optionsList = [];
    const unit = '条/页';
    for (let i = 0; i < pageSizeOptions.length; i++) {
      optionsList.push({
        value: pageSizeOptions[i] + unit,
        label: pageSizeOptions[i] + unit,
      });
    }
    const theDefaultValueValue = defaultPageSize + unit;
    const valueConfig = pageSize && pageSize !== '' ? { value: pageSize + unit } : {};
    return (
      <Select
        divided={divided}
        size={size}
        autoHeight
        canClear={false}
        theme={selectTheme}
        viewClass={viewClass}
        data={optionsList}
        displayField={'label'}
        defaultValue={theDefaultValueValue}
        onChange={this.handleChangePageSize}
        {...valueConfig}
      />
    );
  }

  getQuickJumper(isLast: boolean) {
    const { getPartOfThemeProps, getPartOfThemeHocProps, size } = this.props;

    const { viewClass, theme } = getPartOfThemeHocProps('QuickJumpInput');
    const InnerInputTheme = deepMerge(
      {
        [viewClass]: {
          Container: {
            normal: {
              width: 60,
              margin: {
                left: 8,
                right: 8,
              },
              color: darkGreyColor,
            },
          },
        },
      },
      theme
    );
    const quickJumpTextTheme = getPartOfThemeProps('PaginationQuickJumpText', { props: { size } });
    const { quickJumpValue } = this.state;
    return (
      <PaginationTextContainer
        themeProps={getPartOfThemeProps('PaginationQuickJumpContainer', { props: { isLast } })}
      >
        <PaginationBaseText themeProps={quickJumpTextTheme}>跳至</PaginationBaseText>
        <Input
          size={size}
          theme={InnerInputTheme}
          viewClass={viewClass}
          onEnter={this.enterPage}
          onBlur={this.onInputBlur}
          isShowClearButton={false}
          value={quickJumpValue}
          onChange={this.quickJumpValueChange}
        />
        <PaginationBaseText themeProps={quickJumpTextTheme}>页</PaginationBaseText>
      </PaginationTextContainer>
    );
  }

  getShowTotalData(isLast: boolean) {
    const { total, getPartOfThemeProps, size } = this.props;
    return (
      <PaginationTextContainer
        themeProps={getPartOfThemeProps('PaginationTotalContainer', { props: isLast })}
      >
        <PaginationBaseText
          themeProps={getPartOfThemeProps('PaginationTotalText', { props: { size } })}
        >
          {`共${total}条数据`}
        </PaginationBaseText>
      </PaginationTextContainer>
    );
  }

  enterPage = (e: Object) => {
    if (e && e.target && e.target.value) {
      this.handleChangePage(Number(e.target.value));
    }
  };
  quickJumpValueChange = e => {
    const { newValue } = e;
    const theNewValue = newValue.replace(/-/g, '');
    const theValue = checkNumber(theNewValue);
    const { quickJumpValue } = this.state;
    if (theValue !== quickJumpValue) {
      this.setState({
        quickJumpValue: theValue,
      });
    }
    this.handleChangePage(Number(theValue));
  };

  onInputBlur = (e: Object) => {
    if (e && e.target && e.target.value) {
      const { quickJumperInputBlur } = this.props;
      const { pageSize, current } = this.state;
      const thePage = e.target.value;
      quickJumperInputBlur &&
        quickJumperInputBlur({
          newValue: thePage,
          oldValue: current,
          current: thePage,
          pageSize,
          e,
        });
    }
  };

  handleChangePage = (page: number) => {
    const { disabled, total } = this.props;
    const { pageSize, current } = this.state;
    let thePage = page > 1 ? page : 1;
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
    onChange && onChange({ newValue: thePage, oldValue: current, current: thePage, pageSize });
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

  checkArrowChange(type: MorePageType) {
    const { total } = this.props;
    const { current, pageSize } = this.state;
    const preMore = type === 'pre';
    const min = current === 1 && preMore;
    const max = current === total && type === 'next';
    let page = current;
    if (!min && !max) {
      page = preMore
        ? current - 1
        : current < computePage(0, pageSize, total)
        ? current + 1
        : current;
    }
    return page;
  }

  getArrow(type: MorePageType) {
    const { hideOnSinglePage, size, getPartOfThemeProps } = this.props;
    const { current } = this.state;

    if (hideOnSinglePage) {
      return null;
    }
    const page = this.checkArrowChange(type);

    const clickable = type === 'pre' ? current > 1 : current < page;

    const theThemeProps = deepMerge(
      defaultPaginationTheme(),
      getPartOfThemeProps('PaginationArrowIconContainer', {
        props: { size },
      })
    );

    return (
      <PaginationArrowIconContainer
        disabled={!clickable}
        themeProps={theThemeProps}
        onClick={this.changePage(page)}
      >
        {this.getArrowIcon(type, clickable)}
      </PaginationArrowIconContainer>
    );
  }

  getArrowIcon(type: MorePageType, clickable?: boolean) {
    const {
      getPartOfThemeHocProps,
      preIconClass,
      preIconSrc,
      nextIconClass,
      nextIconSrc,
      hideOnSinglePage,
      size,
    } = this.props;
    if (hideOnSinglePage) {
      return null;
    }
    const preIcon = preIconClass ? preIconClass : 'lugia-icon-direction_Left';
    const nextIcon = nextIconClass ? nextIconClass : 'lugia-icon-direction_right';
    const iconClass = type === 'pre' ? preIcon : nextIcon;
    const iconSrc = type === 'pre' ? preIconSrc : nextIconSrc;
    const { theme: IconThemeProps, viewClass: IconViewClass } = getPartOfThemeHocProps(
      'ChangePageIcon'
    );
    const iconCursor = clickable ? 'pointer' : 'not-allowed';

    const iconTheme = deepMerge(
      {
        [IconViewClass]: {
          normal: {
            color: darkGreyColor,
            cursor: iconCursor,
            getThemeMeta(themeMeta, themeProps) {
              return getThemeFontSize(themeMeta, themeProps, true);
            },
          },
          hover: {
            color: themeColor,
            cursor: iconCursor,
          },
          disabled: {
            color: disableTextColor,
            cursor: 'not-allowed',
          },
        },
      },
      IconThemeProps
    );
    return (
      <Icon
        propsConfig={{ size }}
        disabled={!clickable}
        src={iconSrc}
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
  inputChange = (obj: Object) => {
    const { current } = this.state;
    const { newValue } = obj;
    const numberValue = checkNumber(newValue);
    if (current !== numberValue) {
      this.handleChangePage(Number(numberValue));
    }
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
            Container: {
              normal: {
                width: 50,
                margin: {
                  left: get('padding'),
                  right: get('padding'),
                },
                color: darkGreyColor,
              },
            },
          },
        },
        theme
      );
      const { getPartOfThemeProps, size, simple } = this.props;
      const textThemeProps = getPartOfThemeProps('PaginationSimpleText', {
        props: { size, simple },
      });
      return (
        <PaginationListContainer themeProps={getPartOfThemeProps('Container')}>
          {this.getArrowIcon('pre', current > 1)}
          <Input
            size={size}
            value={current}
            theme={InnerInputTheme}
            viewClass={viewClass}
            isShowClearButton={false}
            onChange={this.inputChange}
          />
          <PaginationTextDivider themeProps={textThemeProps}>/</PaginationTextDivider>
          <PaginationBaseText themeProps={textThemeProps}>{totalPage}</PaginationBaseText>
          {this.getArrowIcon('next', current < totalPage)}
        </PaginationListContainer>
      );
    }

    const positionMap = { Total: undefined, Page: 1, PageInput: undefined, PageSize: undefined };
    const defaultList = ['Page'];
    const {
      blockList = defaultList,
      showQuickJumper,
      showTotalData,
      isShowTotalData,
      showSizeChanger,
      align,
    } = this.props;
    if (showQuickJumper) defaultList.push('PageInput');
    if (showTotalData || isShowTotalData) defaultList.push('Total');
    if (showSizeChanger) defaultList.push('PageSize');

    blockList.forEach((child, i) => {
      positionMap[child] = i + 1;
    });
    const length = blockList.length;
    return (
      <PaginationListContainer themeProps={this.props.getPartOfThemeProps('Container')}>
        <BlockUnit order={positionMap.Page || 1}>
          {this.getPaginationList(length === positionMap.Page)}
        </BlockUnit>
        {positionMap.PageInput && (
          <BlockUnit order={positionMap.PageInput || 2}>
            {this.getQuickJumper(length === positionMap.PageInput)}
          </BlockUnit>
        )}
        {positionMap.Total && (
          <BlockUnit order={positionMap.Total || 3}>
            {this.getShowTotalData(length === positionMap.Total)}
          </BlockUnit>
        )}
        {positionMap.PageSize && (
          <BlockUnit order={positionMap.PageSize || 4}>
            {this.getPageSelect(length === positionMap.PageSize)}
          </BlockUnit>
        )}
        <Blank align={align} />
      </PaginationListContainer>
    );
  }
}
export default ThemeHoc(Pagination, Widget.Pagination, { hover: true, active: true, focus: true });
