/**
 * create by szfeng
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import Input from '../input';
import Widget from '../consts/index';
import QueryInputContainer from '../common/QueryInputContainer';
import styled from 'styled-components';
import CommonIcon from '../icon';

import { isCanInput, isCanSearch, isMutliple } from '../common/selectFunction';
import { IsShowSearchInputHandle } from '../css/queryInput';
import { getBorderRadius } from '@lugia/theme-utils';
import { px2remcss } from '../css/units';
import get from '../css/theme-common-dict';
import CSSComponent from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';

const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const xxsFontSize = '$lugia-dict.@lugia/lugia-web.xxsFontSize';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const lightGreyColor = '$lugia-dict.@lugia/lugia-web.lightGreyColor';
const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';

const OutContainer = CSSComponent({
  tag: 'div',
  className: 'PopupMenuWrap',
  normal: {
    selectNames: [['margin']],
  },
  css: `
   height: ${px2remcss(get('smallSize'))};
  position: relative;
  overflow: hidden;
  `,
  option: { hover: true },
});

const InnerContainer = styled.div`
  width: 100%;
  width: ${props => px2remcss(props.width)};
  position: absolute;
  left: 0;
  top: 0;
  ${IsShowSearchInputHandle};
`;

const CheckAllContainer = styled.div`
  height: ${px2remcss(get('smallSize'))};
  background: #fff;
  width: 100%;
  position: absolute;
  line-height: ${px2remcss(get('smallSize'))};
`;

const SearchInputContainer = styled.div`
  position: absolute;
  width: 100%;
  top: ${px2remcss(get('smallSize'))};
`;

const CheckAllButton = styled.span`
  color: ${get('blackColor')};
  margin-left: ${px2remcss(get('padding'))};
  font-size: ${px2remcss(get('xsFontSize'))};
  &:hover {
    color: ${get('themeColor')};
  }
`;
CheckAllButton.displayName = 'CheckAllButton';

const CancelCheckAllButton = styled.span`
  color: ${get('dangerColor')};
  margin-left: ${px2remcss(get('padding'))};
  font-size: ${px2remcss(get('xsFontSize'))};
  &:hover {
    color: ${get('dangerHoverColor')};
  }
`;
CancelCheckAllButton.displayName = 'CancelCheckAllButton';

const ShowCheckAllButton = styled.span`
  color: ${get('blackColor')};
  font-size: ${px2remcss(get('xsFontSize'))};
  transition: all 0.4s;
  &:hover {
    color: ${get('themeColor')};
  }
`;

const AppendValueButton = ShowCheckAllButton;
AppendValueButton.displayName = 'addIcon';

const RefreshButton = styled(ShowCheckAllButton)`
  margin-left: ${px2remcss(get('padding'))};
  font-size: ${px2remcss(get('xsFontSize'))};
`;
RefreshButton.displayName = 'RefreshButton';

const SearchButton = styled(ShowCheckAllButton)`
  position: absolute;
  top: 50%;
  right: ${px2remcss(get('padding'))};
  transform: translateY(-50%);
  z-index: 200;
  font-size: ${px2remcss(get('xsFontSize'))};
`;
SearchButton.displayName = 'SearchButton';

type QueryInputProps = {
  query: string,
  onQueryInputChange?: Function,
  refreshValue?: Function,
  onQueryInputKeyDown?: Function,
  onHideSearchInput?: Function,
  addClick?: Function,
  isCheckedAll?: boolean,
  onCheckAll?: Function,
  canSearch: boolean,
  width?: number,
};

type QueryInputState = {
  showSearchInput: boolean,
  showCheckAllButton: boolean,
  toShowSearchInputIng: boolean,
  toShowCheckAllButtonIng: boolean,
};

class QueryInput extends React.Component<QueryInputProps, QueryInputState> {
  static displayName = Widget.QueryInput;
  constructor(props: QueryInputProps) {
    super(props);
    this.state = {
      showSearchInput: true,
      showCheckAllButton: false,
      toShowSearchInputIng: false,
      toShowCheckAllButtonIng: false,
    };
  }

  render() {
    return this.getTarget();
  }

  getTarget() {
    const { props } = this;

    const mutliple = isMutliple(props);
    if (!mutliple && !isCanSearch(props)) {
      return null;
    }

    const {
      query,
      onQueryInputChange,
      refreshValue,
      onQueryInputKeyDown,
      width,
      getPartOfThemeProps,
    } = props;
    const { state } = this;
    const {
      showSearchInput,
      showCheckAllButton,
      toShowSearchInputIng,
      toShowCheckAllButtonIng,
    } = state;

    const theme = {
      [Widget.Input]: {
        Container: {
          normal: {
            width,
            fontSize: 12,
            color: blackColor,
            borderRadius: getBorderRadius(20),
          },
        },
        Placeholder: {
          normal: {
            fontSize: 12,
            color: lightGreyColor,
          },
        },
        ClearButton: {
          normal: {
            fontSize: xxsFontSize,
            color: mediumGreyColor,
          },
          hover: {
            fontSize: xxsFontSize,
            color: darkGreyColor,
          },
        },
      },
    };

    return (
      <OutContainer themeProps={getPartOfThemeProps('OutContainer')}>
        <InnerContainer
          showSearchInput={showSearchInput}
          showCheckAllButton={showCheckAllButton}
          toShowSearchInputIng={toShowSearchInputIng}
          toShowCheckAllButtonIng={toShowCheckAllButtonIng}
          width={width}
        >
          <CheckAllContainer>
            {mutliple ? this.getCheckAllButton() : null}
            <RefreshButton onClick={refreshValue}>
              <CommonIcon iconClass="lugia-icon-reminder_refresh" />
            </RefreshButton>
            {this.getSearchInputButton()}
          </CheckAllContainer>
          <SearchInputContainer>
            {/* <Theme config={view}> */}
            <QueryInputContainer>
              <Input
                key="queryInput"
                size={'small'}
                theme={theme}
                placeholder="请输入查询条件"
                value={query}
                onChange={onQueryInputChange}
                onKeyDown={onQueryInputKeyDown}
                prefix={this.getQueryInputPrefix()}
                suffix={this.getQueryInputSuffix()}
              />
            </QueryInputContainer>
            {/* </Theme> */}
          </SearchInputContainer>
        </InnerContainer>
      </OutContainer>
    );
  }

  getQueryInputPrefix() {
    return (
      <ShowCheckAllButton onClick={this.onHideSearchInput}>
        <CommonIcon iconClass={'lugia-icon-direction_arrow_up'} />
      </ShowCheckAllButton>
    );
  }

  getQueryInputSuffix() {
    const { props } = this;
    if (isCanInput(props)) {
      const { addClick } = props;
      const themeConfig = {
        [Widget.Icon]: {
          Icon: {
            normal: {
              color: mediumGreyColor,
              fontSize: xxsFontSize,
            },
            hover: {
              color: themeColor,
              fontSize: xxsFontSize,
            },
            disabled: {
              color: disableTextColor,
              fontSize: xxsFontSize,
            },
          },
        },
      };
      return (
        <AppendValueButton>
          <CommonIcon
            theme={themeConfig}
            iconClass={'lugia-icon-reminder_plus'}
            onClick={addClick}
          />
        </AppendValueButton>
      );
    }
    return null;
  }

  getCheckAllButton() {
    const { isCheckedAll, onCheckAll } = this.props;
    if (isCheckedAll) {
      return (
        <CancelCheckAllButton isCheckedAll={isCheckedAll} onClick={onCheckAll}>
          <CommonIcon iconClass={'lugia-icon-finacial_deselection'} />
        </CancelCheckAllButton>
      );
    }
    return (
      <CheckAllButton isCheckedAll={isCheckedAll} onClick={onCheckAll}>
        <CommonIcon iconClass={'lugia-icon-finacial_check_all'} />
      </CheckAllButton>
    );
  }

  onShowSearchInput = () => {
    this.setState({
      toShowSearchInputIng: true,
    });

    setTimeout(() => {
      this.setState({
        showSearchInput: true,
        showCheckAllButton: false,
        toShowSearchInputIng: false,
      });
    }, 500);
  };

  onHideSearchInput = () => {
    this.setState({
      toShowCheckAllButtonIng: true,
    });

    setTimeout(() => {
      this.setState({
        showCheckAllButton: true,
        showSearchInput: false,
        toShowCheckAllButtonIng: false,
      });
    }, 500);
  };

  getSearchInputButton() {
    return (
      <SearchButton onClick={this.onShowSearchInput}>
        <CommonIcon iconClass="lugia-icon-financial_search" />
      </SearchButton>
    );
  }
}

export default ThemeHoc(QueryInput, Widget.QueryInput, { hover: true });
