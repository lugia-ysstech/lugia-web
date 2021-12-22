import React, { Component } from 'react';
import Icon from '../icon';
import Theme from '../theme';
import Button from '../button';
import styled from 'styled-components';
import Widget from '../consts/index';
import { css, StaticComponent } from '@lugia/theme-css-hoc';
import Tooltip from '../tooltip';
import FixedMenu from './fixedMenu';

const TitleName = StaticComponent({
  tag: 'div',
  className: 'TitleName',
  css: '',
});

const Wrapper = StaticComponent({
  tag: 'div',
  className: 'Wrapper',
  css: `
     display: inline-flex;
     justify-content: space-around;
     align-items: center;
  `,
});

const ArrowWrapper = StaticComponent({
  tag: 'div',
  className: 'ArrowWrapper',
  css: `
     flex-direction: column;
     display: flex;
     margin: 0 0 0 8px;
     cursor: pointer;
  `,
});

type TableTitleProps = {
  title: string,
  positiveSequence: Function,
  negativeSequence: Function,
};

const themeConfig = {
  [Widget.Button]: {
    Container: {
      normal: {
        width: 10,
        height: 10,
      },
    },
    ButtonText: {
      normal: {
        fontSize: 10,
        color: '#999',
      },
      hover: {
        color: '#8c9dff',
      },
      focus: {
        color: '#3d53cc',
      },
      active: {
        color: '#8c9dff',
      },
    },
  },
  [Widget.Icon]: {
    Icon: {
      normal: {
        fontSize: 10,
      },
    },
  },
};

const sortIconConfig = {
  [Widget.Icon]: {
    Icon: {
      normal: {
        fontSize: 10,
        color: '$lugia-dict.@lugia/lugia-web.themeColor',
      },
    },
  },
};

export default class TableTitle extends Component<TableTitleProps, any> {
  positiveSequence = e => {
    const { positiveSequence } = this.props;
    positiveSequence && positiveSequence();
  };
  negativeSequence = e => {
    const { negativeSequence } = this.props;
    negativeSequence && negativeSequence();
  };

  handleFixed = (type: string) => {
    const { onFixed, dataIndex } = this.props;
    onFixed && onFixed({ type, dataIndex });
  };

  render() {
    const {
      title,
      sorter,
      canFixed,
      fixed,
      canFixedColumnsDataIndex = [],
      fixedData,
      tableId,
    } = this.props;
    const iconClass = fixed ? 'lugia-icon-financial_pin_o' : 'lugia-icon-financial_pin';
    return (
      <Wrapper>
        <TitleName>{title}</TitleName>

        {sorter ? (
          <Theme config={themeConfig}>
            <ArrowWrapper>
              <Button type={'link'}>
                <Icon iconClass={'lugia-icon-direction_caret_up'} onClick={this.positiveSequence} />
              </Button>
              <Button type={'link'}>
                <Icon
                  iconClass={'lugia-icon-direction_caret_down'}
                  onClick={this.negativeSequence}
                />
              </Button>
            </ArrowWrapper>
          </Theme>
        ) : null}
        {canFixed ? (
          <ArrowWrapper>
            <Theme config={sortIconConfig}>
              {canFixedColumnsDataIndex.length && canFixedColumnsDataIndex.length > 1 ? (
                <FixedMenu
                  tableId={tableId}
                  fixedData={fixedData}
                  iconClass={iconClass}
                  onFixed={this.handleFixed}
                />
              ) : (
                <Tooltip
                  title={`${fixed ? '取消' : '选中'}固定列`}
                  action={'hover'}
                  placement="top"
                  popupContainerId={tableId}
                >
                  <Icon
                    iconClass={iconClass}
                    onClick={() => this.handleFixed(fixed ? 'cancelCurrent' : 'fixedCurrent')}
                  />
                </Tooltip>
              )}
            </Theme>
          </ArrowWrapper>
        ) : null}
      </Wrapper>
    );
  }
}
