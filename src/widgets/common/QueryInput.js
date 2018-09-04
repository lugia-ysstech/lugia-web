/**
 * create by szfeng
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import Input from '../input';
import Theme from '../theme';
import '../css/sv.css';
import Widget from '../consts/index';
import QueryInputContainer from '../common/QueryInputContainer';
import styled from 'styled-components';
import CommonIcon from '../icon';
import { DefaultHeight } from '../css/input';
import { isCanInput, isCanSearch, isMutliple } from '../common/selectFunction';

import { getCheckAllButtonColor, IsShowSearchInputHandle } from '../css/queryInput';

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
  margin-left: 10px;
  font-size: 16px;
`;

CheckAllButton.displayName = 'CheckAllButton';

const RefreshButton = styled.span`
  color: #666;
  margin-left: 10px;
  font-size: 16px;
  transition: all 0.4s;

  &:hover {
    color: #4d63ff;
  }
`;
RefreshButton.displayName = 'RefreshButton';

const SearchButton = styled.span`
  position: absolute;
  color: #666;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  z-index: 2;
  font-size: 16px;
  transition: all 0.4s;

  &:hover {
    color: #4d63ff;
  }
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
};

type QueryInputState = {
  showSearchInput: boolean,
  showCheckAllButton: boolean,
  toShowSearchInputIng: boolean,
  toShowCheckAllButtonIng: boolean,
};

class QueryInput extends React.Component<QueryInputProps, QueryInputState> {
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

    const { query, onQueryInputChange, refreshValue, onQueryInputKeyDown } = props;

    const { state } = this;
    const {
      showSearchInput,
      showCheckAllButton,
      toShowSearchInputIng,
      toShowCheckAllButtonIng,
    } = state;

    const view = {
      [Widget.Input]: {
        borderSize: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        borderRadius: 0,
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
            <Theme config={view}>
              <QueryInputContainer>
                <Input
                  key="queryInput"
                  placeholder="请输入查询条件"
                  value={query}
                  onChange={onQueryInputChange}
                  onKeyDown={onQueryInputKeyDown}
                  prefix={this.getQueryInputPrefix()}
                  suffix={this.getQueryInputSuffix()}
                />
              </QueryInputContainer>
            </Theme>
          </SearchInputContainer>
        </InnerContainer>
      </OutContainer>
    );
  }

  getQueryInputPrefix() {
    return (
      <CommonIcon iconClass={'lugia-icon-direction_arrow_up'} onClick={this.onHideSearchInput} />
    );
  }

  getQueryInputSuffix() {
    const { props } = this;
    if (isCanInput(props)) {
      const { addClick } = props;
      return <CommonIcon iconClass={'lugia-icon-reminder_plus'} onClick={addClick} />;
    }
    return null;
  }

  getCheckAllButton() {
    const { isCheckedAll, onCheckAll } = this.props;

    const iconClassName = isCheckedAll
      ? 'lugia-icon-finacial1_deselection'
      : 'lugia-icon-finacial1_check_all';
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
