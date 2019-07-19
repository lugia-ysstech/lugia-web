/**
 * create by szfeng
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import Input from '../input';
import Theme from '../theme';
import Widget from '../consts/index';
import QueryInputContainer from '../common/QueryInputContainer';
import styled from 'styled-components';
import CommonIcon from '../icon';
import { DefaultHeight } from '../css/input';
import { isCanInput, isCanSearch, isMutliple } from '../common/selectFunction';
import {
  darkGreyColor,
  getCheckAllButtonColor,
  IsShowSearchInputHandle,
  themeColor,
} from '../css/queryInput';
import { px2emcss } from '../css/units';

const em = px2emcss(1.2);

const OutContainer = styled.div`
  height: ${DefaultHeight};
  position: relative;
  overflow: hidden;
`;

const InnerContainer = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  ${IsShowSearchInputHandle};
`;

const CheckAllContainer = styled.div`
  height: ${DefaultHeight};
  width: 100%;
  position: absolute;
  line-height: ${DefaultHeight};
`;

const SearchInputContainer = styled.div`
  position: absolute;
  width: 100%;
  top: ${DefaultHeight};
`;

const CheckAllButton = styled.span`
  color: ${getCheckAllButtonColor};
  margin-left: ${em(10)};
  font-size: ${em(16)};
`;

CheckAllButton.displayName = 'CheckAllButton';

const ShowCheckAllButton = styled.span`
  color: ${darkGreyColor};
  transition: all 0.4s;
  &:hover {
    color: ${themeColor};
  }
`;

const AppendValueButton = ShowCheckAllButton;
AppendValueButton.displayName = 'addIcon';

const RefreshButton = styled(ShowCheckAllButton)`
  margin-left: ${em(10)};
  font-size: ${em(16)};
`;
RefreshButton.displayName = 'RefreshButton';

const SearchButton = styled(ShowCheckAllButton)`
  position: absolute;
  top: 50%;
  right: ${em(10)};
  transform: translateY(-50%);
  z-index: 2;
  font-size: ${em(16)};
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

    const { query, onQueryInputChange, refreshValue, onQueryInputKeyDown, width } = props;

    const { state } = this;
    const {
      showSearchInput,
      showCheckAllButton,
      toShowSearchInputIng,
      toShowCheckAllButtonIng,
    } = state;

    const theme = {
      [Widget.Input]: {
        Input: {
          normal: {
            width,
          },
        },
      },
    };

    return (
      <OutContainer>
        <InnerContainer
          showSearchInput={showSearchInput}
          showCheckAllButton={showCheckAllButton}
          toShowSearchInputIng={toShowSearchInputIng}
          toShowCheckAllButtonIng={toShowCheckAllButtonIng}
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
      <ShowCheckAllButton>
        <CommonIcon iconClass={'lugia-icon-direction_arrow_up'} onClick={this.onHideSearchInput} />
      </ShowCheckAllButton>
    );
  }

  getQueryInputSuffix() {
    const { props } = this;
    if (isCanInput(props)) {
      const { addClick } = props;
      return (
        <AppendValueButton>
          <CommonIcon iconClass={'lugia-icon-reminder_plus'} onClick={addClick} />
        </AppendValueButton>
      );
    }
    return null;
  }

  getCheckAllButton() {
    const { isCheckedAll, onCheckAll } = this.props;

    const iconClassName = isCheckedAll
      ? 'lugia-icon-finacial_deselection'
      : 'lugia-icon-finacial_check_all';
    return (
      <CheckAllButton isCheckedAll={isCheckedAll} onClick={onCheckAll}>
        <CommonIcon iconClass={iconClassName} />
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

export default QueryInput;
